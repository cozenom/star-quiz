// Stellar black holes (black_holes.json, from
// Star_Data/scripts/build_black_holes.py, which checks each orbit against
// the star's measured radial velocities, conjunction or mass function),
// each with a star going round it on its published orbit, moving with the
// clock. Dormant (kind 'dormant': Gaia BH1-3, found from the star's wobble
// in Gaia's measurements) or fed (kind 'fed', X-ray binaries: Cygnus X-1,
// V404 Cygni: the star's gas spiralling into a disc round the spinning
// black hole). Each:
//   - from afar: the star, as a star (the star layer, at the system's
//     place), the system named after its black hole
//   - close up: its own scale layer (AU, origin at the centre of mass of
//     the system nearest the camera): the star on its orbit (its sprite, and
//     its real-size disc once that's big enough), the black hole swinging
//     round a smaller loop of its own (they share the centre of mass), a
//     marker on the black hole while its shadow is too small to see, and
//     the star's orbit round the black hole in the star's colour, moving
//     with the hole
// The shadow and the bending of light are the lens pass's (utils/
// blackHoleLens): this layer is drawn before it, so the star's light is bent
// too. The pass treats what it bends as far off, which holds wherever the
// bending shows: the star is AU away, the camera then within a few
// thousand km of the hole. A fed system's hole is traced with its spin, and
// its disc is the pass's too (a thin disc in its equatorial plane, the spin
// along the orbit's axis), at the build's temperatures; its star here is
// the Roche surface it fills or nearly fills (its shape in the black hole's
// pull, darker where its surface gravity is weaker: T ~ g^beta), and a
// line marks the radio jet's direction.
// Each system stays where Gaia measured it (its drift across the sky left
// out, as the stars'), seen from Earth at the clock's date.
//
// The view's camera is in ly from the Sun (JS doubles): ~2 km steps at
// 1,500-2,000 ly (BH1, BH3), ~4 km at 3,800 (BH2), too coarse this close to
// a hole. Riding along with one, the camera's place from it is kept exactly
// instead (Universe3D's bhView, update's view), and this layer's camera,
// the lens pass and the close-up's names take that.

import * as THREE from 'three';
import { B_CRIT, deflection, discLook, discTable } from './blackHoleLens';
import { createLayer } from './layers3d';
import { AU_PER_PC, eccentricAnomaly } from './galacticCentre3d';
import { makeStarDiscMesh } from './starDisc';
import { AU_PER_LY, KM_PER_AU } from './universe3d';

// Key colour (raw hex, ours; the legend's swatch): the black hole's marker
export const BH_MARKER_COLOR = 0xc4b5fd;

// The close-up shows once the star's orbit is this many px across, fully
// by the second
const CLOSE_UP_PX = [10, 40];
// The far star fades by this many magnitudes as the close-up takes over
// (and the close-up's the other way)
const FADE_MAG = 30;
// The orbit line fades in as it grows from / to this (px across), and out
// as it grows past these multiples of the camera's distance from the hole
// (the camera inside it: it would cut across the whole view)
const ORBIT_PX = [6, 30];
const ORBIT_TOO_WIDE = [1.5, 3];
const ORBIT_OPACITY = 0.5;
const ORBIT_SELECTED_OPACITY = 0.8;
const ORBIT_POINTS = 720;
// The hole's marker (CSS px across), gone once its shadow is this many px
// in radius
const MARKER_PX = 11;
const MARKER_SHADOW_PX = [1, 3];
// The star's disc is drawn once it is this many px in radius
const DISC_MIN_PX = 0.5;
// Up close to the hole, where the lens pass bends the star's light round it
// (a far source's Einstein ring from this many px across to the second),
// the star's sprite shrinks to SPRITE_LENSED_PX with no halo, drawn over its
// disc: the halo stands for glare in the eye, which comes after the bending
// (the bloom pass's, from the sprite's spike), and bent with the star it
// made a ring many times too thick
const LENSED_RING_PX = [3, 30];
const SPRITE_LENSED_PX = 3;
// Near plane: this fraction of the distance to the nearest thing
const NEAR_FRACTION = 0.3;
// Names show within this distance (ly), once the camera is this far from
// the Sun (out among the stars; from home they'd be the only deep-sky names)
const LABEL_LY = 8000;
const NAMED_FROM_LY = 100;
// The lens pass's reach (rg; utils/blackHoleLens LENS_REACH_RG)
const LENS_REACH_RG = 3e6;
// Views (bhPose): the system's, this many times the star's farthest from
// the hole, this far above its orbit's plane (deg), on Earth's side;
// close to the hole, this many rg from it, in the orbit's plane, opposite
// where the star comes closest (so it passes right behind the hole then:
// its light bent into a ring); a fed one's this far above the disc (deg),
// on Earth's side, so its face shows, bent over the hole, the star this
// far off the view's centre (deg)
const VIEW_SCALE = 2.2;
const VIEW_ELEVATION_DEG = 50;
const HOLE_VIEW_RG = 50;
const FED_HOLE_ELEVATION_DEG = 12;
const FED_HOLE_STAR_OFF_DEG = 55;
// How close the camera may get (rg)
const MIN_RG = 20;
// The jet's line (ours: a key colour), each way from the hole this many
// times the separation, fading to nothing at its ends (a direction, not the
// jet's length: it runs tens of AU in radio); it shows from outside the
// system (the camera this many separations from the hole: within it, it
// would cut the view in two)
export const BH_JET_COLOR = 0x67e8f9;
const JET_LENGTH = 0.75;
const JET_FADE = [0.6, 1.2];
const JET_OPACITY = 0.45;
// The fed star's surface: limb darkening (as starDisc's, linear), and the
// mesh's resolution
const LIMB_DARKENING = 0.6;
const ROCHE_SEGMENTS = [96, 48];
// Green (um): the gravity darkening's brightness, as the eye's
const V_UM = 0.549;
const X_AXIS = new THREE.Vector3(1, 0, 0);
const Y_AXIS = new THREE.Vector3(0, 1, 0);

// The star's place from the black hole (AU, scene frame) at year t; out:
// Vector3
const qScratch = new THREE.Vector3();
export function bhSeparation(sys, t, out = new THREE.Vector3()) {
    const o = sys.orbit;
    const E = eccentricAnomaly(2 * Math.PI * (t - o.tp) / o.period_yr, o.e);
    const b = Math.sqrt(1 - o.e * o.e);
    return out.fromArray(o.p).multiplyScalar(o.a_au * (Math.cos(E) - o.e))
        .addScaledVector(qScratch.fromArray(o.q), o.a_au * b * Math.sin(E));
}
// The hole's and the star's places from the centre of mass (AU)
export const bhHoleAu = (sys, t, out = new THREE.Vector3()) => bhSeparation(sys, t, out).multiplyScalar(-sys.orbit.bh_share);
export const bhStarAu = (sys, t, out = new THREE.Vector3()) => bhSeparation(sys, t, out).multiplyScalar(sys.orbit.star_share);

// For a card, at year t: {separationAu, speedKmS (the star's against the
// hole), nextPeri (year)}
export function bhState(sys, t) {
    const o = sys.orbit;
    const r = bhSeparation(sys, t).length();
    const gm = 4 * Math.PI * Math.PI * (sys.black_hole.mass_msun + sys.star.mass_msun);  // AU^3 / yr^2
    const speed = Math.sqrt(Math.max(gm * (2 / r - 1 / o.a_au), 0)) * 4.740470464;
    const nextPeri = o.tp + Math.ceil((t - o.tp) / o.period_yr) * o.period_yr;
    return { separationAu: r, speedKmS: speed, nextPeri };
}

// The lens pass's bending of a ray leaving the camera r rg from the hole at
// angle theta from it (utils/blackHoleLens ALPHA_GLSL): Infinity if it
// falls in
function bending(theta, r) {
    const b = r * Math.sin(theta) / Math.sqrt(1 - 2 / r);
    if (b <= B_CRIT) return Infinity;
    const far = b > 2000 * B_CRIT ? 4 / b + 15 * Math.PI / (4 * b * b) : deflection(b);
    return far * 0.5 * (1 + Math.cos(theta));
}
// A far source's direct image (its side of the hole), as the lens pass
// draws it: a point at the source's distance from the camera, along the
// ray that the bending turns onto it. All in AU; out: Vector3
function directImage(camera, hole, source, rgAu, out) {
    const l = new THREE.Vector3().subVectors(hole, camera);
    const r = l.length() / rgAu;
    const s = new THREE.Vector3().subVectors(source, camera);
    const ds = s.length();
    if (r > LENS_REACH_RG || r < 3.5 || ds === 0) return out.copy(source);
    l.normalize();
    s.divideScalar(ds);
    const thetaS = Math.acos(THREE.MathUtils.clamp(l.dot(s), -1, 1));
    const side = s.clone().addScaledVector(l, -l.dot(s));
    if (side.lengthSq() < 1e-20) return out.copy(source);
    side.normalize();
    let lo = Math.asin(Math.min(B_CRIT * Math.sqrt(1 - 2 / r) / r, 1)) + 1e-9;
    let hi = Math.PI;
    for (let k = 0; k < 50; k++) {
        const mid = 0.5 * (lo + hi);
        if (mid - bending(mid, r) < thetaS) lo = mid;
        else hi = mid;
    }
    const theta = 0.5 * (lo + hi);
    return out.copy(l).multiplyScalar(Math.cos(theta)).addScaledVector(side, Math.sin(theta)).multiplyScalar(ds).add(camera);
}

// One line for hover: "Gaia BH1 · black hole of 9.6 Suns with a Sun-like
// star, 1,561 ly"
const firstLower = (s) => s.charAt(0).toLowerCase() + s.slice(1);
// "a Sun-like star", "an orange subgiant"
const withArticle = (s) => `${/^[aeiou]/i.test(s) ? 'an' : 'a'} ${firstLower(s)}`;
export function bhLabel(sys) {
    return `${sys.name} · black hole of ${Number(sys.black_hole.mass_msun.toPrecision(2))} Suns with ${withArticle(sys.star.type)}, ${Math.round(sys.distance_ly).toLocaleString()} ly`;
}

// Camera views (ly from the Sun), looking at the black hole at year t:
// 'system' (the star's whole orbit, from above it on Earth's side) or
// 'hole' (close to it). {position, target, minDistance}
export function bhPose(sys, view, t) {
    const centre = new THREE.Vector3(...sys.position_ly);
    const holeAu = bhHoleAu(sys, t);
    const target = centre.clone().addScaledVector(holeAu, 1 / AU_PER_LY);
    const p = new THREE.Vector3(...sys.orbit.p);
    const n = p.clone().cross(new THREE.Vector3(...sys.orbit.q)).normalize();
    const rgAu = sys.black_hole.rg_au;
    let from;
    let au;
    const toEarth = new THREE.Vector3(...sys.sky.away).negate();
    if (n.dot(toEarth) < 0) n.negate();
    if (view === 'hole') {
        from = p.clone().negate();
        if (sys.kind === 'fed') {
            // Above the disc (its axis on Earth's side is the view's up there:
            // Universe3D's hole frame), the star off to one side: the hole
            // against dark sky (behind it, the star would fill much of the
            // sky, as bright as the disc's outer parts)
            const s = bhSeparation(sys, t).normalize();
            const w = n.clone().cross(s);
            const e = THREE.MathUtils.degToRad(FED_HOLE_ELEVATION_DEG);
            const beta = Math.acos(-Math.cos(THREE.MathUtils.degToRad(FED_HOLE_STAR_OFF_DEG)) / Math.cos(e));
            from = s.multiplyScalar(Math.cos(beta)).addScaledVector(w, Math.sin(beta))
                .multiplyScalar(Math.cos(e)).addScaledVector(n, Math.sin(e));
        }
        au = HOLE_VIEW_RG * rgAu;
    } else {
        // Earth's direction laid in the orbit's plane, then tilted up
        const inPlane = toEarth.clone().addScaledVector(n, -toEarth.dot(n));
        if (inPlane.lengthSq() < 1e-6) inPlane.copy(p);
        inPlane.normalize();
        const e = THREE.MathUtils.degToRad(VIEW_ELEVATION_DEG);
        from = inPlane.multiplyScalar(Math.cos(e)).addScaledVector(n, Math.sin(e));
        au = VIEW_SCALE * sys.orbit.apoapsis_au;
    }
    return {
        position: target.clone().addScaledVector(from, au / AU_PER_LY).toArray(),
        target: target.toArray(),
        minDistance: MIN_RG * rgAu / AU_PER_LY,
    };
}

// Search entries (type 'bh', index: into data.systems; view: 'system' or
// 'hole'; id: unique)
const BH_TERMS = ['black hole', 'stellar black hole'];
const KIND_TERMS = {
    dormant: ['dormant black hole', 'nearest black hole', 'Gaia black hole'],
    fed: ['X-ray binary', 'accretion disc', 'accretion disk', 'spinning black hole', 'microquasar'],
};
export function bhSearchItems(data, normalize) {
    return data.systems.flatMap((sys, i) => [{
        type: 'bh',
        id: `${sys.id}`,
        index: i,
        view: 'system',
        label: sys.name,
        sublabel: `${sys.kind === 'fed' ? 'Fed black hole' : 'Black hole'} · ${Number(sys.black_hole.mass_msun.toPrecision(2))} Suns with ${withArticle(sys.star.type)}, ${Math.round(sys.distance_ly).toLocaleString()} ly`,
        terms: [...new Set([sys.name, ...sys.aka, ...BH_TERMS, ...KIND_TERMS[sys.kind] ?? []])].map(normalize),
        sortKey: -6,
    }, {
        type: 'bh',
        id: `${sys.id}-hole`,
        index: i,
        view: 'hole',
        label: `${sys.name} close up`,
        sublabel: sys.kind === 'fed' ? 'Right by the spinning black hole: its shadow, its disc and the light bent round it' : 'Right by the black hole: its shadow, the light bent round it',
        terms: [`${sys.name} close up`, `${sys.name} shadow`, `${sys.name} black hole`, ...(sys.kind === 'fed' ? [`${sys.name} disc`, `${sys.name} accretion disc`] : [])].map(normalize),
        sortKey: -5,
    }]);
}

// The Roche surface a fed system's star fills (or nearly): Kopal's
// potential about the star (separations; the black hole at x = 1, the
// orbit's axis z), q the black hole's mass over the star's (synchronous
// rotation, as the build's)
const rochePotential = (x, y, z, q) => 1 / Math.hypot(x, y, z) + q * (1 / Math.hypot(x - 1, y, z) - x) + (1 + q) / 2 * (x * x + y * y);
const planckV = (t) => 1 / Math.expm1(Math.min(14387.77 / (V_UM * t), 700));
// A unit-separation mesh of it (x towards the hole, z the orbit's axis),
// its normals from the potential's gradient, and each vertex's brightness
// (attribute shade): gravity darkening, T = teff (g / its mean)^beta, as the
// eye sees it (the blackbody at 549 nm)
function rocheGeometry({ q, potential, x_l1: xl1 }, beta, teff) {
    const geometry = new THREE.SphereGeometry(1, ...ROCHE_SEGMENTS);
    const pos = geometry.attributes.position;
    const n = pos.count;
    const normals = new Float32Array(n * 3);
    const g = new Float32Array(n);
    const weight = new Float32Array(n);
    const d = new THREE.Vector3();
    const step = xl1 / 400;
    const eps = 1e-6;
    for (let i = 0; i < n; i++) {
        d.fromBufferAttribute(pos, i).normalize();
        const pot = (r) => rochePotential(d.x * r, d.y * r, d.z * r, q);
        // Outward to where the potential falls to the surface's (or, filling
        // the lobe, stops falling: its edge), then bisect
        let lo = step, hi = step, prev = pot(step);
        let crossed = false;
        for (let r = 2 * step; r <= xl1 * 1.0005; r += step) {
            const p = pot(r);
            if (p < potential) { hi = r; crossed = true; break; }
            if (p > prev) break;
            prev = p;
            lo = hi = r;
        }
        if (crossed) {
            for (let k = 0; k < 40; k++) {
                const mid = 0.5 * (lo + hi);
                if (pot(mid) > potential) lo = mid; else hi = mid;
            }
        }
        const r = 0.5 * (lo + hi);
        const x = d.x * r, y = d.y * r, z = d.z * r;
        pos.setXYZ(i, x, y, z);
        // The gradient: outward normal (the potential falls outward), and g
        const gx = (rochePotential(x + eps, y, z, q) - rochePotential(x - eps, y, z, q)) / (2 * eps);
        const gy = (rochePotential(x, y + eps, z, q) - rochePotential(x, y - eps, z, q)) / (2 * eps);
        const gz = (rochePotential(x, y, z + eps, q) - rochePotential(x, y, z - eps, q)) / (2 * eps);
        const gl = Math.hypot(gx, gy, gz) || 1;
        normals.set([-gx / gl, -gy / gl, -gz / gl], 3 * i);
        g[i] = gl;
        // The sphere's vertices are even in latitude (about its y) and
        // longitude: area ~ r^2 cos(latitude)
        weight[i] = r * r * Math.sqrt(Math.max(1 - d.y * d.y, 0));
    }
    let gSum = 0, wSum = 0;
    for (let i = 0; i < n; i++) {
        gSum += g[i] * weight[i];
        wSum += weight[i];
    }
    const gMean = gSum / wSum;
    const shade = new Float32Array(n);
    // At L1 (filling the lobe) g is 0: the coolest point, not black
    for (let i = 0; i < n; i++) shade[i] = planckV(teff * Math.max(g[i] / gMean, 0.05) ** beta) / planckV(teff);
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.setAttribute('shade', new THREE.BufferAttribute(shade, 1));
    geometry.computeBoundingSphere();
    return geometry;
}
const rocheVertexShader = /* glsl */ `
    attribute float shade;
    varying vec3 vNormal;
    varying vec3 vView;
    varying float vShade;
    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mvPosition.xyz);
        vShade = shade;
        gl_Position = projectionMatrix * mvPosition;
    }
`;
// As starDisc's, its brightness times the vertex's
const rocheFragmentShader = /* glsl */ `
    uniform vec3 uColor;
    varying vec3 vNormal;
    varying vec3 vView;
    varying float vShade;
    void main() {
        float mu = clamp(dot(normalize(vNormal), normalize(vView)), 0.0, 1.0);
        vec3 color = pow(uColor, vec3(2.2)) * vShade * (1.0 - ${LIMB_DARKENING.toFixed(2)} * (1.0 - mu));
        gl_FragColor = vec4(color, 1.0);
    }
`;

const markerVertexShader = /* glsl */ `
    uniform float uSize;
    void main() {
        gl_PointSize = uSize;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
// A thin ring round a dark middle
const markerFragmentShader = /* glsl */ `
    uniform vec3 uColor;
    uniform float uFade;
    uniform float uSize;
    void main() {
        float d = length(gl_PointCoord - 0.5) * uSize;
        float outer = uSize * 0.45;
        float a = smoothstep(outer - 2.5, outer - 1.5, d) * (1.0 - smoothstep(outer - 0.5, outer + 0.5, d)) * uFade;
        if (a < 0.01) discard;
        gl_FragColor = vec4(uColor * a, a);
    }
`;

// The close-up's layer (AU), made with the view's others; its origin moves
// to the system nearest the camera
export function createBlackHoleLayer() {
    const origin = new THREE.Vector3();
    const layer = createLayer({ name: 'black holes', unit: 1 / AU_PER_LY, origin: () => origin, near: 1e-6, far: 100 });
    layer.visible = false;
    return { layer, origin };
}

// layer, origin: createBlackHoleLayer(); data: black_holes.json;
// makeStars(positions, colors, absMags): star Points in this layer (AU: its
// uUnitsPerPc set here; camera uniforms starCamera, set each frame:
// syncStarCamera); makeFarStars likewise for the star layer (ly), added to
// farScene. Both shaders take a uMagOffset (set here, each Points' own).
export function buildBlackHoles({ layer, origin }, data, pixelRatio, { makeStars, makeFarStars, farScene, starCamera, bvToColor }) {
    const systems = data.systems;
    const centres = systems.map(sys => new THREE.Vector3(...sys.position_ly));
    const colours = systems.map(sys => bvToColor(sys.star.b_v));

    // From afar: each star at its system's place
    const far = systems.map((sys, i) => {
        const points = makeFarStars(new Float32Array(sys.position_ly), new Float32Array(colours[i]), new Float32Array([sys.star.abs_mag]));
        points.material.uniforms.uMagOffset = { value: 0 };
        points.frustumCulled = false;
        farScene.add(points);
        return points;
    });

    // Close up: the active system's star (sprite and disc), its orbit line,
    // the hole's marker
    const starPositions = new Float32Array(3);
    const starPoints = makeStars(starPositions, new Float32Array(3), new Float32Array(1));
    const su = starPoints.material.uniforms;
    su.uUnitsPerPc.value = AU_PER_PC;
    su.uMagOffset = { value: FADE_MAG };
    su.uMinAlpha.value = 0;
    su.uGlowMax = { value: 1 };
    const spriteMaxPx = su.uMaxSize.value;
    starPoints.frustumCulled = false;
    layer.scene.add(starPoints);
    const disc = makeStarDiscMesh();
    disc.visible = false;
    layer.scene.add(disc);
    // Fed systems: the star's Roche surface (made when first shown), the
    // disc's temperatures for the lens pass (and its brightness against the
    // star's surface), the spin's (and the orbit's) axis
    const fed = systems.map((sys, i) => (sys.kind !== 'fed' ? null : {
        mesh: null,
        axis: new THREE.Vector3(...sys.orbit.normal),
        // The axis on Earth's side: the close-up's up (bhPose)
        up: new THREE.Vector3(...sys.orbit.normal).multiplyScalar(
            new THREE.Vector3(...sys.orbit.normal).dot(new THREE.Vector3(...sys.sky.away)) > 0 ? -1 : 1),
        disc: {
            ...discTable(sys.disc),
            rIn: sys.disc.r_in_rg,
            rOut: sys.disc.r_out_rg,
            rIsco: sys.black_hole.r_isco_rg,
            ...discLook(sys.star.teff_k, colours[i]),
        },
    }));
    const rocheMesh = (i) => {
        const f = fed[i];
        if (!f.mesh) {
            const sys = systems[i];
            const material = new THREE.ShaderMaterial({
                uniforms: { uColor: { value: new THREE.Color().fromArray(colours[i]) } },
                vertexShader: rocheVertexShader,
                fragmentShader: rocheFragmentShader,
            });
            f.mesh = new THREE.Mesh(rocheGeometry(sys.star.roche, sys.star.gravity_darkening, sys.star.teff_k), material);
            f.mesh.matrixAutoUpdate = false;
            f.mesh.frustumCulled = false;
            f.mesh.visible = false;
            layer.scene.add(f.mesh);
        }
        return f.mesh;
    };
    // The jet's line: both ways along the axis, placed by its matrix
    const jetGeometry = new THREE.BufferGeometry();
    jetGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1]), 3));
    const jetRgb = new THREE.Color().setHex(BH_JET_COLOR).toArray();
    jetGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array([
        ...jetRgb, 1, ...jetRgb, 0, ...jetRgb, 1, ...jetRgb, 0]), 4));
    const jet = new THREE.LineSegments(jetGeometry, new THREE.LineBasicMaterial({
        vertexColors: true, transparent: true, opacity: 0, depthWrite: false,
    }));
    jet.matrixAutoUpdate = false;
    jet.frustumCulled = false;
    jet.visible = false;
    layer.scene.add(jet);
    const jetE1 = new THREE.Vector3(), jetE2 = new THREE.Vector3();
    const rocheX = new THREE.Vector3(), rocheY = new THREE.Vector3(), scaleBy = new THREE.Vector3();
    const lensKerr = { spin: 0, axis: null, star: { at: new THREE.Vector3(), radiusAu: 0 }, disc: null };
    // Each system's orbit line, in its plane (x towards periastron), placed
    // on the hole by its matrix
    const orbitLines = systems.map((sys, i) => {
        const o = sys.orbit;
        const pts = new Float32Array(ORBIT_POINTS * 3);
        const b = Math.sqrt(1 - o.e * o.e);
        for (let k = 0; k < ORBIT_POINTS; k++) {
            const E = (k / ORBIT_POINTS) * 2 * Math.PI;
            pts[3 * k] = o.a_au * (Math.cos(E) - o.e);
            pts[3 * k + 1] = o.a_au * b * Math.sin(E);
        }
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(pts, 3));
        const color = new THREE.Color().setRGB(...colours[i], THREE.SRGBColorSpace);
        const line = new THREE.LineLoop(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false }));
        const p = new THREE.Vector3(...o.p);
        const q = new THREE.Vector3(...o.q);
        line.matrixAutoUpdate = false;
        line.matrix.makeBasis(p, q, p.clone().cross(q));
        line.frustumCulled = false;
        line.visible = false;
        layer.scene.add(line);
        return line;
    });
    const markerGeometry = new THREE.BufferGeometry();
    markerGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3));
    const markerMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uSize: { value: MARKER_PX * pixelRatio },
            uColor: { value: new THREE.Color().setHex(BH_MARKER_COLOR, THREE.LinearSRGBColorSpace) },
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
    layer.scene.add(marker);

    let active = -1;
    let closeUp = 0;
    let shadowPx = 0;
    let separation = 0;                   // AU, this frame
    const hole = new THREE.Vector3();     // AU from the active system's centre of mass, this frame
    const star = new THREE.Vector3();
    const cameraAu = new THREE.Vector3();
    let exact = false;                    // cameraAu from the view's exact place (update's view)
    const screenScratch = new THREE.Vector3();

    return {
        layer,
        systems,
        // The system the close-up is of (index; -1: none), and how much it
        // shows (0..1)
        active: () => active,
        closeUp: () => closeUp,
        // The active hole's shadow's radius on screen (CSS px)
        shadowPx: () => shadowPx,

        // camera: the master camera (ly); t: the clock's year; height: the
        // view's CSS px; opts: {visible, orbits (lines on), selected (index
        // or null), view (riding along with a hole: {index, at (the camera
        // from it, ly, exact)}, or null)}
        update(camera, t, height, opts) {
            let nearest = Infinity;
            let next = -1;
            centres.forEach((c, i) => {
                const d = c.distanceTo(camera.position);
                if (d < nearest) {
                    nearest = d;
                    next = i;
                }
            });
            const focal = height / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
            const sys = systems[next];
            origin.copy(centres[next]);
            const view = opts.view?.index === next ? opts.view : null;
            exact = Boolean(view);
            if (view) bhHoleAu(sys, t, cameraAu).addScaledVector(view.at, AU_PER_LY);
            else cameraAu.subVectors(camera.position, origin).multiplyScalar(AU_PER_LY);
            bhHoleAu(sys, t, hole);
            bhStarAu(sys, t, star);
            const toCentre = Math.max(cameraAu.length(), 1e-12);
            closeUp = opts.visible ? THREE.MathUtils.smoothstep(2 * sys.orbit.apoapsis_au * focal / toCentre, ...CLOSE_UP_PX) : 0;
            far.forEach((points, i) => {
                points.visible = opts.visible;
                points.material.uniforms.uMagOffset.value = i === next ? FADE_MAG * closeUp : 0;
            });
            layer.visible = closeUp > 0;
            if (!layer.visible) {
                active = -1;
                shadowPx = 0;
                exact = false;
                return;
            }
            if (next !== active) {
                active = next;
                starPoints.geometry.attributes.color.array.set(colours[active]);
                starPoints.geometry.attributes.color.needsUpdate = true;
                starPoints.geometry.attributes.absMag.array[0] = sys.star.abs_mag;
                starPoints.geometry.attributes.absMag.needsUpdate = true;
                disc.material.uniforms.uColor.value.fromArray(colours[active]);
                disc.scale.setScalar(sys.star.radius_au);
                orbitLines.forEach((line, i) => { line.visible = i === active; });
                fed.forEach((f, i) => { if (f?.mesh && i !== active) f.mesh.visible = false; });
            }
            star.toArray(starPositions);
            starPoints.geometry.attributes.position.needsUpdate = true;
            su.uMagOffset.value = FADE_MAG * (1 - closeUp);
            const toHole = Math.max(cameraAu.distanceTo(hole), 1e-12);
            const toStar = Math.max(cameraAu.distanceTo(star), 1e-12);
            separation = hole.distanceTo(star);
            const f = fed[active];
            // The star: its disc (a fed one's Roche surface), once a pixel or
            // so. starOut: its surface's farthest from its centre (AU)
            let starOut = sys.star.radius_au;
            let starPx;
            if (f) {
                const mesh = rocheMesh(active);
                const roche = sys.star.roche;
                starOut = roche.x_l1 * separation;
                starPx = roche.r_vol * separation * focal / toStar;
                // x towards the hole, z the orbit's axis
                rocheX.subVectors(hole, star);
                rocheX.addScaledVector(f.axis, -rocheX.dot(f.axis)).normalize();
                rocheY.crossVectors(f.axis, rocheX);
                mesh.matrix.makeBasis(rocheX, rocheY, f.axis).scale(scaleBy.setScalar(separation)).setPosition(star);
                mesh.matrixWorldNeedsUpdate = true;
                mesh.visible = starPx > DISC_MIN_PX;
                disc.visible = false;
            } else {
                disc.position.copy(star);
                starPx = sys.star.radius_au * focal / toStar;
                disc.visible = starPx > DISC_MIN_PX;
            }
            // Its sprite, small and over the disc where the light is bent
            // (the Einstein ring's radius, sqrt(4 rg / d) far off); behind
            // the star's disc once that's a few px (a fed star seen from
            // its hole fills much of the sky)
            const ringPx = 2 * Math.sqrt(4 * sys.black_hole.rg_au / toHole) * focal;
            const lensed = THREE.MathUtils.smoothstep(ringPx, ...LENSED_RING_PX);
            su.uMaxSize.value = THREE.MathUtils.lerp(spriteMaxPx, SPRITE_LENSED_PX, lensed);
            su.uGlowMax.value = THREE.MathUtils.lerp(1, 0.001, lensed);
            starPoints.material.depthTest = lensed < 0.5 || starPx > 2;
            // The jet's line, on the hole, gone close to it
            if (f) {
                jetE1.crossVectors(f.axis, Math.abs(f.axis.y) < 0.9 ? Y_AXIS : X_AXIS).normalize();
                jetE2.crossVectors(f.axis, jetE1);
                jet.matrix.makeBasis(jetE1, jetE2, f.axis).scale(scaleBy.setScalar(JET_LENGTH * separation)).setPosition(hole);
                jet.matrixWorldNeedsUpdate = true;
                jet.material.opacity = JET_OPACITY * closeUp * (opts.orbits || opts.selected === active ? 1 : 0)
                    * THREE.MathUtils.smoothstep(toHole / separation, ...JET_FADE);
            }
            jet.visible = Boolean(f) && jet.material.opacity > 0.003;
            // The orbit line, on the hole
            const line = orbitLines[active];
            const apo = sys.orbit.apoapsis_au;
            const selected = opts.selected === active;
            line.matrix.setPosition(hole);
            line.matrixWorldNeedsUpdate = true;
            line.material.opacity = (selected ? ORBIT_SELECTED_OPACITY : ORBIT_OPACITY) * closeUp
                * (opts.orbits || selected ? 1 : 0)
                * THREE.MathUtils.smoothstep(2 * apo * focal / toHole, ...ORBIT_PX)
                * (1 - THREE.MathUtils.smoothstep(apo / toHole, ...ORBIT_TOO_WIDE));
            line.visible = line.material.opacity > 0.003;
            // The hole's marker, until its shadow shows
            shadowPx = sys.black_hole.shadow_km / KM_PER_AU * focal / toHole;
            hole.toArray(markerGeometry.attributes.position.array);
            markerGeometry.attributes.position.needsUpdate = true;
            markerMaterial.uniforms.uFade.value = closeUp * (1 - THREE.MathUtils.smoothstep(shadowPx, ...MARKER_SHADOW_PX));
            // Near plane: a fraction of the way to the nearest thing
            const closest = Math.min(toHole - sys.black_hole.shadow_km / KM_PER_AU, toStar - starOut);
            layer.near = Math.max(closest * NEAR_FRACTION, 1e-9);
            layer.far = toCentre + 2 * apo + JET_LENGTH * separation + 1;
        },

        // The active hole for the lens pass ({at: AU in this layer, rgAu,
        // kerr}: utils/blackHoleLens update's other), or null
        lensTarget() {
            if (active < 0 || !layer.visible) return null;
            const sys = systems[active];
            const f = fed[active];
            if (!f) return { at: hole, rgAu: sys.black_hole.rg_au, kerr: null };
            lensKerr.spin = sys.black_hole.spin;
            lensKerr.axis = f.axis;
            lensKerr.star.at.copy(star);
            lensKerr.star.radiusAu = sys.star.roche.r_vol * separation;
            lensKerr.disc = f.disc;
            return { at: hole, rgAu: sys.black_hole.rg_au, kerr: lensKerr };
        },

        // The view's up riding along with system i's hole: a fed one's disc
        // axis (Earth's side), or null (north stays up)
        upAxis: (i) => fed[i]?.up ?? null,
        // Where system i's black hole is at year t, in ly from the Sun
        // (doubles); out: Vector3
        holeLy: (i, t, out = new THREE.Vector3()) => bhHoleAu(systems[i], t, out).divideScalar(AU_PER_LY).add(centres[i]),
        starLy: (i, t, out = new THREE.Vector3()) => bhStarAu(systems[i], t, out).divideScalar(AU_PER_LY).add(centres[i]),
        // Where system i's star looks to be from the camera (ly), its light
        // bent by the hole as the lens pass bends it: its direct image,
        // at the star's distance
        starImageLy(i, t, cameraLy, out = new THREE.Vector3()) {
            const sys = systems[i];
            const camAu = new THREE.Vector3().subVectors(cameraLy, centres[i]).multiplyScalar(AU_PER_LY);
            const starAu = bhStarAu(sys, t);
            directImage(camAu, bhHoleAu(sys, t), starAu, sys.black_hole.rg_au, out);
            return out.divideScalar(AU_PER_LY).add(centres[i]);
        },
        // In the close-up (after syncStarCamera), where the hole (star
        // false) or its star's direct image (true) is on screen, from this
        // layer's camera: [x, y] (CSS px), or null off screen
        screenPoint(isStar, width, height) {
            if (active < 0) return null;
            const p = isStar ? directImage(cameraAu, hole, star, systems[active].black_hole.rg_au, screenScratch) : screenScratch.copy(hole);
            p.project(layer.camera);
            if (p.z > 1 || Math.abs(p.x) > 1.05 || Math.abs(p.y) > 1.05) return null;
            return [(p.x + 1) / 2 * width, (1 - p.y) / 2 * height];
        },
        // Whether system i is named (near enough, out among the stars)
        named: (i, cameraLy) => cameraLy.length() > NAMED_FROM_LY && centres[i].distanceTo(cameraLy) < LABEL_LY,

        // The system under a screen point (index), or null: its hole or star
        // in its close-up, else its place, while named. cam: the star layer's
        // camera (ly); t: the clock's year
        pick(cam, width, height, x, y, radiusPx, t) {
            const p = new THREE.Vector3();
            let best = null;
            let bestD = radiusPx;
            const test = (i, at) => {
                at.project(cam);
                if (at.z > 1 || Math.abs(at.x) > 1.05 || Math.abs(at.y) > 1.05) return;
                const d = Math.hypot((at.x + 1) / 2 * width - x, (1 - at.y) / 2 * height - y);
                if (d < bestD) {
                    bestD = d;
                    best = i;
                }
            };
            systems.forEach((sys, i) => {
                if (!far[i].visible) return;
                if (i === active && closeUp > 0.3) {
                    test(i, this.holeLy(i, t, p));
                    test(i, this.starImageLy(i, t, cam.position, p));
                } else if (this.named(i, cam.position)) {
                    test(i, p.copy(centres[i]));
                }
            });
            return best;
        },

        // Called after the layers' cameras are synced, before rendering:
        // this layer's camera at the view's exact place when riding along
        // with the hole (update's view), and the close-up star shader's
        // camera, in AU
        syncStarCamera(setStarCamera) {
            if (exact && layer.visible) {
                layer.camera.position.copy(cameraAu);
                layer.camera.updateMatrixWorld();
            }
            setStarCamera(starCamera, layer.camera.position);
        },
        // The star materials, for the glare (Universe3D applyBloom) and the
        // far stars' dim floor
        starMaterials: () => [starPoints.material],
        farStars: () => far,

        dispose() {
            far.forEach((points) => {
                farScene.remove(points);
                points.geometry.dispose();
                points.material.dispose();
            });
            starPoints.geometry.dispose();
            starPoints.material.dispose();
            disc.geometry.dispose();
            disc.material.dispose();
            orbitLines.forEach((line) => {
                line.geometry.dispose();
                line.material.dispose();
            });
            markerGeometry.dispose();
            markerMaterial.dispose();
            fed.forEach((f) => {
                if (!f) return;
                f.disc.texture.dispose();
                f.mesh?.geometry.dispose();
                f.mesh?.material.dispose();
            });
            jetGeometry.dispose();
            jet.material.dispose();
        },
    };
}
