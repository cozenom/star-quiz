// The Milky Way: a model, drawn as points in the star layer (ly).
//
// Built from published numbers (galaxy.json, from Star_Data's
// curated/galaxy_model.json and Reid et al. 2019's arm tracks; see
// scripts/build_galaxy.py): the Sun 8.3 kpc from the centre, a bar at 27
// deg, the old stellar disc, and the spiral arms traced by young massive
// stars. Points are scattered here from a fixed seed, so the picture is
// the same every time:
//   - old disc (thin + thick) and the bar/bulge: warm white and yellow
//   - young stars along the arms, half of them in clumps (OB associations)
//   - H II regions: pink knots along the major arms
//   - dust: dark soft sprites on the arms' inner (concave) edges, where
//     the lanes are in trailing spirals, plus the dust disc
// What is published: the frame, the bar's angle and length, the disc and
// dust scale lengths and heights, the arms' centre lines and widths. What
// is ours, by eye: point counts, colours, brightness, the bulge's size and
// the bar's width, clump and knot sizes, and where the arms fade out.
//
// Positions are kept in kpc in the Galactocentric frame (x from the Sun
// to the centre, y towards the direction of rotation, z to the north
// Galactic pole); the objects' matrix carries them into the scene (ly).
// Nothing is generated until the camera first leaves the stars.

import * as THREE from 'three';
import { random } from './oortCloud.js';

const LY_PER_KPC = 3261.563777;

// Shown between these camera distances from the Sun (ly): fading in once
// the catalogue's stars are a cloud behind you (their too-faint-to-see dots
// fade out over the same range: the model's disc stands in for them)
export const FADE_IN_LY = [2000, 12000];
// Built (data fetched, points scattered) once the camera is this far out
const BUILD_LY = 1000;

// Point counts (desktop; phones get LITE_FACTOR of them)
const COUNTS = { thin: 360000, thick: 30000, bulge: 70000, bar: 60000, arms: 260000, hii: 1400, dust: 26000 };
const LITE_FACTOR = 0.35;
const HII_POINTS = 24;
// Old disc stars past this radius are dropped (kpc)
const DISC_MAX_KPC = 22;
// Bar/bulge shape (ours, kpc): exponential bulge with the 10 : 6.3 : 2.6
// axis ratio, a long bar out to the half-length with this half-width
const BULGE_SCALE_KPC = 1.0;
const BAR_WIDTH_KPC = 0.35;
// Young arm stars thin out beyond this radius (kpc) with this e-folding
const ARM_FADE_FROM_KPC = 11;
const ARM_FADE_KPC = 3;
// Share of arm stars in clumps, and clump size (kpc)
const CLUMP_SHARE = 0.5;
const CLUMP_COUNT = 5000;
const CLUMP_KPC = 0.06;
const HII_KPC = 0.04;
// Arm ends fade over this share of the arm's length
const ARM_END_FADE = 0.06;
// How many arm stars each kind gets, per kpc of arm
const ARM_KIND_WEIGHT = { major: 1, local: 0.7, bar: 0.5, spur: 0.35 };
// Dust: share on the arms; their offset towards the inner edge and
// spread (in arm widths); sprite sizes (kpc)
const DUST_ARM_SHARE = 0.65;
const DUST_OFFSET = 0.7;
const DUST_SPREAD = 0.8;
const DUST_ARM_SIZE_KPC = 0.28;
const DUST_DISC_SIZE_KPC = 0.45;
// Colours (raw hex) and brightness per point (also the cards' colour key)
export const GALAXY_COLORS = {
    thin: [0xffe7c4, 0.1], thick: [0xffd9a8, 0.06], bulge: [0xffd08a, 0.06], bar: [0xffd49a, 0.05],
    arms: [0xbcd2ff, 0.05], clumps: [0xd4e2ff, 0.07], hii: [0xff6f9c, 0.18],
};
const SIZE_PX = { thin: 1.6, arms: 1.8, clumps: 2.2, hii: 2.6 };
const DUST_ALPHA = { arm: 0.28, disc: 0.12 };
// Seen edge-on, the light crosses far more dust: each sprite's opacity
// drops to this share so the lane stays dark without hiding the bulge
const DUST_EDGE_ON = 0.3;
// Dust sprites larger than this (px) fade out: they'd fill the screen
// when the camera is inside the disc
const DUST_MAX_PX = [24, 72];
// The measured masers (Reid et al. 2019 Table 1): real positions, drawn as
// rings, each with a faint line along the sightline over its distance's
// 1-sigma range. With a card open, the other arms' masers dim to this.
export const MASER_COLOR = 0x5eead4;
const MASER_SIZE_PX = 8;
const MASER_RANGE_OPACITY = 0.35;
const MASER_DIMMED = 0.25;
// Real, so shown before the model is (camera distance from the Sun, ly)
const MASER_FADE_IN_LY = [1000, 3000];  // (built at BUILD_LY)
// Flying to one: this far from it, or this share of its distance if more
const MASER_VIEW_MIN_LY = 4000;
const MASER_VIEW_SHARE = 0.4;

const starVertexShader = `
    attribute vec3 color;
    attribute float size;
    uniform float uPixelRatio;
    varying vec3 vColor;
    void main() {
        vColor = color;
        gl_PointSize = size * uPixelRatio;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
const starFragmentShader = `
    uniform float uFade;
    varying vec3 vColor;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float a = 1.0 - smoothstep(0.3, 1.0, r);
        if (a <= 0.0) discard;
        gl_FragColor = vec4(vColor * uFade, a);
    }
`;
// Sprites sized in the world: size (kpc) * the matrix's ly per kpc,
// projected with the camera's focal length (uFocalPx: px per unit at
// distance 1). The Galactic pole in view space is mat3(modelViewMatrix)
// of +z (the matrix is a rotation and a uniform scale).
const dustVertexShader = `
    attribute float size;
    attribute float alpha;
    uniform float uFocalPx;
    uniform vec2 uMaxPx;
    uniform float uEdgeOn;
    varying float vAlpha;
    void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float px = size * ${LY_PER_KPC.toFixed(3)} * uFocalPx / max(-mv.z, 1e-3);
        vec3 pole = normalize(mat3(modelViewMatrix) * vec3(0.0, 0.0, 1.0));
        float faceOn = abs(dot(normalize(mv.xyz), pole));
        vAlpha = alpha * mix(uEdgeOn, 1.0, faceOn) * (1.0 - smoothstep(uMaxPx.x, uMaxPx.y, px));
        gl_PointSize = min(px, uMaxPx.y);
        gl_Position = projectionMatrix * mv;
    }
`;
const dustFragmentShader = `
    uniform float uFade;
    varying float vAlpha;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float a = (1.0 - smoothstep(0.0, 1.0, r)) * vAlpha * uFade;
        if (a < 0.002) discard;
        gl_FragColor = vec4(0.0, 0.0, 0.0, a);
    }
`;

// Masers: group = which card they belong to (index into the cards list,
// -1 none); uHighlight picks one card's (-1: all bright)
const maserVertexShader = `
    attribute float group;
    uniform float uPixelRatio;
    uniform float uHighlight;
    uniform float uDimmed;
    varying float vBright;
    void main() {
        vBright = uHighlight < 0.0 || abs(group - uHighlight) < 0.5 ? 1.0 : uDimmed;
        gl_PointSize = ${MASER_SIZE_PX.toFixed(1)} * uPixelRatio;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
const maserFragmentShader = `
    uniform vec3 uColor;
    uniform float uFade;
    varying float vBright;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float ring = smoothstep(0.45, 0.6, r) * (1.0 - smoothstep(0.85, 1.0, r));
        float a = ring * uFade * vBright;
        if (a < 0.01) discard;
        gl_FragColor = vec4(uColor, a);
    }
`;
const maserLineVertexShader = `
    attribute float group;
    uniform float uHighlight;
    uniform float uDimmed;
    varying float vBright;
    void main() {
        vBright = uHighlight < 0.0 || abs(group - uHighlight) < 0.5 ? 1.0 : uDimmed;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
const maserLineFragmentShader = `
    uniform vec3 uColor;
    uniform float uOpacity;
    varying float vBright;
    void main() {
        gl_FragColor = vec4(uColor, uOpacity * vBright);
    }
`;

const smoothstep = THREE.MathUtils.smoothstep;

// Arms prepared for sampling by length: cumulative length (kpc) per point
function prepareArms(arms) {
    return arms.map((arm) => {
        const xy = arm.xy_kpc;
        const n = xy.length / 2;
        const cum = new Float64Array(n);
        for (let i = 1; i < n; i++) {
            cum[i] = cum[i - 1] + Math.hypot(xy[2 * i] - xy[2 * i - 2], xy[2 * i + 1] - xy[2 * i - 1]);
        }
        return { ...arm, n, cum, length: cum[n - 1] };
    });
}

// Writes the point at distance s along an arm into out: x, y, the unit
// normal (nx, ny: pointing towards the centre) and the width (kpc)
function armPoint(arm, s, out) {
    const { cum, n } = arm;
    const xy = arm.xy_kpc;
    let lo = 0, hi = n - 1;
    while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (cum[mid] <= s) lo = mid; else hi = mid;
    }
    const seg = cum[hi] - cum[lo] || 1;
    const t = (s - cum[lo]) / seg;
    const x0 = xy[2 * lo], y0 = xy[2 * lo + 1], x1 = xy[2 * hi], y1 = xy[2 * hi + 1];
    out.x = x0 + (x1 - x0) * t;
    out.y = y0 + (y1 - y0) * t;
    let nx = -(y1 - y0), ny = x1 - x0;
    const len = Math.hypot(nx, ny) || 1;
    nx /= len; ny /= len;
    if (nx * out.x + ny * out.y > 0) { nx = -nx; ny = -ny; }
    out.nx = nx; out.ny = ny;
    out.w = arm.width_kpc[lo] + (arm.width_kpc[hi] - arm.width_kpc[lo]) * t;
    out.endFade = smoothstep(s, 0, ARM_END_FADE * arm.length) * smoothstep(arm.length - s, 0, ARM_END_FADE * arm.length);
}

// The galaxy's points. data: galaxy.json; lite: fewer points (phones)
function scatter(data, lite) {
    const rand = random(2019);
    const gauss = () => {
        const u = Math.max(rand(), 1e-12);
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
    };
    const laplace = (h) => (rand() < 0.5 ? -1 : 1) * -h * Math.log(Math.max(rand(), 1e-12));
    const count = (k) => Math.round(COUNTS[k] * (lite ? LITE_FACTOR : 1));

    const stars = { pos: [], col: [], size: [] };
    const color = new THREE.Color();
    // Fewer points each brighter, for the same glow (H II knots keep
    // their points; there are just fewer knots)
    const boost = lite ? 1 / LITE_FACTOR : 1;
    const addStar = (x, y, z, kind, sizeKind) => {
        const hex = GALAXY_COLORS[kind][0];
        const bright = GALAXY_COLORS[kind][1] * (kind === 'hii' ? 1 : boost);
        color.setHex(hex, THREE.LinearSRGBColorSpace);
        stars.pos.push(x, y, z);
        stars.col.push(color.r * bright, color.g * bright, color.b * bright);
        stars.size.push(SIZE_PX[sizeKind] ?? SIZE_PX.thin);
    };

    // Old disc: exponential in R (surface density R e^(-R/h): a gamma(2)
    // radius) and in |z|
    const disc = (n, lengthKpc, heightKpc, kind) => {
        for (let i = 0; i < n; i++) {
            const R = -lengthKpc * Math.log(Math.max(rand() * rand(), 1e-12));
            if (R > DISC_MAX_KPC) { i--; continue; }
            const phi = 2 * Math.PI * rand();
            addStar(R * Math.cos(phi), R * Math.sin(phi), laplace(heightKpc), kind, 'thin');
        }
    };
    const d = data.disc;
    disc(count('thin'), d.thin_scale_length_kpc, d.thin_scale_height_pc / 1000, 'thin');
    disc(count('thick'), d.thick_scale_length_kpc, d.thick_scale_height_pc / 1000, 'thick');

    // Bar frame: a towards the near end (azimuth = the bar angle from the
    // Sun's direction, towards rotation), b across it in the plane
    const bar = data.bar;
    const ang = THREE.MathUtils.degToRad(bar.angle_deg);
    const ax = -Math.cos(ang), ay = Math.sin(ang);
    const bx = -ay, by = ax;
    const [ra, rb, rc] = bar.bulge_axis_ratio.map(v => v / bar.bulge_axis_ratio[0] * BULGE_SCALE_KPC);
    for (let i = 0, n = count('bulge'); i < n; i++) {
        // Exponential in ellipsoidal radius: r^2 e^(-r) is a gamma(3)
        const s = -Math.log(Math.max(rand() * rand() * rand(), 1e-12));
        const z0 = 2 * rand() - 1, phi = 2 * Math.PI * rand(), q = Math.sqrt(1 - z0 * z0);
        const u = s * q * Math.cos(phi) * ra, v = s * q * Math.sin(phi) * rb;
        addStar(u * ax + v * bx, u * ay + v * by, s * z0 * rc, 'bulge', 'thin');
    }
    const half = bar.half_length_kpc;
    const hThin = bar.long_bar_scale_height_pc.thin / 1000, hSuper = bar.long_bar_scale_height_pc.super_thin / 1000;
    for (let i = 0, n = count('bar'); i < n; i++) {
        const u = (2 * rand() - 1) * half;
        const end = Math.abs(u) / half;
        if (rand() > 1 - smoothstep(end, 0.8, 1)) { i--; continue; }
        const v = gauss() * BAR_WIDTH_KPC * (1 - 0.5 * end);
        // The super-thin part sits towards the ends
        const z = laplace(rand() < 0.4 * end ? hSuper : hThin);
        addStar(u * ax + v * bx, u * ay + v * by, z, 'bar', 'thin');
    }

    // Arms
    const arms = prepareArms(data.arms);
    const sz = data.arm_sigma_z;
    const sigmaZ = (R) => (sz.inner_pc + sz.pc_per_kpc * Math.max(R - sz.from_kpc, 0)) / 1000;
    const weights = arms.map(a => a.length * ARM_KIND_WEIGHT[a.kind]);
    const total = weights.reduce((s, w) => s + w, 0);
    const pickArm = (majorOnly) => {
        for (;;) {
            let r = rand() * total;
            let i = 0;
            while (r > weights[i] && i < arms.length - 1) r -= weights[i++];
            if (!majorOnly || arms[i].kind === 'major') return arms[i];
        }
    };
    const p = {};
    // A point on an arm (spread across it by its width), accepted with the
    // ends' and the outer disc's fade; null if rejected
    const onArm = (arm, spread = 1) => {
        armPoint(arm, rand() * arm.length, p);
        const R = Math.hypot(p.x, p.y);
        const keep = p.endFade * Math.exp(-Math.max(R - ARM_FADE_FROM_KPC, 0) / ARM_FADE_KPC);
        if (rand() > keep) return null;
        const off = gauss() * p.w * spread;
        return { x: p.x + p.nx * off, y: p.y + p.ny * off, z: gauss() * sigmaZ(R), R, nx: p.nx, ny: p.ny, w: p.w };
    };
    const clumps = [];
    while (clumps.length < CLUMP_COUNT) {
        const c = onArm(pickArm(false));
        if (c) clumps.push(c);
    }
    for (let i = 0, n = count('arms'); i < n; i++) {
        if (rand() < CLUMP_SHARE) {
            const c = clumps[Math.floor(rand() * clumps.length)];
            addStar(c.x + gauss() * CLUMP_KPC, c.y + gauss() * CLUMP_KPC, c.z + gauss() * CLUMP_KPC * 0.5, 'clumps', 'clumps');
            continue;
        }
        const a = onArm(pickArm(false));
        if (!a) { i--; continue; }
        addStar(a.x, a.y, a.z, 'arms', 'arms');
    }
    // H II regions: knots on the major arms, near their middle
    for (let i = 0, n = count('hii'); i < n; i++) {
        const c = onArm(pickArm(true), 0.5);
        if (!c) { i--; continue; }
        for (let k = 0; k < HII_POINTS; k++) {
            addStar(c.x + gauss() * HII_KPC, c.y + gauss() * HII_KPC, c.z + gauss() * HII_KPC * 0.5, 'hii', 'hii');
        }
    }

    // Dust (Drimmel & Spergel 2001 disc: exp(-R/h) sech^2(z/h_z), the
    // height flaring past flare_start, a hole inside half the Sun's radius)
    const dd = data.dust_disc;
    const r0 = Math.hypot(data.sun_kpc[0], data.sun_kpc[1]);
    const dustHeight = (R) => (dd.base_scale_height_pc + dd.flare_pc_per_kpc * Math.max(R - dd.flare_start_kpc, 0)) / 1000;
    // sech^2(z/h) has a standard deviation of ~0.9 h
    const dustZ = (R) => gauss() * 0.9 * dustHeight(R);
    const dust = { pos: [], size: [], alpha: [] };
    for (let i = 0, n = count('dust'); i < n; i++) {
        if (rand() < DUST_ARM_SHARE) {
            const arm = pickArm(false);
            armPoint(arm, rand() * arm.length, p);
            const R = Math.hypot(p.x, p.y);
            if (rand() > p.endFade * Math.exp(-Math.max(R - ARM_FADE_FROM_KPC, 0) / ARM_FADE_KPC)) { i--; continue; }
            const off = (DUST_OFFSET + gauss() * DUST_SPREAD) * p.w;
            dust.pos.push(p.x + p.nx * off, p.y + p.ny * off, dustZ(R));
            dust.size.push(DUST_ARM_SIZE_KPC * (0.6 + 0.8 * rand()));
            dust.alpha.push(Math.min(DUST_ALPHA.arm * Math.sqrt(boost), 0.9));
            continue;
        }
        const R = -dd.scale_length_kpc * Math.log(Math.max(rand() * rand(), 1e-12));
        const x = R / r0;
        const hole = x < 0.5 ? Math.exp(-((x - 0.5) ** 2) / 0.25 ** 2) : 1;
        if (R > DISC_MAX_KPC || rand() > hole) { i--; continue; }
        const phi = 2 * Math.PI * rand();
        dust.pos.push(R * Math.cos(phi), R * Math.sin(phi), dustZ(R));
        dust.size.push(DUST_DISC_SIZE_KPC * (0.6 + 0.8 * rand()));
        dust.alpha.push(Math.min(DUST_ALPHA.disc * Math.sqrt(boost), 0.9));
    }
    return { stars, dust, arms };
}

// data.to_scene as a Matrix4 (kpc -> ly)
function sceneMatrix(toScene) {
    const m = toScene.matrix, o = toScene.offset_ly;
    return new THREE.Matrix4().set(
        m[0][0], m[0][1], m[0][2], o[0],
        m[1][0], m[1][1], m[1][2], o[1],
        m[2][0], m[2][1], m[2][2], o[2],
        0, 0, 0, 1,
    );
}

// The arms with cards (galaxy.json cards.arms), by name, with what they're called
export const ARM_LABELS = {
    'Norma-Outer': 'Norma–Outer Arm',
    'Scutum-Centaurus-OSC': 'Scutum–Centaurus Arm',
    'Sagittarius-Carina': 'Sagittarius–Carina Arm',
    'Perseus': 'Perseus Arm',
    'Local': 'Local (Orion) Arm',
};
export const CENTRE_LABEL = 'Galactic Centre (Sgr A*)';

// Search entries: id is 'milky_way', 'centre' or an arm name
export const GALAXY_SEARCH = [
    { id: 'milky_way', label: 'Milky Way', sublabel: 'Our galaxy (model)', terms: ['galaxy', 'our galaxy', 'the galaxy'] },
    { id: 'centre', label: 'Galactic Centre', sublabel: 'Sagittarius A*, a supermassive black hole',
        terms: ['galactic center', 'sgr a*', 'sgr a', 'sagittarius a*', 'sagittarius a', 'black hole', 'centre of the galaxy'] },
    { id: 'Local', label: ARM_LABELS.Local, sublabel: 'The Sun\'s arm', terms: ['orion arm', 'orion spur', 'local arm', 'orion-cygnus arm'] },
    { id: 'Perseus', label: ARM_LABELS.Perseus, sublabel: 'Spiral arm', terms: ['perseus arm'] },
    { id: 'Sagittarius-Carina', label: ARM_LABELS['Sagittarius-Carina'], sublabel: 'Spiral arm', terms: ['sagittarius arm', 'carina arm'] },
    { id: 'Scutum-Centaurus-OSC', label: ARM_LABELS['Scutum-Centaurus-OSC'], sublabel: 'Spiral arm',
        terms: ['scutum arm', 'centaurus arm', 'scutum-crux arm', 'outer scutum-centaurus arm', 'osc arm'] },
    { id: 'Norma-Outer', label: ARM_LABELS['Norma-Outer'], sublabel: 'Spiral arm', terms: ['norma arm', 'outer arm', 'cygnus arm'] },
];

// Camera views (ly from the Sun): the whole galaxy, its centre, or an arm,
// seen from above the disc, tilted towards the Sun's side.
// {position, target, minDistance} as arrays, or null
const VIEWS = { milky_way: [140000, 35], centre: [30000, 40], arm: [45000, 30] };
export function galaxyPose(data, id) {
    const m = data.to_scene.matrix;
    const col = (j) => new THREE.Vector3(m[0][j], m[1][j], m[2][j]).normalize();
    const pole = col(2);
    const gc = new THREE.Vector3(...data.to_scene.offset_ly);
    const toLy = sceneMatrix(data.to_scene);
    let target = gc;
    let out = col(0).negate();  // from the centre towards the Sun
    let view = VIEWS[id];
    if (!view) {
        const arm = data.arms.find(a => a.name === id);
        if (!arm || arm.label < 0) return null;
        target = new THREE.Vector3(arm.xy_kpc[2 * arm.label], arm.xy_kpc[2 * arm.label + 1], 0).applyMatrix4(toLy);
        out = target.clone().sub(gc).projectOnPlane(pole).normalize();
        view = VIEWS.arm;
    }
    const [distance, tiltDeg] = view;
    const tilt = THREE.MathUtils.degToRad(tiltDeg);
    const dir = pole.clone().multiplyScalar(Math.cos(tilt)).addScaledVector(out, Math.sin(tilt));
    return { position: target.clone().addScaledVector(dir, distance).toArray(), target: target.toArray(), minDistance: 100 };
}

// Cards a maser can belong to, in the order of its `group` attribute
const CARD_IDS = ['centre', ...Object.keys(ARM_LABELS)];

// Maser i of galaxy.json `masers`, for its card, tooltip and search:
// {index, name (what it's called), gname (its G-number), alias, note,
//  card, armName, position (ly array), distance, errorPct, range [near, far]
//  (ly), plx [mas, err], rGc (ly), constellation, motion (see
//  build_galaxy.py), refs (citations), label (one line)}
export function maserInfo(m, i) {
    const name = m.title[i] || m.alias[i] || m.name[i];
    const armName = m.card[i] === 'centre' ? 'Galactic Centre' : ARM_LABELS[m.card[i]] ?? m.arm[i] ?? 'arm unclear';
    return {
        index: i,
        name,
        gname: m.name[i],
        alias: m.alias[i],
        note: m.note[i],
        card: m.card[i],
        armName,
        position: m.xyz_ly.slice(3 * i, 3 * i + 3),
        distance: m.distance_ly[i],
        errorPct: m.error_pct[i],
        range: m.range_ly[i],
        plx: m.plx[i],
        rGc: m.r_gc_ly[i],
        constellation: m.constellation[i],
        motion: m.motion[i],
        refs: m.refs[i].map(r => m.ref_list[r]),
        label: `${name}${name !== m.name[i] ? ` (${m.name[i]})` : ''} · maser, ${m.distance_ly[i].toLocaleString()} ly`
            + ` ± ${m.error_pct[i]}% · ${armName}`,
    };
}

// Camera view of maser i: looking at it from above the disc, on the Sun's
// side, far enough out to see its neighbourhood. {position, target, minDistance}
export function maserPose(data, i) {
    const m = data.to_scene.matrix;
    const pole = new THREE.Vector3(m[0][2], m[1][2], m[2][2]).normalize();
    const target = new THREE.Vector3().fromArray(data.masers.xyz_ly, 3 * i);
    const toSun = target.clone().negate().projectOnPlane(pole).normalize();
    const distance = Math.max(MASER_VIEW_MIN_LY, target.length() * MASER_VIEW_SHARE);
    const dir = pole.clone().multiplyScalar(0.6).addScaledVector(toSun, 0.8).normalize();
    return { position: target.clone().addScaledVector(dir, distance).toArray(), target: target.toArray(), minDistance: 10 };
}

// The measured masers: rings + distance ranges, in the scene frame (ly).
// Returns {objects, geometries, materials, info: maser(i), pick, setHighlight}
function buildMasers(m, pixelRatio) {
    const n = m.name.length;
    const groupOf = m.card.map(c => CARD_IDS.indexOf(c));
    const color = new THREE.Color().setHex(MASER_COLOR, THREE.LinearSRGBColorSpace);
    const highlight = { value: -1 };
    const dimmed = { value: MASER_DIMMED };

    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(m.xyz_ly, 3));
    g.setAttribute('group', new THREE.Float32BufferAttribute(groupOf, 1));
    const ringMaterial = new THREE.ShaderMaterial({
        uniforms: { uPixelRatio: { value: pixelRatio }, uColor: { value: color }, uFade: { value: 0 }, uHighlight: highlight, uDimmed: dimmed },
        vertexShader: maserVertexShader,
        fragmentShader: maserFragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
    });
    const rings = new THREE.Points(g, ringMaterial);
    // After the model's stars and dust, so the dust never hides them
    rings.renderOrder = -1;
    rings.frustumCulled = false;

    const linePos = new Float32Array(n * 6);
    const lineGroup = new Float32Array(n * 2);
    for (let i = 0; i < n; i++) {
        const [near, far] = m.range_ly[i];
        for (let k = 0; k < 3; k++) {
            linePos[6 * i + k] = m.unit[3 * i + k] * near;
            linePos[6 * i + 3 + k] = m.unit[3 * i + k] * far;
        }
        lineGroup[2 * i] = lineGroup[2 * i + 1] = groupOf[i];
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    lg.setAttribute('group', new THREE.BufferAttribute(lineGroup, 1));
    const lineMaterial = new THREE.ShaderMaterial({
        uniforms: { uColor: { value: color }, uOpacity: { value: 0 }, uHighlight: highlight, uDimmed: dimmed },
        vertexShader: maserLineVertexShader,
        fragmentShader: maserLineFragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
    });
    const lines = new THREE.LineSegments(lg, lineMaterial);
    lines.renderOrder = -1;
    lines.frustumCulled = false;

    const projected = new THREE.Vector3();
    return {
        objects: [lines, rings],
        geometries: [g, lg],
        materials: [ringMaterial, lineMaterial],
        setFade: (f) => {
            ringMaterial.uniforms.uFade.value = f;
            lineMaterial.uniforms.uOpacity.value = f * MASER_RANGE_OPACITY;
        },
        // id: a card ('centre' or an arm name) whose masers stay bright, or null
        setHighlight: (id) => { highlight.value = id ? CARD_IDS.indexOf(id) : -1; },
        info: (i) => maserInfo(m, i),
        // Index of the maser drawn nearest (x, y) px within radiusPx, or null
        pick: (camera, width, height, x, y, radiusPx) => {
            let best = null;
            let bestD = radiusPx;
            for (let i = 0; i < n; i++) {
                projected.fromArray(m.xyz_ly, 3 * i).project(camera);
                if (projected.z > 1 || projected.z < -1) continue;
                const d = Math.hypot((projected.x + 1) / 2 * width - x, (1 - projected.y) / 2 * height - y);
                if (d < bestD) {
                    bestD = d;
                    best = i;
                }
            }
            return best;
        },
    };
}

// load: () => Promise of galaxy.json (fetched on first need).
// Returns update(cameraPosition ly, viewportHeightPx, fovDeg),
// fade(), labels() [{id, name, position (ly)}], setVisible(on),
// setMasersVisible(on), highlightMasers(cardId or null),
// pickMaser(camera, width, height, x, y, radiusPx) -> index | null,
// maser(index) -> maserInfo, maserFade() (0..1: they fade in sooner than
// the model), dispose()
export function buildGalaxy(scene, pixelRatio, load, { lite = false } = {}) {
    const group = new THREE.Group();
    group.matrixAutoUpdate = false;
    scene.add(group);
    // The masers are placed in the scene frame directly (ly)
    const maserGroup = new THREE.Group();
    scene.add(maserGroup);
    let masers = null;
    let masersWanted = true;
    let highlighted = null;
    const starMaterial = new THREE.ShaderMaterial({
        uniforms: { uPixelRatio: { value: pixelRatio }, uFade: { value: 0 } },
        vertexShader: starVertexShader,
        fragmentShader: starFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
    const dustMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uFocalPx: { value: 1 },
            uMaxPx: { value: new THREE.Vector2(...DUST_MAX_PX).multiplyScalar(pixelRatio) },
            uEdgeOn: { value: DUST_EDGE_ON },
            uFade: { value: 0 },
        },
        vertexShader: dustVertexShader,
        fragmentShader: dustFragmentShader,
        transparent: true,
        depthWrite: false,
    });
    const geometries = [];
    let labels = [];
    let state = 'idle';  // idle -> loading -> ready | failed
    let wanted = true;
    let fade = 0;

    const build = (data) => {
        const { stars, dust, arms } = scatter(data, lite);
        group.matrix.copy(sceneMatrix(data.to_scene));
        group.matrixWorldNeedsUpdate = true;

        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(stars.pos, 3));
        g.setAttribute('color', new THREE.Float32BufferAttribute(stars.col, 3));
        g.setAttribute('size', new THREE.Float32BufferAttribute(stars.size, 1));
        const points = new THREE.Points(g, starMaterial);
        // Before the catalogue's stars and the Sun (transparent objects
        // draw in renderOrder), so the dust never covers them
        points.renderOrder = -3;
        points.frustumCulled = false;

        const dg = new THREE.BufferGeometry();
        dg.setAttribute('position', new THREE.Float32BufferAttribute(dust.pos, 3));
        dg.setAttribute('size', new THREE.Float32BufferAttribute(dust.size, 1));
        dg.setAttribute('alpha', new THREE.Float32BufferAttribute(dust.alpha, 1));
        const dustPoints = new THREE.Points(dg, dustMaterial);
        dustPoints.renderOrder = -2;
        dustPoints.frustumCulled = false;

        group.add(points, dustPoints);
        geometries.push(g, dg);

        const toLy = (x, y, z) => new THREE.Vector3(x, y, z).applyMatrix4(group.matrix);
        labels = [{ id: 'centre', name: CENTRE_LABEL, position: toLy(0, 0, 0) }];
        for (const arm of arms) {
            if (arm.label < 0 || !ARM_LABELS[arm.name]) continue;
            labels.push({ id: arm.name, name: ARM_LABELS[arm.name], position: toLy(arm.xy_kpc[2 * arm.label], arm.xy_kpc[2 * arm.label + 1], 0) });
        }
        if (data.masers) {
            masers = buildMasers(data.masers, pixelRatio);
            maserGroup.add(...masers.objects);
            masers.setHighlight(highlighted);
        }
        state = 'ready';
    };
    let maserFade = 0;
    const masersShown = () => masers !== null && wanted && masersWanted && maserFade > 0;

    return {
        update: (cameraPosition, viewportHeightPx, fovDeg) => {
            const ly = cameraPosition.length();
            if (state === 'idle' && wanted && ly > BUILD_LY) {
                state = 'loading';
                load().then(build).catch((error) => {
                    console.error('Error loading the galaxy model:', error);
                    state = 'failed';
                });
            }
            fade = state === 'ready' ? smoothstep(ly, ...FADE_IN_LY) : 0;
            group.visible = wanted && fade > 0;
            starMaterial.uniforms.uFade.value = fade;
            dustMaterial.uniforms.uFade.value = fade;
            dustMaterial.uniforms.uFocalPx.value = viewportHeightPx * pixelRatio / (2 * Math.tan(THREE.MathUtils.degToRad(fovDeg) / 2));
            maserFade = state === 'ready' ? smoothstep(ly, ...MASER_FADE_IN_LY) : 0;
            maserGroup.visible = masersShown();
            masers?.setFade(maserFade);
        },
        // How visible it is now (0..1), for its labels
        fade: () => (wanted ? fade : 0),
        labels: () => labels,
        setVisible: (on) => { wanted = on; },
        setMasersVisible: (on) => { masersWanted = on; },
        highlightMasers: (id) => {
            highlighted = id;
            masers?.setHighlight(id);
        },
        // Picked only once they're clearly visible
        pickMaser: (camera, width, height, x, y, radiusPx) => (
            masersShown() && maserFade > 0.3 ? masers.pick(camera, width, height, x, y, radiusPx) : null
        ),
        maser: (i) => (masers ? masers.info(i) : null),
        maserFade: () => (masersShown() ? maserFade : 0),
        dispose: () => {
            scene.remove(group, maserGroup);
            geometries.forEach(g => g.dispose());
            starMaterial.dispose();
            dustMaterial.dispose();
            masers?.geometries.forEach(g => g.dispose());
            masers?.materials.forEach(m => m.dispose());
        },
    };
}
