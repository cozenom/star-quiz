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
        uSky: { value: new THREE.Vector2() },
        uViewToWorld: { value: new THREE.Matrix3() },
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
        // A ray bent off the screen (d, view space): the Milky Way band's
        // light that way while the band shows (its stars left out), the
        // screen's mean light for the rest
        uniform samplerCube uSkyCube;
        uniform vec2 uSky;          // the band's fade, its display level
        uniform mat3 uViewToWorld;
        vec3 offScreen(vec3 d) {
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
            float rr = sqrt(1.0 - 2.0 / r);
            float b = r * s / rr;
            vec3 color = background(d, l, c, b);
            // The glowing gas: simulated, in front of what's behind it; or
            // radio, its light added (false colour)
            if (uFlowOn > 0.0 && (b < uFlowScale.y || r < uFlowScale.y)) {
                if (uFlowSim > 0.5) {
                    vec4 fl = simTrace(d, b, 1.0 / rr);
                    color = color * fl.a + fl.rgb;
                } else {
                    float tb = flowTb(d, b, 1.0 / rr);
                    color += pow(afmhot(tb / uFlowScale.z), vec3(2.2));
                }
            }
            gl_FragColor = vec4(color, 1.0);
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
        // camera: the close-up's layer camera (Sgr A*'s: AU from it; world
        // matrix current); on: the close-up shows; year: the clock's.
        // other: a stellar black hole instead, {at (its place in camera's
        // layer, AU), rgAu}: no glowing gas
        update(camera, on, year = 2000, other = null) {
            const now = performance.now();
            const rgcSec = rgAu > 0 ? rgAu * 1.495978707e11 / 299792458 : 1;
            if (lastYear !== null) {
                const dWall = Math.min(now - lastNow, 250) / 1000;
                const dClock = (year - lastYear) * 31557600 / rgcSec;
                flowTime += THREE.MathUtils.clamp(dClock, -SIM_PACE_MAX * dWall, SIM_PACE_MAX * dWall);
            }
            lastYear = year;
            lastNow = now;
            const rg = other ? other.rgAu : rgAu;
            hole.copy(other ? other.at : ORIGIN);
            const r = rg > 0 ? camera.position.distanceTo(hole) / rg : Infinity;
            pass.enabled = on && r < LENS_REACH_RG;
            if (!pass.enabled) return;
            hole.applyMatrix4(camera.matrixWorldInverse).divideScalar(rg);
            u.uHole.value.copy(hole);
            u.uViewToWorld.value.setFromMatrix4(camera.matrixWorld);
            const t = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
            u.uTanHalf.value.set(t * camera.aspect, t);
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
        dispose() {
            u.uTable.value.dispose();
            pass.dispose();
        },
    };
}
