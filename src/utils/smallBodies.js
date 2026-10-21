// Named asteroid, dwarf planet and comet positions (small_bodies.json,
// built by Star_Data/scripts/build_small_bodies.py), in AU from the Sun, in
// the scene frame (J2000 equatorial, north = +Y; see planets.js).
//
// Each body has osculating elements (J2000 ecliptic) from JPL Horizons on a
// grid over 1600-2500, denser around close planet flybys (`history`, see
// attachSmallBodyHistory). A position is the two-body Kepler orbit from the
// sample before and the one after, blended: Horizons' samples carry the
// planets' pull (and comets' outgassing), the two-body maths only bridges
// the gap between them. Without the history (not loaded, or outside its
// range), the single SBDB element set (2026) is propagated alone: the Sun's
// pull only, drifting as the planets tug the body. The point cloud uses
// that simple form on the GPU (smallBodies3d.js).
//
// Bodies with an `orbit` (small_body_orbits.json, attachSmallBodyOrbits: a
// wave fit to Horizons on an even grid, utils/waveOrbits.js, kept by the
// build only where it beats the blend: Ceres ~350,000 km -> ~8,000) follow
// that instead.

import { MakeTime } from 'astronomy-engine';
import { eccentricAnomaly } from './moons.js';
import { wavesPosition } from './waveOrbits.js';

const KM_PER_AU = 149597870.7;

const DEG = Math.PI / 180;
const DAY_MS = 86400000;
const JD_UNIX_EPOCH = 2440587.5;
// Gaussian gravitational constant (rad/day): mean motion n = k / a^1.5, a in AU
export const GAUSS_K = 0.01720209895;
// J2000 ecliptic -> equator tilt
export const OBLIQUITY_RAD = 23.4392911 * DEG;
const COS_EPS = Math.cos(OBLIQUITY_RAD);
const SIN_EPS = Math.sin(OBLIQUITY_RAD);
// Hyperbolic orbits are drawn out to this distance from the Sun (AU), or
// past the body if it is farther
const HYPERBOLA_EXTENT_AU = 150;
// small_bodies_history.bin: per sample, element values (float32) in this order
const HISTORY_FIELDS = 6;  // e, q (AU), i, node, w (deg), tp - jd (days)

export const julianDate = (date) => date.getTime() / DAY_MS + JD_UNIX_EPOCH;
export const dateFromJulian = (jd) => new Date((jd - JD_UNIX_EPOCH) * DAY_MS);
// Terrestrial Time JD of a Date: Horizons' times (TDB, within 2 ms of TT)
// run ahead of the clock's UTC by ~69 s now, ~2 min in 1600 (astronomy-
// engine's model, the planets use the same), 2,000 km for a fast asteroid
const julianTT = (date) => 2451545 + MakeTime(date).tt;

// An element set: {q, e, i, node, w, tp} (a `named` entry is one too)
const isBound = (el) => el.e < 1;

// Semi-major axis (AU; elliptic orbits only)
export const semiMajorAxis = (el) => el.q / (1 - el.e);

// Orbital period in days, or null for an orbit that escapes the Sun
export function smallBodyPeriodDays(el) {
    if (!isBound(el)) return null;
    return 2 * Math.PI * semiMajorAxis(el) ** 1.5 / GAUSS_K;
}

// Give the named bodies their wave fits (small_body_orbits.json: {orbits:
// {id: orbit}}), as `orbit`
export function attachSmallBodyOrbits(meta, data) {
    for (const b of meta.named) {
        if (data?.orbits?.[b.id]) b.orbit = data.orbits[b.id];
    }
}

// Give each named body its Horizons samples. meta: small_bodies.json;
// buffer: small_bodies_history.bin (ArrayBuffer): all sample times
// (float64 JD), then all element values (float32, HISTORY_FIELDS each);
// each body's `history_range` is [first sample, count].
export function attachSmallBodyHistory(meta, buffer) {
    const total = meta.history.count;
    const jd = new Float64Array(buffer, 0, total);
    const el = new Float32Array(buffer, total * 8, total * HISTORY_FIELDS);
    for (const b of meta.named) {
        const [start, count] = b.history_range ?? [0, 0];
        if (count) {
            b.history = {
                jd: jd.subarray(start, start + count),
                el: el.subarray(start * HISTORY_FIELDS, (start + count) * HISTORY_FIELDS),
            };
        }
    }
}

function sampleElements(h, k) {
    const o = k * HISTORY_FIELDS;
    return { e: h.el[o], q: h.el[o + 1], i: h.el[o + 2], node: h.el[o + 3], w: h.el[o + 4], tp: h.jd[k] + h.el[o + 5] };
}

// Index of the last sample at or before jd (-1 if before them all)
function sampleBefore(h, jd) {
    let lo = -1, hi = h.jd.length;
    while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (h.jd[mid] <= jd) lo = mid;
        else hi = mid;
    }
    return lo;
}

// The body's osculating elements nearest a Date (its SBDB set without a
// history), for its card and its drawn orbit
export function currentElements(b, date) {
    const h = b.history;
    if (!h) return b;
    const jd = julianTT(date);
    const k = sampleBefore(h, jd);
    if (k < 0) return sampleElements(h, 0);
    if (k >= h.jd.length - 1) return sampleElements(h, h.jd.length - 1);
    return sampleElements(h, jd - h.jd[k] < h.jd[k + 1] - jd ? k : k + 1);
}

// Hyperbolic Kepler equation M = e sinh H - H, solved for H
function hyperbolicAnomaly(M, e) {
    let H = Math.asinh(M / e);
    for (let k = 0; k < 50; k++) {
        const dH = (e * Math.sinh(H) - H - M) / (e * Math.cosh(H) - 1);
        H -= dH;
        if (Math.abs(dH) < 1e-12) break;
    }
    return H;
}

// Point in the orbit plane (x towards perihelion, AU) -> scene [x, y, z]:
// turn by w, tilt by i, turn by node (as moons.js), then ecliptic -> equator
function orbitToScene(el, px, py) {
    const cw = Math.cos(el.w * DEG), sw = Math.sin(el.w * DEG);
    const ci = Math.cos(el.i * DEG), si = Math.sin(el.i * DEG);
    const cn = Math.cos(el.node * DEG), sn = Math.sin(el.node * DEG);
    const x1 = cw * px - sw * py;
    const y1 = sw * px + cw * py;
    const y2 = ci * y1;
    const z2 = si * y1;
    const x = cn * x1 - sn * y2;          // ecliptic
    const y = sn * x1 + cn * y2;
    const z = z2;
    const ye = COS_EPS * y - SIN_EPS * z;  // equatorial
    const ze = SIN_EPS * y + COS_EPS * z;
    return [x, ze, -ye];                  // scene (north = +Y)
}

// Eccentric anomaly (radians, 0..2pi) of an elliptic orbit at a JD
function eccentricAnomalyAt(el, jd) {
    const M = GAUSS_K / semiMajorAxis(el) ** 1.5 * (jd - el.tp);
    return eccentricAnomaly(((M % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI), el.e);
}

// True anomaly (radians) of a hyperbolic orbit at a JD
function hyperbolicTrueAnomalyAt(el, jd) {
    const a = el.q / (el.e - 1);
    const H = hyperbolicAnomaly(GAUSS_K / a ** 1.5 * (jd - el.tp), el.e);
    return 2 * Math.atan(Math.sqrt((el.e + 1) / (el.e - 1)) * Math.tanh(H / 2));
}

// Two-body position of an element set at a JD: [x, y, z] AU from the Sun.
// From perihelion distance q and time tp, so ellipses, hyperbolas and
// parabolas work alike.
function conicPosition(el, jd) {
    const { q, e } = el;
    let px, py;
    if (e < 1 && Math.abs(e - 1) >= 1e-8) {
        const a = q / (1 - e);
        const E = eccentricAnomalyAt(el, jd);
        px = a * (Math.cos(E) - e);
        py = a * Math.sqrt(1 - e * e) * Math.sin(E);
    } else if (Math.abs(e - 1) < 1e-8) {
        // Parabola (Barker's equation): D + D^3/3 = dt sqrt(GM / 2q^3), D = tan(nu/2)
        const A = GAUSS_K * (jd - el.tp) / Math.sqrt(2 * q * q * q);
        const Y = Math.cbrt(1.5 * A + Math.sqrt(2.25 * A * A + 1));
        const D = Y - 1 / Y;
        px = q * (1 - D * D);
        py = 2 * q * D;
    } else {
        const a = q / (e - 1);
        const H = hyperbolicAnomaly(GAUSS_K / a ** 1.5 * (jd - el.tp), e);
        px = a * (e - Math.cosh(H));
        py = a * Math.sqrt(e * e - 1) * Math.sinh(H);
    }
    return orbitToScene(el, px, py);
}

// A small_bodies.json `named` entry at a Date: [x, y, z] AU from the Sun
// (see the top of the file)
export function smallBodyPosition(b, date) {
    const jd = julianTT(date);
    if (b.orbit) {
        const [x, y, z] = wavesPosition(b.orbit, jd - 2451545);  // ICRF km
        return [x / KM_PER_AU, z / KM_PER_AU, -y / KM_PER_AU];   // scene frame (north = +Y)
    }
    const h = b.history;
    if (!h) return conicPosition(b, jd);
    const k = sampleBefore(h, jd);
    if (k < 0) return conicPosition(sampleElements(h, 0), jd);
    if (k >= h.jd.length - 1) return conicPosition(sampleElements(h, h.jd.length - 1), jd);
    const p0 = conicPosition(sampleElements(h, k), jd);
    const p1 = conicPosition(sampleElements(h, k + 1), jd);
    const f = (jd - h.jd[k]) / (h.jd[k + 1] - h.jd[k]);
    const w = f * f * (3 - 2 * f);
    return [p0[0] + (p1[0] - p0[0]) * w, p0[1] + (p1[1] - p0[1]) * w, p0[2] + (p1[2] - p0[2]) * w];
}

// The orbit as flat [x, y, z, ...] AU from the Sun, segments + 1 points (an
// ellipse's last repeats its first, closing it: a comet's orbit can turn
// from closed to open over the centuries, so the line keeps one shape).
// The ellipse (or hyperbola) of currentElements. Point segments/2 is the
// body at `date`, and points bunch up around it (offset ~ u^3), so seen up
// close it sits on its line: a line of straight segments strays from the
// curve between points (~1,000 km near a comet far out), so the 3D view
// redraws it around the body every frame (cheap, unlike the planets').
// The body's blended position is a little off that one ellipse, so the
// line is pulled onto it, fully at and around the body and not at all half
// an orbit away.
// Ellipses (closed): by eccentric anomaly, not time like the planets'
// (planets.js sampleOrbit): a comet spends nearly all its time far out, so
// time steps would leave its swing past the Sun with a few points.
// Hyperbolas (open): by true anomaly, out to HYPERBOLA_EXTENT_AU.
export function smallBodyOrbit(b, date, segments = 512) {
    const el = currentElements(b, date);
    const jd = julianTT(date);
    const onCurve = conicPosition(el, jd);
    const body = smallBodyPosition(b, date);
    const shift = body.map((v, k) => v - onCurve[k]);
    const out = new Float64Array((segments + 1) * 3);
    // Flat at the body (fading with |u|^3, the offset round the orbit): a
    // weight with a corner there bent the line into a V, the pull being
    // thousands of km and the points next to the body ~100 km apart
    const put = (k, u, p) => {
        const w = 0.5 * (1 + Math.cos(Math.PI * Math.abs(u) ** 3));
        out.set([p[0] + shift[0] * w, p[1] + shift[1] * w, p[2] + shift[2] * w], k * 3);
    };
    if (isBound(el)) {
        const a = semiMajorAxis(el);
        const minor = a * Math.sqrt(1 - el.e * el.e);
        const E0 = eccentricAnomalyAt(el, jd);
        for (let k = 0; k <= segments; k++) {
            const u = -1 + 2 * k / segments;
            const E = E0 + Math.sign(u) * Math.abs(u) ** 3 * Math.PI;
            put(k, u, orbitToScene(el, a * (Math.cos(E) - el.e), minor * Math.sin(E)));
        }
        return out;
    }
    // r = p / (1 + e cos nu): true anomaly where r reaches the extent (or
    // a little past the body, once it is farther out than that)
    const p = el.q * (1 + el.e);
    const nu0 = hyperbolicTrueAnomalyAt(el, jd);
    const extent = Math.max(HYPERBOLA_EXTENT_AU, 1.1 * p / (1 + el.e * Math.cos(nu0)));
    const nuMax = Math.acos(Math.max(-1, Math.min(1, (p / extent - 1) / el.e)));
    for (let k = 0; k <= segments; k++) {
        const u = -1 + 2 * k / segments;
        const nu = nu0 + (u < 0 ? nu0 + nuMax : nuMax - nu0) * Math.sign(u) * Math.abs(u) ** 3;
        const r = p / (1 + el.e * Math.cos(nu));
        put(k, u, orbitToScene(el, r * Math.cos(nu), r * Math.sin(nu)));
    }
    return out;
}

// A body's spin axis and prime meridian at a Date, from its `spin` model
// (pole RA/Dec, W = w0 + wdot * days since J2000, degrees), as unit vectors
// in the scene frame: {pole, meridian}. The same construction as
// planets.js bodyAxes: W is measured east along the body's equator from
// its ascending node on the J2000 equator (at the pole's RA + 90 deg).
export function spinAxes(spin, date) {
    const ra = spin.ra * DEG, dec = spin.dec * DEG;
    const icrf = (x, y, z) => [x, z, -y];  // ICRF -> scene
    const pole = icrf(Math.cos(dec) * Math.cos(ra), Math.cos(dec) * Math.sin(ra), Math.sin(dec));
    const node = icrf(Math.cos(ra + Math.PI / 2), Math.sin(ra + Math.PI / 2), 0);
    const east = [
        pole[1] * node[2] - pole[2] * node[1],
        pole[2] * node[0] - pole[0] * node[2],
        pole[0] * node[1] - pole[1] * node[0],
    ];
    const w = (spin.w0 + spin.wdot * (julianTT(date) - 2451545)) % 360 * DEG;
    const meridian = node.map((n, i) => n * Math.cos(w) + east[i] * Math.sin(w));
    return { pole, meridian };
}

// [first, last] year of a body's Horizons history, or null
export function historyYears(b) {
    const h = b.history;
    if (!h) return null;
    return [dateFromJulian(h.jd[0]).getUTCFullYear(), dateFromJulian(h.jd[h.jd.length - 1]).getUTCFullYear()];
}

// Next perihelion after `date` for an ellipse; the perihelion for an
// escaping orbit (past or future). From an element set (currentElements).
export function perihelionDate(el, date) {
    const period = smallBodyPeriodDays(el);
    if (!period) return dateFromJulian(el.tp);
    const now = julianTT(date);
    return dateFromJulian(el.tp + Math.ceil((now - el.tp) / period) * period);
}
