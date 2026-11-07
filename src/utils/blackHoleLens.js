// Gravitational lensing by Sgr A* (a Schwarzschild black hole; GM/c^2 =
// rg, from galactic_centre.json black_hole), prototyped here to carry on
// to other black holes later.
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
//     screen (strong bending, the photon ring) it takes the screen's mean
//     light. Surface brightness is kept (Liouville): no magnification
//     factor needed, arcs come out stretched as they should
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

import * as THREE from 'three';
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
    const data = new Float32Array(TABLE_SIZE);
    for (let i = 0; i < TABLE_SIZE; i++) {
        const x = TABLE_X0 + (TABLE_X1 - TABLE_X0) * i / (TABLE_SIZE - 1);
        data[i] = deflection(B_CRIT * (1 + Math.exp(x)));
    }
    const tex = new THREE.DataTexture(data, TABLE_SIZE, 1, THREE.RedFormat, THREE.FloatType);
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

const lensShader = {
    uniforms: {
        tDiffuse: { value: null },
        uTable: { value: null },
        uTableX: { value: new THREE.Vector3(TABLE_X0, (TABLE_X1 - TABLE_X0) / (TABLE_SIZE - 1), TABLE_SIZE) },
        uHole: { value: new THREE.Vector3() },  // the hole in view space (rg)
        uTanHalf: { value: new THREE.Vector2(1, 1) },
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
        void main() {
            vec3 d = normalize(vec3((vUv * 2.0 - 1.0) * uTanHalf, -1.0));
            float r = length(uHole);
            vec3 l = uHole / r;
            float c = dot(d, l);
            float s = sqrt(max(1.0 - c * c, 0.0));
            if (s < 1e-7 && c < 0.0) {
                gl_FragColor = texture2D(tDiffuse, vUv);  // straight away from it
                return;
            }
            // Impact parameter (rg), of the ray from a static observer at r
            float b = r * s / sqrt(1.0 - 2.0 / r);
            if (c > 0.0 && b <= BC) {
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);  // falls in: the shadow
                return;
            }
            // Bending from here on: the far-off-to-far-off bending's share
            // still ahead (as lensAlpha)
            float alpha = alphaInf(max(b, BC * (1.0 + 1e-7))) * 0.5 * (1.0 + c);
            if (alpha < 1e-6) {
                gl_FragColor = texture2D(tDiffuse, vUv);
                return;
            }
            // Turned towards the hole by alpha
            vec3 towards = normalize(l - d * c);
            vec3 dOut = d * cos(alpha) + towards * sin(alpha);
            vec3 color;
            if (dOut.z < -1e-6) {
                vec2 uv = dOut.xy / (-dOut.z) / uTanHalf * 0.5 + 0.5;
                color = all(greaterThanEqual(uv, vec2(0.0))) && all(lessThanEqual(uv, vec2(1.0)))
                    ? texture2D(tDiffuse, uv).rgb : meanLight();
            } else {
                color = meanLight();
            }
            gl_FragColor = vec4(color, 1.0);
        }
    `,
};

// The background's lens pass (insert it after the star layer's pass) and
// its state: {pass, setRg(rgAu) (the hole's GM/c^2, once known),
// update(camera, on) each frame before rendering, dispose()}
export function createLensPass() {
    let rgAu = 0;
    const pass = new ShaderPass(lensShader);
    pass.uniforms.uTable.value = deflectionTexture();
    pass.enabled = false;
    const hole = new THREE.Vector3();
    return {
        pass,
        // camera: the close-up's layer camera (AU from Sgr A*, world matrix
        // current); on: the close-up shows
        setRg: (rg) => { rgAu = rg; },
        update(camera, on) {
            const r = rgAu > 0 ? camera.position.length() / rgAu : Infinity;
            pass.enabled = on && r < LENS_REACH_RG;
            if (!pass.enabled) return;
            hole.set(0, 0, 0).applyMatrix4(camera.matrixWorldInverse).divideScalar(rgAu);
            pass.uniforms.uHole.value.copy(hole);
            const t = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
            pass.uniforms.uTanHalf.value.set(t * camera.aspect, t);
        },
        dispose() {
            pass.uniforms.uTable.value.dispose();
            pass.dispose();
        },
    };
}
