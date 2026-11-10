// Gravitational lensing by a black hole (Schwarzschild; GM/c^2 = rg): Sgr
// A* (galactic_centre.json black_hole), or a stellar one (black_holes.json,
// utils/blackHoles3d), whichever the camera is near: one at a time.
//
// The bending: a ray passing with impact parameter b (in rg) is turned by
// alpha(b), exact in Schwarzschild's geometry (Darwin 1959: elliptic
// integrals, worked out here once into a table): 4/b far out, growing
// without limit as b nears 3 sqrt(3), where light circles the hole before
// going on (the photon ring); rays with smaller b fall in (the shadow). An
// observer at distance r sees the shadow's edge at sin(angle) = 3 sqrt(3)
// rg sqrt(1 - 2 rg / r) / r. From an observer at r, a ray at angle theta
// from the hole is bent by the share still ahead of it, alpha(b) (1 + cos
// theta) / 2 (the weak field's share; exactly half at the closest
// approach; smooth through it).
//
// Two parts:
//   - the background (the sky and star layers: the galaxy, the cluster's
//     glow and points, the minispiral...), as a pass after the star layer:
//     each pixel's ray, bent by alpha(b), looks up the image where it ends
//     up (as if its source were far off: the background is pc away, the
//     camera AU); captured rays are black. Where the bent ray leaves the
//     screen (strong bending, the photon ring) it looks up the background
//     all round the camera (utils/lensSky's cube map; until that's drawn,
//     the screen's mean light). Surface brightness is kept (Liouville): no magnification
//     factor needed, arcs come out stretched as they should. Its alpha:
//     the share of what's behind showing (0 in the shadow; a disc's or the
//     gas's see-through share), for the far stars drawn after it
//   - the far stars (the star layer's, a cluster's fast stars: FAR_LENS_GLSL,
//     FarStarsPass): points, not stretched; each drawn twice, at its two
//     images, from a table of the images against the star's angle from the
//     hole, as if far off
//   - the close-up's stars (LENS_GLSL, in their vertex shader): each star
//     behind the hole drawn twice, its direct image and the one round the
//     other side, found with the exact bending at its own distance, each
//     brightened or dimmed by its magnification. Up close the second
//     images crowd round the shadow: a ring of the whole sky behind
//
// What's ours: the off-screen fallback (the screen's mean light); a dimmed
// image shown smaller (its sprite's area times its magnification: the
// close-up's sprites all sit at their size cap, which would hide it) and
// never over the shadow; no images past the second (the photon ring's
// thin ones); no Doppler or gravitational shifts of colour.
//
// A spinning black hole (Kerr; a stellar one with a measured spin, and its
// disc: KERR_GLSL) is traced instead: each pixel's ray, from a camera at
// rest there, along the exact path light takes, integrated (RK4) in
// Kerr-Schild coordinates (Cartesian, the horizon no obstacle) within
// KERR_R rg of the hole; outside, weak-field bending in the same
// coordinates' form. Where it crosses the disc's plane between its inner
// and outer edges, the disc: a blackbody at its temperature there, shifted
// by the gas's motion and gravity (g = the photon's energy at the camera
// over the gas's, its circular orbit's), so its colour too. Where it falls
// in, black; else the background, as above. The companion star (a ball of
// its volume's size) hides the disc behind it. Rays farther out than
// KERR_R take the bending as above (spin's share a / b^2: under 1e-6 rad).

import * as THREE from 'three';
import { Pass } from 'three/addons/postprocessing/Pass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

// The critical impact parameter (rg): rays inside it fall in
export const B_CRIT = 3 * Math.sqrt(3);
// The table: alpha against x = ln(b / B_CRIT - 1), TABLE_X0 to TABLE_X1
// (b - B_CRIT from 1e-7 B_CRIT to ~2,000 B_CRIT), TABLE_SIZE samples;
// beyond, 4 / b + 15 pi / (4 b^2)
const TABLE_SIZE = 512;
const TABLE_X0 = Math.log(1e-7);
const TABLE_X1 = Math.log(2000);
// The pass runs while the camera is within this many rg of the hole (the
// Einstein ring of a far background then a couple of px or more)
const LENS_REACH_RG = 3e6;

// Carlson's R_F (duplication)
function carlsonRF(x, y, z) {
    for (let i = 0; i < 60; i++) {
        const sx = Math.sqrt(x), sy = Math.sqrt(y), sz = Math.sqrt(z);
        const lam = sx * sy + sy * sz + sz * sx;
        x = (x + lam) / 4;
        y = (y + lam) / 4;
        z = (z + lam) / 4;
        const mu = (x + y + z) / 3;
        if (Math.max(Math.abs(x - mu), Math.abs(y - mu), Math.abs(z - mu)) / mu < 1e-12) break;
    }
    const mu = (x + y + z) / 3;
    const X = 1 - x / mu, Y = 1 - y / mu, Z = 1 - z / mu;
    const e2 = X * Y - Z * Z, e3 = X * Y * Z;
    return (1 - e2 / 10 + e3 / 14 + e2 * e2 / 24 - 3 * e2 * e3 / 44) / Math.sqrt(mu);
}
// Incomplete elliptic integral of the first kind F(phi | k^2)
function ellipticF(phi, k2) {
    const s = Math.sin(phi), c = Math.cos(phi);
    return s * carlsonRF(c * c, 1 - k2 * s * s, 1);
}

// The bending (radians) of a ray from far off to far off, impact parameter
// b > B_CRIT (rg): Darwin 1959 (checked against direct integration and
// 4 / b far out)
export function deflection(b) {
    const r0 = (2 * b / Math.sqrt(3)) * Math.cos(Math.acos(-B_CRIT / b) / 3);  // closest approach
    const Q = Math.sqrt((r0 - 2) * (r0 + 6));
    const k2 = (Q - r0 + 6) / (2 * Q);
    const phi = Math.asin(Math.sqrt((Q - r0 + 2) / (Q - r0 + 6)));
    return -Math.PI + 4 * Math.sqrt(r0 / Q) * (ellipticF(Math.PI / 2, k2) - ellipticF(phi, k2));
}

function deflectionTexture() {
    const tex = new THREE.DataTexture(deflectionData(), TABLE_SIZE, 1, THREE.RedFormat, THREE.FloatType);
    tex.minFilter = tex.magFilter = THREE.NearestFilter;
    tex.needsUpdate = true;
    return tex;
}

// The bending of a ray leaving an observer r (rg) from the hole at angle
// theta from the direction to it, from here on: the far-off-to-far-off
// bending times (1 + cos theta) / 2, the share still ahead (the weak
// field's; exactly half at the closest approach, by symmetry; and smooth
// through it). ALPHA_GLSL needs uLensTable, uLensTableX.
const ALPHA_GLSL = /* glsl */ `
    const float LENS_BC = ${B_CRIT.toFixed(6)};
    const float LENS_PI = 3.14159265;
    float lensAlphaInf(float b) {
        float x = log(max(b / LENS_BC - 1.0, 1e-7));
        float f = (x - uLensTableX.x) / uLensTableX.y;
        if (f >= uLensTableX.z - 1.0) return 4.0 / b + 15.0 * LENS_PI / (4.0 * b * b);
        f = max(f, 0.0);
        int i = int(f);
        float a0 = texelFetch(uLensTable, ivec2(i, 0), 0).r;
        float a1 = texelFetch(uLensTable, ivec2(min(i + 1, int(uLensTableX.z) - 1), 0), 0).r;
        return mix(a0, a1, f - float(i));
    }
    float lensAlpha(float theta, float r) {
        float b = r * sin(theta) / sqrt(1.0 - 2.0 / r);
        return lensAlphaInf(max(b, LENS_BC * (1.0 + 1e-7))) * 0.5 * (1.0 + cos(theta));
    }
`;

// The close-up's stars: the hole's two images of each star behind it (the
// direct one on the star's side, uLensImage +1; the one round the other
// side, -1), found with the exact bending (ALPHA_GLSL), each star at its
// own distance. In the plane of the hole and the star, the ray leaving the
// camera at angle theta runs straight to its closest approach, turns by
// alpha(theta) and runs straight on: an image is a theta whose bent ray
// meets the star (bisection; the bending grows without limit at the
// shadow's edge, so each has one). Its magnification, sin(theta) /
// (sin(beta) |d beta / d theta|), beta the bent ray's angle, at most
// LENS_MU_MAX (a star isn't a point). lensImage(S, C, mu): the image of a
// star at S seen from C (the layer's units, the hole at the origin); mu 0
// where there is none (in front of the hole the direct image is the star
// as it is, the other none)
const LENS_MU_MAX = 1000;
export const LENS_GLSL = /* glsl */ `
    uniform float uLensRg;     // GM/c^2 in the layer's units; 0: off
    uniform float uLensImage;  // +1 or -1
    uniform sampler2D uLensTable;
    uniform vec3 uLensTableX;
    uniform float uLensPxPerRad;  // device px per radian (the view's)
    // After lensImage: the image's gap to the shadow's edge (rad; large
    // when not lensed). Its sprite shouldn't spill over the shadow:
    // lensSpriteCap(size) caps its size (device px) at twice the gap
    float gLensGap;
    float lensSpriteCap(float size) { return min(size, max(2.0 * gLensGap * uLensPxPerRad, 1.0)); }
    ${ALPHA_GLSL}
    // The bent ray's direction (angle from the camera-hole axis, + towards
    // the star's side) less the star's direction from the ray's kink, for
    // the ray leaving at theta on side sgn (+1 the star's, -1 the other);
    // r: the camera's distance (rg); star at (sx, sy), sy >= 0 (rg)
    float lensMiss(float theta, float sgn, float r, float sx, float sy) {
        float alpha = lensAlpha(theta, r);
        float k = max(r * cos(theta), 0.0);  // the kink: the closest approach (or here)
        vec2 kink = k * vec2(cos(theta), sgn * sin(theta));
        float star = atan(sy - kink.y, sx - kink.x);
        return sgn * theta + (sgn > 0.0 ? -alpha : alpha) - star;
    }
    vec3 lensImage(vec3 S, vec3 C, out float mu) {
        mu = uLensImage > 0.0 ? 1.0 : 0.0;
        gLensGap = 1e9;
        if (uLensRg <= 0.0) return S;
        float dl = length(C);
        vec3 l = -C / dl;
        vec3 s = S - C;
        float ds = length(s);
        float along = dot(s, l);
        if (along <= dl) return S;  // in front of the hole: as it is
        vec3 side = s - l * along;
        float sl = length(side);
        side = sl > 1e-9 * ds ? side / sl : normalize(cross(l, abs(l.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
        // In rg, the camera at the origin, the hole at (r, 0), the star at
        // (sx, sy)
        float r = dl / uLensRg;
        float sx = along / uLensRg, sy = sl / uLensRg;
        float sgn = uLensImage;
        float edge = asin(min(LENS_BC * sqrt(max(1.0 - 2.0 / r, 0.0)) / r, 1.0));
        float lo = edge + 1e-6;
        float hi = LENS_PI - 1e-6;
        // The miss goes from - (+ for the other side) at the shadow's edge
        // to + (-) away from the hole
        for (int i = 0; i < 40; i++) {
            float mid = 0.5 * (lo + hi);
            float m = lensMiss(mid, sgn, r, sx, sy) * sgn;
            if (m < 0.0) lo = mid; else hi = mid;
        }
        float theta = 0.5 * (lo + hi);
        // Magnification: the bent ray's angle beta and its rate with theta
        float h = max(1e-4 * theta, 1e-6);
        float beta = sgn * theta + (sgn > 0.0 ? -1.0 : 1.0) * lensAlpha(theta, r);
        float beta2 = sgn * (theta + h) + (sgn > 0.0 ? -1.0 : 1.0) * lensAlpha(theta + h, r);
        float dbeta = abs(beta2 - beta) / h;
        mu = min(sin(theta) / max(abs(sin(beta)) * dbeta, 1e-12), ${LENS_MU_MAX.toFixed(1)});
        gLensGap = theta - edge;
        return C + (l * cos(theta) + side * (sgn * sin(theta))) * ds;
    }
`;

// The far stars (the star layer's, a cluster's fast stars: far off
// compared with the camera's distance from the hole). A star is a point:
// lensing moves it and brightens or dims it, but its image stays a point
// (James et al. 2015, CQG 32, 065001, sec. 3.1), with the eye's blur (its
// sprite) round it after (as their sec. 4.3.1 applies a camera's). Bent
// with the background picture their sprites would stretch into arcs, so
// while the pass runs they're drawn after it instead (FarStarsPass), each
// twice: its direct image and the one round the other side, each brightened
// or dimmed by its magnification (FAR_LENS_GLSL, in their vertex shader).
// For a source far off, an image's angle from the hole depends only on the
// star's and on the camera's distance r (rg): a table of both images'
// angles and magnifications against the star's angle, worked out here
// (bisection with ALPHA_GLSL's bending, as LENS_GLSL's) when r changes,
// looked up on the GPU. Each is weighted by the pass's alpha where it lands:
// the share of the background showing there (none in the shadow or behind
// the companion star, a disc's see-through share, the eye's adaptation to a
// disc: farLensBlend)
// Table samples (over sqrt(beta / pi), dense near the hole), bisection
// steps, the change in r that redraws it (share), the magnification's cap
const FAR_SAMPLES = 1024;
const FAR_STEPS = 32;
const FAR_R_CHANGE = 1e-4;
const FAR_MU_MAX = 1000;
// The three.js layer the far stars are drawn in (their own pass)
export const FAR_LENS_LAYER = 1;
// In JS (labels, picking), points nearer than this many times the hole's
// distance are taken as they are (not far off)
export const FAR_LENS_MIN = 10;

const farData = new Float32Array(4 * FAR_SAMPLES);
let farTexture = null;
const farShared = {
    uFarLensDir: { value: new THREE.Vector3(0, 0, -1) },
    uFarLensImage: { value: 1 },
    uFarLensTable: { value: null },
    uFarLensX: { value: new THREE.Vector3(FAR_SAMPLES, 0, 1) },
};
const farOn = { value: 0 };
const farState = { on: false, r: 0, rgAu: 0, dirWorld: new THREE.Vector3() };

// The table's values (alpha at each sample), worked out once
let tableData = null;
function deflectionData() {
    if (!tableData) {
        tableData = new Float32Array(TABLE_SIZE);
        for (let i = 0; i < TABLE_SIZE; i++) {
            const x = TABLE_X0 + (TABLE_X1 - TABLE_X0) * i / (TABLE_SIZE - 1);
            tableData[i] = deflection(B_CRIT * (1 + Math.exp(x)));
        }
    }
    return tableData;
}
// ALPHA_GLSL's bending, in JS from the same table
function alphaInfTable(b) {
    const f = (Math.log(Math.max(b / B_CRIT - 1, 1e-7)) - TABLE_X0) / ((TABLE_X1 - TABLE_X0) / (TABLE_SIZE - 1));
    if (f >= TABLE_SIZE - 1) return 4 / b + 15 * Math.PI / (4 * b * b);
    const g = Math.max(f, 0);
    const i = Math.floor(g);
    const d = deflectionData();
    return d[i] + (d[Math.min(i + 1, TABLE_SIZE - 1)] - d[i]) * (g - i);
}
function alphaShare(theta, r) {
    const b = r * Math.sin(theta) / Math.sqrt(1 - 2 / r);
    return alphaInfTable(Math.max(b, B_CRIT * (1 + 1e-7))) * 0.5 * (1 + Math.cos(theta));
}

function farTex() {
    if (!farTexture) {
        farTexture = new THREE.DataTexture(farData, FAR_SAMPLES, 1, THREE.RGBAFormat, THREE.FloatType);
        farTexture.minFilter = farTexture.magFilter = THREE.NearestFilter;
        farTexture.needsUpdate = true;
        farShared.uFarLensTable.value = farTexture;
    }
    return farTexture;
}

// The table for a camera r rg from the hole: per sample (the star at beta
// = pi s^2 from the hole), the direct image's angle and ln magnification,
// then the other image's. Returns the shadow's edge (rad)
export function buildFarTable(r, data = farData) {
    const edge = Math.asin(Math.min(B_CRIT * Math.sqrt(Math.max(1 - 2 / r, 0)) / r, 1));
    // The bent ray's angle (+ the star's side) for the ray leaving at theta
    // on side sgn (+1 the star's, -1 the other)
    const bent = (theta, sgn) => sgn * (theta - alphaShare(theta, r));
    for (let k = 0; k < FAR_SAMPLES; k++) {
        const beta = Math.PI * (k / (FAR_SAMPLES - 1)) ** 2;
        for (let side = 0; side < 2; side++) {
            const sgn = side === 0 ? 1 : -1;
            let lo = edge + 1e-9;
            let hi = Math.PI;
            for (let i = 0; i < FAR_STEPS; i++) {
                const mid = 0.5 * (lo + hi);
                if (sgn * (bent(mid, sgn) - beta) < 0) lo = mid;
                else hi = mid;
            }
            const theta = 0.5 * (lo + hi);
            const h = Math.max(1e-4 * theta, 1e-6);
            const ta = Math.max(theta - h, edge + 1e-9), tb = Math.min(theta + h, Math.PI);
            const rate = Math.abs(bent(tb, sgn) - bent(ta, sgn)) / (tb - ta);
            const sb = Math.sin(beta);
            // At beta pi the direct image is the star itself (the limit of
            // sin theta / sin beta: 1 / rate); at beta 0, the ring (capped)
            const mu = sb > 1e-6 ? Math.sin(theta) / (sb * rate) : (sgn > 0 && beta > 1 ? 1 / (rate * rate) : FAR_MU_MAX);
            data[4 * k + 2 * side] = theta;
            data[4 * k + 2 * side + 1] = Math.log(Math.min(Math.max(mu, 1e-30), FAR_MU_MAX));
        }
    }
    if (data === farData) farTex().needsUpdate = true;
    return edge;
}

// The far stars' shared uniforms; lensed: switched on with the pass (else
// never: their own uFarLensOn, 0)
export function farLensUniforms(lensed) {
    farTex();
    return { ...farShared, uFarLensOn: lensed ? farOn : { value: 0 } };
}
// Make star Points far-lensed ones (its material's uFarLensOn the shared
// one; drawn in FAR_LENS_LAYER; never culled: a star behind the camera
// has an image in front); again does nothing
export function markFarLensed(points) {
    if (points.userData.farLensed) return;
    points.userData.farLensed = true;
    points.frustumCulled = false;
    points.layers.set(FAR_LENS_LAYER);
    points.material.uniforms.uFarLensOn = farOn;
}
// A star material's blending: its light (premultiplied: rgb * alpha)
// added, over the lens pass's picture by that picture's alpha (the
// background's share showing there), else plainly; alpha left as it is
export function farLensBlend(material, over) {
    material.blending = THREE.CustomBlending;
    material.blendEquation = THREE.AddEquation;
    material.blendSrc = over ? THREE.DstAlphaFactor : THREE.OneFactor;
    material.blendDst = THREE.OneFactor;
    material.blendSrcAlpha = THREE.ZeroFactor;
    material.blendDstAlpha = THREE.OneFactor;
}
// Whether the far stars are lensed now; the hole's distance from the
// camera (AU)
export const farLensOn = () => farState.on;
export const farLensHoleAu = () => (farState.on ? farState.r * farState.rgAu : 0);
// The pass's hole for them: on, its place in view space (rg), its rg (AU),
// the view's rotation (quaternion), device px per radian
function updateFarLens(on, holeView, rgAu, quaternion, pxPerRad) {
    farState.on = on;
    farOn.value = on ? 1 : 0;
    if (!on) return;
    const r = holeView.length();
    farShared.uFarLensDir.value.copy(holeView).divideScalar(r);
    farState.dirWorld.copy(farShared.uFarLensDir.value).applyQuaternion(quaternion);
    farState.rgAu = rgAu;
    if (!(Math.abs(r / farState.r - 1) < FAR_R_CHANGE)) {
        farShared.uFarLensX.value.y = buildFarTable(r);
        farState.r = r;
    }
    farShared.uFarLensX.value.z = pxPerRad;
}
// Where a far point looks to be (its direct image, as the stars are
// drawn): rel, from the camera (world axes, any units); holeDist, the
// hole's distance in the same units. out (from the camera); as it is while
// the far stars aren't lensed, or if it's near
export function farLensImage(rel, holeDist, out) {
    const d = rel.length();
    if (!farState.on || !(d > FAR_LENS_MIN * holeDist)) return out.copy(rel);
    const l = farState.dirWorld;
    const c = rel.dot(l) / d;
    const sx = rel.x / d - l.x * c, sy = rel.y / d - l.y * c, sz = rel.z / d - l.z * c;
    const sl = Math.hypot(sx, sy, sz);
    if (sl < 1e-12) return out.copy(rel);
    const f = Math.sqrt(Math.atan2(sl, c) / Math.PI) * (FAR_SAMPLES - 1);
    const i = Math.min(Math.floor(f), FAR_SAMPLES - 2);
    const theta = farData[4 * i] + (farData[4 * i + 4] - farData[4 * i]) * (f - i);
    const cs = Math.cos(theta) * d, sn = Math.sin(theta) * d / sl;
    return out.set(l.x * cs + sx * sn, l.y * cs + sy * sn, l.z * cs + sz * sn);
}

// In a far star's vertex shader (after SPRITE_VERTEX_GLSL): farLensImage
// (its image on this draw's side, uFarLensImage) and farLensSprite (after
// spriteFromMagnitude: a dimmed image's sprite shrunk by its
// magnification, keeping its light in proportion; none over the shadow)
export const FAR_LENS_GLSL = /* glsl */ `
    uniform float uFarLensOn;
    uniform vec3 uFarLensDir;      // to the hole (view space)
    uniform float uFarLensImage;   // +1: direct images, -1: the others
    uniform sampler2D uFarLensTable;
    uniform vec3 uFarLensX;        // samples, the shadow's edge (rad), device px per rad
    // mv: the star (view space); returns its image (at its distance); mu its
    // magnification, gap its angle from the shadow's edge (rad)
    vec3 farLensImage(vec3 mv, out float mu, out float gap) {
        float d = length(mv);
        vec3 s = mv / max(d, 1e-30);
        float c = dot(s, uFarLensDir);
        float beta = atan(length(cross(s, uFarLensDir)), c);
        vec3 side = s - uFarLensDir * c;
        side = length(side) > 1e-12 ? normalize(side)
            : normalize(cross(uFarLensDir, abs(uFarLensDir.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
        float f = sqrt(beta / 3.14159265) * (uFarLensX.x - 1.0);
        int i = int(min(f, uFarLensX.x - 2.0));
        vec4 t = mix(texelFetch(uFarLensTable, ivec2(i, 0), 0), texelFetch(uFarLensTable, ivec2(i + 1, 0), 0), f - float(i));
        bool direct = uFarLensImage > 0.0;
        float theta = direct ? t.x : t.z;
        mu = exp(direct ? t.y : t.w);
        gap = theta - uFarLensX.y;
        return (uFarLensDir * cos(theta) + side * (uFarLensImage * sin(theta))) * d;
    }
    void farLensSprite(float mu, float gap) {
        if (mu < 1.0) {
            float s0 = gl_PointSize;
            float s1 = max(s0 * sqrt(mu), uPixelRatio);
            vAlpha *= min(1.0, mu * (s0 * s0) / (s1 * s1));
            vGlare *= mu;
            gl_PointSize = s1;
        }
        gl_PointSize = min(gl_PointSize, max(2.0 * gap * uFarLensX.z, 1.0));
        vSize = gl_PointSize;
    }
`;

// Draws the far stars after the lens pass while it runs: each layer's
// (visible ones of layers, their objects in FAR_LENS_LAYER) twice, the
// direct images then the others, over its picture (farLensBlend)
export class FarStarsPass extends Pass {
    constructor(layers) {
        super();
        this.layers = layers;
        this.needsSwap = false;
    }

    render(renderer, writeBuffer, readBuffer) {
        const autoClear = renderer.autoClear;
        renderer.autoClear = false;
        renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
        renderer.clearDepth();
        for (const layer of this.layers) {
            if (!layer.visible) continue;
            const mask = layer.camera.layers.mask;
            layer.camera.layers.set(FAR_LENS_LAYER);
            for (const sgn of [1, -1]) {
                farShared.uFarLensImage.value = sgn;
                renderer.render(layer.scene, layer.camera);
            }
            layer.camera.layers.mask = mask;
        }
        farShared.uFarLensImage.value = 1;
        renderer.autoClear = autoClear;
    }
}

// The close-up stars' lens uniforms (their materials share them): {uLensTable,
// uLensTableX}; uLensRg and uLensImage are each material's
let starTable = null;
export function lensStarUniforms() {
    if (!starTable) starTable = deflectionTexture();
    return {
        uLensTable: { value: starTable },
        uLensTableX: { value: new THREE.Vector3(TABLE_X0, (TABLE_X1 - TABLE_X0) / (TABLE_SIZE - 1), TABLE_SIZE) },
    };
}

// The glowing gas round the hole (galactic_centre.json flow), two ways:
//   - simulated (the default): the close-up look of a hot, thick,
//     see-through flow (flow.simulated): emissivity (r / 2)^-p, thick about
//     its axis (exp(-(cos(polar angle) / H/R)^2): an empty funnel), faded in
//     from the horizon and out by ~80 rg, broken into turbulent clumps
//     (noise, ours) carried round at the gas's speed, brightened as g^3,
//     coloured by g (deep orange to cream), weakly self-absorbing, the whole
//     tone-mapped (ACES) as our 3D sketch of Sgr A* does (its constants)
//   - radio: Star_Data/scripts/build_galactic_centre.py's model, which it
//     scales to the measured 230 GHz flux: a radiatively inefficient flow,
//     thermal electrons n = n0 r^-1.1 exp(-z^2 / 2 rho^2), T = Theta0
//     r^-0.84 (m_e c^2), the field at 10% of equipartition, glowing by
//     thermal synchrotron emission (Leung et al. 2011's fit), adding up g^2 j
//     ds less absorption; shown in false colour, its brightness temperature
//     at 230 GHz black to white (uFlowScale.z) in the EHT images' palette
// Both move the same way (Keplerian about the axis outside 6 rg, falling in
// inside) and are traced back from the camera step by step through the
// bending (x'' = -3 h^2 x / r^5 in rg: the photon orbit's exact shape), g
// the exact Doppler and gravitational shift to the camera
const FLOW_GLSL = /* glsl */ `
    uniform float uFlowOn;
    uniform float uFlowSim;     // 1: simulated, 0: radio
    uniform vec3 uFlowAxis;     // its spin, view space
    uniform vec3 uFlowE1;       // a direction in its plane, view space
    uniform vec4 uFlowModel;    // n0 (cm^-3), Theta_e0, beta, frequency (Hz)
    uniform vec3 uFlowScale;    // rg (cm), the traced sphere's radius (rg), Tb shown white (K)
    uniform vec4 uSpot;         // the hot spot: centre (rg from the hole, view axes), its added density (cm^-3; radio) or emissivity (simulated); 0: none
    uniform float uSpotSigma;   // its size (rg)
    const float Q_E = 4.80320e-10, M_E = 9.10938e-28, C_CGS = 2.99792458e10, K_B = 1.380649e-16;
    const float MEC2 = 8.18711e-7, MPC2 = 1.50328e-3;
    // The gas's shift g at x (rg from the hole), seen along the traced
    // direction v (impact parameter b, the camera's own shift gObs); its
    // angular speed about the axis (rad per rg/c) in om
    float flowShift(vec3 x, vec3 v, float b, float gObs, out float om) {
        float r = length(x);
        float z = dot(x, uFlowAxis);
        float rho2 = max(r * r - z * z, 1e-6);
        float lapse = 1.0 - 2.0 / r;
        float ut, uphi, ur;
        if (r >= 6.0) {
            float w = pow(r, -1.5);
            ut = 1.0 / sqrt(max(lapse - w * w * rho2, 1e-6));
            uphi = w * ut;
            ur = 0.0;
        } else {
            const float E = 0.942809, L = 3.464102;
            ut = E / max(lapse, 1e-6);
            uphi = L / (r * r);
            ur = -sqrt(max(E * E - lapse * (1.0 + rho2 * L * L / (r * r * r * r)), 0.0));
        }
        om = uphi / ut;
        // The photon, going the other way
        vec3 hn = cross(x, v);
        float hl = length(hn);
        float lz = hl > 1e-9 ? -b * dot(hn / hl, uFlowAxis) : 0.0;
        float kr = -sign(dot(x, v)) * sqrt(max(1.0 - lapse * b * b / (r * r), 0.0)) / max(lapse, 1e-6);
        return gObs / max(ut - kr * ur - lz * uphi, 1e-6);
    }
    // Radio: the light added from a step (x: g^2 j, y: absorption depth)
    vec2 flowStep(vec3 x, vec3 v, float b, float gObs, float dsCm) {
        float r = length(x);
        float z = dot(x, uFlowAxis);
        float rho2 = max(r * r - z * z, 1e-6);
        float n = uFlowModel.x * pow(r, -1.1) * exp(-z * z / (2.0 * rho2));
        float theta = uFlowModel.y * pow(r, -0.84);
        float B = sqrt(8.0 * PI * n * MPC2 / (6.0 * r * uFlowModel.z));
        if (uSpot.w > 0.0) {
            vec3 dx = x - uSpot.xyz;
            n += uSpot.w * exp(-dot(dx, dx) / (2.0 * uSpotSigma * uSpotSigma));
        }
        float om;
        float g = flowShift(x, v, b, gObs, om);
        float nuE = uFlowModel.w / g;
        // Thermal synchrotron, the field toroidal
        vec3 ph = cross(uFlowAxis, x);
        float pl = length(ph);
        float cosK = pl > 1e-9 ? dot(normalize(v), ph / pl) : 0.0;
        float sinT = clamp(sqrt(max(1.0 - cosK * cosK, 0.0)), 0.05, 1.0);
        float nuS = max(2.0 / 9.0 * Q_E * B / (2.0 * PI * M_E * C_CGS) * theta * theta * sinT, 1e-30);
        float X = min(nuE / nuS, 1e30);
        float K2 = 2.0 * theta * theta - 0.5;
        float poly = sqrt(X) + 1.887749 * pow(X, 1.0 / 6.0);
        float j = n * Q_E * Q_E * nuS * 1.480961 / (K2 * C_CGS) * poly * poly * exp(-pow(X, 1.0 / 3.0));
        float alpha = j / (2.0 * nuE * nuE * theta * MEC2 / (C_CGS * C_CGS));
        return vec2(g * g * j * dsCm, alpha * dsCm / g);
    }
    // The flow's brightness temperature along the camera's ray d (view
    // space; the hole at uHole), b its impact parameter, gObs the camera's
    // own shift
    float flowTb(vec3 d, float b, float gObs) {
        vec3 p = -uHole;
        float rc = length(p);
        float rmax = uFlowScale.y;
        if (rc > rmax) {
            float pd = dot(p, d);
            float disc = pd * pd - (rc * rc - rmax * rmax);
            if (disc <= 0.0 || pd > 0.0) return 0.0;
            p += d * (-pd - sqrt(disc));
        }
        vec3 v = d;
        vec3 hv = cross(p, v);
        float h2 = dot(hv, hv);
        float I = 0.0, tau = 0.0;
        for (int i = 0; i < 400; i++) {
            float r = length(p);
            float dt = clamp(0.04 * r, 0.01, 1.0);
            vec3 acc = -3.0 * h2 * p / (r * r * r * r * r);
            vec3 vh = v + 0.5 * acc * dt;
            vec3 np = p + vh * dt;
            float nr = length(np);
            vec3 nv = vh + 0.5 * (-3.0 * h2 * np / (nr * nr * nr * nr * nr)) * dt;
            vec3 mid = 0.5 * (p + np);
            if (length(mid) > 2.05) {
                vec2 st = flowStep(mid, 0.5 * (v + nv), b, gObs, length(np - p) * uFlowScale.x);
                I += exp(-tau) * st.x;
                tau += st.y;
            }
            p = np;
            v = nv;
            if (nr < 2.05 || (nr > rmax + 0.5 && dot(p, v) > 0.0) || tau > 20.0) break;
        }
        return I * C_CGS * C_CGS / (2.0 * K_B * uFlowModel.w * uFlowModel.w);
    }
    // Simulated (flow.simulated)
    uniform vec4 uSim;          // H/R, emissivity index p, fade out from, to (rg)
    uniform vec3 uSimIn;        // fade in from, to (rg); brightness (the flicker)
    uniform vec4 uSimTime;      // the two turbulence patterns' ages (rg/c), seeds
    uniform vec2 uSimWeight;    // their weights
    float sHash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1) * 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }
    float sNoise(vec3 x) {
        vec3 i = floor(x), f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(sHash(i), sHash(i + vec3(1, 0, 0)), f.x), mix(sHash(i + vec3(0, 1, 0)), sHash(i + vec3(1, 1, 0)), f.x), f.y),
                   mix(mix(sHash(i + vec3(0, 0, 1)), sHash(i + vec3(1, 0, 1)), f.x), mix(sHash(i + vec3(0, 1, 1)), sHash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
    }
    // One turbulence pattern at x (rg; py along the axis, px and pz in the
    // plane), carried round for its age t at the gas's angular speed om
    // (shearing as it goes), evolving as it does; the sketch's three scales
    // (its 0.9, 2.6, 6 per Rs: here per 2 rg)
    float simPattern(float px, float py, float pz, float om, float t, float seed) {
        float a = om * t;
        float c = cos(a), s = sin(a);
        float qx = c * px + s * pz, qz = -s * px + c * pz;
        vec3 o = vec3(37.1, 17.7, 23.3) * seed;
        return sNoise(vec3(qx * 0.45, py * 0.65 + t * 0.012, qz * 0.45) + o) * 0.55
             + sNoise(vec3(qx * 1.3 + t * 0.031, py * 1.5, qz * 1.3) + o) * 0.3
             + 0.8 * pow(sNoise(vec3(qx * 3.0, py * 3.0 + t * 0.126, qz * 3.0) + o), 3.0);
    }
    vec3 simColour(float g) {
        return mix(vec3(1.0, 0.42, 0.14), vec3(1.0, 0.86, 0.66), clamp((g - 0.6) * 1.2, 0.0, 1.0));
    }
    vec3 aces(vec3 x) {
        return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
    }
    // Along the camera's ray d: the flow's light (rgb, linear, tone-mapped)
    // and the share of what's behind let through (a)
    vec4 simTrace(vec3 d, float b, float gObs) {
        vec3 p = -uHole;
        float rc = length(p);
        float rmax = uFlowScale.y;
        if (rc > rmax) {
            float pd = dot(p, d);
            float disc = pd * pd - (rc * rc - rmax * rmax);
            if (disc <= 0.0 || pd > 0.0) return vec4(0.0, 0.0, 0.0, 1.0);
            p += d * (-pd - sqrt(disc));
        }
        vec3 v = d;
        vec3 hv = cross(p, v);
        float h2 = dot(hv, hv);
        vec3 e2 = cross(uFlowAxis, uFlowE1);
        vec3 col = vec3(0.0);
        float through = 1.0;
        float wNorm = inversesqrt(uSimWeight.x * uSimWeight.x + uSimWeight.y * uSimWeight.y);
        for (int i = 0; i < 400; i++) {
            float r = length(p);
            float dt = clamp(0.05 * r, 0.01, 1.5);
            vec3 acc = -3.0 * h2 * p / (r * r * r * r * r);
            vec3 vh = v + 0.5 * acc * dt;
            vec3 np = p + vh * dt;
            float nr = length(np);
            vec3 nv = vh + 0.5 * (-3.0 * h2 * np / (nr * nr * nr * nr * nr)) * dt;
            vec3 x = 0.5 * (p + np);
            float mr = length(x);
            float py = dot(x, uFlowAxis);
            float prof = exp(-pow(abs(py) / (mr * uSim.x), 2.0)) * smoothstep(uSimIn.x, uSimIn.y, mr) * (1.0 - smoothstep(uSim.z, uSim.w, mr));
            float ds = length(np - p);
            float spot = 0.0;
            if (uSpot.w > 0.0) {
                vec3 dx = x - uSpot.xyz;
                spot = uSpot.w * exp(-dot(dx, dx) / (2.0 * uSpotSigma * uSpotSigma));
            }
            if (prof > 0.001 || spot > 1e-4) {
                float om;
                float g = flowShift(x, 0.5 * (v + nv), b, gObs, om);
                float px = dot(x, uFlowE1), pz = dot(x, e2);
                float nA = simPattern(px, py, pz, om, uSimTime.x, uSimTime.z);
                float nB = simPattern(px, py, pz, om, uSimTime.y, uSimTime.w);
                // The two patterns' mix, its spread kept
                float n = 0.5 + (uSimWeight.x * (nA - 0.5) + uSimWeight.y * (nB - 0.5)) * wNorm;
                float g3 = g * g * g;
                float j = pow(0.5 * mr, -uSim.y) * prof * max(0.35 + 1.25 * n, 0.0) * g3 * uSimIn.z;
                float js = spot * g3;
                float dsRs = 0.5 * ds;
                col += through * (simColour(g) * j + vec3(1.0, 0.88, 0.74) * js) * dsRs * 5.5;
                through *= exp(-(j + js) * dsRs * 0.25);
            }
            p = np;
            v = nv;
            if (nr < 2.05 || (nr > rmax + 0.5 && dot(p, v) > 0.0) || through < 0.01) break;
        }
        return vec4(pow(aces(col * 1.1), vec3(2.2 / 1.8)), through);
    }
    // The EHT images' palette (afmhot), 0..1 -> sRGB
    vec3 afmhot(float t) {
        t = clamp(t, 0.0, 1.0);
        return vec3(clamp(2.0 * t, 0.0, 1.0), clamp(2.0 * t - 0.5, 0.0, 1.0), clamp(2.0 * t - 1.0, 0.0, 1.0));
    }
`;

// The spinning hole's tracer, see the header. Hole frame: rg, the spin
// along +z. Kerr-Schild: H = (|p|^2 - 1 - f (1 + l.p)^2) / 2 for the
// covariant momentum p (p_t = -1), f = 2 r^3 / (r^4 + a^2 z^2), l = ((r x +
// a y), (r y - a x)) / (r^2 + a^2), z / r), r the Boyer-Lindquist radius;
// dx = dH/dp, dp = -dH/dx (affine parameter). The camera is at rest (a
// static observer: its local frame the coordinate axes, symmetrically
// orthonormalised). Checked in a plain-JS copy: Schwarzschild bending
// from 5.25 to 1,900 rg within 0.09% of Darwin's; the shadow's edges seen
// edge-on at the circular light orbits (spin 0.5 and 0.92 to 1e-4; 0.9985:
// the prograde edge, its light orbit just above the horizon, 0.7% wide)
const KERR_R = 2000;
const KERR_STEPS = 320;
// Wavelengths (um) for the disc's red, green and blue
const DISC_RGB_UM = [0.611, 0.549, 0.464];
// The disc is drawn as this power of its brightness against the star's
// surface (Stevens' power law for brightness: ~1/3)
const DISC_PERCEPT = 1 / 3;
// Its edges fade over this share of its outer radius (and, truncated, from
// its inner edge out to this many times it); its turbulence roughens them
// (radius times exp(-this x its log brightness)), so they reach past them
// by up to DISC_EDGE_REACH. Ours: real discs thin out over a range, their
// profile there not measured
const DISC_EDGE_FADE_OUT = 0.4;
const DISC_EDGE_FADE_IN = 1.5;
const DISC_EDGE_RAGGED = 0.25;
const DISC_EDGE_REACH = 1.25;
export const KERR_GLSL = /* glsl */ `
    uniform float uKerr;        // 1: trace
    uniform float uSpin;        // a (rg)
    uniform mat3 uToHole;       // view space -> the hole's frame
    uniform vec3 uCamHole;      // the camera in the hole's frame (rg)
    uniform vec4 uDisc;         // inner edge, outer edge (rg), on, the innermost stable orbit (rg)
    uniform sampler2D uDiscT;   // its temperature (K), evenly in log r
    uniform vec3 uDiscTX;       // log r of the first sample, per sample, samples
    uniform vec3 uDiscLook;     // brightness scale, the star's drawn luminance, the eye's adaptation (all the view's light times it)
    uniform vec4 uDiscTurb;     // the disc's clock (rg/c), its patches' brightness range, its rings', a pixel (rad)
    uniform vec2 uDiscEdge;     // its fade: solid out to x, nothing at its outer edge; truncated inside, nothing at its inner edge, solid from y (0: not truncated)
    uniform vec3 uDiscN;        // its axis (hole frame): along the spin, or tilted from it (MAXI J1820+070: the orbit's)
    uniform vec3 uDiscE1;       // a direction in its plane
    uniform float uDiscTilt;    // 1: tilted from the spin's equator
    uniform vec4 uStarBall;     // the companion: centre (hole frame, rg), radius (rg; 0: none)
    const float KERR_R = ${KERR_R.toFixed(1)};
    void ksMetric(vec3 x, out float r, out float f, out vec3 l, out float S, out float P) {
        float a = uSpin;
        float w = dot(x, x) - a * a;
        S = max(sqrt(w * w + 4.0 * a * a * x.z * x.z), 1e-12);
        r = sqrt(max(0.5 * (w + S), 1e-12));
        P = r * r + a * a;
        f = 2.0 * r * r * r / (r * r * r * r + a * a * x.z * x.z);
        l = vec3((r * x.x + a * x.y) / P, (r * x.y - a * x.x) / P, x.z / r);
    }
    float ksR(vec3 x) {
        float a = uSpin;
        float w = dot(x, x) - a * a;
        return sqrt(max(0.5 * (w + sqrt(w * w + 4.0 * a * a * x.z * x.z)), 1e-12));
    }
    void ksRhs(vec3 x, vec3 p, out vec3 dx, out vec3 dp) {
        float a = uSpin;
        float r, f, S, P;
        vec3 l;
        ksMetric(x, r, f, l, S, P);
        float lp = 1.0 + dot(l, p);
        dx = p - f * lp * l;
        vec3 rg = vec3(x.x * r / S, x.y * r / S, x.z * P / (r * S));
        float D = r * r * r * r + a * a * x.z * x.z;
        float dfdr = 2.0 * r * r * (3.0 * a * a * x.z * x.z - r * r * r * r) / (D * D);
        float dfdz = -4.0 * a * a * r * r * r * x.z / (D * D);
        vec3 gradf = dfdr * rg + vec3(0.0, 0.0, dfdz);
        float Ap = (r * x.x + a * x.y) * p.x + (r * x.y - a * x.x) * p.y;
        float c = (x.x * p.x + x.y * p.y) / P - 2.0 * r * Ap / (P * P) - x.z * p.z / (r * r);
        vec3 G = rg * c + vec3((r * p.x - a * p.y) / P, (r * p.y + a * p.x) / P, p.z / r);
        dp = 0.5 * lp * lp * gradf + f * lp * G;
    }
    // The covariant momentum of a static camera's ray along n (unit), and
    // the camera's energy factor (its blueshift of light from far off)
    vec3 ksCameraP(vec3 x, vec3 n, out float eloc) {
        float r, f, S, P;
        vec3 l;
        ksMetric(x, r, f, l, S, P);
        float sf = sqrt(max(1.0 - f, 1e-6));
        vec3 v = n + (sf - 1.0) * dot(l, n) * l;
        eloc = 1.0 / sf;
        return eloc * (v + f * (1.0 / sf + dot(l, v) / (sf * sf)) * l);
    }
    // Kerr-Schild's weak field, spin left out: a straight ray at impact b,
    // s along it from its closest approach, has its momentum turned towards
    // the hole by ksBend(b, s2) - ksBend(b, s1) from s1 to s2 (4 / b in all;
    // ingoing coordinates: nearly all of it on the way out)
    float ksBend(float b, float s) {
        float r2 = b * b + s * s;
        float r = sqrt(r2);
        return s / (b * r) - 2.0 * b / r2 + s * s * s / (b * r2 * r);
    }
    vec3 turnToHole(vec3 D, vec3 X, float alpha) {
        vec3 t = -X - D * dot(-X, D);
        float tl = length(t);
        return tl < 1e-9 * length(X) ? D : D * cos(alpha) + t / tl * sin(alpha);
    }
    // Whether r can be on the disc: its edges' ragged fade reaches a little
    // past them (discOpacity); never inside the innermost stable orbit
    bool inDisc(float r) {
        float rIn = uDiscEdge.y > 0.0 ? uDisc.x / ${DISC_EDGE_REACH.toFixed(2)} : max(uDisc.x, uDisc.w);
        return r >= max(rIn, uDisc.w) && r <= uDisc.y * ${DISC_EDGE_REACH.toFixed(2)};
    }
    // A straight leg from X along D (hole frame), 0 < t < tMax: where it
    // crosses the disc (r; -1: it doesn't), its t and the point
    float legDisc(vec3 X, vec3 D, float tMax, out float tHit, out vec3 hit) {
        tHit = 1e30;
        hit = X;
        float dn = dot(D, uDiscN);
        if (uDisc.z < 0.5 || abs(dn) < 1e-9) return -1.0;
        float t = -dot(X, uDiscN) / dn;
        if (t <= 0.0 || t > tMax) return -1.0;
        hit = X + D * t;
        float r = sqrt(max(dot(hit, hit) - uSpin * uSpin, 0.0));
        if (!inDisc(r)) return -1.0;
        tHit = t;
        return r;
    }
    // Where a straight leg meets the companion (t; 1e30: it doesn't)
    float legStar(vec3 X, vec3 D) {
        if (uStarBall.w <= 0.0) return 1e30;
        vec3 oc = X - uStarBall.xyz;
        float bq = dot(oc, D);
        float dq = bq * bq - (dot(oc, oc) - uStarBall.w * uStarBall.w);
        if (dq < 0.0) return 1e30;
        float t = -bq - sqrt(dq);
        return t > 0.0 ? t : 1e30;
    }
    float discTemp(float r) {
        float f = clamp((log(r) - uDiscTX.x) / uDiscTX.y, 0.0, uDiscTX.z - 1.0);
        int i = int(f);
        float t0 = texelFetch(uDiscT, ivec2(i, 0), 0).r;
        float t1 = texelFetch(uDiscT, ivec2(min(i + 1, int(uDiscTX.z) - 1), 0), 0).r;
        return mix(t0, t1, f - float(i));
    }
    float planckOne(float lam, float T) {
        float x = 14387.77 / (lam * max(T, 1.0));
        float e = x < 1e-3 ? x * (1.0 + 0.5 * x) : exp(min(x, 80.0)) - 1.0;
        return 1.0 / (lam * lam * lam * lam * lam * e);
    }
    // A blackbody's light in red, green and blue, white at 6504 K
    vec3 planckRGB(float T) {
        const vec3 LAM = vec3(${DISC_RGB_UM.map(v => v.toFixed(3)).join(', ')});
        vec3 c = vec3(planckOne(LAM.x, T), planckOne(LAM.y, T), planckOne(LAM.z, T));
        vec3 w = vec3(planckOne(LAM.x, 6504.0), planckOne(LAM.y, 6504.0), planckOne(LAM.z, 6504.0));
        return c / w;
    }
    // The disc's turbulence at a point on it (hole frame; r its radius, om
    // the gas's angular speed), as the log of its brightness factor. The
    // turbulence that makes a disc's gas flow in (the magnetorotational
    // instability) breaks it into patches, each lasting about one orbit,
    // carried round and sheared into trailing arcs by the gas's motion,
    // with long-lived rings (zonal flows). Ours, as Sgr A*'s simulated
    // flow's: two patterns of value noise, each living one local orbit,
    // carried round at the gas's speed, crossfaded; three sizes (0.3, 0.1,
    // 0.03 r across, four times as long round), each faded once under ~2
    // px; and fixed rings, 0.15 r. No telescope resolves it
    float discTexture(vec3 hit, float r, float om) {
        float tau = uDiscTurb.x * om / 6.2831853;  // local orbits so far
        float lr = log(r);
        float phi = atan(dot(hit, cross(uDiscN, uDiscE1)), dot(hit, uDiscE1));
        float foot = max(length(hit - uCamHole) * uDiscTurb.w, 1e-9);  // a pixel there (rg)
        float n = 0.0, w2 = 0.0;
        for (int k = 0; k < 2; k++) {
            float tk = tau + 0.5 * float(k);
            float win = floor(tk);
            float f = tk - win;
            float w = 1.0 - abs(2.0 * f - 1.0);
            float ph = phi - 6.2831853 * f;  // carried round since the pattern began
            vec3 seed = vec3(37.1, 17.7, 23.3) * fract(win * 0.6180339 + 0.37 * float(k));
            float v = 0.0, sc = 0.3, amp = 1.0;
            for (int o = 0; o < 3; o++) {
                float around = 1.0 / (4.0 * sc);
                float vis = smoothstep(1.0, 3.0, sc * r / foot);
                v += vis * amp * (sNoise(vec3(lr / sc, around * cos(ph), around * sin(ph)) + seed * float(o + 1)) - 0.5);
                sc /= 3.0;
                amp *= 0.6;
            }
            n += w * v;
            w2 += w * w;
        }
        n *= inversesqrt(max(w2, 1e-6));
        float ring = smoothstep(1.0, 3.0, 0.15 * r / foot) * (sNoise(vec3(lr / 0.15, 3.7, 1.3)) - 0.5);
        return 2.0 * (uDiscTurb.y * n + uDiscTurb.z * ring);
    }
    // The disc at a point on it (hole frame; r its radius), seen along a
    // ray with angular momentum lam (about the spin), from a camera with
    // energy factor eloc: the gas on its circular orbit (prograde), its
    // light shifted by g, its turbulence (tex: discTexture's)
    vec3 discLight(vec3 hit, float r, float lam, float eloc, float tex) {
        float a = uSpin * dot(uDiscN, vec3(0.0, 0.0, 1.0));
        float r12 = sqrt(r), r32 = r * r12;
        float om = 1.0 / (r32 + a);
        float ut = (r32 + a) / (sqrt(r32) * sqrt(max(r32 - 3.0 * r12 + 2.0 * a, 1e-6)));
        float g = eloc / (ut * max(1.0 - om * lam, 1e-3));
        vec3 c = planckRGB(g * discTemp(r)) * uDiscLook.x * exp(tex);
        // Its brightness against the star's surface's (uDiscLook.y: at the
        // star's temperature the disc is as bright as the star is drawn), as
        // the eye judges it (Stevens' law: the cube root; 1/40 as bright
        // looks ~1/3.4, 60 times as bright ~4 times), its colour kept;
        // what's brighter than the screen can show whitens, as the hot
        // centre does to an eye or a camera; the eye adapted to the disc
        // round the camera (uDiscLook.z, the whole view's). (Linear, a cool
        // outer disc beside a hot star was black; hot gas is blue-white at
        // any temperature: its differences show as brightness)
        float L = dot(c, vec3(0.2126, 0.7152, 0.0722));
        float s = uDiscLook.y;
        float Ld = s * pow(L / s, ${DISC_PERCEPT.toFixed(4)}) * uDiscLook.z;
        return min(c * (Ld / max(L, 1e-20)), vec3(1.0));
    }
    // How solid the disc is at r: the gas thins out towards its outer edge
    // and turns see-through (from uDiscEdge.x out), and where it's
    // truncated (V404 Cygni) towards its inner edge, where it gives way to
    // the hot flow (in to uDiscEdge.y); its turbulence's denser patches
    // (tex) reach farther, so the edges are ragged. (Opacity and emission
    // go together: what it lets through it doesn't give out)
    float discOpacity(float r, float tex) {
        float rr = r * exp(-${DISC_EDGE_RAGGED.toFixed(2)} * tex);
        float o = 1.0 - smoothstep(uDiscEdge.x, uDisc.y, rr);
        if (uDiscEdge.y > 0.0) o *= smoothstep(uDisc.x, uDiscEdge.y, rr);
        return o;
    }
    // The disc where a ray crosses it, over what's behind: its light added
    // to acc, behind the share tr still seen through what's in front; tr
    // cut by its opacity
    void addDisc(vec3 hit, vec3 dir, float r, float lam, float eloc, inout vec3 acc, inout float tr) {
        float tex = discTexture(hit, r, 1.0 / (r * sqrt(r) + uSpin));
        float o = discOpacity(r, tex);
        if (o <= 0.0) return;
        float lamD = uDiscTilt > 0.5 ? dot(cross(hit, normalize(dir)), uDiscN) : lam;
        acc += tr * o * discLight(hit, r, lamD, eloc, tex);
        tr *= 1.0 - o;
    }
`;

const lensShader = {
    uniforms: {
        tDiffuse: { value: null },
        uTable: { value: null },
        uTableX: { value: new THREE.Vector3(TABLE_X0, (TABLE_X1 - TABLE_X0) / (TABLE_SIZE - 1), TABLE_SIZE) },
        uHole: { value: new THREE.Vector3() },  // the hole in view space (rg)
        uTanHalf: { value: new THREE.Vector2(1, 1) },
        uFlowOn: { value: 0 },
        uFlowAxis: { value: new THREE.Vector3(0, 0, 1) },
        uFlowModel: { value: new THREE.Vector4() },
        uFlowScale: { value: new THREE.Vector3() },
        uSpot: { value: new THREE.Vector4() },
        uSpotSigma: { value: 1 },
        uFlowSim: { value: 1 },
        uFlowE1: { value: new THREE.Vector3(1, 0, 0) },
        uSim: { value: new THREE.Vector4() },
        uSimIn: { value: new THREE.Vector3(2, 3, 1) },
        uSimTime: { value: new THREE.Vector4() },
        uSimWeight: { value: new THREE.Vector2(1, 0) },
        uSkyCube: { value: null },
        uBgCube: { value: null },
        uBgOn: { value: 0 },
        uSky: { value: new THREE.Vector2() },
        uViewToWorld: { value: new THREE.Matrix3() },
        uKerr: { value: 0 },
        uSpin: { value: 0 },
        uToHole: { value: new THREE.Matrix3() },
        uCamHole: { value: new THREE.Vector3() },
        uDisc: { value: new THREE.Vector4() },
        uDiscT: { value: null },
        uDiscTX: { value: new THREE.Vector3(0, 1, 1) },
        uDiscLook: { value: new THREE.Vector3(1, 0.5, 1) },
        uDiscTurb: { value: new THREE.Vector4() },
        uDiscEdge: { value: new THREE.Vector2() },
        uDiscN: { value: new THREE.Vector3(0, 0, 1) },
        uDiscE1: { value: new THREE.Vector3(1, 0, 0) },
        uDiscTilt: { value: 0 },
        uStarBall: { value: new THREE.Vector4() },
    },
    vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: /* glsl */ `
        uniform sampler2D tDiffuse;
        uniform sampler2D uTable;
        uniform vec3 uTableX;   // x0, dx, n
        uniform vec3 uHole;
        uniform vec2 uTanHalf;
        varying vec2 vUv;
        const float BC = ${B_CRIT.toFixed(6)};
        const float PI = 3.14159265;
        ${FLOW_GLSL}
        // Bending from far off to far off (rg)
        float alphaInf(float b) {
            float x = log(max(b / BC - 1.0, 1e-7));
            float f = (x - uTableX.x) / uTableX.y;
            if (f >= uTableX.z - 1.0) return 4.0 / b + 15.0 * PI / (4.0 * b * b);
            f = max(f, 0.0);
            int i = int(f);
            float a0 = texelFetch(uTable, ivec2(i, 0), 0).r;
            float a1 = texelFetch(uTable, ivec2(min(i + 1, int(uTableX.z) - 1), 0), 0).r;
            return mix(a0, a1, f - float(i));
        }
        // The screen's mean light (a few samples), for rays bent off it
        vec3 meanLight() {
            vec3 sum = vec3(0.0);
            for (int i = 0; i < 4; i++) {
                for (int j = 0; j < 4; j++) {
                    sum += texture2D(tDiffuse, (vec2(float(i), float(j)) + 0.5) / 4.0).rgb;
                }
            }
            return sum / 16.0;
        }
        // A ray bent off the screen (d, view space): the background that
        // way (utils/lensSky's cube, all the far layers); without it, the
        // Milky Way band's light that way while the band shows (its stars
        // left out), the screen's mean light for the rest
        uniform samplerCube uSkyCube;
        uniform vec2 uSky;          // the band's fade, its display level
        uniform samplerCube uBgCube;
        uniform float uBgOn;
        uniform mat3 uViewToWorld;
        vec3 offScreen(vec3 d) {
            if (uBgOn > 0.5) return textureCube(uBgCube, uViewToWorld * d).rgb;
            vec3 c = (1.0 - uSky.x) * meanLight();
            if (uSky.y > 0.0) c += pow(textureCube(uSkyCube, uViewToWorld * d).rgb * uSky.y, vec3(2.2));
            return c;
        }
        // The background seen along d, bent (black: falls in)
        vec3 background(vec3 d, vec3 l, float c, float b) {
            if (c > 0.0 && b <= BC) return vec3(0.0);
            // Bending from here on: the far-off-to-far-off bending's share
            // still ahead (as lensAlpha)
            float alpha = alphaInf(max(b, BC * (1.0 + 1e-7))) * 0.5 * (1.0 + c);
            if (alpha < 1e-6) return texture2D(tDiffuse, vUv).rgb;
            // Turned towards the hole by alpha
            vec3 towards = normalize(l - d * c);
            vec3 dOut = d * cos(alpha) + towards * sin(alpha);
            if (dOut.z < -1e-6) {
                vec2 uv = dOut.xy / (-dOut.z) / uTanHalf * 0.5 + 0.5;
                if (all(greaterThanEqual(uv, vec2(0.0))) && all(lessThanEqual(uv, vec2(1.0)))) return texture2D(tDiffuse, uv).rgb;
            }
            return offScreen(dOut);
        }
        ${KERR_GLSL}
        // The background along a direction in the hole's frame
        vec3 skyAlong(vec3 dirHole) {
            vec3 dv = transpose(uToHole) * dirHole;
            if (dv.z < -1e-6) {
                vec2 uv = dv.xy / (-dv.z) / uTanHalf * 0.5 + 0.5;
                if (all(greaterThanEqual(uv, vec2(0.0))) && all(lessThanEqual(uv, vec2(1.0)))) return texture2D(tDiffuse, uv).rgb;
            }
            return offScreen(dv);
        }
        // A spinning hole's view along dv (view space): see the header. The
        // disc can be partly see-through (its edges: discOpacity): its light
        // is added up (acc) over what's behind, of which a share tr shows
        // kerrColor's share of what's behind showing (its alpha)
        float gTrans;
        vec3 kerrColor(vec3 dv) {
            gTrans = 0.0;
            float a = uSpin;
            vec3 D = uToHole * dv;
            vec3 P = uCamHole;
            float rc = length(P);
            vec3 cp = cross(P, D);
            float bF = length(cp);
            float sc = dot(P, D);
            float tD, tS, rD;
            vec3 hD;
            vec3 acc = vec3(0.0);
            float tr = 1.0;
            if (rc > KERR_R && !(bF < KERR_R && sc < 0.0)) {
                // Weak field all the way: bent at its closest approach by the
                // far-to-far bending's share ahead (as background())
                float c = -sc / rc;
                float b = bF / sqrt(1.0 - 2.0 / rc);
                float alpha = alphaInf(max(b, BC * (1.0 + 1e-7))) * 0.5 * (1.0 + c);
                if (alpha < 1e-6 && uDisc.z < 0.5) {
                    gTrans = legStar(P, D) < 1e30 ? 0.0 : 1.0;
                    return texture2D(tDiffuse, vUv).rgb * uDiscLook.z;
                }
                float tc = max(-sc, 0.0);
                rD = legDisc(P, D, tc, tD, hD);
                tS = legStar(P, D);
                if (rD > 0.0 && tD < tS) addDisc(hD, D, rD, cp.z, 1.0, acc, tr);
                vec3 D2 = turnToHole(D, P, alpha);
                // (the star in front on the first leg: it's what shows)
                if (tS >= tc) {
                    vec3 X2 = P + D * tc;
                    rD = legDisc(X2, D2, 1e30, tD, hD);
                    tS = legStar(X2, D2);
                    if (rD > 0.0 && tD < tS) addDisc(hD, D2, rD, cp.z, 1.0, acc, tr);
                }
                vec3 sky = alpha < 1e-6 ? texture2D(tDiffuse, vUv).rgb : skyAlong(D2);
                gTrans = tS < 1e30 ? 0.0 : tr;
                return acc + tr * sky * uDiscLook.z;
            }
            float eloc;
            vec3 p, x = P;
            if (rc <= KERR_R) {
                p = ksCameraP(P, D, eloc);
            } else {
                // The leg to the traced ball, then the momentum's turn on the
                // way in, made null again (far off, the camera's frame is
                // flat: f ~ 2 / r)
                eloc = 1.0 / sqrt(1.0 - 2.0 / rc);
                p = D;
                float sE = -sqrt(KERR_R * KERR_R - bF * bF);
                rD = legDisc(P, D, sE - sc, tD, hD);
                tS = legStar(P, D);
                if (rD > 0.0 && tD < tS) addDisc(hD, D, rD, cp.z, eloc, acc, tr);
                if (tS < sE - sc || tr < 0.004) {
                    gTrans = tS < sE - sc ? 0.0 : tr;
                    return acc + tr * skyAlong(D) * uDiscLook.z;
                }
                x = P + D * (sE - sc);
                vec3 n = turnToHole(normalize(p), x, ksBend(bF, sE) - ksBend(bF, sc));
                float r0, f, S0, P0;
                vec3 l;
                ksMetric(x, r0, f, l, S0, P0);
                float cl = dot(l, n);
                p = n * (f * cl + sqrt(f * f * cl * cl + (1.0 - f * cl * cl) * (1.0 + f))) / (1.0 - f * cl * cl);
            }
            float lam = x.x * p.y - x.y * p.x;
            float rPlus = 1.0 + sqrt(max(1.0 - a * a, 0.0));
            for (int i = 0; i < ${KERR_STEPS}; i++) {
                float r = ksR(x);
                // Steps in proportion to r, longer far out, shorter near the
                // horizon (a fast spinner's prograde light orbit is just above it)
                float h = 0.05 * clamp(sqrt(r / 20.0), 1.0, 4.0) * r * clamp((r - rPlus) / 0.5, 0.08, 1.0);
                vec3 k1x, k1p, k2x, k2p, k3x, k3p, k4x, k4p;
                ksRhs(x, p, k1x, k1p);
                ksRhs(x + 0.5 * h * k1x, p + 0.5 * h * k1p, k2x, k2p);
                ksRhs(x + 0.5 * h * k2x, p + 0.5 * h * k2p, k3x, k3p);
                ksRhs(x + h * k3x, p + h * k3p, k4x, k4p);
                vec3 nx = x + h / 6.0 * (k1x + 2.0 * k2x + 2.0 * k3x + k4x);
                vec3 np = p + h / 6.0 * (k1p + 2.0 * k2p + 2.0 * k3p + k4p);
                float s0 = dot(x, uDiscN), s1 = dot(nx, uDiscN);
                if (uDisc.z > 0.5 && s0 * s1 < 0.0) {
                    vec3 hit = mix(x, nx, s0 / (s0 - s1));
                    float rh = sqrt(max(dot(hit, hit) - a * a, 0.0));
                    if (inDisc(rh)) {
                        addDisc(hit, np, rh, lam, eloc, acc, tr);
                        if (tr < 0.004) return acc;
                    }
                }
                x = nx;
                p = np;
                float nr = ksR(x);
                if (nr < rPlus * 0.999) return acc;
                if (nr > KERR_R && dot(x, p) > 0.0) {
                    vec3 dir = normalize(p);
                    float bO = length(cross(x, dir));
                    dir = turnToHole(dir, x, 2.0 / bO - ksBend(bO, dot(x, dir)));
                    rD = legDisc(x, dir, 1e30, tD, hD);
                    tS = legStar(x, dir);
                    if (rD > 0.0 && tD < tS) addDisc(hD, dir, rD, lam, eloc, acc, tr);
                    gTrans = tS < 1e30 ? 0.0 : tr;
                    return acc + tr * skyAlong(dir) * uDiscLook.z;
                }
            }
            return acc;  // still circling at the light orbit
        }
        void main() {
            vec3 d = normalize(vec3((vUv * 2.0 - 1.0) * uTanHalf, -1.0));
            if (uKerr > 0.5) {
                vec3 kc = kerrColor(d);
                gl_FragColor = vec4(kc, gTrans * uDiscLook.z);
                return;
            }
            float r = length(uHole);
            vec3 l = uHole / r;
            float c = dot(d, l);
            float s = sqrt(max(1.0 - c * c, 0.0));
            if (s < 1e-7 && c < 0.0) {
                gl_FragColor = vec4(texture2D(tDiffuse, vUv).rgb, 1.0);  // straight away from it
                return;
            }
            // Impact parameter (rg), of the ray from a static observer at r
            float rr = sqrt(1.0 - 2.0 / r);
            float b = r * s / rr;
            vec3 color = background(d, l, c, b);
            float trans = c > 0.0 && b <= BC ? 0.0 : 1.0;
            // The glowing gas: simulated, in front of what's behind it; or
            // radio, its light added (false colour)
            if (uFlowOn > 0.0 && (b < uFlowScale.y || r < uFlowScale.y)) {
                if (uFlowSim > 0.5) {
                    vec4 fl = simTrace(d, b, 1.0 / rr);
                    color = color * fl.a + fl.rgb;
                    trans *= fl.a;
                } else {
                    float tb = flowTb(d, b, 1.0 / rr);
                    color += pow(afmhot(tb / uFlowScale.z), vec3(2.2));
                }
            }
            gl_FragColor = vec4(color, trans);
        }
    `,
};

// The background's lens pass (insert it after the star layer's pass, and
// after any layer it should bend) and its state: {pass, setRg(rgAu) (Sgr
// A*'s GM/c^2, once known), setFlow(flow) (galactic_centre.json flow),
// setRadio(on) (the flow's radio view instead of the simulated one),
// update(camera, on, year, hole) each frame before rendering, spotShown(),
// dispose()}
const HOURS_PER_YEAR = 8766;
// The simulated flow's motion: each turbulence pattern carried round for
// this long (rg/c; the next fading in as it fades out, so the shear never
// winds it into hairlines), and never faster than this many rg/c a second
// (~5 minutes; faster, each frame's pattern would be unlike the last)
const SIM_WINDOW = 60;
const SIM_PACE_MAX = 15;
const ORIGIN = new THREE.Vector3();
const X_AXIS = new THREE.Vector3(1, 0, 0);
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const Z_AXIS = new THREE.Vector3(0, 0, 1);
const kAxis = new THREE.Vector3(), kE1 = new THREE.Vector3(), kE2 = new THREE.Vector3(), kStar = new THREE.Vector3();

// The disc's turbulence (KERR_GLSL discTexture): the range of its patches'
// and rings' brightness (log, each way), by state. Ours: a quiet disc's
// turbulence is weaker (cold gas, barely ionised, couples to the magnetic
// field less)
const DISC_TURBULENCE = { soft: [0.5, 0.15], quiet: [0.3, 0.1] };
// Its pattern's motion follows the clock, the gas at its own speed, but
// never faster than this many of the inner edge's orbits a second (at real
// time Cygnus X-1's inner disc goes round hundreds of times a second)
const DISC_ORBITS_PER_SEC = 1;

// For a stellar black hole's disc (black_holes.json disc): its temperature
// table as a texture, for update's kerr.disc ({texture, tx, t, turb}).
// Dispose the texture when done.
export function discTable(disc) {
    const n = disc.t_k.length;
    const texture = new THREE.DataTexture(new Float32Array(disc.t_k), n, 1, THREE.RedFormat, THREE.FloatType);
    texture.minFilter = texture.magFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
    const l0 = Math.log(disc.r_in_rg);
    return {
        texture, tx: new THREE.Vector3(l0, (Math.log(disc.r_out_rg) - l0) / (n - 1), n), t: disc.t_k,
        turb: DISC_TURBULENCE[disc.state] ?? [0, 0],
    };
}
const planckOne = (um, t) => 1 / (um ** 5 * Math.expm1(Math.min(14387.77 / (um * t), 700)));
const planckRGB = (t) => DISC_RGB_UM.map(um => planckOne(um, t) / planckOne(um, 6504));
const luma = (c) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
// The disc's brightness for the pass, {look, star, teff} (update's
// kerr.disc): look puts a blackbody at the star's temperature at the
// star's own drawn brightness, star (linear luminance; tint: its sRGB
// colour, 0..1)
export function discLook(teff, tint) {
    const star = luma(tint.map(c => c ** 2.2));
    return { look: star / luma(planckRGB(teff)), star, teff };
}
// The eye's adaptation close to a disc brighter than its star: the view's
// light times this (1 from afar), so the disc at the camera's own distance
// from the hole looks as bright as the star's surface does from afar, and
// the rest (the star, the sky, the disc nearer and farther) keeps its
// brightness against it (as DISC_PERCEPT)
function discAdapt(dsc, rRg) {
    const [l0, dl, n] = [dsc.tx.x, dsc.tx.y, dsc.tx.z];
    const f = THREE.MathUtils.clamp((Math.log(THREE.MathUtils.clamp(rRg, dsc.rIn, dsc.rOut)) - l0) / dl, 0, n - 1);
    const i = Math.min(Math.floor(f), n - 2);
    const t = dsc.t[i] + (dsc.t[i + 1] - dsc.t[i]) * (f - i);
    const rel = luma(planckRGB(t)) / luma(planckRGB(dsc.teff));
    return Math.max(rel, 1) ** -DISC_PERCEPT;
}
// A stellar disc's edges (rg; discTable's disc: rIn, rOut, rIsco): from
// (nothing inside), solid from (0: from the start; truncated, V404 Cygni
// quiet: it fades in), solid to, to (nothing outside). As the pass's
// discOpacity without its turbulence's ragged edges (blackHoles3d's lines
// in front of it take this)
export function discEdgesRg(dsc) {
    const truncated = dsc.rIn > 2 * dsc.rIsco;
    return {
        from: truncated ? dsc.rIn : Math.max(dsc.rIn, dsc.rIsco),
        solidFrom: truncated ? dsc.rIn * DISC_EDGE_FADE_IN : 0,
        solidTo: dsc.rOut * (1 - DISC_EDGE_FADE_OUT),
        to: dsc.rOut,
    };
}

export function createLensPass() {
    let rgAu = 0;
    let flow = null;
    let radio = false;
    const pass = new ShaderPass(lensShader);
    const u = pass.uniforms;
    u.uTable.value = deflectionTexture();
    pass.enabled = false;
    const hole = new THREE.Vector3();
    const axisScene = new THREE.Vector3();
    const e1 = new THREE.Vector3(), e2 = new THREE.Vector3();
    const rot = new THREE.Matrix3();
    const spot = new THREE.Vector3();
    let spotLevel = 0;
    // The simulated flow's own clock (rg/c): the clock's, its pace capped
    let flowTime = 0;
    let lastYear = null, lastNow = null;
    // A stellar disc's (its hole's rg/c; DISC_ORBITS_PER_SEC), and which
    let discTime = 0;
    let discOf = null;
    // The view's height (device px: the composer's), for a pixel's size
    let heightPx = 1000;
    let shadowAngle = 0;
    pass.setSize = (width, height) => { heightPx = height; };
    // The hot spot's emissivity (simulated) at a flare's peak
    let simSpot = 0;
    // The day's flare (one a day: flow.spot): its start (hours from
    // J2000), its starting angle; the hash is ours
    const hash = x => { const v = Math.sin(x * 12.9898 + 78.233) * 43758.5453; return v - Math.floor(v); };
    // Smooth value noise, -1..1
    const vnoise = (x) => {
        const i = Math.floor(x), f = x - i, w = f * f * (3 - 2 * f);
        return 2 * (hash(i) * (1 - w) + hash(i + 1) * w) - 1;
    };
    const applyView = () => {
        const sim = Boolean(flow?.simulated) && !radio;
        u.uFlowSim.value = sim ? 1 : 0;
        if (flow) u.uFlowScale.value.y = sim ? flow.simulated.r_out_rg[1] + 1 : flow.r_max_rg;
    };
    return {
        pass,
        setRg: (rg) => { rgAu = rg; },
        setFlow: (f) => {
            flow = f;
            axisScene.fromArray(f.axis).normalize();
            e1.crossVectors(axisScene, Math.abs(axisScene.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0)).normalize();
            e2.crossVectors(axisScene, e1);
            u.uFlowModel.value.set(f.n0, f.theta_e0, f.beta, f.freq_ghz * 1e9);
            u.uFlowScale.value.set(f.rg_cm, f.r_max_rg, f.tb_display);
            u.uSpotSigma.value = f.spot.sigma_rg;
            u.uFlowOn.value = 1;
            const sm = f.simulated;
            if (sm) {
                u.uSim.value.set(sm.h_over_r, sm.emissivity_index, sm.r_out_rg[0], sm.r_out_rg[1]);
                u.uSimIn.value.set(sm.r_in_rg[0], sm.r_in_rg[1], 1);
                // The hot spot's peak emissivity: spot_contrast times the
                // gas's round it (in the plane, as the shader's)
                simSpot = sm.spot_contrast * (f.spot.radius_rg / 2) ** -sm.emissivity_index;
            }
            applyView();
        },
        setRadio: (on) => {
            radio = Boolean(on);
            applyView();
        },
        // The Milky Way band's light all round (utils/milkyWayBand sky()), or
        // null: for rays bent off the screen
        setSky: (sky) => {
            u.uSkyCube.value = sky?.texture ?? null;
            u.uSky.value.set(sky?.fade ?? 0, sky?.level ?? 0);
        },
        // The background all round (utils/lensSky's cube texture), or null
        setBackground: (texture) => {
            u.uBgCube.value = texture;
            u.uBgOn.value = texture ? 1 : 0;
        },
        // The shadow's angular radius from the camera (rad; 0: the pass off)
        shadowAngle: () => shadowAngle,
        // camera: the close-up's layer camera (Sgr A*'s: AU from it; world
        // matrix current); on: the close-up shows; year: the clock's.
        // other: a stellar black hole instead, {at (its place in camera's
        // layer, AU), rgAu, kerr}: no glowing gas. kerr, to trace it (see
        // the header): {spin, axis (its spin's direction, the layer's
        // frame), discAxis (the disc's, if tilted from it: the orbit's), star: {at (AU), radiusAu} or null, disc: {texture (its
        // temperatures), tx (Vector3: log r of the first, per sample,
        // samples), t (the temperatures), rIn, rOut, rIsco (rg), look, star,
        // teff (discLook)} or null}.
        // With a disc it runs however far the camera is (the disc shows
        // from afar too)
        update(camera, on, year = 2000, other = null) {
            const now = performance.now();
            const rgcSec = rgAu > 0 ? rgAu * 1.495978707e11 / 299792458 : 1;
            const dWall = lastYear === null ? 0 : Math.min(now - lastNow, 250) / 1000;
            const dYear = lastYear === null ? 0 : year - lastYear;
            flowTime += THREE.MathUtils.clamp(dYear * 31557600 / rgcSec, -SIM_PACE_MAX * dWall, SIM_PACE_MAX * dWall);
            lastYear = year;
            lastNow = now;
            const rg = other ? other.rgAu : rgAu;
            hole.copy(other ? other.at : ORIGIN);
            const r = rg > 0 ? camera.position.distanceTo(hole) / rg : Infinity;
            const kerr = other?.kerr ?? null;
            pass.enabled = on && (r < LENS_REACH_RG || Boolean(kerr?.disc));
            shadowAngle = pass.enabled ? Math.asin(Math.min(B_CRIT * Math.sqrt(Math.max(1 - 2 / r, 0)) / r, 1)) : 0;
            if (!pass.enabled) {
                updateFarLens(false);
                return;
            }
            hole.applyMatrix4(camera.matrixWorldInverse).divideScalar(rg);
            u.uHole.value.copy(hole);
            updateFarLens(true, hole, rg, camera.quaternion, heightPx / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)));
            u.uViewToWorld.value.setFromMatrix4(camera.matrixWorld);
            const t = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
            u.uTanHalf.value.set(t * camera.aspect, t);
            u.uKerr.value = kerr ? 1 : 0;
            if (kerr) {
                // The hole's frame (z its spin) in view space; the camera and
                // the star in it (rg)
                rot.setFromMatrix4(camera.matrixWorldInverse);
                kAxis.copy(kerr.axis).applyMatrix3(rot).normalize();
                kE1.crossVectors(kAxis, Math.abs(kAxis.y) < 0.9 ? Y_AXIS : X_AXIS).normalize();
                kE2.crossVectors(kAxis, kE1);
                const toHole = u.uToHole.value;
                toHole.set(kE1.x, kE1.y, kE1.z, kE2.x, kE2.y, kE2.z, kAxis.x, kAxis.y, kAxis.z);
                u.uSpin.value = kerr.spin;
                u.uCamHole.value.copy(hole).negate().applyMatrix3(toHole);
                if (kerr.star) {
                    kStar.copy(kerr.star.at).applyMatrix4(camera.matrixWorldInverse).divideScalar(rg).sub(hole).applyMatrix3(toHole);
                    u.uStarBall.value.set(kStar.x, kStar.y, kStar.z, kerr.star.radiusAu / rg);
                } else {
                    u.uStarBall.value.w = 0;
                }
                const dsc = kerr.disc;
                if (dsc) {
                    u.uDisc.value.set(dsc.rIn, dsc.rOut, 1, dsc.rIsco);
                    // Its axis (the orbit's) in the hole's frame, and whether
                    // it's tilted from the spin's equator
                    const dn = u.uDiscN.value.copy(kerr.discAxis ?? kerr.axis).applyMatrix3(rot).applyMatrix3(toHole).normalize();
                    u.uDiscE1.value.crossVectors(dn, Math.abs(dn.z) < 0.9 ? Z_AXIS : X_AXIS).normalize();
                    u.uDiscTilt.value = dn.z < Math.cos(THREE.MathUtils.degToRad(1)) ? 1 : 0;
                    // Truncated far outside the innermost stable orbit (V404
                    // Cygni, quiet): its inner edge fades too
                    const edges = discEdgesRg(dsc);
                    u.uDiscEdge.value.set(edges.solidTo, edges.solidFrom);
                    u.uDiscT.value = dsc.texture;
                    u.uDiscTX.value.copy(dsc.tx);
                    u.uDiscLook.value.set(dsc.look, dsc.star, discAdapt(dsc, r));
                    // Its turbulence's clock (rg/c), the inner edge's orbit
                    // at most DISC_ORBITS_PER_SEC
                    if (dsc !== discOf) {
                        discOf = dsc;
                        discTime = 0;
                    }
                    const rIn = Math.max(dsc.rIn, dsc.rIsco);
                    const cap = DISC_ORBITS_PER_SEC * 2 * Math.PI * (rIn ** 1.5 + kerr.spin) * dWall;
                    discTime += THREE.MathUtils.clamp(dYear * 31557600 / (rg * 1.495978707e11 / 299792458), -cap, cap);
                    u.uDiscTurb.value.set(discTime, dsc.turb[0], dsc.turb[1], 2 * t / heightPx);
                } else {
                    u.uDisc.value.z = 0;
                    u.uDiscLook.value.z = 1;
                }
            }
            u.uFlowOn.value = flow && !other ? 1 : 0;
            if (!flow || other) return;
            rot.setFromMatrix4(camera.matrixWorldInverse);
            u.uFlowAxis.value.copy(axisScene).applyMatrix3(rot).normalize();
            u.uFlowE1.value.copy(e1).applyMatrix3(rot).normalize();
            const sm = flow.simulated;
            if (sm) {
                // The two turbulence patterns, half a window apart: their
                // ages, seeds (which window they're in) and weights
                const W = SIM_WINDOW;
                const cA = Math.floor(flowTime / W), cB = Math.floor((flowTime + W / 2) / W);
                const tA = flowTime - cA * W, tB = flowTime + W / 2 - cB * W;
                const seed = (k) => ((k % 97) + 97) % 97;
                u.uSimTime.value.set(tA, tB, seed(cA), seed(cB) + 0.5);
                u.uSimWeight.value.set(1 - Math.abs(2 * tA / W - 1), 1 - Math.abs(2 * tB / W - 1));
                // The flicker: a red-noise wander (three scales, a random
                // walk's spread) of the measured size and timescale
                const tau = sm.flicker.tau_h * 3600 / rgcSec;
                const z = (vnoise(flowTime / tau) + 0.5 * vnoise(4 * flowTime / tau + 17) + 0.25 * vnoise(16 * flowTime / tau + 31)) / 0.515;
                u.uSimIn.value.z = Math.exp(sm.flicker.sigma * z);
            }
            // The hot spot: on during its day's flare, orbiting (anticlockwise
            // about the spin: clockwise on our sky) at its measured period,
            // carried round on the flow's clock
            const sp = flow.spot;
            const hours = (year - 2000) * HOURS_PER_YEAR;
            const day = Math.floor(hours / 24);
            const startH = day * 24 + hash(day) * (24 - sp.duration_h);
            const x = (hours - startH) / sp.duration_h;
            spotLevel = x > 0 && x < 1 ? Math.sin(Math.PI * x) ** 2 : 0;
            if (spotLevel > 0) {
                const periodRg = sp.period_min * 60 / rgcSec;
                const phi = 2 * Math.PI * (hash(day + 0.5) + flowTime / periodRg);
                spot.copy(e1).multiplyScalar(Math.cos(phi)).addScaledVector(e2, Math.sin(phi)).multiplyScalar(sp.radius_rg)
                    .applyMatrix3(rot);
                const amp = u.uFlowSim.value > 0.5 ? simSpot : sp.density_share * flow.n0 * sp.radius_rg ** -1.1;
                u.uSpot.value.set(spot.x, spot.y, spot.z, spotLevel * amp);
            } else {
                u.uSpot.value.w = 0;
            }
        },
        // How much the hot spot shows now (0..1)
        spotShown: () => spotLevel,
        // What the pass scales the background by (a disc's view: the eye's
        // adaptation; else 1): what's drawn over it after should match
        backgroundScale: () => (pass.enabled && u.uKerr.value > 0.5 ? u.uDiscLook.value.z : 1),
        dispose() {
            u.uTable.value.dispose();
            pass.dispose();
        },
    };
}
