// The circumnuclear disc's dust round Sgr A* (galactic_centre.json cnd +
// gc_cnd_dust.bin, from Star_Data/scripts/build_galactic_centre.py): A_V
// per pc on a grid in the disc's own frame (u along its line of nodes, v
// across, w its spin; pc from Sgr A*), uint8, log-coded. Where its gas is:
// ALMA's HCN map, the gas moving as the fitted disc, laid in its plane.
//
// It hides what's behind it: the nucleus's glow and points (Galactocentric
// kpc), the close-up's stars (AU) and the minispiral (ly), each sampling it
// between the camera and itself (CND_GLSL). Each frame has its own
// uniforms (its units and axes, cnd.uniforms(frame)); the texture, the
// camera (in the disc's frame, worked out in doubles) and the switch are
// shared, so loading it reaches them all.

import * as THREE from 'three';
import { DUST_MAG_PER_TAU } from './dustMap.js';

const PC_PER_LY = 1 / 3.261563777;
const PC_PER_AU = 1 / 206264.806;
// Samples per ray through the disc's box: glow fragments (also the most
// the march keeps: CND_NODES - 1), points
export const CND_STEPS = { full: { glow: 48, points: 16 }, lite: { glow: 24, points: 8 } };
export const CND_NODES = 49;
// A sample at least every this far along a point's sight line (pc)
const POINT_SPAN_PC = 0.08;

// q: the layer's position (its units) in the disc's frame (pc). cndSpan:
// where q0 + t dq is in the disc's box, t within [t0, t1]. cndDensity: A_V
// per pc at q. cndTauTo: tau_V from the camera to q (at most nMax samples).
// After DUST_GLSL or alone (both declare the sampler precision).
export const CND_GLSL = /* glsl */ `
    precision highp sampler3D;
    uniform sampler3D uCnd;
    uniform float uCndOn;     // 1 once the grid is in
    uniform mat3 uCndAxes;    // layer units -> the disc's frame (pc)
    uniform vec3 uCndOrigin;  // Sgr A* in the layer's units
    uniform vec3 uCndCam;     // the camera in the disc's frame (pc)
    uniform vec3 uCndHalf;    // the box's half sizes (pc)
    uniform vec2 uCndCode;    // log10 A_V per pc at codes 1 and 255
    vec3 cndFrame(vec3 p) { return uCndAxes * (p - uCndOrigin); }
    bool cndSpan(vec3 q0, vec3 dq, float t0, float t1, out float ta, out float tb) {
        vec3 safe = vec3(abs(dq.x) < 1e-12 ? 1e-12 : dq.x, abs(dq.y) < 1e-12 ? 1e-12 : dq.y, abs(dq.z) < 1e-12 ? 1e-12 : dq.z);
        vec3 a = (-uCndHalf - q0) / safe;
        vec3 b = (uCndHalf - q0) / safe;
        vec3 lo = min(a, b), hi = max(a, b);
        ta = max(max(lo.x, lo.y), max(lo.z, t0));
        tb = min(min(hi.x, hi.y), min(hi.z, t1));
        return uCndOn > 0.0 && tb > ta;
    }
    float cndDensity(vec3 q) {
        float k = texture(uCnd, q / (2.0 * uCndHalf) + 0.5).r * 255.0;
        // Between an empty voxel and its neighbour: fade from the floor
        if (k < 1.0) return k * pow(10.0, uCndCode.x);
        return pow(10.0, uCndCode.x + (k - 1.0) / 254.0 * (uCndCode.y - uCndCode.x));
    }
    float cndTauTo(vec3 q, int nMax, float jitter) {
        vec3 dq = q - uCndCam;
        float ta, tb;
        if (!cndSpan(uCndCam, dq, 0.0, 1.0, ta, tb)) return 0.0;
        float len = length(dq);
        int n = clamp(int(ceil((tb - ta) * len / ${POINT_SPAN_PC.toFixed(3)})), 2, nMax);
        float dt = (tb - ta) / float(n);
        float sum = 0.0;
        for (int i = 0; i < 64; i++) {
            if (i >= n) break;
            sum += cndDensity(uCndCam + dq * (ta + (float(i) + jitter) * dt));
        }
        return sum * dt * len / ${DUST_MAG_PER_TAU.toFixed(6)};
    }
`;

// Light added up along a ray (the nucleus's glow), dimmed by the disc in
// front of each sample: cndPrepare marches the disc along the ray (origin
// + t dir, t0..t1) and keeps the running tau_V at CND_NODES; then
// cndTransmission(t) is the light let through to t. Before BAND_GLSL, with
// #define NUCLEUS_ATTENUATION(t) cndTransmission(t) (see milkyWayBand).
export const CND_RAY_GLSL = /* glsl */ `
    float gCndTau[${CND_NODES}];
    float gCndTa;
    float gCndDt;
    int gCndN;
    void cndPrepare(vec3 dir, float t0, float t1, int n, float jitter) {
        gCndN = 0;
        vec3 dq = uCndAxes * dir;
        float ta, tb;
        if (!cndSpan(uCndCam, dq, t0, t1, ta, tb)) return;
        gCndN = min(n, ${CND_NODES - 1});
        gCndTa = ta;
        gCndDt = (tb - ta) / float(gCndN);
        float perStep = gCndDt * length(dq) / ${DUST_MAG_PER_TAU.toFixed(6)};
        gCndTau[0] = 0.0;
        for (int i = 0; i < ${CND_NODES - 1}; i++) {
            if (i >= gCndN) break;
            gCndTau[i + 1] = gCndTau[i] + cndDensity(uCndCam + dq * (ta + (float(i) + jitter) * gCndDt)) * perStep;
        }
    }
    float cndTransmission(float t) {
        if (gCndN == 0) return 1.0;
        float x = clamp((t - gCndTa) / gCndDt, 0.0, float(gCndN));
        int k = min(int(x), gCndN - 1);
        return exp(-mix(gCndTau[k], gCndTau[k + 1], x - float(k)));
    }
`;

// Rows of a Matrix3: v -> (u.v, v.v, w.v), times scale
function axesMatrix(axes, scale, after = null) {
    const m = new THREE.Matrix3().set(
        ...axes.u.map(x => x * scale),
        ...axes.v.map(x => x * scale),
        ...axes.w.map(x => x * scale),
    );
    return after ? m.multiply(after) : m;
}

// The disc's state and uniforms. Returns {uniforms(frame), load(meta,
// buffer, toScene), loaded(), update(cameraLy), dispose()}. frame: 'gc'
// (the close-up's layer: AU from Sgr A*, the scene's axes), 'star' (the
// star layer: ly from the Sun), 'galactocentric' (kpc; galaxy.json
// to_scene, given to load)
export function createCnd() {
    const shared = {
        uCnd: { value: null },
        uCndOn: { value: 0 },
        uCndCam: { value: new THREE.Vector3() },
        uCndHalf: { value: new THREE.Vector3(1, 1, 1) },
        uCndCode: { value: new THREE.Vector2() },
    };
    const frames = {};
    for (const frame of ['gc', 'star', 'galactocentric']) {
        frames[frame] = { ...shared, uCndAxes: { value: new THREE.Matrix3() }, uCndOrigin: { value: new THREE.Vector3() } };
    }
    let meta = null;
    let originLy = null;
    let axesLy = null;
    const cam = new THREE.Vector3();

    return {
        uniforms: frame => frames[frame],
        // meta: galactic_centre.json's cnd; originLy: its origin_ly;
        // toScene: galaxy.json's (Galactocentric kpc -> scene ly)
        load(m, buffer, origin, toScene) {
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
            shared.uCnd.value = tex;
            shared.uCndHalf.value.fromArray(m.half_pc);
            shared.uCndCode.value.set(m.encoding.log_lo, m.encoding.log_hi);
            originLy = new THREE.Vector3().fromArray(origin);
            axesLy = axesMatrix(m.axes, PC_PER_LY);
            frames.gc.uCndAxes.value.copy(axesMatrix(m.axes, PC_PER_AU));
            frames.star.uCndAxes.value.copy(axesLy);
            frames.star.uCndOrigin.value.copy(originLy);
            // Galactocentric kpc -> scene ly (its 3x3; Sgr A* at its origin)
            const r = toScene.matrix;
            const gcToScene = new THREE.Matrix3().set(...r[0], ...r[1], ...r[2]);
            frames.galactocentric.uCndAxes.value.copy(axesMatrix(m.axes, PC_PER_LY, gcToScene));
            shared.uCndOn.value = 1;
        },
        loaded: () => meta !== null,
        // cameraLy: the master camera (ly, doubles)
        update(cameraLy) {
            if (!meta) return;
            shared.uCndCam.value.copy(cam.subVectors(cameraLy, originLy).applyMatrix3(axesLy));
        },
        dispose: () => shared.uCnd.value?.dispose(),
    };
}
