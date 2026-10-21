// Moon positions (moons.json, built by Star_Data/scripts/build_moons.py),
// in AU relative to the parent planet, in the scene frame (J2000
// equatorial, north = +Y; see planets.js).
//
// Moons with an `orbit` (most: a wave fit to JPL Horizons through time,
// utils/waveOrbits.js) follow it: within ~50-150 km for regular moons over
// the years their Horizons solution covers, drifting slowly past them. The
// rest use one ellipse fitted to Horizons at an epoch (2026), turning at a
// mean motion measured over a year: accurate for years around the epoch,
// then drifting (Titan ~87,000 km off by 1900). Jupiter's four big moons
// come from astronomy-engine (galileanPositions; ~300-1,700 km over
// 1600-2500), except Io and Europa inside their fits' years, where the fit
// measured better (GALILEAN_FIT). Checked by scripts/check-planets.js.

import { JupiterMoons, MakeTime } from 'astronomy-engine';
import { keplerLine, sampleOrbit, setBarycentreOffset } from './planets.js';
import { seriesValue, wavesPosition } from './waveOrbits.js';
import { KM_PER_AU } from './universe3d.js';  // .js so node scripts can import this too

const DEG = Math.PI / 180;
const DAY_MS = 86400000;
const JD_UNIX_EPOCH = 2440587.5;

// ICRF vector -> scene [x, y, z] (north = +Y), as in planets.js
const toScene = (x, y, z) => [x, z, -y];

// Kepler's equation M = E - e sin E, solved for E (radians)
export function eccentricAnomaly(M, e) {
    let E = e < 0.8 ? M : Math.PI;
    for (let k = 0; k < 30; k++) {
        const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
        E -= dE;
        if (Math.abs(dE) < 1e-12) break;
    }
    return E;
}

// Pluto-Charon (moons.json `barycentres.Pluto`, set by setMoonSystems):
// {charon, fraction}: Charon's share of the system's mass
let plutoCharon = null;

// Install a moons.json's planet-moon systems: Pluto is placed off the
// Pluto-Charon barycentre (planets.js), opposite Charon, and the moons
// fitted around that barycentre (Nix, Hydra, Kerberos, Styx: orbit.about)
// are placed from it. Call once moons.json is loaded.
export function setMoonSystems(data) {
    const b = data?.barycentres?.Pluto;
    const charon = b && data.moons.find(m => m.code === b.moon);
    plutoCharon = charon ? { charon, fraction: b.fraction } : null;
    setBarycentreOffset('Pluto', plutoCharon && ((date) => {
        const c = moonPosition(plutoCharon.charon, date);
        return [-c[0] * plutoCharon.fraction, -c[1] * plutoCharon.fraction, -c[2] * plutoCharon.fraction];
    }));
}

// Galilean moons whose wave fit beat astronomy-engine at unseen Horizons
// positions over 1600-2200 (2026-10-20): Io 568 km vs 1,735, Europa 666 vs
// 968. Ganymede (933 vs 640) and Callisto (2,030 vs 915) stay on
// astronomy-engine, and all four do outside their fits' years.
const GALILEAN_FIT = new Set(['Io', 'Europa']);
const isGalileanMoon = (m) => m.planet === 'Jupiter' && GALILEAN.includes(m.name);

// One moon (a moons.json entry) at a Date: [x, y, z] AU from its planet
export function moonPosition(m, date) {
    if (isGalileanMoon(m)) {
        const t = m.orbit && MakeTime(date).tt;
        if (!(GALILEAN_FIT.has(m.name) && m.orbit && t >= m.orbit.lo && t <= m.orbit.hi)) {
            return galileanPositions(date)[m.name];
        }
    }
    if (m.orbit) {
        const [x, y, z] = wavesPosition(m.orbit, MakeTime(date).tt);  // TT ~ TDB, as planets.js
        const p = toScene(x / KM_PER_AU, y / KM_PER_AU, z / KM_PER_AU);
        if (m.orbit.about === 'barycentre' && plutoCharon) {
            // From the barycentre; Pluto sits -fraction x Charon from it
            const c = moonPosition(plutoCharon.charon, date);
            return [p[0] + c[0] * plutoCharon.fraction, p[1] + c[1] * plutoCharon.fraction, p[2] + c[2] * plutoCharon.fraction];
        }
        return p;
    }
    return ellipsePosition(m, date);
}

// The fixed ellipse: elements are ICRF, so rotate the orbit-plane ellipse
// by w, i, node
function ellipsePosition(m, date) {
    const days = date.getTime() / DAY_MS + JD_UNIX_EPOCH - m.epoch_jd;
    const M = ((((m.M + m.n * days) % 360) + 360) % 360) * DEG;
    const E = eccentricAnomaly(M, m.e);
    const a = m.a_km / KM_PER_AU;
    const px = a * (Math.cos(E) - m.e);
    const py = a * Math.sqrt(1 - m.e * m.e) * Math.sin(E);

    const cw = Math.cos(m.w * DEG), sw = Math.sin(m.w * DEG);
    const ci = Math.cos(m.i * DEG), si = Math.sin(m.i * DEG);
    const cn = Math.cos(m.node * DEG), sn = Math.sin(m.node * DEG);
    const x1 = cw * px - sw * py;     // turn by w in the orbit plane
    const y1 = sw * px + cw * py;
    const y2 = ci * y1;               // tilt by i
    const z2 = si * y1;
    return toScene(cn * x1 - sn * y2, sn * x1 + cn * y2, z2);  // turn by node
}

// Io, Europa, Ganymede, Callisto from astronomy-engine:
// {name: [x, y, z]} AU from Jupiter
export const GALILEAN = ['Io', 'Europa', 'Ganymede', 'Callisto'];
export function galileanPositions(date) {
    const info = JupiterMoons(date);
    const out = {};
    for (const name of GALILEAN) {
        const v = info[name.toLowerCase()];
        out[name] = toScene(v.x, v.y, v.z);
    }
    return out;
}

// Where a moon's position comes from, for its info card:
//   {kind: 'fit', years: [from, to], worstKm}   Horizons wave fit (carried on outside those years)
//   {kind: 'fit+engine', years, worstKm}        Io, Europa: the fit inside its years, astronomy-engine outside
//   {kind: 'engine'}                            Ganymede, Callisto: astronomy-engine
//   {kind: 'ellipse'}                           one orbit fitted for 2026
export function moonPositionSource(m) {
    const years = m.orbit && [m.orbit.lo, m.orbit.hi].map(t => Math.round(2000 + t / 365.25));
    if (isGalileanMoon(m)) {
        return GALILEAN_FIT.has(m.name) && m.orbit ? { kind: 'fit+engine', years, worstKm: m.orbit.check?.worst_km } : { kind: 'engine' };
    }
    if (m.orbit) return { kind: 'fit', years, worstKm: m.orbit.check?.worst_km };
    return { kind: 'ellipse' };
}

// A moon's mean anomaly (degrees from its closest point) at a Date: from its
// wave fit where it has one (L minus the closest point's longitude), else
// the fixed ellipse's
export function moonMeanAnomaly(m, date) {
    if (m.orbit) {
        const t = MakeTime(date).tt;
        const s = m.orbit.series;
        const M = seriesValue(s.L, t, m.orbit) - Math.atan2(seriesValue(s.h, t, m.orbit), seriesValue(s.k, t, m.orbit));
        return ((M / DEG % 360) + 360) % 360;
    }
    const days = date.getTime() / DAY_MS + JD_UNIX_EPOCH - m.epoch_jd;
    return (((m.M + m.n * days) % 360) + 360) % 360;
}

// A moon's mean orbit size (km) and mean motion (degrees/day): from its
// wave fit where it has one (the cubic's middle value and slope), else the
// fixed ellipse's. The fixed ellipse's size is wrong for Pluto's small
// moons (worked out from Pluto's centre, which Charon swings around: Styx
// came out at 92,000 km for ~43,000)
export function moonMeanOrbit(m) {
    if (!m.orbit) return { aKm: m.a_km, n: m.n };
    const { a, L } = m.orbit.series;
    const n = L.poly[1] / m.orbit.half / DEG;
    return { aKm: a.poly[0], n: Math.abs(n) };  // positive, as moons.json `n` (L grows for retrograde orbits too)
}

// Orbital period in days of a moons.json moon
export const moonPeriodDays = (m) => 360 / Math.abs(moonMeanOrbit(m).n);

// One orbit as a closed loop around `date`, flat [x, y, z, ...] AU from the
// planet. Points bunch up near the moon, like orbitPath in planets.js; a
// wave-fit moon's line is keplerLine (planets.js) on its fit, with the
// planet's pull from the moon's own mean motion and orbit size
// (mu = n^2 a^3: the bulge-strengthened pull it really feels).
export function moonOrbitLoop(m, date, segments = 256) {
    const periodMs = moonPeriodDays(m) * DAY_MS;
    if (!m.orbit) return sampleOrbit(d => moonPosition(m, d), date, periodMs, segments);
    const { aKm, n: nDeg } = moonMeanOrbit(m);
    const n = nDeg * DEG, a = aKm / KM_PER_AU;
    return keplerLine(d => moonPosition(m, d), date, periodMs, n * n * a * a * a, segments);
}


