// Local dust grids round the Galactic Centre (galactic_centre.json, from
// Star_Data/scripts/build_galactic_centre.py): A_V per pc on a grid in the
// grid's own frame (axes u, v, w; pc from its centre), uint8, log-coded.
//   - the circumnuclear disc (cnd, gc_cnd_dust.bin): ALMA's HCN map, the
//     gas moving as the fitted disc, laid in its plane; 8 pc across
//   - the Central Molecular Zone (cmz, gc_cmz_dust.bin): Herschel's dust
//     column, each cloud at its measured distance along our line of sight
//     (3-D CMZ V), the gas round them at their nearest clouds'; ~400 pc
//
// They hide what's behind them. Each consumer samples a grid between the
// camera and itself in its own units: the nucleus's glow and points
// (Galactocentric kpc), the close-up's stars (AU), the minispiral (ly), the
// band and the galaxy's dust volume (kpc). The GLSL and uniforms come from
// one factory with a name (Cnd / Cmz), so a shader can hold both: uCnd,
// cndTauTo, cndPrepare... and uCmz, cmzTauTo... Each frame has its own
// uniforms (its units and axes, grid.uniforms(frame)); the texture, the
// camera (in the grid's frame, worked out in doubles) and the switch are
// shared, so loading a grid reaches every material.

import * as THREE from 'three';
import { DUST_MAG_PER_TAU } from './dustMap.js';

const PC_PER_LY = 1 / 3.261563777;
const PC_PER_AU = 1 / 206264.806;
const AU_PER_PC = 206264.806;
const LY_PER_PC = 3.261563777;
// The most nodes a ray's march keeps (local dust in front of each light
// sample: dustRayGlsl)
export const DUST_NODES = 49;

// The two grids: GLSL names; samples per ray through its box (glow
// fragments, at most DUST_NODES - 1; points); a point's sight line gets a
// sample at least every span_pc (its features' size)
export const LOCAL_DUST = {
    cnd: { name: 'Cnd', file: 'cnd', steps: { full: { glow: 48, points: 16 }, lite: { glow: 24, points: 8 } }, span_pc: 0.08 },
    cmz: { name: 'Cmz', file: 'cmz', steps: { full: { glow: 48, points: 12 }, lite: { glow: 24, points: 6 } }, span_pc: 2.0 },
};

// q: the layer's position (its units) in the grid's frame (pc). <p>Span:
// where q0 + t dq is in the grid's box, t within [t0, t1]. <p>Density: A_V
// per pc at q. <p>TauTo: tau_V from the camera to q (at most nMax
// samples). After DUST_GLSL or alone (both declare the sampler precision).
export function dustGlsl(key) {
    const { name: N, span_pc: span } = LOCAL_DUST[key];
    const p = key;
    return /* glsl */ `
    precision highp sampler3D;
    uniform sampler3D u${N};
    uniform float u${N}On;     // 1 once the grid is in
    uniform mat3 u${N}Axes;    // layer units -> the grid's frame (pc)
    uniform vec3 u${N}Origin;  // the grid's centre in the layer's units
    uniform vec3 u${N}Cam;     // the camera in the grid's frame (pc)
    uniform vec3 u${N}Half;    // the box's half sizes (pc)
    uniform vec2 u${N}Code;    // log10 A_V per pc at codes 1 and 255
    vec3 ${p}Frame(vec3 p) { return u${N}Axes * (p - u${N}Origin); }
    bool ${p}Span(vec3 q0, vec3 dq, float t0, float t1, out float ta, out float tb) {
        vec3 safe = vec3(abs(dq.x) < 1e-12 ? 1e-12 : dq.x, abs(dq.y) < 1e-12 ? 1e-12 : dq.y, abs(dq.z) < 1e-12 ? 1e-12 : dq.z);
        vec3 a = (-u${N}Half - q0) / safe;
        vec3 b = (u${N}Half - q0) / safe;
        vec3 lo = min(a, b), hi = max(a, b);
        ta = max(max(lo.x, lo.y), max(lo.z, t0));
        tb = min(min(hi.x, hi.y), min(hi.z, t1));
        return u${N}On > 0.0 && tb > ta;
    }
    float ${p}Density(vec3 q) {
        float k = texture(u${N}, q / (2.0 * u${N}Half) + 0.5).r * 255.0;
        // Between an empty voxel and its neighbour: fade from the floor
        if (k < 1.0) return k * pow(10.0, u${N}Code.x);
        return pow(10.0, u${N}Code.x + (k - 1.0) / 254.0 * (u${N}Code.y - u${N}Code.x));
    }
    // tau_V along q0 + t dq, t from ta to tb (n samples, at jitter in each)
    float ${p}TauAlong(vec3 q0, vec3 dq, float ta, float tb, int n, float jitter) {
        float dt = (tb - ta) / float(n);
        float sum = 0.0;
        for (int i = 0; i < 64; i++) {
            if (i >= n) break;
            sum += ${p}Density(q0 + dq * (ta + (float(i) + jitter) * dt));
        }
        return sum * dt * length(dq) / ${DUST_MAG_PER_TAU.toFixed(6)};
    }
    float ${p}TauTo(vec3 q, int nMax, float jitter) {
        vec3 dq = q - u${N}Cam;
        float ta, tb;
        if (!${p}Span(u${N}Cam, dq, 0.0, 1.0, ta, tb)) return 0.0;
        int n = clamp(int(ceil((tb - ta) * length(dq) / ${span.toFixed(3)})), 2, nMax);
        return ${p}TauAlong(u${N}Cam, dq, ta, tb, n, jitter);
    }
    // tau_V along the camera's ray dir (layer units), t0..t1 (layer units)
    float ${p}TauRay(vec3 dir, float t0, float t1, int nMax, float jitter) {
        vec3 dq = u${N}Axes * dir;
        float ta, tb;
        if (!${p}Span(u${N}Cam, dq, t0, t1, ta, tb)) return 0.0;
        int n = clamp(int(ceil((tb - ta) * length(dq) / ${span.toFixed(3)})), 2, nMax);
        return ${p}TauAlong(u${N}Cam, dq, ta, tb, n, jitter);
    }
`;
}

// Light added up along a ray (the nucleus's glow, the band), dimmed by the
// grid in front of each sample: <p>Prepare marches the grid along the
// camera's ray (dir, t0..t1, the layer's units) and keeps the running
// tau_V at DUST_NODES; then <p>TauAt(t) is the tau_V in front of t and
// <p>Transmission(t) the light let through. After dustGlsl(key).
export function dustRayGlsl(key) {
    const { name: N } = LOCAL_DUST[key];
    const p = key;
    return /* glsl */ `
    float g${N}Tau[${DUST_NODES}];
    float g${N}Ta;
    float g${N}Dt;
    int g${N}N;
    void ${p}Prepare(vec3 dir, float t0, float t1, int n, float jitter) {
        g${N}N = 0;
        vec3 dq = u${N}Axes * dir;
        float ta, tb;
        if (!${p}Span(u${N}Cam, dq, t0, t1, ta, tb)) return;
        g${N}N = min(n, ${DUST_NODES - 1});
        g${N}Ta = ta;
        g${N}Dt = (tb - ta) / float(g${N}N);
        float perStep = g${N}Dt * length(dq) / ${DUST_MAG_PER_TAU.toFixed(6)};
        g${N}Tau[0] = 0.0;
        for (int i = 0; i < ${DUST_NODES - 1}; i++) {
            if (i >= g${N}N) break;
            g${N}Tau[i + 1] = g${N}Tau[i] + ${p}Density(u${N}Cam + dq * (ta + (float(i) + jitter) * g${N}Dt)) * perStep;
        }
    }
    float ${p}TauAt(float t) {
        if (g${N}N == 0) return 0.0;
        float x = clamp((t - g${N}Ta) / g${N}Dt, 0.0, float(g${N}N));
        int k = min(int(x), g${N}N - 1);
        return mix(g${N}Tau[k], g${N}Tau[k + 1], x - float(k));
    }
    float ${p}Transmission(float t) { return exp(-${p}TauAt(t)); }
`;
}

// Rows of a Matrix3: v -> (u.v, v.v, w.v), times scale
function axesMatrix(axes, scale, after = null) {
    const m = new THREE.Matrix3().set(
        ...axes.u.map(x => x * scale),
        ...axes.v.map(x => x * scale),
        ...axes.w.map(x => x * scale),
    );
    return after ? m.multiply(after) : m;
}

// A grid's state and uniforms (key: 'cnd' | 'cmz'). Returns
// {uniforms(frame), load(meta, buffer, originLy, toScene), loaded(),
// update(cameraLy), onChange(fn), dispose()}. frame: 'gc' (the close-up's
// layer: AU from Sgr A*, the scene's axes), 'star' (the star layer: ly from
// the Sun), 'galactocentric' (kpc; galaxy.json to_scene, given to load)
export function createLocalDust(key) {
    const { name: N } = LOCAL_DUST[key];
    const shared = {
        [`u${N}`]: { value: null },
        [`u${N}On`]: { value: 0 },
        [`u${N}Cam`]: { value: new THREE.Vector3() },
        [`u${N}Half`]: { value: new THREE.Vector3(1, 1, 1) },
        [`u${N}Code`]: { value: new THREE.Vector2() },
    };
    const frames = {};
    for (const frame of ['gc', 'star', 'galactocentric']) {
        frames[frame] = { ...shared, [`u${N}Axes`]: { value: new THREE.Matrix3() }, [`u${N}Origin`]: { value: new THREE.Vector3() } };
    }
    let meta = null;
    let centreLy = null;  // the grid's centre, scene ly
    let axesLy = null;
    const cam = new THREE.Vector3();
    const listeners = new Set();

    return {
        uniforms: frame => frames[frame],
        // meta: galactic_centre.json's cnd / cmz; originLy: its origin_ly
        // (Sgr A*); toScene: galaxy.json's (Galactocentric kpc -> scene ly)
        load(m, buffer, originLy, toScene) {
            meta = m;
            const [nx, ny, nz] = m.size;
            const tex = new THREE.Data3DTexture(new Uint8Array(buffer), nx, ny, nz);
            tex.format = THREE.RedFormat;
            tex.type = THREE.UnsignedByteType;
            tex.minFilter = tex.magFilter = THREE.LinearFilter;
            tex.wrapS = tex.wrapT = tex.wrapR = THREE.ClampToEdgeWrapping;
            tex.unpackAlignment = 1;
            tex.generateMipmaps = false;
            tex.needsUpdate = true;
            shared[`u${N}`].value = tex;
            shared[`u${N}Half`].value.fromArray(m.half_pc);
            shared[`u${N}Code`].value.set(m.encoding.log_lo, m.encoding.log_hi);
            // The grid's centre: Sgr A* plus its offset (scene frame, pc)
            const offsetPc = new THREE.Vector3().fromArray(m.centre_pc ?? [0, 0, 0]);
            centreLy = new THREE.Vector3().fromArray(originLy).addScaledVector(offsetPc, LY_PER_PC);
            axesLy = axesMatrix(m.axes, PC_PER_LY);
            frames.gc[`u${N}Axes`].value.copy(axesMatrix(m.axes, PC_PER_AU));
            frames.gc[`u${N}Origin`].value.copy(offsetPc).multiplyScalar(AU_PER_PC);
            frames.star[`u${N}Axes`].value.copy(axesLy);
            frames.star[`u${N}Origin`].value.copy(centreLy);
            // Galactocentric kpc -> scene ly (its 3x3; Sgr A* at its origin)
            const r = toScene.matrix;
            const gcToScene = new THREE.Matrix3().set(...r[0], ...r[1], ...r[2]);
            frames.galactocentric[`u${N}Axes`].value.copy(axesMatrix(m.axes, PC_PER_LY, gcToScene));
            frames.galactocentric[`u${N}Origin`].value.copy(offsetPc).multiplyScalar(LY_PER_PC)
                .applyMatrix3(gcToScene.clone().invert());
            shared[`u${N}On`].value = 1;
            listeners.forEach(fn => fn());
        },
        loaded: () => meta !== null,
        // cameraLy: the master camera (ly, doubles)
        update(cameraLy) {
            if (!meta) return;
            shared[`u${N}Cam`].value.copy(cam.subVectors(cameraLy, centreLy).applyMatrix3(axesLy));
        },
        onChange: (fn) => {
            listeners.add(fn);
            return () => listeners.delete(fn);
        },
        dispose: () => {
            shared[`u${N}`].value?.dispose();
            listeners.clear();
        },
    };
}

// The circumnuclear disc's, under the names the shaders have used
export const CND_GLSL = dustGlsl('cnd');
export const CND_RAY_GLSL = dustRayGlsl('cnd');
export const CND_STEPS = LOCAL_DUST.cnd.steps;
export const createCnd = () => createLocalDust('cnd');
// The Central Molecular Zone's
export const CMZ_GLSL = dustGlsl('cmz');
export const CMZ_RAY_GLSL = dustRayGlsl('cmz');
export const CMZ_STEPS = LOCAL_DUST.cmz.steps;
export const createCmz = () => createLocalDust('cmz');
