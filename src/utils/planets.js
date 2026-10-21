// Planet, Moon and Pluto positions, shared by the 3D view and later Sky View.
//
// Planets come from planet_orbits.json (Star_Data/scripts/build_planet_orbits.py,
// installed with setPlanetOrbits) over 1600-2500: wave fits to JPL Horizons
// for Mercury, Venus, Mars, Uranus, Neptune, Pluto and VSOP87 for Earth,
// Jupiter, Saturn, within ~15 km (Mercury) to ~80,000 km (Pluto) of
// Horizons. Before it loads, or outside its years, astronomy-engine (Mercury
// ~7,800 km off now, 93,000 km by 2499). The Moon is astronomy-engine's,
// relative to Earth (within ~80 km over 1600-2500).
//
// Positions are in AU, Sun-centred, in the scene frame used for the stars
// (utils/universe3d.js raDecToXYZ): J2000 equatorial with celestial north
// along +Y. ICRF / astronomy-engine's J2000 (EQJ) vectors have north along
// +Z, so (x, y, z) -> (x, z, -y). Checked against JPL Horizons by
// scripts/check-planets.js.

import { Body, GeoMoon, HelioVector, Illumination, MakeTime, MoonPhase, RotationAxis, SearchMoonPhase, SearchMoonQuarter } from 'astronomy-engine';
import { keplerFromState, wavesPosition } from './waveOrbits.js';
import { KM_PER_AU } from './universe3d.js';

// Drawn in the solar-system layer, in this order
export const SOLAR_SYSTEM_BODIES = [
    'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto',
];

// Sidereal orbital periods (days), for drawing one full orbit
const ORBIT_DAYS = {
    Mercury: 87.969, Venus: 224.701, Earth: 365.256, Mars: 686.980, Jupiter: 4332.59,
    Saturn: 10759.22, Uranus: 30688.5, Neptune: 60182, Pluto: 90560,
};

const MOON_ORBIT_DAYS = 27.32;  // sidereal month
const DAY_MS = 86400000;

// astronomy-engine EQJ vector -> scene [x, y, z]
const toScene = (v) => [v.x, v.z, -v.y];

// ---------- planet_orbits.json ----------
let orbits = null;  // planet_orbits.json, or null: astronomy-engine only
export function setPlanetOrbits(data) {
    orbits = data;
}

const J2000 = 2451545;
// VSOP87's J2000 ecliptic -> equator (FK5, within ~0.02" of ICRF)
const OBLIQUITY = 23.4392803055556 * Math.PI / 180;
const COS_EPS = Math.cos(OBLIQUITY), SIN_EPS = Math.sin(OBLIQUITY);

// vsop87 body -> [x, y, z] km, ICRF (VSOP87A: AU, J2000 ecliptic,
// T = Julian millennia from J2000)
function vsopPosition(body, t) {
    const T = t / 365250;
    const out = [0, 0, 0];
    ['x', 'y', 'z'].forEach((axis, i) => {
        for (const [power, A, B, C] of body.terms[axis]) {
            let sum = 0;
            for (let j = 0; j < A.length; j++) sum += A[j] * Math.cos(B[j] + C[j] * T);
            out[i] += sum * T ** power;
        }
    });
    const [x, y, z] = out;
    return [x * KM_PER_AU, (y * COS_EPS - z * SIN_EPS) * KM_PER_AU, (y * SIN_EPS + z * COS_EPS) * KM_PER_AU];
}

// planet_orbits.json position (AU, scene frame), or null outside its years
// or before it is installed
function modelPosition(body, date) {
    const model = orbits?.bodies[body];
    if (!model) return null;
    const jd = J2000 + MakeTime(date).tt;  // TT (~TDB): astronomy-engine's Delta T, as smallBodies.js
    const [start, stop] = orbits.valid_jd_tdb;
    if (jd < start || jd > stop) return null;
    const t = jd - J2000;
    const [x, y, z] = model.method === 'waves' ? wavesPosition(model, t) : vsopPosition(model, t);
    return toScene({ x: x / KM_PER_AU, y: y / KM_PER_AU, z: z / KM_PER_AU });
}

// One body's position (AU from the Sun) at a Date. Body names as in
// SOLAR_SYSTEM_BODIES, plus 'Moon' (Earth + astronomy-engine's geocentric
// Moon, so it stays on Earth whichever Earth is used).
export function heliocentricPosition(body, date) {
    if (body === 'Moon') {
        const earth = heliocentricPosition('Earth', date);
        const moon = geocentricMoon(date);
        return [earth[0] + moon[0], earth[1] + moon[1], earth[2] + moon[2]];
    }
    return modelPosition(body, date) ?? toScene(HelioVector(Body[body], date));
}

// A body's spin axis and prime meridian at a Date (IAU WGCCRE 2015), as
// unit vectors in the scene frame: {pole, meridian}. pole is the IAU north
// pole: for planets the one north of the invariable plane (Venus and Uranus
// spin backwards about it), for Pluto the right-hand one (IAU dwarf-planet
// rule, as in the New Horizons maps: Charon at longitude 0, Sputnik
// Planitia in the north); meridian points from the centre to longitude 0
// on the equator. Sun, planets, Pluto and the Moon.
export function bodyAxes(body, date) {
    const { ra, spin, north } = RotationAxis(Body[body], date);
    const pole = toScene(north);
    // W (spin) is measured east along the body's equator from its ascending
    // node on the J2000 equator, which lies at the pole's RA + 90 deg
    const a = (ra * 15 + 90) * Math.PI / 180;
    const node = toScene({ x: Math.cos(a), y: Math.sin(a), z: 0 });
    const east = [  // pole x node: 90 deg east of the node
        pole[1] * node[2] - pole[2] * node[1],
        pole[2] * node[0] - pole[0] * node[2],
        pole[0] * node[1] - pole[1] * node[0],
    ];
    const w = spin * Math.PI / 180;
    const meridian = node.map((n, i) => n * Math.cos(w) + east[i] * Math.sin(w));
    return { pole, meridian };
}

// Every body in SOLAR_SYSTEM_BODIES plus the Moon: {name: [x, y, z]} in AU
export function solarSystemPositions(date) {
    const out = {};
    for (const body of SOLAR_SYSTEM_BODIES) out[body] = heliocentricPosition(body, date);
    out.Moon = heliocentricPosition('Moon', date);
    return out;
}

// The Moon relative to Earth (AU). Accurate to ~arcminutes; useful for the
// Earth layer, where Earth is the origin.
export function geocentricMoon(date) {
    return toScene(GeoMoon(date));
}

// The Moon's phase as seen from Earth at a Date:
//   name      'New Moon', 'Waxing crescent', 'First quarter', ...
//   lit       fraction of the disc lit (0-1)
//   ageDays   days since the last new Moon
//   next      the next new Moon, quarter or full Moon: {name, date}
// The four main phases are instants; within PHASE_NAME_DEG of one (about
// half a day) the Moon gets that phase's name.
const PHASE_NAME_DEG = 6;
const QUARTER_NAMES = ['New Moon', 'First quarter', 'Full Moon', 'Last quarter'];
const BETWEEN_NAMES = ['Waxing crescent', 'Waxing gibbous', 'Waning gibbous', 'Waning crescent'];
export function moonPhase(date) {
    const angle = MoonPhase(date);  // Moon minus Sun ecliptic longitude: 0 new, 180 full
    const quarterIndex = Math.round(angle / 90);
    const name = Math.abs(angle - quarterIndex * 90) < PHASE_NAME_DEG
        ? QUARTER_NAMES[quarterIndex % 4] : BETWEEN_NAMES[Math.floor(angle / 90)];
    const lastNew = SearchMoonPhase(0, date, -32);
    const quarter = SearchMoonQuarter(date);
    return {
        name,
        lit: Illumination(Body.Moon, date).phase_fraction,
        ageDays: lastNew ? (date.getTime() - lastNew.date.getTime()) / DAY_MS : null,
        next: { name: QUARTER_NAMES[quarter.quarter], date: quarter.time.date },
    };
}

// Sidereal orbital period in days, for SOLAR_SYSTEM_BODIES and 'Moon'
export const orbitPeriodDays = (body) => (body === 'Moon' ? MOON_ORBIT_DAYS : ORBIT_DAYS[body]);

// One orbit as a closed loop of points, flat [x, y, z, ...] (for a
// THREE.LineLoop), point segments/2 being the body at `date`.
// position(date) -> [x, y, z]. Sampled from the real
// positions, so it matches where the body is drawn. Points bunch up around
// `date` (time offset ~ u^3): the line passes through the body, and seen up
// close evenly spaced straight segments show visible corners. Far round
// the orbit they're sparse, but also far away, so the corners are too
// small to see. As time runs the body leaves the dense part, so the 3D
// view resamples each orbit once its body has moved on (solarSystem3d).
//
// Real orbits don't close exactly (the Moon's least: the Sun keeps
// reshaping it), so the two ends, half a period either side, miss by a
// little and the loop's closing segment would show as a jag. Each half is
// eased towards the midpoint of that gap, not at all near the body and
// fully at the far end, so the ends meet and the body stays on its line.
export function sampleOrbit(position, date, periodMs, segments) {
    const t = date.getTime();
    const start = position(new Date(t - periodMs / 2));
    const end = position(new Date(t + periodMs / 2));
    const fixStart = start.map((v, k) => (end[k] - v) / 2);  // start -> midpoint
    const fixEnd = end.map((v, k) => (start[k] - v) / 2);    // end -> midpoint
    const ease = (x) => x * x * (3 - 2 * x);

    // Doubles: the 3D view re-centres these on the body before they go to
    // the GPU as floats (see resample in solarSystem3d)
    const out = new Float64Array(segments * 3);
    for (let i = 0; i < segments; i++) {
        const u = -1 + 2 * i / segments;
        const offset = Math.sign(u) * Math.abs(u) ** 3 * periodMs / 2;
        const p = position(new Date(t + offset));
        const fix = u < 0 ? fixStart : fixEnd;
        const w = ease(Math.abs(u));
        out.set([p[0] + fix[0] * w, p[1] + fix[1] * w, p[2] + fix[2] * w], i * 3);
    }
    return out;
}

const GM_SUN = 0.01720209895 ** 2;  // AU^3/day^2 (Gaussian constant squared)

// An orbit line from a slow position model: the Kepler ellipse through the
// body's position and velocity now (mu in AU^3/day^2), bent onto the real
// path: the model is evaluated at ORBIT_ANCHORS even times round the orbit
// and its difference from the ellipse there is blended along the line
// (Catmull-Rom). Sampling a wave fit 512 times costs ~15 ms a line
// (~3,000 sines a position); this ~1 ms, and the line passes exactly
// through the body. The ellipse alone strays up to ~0.5 deg (Uranus,
// Neptune: the Sun's wobble from Jupiter skews their Sun-centred
// velocity); the difference is smooth, so a few anchors take it out.
// position(Date) -> [x, y, z] AU, or null where the model has no answer
// (the nearest anchor's difference is used there).
const ORBIT_ANCHORS = 16;
export function keplerLine(position, date, periodMs, mu, segments) {
    const t = date.getTime();
    const r = position(date);
    const before = position(new Date(t - periodMs / 2000));
    const after = position(new Date(t + periodMs / 2000));
    const v = after.map((c, i) => (c - before[i]) / (periodMs / 1000 / DAY_MS));  // AU/day
    const along = keplerFromState(r, v, mu);
    // Model minus ellipse at anchors j = 0..ORBIT_ANCHORS, from half a period
    // before to half after (one extra each side for the spline's ends)
    const step = periodMs / ORBIT_ANCHORS;
    const fix = [];
    for (let j = -1; j <= ORBIT_ANCHORS + 1; j++) {
        const dt = -periodMs / 2 + j * step;
        const real = position(new Date(t + dt));
        const kepler = along(dt / DAY_MS);
        fix.push(real && real.map((c, i) => c - kepler[i]));
    }
    for (let j = fix.indexOf(fix.find(Boolean)); j > 0; j--) fix[j - 1] = fix[j];  // the now-anchor is always there
    for (let j = 1; j < fix.length; j++) fix[j] ??= fix[j - 1];
    const fixAt = (dt) => {
        const x = (dt + periodMs / 2) / step;  // anchor units, 0..ORBIT_ANCHORS
        const j = Math.min(ORBIT_ANCHORS - 1, Math.max(0, Math.floor(x)));
        const s = x - j;
        const [p0, p1, p2, p3] = [fix[j], fix[j + 1], fix[j + 2], fix[j + 3]];  // anchors j-1..j+2
        return p1.map((_, i) => 0.5 * (2 * p1[i] + (p2[i] - p0[i]) * s
            + (2 * p0[i] - 5 * p1[i] + 4 * p2[i] - p3[i]) * s * s + (3 * p1[i] - p0[i] - 3 * p2[i] + p3[i]) * s * s * s));
    };
    return sampleOrbit(d => {
        const dt = d.getTime() - t;
        const k = along(dt / DAY_MS);
        const f = fixAt(dt);
        return [k[0] + f[0], k[1] + f[1], k[2] + f[2]];
    }, date, periodMs, segments);
}

// A planet's orbit line: keplerLine on planet_orbits.json (outside its
// years at the ends of Pluto's 248-year orbit, the nearest anchor's
// difference: no slow astronomy-engine Pluto, no step between models);
// astronomy-engine sampled directly before it loads
export function orbitPath(body, date, segments = 512) {
    const periodMs = ORBIT_DAYS[body] * DAY_MS;
    if (!modelPosition(body, date)) {
        return sampleOrbit(d => heliocentricPosition(body, d), date, periodMs, segments);
    }
    return keplerLine(d => modelPosition(body, d), date, periodMs, GM_SUN, segments);
}

// The Moon's orbit around Earth (AU, Earth-centred), sampled like orbitPath
export function moonOrbitPath(date, segments = 512) {
    return sampleOrbit(geocentricMoon, date, MOON_ORBIT_DAYS * DAY_MS, segments);
}
