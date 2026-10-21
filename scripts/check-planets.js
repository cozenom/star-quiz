// Checks src/utils/planets.js (with public/data/planet_orbits.json),
// src/utils/moons.js (with public/data/moons.json) and
// src/utils/smallBodies.js (with public/data/small_bodies*) against JPL
// Horizons.
//
// Reference positions come from Star_Data (run there first, skypy env):
//   python scripts/tools/planet_reference.py
//   python scripts/tools/moon_reference.py
//   python scripts/tools/small_body_reference.py
// Then here:
//   node scripts/check-planets.js
//
// Planets: at dates over 1600-2500, compares where each body appears from
// Earth (RA/Dec) and how far it is from the Sun, for planet_orbits.json
// and, for comparison, astronomy-engine alone (what the app falls back
// to). RA/Dec go through the scene frame, so this also checks that planets
// line up with the stars (raDecToXYZ).

import { existsSync, readFileSync } from 'node:fs';
import { MakeTime } from 'astronomy-engine';
import { moonPosition, setMoonSystems } from '../src/utils/moons.js';
import { geocentricMoon, heliocentricPosition, setPlanetOrbits, SOLAR_SYSTEM_BODIES } from '../src/utils/planets.js';
import { attachSmallBodyHistory, attachSmallBodyOrbits, historyYears, smallBodyPosition } from '../src/utils/smallBodies.js';

const REF = '../../Star_Data/output/planet_reference.json';  // relative to this file
const ref = JSON.parse(readFileSync(new URL(REF, import.meta.url)));
const planetOrbits = JSON.parse(readFileSync(new URL('../public/data/planet_orbits.json', import.meta.url)));

// Scene frame (north = +Y, see raDecToXYZ) -> unit direction in ICRS (north = +Z)
const sceneToIcrs = ([x, y, z]) => [x, -z, y];
const sub = (a, b) => a.map((v, i) => v - b[i]);
const norm = (v) => Math.hypot(...v);
const KM_PER_AU = 149597870.7;

// Angle between two vectors, arcseconds
function separationArcsec(a, b) {
    const cos = a.reduce((s, v, i) => s + v * b[i], 0) / (norm(a) * norm(b));
    return Math.acos(Math.min(1, Math.max(-1, cos))) * 180 / Math.PI * 3600;
}

// The Date whose TT (astronomy-engine's Delta T, as planets.js uses) is
// the reference's TDB (TDB - TT < 2 ms)
function dateAtTdb(jd) {
    const tt = jd - 2451545;
    let ut = tt;
    for (let i = 0; i < 4; i++) ut += tt - MakeTime(ut).tt;
    return MakeTime(ut).date;
}

// Limit (arcsec on the sky from Earth) for planet_orbits.json. Expected
// worst (2026-10-20 build): ~4" (Pluto 76,000 km off at 28 AU; Mars at
// opposition). Earth's own error (~200 km, VSOP87) is in every planet's.
// The Moon is astronomy-engine's either way: ~45" (76 km) at worst, at
// the 1600 and 2500 ends. For scale, one pixel at the default 60 deg FOV
// is ~200".
const LIMIT = { default: 5, Moon: 60 };

// Worst over all dates, per body: {sky, km, date} for the model and for
// astronomy-engine alone
const worst = {};
const track = (key, body, sky, km, iso) => {
    const w = (worst[body] ??= {});
    if (!w[key] || sky > w[key].sky) w[key] = { sky, km: Math.max(km, w[key]?.km ?? 0), date: iso };
    else w[key].km = Math.max(km, w[key].km);
};
for (const [key, orbits] of [['model', planetOrbits], ['engine', null]]) {
    setPlanetOrbits(orbits);
    ref.jd_tdb.forEach((jd, d) => {
        const date = dateAtTdb(jd);
        const earth = sceneToIcrs(heliocentricPosition('Earth', date));
        const refEarth = ref.helio.Earth[d];
        for (const body of SOLAR_SYSTEM_BODIES) {
            const mine = sceneToIcrs(heliocentricPosition(body, date));
            const theirs = ref.helio[body][d];
            const sky = body === 'Earth'
                ? separationArcsec(mine, theirs)  // Earth: direction from the Sun
                : separationArcsec(sub(mine, earth), sub(theirs, refEarth));
            track(key, body, sky, norm(sub(mine, theirs)) * KM_PER_AU, ref.dates[d]);
        }
        const moon = sceneToIcrs(geocentricMoon(date));
        track(key, 'Moon', separationArcsec(moon, ref.moon[d]), norm(sub(moon, ref.moon[d])) * KM_PER_AU, ref.dates[d]);
    });
}
setPlanetOrbits(planetOrbits);

let failed = false;
console.log(`Planets vs JPL Horizons, ${ref.jd_tdb.length} dates 1600-2500, worst seen from Earth (limit ${LIMIT.default}", Moon ${LIMIT.Moon}"):`);
console.log(`  ${''.padEnd(13)}${'planet_orbits.json'.padEnd(38)}astronomy-engine alone`);
const fmtKm = (km) => `${Math.round(km).toLocaleString()} km`;
for (const [body, { model, engine }] of Object.entries(worst)) {
    const limit = LIMIT[body] ?? LIMIT.default;
    const ok = model.sky <= limit;
    if (!ok) failed = true;
    console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${body.padEnd(8)}${model.sky.toFixed(2).padStart(7)}"  ${fmtKm(model.km).padStart(12)}  ${model.date.slice(0, 4)}` +
        `        ${engine.sky.toFixed(2).padStart(7)}"  ${fmtKm(engine.km).padStart(12)}  ${engine.date.slice(0, 4)}`);
}
console.log('  (km: worst distance from the true position, Sun-centred)');

// ---------- Moons (utils/moons.js) vs JPL Horizons ----------
// Reference: Star_Data scripts/tools/moon_reference.py, at dates over
// 1650-2450 where each moon's Horizons solution has them ('-' elsewhere).
// Wave-fit moons (moons.json `orbit`) must be within MOON_FIT_LIMIT_DEG at
// every date inside their fitted years; past those (straight-line
// continuation, see waveOrbits.js) they are shown, not judged. Moons on the
// fixed 2026 ellipse only must be within MOON_LIMIT_DEG in 2026 (Phobos'
// orbit turns round every ~1-2 years: ~3.5 deg off in 2026 on one).
// The "fixed" column is that ellipse's worst at the same dates, for
// comparison.
const MOON_FIT_LIMIT_DEG = 0.5;
const MOON_LIMIT_DEG = 5;
const moonRef = JSON.parse(readFileSync(new URL('../../Star_Data/output/moon_reference.json', import.meta.url)));
const moonsData = JSON.parse(readFileSync(new URL('../public/data/moons.json', import.meta.url)));
const moonByCode = new Map(moonsData.moons.map(m => [String(m.code), m]));
setMoonSystems(moonsData);  // as the app: Pluto off the Pluto-Charon barycentre, Nix & co. from it
const jdToDate = (jd) => new Date((jd - 2440587.5) * 86400000);  // (small bodies below: UTC JDs)
const moonDates = moonRef.dates.map(dateAtTdb);
const years = moonDates.map(d => d.getUTCFullYear());

console.log(`\nMoons, angle seen from the planet (wave fits: limit ${MOON_FIT_LIMIT_DEG} deg inside their years; fixed ellipse: ${MOON_LIMIT_DEG} deg in 2026):`);
console.log(`  ${''.padEnd(13)}${years.map(y => String(y).padStart(7)).join('')}   worst km (fixed ellipse)`);
for (const [code, refs] of Object.entries(moonRef.moons)) {
    const m = moonByCode.get(code);
    if (!m) continue;
    const fixed = { ...m, orbit: undefined };
    let ok = true, worstKm = 0, worstFixedKm = 0;
    const cells = refs.map((ref, d) => {
        if (!ref) return '-'.padStart(7);
        const mine = sceneToIcrs(moonPosition(m, moonDates[d])).map(v => v * KM_PER_AU);
        const deg = separationArcsec(mine, ref) / 3600;
        worstKm = Math.max(worstKm, norm(sub(mine, ref)));
        worstFixedKm = Math.max(worstFixedKm, norm(sub(sceneToIcrs(moonPosition(fixed, moonDates[d])).map(v => v * KM_PER_AU), ref)));
        const t = moonRef.dates[d] - 2451545;
        const inside = m.orbit && t >= m.orbit.lo && t <= m.orbit.hi;
        if (m.orbit ? inside && deg > MOON_FIT_LIMIT_DEG : years[d] === 2026 && deg > MOON_LIMIT_DEG) ok = false;
        return `${deg < 10 ? deg.toFixed(2) : deg.toFixed(0)}°${m.orbit && !inside ? '*' : ' '}`.padStart(7);
    });
    if (!ok) failed = true;
    console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${m.name.padEnd(8)}${cells.join('')}   ${fmtKm(worstKm).padStart(10)} (${fmtKm(worstFixedKm)})`);
}
console.log('  * past the moon\'s Horizons years (carried on, not judged)');

// ---------- Named small bodies (utils/smallBodies.js) vs JPL Horizons ----------
// Reference: Star_Data scripts/tools/small_body_reference.py. Each position
// blends two-body orbits from the two nearest Horizons samples
// (small_bodies_history.bin); the error is shown as km and as the angle
// seen from the Sun, and must stay under SMALL_BODY_LIMIT_DEG wherever the
// history covers the date. "(no history)" shows the single 2026 SBDB orbit
// for comparison. Bennu's history covers only 1900-2135 ("-").
const SMALL_BODY_LIMIT_DEG = 0.05;
const sbRef = JSON.parse(readFileSync(new URL('../../Star_Data/output/small_body_reference.json', import.meta.url)));
const sbMeta = JSON.parse(readFileSync(new URL('../public/data/small_bodies.json', import.meta.url)));
const sbPlain = JSON.parse(JSON.stringify(sbMeta.named)).map(({ orbit, ...b }) => b);  // without history or wave fit: the 2026 SBDB orbit alone
const historyFile = readFileSync(new URL('../public/data/small_bodies_history.bin', import.meta.url));
attachSmallBodyHistory(sbMeta, historyFile.buffer.slice(historyFile.byteOffset, historyFile.byteOffset + historyFile.length));
const sbOrbits = new URL('../public/data/small_body_orbits.json', import.meta.url);  // optional, as in the app
if (existsSync(sbOrbits)) attachSmallBodyOrbits(sbMeta, JSON.parse(readFileSync(sbOrbits)));
const sbYears = sbRef.dates.map(jd => jdToDate(jd).getUTCFullYear());
const curated = JSON.parse(readFileSync(new URL('../../Star_Data/curated/small_bodies.json', import.meta.url))).bodies;
const KM_PER_AU_ = 149597870.7;

console.log(`\nNamed small bodies, error vs Horizons in km (angle from the Sun; limit ${SMALL_BODY_LIMIT_DEG} deg):`);
console.log(`  ${''.padEnd(19)}${sbYears.map(y => String(y).padStart(15)).join('')}`);
for (const [sstr, refs] of Object.entries(sbRef.bodies)) {
    const k = curated.findIndex(c => c.sstr === sstr);
    const b = sbMeta.named[k];
    const cells = [], plainCells = [];
    let ok = true;
    refs.forEach((ref, d) => {
        if (!ref) {
            cells.push('-'.padStart(15));
            plainCells.push('-'.padStart(15));
            return;
        }
        const date = jdToDate(sbRef.dates[d]);
        const r = sceneToIcrs(smallBodyPosition(b, date));
        const p = sceneToIcrs(smallBodyPosition(sbPlain[k], date));
        const err = norm(sub(r, ref)), plainErr = norm(sub(p, ref));
        const deg = err / norm(ref) * 180 / Math.PI;
        const [y0, y1] = historyYears(b);
        if (sbYears[d] >= y0 && sbYears[d] <= y1 && deg > SMALL_BODY_LIMIT_DEG) ok = false;
        cells.push(`${Math.round(err * KM_PER_AU_).toLocaleString('en')} (${deg.toFixed(3)}°)`.padStart(15));
        plainCells.push(`${(plainErr / norm(ref) * 180 / Math.PI).toFixed(2)}°`.padStart(15));
    });
    if (!ok) failed = true;
    console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${b.name.slice(0, 14).padEnd(14)}${cells.join('')}`);
    console.log(`       ${'(no history)'.padEnd(14)}${plainCells.join('')}`);
}

process.exit(failed ? 1 : 0);
