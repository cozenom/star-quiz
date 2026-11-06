// The Galactic nucleus in the 3D view: the nuclear star cluster and the
// nuclear stellar disc round Sgr A*, in the star layer (ly), as points of
// light over a faint glow.
//
// Points: drawn where the stars are (each part's published shape), like the
// galaxy model's, but at every scale: nested clouds, each LEVEL_STEP times
// smaller than the one before (from NUCLEUS_REACH_KPC down to the S-stars),
// each sampled from the mass inside it. A point shows while its distance
// from the camera suits its cloud (LEVEL_SHOWN: a few times the cloud's
// size either way), so flying in, finer clouds take over and there is
// always a field of points round you; from inside the cluster the sky is
// full of them, near and far. No point stands for less than SUNS_PER_POINT
// (the finest clouds hold few), and none inside the S-stars' region
// (S_STARS_KPC: there, the measured stars are drawn). How many and how
// bright are ours, as the galaxy model's points.
//
// Glow: the same light as the band's (utils/milkyWayBand nucleusLight, from
// galaxy.json nucleus: Sormani et al. 2022's pair, the cluster a flattened
// Dehnen model, the disc exponential; the bar and bulge's light per Sun),
// added up along each pixel's ray through a box round the nucleus, so it
// shows from anywhere: a small bright core from across the Galaxy, a glowing
// lens a few hundred ly across up close, and a sky full of the cluster's
// light from among the S-stars (camera and rays in Galactocentric kpc,
// worked out in doubles, so it is as sharp at 0.1 AU as at 1,000 ly).
//
// Both are dimmed by the dust between the camera and them (the glow's to
// each ray's closest approach to Sgr A*, each point's to itself: the band's
// dust, the model's and the measured map), worked out here: the dust volume
// dims everything drawn before it by a ray's whole column, which from
// inside the nucleus would put the dust behind it in front. So they draw
// after the volume.
//
// What's ours: the glow's display curve (light -> brightness, below), the
// points' number and brightness. The shapes, masses and the light per Sun
// are published (see milkyWayBand).

import * as THREE from 'three';
import { DUST_MAG_PER_TAU } from './dustMap.js';
import { GALAXY_COLORS, sceneMatrix } from './galaxy3d.js';
import { BAND_GLSL, NUCLEUS_REACH_KPC, bandUniforms } from './milkyWayBand.js';
import { random } from './oortCloud.js';

// Point clouds: each LEVEL_STEP times smaller, down to the S-stars'
// region; points per cloud (phones fewer), at most one per SUNS_PER_POINT
const LEVEL_STEP = 3;
const S_STARS_KPC = 4e-5;
const POINTS_PER_LEVEL = { full: 24000, lite: 9000 };
const SUNS_PER_POINT = 1;
// A point shows while log2(its distance from the camera / its cloud's
// size) is within [from, to], fading over a unit outside
const LEVEL_SHOWN = [-2, 2];
// A cloud's points thin out towards its edge, from this share of its size
const LEVEL_EDGE = 0.6;
// Points: the bulge's colour, brightness and size (as the galaxy model's,
// ours); this share of them giants, brighter and bigger
const POINT_BRIGHTNESS = 0.07;
const POINT_PX = 1.6;
const GIANT_SHARE = 0.1;
const GIANT_BRIGHTNESS = 2.5;
const GIANT_PX = 2.2;
// Dust in front of each point: samples from the camera to it
const POINT_DUST_STEPS = { full: 10, lite: 6 };

// The box the rays cross (kpc, half sizes): the disc is down to 1e-5 of
// its centre's density at its sides
const BOX_HALF_KPC = [NUCLEUS_REACH_KPC, NUCLEUS_REACH_KPC, 0.4];
// Samples per ray (cluster, disc) and for the dust in front
const STEPS = { full: [48, 32], lite: [24, 16] };
const DUST_STEPS = { full: 48, lite: 24 };
// The dust march starts this far from the camera (kpc), with at most one
// sample per DUST_SPAN_KPC of the way (the model's dust has a hole round
// the centre: within the nucleus there's little to sample)
const DUST_NEAR_KPC = 0.002;
const DUST_SPAN_KPC = 0.05;
// Light -> brightness (ours): x = log10(light) from LO to HI, brightness
// MAX x^GAMMA, eased in over the first SOFT of x, in the light's own colour
// (the curve on its brightest channel, so it keeps its hue and the dust's
// reddening). Light in the band's units (the thin disc's light per kpc in
// the plane at the Sun): LO the bulge's own seen face on through its middle
// (~2.6: the glow starts where the nucleus outshines it), HI the sky seen
// from inside the cluster (~1,500; ~3,000 through its centre from
// outside); ~120 through the disc's middle edge on, ~40 face on. Kept dim
// enough at the top that the S-stars' orbits stand out from among them.
const DISPLAY = { lo: 0.4, hi: 3.2, max: 0.14, gamma: 0.7, soft: 0.15 };

// tau_V of the dust from p along dir for t kpc (the measured map where it
// is, the model's for the rest): up to n samples spaced geometrically from
// DUST_NEAR_KPC (one per DUST_SPAN_KPC of the way, at least 2: inside the
// nucleus a few, not n, for every pixel and point), each at jitter (0..1)
// within its step. After BAND_GLSL.
const DUST_IN_FRONT_GLSL = /* glsl */ `
    float dustInFront(vec3 p0, vec3 dir, float t, int nMax, float jitter) {
        if (t <= ${DUST_NEAR_KPC.toFixed(4)}) return 0.0;
        int n = min(nMax, max(2, int(ceil(t / ${DUST_SPAN_KPC.toFixed(3)}))));
        float ratio = t / ${DUST_NEAR_KPC.toFixed(4)};
        float tauV = 0.0;
        for (int i = 0; i < 128; i++) {
            if (i >= n) break;
            float ta0 = ${DUST_NEAR_KPC.toFixed(4)} * pow(ratio, float(i) / float(n));
            float ta1 = ${DUST_NEAR_KPC.toFixed(4)} * pow(ratio, float(i + 1) / float(n));
            float ds = ta1 - ta0;
            vec3 p = p0 + dir * mix(ta0, ta1, jitter);
            vec3 h = uGcToHel * p + uGcToHelOffset;
            tauV += modelDust(p, armTexel(p).g) * ds * (1.0 - measuredShare(h))
                + measuredDust(h) * ds * 1000.0 / ${DUST_MAG_PER_TAU.toFixed(6)};
        }
        return tauV;
    }
`;

const vertexShader = /* glsl */ `
    varying vec3 vLocal;
    void main() {
        vLocal = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
const fragmentShader = /* glsl */ `
    uniform vec3 uCamGc;       // camera, Galactocentric kpc
    uniform vec3 uBoxHalf;
    uniform float uFade;
    uniform int uDustSteps;
    uniform vec4 uDisplay;     // log10 light at none and full, full brightness, gamma
    varying vec3 vLocal;
    ${BAND_GLSL}
    ${DUST_IN_FRONT_GLSL}
    float brightness(float light) {
        float x = clamp((log(max(light, 1e-30)) * 0.4342945 - uDisplay.x) / (uDisplay.y - uDisplay.x), 0.0, 1.0);
        return uDisplay.z * pow(x, uDisplay.w) * smoothstep(0.0, ${DISPLAY.soft.toFixed(3)}, x);
    }
    void main() {
        vec3 dir = normalize(vLocal - uCamGc);
        vec3 inv = 1.0 / (dir + vec3(1e-9));
        vec3 ta = (-uBoxHalf - uCamGc) * inv;
        vec3 tb = (uBoxHalf - uCamGc) * inv;
        vec3 tmin = min(ta, tb), tmax = max(ta, tb);
        float t0 = max(max(tmin.x, tmin.y), max(tmin.z, 0.0));
        float t1 = min(min(tmax.x, tmax.y), tmax.z);
        if (t1 <= t0) discard;
        float light = nucleusLight(uCamGc, dir, t0, t1, uNucleusSteps);
        if (light < pow(10.0, uDisplay.x)) discard;
        // The dust in front: from the camera to the closest approach
        float jitter = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
        float tauV = dustInFront(uCamGc, dir, clamp(-dot(uCamGc, dir), 0.0, t1), uDustSteps, jitter);
        // Its colour, reddened by the dust; the curve on its brightest channel
        vec3 c = uColBulge * exp(-tauV * uDustColor);
        float peak = max(c.r, max(c.g, c.b));
        float v = brightness(light * peak);
        // brightness -> linear (see Universe3D), in its own colour
        gl_FragColor = vec4(pow(v, 2.2) * c / max(peak, 1e-6) * uFade, 1.0);
    }
`;

// The points: level = their cloud's size (kpc), bright and size their own;
// hidden (off screen) outside LEVEL_SHOWN, dimmed by the dust in front
const pointVertexShader = /* glsl */ `
    attribute float level;
    attribute float bright;
    attribute float size;
    uniform vec3 uCamGc;
    uniform float uFade;
    uniform float uPixelRatio;
    uniform int uPointDustSteps;
    uniform vec3 uPointColor;
    varying vec3 vColor;
    ${BAND_GLSL}
    ${DUST_IN_FRONT_GLSL}
    void main() {
        vec3 toPoint = position - uCamGc;
        float d = length(toPoint);
        float x = log2(max(d, 1e-12) / level);
        float shown = smoothstep(${(LEVEL_SHOWN[0] - 1).toFixed(1)}, ${LEVEL_SHOWN[0].toFixed(1)}, x)
            * (1.0 - smoothstep(${LEVEL_SHOWN[1].toFixed(1)}, ${(LEVEL_SHOWN[1] + 1).toFixed(1)}, x)) * uFade;
        if (shown < 0.004) {
            gl_PointSize = 0.0;
            gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
            return;
        }
        float tauV = dustInFront(uCamGc, toPoint / max(d, 1e-12), d, uPointDustSteps, 0.5);
        vColor = uPointColor * bright * shown * exp(-tauV * uDustColor);
        gl_PointSize = size * uPixelRatio;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
const pointFragmentShader = /* glsl */ `
    varying vec3 vColor;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float a = 1.0 - smoothstep(0.3, 1.0, r);
        if (a <= 0.0) discard;
        gl_FragColor = vec4(vColor, a);
    }
`;

// The points, from the nucleus's shapes (galaxy.json nucleus): per cloud
// (size R from NUCLEUS_REACH_KPC down by LEVEL_STEP to the S-stars'
// region), the cluster within flattened radius R and the disc within R in
// R and |z|, each by its mass there, thinned towards the cloud's edge.
// Galactocentric kpc. {pos, level, bright, size} (Float32Arrays)
function scatterPoints(data, lite) {
    const rand = random(2022);
    const c = data.nucleus.cluster, d = data.nucleus.disc;
    const a0 = c.a0_pc / 1000, g = c.gamma, q = c.q;
    const rd = d.scale_length_pc / 1000, hd = d.scale_height_pc / 1000;
    // Shares of each part's mass inside: the cluster's within flattened
    // radius a (Dehnen), the disc's within R < x (a gamma(2) in R) and
    // |z| < x
    const clusterShare = (a) => Math.pow(a / (a + a0), 3 - g);
    const discRShare = (x) => 1 - (1 + x / rd) * Math.exp(-x / rd);
    const discZShare = (x) => 1 - Math.exp(-x / hd);
    // The disc's R at share u of its mass in R, by bisection
    const discR = (u) => {
        let lo = 0, hi = 50 * rd;
        for (let i = 0; i < 40; i++) {
            const mid = 0.5 * (lo + hi);
            if (discRShare(mid) < u) lo = mid; else hi = mid;
        }
        return 0.5 * (lo + hi);
    };
    const smoothstep = THREE.MathUtils.smoothstep;
    const pos = [], level = [], bright = [], size = [];
    const per = POINTS_PER_LEVEL[lite ? 'lite' : 'full'];
    for (let R = NUCLEUS_REACH_KPC; R > S_STARS_KPC; R /= LEVEL_STEP) {
        const uc = clusterShare(R), ur = discRShare(R), uz = discZShare(R);
        const mCluster = c.mass_msun * uc;
        const mDisc = d.mass_msun * ur * uz;
        const n = Math.min(per, Math.round((mCluster + mDisc) / SUNS_PER_POINT));
        let made = 0;
        for (let tries = 0; made < n && tries < 20 * n; tries++) {
            let x, y, z;
            const phi = 2 * Math.PI * rand();
            if (rand() * (mCluster + mDisc) < mCluster) {
                const t = Math.pow(rand() * uc, 1 / (3 - g));
                const a = a0 * t / (1 - t);
                const cz = 2 * rand() - 1, sz = Math.sqrt(1 - cz * cz);
                x = a * sz * Math.cos(phi); y = a * sz * Math.sin(phi); z = q * a * cz;
            } else {
                const r = discR(rand() * ur);
                x = r * Math.cos(phi); y = r * Math.sin(phi);
                z = (rand() < 0.5 ? -1 : 1) * -hd * Math.log(1 - rand() * uz);
            }
            const r3 = Math.hypot(x, y, z);
            if (r3 < S_STARS_KPC || rand() > 1 - smoothstep(r3, LEVEL_EDGE * R, R)) continue;
            const giant = rand() < GIANT_SHARE;
            pos.push(x, y, z);
            level.push(R);
            bright.push(POINT_BRIGHTNESS * (giant ? GIANT_BRIGHTNESS : 0.6 + 0.8 * rand()));
            size.push(giant ? GIANT_PX : POINT_PX);
            made++;
        }
    }
    return { pos: new Float32Array(pos), level: new Float32Array(level), bright: new Float32Array(bright), size: new Float32Array(size) };
}

// scene: the star layer's scene; data: galaxy.json; dust: the measured dust
// (utils/dustMap createDustMap); pixelRatio: the device's. The points are
// scattered here (fixed seed). Returns {update(cameraLy), setFade(f),
// dispose()}
export function buildNucleus(scene, data, { lite = false, dust, pixelRatio = 1 }) {
    const toScene = sceneMatrix(data.to_scene);
    const fromScene = toScene.clone().invert();
    const uniforms = {
        ...bandUniforms(data, lite),
        ...dust.uniforms,
        uNucleusSteps: { value: new THREE.Vector2(...STEPS[lite ? 'lite' : 'full']) },
        uCamGc: { value: new THREE.Vector3() },
        uBoxHalf: { value: new THREE.Vector3(...BOX_HALF_KPC) },
        uFade: { value: 0 },
        uDustSteps: { value: DUST_STEPS[lite ? 'lite' : 'full'] },
        uDisplay: { value: new THREE.Vector4(DISPLAY.lo, DISPLAY.hi, DISPLAY.max, DISPLAY.gamma) },
        uPixelRatio: { value: pixelRatio },
        uPointDustSteps: { value: POINT_DUST_STEPS[lite ? 'lite' : 'full'] },
        uPointColor: { value: new THREE.Color().setHex(GALAXY_COLORS.bulge[0], THREE.LinearSRGBColorSpace) },
    };
    const group = new THREE.Group();
    group.matrixAutoUpdate = false;
    group.matrix.copy(toScene);
    group.matrixWorldNeedsUpdate = true;
    group.visible = false;
    scene.add(group);
    const geometries = [];
    const materials = [];

    // The glow: a box seen from inside (or its far side from outside), each
    // fragment one ray
    const glowMaterial = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
    });
    const box = new THREE.BoxGeometry(...BOX_HALF_KPC.map(h => 2 * h));
    const glow = new THREE.Mesh(box, glowMaterial);
    // After the dust volume (-2.5): their own dust instead
    glow.renderOrder = -2;
    glow.frustumCulled = false;
    group.add(glow);
    geometries.push(box);
    materials.push(glowMaterial);

    // The points
    if (data.nucleus) {
        const p = scatterPoints(data, lite);
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(p.pos, 3));
        g.setAttribute('level', new THREE.BufferAttribute(p.level, 1));
        g.setAttribute('bright', new THREE.BufferAttribute(p.bright, 1));
        g.setAttribute('size', new THREE.BufferAttribute(p.size, 1));
        const pointMaterial = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: pointVertexShader,
            fragmentShader: pointFragmentShader,
            transparent: true,
            depthWrite: false,
            depthTest: false,
            blending: THREE.AdditiveBlending,
        });
        const points = new THREE.Points(g, pointMaterial);
        points.renderOrder = -2;
        points.frustumCulled = false;
        group.add(points);
        geometries.push(g);
        materials.push(pointMaterial);
    }

    const camKpc = new THREE.Vector3();
    return {
        update: (cameraLy) => {
            group.visible = uniforms.uFade.value > 0 && Boolean(data.nucleus);
            if (!group.visible) return;
            uniforms.uCamGc.value.copy(camKpc.copy(cameraLy).applyMatrix4(fromScene));
        },
        setFade: (f) => { uniforms.uFade.value = f; },
        dispose: () => {
            scene.remove(group);
            geometries.forEach(g => g.dispose());
            materials.forEach(m => m.dispose());
        },
    };
}
