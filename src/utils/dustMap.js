// Measured 3D dust near the Sun (dust_map.json + dust_map_*.bin, from
// Star_Data/scripts/build_dust_map.py): Edenhofer et al. 2024 out to
// 1.25 kpc, Vergely, Lallement & Cox 2022 beyond, stitched into one field
// of A_V per pc and stored in nested Galactic-aligned boxes (finest first,
// out to 5 kpc in the plane and 400 pc above and below it), uint8,
// log-encoded. Within 500 pc, a Sun-centred grid of Edenhofer's map
// instead (0.47 deg sky pixels x 41 shells): boxes blur the nearest clouds
// across degrees of sky. Checked against Gaia stars' own reddening in the
// build (output/dust_map_check.txt).
//
// Used by the band's ray-march and the 3D view's dust volume (utils/
// milkyWayBand), which sample it where it is and keep the model's dust
// only for the rest (1 - measuredShare), so it's counted once. Stars are
// not dimmed by it: their brightness is as seen from Earth, dust included
// (plan.txt: true colours later).
//
// One set of uniforms (createDustMap's) is shared by every material that
// uses it, so loading a box or switching the dust off reaches them all.

import * as THREE from 'three';

// The shader has this many box slots (the build writes up to this many)
const MAX_BOXES = 4;
const MAG_PER_TAU = 2.5 / Math.LN10;

// Where the measured dust is, as a share 0..1 of the dust there (the model
// has the rest): faded out at the outer box's edge and at the slab's top
// and bottom (the build's fade_pc). No samplers, so vertex shaders can use
// it. p: Galactic pc from the Sun.
const DUST_SHARE_GLSL = /* glsl */ `
    uniform float uDustOn;       // 1 once the boxes are in and the dust is wanted
    uniform vec4 uDustFade;      // xy edge from, to; |z| from, to (pc)
    uniform mat3 uGcToHel;       // Galactocentric kpc -> Galactic pc from the Sun
    uniform vec3 uGcToHelOffset;
    float measuredShare(vec3 p) {
        float xy = max(abs(p.x), abs(p.y));
        return uDustOn * (1.0 - smoothstep(uDustFade.x, uDustFade.y, xy))
            * (1.0 - smoothstep(uDustFade.z, uDustFade.w, abs(p.z)));
    }
`;

// The measured density (A_V per pc) at p (Galactic pc from the Sun): from
// the finest loaded box that holds p, one voxel in from its edge. The
// slots are unrolled (samplers can't be indexed by a loop).
const boxLookup = (i) => /* glsl */ `
        if (uDustHalf[${i}].w > 0.0 && all(lessThanEqual(abs(p), uDustHalf[${i}].xyz - uDustHalf[${i}].w))) {
            return dustDecode(texture(uDustBox${i}, ((p + uDustHalf[${i}].xyz) / uDustHalf[${i}].w + 0.5) / uDustSize[${i}]).r);
        }`;
export const DUST_GLSL = /* glsl */ `
    precision highp sampler3D;
    ${DUST_SHARE_GLSL}
    ${Array.from({ length: MAX_BOXES }, (_, i) => `uniform sampler3D uDustBox${i};`).join('\n    ')}
    uniform vec4 uDustHalf[${MAX_BOXES}];   // half-extents (pc), voxel (pc); w = 0: not loaded
    uniform vec3 uDustSize[${MAX_BOXES}];   // voxels per axis
    uniform vec2 uDustCode;                 // log10 A_V per pc at codes 1 and 255
    uniform vec3 uSlabHalf;                 // the outer box's half-extents (pc)
    uniform sampler3D uDustSphere;          // (l, b, ln r) round the Sun
    uniform vec4 uSphereR;                  // ln r inner, ln r outer; fade to the boxes from, to (pc); x = 0: none
    float dustDecode(float v) {
        float k = v * 255.0;
        // Between an empty voxel and its neighbour: fade from the floor
        if (k < 1.0) return k * pow(10.0, uDustCode.x);
        return pow(10.0, uDustCode.x + (k - 1.0) / 254.0 * (uDustCode.y - uDustCode.x));
    }
    float boxDust(vec3 p) {
        ${Array.from({ length: MAX_BOXES }, (_, i) => boxLookup(i)).join('')}
        return 0.0;
    }
    float measuredDust(vec3 p) {
        if (uDustOn <= 0.0) return 0.0;
        if (uSphereR.x > 0.0) {
            float r = length(p);
            if (r <= uSphereR.w) {
                float lnr = log(max(r, 1e-3));
                // Inside the map's first shell: empty (Edenhofer has no data there)
                if (lnr < uSphereR.x) return 0.0;
                vec3 uvw = vec3(atan(p.y, p.x) / 6.2831853, asin(clamp(p.z / r, -1.0, 1.0)) / 3.1415927 + 0.5,
                                (lnr - uSphereR.x) / (uSphereR.y - uSphereR.x));
                float s = dustDecode(texture(uDustSphere, uvw).r);
                return r <= uSphereR.z ? s : mix(s, boxDust(p), smoothstep(uSphereR.z, uSphereR.w, r));
            }
        }
        return boxDust(p);
    }
    // Does the segment a-b (Galactic pc) touch the measured dust? (its
    // bounding box touches the slab or the sphere's cube)
    bool dustSegment(vec3 a, vec3 b) {
        vec3 lo = min(a, b), hi = max(a, b);
        vec3 sph = vec3(uSphereR.w);
        return uDustOn > 0.0 && ((all(lessThanEqual(lo, uSlabHalf)) && all(greaterThanEqual(hi, -uSlabHalf)))
            || (all(lessThanEqual(lo, sph)) && all(greaterThanEqual(hi, -sph))));
    }
`;
export const DUST_MAG_PER_TAU = MAG_PER_TAU;

// fetchJson / fetchBuffer: (name) => Promise (as farStarSource). Returns
// {meta(), load(tier) -> Promise of [{index, box, buffer}]} (the sphere:
// index -1), each tier fetched once.
export function dustMapSource(fetchJson, fetchBuffer) {
    let metaPromise = null;
    const tiers = new Map();
    const meta = () => {
        if (!metaPromise) {
            metaPromise = fetchJson('dust_map.json').catch((error) => {
                metaPromise = null;  // try again later
                throw error;
            });
        }
        return metaPromise;
    };
    return {
        meta,
        load: (tier) => {
            if (!tiers.has(tier)) {
                tiers.set(tier, meta().then(m => Promise.all([...m.boxes.map((box, index) => ({ box, index })),
                    ...(m.sphere ? [{ box: m.sphere, index: -1 }] : [])]
                    .filter(({ box }) => box.tier === tier)
                    .map(({ box, index }) => fetchBuffer(box.file).then(buffer => ({ index, box, buffer })))))
                    .catch((error) => {
                        tiers.delete(tier);  // try again later
                        throw error;
                    }));
            }
            return tiers.get(tier);
        },
    };
}

// A box's or the sphere's texture (the sphere wraps in l)
function boxTexture(buffer, box, wrapX = false) {
    const [nx, ny, nz] = box.size;
    const tex = new THREE.Data3DTexture(new Uint8Array(buffer), nx, ny, nz);
    tex.format = THREE.RedFormat;
    tex.type = THREE.UnsignedByteType;
    tex.minFilter = tex.magFilter = THREE.LinearFilter;
    tex.wrapS = tex.wrapT = tex.wrapR = THREE.ClampToEdgeWrapping;
    if (wrapX) tex.wrapS = THREE.RepeatWrapping;
    tex.unpackAlignment = 1;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    return tex;
}

// The measured dust's state and shared uniforms. source: dustMapSource.
// Returns {uniforms, load(tier) -> Promise, loaded(tier), setGalaxyFrame
// (galaxy.json to_scene), setEnabled(on), enabled(), onChange(fn),
// dispose()}
export function createDustMap(source) {
    const uniforms = {
        uDustOn: { value: 0 },
        uDustFade: { value: new THREE.Vector4(1, 2, 1, 2) },
        uGcToHel: { value: new THREE.Matrix3() },
        uGcToHelOffset: { value: new THREE.Vector3() },
        uDustHalf: { value: Array.from({ length: MAX_BOXES }, () => new THREE.Vector4()) },
        uDustSize: { value: Array.from({ length: MAX_BOXES }, () => new THREE.Vector3(1, 1, 1)) },
        uDustCode: { value: new THREE.Vector2() },
        uSlabHalf: { value: new THREE.Vector3() },
        uDustSphere: { value: null },
        uSphereR: { value: new THREE.Vector4() },
    };
    for (let i = 0; i < MAX_BOXES; i++) uniforms[`uDustBox${i}`] = { value: null };
    const textures = [];
    const listeners = new Set();
    const loadedTiers = new Set();
    let meta = null;
    let galaxyToScene = null;
    let wanted = true;
    let outerLoaded = false;
    const toScene = new THREE.Matrix4();
    const fromScene = new THREE.Matrix4();

    const changed = () => listeners.forEach(fn => fn());
    const refreshOn = () => {
        const on = wanted && outerLoaded && galaxyToScene !== null ? 1 : 0;
        if (on !== uniforms.uDustOn.value) {
            uniforms.uDustOn.value = on;
            changed();
        }
    };
    // Galactocentric kpc -> Galactic pc from the Sun: through the scene (ly)
    const updateFrame = () => {
        if (!meta || !galaxyToScene) return;
        const m = galaxyToScene.matrix, o = galaxyToScene.offset_ly;
        const gc = new THREE.Matrix4().set(
            m[0][0], m[0][1], m[0][2], o[0],
            m[1][0], m[1][1], m[1][2], o[1],
            m[2][0], m[2][1], m[2][2], o[2],
            0, 0, 0, 1,
        );
        const toHel = fromScene.clone().multiply(gc);
        uniforms.uGcToHel.value.setFromMatrix4(toHel);
        uniforms.uGcToHelOffset.value.setFromMatrixPosition(toHel);
    };
    const setMeta = (m) => {
        if (meta) return;
        if (m.boxes.length > MAX_BOXES) throw new Error(`dust_map.json has ${m.boxes.length} boxes, the shader ${MAX_BOXES}`);
        meta = m;
        const r = m.to_scene.matrix;
        toScene.set(r[0][0], r[0][1], r[0][2], 0, r[1][0], r[1][1], r[1][2], 0, r[2][0], r[2][1], r[2][2], 0, 0, 0, 0, 1);
        fromScene.copy(toScene).invert();
        const f = m.fade_pc;
        uniforms.uDustFade.value.set(...f.measured_to_model_xy, ...f.measured_to_model_z);
        uniforms.uDustCode.value.set(m.encoding.log_lo, m.encoding.log_hi);
        uniforms.uSlabHalf.value.fromArray(m.boxes[m.boxes.length - 1].half_pc);
        updateFrame();
    };

    return {
        uniforms,
        load: (tier) => source.load(tier).then(parts => source.meta().then((m) => {
            setMeta(m);
            if (loadedTiers.has(tier)) return;
            loadedTiers.add(tier);
            for (const { index, box, buffer } of parts) {
                const tex = boxTexture(buffer, box, index < 0);
                textures.push(tex);
                if (index < 0) {
                    uniforms.uDustSphere.value = tex;
                    uniforms.uSphereR.value.set(Math.log(box.r_pc[0]), Math.log(box.r_pc[1]), ...box.fade_pc);
                    continue;
                }
                uniforms[`uDustBox${index}`].value = tex;
                uniforms.uDustHalf.value[index].set(...box.half_pc, box.step_pc);
                uniforms.uDustSize.value[index].fromArray(box.size);
                if (index === m.boxes.length - 1) outerLoaded = true;
            }
            refreshOn();
            changed();
        })),
        loaded: (tier) => loadedTiers.has(tier),
        setGalaxyFrame: (toSceneJson) => {
            if (galaxyToScene) return;
            galaxyToScene = toSceneJson;
            updateFrame();
            refreshOn();
        },
        setEnabled: (on) => {
            wanted = on;
            refreshOn();
        },
        enabled: () => uniforms.uDustOn.value > 0,
        onChange: (fn) => {
            listeners.add(fn);
            return () => listeners.delete(fn);
        },
        dispose: () => {
            textures.forEach(t => t.dispose());
            listeners.clear();
        },
    };
}
