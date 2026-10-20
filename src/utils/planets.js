// Planet, Moon and Pluto positions (astronomy-engine), shared by the 3D view
// and later Sky View.
//
// Positions are in AU, Sun-centred, in the scene frame used for the stars
// (utils/universe3d.js raDecToXYZ): J2000 equatorial with celestial north
// along +Y. astronomy-engine's J2000 (EQJ) vectors have north along +Z, so
// (x, y, z) -> (x, z, -y). Checked against Skyfield + DE421 by
// scripts/check-planets.js.

import { Body, GeoMoon, HelioVector, Illumination, MoonPhase, RotationAxis, SearchMoonPhase, SearchMoonQuarter } from 'astronomy-engine';

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

// One body's position (AU from the Sun) at a Date. Body names as in
// SOLAR_SYSTEM_BODIES, plus 'Moon'.
export function heliocentricPosition(body, date) {
    return toScene(HelioVector(Body[body], date));
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

export function orbitPath(body, date, segments = 512) {
    return sampleOrbit(d => heliocentricPosition(body, d), date, ORBIT_DAYS[body] * DAY_MS, segments);
}

// The Moon's orbit around Earth (AU, Earth-centred), sampled like orbitPath
export function moonOrbitPath(date, segments = 512) {
    return sampleOrbit(geocentricMoon, date, MOON_ORBIT_DAYS * DAY_MS, segments);
}
