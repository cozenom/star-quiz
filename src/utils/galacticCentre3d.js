// The Galactic Centre close-up: what orbits Sgr A*, moving with the clock
// (galactic_centre.json, from Star_Data/scripts/build_galactic_centre.py,
// which checks the orbits against measured positions and velocities):
//   - S-stars: published orbit fits (GRAVITY 2022, Gillessen et al. 2017,
//     Peißker et al. 2022), drawn by the star shader as stars, each with
//     its orbit line in its colour
//   - G objects: dusty clouds of gas on orbits (Witzel et al. 2017, Ciurlo
//     et al. 2020), soft glows of their size (~100 AU)
//   - the magnetar PSR J1745-2900: where it was measured (2016); its
//     orbit isn't known
//   - Sgr A*'s shadow at its true size: a black disc (from any side, a
//     black sphere), which hides what is behind it
// Orbits are Keplerian, turned each time round by the Schwarzschild
// precession (prograde), from the epoch their elements are osculating at.
// Shown as seen from Earth at the clock's date.
//
// Its own scale layer (AU, origin at Sgr A*: utils/layers3d), drawn after
// the star layer: the S2 orbit is 0.03 ly across 27,000 ly from the Sun,
// where the star layer's float32 positions are ~120 AU apart. Stars,
// lines and glows don't write depth; the shadow does, so they hide behind
// it. Its near plane follows the nearest thing to the camera.

import * as THREE from 'three';
import { createLayer } from './layers3d';
import { AU_PER_LY } from './universe3d';

// Key colours (raw hex, ours; also the legend's swatches)
export const GC_CLOUD_COLOR = 0xff8a6e;
export const GC_MAGNETAR_COLOR = 0x7dd3fc;
export const GC_SHADOW_SWATCH = '#000000';
export const AU_PER_PC = 206264.806;

const MS_PER_YEAR = 365.25 * 86400000;
const J2000_MS = Date.UTC(2000, 0, 1, 12);
// Clock time (ms) <-> Julian year, as the papers' decimal years
export const yearOf = (ms) => 2000 + (ms - J2000_MS) / MS_PER_YEAR;
export const msOf = (year) => J2000_MS + (year - 2000) * MS_PER_YEAR;

// The close-up shows once S2's orbit is this many px across, fully by the
// second (the G objects' glows and the magnetar's marker with it), or the
// young stars' typical orbit is (their median widest point). Each object's
// own label, orbit and picking show once its own orbit (its distance from
// Sgr A* for one without) is OBJECT_PX across: from afar only the big
// orbits, zoomed in all of them.
const CLOSE_UP_PX = [12, 40];
const OBJECT_PX = [30, 80];
// An orbit line fades in as its widest point grows from / to this (px),
// and out as it grows past these multiples of the camera's distance from
// Sgr A* (the camera inside it: it would cut across the whole view)
const ORBIT_PX = [6, 30];
const ORBIT_TOO_WIDE = [1.5, 3];
const ORBIT_OPACITY = 0.45;
// Young stars whose orbits are drawn unselected: those with a measured depth
const ORBIT_DEPTHS = new Set(['disc', 'acceleration']);
const ORBIT_SELECTED_OPACITY = 0.95;
// Points round an orbit (eccentric anomaly steps): more for the most
// eccentric, so the bend at closest approach stays smooth
const ORBIT_POINTS = 720;
const ORBIT_POINTS_ECCENTRIC = 2880;
// A G object's glow: at least this big (px), dimmer while it is
const CLOUD_MIN_PX = 4;
const MAGNETAR_PX = 7;
// Near plane: this fraction of the distance to the nearest object
const NEAR_FRACTION = 0.3;
// Views: this many times an orbit's widest point from Sgr A* (at least
// VIEW_MIN_AU), seen from Earth's side; the close-up from CLOSE_UP_VIEW_AU
const VIEW_SCALE = 2.2;
const VIEW_MIN_AU = 300;
const CLOSE_UP_VIEW_AU = 6000;
// How close the camera may get to Sgr A* (AU): just outside its shadow
const MIN_DISTANCE_AU = 0.4;

const KEPLER_ITERATIONS = 30;
// The close-up's stars: from among them, hundreds are as bright as the
// brightest stars from Earth or far brighter (the young ones M_V -5 to -9),
// and at their true brightness each would get the biggest sprite and glare
// spike; together they whited out the middle. So (ours): sprites at most
// this big (CSS px, before the halo; other stars' 24), their halos grown
// at most this share of the way (a crowd of halos made a white disc), and
// this share of the glare spike. Their order of brightness stays true.
const GC_STAR_MAX_PX = 9;
const GC_STAR_GLOW_MAX = 0.25;
export const GC_GLARE_SHARE = 0.03;

// Eccentric anomaly for mean anomaly m (radians, any value)
function eccentricAnomaly(m, e) {
    const mm = m - 2 * Math.PI * Math.round(m / (2 * Math.PI));
    let E = e < 0.8 ? mm : Math.PI * Math.sign(mm || 1);
    for (let k = 0; k < KEPLER_ITERATIONS; k++) {
        const d = (E - e * Math.sin(E) - mm) / (1 - e * Math.cos(E));
        E -= d;
        if (Math.abs(d) < 1e-12) break;
    }
    return E;
}

// An orbit at year t: periapsis direction and the one 90 deg on (scene
// frame, turned by the precession since its epoch), and the eccentric
// anomaly. out: {p, q (Vector3), E}
function orbitAt(orbit, t, out) {
    const turns = (t - orbit.epoch) / orbit.period_yr;
    const d = THREE.MathUtils.degToRad(orbit.precess_deg * turns);
    const c = Math.cos(d), s = Math.sin(d);
    out.p.set(orbit.p[0] * c + orbit.q[0] * s, orbit.p[1] * c + orbit.q[1] * s, orbit.p[2] * c + orbit.q[2] * s);
    out.q.set(orbit.q[0] * c - orbit.p[0] * s, orbit.q[1] * c - orbit.p[1] * s, orbit.q[2] * c - orbit.p[2] * s);
    out.E = eccentricAnomaly(2 * Math.PI * (t - orbit.tp) / orbit.period_yr, orbit.e);
    return out;
}

// Where an object is (AU from Sgr A*, scene frame) at year t; out: Vector3
const scratch = { p: new THREE.Vector3(), q: new THREE.Vector3(), E: 0 };
export function gcPosition(obj, t, out = new THREE.Vector3()) {
    if (!obj.orbit) return out.fromArray(obj.position_au);
    const o = obj.orbit;
    orbitAt(o, t, scratch);
    const b = Math.sqrt(1 - o.e * o.e);
    return out.copy(scratch.p).multiplyScalar(o.a_au * (Math.cos(scratch.E) - o.e))
        .addScaledVector(scratch.q, o.a_au * b * Math.sin(scratch.E));
}

// For a card, at year t: {distanceAu, speedKmS, nextPeri (year)}, or null
// for the magnetar (its orbit isn't known). massMsun: Sgr A*'s.
export function gcState(obj, t, massMsun) {
    if (!obj.orbit) return null;
    const o = obj.orbit;
    const r = gcPosition(obj, t).length();
    const gm = 4 * Math.PI * Math.PI * massMsun;  // AU^3 / yr^2
    const speed = Math.sqrt(Math.max(gm * (2 / r - 1 / o.a_au), 0)) * 4.740470464;
    const nextPeri = o.tp + Math.ceil((t - o.tp) / o.period_yr) * o.period_yr;
    return { distanceAu: r, speedKmS: speed, nextPeri };
}

// One line for hover and search: "S2 · star round Sgr A*, every 16.0 years"
const KIND_NAMES = { star: 'Star round Sgr A*', young: 'Young massive star round Sgr A*', cloud: 'Dusty cloud round Sgr A*', magnetar: 'Magnetar near Sgr A*' };
export const gcKindName = (obj) => KIND_NAMES[obj.group === 'young' ? 'young' : obj.kind];
const years = (p) => (p < 100 ? p.toFixed(1) : Math.round(p).toLocaleString());
export function gcLabel(obj) {
    const sky = obj.offset_arcsec ? `${Math.hypot(...obj.offset_arcsec).toFixed(1)}″ from Sgr A* on the sky` : '';
    if (obj.kind === 'magnetar') return `${obj.name} · magnetar, ${sky}`;
    if (!obj.orbit) return `${obj.name} · ${obj.type}, ${sky}`;
    return `${obj.name} · ${obj.kind === 'cloud' ? 'G object' : obj.type}, round Sgr A* every ${years(obj.orbit.period_yr)} years`;
}

// Camera views (ly from the Sun), as seen from Earth's side, looking at
// Sgr A*: an object's (its whole orbit in view; the magnetar's place), or
// the close-up's (index null). {position, target, minDistance}
export function gcPose(data, index) {
    const target = new THREE.Vector3(...data.origin_ly);
    let au = CLOSE_UP_VIEW_AU;
    if (index !== null) {
        const obj = data.objects[index];
        au = Math.max(VIEW_SCALE * (obj.orbit ? obj.orbit.apoapsis_au : Math.hypot(...obj.position_au)), VIEW_MIN_AU);
    }
    const toEarth = new THREE.Vector3(...data.sky.away).negate();
    return {
        position: target.clone().addScaledVector(toEarth, au / AU_PER_LY).toArray(),
        target: target.toArray(),
        minDistance: MIN_DISTANCE_AU / AU_PER_LY,
    };
}

// Search entries (type 'gc', id: index into data.objects; null: Sgr A*
// itself, the close-up, ahead of the galaxy-scale Galactic Centre)
const SGR_A_TERMS = ['Sgr A*', 'Sgr A', 'Sag A*', 'Sag A', 'SgrA*', 'Sagittarius A*', 'Sagittarius A', 'Sagittarius A star',
    'black hole', 'supermassive black hole', 'Milky Way black hole'];
export function gcSearchItems(data, normalize) {
    const sgrA = {
        type: 'gc',
        id: null,
        label: 'Sgr A*',
        sublabel: 'The Milky Way\'s black hole · close-up',
        terms: SGR_A_TERMS.map(normalize),
        sortKey: -12,
    };
    return [sgrA, ...data.objects.map((obj, i) => ({
        type: 'gc',
        id: i,
        label: obj.name === 'PSR J1745-2900' ? 'Galactic Centre magnetar' : obj.name,
        sublabel: obj.kind === 'magnetar' ? 'PSR J1745-2900 · near Sgr A*'
            : `${obj.kind === 'cloud' ? 'G object, a dusty cloud' : obj.group === 'young' ? `Young massive star · ${obj.type}` : `S-star · ${obj.type}`} · round Sgr A*`,
        terms: [...new Set([obj.name, ...obj.aka])].map(normalize),
        sortKey: obj.label ? -4 : 12,
    }))];
}

const cloudVertexShader = /* glsl */ `
    uniform float uRadius;
    uniform float uFocalPx;
    uniform float uMinPx;
    varying float vAlpha;
    void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float px = 2.0 * uRadius * uFocalPx / max(-mv.z, 1e-6);
        gl_PointSize = max(px, uMinPx);
        // A marker while smaller than its floor, its own light once bigger
        vAlpha = clamp(px / uMinPx, 0.35, 1.0);
        gl_Position = projectionMatrix * mv;
    }
`;
const cloudFragmentShader = /* glsl */ `
    uniform vec3 uColor;
    uniform float uFade;
    varying float vAlpha;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float a = exp(-r * r * 4.0) * (1.0 - smoothstep(0.8, 1.0, r)) * vAlpha * uFade;
        if (a < 0.005) discard;
        gl_FragColor = vec4(uColor * a, a);
    }
`;
const markerVertexShader = /* glsl */ `
    uniform float uSize;
    void main() {
        gl_PointSize = uSize;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
const markerFragmentShader = /* glsl */ `
    uniform vec3 uColor;
    uniform float uFade;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float a = (1.0 - smoothstep(0.6, 1.0, r)) * uFade;
        if (a < 0.01) discard;
        gl_FragColor = vec4(uColor * a, a);
    }
`;

// The close-up's layer (AU), made with the view's others; its origin
// (origin, a Vector3) is set once the data is in
export function createGalacticCentreLayer() {
    const origin = new THREE.Vector3();
    const layer = createLayer({ name: 'galactic centre', unit: 1 / AU_PER_LY, origin: () => origin, near: 1, far: 1e6 });
    layer.visible = false;
    return { layer, origin };
}

// layer, origin: createGalacticCentreLayer(); data: galactic_centre.json;
// makeStars(positions, colors, absMags) -> star Points from the view's star
// shader (its uUnitsPerPc set here to this layer's AU) whose camera
// uniforms are starCamera (set each frame: syncStarCamera)
export function buildGalacticCentre({ layer, origin }, data, pixelRatio, { makeStars, starCamera, bvToColor }) {
    origin.set(...data.origin_ly);
    const { objects } = data;
    const stars = objects.map((o, i) => (o.kind === 'star' ? i : -1)).filter(i => i >= 0);
    const clouds = objects.map((o, i) => (o.kind === 'cloud' ? i : -1)).filter(i => i >= 0);
    const magnetar = objects.findIndex(o => o.kind === 'magnetar');
    const s2 = objects.find(o => o.id === 'S2');
    const now = objects.map(() => new THREE.Vector3());  // AU, this frame

    // Stars: one Points, positions rewritten each frame
    const starPositions = new Float32Array(stars.length * 3);
    const starColors = new Float32Array(stars.length * 3);
    const starMags = new Float32Array(stars.length);
    stars.forEach((i, k) => {
        starColors.set(bvToColor(objects[i].b_v), 3 * k);
        starMags[k] = objects[i].abs_mag;
    });
    const starPoints = makeStars(starPositions, starColors, starMags);
    starPoints.material.uniforms.uUnitsPerPc.value = AU_PER_PC;
    // Smaller sprites than other stars', with less halo (see GC_STAR_MAX_PX)
    starPoints.material.uniforms.uMaxSize.value = GC_STAR_MAX_PX;
    starPoints.material.uniforms.uGlowMax = { value: GC_STAR_GLOW_MAX };
    starPoints.frustumCulled = false;
    layer.scene.add(starPoints);

    // Orbit lines: in the orbit's plane (x towards periapsis), turned into
    // place by the object's matrix as the orbit precesses
    const orbitLines = objects.map((obj) => {
        if (!obj.orbit) return null;
        const o = obj.orbit;
        const n = o.e > 0.95 ? ORBIT_POINTS_ECCENTRIC : ORBIT_POINTS;
        const pts = new Float32Array(n * 3);
        const b = Math.sqrt(1 - o.e * o.e);
        for (let k = 0; k < n; k++) {
            const E = (k / n) * 2 * Math.PI;
            pts[3 * k] = o.a_au * (Math.cos(E) - o.e);
            pts[3 * k + 1] = o.a_au * b * Math.sin(E);
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(pts, 3));
        const color = obj.kind === 'cloud' ? new THREE.Color(GC_CLOUD_COLOR)
            : new THREE.Color().setRGB(...bvToColor(obj.b_v), THREE.SRGBColorSpace);
        const line = new THREE.LineLoop(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false }));
        line.matrixAutoUpdate = false;
        line.frustumCulled = false;
        layer.scene.add(line);
        return line;
    });

    // G objects: soft glows, ~100 AU across
    const cloudGeometry = new THREE.BufferGeometry();
    cloudGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(clouds.length * 3), 3));
    const cloudMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uRadius: { value: data.g_object_radius_au ?? 50 },
            uFocalPx: { value: 1 },
            uMinPx: { value: CLOUD_MIN_PX * pixelRatio },
            uColor: { value: new THREE.Color().setHex(GC_CLOUD_COLOR, THREE.LinearSRGBColorSpace) },
            uFade: { value: 0 },
        },
        vertexShader: cloudVertexShader,
        fragmentShader: cloudFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
    const cloudPoints = new THREE.Points(cloudGeometry, cloudMaterial);
    cloudPoints.frustumCulled = false;
    layer.scene.add(cloudPoints);

    // The magnetar: a marker where it was measured
    const markerGeometry = new THREE.BufferGeometry();
    markerGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(magnetar >= 0 ? objects[magnetar].position_au : [0, 0, 0]), 3));
    const markerMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uSize: { value: MAGNETAR_PX * pixelRatio },
            uColor: { value: new THREE.Color().setHex(GC_MAGNETAR_COLOR, THREE.LinearSRGBColorSpace) },
            uFade: { value: 0 },
        },
        vertexShader: markerVertexShader,
        fragmentShader: markerFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
    const marker = new THREE.Points(markerGeometry, markerMaterial);
    marker.frustumCulled = false;
    marker.visible = magnetar >= 0;
    layer.scene.add(marker);

    // Sgr A*'s shadow: opaque black, writes depth (drawn before the rest)
    const shadow = new THREE.Mesh(
        new THREE.SphereGeometry(data.black_hole.shadow_au, 48, 24),
        new THREE.MeshBasicMaterial({ color: 0x000000 }),
    );
    shadow.renderOrder = -1;
    layer.scene.add(shadow);

    let closeUp = 0;   // the close-up as a whole (0..1)
    let inner = 0;     // the S-stars' scale: the G objects' glows, the magnetar
    // Each object's size (AU) for its own visibility, and that visibility
    const scaleAu = objects.map(o => (o.orbit ? o.orbit.apoapsis_au : Math.hypot(...o.position_au)));
    const shown = new Float32Array(objects.length);
    const youngApo = objects.filter(o => o.group === 'young' && o.orbit).map(o => o.orbit.apoapsis_au).sort((a, b) => a - b);
    const youngScaleAu = youngApo.length ? youngApo[youngApo.length >> 1] : 0;
    let lastYear = null;
    const cameraAu = new THREE.Vector3();
    const basisN = new THREE.Vector3();
    const place = { p: new THREE.Vector3(), q: new THREE.Vector3(), E: 0 };

    return {
        layer,
        starPoints,
        objects,
        // How much the close-up shows (0..1): orbits, labels, picking
        closeUp: () => closeUp,
        // How much object i's own label, orbit and picking show (0..1)
        shown: (i) => shown[i],

        // camera: the master camera (ly); t: the clock's year; height: the
        // view's CSS px; opts: {visible, orbits (lines on), selected (index
        // or null)}
        update(camera, t, height, opts) {
            layer.visible = opts.visible;
            if (!opts.visible) return;
            if (t !== lastYear) {
                lastYear = t;
                objects.forEach((obj, i) => gcPosition(obj, t, now[i]));
                stars.forEach((i, k) => now[i].toArray(starPositions, 3 * k));
                starPoints.geometry.attributes.position.needsUpdate = true;
                const cp = cloudGeometry.attributes.position;
                clouds.forEach((i, k) => now[i].toArray(cp.array, 3 * k));
                cp.needsUpdate = true;
                objects.forEach((obj, i) => {
                    const line = orbitLines[i];
                    if (!line) return;
                    orbitAt(obj.orbit, t, place);
                    basisN.crossVectors(place.p, place.q);
                    line.matrix.makeBasis(place.p, place.q, basisN);
                    line.matrixWorldNeedsUpdate = true;
                });
            }
            cameraAu.subVectors(camera.position, origin).multiplyScalar(AU_PER_LY);
            const dist = cameraAu.length();
            const focal = height / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
            const px = (au) => 2 * au * focal / Math.max(dist, 1e-9);
            inner = THREE.MathUtils.smoothstep(px(s2 ? s2.orbit.apoapsis_au : 2000), ...CLOSE_UP_PX);
            closeUp = Math.max(inner, youngScaleAu ? THREE.MathUtils.smoothstep(px(youngScaleAu), ...CLOSE_UP_PX) : 0);
            for (let i = 0; i < objects.length; i++) shown[i] = closeUp * THREE.MathUtils.smoothstep(px(scaleAu[i]), ...OBJECT_PX);
            orbitLines.forEach((line, i) => {
                if (!line) return;
                const selected = opts.selected === i;
                const apo = objects[i].orbit.apoapsis_au;
                const fade = THREE.MathUtils.smoothstep(px(apo), ...ORBIT_PX)
                    * (selected ? 1 : 1 - THREE.MathUtils.smoothstep(apo / Math.max(dist, 1e-9), ...ORBIT_TOO_WIDE));
                // A young star's orbit only where its depth is measured (the
                // disc's plane, an acceleration), else only while selected:
                // a drawn depth's is one of many that fit
                const listed = opts.orbits && (objects[i].group !== 'young' || ORBIT_DEPTHS.has(objects[i].depth));
                line.material.opacity = (selected ? ORBIT_SELECTED_OPACITY : ORBIT_OPACITY) * fade * (listed || selected ? 1 : 0) * Math.max(shown[i], selected ? 1 : 0);
                line.visible = line.material.opacity > 0.003;
            });
            cloudMaterial.uniforms.uFocalPx.value = focal * pixelRatio;
            cloudMaterial.uniforms.uFade.value = inner;
            markerMaterial.uniforms.uFade.value = inner;
            // Near plane: a fraction of the way to the nearest thing
            let nearest = dist - data.black_hole.shadow_au;
            for (const p of now) nearest = Math.min(nearest, p.distanceTo(cameraAu));
            layer.near = Math.max(nearest * NEAR_FRACTION, 1e-4);
            layer.far = dist + 2e5;
        },

        // Where object i is now, in ly from the Sun (doubles); out: Vector3
        positionLy(i, out = new THREE.Vector3()) {
            return out.copy(now[i]).divideScalar(AU_PER_LY).add(origin);
        },
        origin,

        // The object under a screen point (index), or null: only in the
        // close-up. starCamera: the star layer's camera (ly).
        pick(cam, width, height, x, y, radiusPx) {
            if (!layer.visible || closeUp < 0.3) return null;
            const p = new THREE.Vector3();
            let best = null;
            let bestD = radiusPx;
            objects.forEach((obj, i) => {
                if (shown[i] < 0.3 || (obj.kind !== 'star' && inner < 0.3)) return;
                this.positionLy(i, p).project(cam);
                if (p.z > 1 || Math.abs(p.x) > 1.05 || Math.abs(p.y) > 1.05) return;
                const d = Math.hypot((p.x + 1) / 2 * width - x, (1 - p.y) / 2 * height - y);
                if (d < bestD) {
                    bestD = d;
                    best = i;
                }
            });
            return best;
        },

        // The labelled ones (curated): {index, name}
        labels: () => objects.map((obj, i) => ({ index: i, name: obj.kind === 'magnetar' ? 'Magnetar' : obj.name, on: obj.label }))
            .filter(l => l.on),

        // Called before rendering: the star shader's camera, in AU
        syncStarCamera(setStarCamera) {
            setStarCamera(starCamera, layer.camera.position);
        },

        dispose() {
            starPoints.geometry.dispose();
            starPoints.material.dispose();
            orbitLines.forEach(line => {
                if (!line) return;
                line.geometry.dispose();
                line.material.dispose();
            });
            cloudGeometry.dispose();
            cloudMaterial.dispose();
            markerGeometry.dispose();
            markerMaterial.dispose();
            shadow.geometry.dispose();
            shadow.material.dispose();
        },
    };
}
