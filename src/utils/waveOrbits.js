// Wave-fit orbits (Star_Data/scripts/lib/wave_fit.py): planets in
// planet_orbits.json, moons' `orbit` in moons.json.
//
// An orbit is six smooth quantities through time, each a cubic in
// s = (t - mid) / half plus sinusoids (t: days from J2000, TDB):
//   h, k = e sin/cos of the closest point's longitude   shape
//   p, q = tan(i/2) sin/cos of the node                  tilt
//   L    = mean longitude (radians), a = size (km)
// (pairs, so near-circles and flat orbits don't break; `flip`: fitted in
// the frame turned 180 deg about x, for retrograde orbits). Outside the fitted
// days [lo, hi] the cubic carries on as a straight line from its edge and
// the sinusoids repeat: moons whose Horizons solutions cover less than the
// clock's 1600-2500 drift slowly past their ends instead of shooting off.

// A fit can overshoot e = 1 for a wild irregular moon: kept an ellipse, as
// lib/wave_fit.py does when it checks the fit
const E_MAX = 0.99;

// Kepler's equation M = E - e sin E for E (radians)
function solveKepler(M, e) {
    let E = e < 0.8 ? M : Math.PI;
    for (let k = 0; k < 30; k++) {
        const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
        E -= dE;
        if (Math.abs(dE) < 1e-12) break;
    }
    return E;
}

function seriesValue(s, t, body) {
    const { mid, half, lo, hi } = body;
    const p = s.poly;
    const x = (t - mid) / half;
    const edge = lo !== undefined && t < lo ? (lo - mid) / half : hi !== undefined && t > hi ? (hi - mid) / half : null;
    let v;
    if (edge === null) {
        v = p[0] + x * (p[1] + x * (p[2] + x * p[3]));
    } else {  // straight on from the edge: value + slope there
        v = p[0] + edge * (p[1] + edge * (p[2] + edge * p[3])) + (p[1] + edge * (2 * p[2] + edge * 3 * p[3])) * (x - edge);
    }
    const { omega, sin, cos } = s;
    for (let j = 0; j < omega.length; j++) {
        const w = omega[j] * t;
        v += sin[j] * Math.sin(w) + cos[j] * Math.cos(w);
    }
    return v;
}

// [x, y, z] km in the fit's frame (ICRF; planets Sun-centred, moons
// planet-centred) at t days from J2000 (TDB)
export function wavesPosition(body, t) {
    const { series } = body;
    const h = seriesValue(series.h, t, body), k = seriesValue(series.k, t, body);
    const p = seriesValue(series.p, t, body), q = seriesValue(series.q, t, body);
    const L = seriesValue(series.L, t, body), a = seriesValue(series.a, t, body);
    const e = Math.min(Math.hypot(h, k), E_MAX);
    const peri = Math.atan2(h, k);
    const node = Math.atan2(p, q);
    const inc = 2 * Math.atan(Math.hypot(p, q));
    const M = (((L - peri) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const E = solveKepler(M, e);
    const px = a * (Math.cos(E) - e);
    const py = a * Math.sqrt(1 - e * e) * Math.sin(E);
    const w = peri - node;
    const cw = Math.cos(w), sw = Math.sin(w), ci = Math.cos(inc), si = Math.sin(inc);
    const cn = Math.cos(node), sn = Math.sin(node);
    const x1 = cw * px - sw * py, y1 = sw * px + cw * py;
    const x = cn * x1 - sn * ci * y1, y = sn * x1 + cn * ci * y1, z = si * y1;
    // Retrograde moons are fitted in the frame turned 180 deg about x, where
    // they run forwards (tan(i/2) runs off near i = 180): turn back
    return body.flip ? [x, -y, -z] : [x, y, z];
}

// The Kepler ellipse through a position and velocity (any frame; units of
// r, r/day and mu = r^3/day^2): dt days from now -> [x, y, z] along it
export function keplerFromState(r, v, mu) {
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const rn = Math.hypot(...r);
    const h = cross(r, v);
    const ev = cross(v, h).map((c, i) => c / mu - r[i] / rn);  // eccentricity vector (to the closest point)
    const e = Math.min(Math.hypot(...ev), 0.999);
    const a = 1 / (2 / rn - dot(v, v) / mu);
    const hn = Math.hypot(...h);
    // Perifocal axes: P to the closest point, Q 90 deg on in the direction of motion
    const P = e > 1e-9 ? ev.map(c => c / Math.hypot(...ev)) : r.map(c => c / rn);
    const Q = cross(h.map(c => c / hn), P);
    // Where the body is now on the ellipse
    const cosNu = dot(P, r) / rn, sinNu = dot(Q, r) / rn;
    const E0 = Math.atan2(Math.sqrt(1 - e * e) * sinNu, e + cosNu);
    const M0 = E0 - e * Math.sin(E0);
    const n = Math.sqrt(mu / (a * a * a));
    const b = a * Math.sqrt(1 - e * e);
    return (dt) => {
        const E = solveKepler(M0 + n * dt, e);
        const x = a * (Math.cos(E) - e), y = b * Math.sin(E);
        return [x * P[0] + y * Q[0], x * P[1] + y * Q[1], x * P[2] + y * Q[2]];
    };
}
