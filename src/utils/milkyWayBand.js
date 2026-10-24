// The Milky Way band as seen from inside the disc: the galaxy model's own
// light, rendered, not a picture pasted on the sky.
//
// For each direction, a ray-march adds up the model's starlight along the
// line of sight and dims it by the dust in front (more in blue than red,
// so distant light reddens): the same density model and cited numbers as
// the 3D points (galaxy.json, see utils/galaxy3d), as smooth densities:
//   - old thin and thick disc: exponential in R and |z|
//   - bulge (exponential, 10 : 6.3 : 2.6) and long bar
//   - the arms' young stars: a face-on texture rasterised from Reid's
//     tracks, thin in z (their sigma_z)
//   - dust: within 5 kpc of the Sun (and 400 pc of the plane) the measured
//     3D dust map (utils/dustMap: the Great Rift, the Coalsack, the Orion
//     and Taurus clouds), sampled in finer steps (DUST_SUB per step); the
//     model's dust for the rest (1 - measuredShare): the Drimmel & Spergel
//     disc (flaring, hole inside R0 / 2) plus lanes on the arms' inner
//     edges, the same offset as the 3D sprites
// Seen from anywhere: the band tilts and thickens as the camera moves, and
// becomes the disc on the way out.
// What's ours: the brightness of each part (amplitudes, apart from the thick
// disc's published 4%), colours, the model dust's effective strength, the
// disc's taper inside the bar. The measured dust is used at its real
// strength (A_V). Scored against Gaia's EDR3 all-sky flux map (ESA/Gaia/
// DPAC, New_Data/; reference only, never shown) by Star_Data/scripts/tools/
// band_reference.py, a port of this march: seen from the Sun, rms of the
// display value 9.6 on a 0-255 scale over the sky (19.8 within 5 deg of the
// plane, 5.6 beyond 20 deg), from 18.9 with the old exposure/contrast curve
// and visual-band dust colours (2026-10-23). Gaia's brightness curve and
// its bands' dust colours are taken over (CURVE, DUST_COLOR); fitting the
// parts' amplitudes and colours too only reached 8.5 with values beyond
// belief (bulge x50, bar x95), so they stay. What's left is mostly in the
// plane, where the model is too dim towards the inner Galaxy.
//
// The march runs into a cube map round the camera, re-rendered only when
// the camera has moved enough to change the view (turning is free), and
// shown on a sky sphere in a layer centred on the camera (layers3d).

import * as THREE from 'three';
import {
    ARM_END_FADE, ARM_FADE_FROM_KPC, ARM_FADE_KPC, ARM_KIND_WEIGHT, BAR_WIDTH_KPC, BULGE_SCALE_KPC,
    DUST_OFFSET, DUST_SPREAD, armPoint, prepareArms, sceneMatrix,
} from './galaxy3d.js';
import { DUST_GLSL, DUST_MAG_PER_TAU, createDustMap } from './dustMap.js';

// Face-on arm texture: +-ARMS_HALF_KPC, ARMS_SIZE px a side (~80 pc a pixel)
const ARMS_HALF_KPC = 20;
const ARMS_SIZE = 512;
// Stamps along each arm, this far apart (kpc)
const ARMS_STEP_KPC = 0.05;
// Rays stop this far from the centre (kpc), start this far out (nearby
// stars are drawn as stars)
const GALAXY_RADIUS_KPC = 25;
const NEAR_KPC = 0.03;
// Steps per ray (log-spaced), cube face size (px); phones get less
const STEPS = { full: 96, lite: 56 };
// Measured-dust samples per step where the step crosses its slab (each
// step is ~8% of its distance, 13% on phones: ~2% either way)
const DUST_SUB = { full: 4, lite: 6 };
const CUBE_SIZE = { full: 384, lite: 192 };
// Re-render when the camera has moved this share of its distance to the
// nearest... thing that matters: its height above the plane, plus this (kpc)
const REDRAW_SHARE = 0.01;
const REDRAW_FLOOR_KPC = 0.02;
// Light amplitudes, relative to the thin disc in the plane at the Sun (ours)
const AMP = { thick: 0.04, bulge: 5, bar: 2.5, arms: 0.4 };
// The discs thin out inside the bar, which has gathered their stars (as
// in e.g. Freudenreich 1998's model): taper between these radii (kpc, ours)
const DISC_HOLE_KPC = [1.5, 4];
// Young stars' light hugs the plane more than the old disc's (kpc)
const ARM_SIGMA_Z_KPC = 0.15;
// Dust: extinction per kpc at unit density (the disc's, in the plane at the
// Sun). The real average is ~1 mag/kpc in V (tau ~0.9), but real dust is
// clumpy and light gets through between the clouds; a smooth layer with
// the full average dims the band far too much, so this is the effective
// value for a smooth model (ours). Arm lanes add DUST_ARM_AMP.
const DUST_TAU_PER_KPC = 0.5;
const DUST_ARM_AMP = 1.0;
// Extinction per colour channel relative to A0 (red, green, blue): dust
// dims blue more, which reddens what gets through. Gaia's bands (RP, G,
// BP), as in its map that the band is scored against: the Gaia EDR3 law
// (Fitzpatrick 2019) for a 5,500 K star (Star_Data/scripts/tools/
// band_reference.py). Scored better than visual-band values (0.8, 1, 1.2)
const DUST_COLOR = [0.643, 0.850, 1.056];
// Colours (raw hex) of each part's light
const COLORS = { disc: 0xf4efe6, bulge: 0xffd9a0, arms: 0xc8d8ff };
// Brightness: light -> display value (0..1), the curve of Gaia's map fitted
// to this model (band_reference.py --fit --curve-only --gaia-bands --nside
// 64): y at CURVE_KNOTS points evenly spaced in log10(light) from log_lo
// to log_hi, linear between, held at the ends. Fit again after changing
// the light model
const CURVE = { log_lo: -0.5305, log_hi: 0.6168, y: [0.0310, 0.0533, 0.0533, 0.0821, 0.1018, 0.1238, 0.1460, 0.1688, 0.1898, 0.2190, 0.2365, 0.2536, 0.2784, 0.3069, 0.3265, 0.3528, 0.3746, 0.4088, 0.4279, 0.4546, 0.4788, 0.5079, 0.5318, 0.5591, 0.6000, 0.6286, 0.6609, 0.7052, 0.7451, 0.7714, 0.8088, 0.8399] };
// Gaia's map is stretched to make the band vivid; as a backdrop behind the
// real stars it is shown at this share of that (ours, by eye)
const DISPLAY_BRIGHTNESS = 0.4;
// Shown while the camera is within this distance of the Sun (ly): fading
// out as the 3D model fades in (galaxy3d FADE_IN_LY 2,000-12,000)
export const BAND_FADE_OUT_LY = [3000, 16000];

const LY_PER_KPC = 3261.563777;

// The light along one ray: the GLSL shared by the cube pass and the
// preview's all-sky map. origin and dir in Galactocentric kpc (dir unit).
export const BAND_GLSL = /* glsl */ `
    ${DUST_GLSL}
    uniform int uDustSub;        // measured-dust samples per step
    uniform sampler2D uArms;     // r: young-star light, g: arm dust (face-on)
    uniform float uArmsHalf;     // the texture spans +-this (kpc)
    uniform float uR0;
    uniform vec4 uThin;          // scale length, scale height
    uniform vec4 uThick;         // scale length, scale height, amplitude
    uniform vec2 uDiscHole;      // the discs taper off inside this (kpc): from, to
    uniform vec2 uBarAxis;       // unit vector to the bar's near end (x, y)
    uniform vec4 uBulge;         // a, b, c (kpc), amplitude
    uniform vec4 uBar;           // half-length, half-width, height (kpc), amplitude
    uniform vec4 uDust;          // scale length, base height, flare per kpc, flare start
    uniform vec3 uDustAmp;       // disc, arms, tau per kpc
    uniform vec2 uArmLight;      // amplitude, sigma_z
    uniform vec3 uDustColor;     // extinction per channel relative to V
    uniform vec3 uColDisc;
    uniform vec3 uColBulge;
    uniform vec3 uColArms;
    uniform float uGalaxyRadius;
    uniform float uNear;
    uniform int uSteps;

    float sech2(float x) { float c = cosh(clamp(x, -20.0, 20.0)); return 1.0 / (c * c); }

    // The model's dust at p (Galactocentric kpc), V-band optical depth per
    // kpc: the Drimmel & Spergel disc (flaring, a hole inside R0 / 2) plus
    // lanes on the arms' inner edges (lane: the arm texture's g there)
    float modelDust(vec3 p, float lane) {
        float R = length(p.xy);
        float hz = uDust.y + uDust.z * max(R - uDust.w, 0.0);
        float x = R / uR0;
        float hole = x < 0.5 ? exp(-(x - 0.5) * (x - 0.5) / 0.0625) : 1.0;
        return (exp(-(max(R, 0.5 * uR0) - uR0) / uDust.x) * hole * uDustAmp.x + uDustAmp.y * lane)
            * sech2(p.z / hz) * uDustAmp.z;
    }
    vec2 armTexel(vec3 p) {
        vec2 uv = p.xy / (2.0 * uArmsHalf) + 0.5;
        return all(greaterThanEqual(uv, vec2(0.0))) && all(lessThanEqual(uv, vec2(1.0))) ? texture2D(uArms, uv).rg : vec2(0.0);
    }

    vec3 bandLight(vec3 origin, vec3 dir) {
        // The part of the ray inside the galaxy's sphere
        float b = dot(origin, dir);
        float c = dot(origin, origin) - uGalaxyRadius * uGalaxyRadius;
        float h = b * b - c;
        if (h <= 0.0) return vec3(0.0);
        h = sqrt(h);
        float t0 = max(-b - h, uNear);
        float t1 = -b + h;
        if (t1 <= t0) return vec3(0.0);
        vec2 barSide = vec2(-uBarAxis.y, uBarAxis.x);
        vec3 light = vec3(0.0);
        vec3 tau = vec3(0.0);
        float ratio = t1 / t0;
        float tPrev = t0;
        for (int i = 1; i <= 160; i++) {
            if (i > uSteps) break;
            float t = t0 * pow(ratio, float(i) / float(uSteps));
            float ds = t - tPrev;
            vec3 p = origin + dir * (0.5 * (t + tPrev));
            // The step's ends, Galactic pc from the Sun (for the measured dust)
            vec3 ha = uGcToHel * (origin + dir * tPrev) + uGcToHelOffset;
            vec3 hb = uGcToHel * (origin + dir * t) + uGcToHelOffset;
            tPrev = t;
            float R = length(p.xy);
            float az = abs(p.z);
            // Old discs
            float disc = (exp(-(R - uR0) / uThin.x - az / uThin.y)
                + uThick.z * exp(-(R - uR0) / uThick.x - az / uThick.y))
                * smoothstep(uDiscHole.x, uDiscHole.y, R);
            // Bulge and bar, in the bar's frame
            float u = dot(p.xy, uBarAxis), v = dot(p.xy, barSide);
            float bulge = uBulge.w * exp(-length(vec3(u / uBulge.x, v / uBulge.y, p.z / uBulge.z)))
                + uBar.w * (1.0 - smoothstep(0.8 * uBar.x, uBar.x, abs(u)))
                    * exp(-0.5 * v * v / (uBar.y * uBar.y) - az / uBar.z);
            // Arms (face-on texture)
            vec2 arm = armTexel(p);
            float young = uArmLight.x * arm.r * exp(-0.5 * az * az / (uArmLight.y * uArmLight.y));
            // The measured dust where it is (tau_V over the step), the
            // model's for the rest
            float measured = 0.0;
            if (dustSegment(ha, hb)) {
                float av = 0.0;
                for (int k = 0; k < 16; k++) {
                    if (k >= uDustSub) break;
                    av += measuredDust(mix(ha, hb, (float(k) + 0.5) / float(uDustSub)));
                }
                measured = av / float(uDustSub) * ds * 1000.0 / ${DUST_MAG_PER_TAU.toFixed(6)};
            }
            float modelShare = 1.0 - measuredShare(0.5 * (ha + hb));
            vec3 emit = uColDisc * disc + uColBulge * bulge + uColArms * young;
            vec3 dtau = uDustColor * (modelDust(p, arm.g) * ds * modelShare + measured);
            // Light from this step, dimmed by the dust in front of it and
            // (half) by its own
            light += emit * ds * exp(-tau - 0.5 * dtau);
            tau += dtau;
        }
        return light;
    }
`;

// Face-on texture of the arms: r = young-star light (line density spread
// across the arm's width), g = dust on the inner edge (DUST_OFFSET,
// DUST_SPREAD widths). Half floats, so it filters. One per galaxy.json,
// shared by the band and the dust volume (a disposed texture uploads
// again when next used)
const armsTextures = new WeakMap();
function armsTexture(data) {
    if (!armsTextures.has(data)) armsTextures.set(data, makeArmsTexture(data));
    return armsTextures.get(data);
}
function makeArmsTexture(data) {
    const n = ARMS_SIZE;
    const px = (2 * ARMS_HALF_KPC) / n;
    const light = new Float32Array(n * n);
    const dust = new Float32Array(n * n);
    const stamp = (grid, x, y, sigma, w) => {
        const r = 3 * sigma;
        const i0 = Math.max(0, Math.floor((x - r + ARMS_HALF_KPC) / px));
        const i1 = Math.min(n - 1, Math.ceil((x + r + ARMS_HALF_KPC) / px));
        const j0 = Math.max(0, Math.floor((y - r + ARMS_HALF_KPC) / px));
        const j1 = Math.min(n - 1, Math.ceil((y + r + ARMS_HALF_KPC) / px));
        // A line of unit density spread as a 2D Gaussian across it: the
        // along-arm direction is covered by the stamps' spacing
        const norm = w / (2 * Math.PI * sigma * sigma);
        for (let j = j0; j <= j1; j++) {
            const dy = (j + 0.5) * px - ARMS_HALF_KPC - y;
            for (let i = i0; i <= i1; i++) {
                const dx = (i + 0.5) * px - ARMS_HALF_KPC - x;
                grid[j * n + i] += norm * Math.exp(-0.5 * (dx * dx + dy * dy) / (sigma * sigma));
            }
        }
    };
    const p = {};
    for (const arm of prepareArms(data.arms)) {
        const weight = ARM_KIND_WEIGHT[arm.kind];
        for (let s = 0; s < arm.length; s += ARMS_STEP_KPC) {
            armPoint(arm, s, p);
            const R = Math.hypot(p.x, p.y);
            const fade = p.endFade * Math.exp(-Math.max(R - ARM_FADE_FROM_KPC, 0) / ARM_FADE_KPC);
            if (fade <= 0) continue;
            const w = ARMS_STEP_KPC * weight * fade;
            stamp(light, p.x, p.y, p.w, w);
            const off = DUST_OFFSET * p.w;
            stamp(dust, p.x + p.nx * off, p.y + p.ny * off, Math.max(DUST_SPREAD * p.w, px), w);
        }
    }
    const rg = new Uint16Array(n * n * 2);
    for (let k = 0; k < n * n; k++) {
        rg[2 * k] = THREE.DataUtils.toHalfFloat(light[k]);
        rg[2 * k + 1] = THREE.DataUtils.toHalfFloat(dust[k]);
    }
    // Row j is y, column i is x: texture v = y, u = x
    const tex = new THREE.DataTexture(rg, n, n, THREE.RGFormat, THREE.HalfFloatType);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearFilter;
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    return tex;
}

const hexColor = (h) => new THREE.Color().setHex(h, THREE.LinearSRGBColorSpace);

// The uniforms BAND_GLSL needs, from galaxy.json. lite: fewer steps.
export function bandUniforms(data, lite = false) {
    const d = data.disc, bar = data.bar, dd = data.dust_disc;
    const r0 = Math.hypot(data.sun_kpc[0], data.sun_kpc[1]);
    const ang = THREE.MathUtils.degToRad(bar.angle_deg);
    const ratio = bar.bulge_axis_ratio.map(v => v / bar.bulge_axis_ratio[0] * BULGE_SCALE_KPC);
    return {
        uArms: { value: armsTexture(data) },
        uArmsHalf: { value: ARMS_HALF_KPC },
        uR0: { value: r0 },
        uThin: { value: new THREE.Vector4(d.thin_scale_length_kpc, d.thin_scale_height_pc / 1000, 1, 0) },
        uThick: { value: new THREE.Vector4(d.thick_scale_length_kpc, d.thick_scale_height_pc / 1000, AMP.thick, 0) },
        uDiscHole: { value: new THREE.Vector2(...DISC_HOLE_KPC) },
        // Near end towards rotation from the Sun's direction (-x)
        uBarAxis: { value: new THREE.Vector2(-Math.cos(ang), Math.sin(ang)) },
        uBulge: { value: new THREE.Vector4(...ratio, AMP.bulge) },
        uBar: { value: new THREE.Vector4(bar.half_length_kpc, BAR_WIDTH_KPC, bar.long_bar_scale_height_pc.thin / 1000, AMP.bar) },
        uDust: { value: new THREE.Vector4(dd.scale_length_kpc, dd.base_scale_height_pc / 1000, dd.flare_pc_per_kpc / 1000, dd.flare_start_kpc) },
        uDustAmp: { value: new THREE.Vector3(1, DUST_ARM_AMP, DUST_TAU_PER_KPC) },
        uArmLight: { value: new THREE.Vector2(AMP.arms, ARM_SIGMA_Z_KPC) },
        uDustColor: { value: new THREE.Vector3(...DUST_COLOR) },
        uColDisc: { value: hexColor(COLORS.disc) },
        uColBulge: { value: hexColor(COLORS.bulge) },
        uColArms: { value: hexColor(COLORS.arms) },
        uGalaxyRadius: { value: GALAXY_RADIUS_KPC },
        uNear: { value: NEAR_KPC },
        uSteps: { value: lite ? STEPS.lite : STEPS.full },
        uDustSub: { value: lite ? DUST_SUB.lite : DUST_SUB.full },
        uCurve: { value: CURVE.y },
        uCurveRange: { value: new THREE.Vector2(CURVE.log_lo, CURVE.log_hi) },
    };
}

// The cube pass: a sphere seen from inside, each fragment one direction
const marchVertexShader = /* glsl */ `
    varying vec3 vDir;
    void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
const marchFragmentShader = /* glsl */ `
    uniform vec3 uCam;      // camera, Galactocentric kpc
    uniform mat3 uToGc;     // scene direction -> Galactocentric direction
    uniform float uCurve[${CURVE.y.length}];
    uniform vec2 uCurveRange;  // log10(light) at the first and last knot
    varying vec3 vDir;
    ${BAND_GLSL}
    float curve(float light) {
        float x = clamp((log(max(light, 1e-30)) * 0.4342945 - uCurveRange.x) / (uCurveRange.y - uCurveRange.x), 0.0, 1.0)
            * ${(CURVE.y.length - 1).toFixed(1)};
        int i = int(min(floor(x), ${(CURVE.y.length - 2).toFixed(1)}));
        return mix(uCurve[i], uCurve[i + 1], x - float(i));
    }
    void main() {
        vec3 light = bandLight(uCam, normalize(uToGc * normalize(vDir)));
        gl_FragColor = vec4(curve(light.r), curve(light.g), curve(light.b), 1.0);
    }
`;
// The sky sphere shows the cube map
const skyVertexShader = marchVertexShader;
const skyFragmentShader = /* glsl */ `
    uniform samplerCube uCube;
    uniform float uFade;
    uniform float uBrightness;
    varying vec3 vDir;
    void main() {
        vec3 c = textureCube(uCube, normalize(vDir)).rgb * uFade * uBrightness;
        gl_FragColor = vec4(pow(c, vec3(2.2)), 1.0);  // display value -> linear (see Universe3D)
    }
`;

// scene: the sky layer's scene (a layer whose origin is the camera); dust:
// the measured dust (utils/dustMap createDustMap; none: the model's only).
// Returns update(cameraPositionLy) (re-renders the cube when needed),
// fade(), setVisible(on), dispose()
export function buildMilkyWayBand(renderer, scene, data, { lite = false, dust = null } = {}) {
    const dustMap = dust ?? createDustMap(null);
    const toScene = sceneMatrix(data.to_scene);           // kpc -> ly
    const fromScene = toScene.clone().invert();           // ly -> kpc
    const toGc = new THREE.Matrix3().setFromMatrix4(fromScene);
    // Directions only: undo the ly-per-kpc scale
    toGc.multiplyScalar(LY_PER_KPC);

    const uniforms = {
        ...bandUniforms(data, lite),
        ...dustMap.uniforms,
        uCam: { value: new THREE.Vector3() },
        uToGc: { value: toGc },
    };
    const marchScene = new THREE.Scene();
    const marchMaterial = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: marchVertexShader,
        fragmentShader: marchFragmentShader,
        side: THREE.BackSide,
        depthWrite: false,
        depthTest: false,
    });
    const sphereGeometry = new THREE.SphereGeometry(10, 48, 24);
    marchScene.add(new THREE.Mesh(sphereGeometry, marchMaterial));
    const size = lite ? CUBE_SIZE.lite : CUBE_SIZE.full;
    const target = new THREE.WebGLCubeRenderTarget(size, { type: THREE.HalfFloatType, generateMipmaps: false });
    const cubeCamera = new THREE.CubeCamera(0.1, 100, target);

    const skyMaterial = new THREE.ShaderMaterial({
        uniforms: { uCube: { value: target.texture }, uFade: { value: 0 }, uBrightness: { value: DISPLAY_BRIGHTNESS } },
        vertexShader: skyVertexShader,
        fragmentShader: skyFragmentShader,
        side: THREE.BackSide,
        depthWrite: false,
        depthTest: false,
    });
    const sky = new THREE.Mesh(sphereGeometry, skyMaterial);
    sky.renderOrder = -10;
    sky.frustumCulled = false;
    scene.add(sky);

    const camKpc = new THREE.Vector3();
    const lastKpc = new THREE.Vector3(Infinity, 0, 0);
    // New dust boxes, or the dust switched: draw again
    const stopListening = dustMap.onChange(() => lastKpc.set(Infinity, 0, 0));
    let wanted = true;
    let fade = 0;
    return {
        update: (cameraPositionLy) => {
            const ly = cameraPositionLy.length();
            fade = wanted ? 1 - THREE.MathUtils.smoothstep(ly, ...BAND_FADE_OUT_LY) : 0;
            skyMaterial.uniforms.uFade.value = fade;
            sky.visible = fade > 0;
            if (fade <= 0) return;
            camKpc.copy(cameraPositionLy).applyMatrix4(fromScene);
            // Moved enough to change what it sees?
            const scale = Math.abs(camKpc.z) + REDRAW_FLOOR_KPC;
            if (camKpc.distanceTo(lastKpc) < REDRAW_SHARE * scale) return;
            lastKpc.copy(camKpc);
            uniforms.uCam.value.copy(camKpc);
            cubeCamera.update(renderer, marchScene);
        },
        fade: () => fade,
        setVisible: (on) => { wanted = on; },
        dispose: () => {
            stopListening();
            if (!dust) dustMap.dispose();
            scene.remove(sky);
            sphereGeometry.dispose();
            marchMaterial.dispose();
            skyMaterial.dispose();
            uniforms.uArms.value.dispose();
            target.dispose();
        },
    };
}

// The galaxy's dust as a volume in the star layer (ly), for the 3D view
// from outside the band's reach: the same dust as the band (the model's at
// its strength, the measured map where it is), ray-marched through a box
// round the disc. Each channel keeps T = exp(-tau * DUST_COLOR) of the
// light behind; blended as background * (1 - T) + behind * T, so dust
// reddens and dims what was drawn before it (the model's glow: draw it
// before the catalogue's stars) towards empty space, never darker.
// Steps about DUST_VOLUME_STEP_KPC apart, at most DUST_VOLUME_STEPS
// (spaced geometrically from the camera when it's inside the box).
const DUST_VOLUME_HALF_KPC = [GALAXY_RADIUS_KPC, GALAXY_RADIUS_KPC, 1.5];
const DUST_VOLUME_STEP_KPC = 0.04;
const DUST_VOLUME_STEPS = { full: 256, lite: 96 };
const DUST_VOLUME_NEAR_KPC = 0.002;

const dustVolumeVertexShader = /* glsl */ `
    varying vec3 vLocal;
    void main() {
        vLocal = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
const dustVolumeFragmentShader = /* glsl */ `
    uniform vec3 uCamGc;       // camera, Galactocentric kpc
    uniform vec3 uBoxHalf;
    uniform float uFade;
    uniform int uMaxSteps;
    uniform float uStepKpc;
    uniform float uNearKpc;
    varying vec3 vLocal;
    ${BAND_GLSL}
    void main() {
        vec3 dir = normalize(vLocal - uCamGc);
        vec3 inv = 1.0 / (dir + vec3(1e-9));
        vec3 ta = (-uBoxHalf - uCamGc) * inv;
        vec3 tb = (uBoxHalf - uCamGc) * inv;
        vec3 tmin = min(ta, tb), tmax = max(ta, tb);
        float t0 = max(max(tmin.x, tmin.y), max(tmin.z, uNearKpc));
        float t1 = min(min(tmax.x, tmax.y), tmax.z);
        if (t1 <= t0) discard;
        int n = int(clamp(ceil((t1 - t0) / uStepKpc), 8.0, float(uMaxSteps)));
        float ratio = t1 / t0;
        float jitter = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
        float tauV = 0.0;
        for (int i = 0; i < 512; i++) {
            if (i >= n) break;
            float ta0 = t0 * pow(ratio, float(i) / float(n));
            float ta1 = t0 * pow(ratio, float(i + 1) / float(n));
            float ds = ta1 - ta0;
            vec3 p = uCamGc + dir * mix(ta0, ta1, jitter);
            vec3 h = uGcToHel * p + uGcToHelOffset;
            tauV += modelDust(p, armTexel(p).g) * ds * (1.0 - measuredShare(h))
                + measuredDust(h) * ds * 1000.0 / ${DUST_MAG_PER_TAU.toFixed(6)};
        }
        vec3 lost = (1.0 - exp(-tauV * uDustColor)) * uFade;
        if (max(lost.r, max(lost.g, lost.b)) < 0.002) discard;
        gl_FragColor = vec4(lost, 1.0);
    }
`;

// scene: the star layer's scene; dust: the measured dust (createDustMap);
// background: the renderer's clear colour. Returns {update(cameraLy),
// setFade(f), dispose()}
export function buildGalaxyDust(scene, data, { lite = false, dust = null, background = new THREE.Color(0, 0, 0) } = {}) {
    const dustMap = dust ?? createDustMap(null);
    const toScene = sceneMatrix(data.to_scene);
    const fromScene = toScene.clone().invert();
    const uniforms = {
        ...bandUniforms(data, lite),
        ...dustMap.uniforms,
        uCamGc: { value: new THREE.Vector3() },
        uBoxHalf: { value: new THREE.Vector3(...DUST_VOLUME_HALF_KPC) },
        uFade: { value: 0 },
        uMaxSteps: { value: lite ? DUST_VOLUME_STEPS.lite : DUST_VOLUME_STEPS.full },
        uStepKpc: { value: DUST_VOLUME_STEP_KPC },
        uNearKpc: { value: DUST_VOLUME_NEAR_KPC },
    };
    const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: dustVolumeVertexShader,
        fragmentShader: dustVolumeFragmentShader,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        // background * (1 - T) + behind * T, per channel; alpha untouched
        blending: THREE.CustomBlending,
        blendEquation: THREE.AddEquation,
        blendSrc: THREE.ConstantColorFactor,
        blendDst: THREE.OneMinusSrcColorFactor,
        blendSrcAlpha: THREE.ZeroFactor,
        blendDstAlpha: THREE.OneFactor,
    });
    material.blendColor.copy(background);
    const geometry = new THREE.BoxGeometry(...DUST_VOLUME_HALF_KPC.map(h => 2 * h));
    const mesh = new THREE.Mesh(geometry, material);
    mesh.matrixAutoUpdate = false;
    mesh.matrix.copy(toScene);
    mesh.matrixWorldNeedsUpdate = true;
    // After the model's points (-3), before the masers (-1) and the
    // catalogue's stars, so it dims only the glow behind
    mesh.renderOrder = -2.5;
    mesh.frustumCulled = false;
    mesh.visible = false;
    scene.add(mesh);
    return {
        update: (cameraLy) => {
            mesh.visible = uniforms.uFade.value > 0;
            if (mesh.visible) uniforms.uCamGc.value.copy(cameraLy).applyMatrix4(fromScene);
        },
        setFade: (f) => { uniforms.uFade.value = f; },
        dispose: () => {
            scene.remove(mesh);
            geometry.dispose();
            material.dispose();
            if (!dust) dustMap.dispose();
        },
    };
}
