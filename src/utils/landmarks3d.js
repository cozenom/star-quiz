// The Milky Way's landmarks: real objects at their measured distances
// (landmarks.json, from Star_Data/scripts/build_landmarks.py), in the star
// layer (ly). Three kinds (LANDMARK_KINDS):
//   - globulars: Baumgardt et al.'s database v4 (distances from Baumgardt
//     & Vasiliev 2021, masses and radii from Baumgardt & Hilker 2018)
//   - open_clusters: Hunt & Reffert 2023's Gaia DR3 census (reliable
//     sample), coloured by age
//   - nebulae: the few whose 3D shape has been measured, each from its
//     published models (landmarks.json nebulae.models[i]: one or more
//     parts, e.g. the Homunculus and Eta Carinae's outer shell)
// Cluster names from OpenNGC. Real, so shown from closer in than the model (like
// the masers).
//
// A globular is a soft glow with a Plummer profile (surface brightness
// (1 + (R/a)^2)^-2, a = the half-light radius), out to GLOBULAR_RADII
// half-light radii: a marker of a few px from afar (bigger for more
// massive clusters), its true size once that's bigger. An open cluster
// is a small dot (bigger for more members). Up close, each kind's stars:
// Gaia's members (<kind>_stars.bin, drawn by the star shader like the
// other stars, see decodeClusterStars); a globular's glow then carries
// only the light they don't (Gaia misses the faint stars and the crowded
// cores), an open cluster's dot fades out. A nebula is a dot from afar;
// up close, its models, crossfading with the dot as it grows past it: a
// mesh is a thin glowing shell (optically thin, so both sides show and its
// edges, seen along the shell, glow brightest) or, shading "dusty", a wall
// of dust lit by the star (only its near side, brightest where it scatters
// the star's light towards the camera, mottled); a cloud is soft points,
// each its own colour when it has them (from a photo). A dusty mesh's lobes
// (occluders: ellipsoids) dim what's behind them: the depth buffer can't
// tell at this scale, so each point / fragment tests its line of sight.

import * as THREE from 'three';
import { bvToColor } from './universe3d.js';

// Old stars: yellow-white (raw hex, ours; also the legend's swatch)
export const GLOBULAR_COLOR = 0xffe2ad;
// Open clusters by age (log10 years), young to old (raw hex, ours)
export const OPEN_AGE_COLORS = [[6.5, 0x9fc4ff], [7.7, 0xe8eeff], [8.7, 0xffe0a0], [9.7, 0xff9e60]];
// Nebulae: each its own colour (landmarks.json); this one for the legend
export const NEBULA_COLOR = 0xffa676;
// Per kind: marker diameter (px) over the range of its size measure
// (log10 Suns for globulars, log10 members for open clusters, none for
// nebulae), brightness
const KIND = {
    globulars: { markerPx: [3.5, 8], sizeRange: [4, 6.5], brightness: 0.9, glow: true },
    open_clusters: { markerPx: [2.5, 5.5], sizeRange: [1, 3.5], brightness: 0.7, glow: false },
    nebulae: { markerPx: [4, 4], sizeRange: [0, 1], brightness: 0.8, glow: false },
};
export const LANDMARK_KINDS = Object.keys(KIND);
const GLOBULAR_RADII = 3;
const MAX_PX = 900;
// Shown between these camera distances from the Sun (ly)
const FADE_IN_LY = [1000, 3000];
// Flying to one: this many radii (half-light / half-member) from it, at
// least this far
const VIEW_RADII = 25;
const VIEW_MIN_LY = 60;
// A nebula's view: this many model radii from it
const NEBULA_VIEW_RADII = 4;
// A nebula's shell: brightness seen face on, and the least |cos| of the
// angle to the shell's surface (the edge-on limit; a part's own, from its
// wall's measured thickness, where known)
const SHELL_FACE = 0.05;
const SHELL_EDGE = 0.08;
// A dusty wall: its dust's forward scattering (Henyey-Greenstein g), its
// brightness, the light left of what's behind a lobe, and its mottling's
// cells per model half-length
const DUST_G = 0.3;
const DUST_BRIGHT = 0.36;
const DUST_HIDDEN = 0.15;
const DUST_CELLS = 28.0;

const vertexShader = /* glsl */ `
    attribute vec3 color;
    attribute float radius;      // half-light / half-member radius (ly)
    attribute float marker;      // marker diameter (px)
    attribute float unresolved;  // share of its light Gaia's stars don't hold
    uniform float uFocalPx;      // px per unit at distance 1
    uniform float uPixelRatio;
    uniform float uStarsOn;      // 1 while its stars are drawn
    uniform float uGlow;         // 1: a Plummer glow at its true size (globulars)
    varying vec3 vColor;
    varying float vBright;
    void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float world = 2.0 * ${GLOBULAR_RADII.toFixed(1)} * radius * uFocalPx / max(-mv.z, 1e-3);
        float m = marker * uPixelRatio;
        gl_PointSize = clamp(uGlow > 0.5 ? max(m, world) : m, 1.0, ${MAX_PX.toFixed(1)});
        // Once it's bigger than its marker its stars show: a glow keeps the
        // light they don't hold, a dot goes
        float near = smoothstep(m, 4.0 * m, world) * uStarsOn;
        vBright = uGlow > 0.5 ? mix(1.0, unresolved, near) : 1.0 - near;
        vColor = color;
        gl_Position = projectionMatrix * mv;
    }
`;
const fragmentShader = /* glsl */ `
    uniform float uFade;
    uniform float uBrightness;
    varying vec3 vColor;
    varying float vBright;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float x = r * ${GLOBULAR_RADII.toFixed(1)};
        float glow = vBright / ((1.0 + x * x) * (1.0 + x * x)) * (1.0 - smoothstep(0.8, 1.0, r));
        if (glow * uFade < 0.003) discard;
        gl_FragColor = vec4(vColor * glow * uFade * uBrightness, 1.0);
    }
`;

const fmt = (n) => Math.round(n).toLocaleString();

// Raw hex -> [r, g, b] 0..1, and an open cluster's colour by its age
const rgb = (h) => [((h >> 16) & 255) / 255, ((h >> 8) & 255) / 255, (h & 255) / 255];
export function openAgeColor(ageMyr) {
    const x = Math.log10(Math.max(ageMyr ?? 300, 0.1) * 1e6);
    const stops = OPEN_AGE_COLORS;
    if (x <= stops[0][0]) return rgb(stops[0][1]);
    for (let k = 1; k < stops.length; k++) {
        if (x <= stops[k][0]) {
            const t = (x - stops[k - 1][0]) / (stops[k][0] - stops[k - 1][0]);
            const a = rgb(stops[k - 1][1]), b = rgb(stops[k][1]);
            return a.map((v, j) => v + (b[j] - v) * t);
        }
    }
    return rgb(stops[stops.length - 1][1]);
}

// What both kinds share, for cluster i of landmarks.json[kind]
function commonInfo(kind, g, i) {
    return {
        kind,
        index: i,
        name: g.name[i],
        title: g.title[i],
        ids: g.ids[i],
        messier: g.messier[i],
        position: g.xyz_ly.slice(3 * i, 3 * i + 3),
        distance: g.distance_ly[i],
        constellation: g.constellation[i],
        note: g.note[i],
        noteRef: g.note_ref[i],
        superlative: g.superlative[i],
        starCount: g.stars?.clusters.find(c => c.cluster === i)?.count ?? 0,
        starsRef: g.stars?.ref ?? null,
        labelled: g.label[i],
    };
}

// Landmark i of landmarks.json[kind]: {kind, index, name, title, ids,
// messier, position (ly array), distance, constellation, note, noteRef,
// superlative, starCount, starsRef, labelled, label (one line), radius
// (ly: half-light / half-member / the model's), and per kind: globulars:
// distanceErr, rGc, mass (Suns), rh, rt, vmag, resolved (share of its
// light in its Gaia stars); open clusters: distanceRange, age, ageRange
// (million years), members, r50, rt, av; nebulae: distanceErr, type,
// about, models [{name, ref, unknown, ...}], refs}
export function clusterInfo(kind, g, i) {
    const info = commonInfo(kind, g, i);
    if (kind === 'nebulae') {
        return {
            ...info,
            distanceErr: g.distance_err_ly[i],
            type: g.type[i],
            about: g.about[i],
            models: g.models[i],
            refs: g.refs[i],
            radius: g.radius_ly[i],
            label: `${g.name[i]} · ${g.type[i].toLowerCase()}, ${fmt(g.distance_ly[i])} ly`,
        };
    }
    if (kind === 'globulars') {
        return {
            ...info,
            distanceErr: g.distance_err_ly[i],
            rGc: g.r_gc_ly[i],
            mass: g.mass_msun[i],
            rh: g.rh_ly[i],
            rt: g.rt_ly[i],
            vmag: g.vmag[i],
            resolved: g.resolved?.[i] ?? null,
            radius: g.rh_ly[i],
            label: `${g.name[i]} · globular cluster, ${fmt(g.distance_ly[i])} ly`,
        };
    }
    return {
        ...info,
        distanceRange: g.distance_range_ly[i],
        age: g.age_myr[i],
        ageRange: g.age_range_myr[i],
        members: g.members[i],
        r50: g.r50_ly[i],
        rt: g.rt_ly[i],
        av: g.av[i],
        radius: g.r50_ly[i],
        label: `${g.name[i]} · open cluster, ${fmt(g.distance_ly[i])} ly`,
    };
}

// What a kind is called, one and many
export const LANDMARK_NAMES = {
    globulars: ['Globular cluster', 'Globular clusters'],
    open_clusters: ['Open cluster', 'Open clusters'],
    nebulae: ['Nebula', 'Nebulae'],
};

// A landmark's size (ly) for its glow, marker fade and camera view
const radiusOf = (kind, g, i) => (kind === 'globulars' ? g.rh_ly[i] : kind === 'nebulae' ? g.radius_ly[i] : g.r50_ly[i]);

// Camera view of landmark i: from the Sun's side, looking at it with the
// sky beyond. {position, target, minDistance}
export function clusterPose(kind, g, i) {
    const target = new THREE.Vector3().fromArray(g.xyz_ly, 3 * i);
    const radius = radiusOf(kind, g, i) ?? 10;
    if (kind === 'nebulae') {
        const distance = NEBULA_VIEW_RADII * radius;
        const position = target.clone().addScaledVector(target.clone().normalize(), -distance);
        return { position: position.toArray(), target: target.toArray(), minDistance: radius * 0.3 };
    }
    const distance = Math.max(VIEW_RADII * radius, VIEW_MIN_LY);
    const position = target.clone().addScaledVector(target.clone().normalize(), -distance);
    return { position: position.toArray(), target: target.toArray(), minDistance: radius };
}

// A kind's stars (<kind>_stars.bin, see landmarks.json[kind].stars) ->
// {positions (scene ly), colors, absMags, count} for the star shader
export function decodeClusterStars(buffer, g) {
    const meta = g.stars;
    const count = meta.count;
    const off = new Int16Array(buffer, 0, count * 3);
    const bytes = new Uint8Array(buffer, count * 6);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const absMags = new Float32Array(count);
    for (const c of meta.clusters) {
        const cx = g.xyz_ly[3 * c.cluster], cy = g.xyz_ly[3 * c.cluster + 1], cz = g.xyz_ly[3 * c.cluster + 2];
        for (let k = c.start; k < c.start + c.count; k++) {
            positions[3 * k] = cx + off[3 * k] * c.scale_ly;
            positions[3 * k + 1] = cy + off[3 * k + 1] * c.scale_ly;
            positions[3 * k + 2] = cz + off[3 * k + 2] * c.scale_ly;
        }
    }
    const table = new Float32Array(256 * 3);
    for (let k = 0; k < 256; k++) table.set(bvToColor(k === meta.bv.missing ? null : meta.bv.min + k * meta.bv.step), k * 3);
    for (let k = 0; k < count; k++) {
        absMags[k] = meta.abs_mag.min + bytes[k] * meta.abs_mag.step;
        colors.set(table.subarray(bytes[count + k] * 3, bytes[count + k] * 3 + 3), 3 * k);
    }
    return { positions, colors, absMags, count };
}

const shellVertexShader = /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalMatrix * normal;
        vView = -mv.xyz;
        gl_Position = projectionMatrix * mv;
    }
`;
const shellFragmentShader = /* glsl */ `
    uniform vec3 uColor;
    uniform float uFade;
    uniform float uEdge;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
        // A thin shell's light grows with the path through it: 1 / |cos|
        float mu = abs(dot(normalize(vNormal), normalize(vView)));
        float glow = ${SHELL_FACE.toFixed(3)} / max(mu, uEdge);
        gl_FragColor = vec4(uColor * glow * uFade, 1.0);
    }
`;

// Whether the line of sight from the camera to world point p passes
// through a lobe: ellipsoid c (world centre), m (offset -> unit sphere)
const occlusionGlsl = /* glsl */ `
    uniform float uOccOn;
    uniform vec3 uOccC0;
    uniform mat3 uOccM0;
    uniform vec3 uOccC1;
    uniform mat3 uOccM1;
    float behind(vec3 p, vec3 c, mat3 m) {
        vec3 a = m * (cameraPosition - c);
        vec3 d = m * (p - c) - a;
        float qa = dot(d, d), qb = 2.0 * dot(a, d), qc = dot(a, a) - 1.0;
        float disc = qb * qb - 4.0 * qa * qc;
        if (qc <= 0.0 || disc <= 0.0) return 0.0;  // camera inside, or missed
        float s = (-qb - sqrt(disc)) / (2.0 * qa);
        return s > 0.0 && s < 1.0 ? 1.0 : 0.0;
    }
`;

// Smooth value noise, 0..1
const noiseGlsl = /* glsl */ `
    float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1) * 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }
    float noise(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
                   mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
    }
`;

// A cloud's points: each a soft dot of the part's point size (ly), its
// flux spread over it, so the gas's surface brightness holds as it's
// approached; a dot under a pixel keeps its total light. Dimmed behind a
// lobe; coloured by its own colour (rgb: from a photo, linear), or the
// part's
const cloudVertexShader = /* glsl */ `
    attribute float flux;
    attribute vec3 rgb;
    uniform float uFocalPx;
    uniform float uPointLy;
    varying float vFlux;
    varying vec3 vRgb;
    ${occlusionGlsl}
    void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vec4 mv = viewMatrix * world;
        float size = uPointLy * uFocalPx / max(-mv.z, 1e-6);  // device px
        gl_PointSize = clamp(size, 1.0, 64.0);
        float hidden = uOccOn > 0.5 ? max(behind(world.xyz, uOccC0, uOccM0), behind(world.xyz, uOccC1, uOccM1)) : 0.0;
        vFlux = flux * min(size * size, 1.0) * mix(1.0, ${DUST_HIDDEN.toFixed(3)}, hidden);
        vRgb = rgb;
        gl_Position = projectionMatrix * mv;
    }
`;
const cloudFragmentShader = /* glsl */ `
    uniform vec3 uColor;
    uniform float uRgbOn;
    uniform float uBright;
    uniform float uFade;
    varying float vFlux;
    varying vec3 vRgb;
    void main() {
        vec2 p = (gl_PointCoord - 0.5) * 2.0;
        float r2 = dot(p, p);
        if (r2 > 1.0) discard;
        // Gaussian, to 0 at the edge: neighbours blend
        float soft = (exp(-3.0 * r2) - 0.0498) / 0.9502;
        vec3 color = uRgbOn > 0.5 ? vRgb * uBright : uColor;
        gl_FragColor = vec4(color * vFlux * soft * uFade, 1.0);
    }
`;

// A dusty wall (shading "dusty"): only the side facing the camera (the
// mesh winds outward), lit by the star at the centre: Henyey-Greenstein
// scattering of its light towards the camera, a little darker where seen
// at a slant, mottled by value noise in the model's own frame; dimmed
// where the other lobe is in front
const dustVertexShader = /* glsl */ `
    uniform float uLocalScale;  // 1 / the model's half-length (its units)
    varying vec3 vWorld;
    varying vec3 vNormal;
    varying vec3 vLocal;
    varying float vLobe;
    void main() {
        vec4 world = modelMatrix * vec4(position, 1.0);
        vWorld = world.xyz;
        vNormal = normalize(mat3(modelMatrix) * normal);  // a rotation x scale
        vLocal = position * uLocalScale;
        vLobe = position.z >= 0.0 ? 1.0 : 0.0;
        gl_Position = projectionMatrix * viewMatrix * world;
    }
`;
const dustFragmentShader = /* glsl */ `
    uniform vec3 uColor;
    uniform vec3 uStar;
    uniform float uFade;
    varying vec3 vWorld;
    varying vec3 vNormal;
    varying vec3 vLocal;
    varying float vLobe;
    ${occlusionGlsl}
    ${noiseGlsl}
    void main() {
        vec3 view = normalize(cameraPosition - vWorld);
        float cosT = dot(normalize(vWorld - uStar), view);  // star -> dust -> camera
        float g = ${DUST_G.toFixed(2)};
        float hg = (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * cosT, 1.5);
        vec3 x = vLocal * ${DUST_CELLS.toFixed(1)};
        float n = (noise(x) * 0.5 + noise(2.0 * x) * 0.25 + noise(4.0 * x) * 0.125) / 0.875 * 2.0 - 1.0;
        // Brighter and darker patches, and thin dark lanes between cells
        float mottle = clamp(0.85 + 0.35 * n, 0.5, 1.2) * mix(0.65, 1.0, smoothstep(0.02, 0.08, abs(n)));
        float slant = mix(0.55, 1.0, abs(dot(normalize(vNormal), view)));
        float hidden = uOccOn > 0.5 ? (vLobe > 0.5 ? behind(vWorld, uOccC0, uOccM0) : behind(vWorld, uOccC1, uOccM1)) : 0.0;
        float glow = ${DUST_BRIGHT.toFixed(3)} * hg * mottle * slant * mix(1.0, ${DUST_HIDDEN.toFixed(3)}, hidden);
        gl_FragColor = vec4(clamp(uColor * glow * uFade, 0.0, 4.0), 1.0);
    }
`;

// A nebula's occluders (a dusty mesh part's lobes, ly from its centre) as
// uniforms, in the scene's frame
function occlusionUniforms(occluders, centre) {
    const uniforms = { uOccOn: { value: occluders ? 1 : 0 } };
    [0, 1].forEach((k) => {
        const o = occluders?.[k];
        uniforms[`uOccC${k}`] = { value: o ? centre.clone().add(new THREE.Vector3().fromArray(o.centre)) : new THREE.Vector3() };
        const m = new THREE.Matrix3();
        if (o) m.set(...o.inverse.flat());
        uniforms[`uOccM${k}`] = { value: m };
    });
    return uniforms;
}

// Where a part goes: its matrix (local units -> scene ly, see
// landmarks.json nebulae.models[i][k]) at the nebula's centre
function placePart(object, model, centre) {
    const m = model.matrix;
    object.matrixAutoUpdate = false;
    object.matrix.set(
        m[0][0], m[0][1], m[0][2], centre.x,
        m[1][0], m[1][1], m[1][2], centre.y,
        m[2][0], m[2][1], m[2][2], centre.z,
        0, 0, 0, 1,
    );
    object.renderOrder = -1;
    object.frustumCulled = false;
    object.visible = false;
    return object;
}

// A nebula's cloud part (nebula_<id>_<part>.bin: int16 x, y, z per point,
// then a uint8 log flux each, then with rgb uint8 r, g, b each) -> Points;
// occluders: its nebula's lobes
function nebulaCloud(buffer, model, centre, pixelRatio, occluders) {
    const count = model.count;
    const local = new Int16Array(buffer, 0, count * 3);
    const bytes = new Uint8Array(buffer, count * 6, count);
    const positions = new Float32Array(local);
    const flux = new Float32Array(count);
    for (let i = 0; i < count; i++) flux[i] = 10 ** (model.flux.min + bytes[i] * model.flux.step - model.flux.max);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('flux', new THREE.BufferAttribute(flux, 1));
    if (model.rgb) geometry.setAttribute('rgb', new THREE.BufferAttribute(new Uint8Array(buffer, count * 7, count * 3), 3, true));
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uColor: { value: new THREE.Color().fromArray(rgb(model.color).map(c => c * model.brightness)) },
            uRgbOn: { value: model.rgb ? 1 : 0 },
            uBright: { value: model.brightness },
            uFade: { value: 0 },
            uFocalPx: { value: 1 },
            uPointLy: { value: model.point_ly * pixelRatio },
            ...occlusionUniforms(occluders, centre),
        },
        vertexShader: cloudVertexShader,
        fragmentShader: cloudFragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
    });
    return placePart(new THREE.Points(geometry, material), model, centre);
}

// A nebula's mesh part (nebula_<id>_<part>.bin: float32 vertices, then
// uint16 or uint32 triangles) -> a Mesh; occluders: its nebula's lobes
function nebulaMesh(buffer, model, centre, occluders) {
    const positions = new Float32Array(buffer, 0, model.vertices * 3);
    const Index = model.index === 'uint32' ? Uint32Array : Uint16Array;
    const index = new Index(buffer, model.vertices * 12, model.triangles * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setIndex(new THREE.BufferAttribute(index, 1));
    geometry.computeVertexNormals();
    if (model.shading === 'dusty') {
        geometry.computeBoundingBox();
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uColor: { value: new THREE.Color(model.color).multiplyScalar(model.brightness) },  // as seen (sRGB) -> linear
                uStar: { value: centre.clone() },
                uFade: { value: 0 },
                uLocalScale: { value: 2 / (geometry.boundingBox.max.z - geometry.boundingBox.min.z) },
                ...occlusionUniforms(occluders, centre),
            },
            vertexShader: dustVertexShader,
            fragmentShader: dustFragmentShader,
            transparent: true,
            depthWrite: false,
            depthTest: false,
            side: THREE.FrontSide,
            blending: THREE.AdditiveBlending,
        });
        return placePart(new THREE.Mesh(geometry, material), model, centre);
    }
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uColor: { value: new THREE.Color().fromArray(rgb(model.color).map(c => c * model.brightness)) },
            uFade: { value: 0 },
            uEdge: { value: model.edge ?? SHELL_EDGE },
        },
        vertexShader: shellVertexShader,
        fragmentShader: shellFragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
    });
    return placePart(new THREE.Mesh(geometry, material), model, centre);
}

// scene: the star layer's scene; kind: a LANDMARK_KINDS key; g:
// landmarks.json[kind]. Returns {update(cameraLy, viewportHeightPx,
// fovDeg), fade(), setVisible(on), setStarsOn(on) (their stars are drawn),
// addModels(buffers) (nebulae: every part's file, in order),
// nearest(cameraLy) (ly to the nearest one's centre), labels() [{index,
// name, position (Vector3)}], info(i), pick(camera, width, height, x, y,
// radiusPx) -> index | null, dispose()}
export function buildClusters(scene, kind, g, pixelRatio) {
    const k = KIND[kind];
    const n = g.name.length;
    const radius = new Float32Array(n);
    const marker = new Float32Array(n);
    const unresolved = new Float32Array(n);
    const colors = new Float32Array(n * 3);
    const globularColor = rgb(GLOBULAR_COLOR);
    for (let i = 0; i < n; i++) {
        // (a nebula's radius scaled so its dot fades as its model grows past it)
        radius[i] = (kind === 'nebulae' ? radiusOf(kind, g, i) / GLOBULAR_RADII : radiusOf(kind, g, i)) ?? 0;
        const size = kind === 'globulars' ? Math.log10(g.mass_msun[i] ?? 1e4) : kind === 'nebulae' ? 0 : Math.log10(g.members[i] || 10);
        const t = THREE.MathUtils.clamp((size - k.sizeRange[0]) / (k.sizeRange[1] - k.sizeRange[0]), 0, 1);
        marker[i] = k.markerPx[0] + (k.markerPx[1] - k.markerPx[0]) * t;
        unresolved[i] = 1 - (g.resolved?.[i] ?? 0);
        colors.set(kind === 'globulars' ? globularColor : kind === 'nebulae' ? rgb(g.color[i]) : openAgeColor(g.age_myr[i]), 3 * i);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(g.xyz_ly, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('radius', new THREE.BufferAttribute(radius, 1));
    geometry.setAttribute('marker', new THREE.BufferAttribute(marker, 1));
    geometry.setAttribute('unresolved', new THREE.BufferAttribute(unresolved, 1));
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uFocalPx: { value: 1 },
            uPixelRatio: { value: pixelRatio },
            uFade: { value: 0 },
            uStarsOn: { value: 0 },
            uGlow: { value: k.glow ? 1 : 0 },
            uBrightness: { value: k.brightness },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    // After the dust volume (-2.5): their own light is what's drawn
    points.renderOrder = -1;
    points.frustumCulled = false;
    points.visible = false;
    scene.add(points);

    const labels = [];
    for (let i = 0; i < n; i++) {
        if (g.label[i]) labels.push({ index: i, name: g.name[i], position: new THREE.Vector3().fromArray(g.xyz_ly, 3 * i) });
    }
    // Nebulae's model parts, once loaded: {index, mesh, centre, radius}
    const models = [];
    let wanted = true;
    let fade = 0;
    const projected = new THREE.Vector3();
    return {
        update: (cameraLy, viewportHeightPx, fovDeg) => {
            fade = wanted ? THREE.MathUtils.smoothstep(cameraLy.length(), ...FADE_IN_LY) : 0;
            points.visible = fade > 0;
            material.uniforms.uFade.value = fade;
            const focal = viewportHeightPx / (2 * Math.tan(THREE.MathUtils.degToRad(fovDeg) / 2));
            material.uniforms.uFocalPx.value = focal * pixelRatio;
            // A model fades in as its dot fades out (the vertex shader's
            // near); real wherever the camera is, so not with the dots' fade
            for (const m of models) {
                const px = 2 * m.radius * focal / Math.max(m.centre.distanceTo(cameraLy), 1e-9);
                const f = wanted ? THREE.MathUtils.smoothstep(px, marker[m.index], 4 * marker[m.index]) : 0;
                m.mesh.material.uniforms.uFade.value = f;
                if (m.mesh.material.uniforms.uFocalPx) m.mesh.material.uniforms.uFocalPx.value = focal;
                m.mesh.visible = f > 0;
            }
        },
        fade: () => fade,
        setVisible: (on) => { wanted = on; },
        setStarsOn: (on) => { material.uniforms.uStarsOn.value = on || models.length ? 1 : 0; },
        addModels: (buffers) => {
            let b = 0;
            g.models.forEach((parts, i) => {
                const centre = new THREE.Vector3().fromArray(g.xyz_ly, 3 * i);
                const occluders = parts.find(p => p.occluders)?.occluders;
                for (const part of parts) {
                    const mesh = part.kind === 'cloud' ? nebulaCloud(buffers[b++], part, centre, pixelRatio, occluders)
                        : nebulaMesh(buffers[b++], part, centre, occluders);
                    scene.add(mesh);
                    models.push({ index: i, mesh, centre, radius: g.radius_ly[i] });
                }
            });
            material.uniforms.uStarsOn.value = models.length ? 1 : material.uniforms.uStarsOn.value;
        },
        nearest: (cameraLy) => {
            let best = Infinity;
            for (let i = 0; i < n; i++) {
                const dx = g.xyz_ly[3 * i] - cameraLy.x, dy = g.xyz_ly[3 * i + 1] - cameraLy.y, dz = g.xyz_ly[3 * i + 2] - cameraLy.z;
                best = Math.min(best, dx * dx + dy * dy + dz * dz);
            }
            return Math.sqrt(best);
        },
        labels: () => labels,
        info: (i) => clusterInfo(kind, g, i),
        // Index of the cluster drawn nearest (x, y) px within radiusPx (or
        // under a globular's glow, if that's bigger), once clearly visible
        pick: (camera, width, height, x, y, radiusPx) => {
            if (fade < 0.3) return null;
            let best = null;
            let bestD = Infinity;
            const focal = height / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
            for (let i = 0; i < n; i++) {
                projected.fromArray(g.xyz_ly, 3 * i);
                const dist = projected.distanceTo(camera.position);
                projected.project(camera);
                if (projected.z > 1 || projected.z < -1) continue;
                const d = Math.hypot((projected.x + 1) / 2 * width - x, (1 - projected.y) / 2 * height - y);
                const reach = k.glow ? Math.max(radiusPx, GLOBULAR_RADII * radius[i] * focal / dist * 0.5) : radiusPx;
                if (d < reach && d < bestD) {
                    bestD = d;
                    best = i;
                }
            }
            return best;
        },
        dispose: () => {
            for (const m of models) {
                scene.remove(m.mesh);
                m.mesh.geometry.dispose();
                m.mesh.material.dispose();
            }
            scene.remove(points);
            geometry.dispose();
            material.dispose();
        },
    };
}
