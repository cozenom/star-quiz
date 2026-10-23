// Helpers for the 3D Universe mode.
// Scene units are light-years, with the Sun at the origin and celestial
// north (Dec +90) along +Y.

export const LY_PER_PARSEC = 3.26156;
export const AU_PER_LY = 63241.077;
export const KM_PER_AU = 149597870.7;
const SUN_ABS_MAG_V = 4.83;

// Largest 1, 2 or 5 x 10^n that fits under max
function niceNumber(max) {
    const base = Math.pow(10, Math.floor(Math.log10(max)));
    return [5, 2, 1].map(m => m * base).find(v => v <= max) ?? base;
}

const formatNice = (v) => v.toLocaleString(undefined, { maximumSignificantDigits: 1 });

// Scale bar: the longest round distance that fits in maxLy, in a unit that
// suits it. Returns {lengthLy, label}.
export function scaleBarDistance(maxLy) {
    const au = maxLy * AU_PER_LY;
    if (maxLy >= 0.1) {
        const v = niceNumber(maxLy);
        return { lengthLy: v, label: `${formatNice(v)} ly` };
    }
    if (au >= 0.1) {
        const v = niceNumber(au);
        return { lengthLy: v / AU_PER_LY, label: `${formatNice(v)} AU` };
    }
    const v = niceNumber(au * KM_PER_AU);
    return { lengthLy: v / KM_PER_AU / AU_PER_LY, label: `${formatNice(v)} km` };
}

// Equatorial (RA hours, Dec degrees, distance ly) -> scene xyz.
// Mapping x = cos(ra), z = -sin(ra) keeps the sky un-mirrored when viewed
// from the origin: with north up, RA increases to the left (east).
export function raDecToXYZ(raHours, decDeg, distLy) {
    const ra = raHours * 15 * Math.PI / 180;
    const dec = decDeg * Math.PI / 180;
    const cosDec = Math.cos(dec);
    return [
        distLy * cosDec * Math.cos(ra),
        distLy * Math.sin(dec),
        -distLy * cosDec * Math.sin(ra),
    ];
}

// Apparent magnitude seen from Earth -> absolute magnitude (seen from 10 pc).
// The shader turns this back into apparent magnitude from the camera.
export function absoluteMagnitude(mag, distLy) {
    const distPc = distLy / LY_PER_PARSEC;
    return mag - 5 * Math.log10(distPc) + 5;
}

// B-V colour index -> effective temperature (Ballesteros 2012)
function bvToTemperature(bv) {
    return 4600 * (1 / (0.92 * bv + 1.7) + 1 / (0.92 * bv + 0.62));
}

// Bolometric correction BC_V for an effective temperature (K): what turns
// a visual absolute magnitude into a bolometric one (light at all
// wavelengths). Flower 1996's polynomials in log T, with the corrected
// coefficients of Torres 2010 (AJ 140, 1158, Table 1). Cool stars put most
// of their light out in the infrared, so their BC is strongly negative.
const BC_COEFFS = [
    [3.70, [-0.190537291496456e5, 0.155144866764412e5, -0.421278819301717e4, 0.381476328422343e3]],
    [3.90, [-0.370510203809015e5, 0.385672629965804e5, -0.150651486316025e5, 0.261724637119416e4, -0.170623810323864e3]],
    [Infinity, [-0.118115450538963e6, 0.137145973583929e6, -0.636233812100225e5, 0.147412923562646e5,
        -0.170587278406872e4, 0.788731721804990e2]],
];

export function bolometricCorrection(kelvin) {
    const logT = Math.log10(kelvin);
    const coeffs = BC_COEFFS.find(([upTo]) => logT < upTo)[1];
    return coeffs.reduce((sum, c, i) => sum + c * Math.pow(logT, i), 0);
}

// Solar values for the radius estimate (IAU 2015 nominal M_bol; Teff)
const SUN_M_BOL = 4.74;
const SUN_TEFF = 5772;

// M stars: B-V barely changes below ~3,800 K (molecular bands), so their
// temperature comes from the spectral subtype instead. Approximate scales,
// subtypes 0..9: giants/supergiants (van Belle et al. 1999 style), dwarfs
// (Mamajek's mean dwarf table).
const M_GIANT_TEFF = [3850, 3730, 3660, 3560, 3430, 3300, 3200, 3100, 2950, 2800];
const M_DWARF_TEFF = [3850, 3660, 3560, 3430, 3210, 3060, 2810, 2680, 2570, 2380];

function spectralTemperature(spect) {
    const m = /^(sd)?M(\d(?:\.\d)?)/.exec(spect ?? '');
    if (!m) return null;
    const subtype = Math.min(9, Number(m[2]));
    const dwarf = m[1] || /^[^I]*V/.test(spect.slice(m[0].length));
    const scale = dwarf ? M_DWARF_TEFF : M_GIANT_TEFF;
    const i = Math.floor(subtype);
    return scale[i] + (scale[Math.min(9, i + 1)] - scale[i]) * (subtype - i);
}

// Estimated radius (solar radii) from magnitude, distance, B-V and spectral
// type: luminosity from the bolometric magnitude, temperature from B-V (or
// the spectral subtype for M stars), then R = sqrt(L) (T_sun / T)^2.
// Ignores dust, so distant stars come out too small. null without a colour
// or a distance.
export function estimateRadius(mag, distLy, bv, spect) {
    if (bv === null || bv === undefined || !(distLy > 0)) return null;
    // Only for stars that are red too (Capella is listed "M1: comp" but is a pair of yellow giants)
    const t = (bv >= 1.3 ? spectralTemperature(spect) : null) ?? bvToTemperature(Math.max(-0.4, Math.min(2.0, bv)));
    const mBol = absoluteMagnitude(mag, distLy) + bolometricCorrection(t);
    const lum = Math.pow(10, -0.4 * (mBol - SUN_M_BOL));
    return Math.sqrt(lum) * Math.pow(SUN_TEFF / t, 2);
}

// Temperature (K) -> RGB in 0..1 (Tanner Helland's blackbody approximation)
function temperatureToRGB(kelvin) {
    const t = kelvin / 100;
    let r, g, b;
    if (t <= 66) {
        r = 255;
        g = 99.4708025861 * Math.log(t) - 161.1195681661;
        b = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
    } else {
        r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
        g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
        b = 255;
    }
    const clamp = (v) => Math.min(255, Math.max(0, v)) / 255;
    return [clamp(r), clamp(g), clamp(b)];
}

// B-V -> star tint. Mixed toward white so colours read as starlight, not paint.
export function bvToColor(bv) {
    if (bv === null || bv === undefined) return [1, 1, 1];
    const [r, g, b] = temperatureToRGB(bvToTemperature(Math.max(-0.4, Math.min(2.0, bv))));
    const mix = 0.35;
    return [r + (1 - r) * mix, g + (1 - g) * mix, b + (1 - b) * mix];
}

// stars_3d.json ({fields, stars: [[...]], radii: {hip: {radius, ref}}}) ->
// typed arrays for the GPU, a hip -> index map for drawing constellation
// lines, and index -> {radius (solar radii), ref} for the curated radii.
export function buildStarBuffers(stars3d) {
    const f = Object.fromEntries(stars3d.fields.map((name, i) => [name, i]));
    const count = stars3d.stars.length;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const absMags = new Float32Array(count);
    const hipToIndex = new Map();

    stars3d.stars.forEach((row, i) => {
        const [x, y, z] = raDecToXYZ(row[f.ra], row[f.dec], row[f.dist]);
        positions.set([x, y, z], i * 3);
        colors.set(bvToColor(row[f.bv]), i * 3);
        absMags[i] = absoluteMagnitude(row[f.mag], row[f.dist]);
        hipToIndex.set(row[f.hip], i);
    });

    // Radius (solar radii) per star: curated where known, else estimated
    // (NaN without a colour or distance)
    const radii = new Map();
    for (const [hip, r] of Object.entries(stars3d.radii ?? {})) {
        const index = hipToIndex.get(Number(hip));
        if (index !== undefined) radii.set(index, r);
    }
    const radius = new Float32Array(count);
    stars3d.stars.forEach((row, i) => {
        radius[i] = radii.get(i)?.radius ?? estimateRadius(row[f.mag], row[f.dist], row[f.bv], row[f.spect]) ?? NaN;
    });

    return { positions, colors, absMags, hipToIndex, radii, radius, count, rows: stars3d.stars, fieldIndex: f };
}

// stars_gaia.bin rows (float32: ra hours, dec deg, dist ly, V, B-V or NaN)
// -> typed arrays for the GPU. These stars have no catalogue rows to pick.
const GAIA_STRIDE = 5;
// The GCNS sphere is complete down to faint red dwarfs, while the Gaia stars
// beyond it (utils/farStars) stop at G 11.5 by default. Only the GCNS stars
// that bright keep the "too faint to see" dim-dot floor (the shader's
// uMinAlpha); the fainter ones show only when really visible from the
// camera, so the sphere's edge doesn't show. V 12 is about G 11.5 for the
// red dwarfs that make up most of it (G is brighter than V for red stars).
export const GAIA_FLOOR_V = 12;

// -> {bright, faint}: each {positions, colors, absMags, count}; bright =
// brighter than vLimit (V, as seen from Earth)
export function buildGaiaBuffers(rows, vLimit = GAIA_FLOOR_V) {
    const total = rows.length / GAIA_STRIDE;
    const isBright = (i) => rows[i * GAIA_STRIDE + 3] < vLimit;
    let nBright = 0;
    for (let i = 0; i < total; i++) if (isBright(i)) nBright++;
    const make = (count) => ({
        positions: new Float32Array(count * 3), colors: new Float32Array(count * 3), absMags: new Float32Array(count), count,
    });
    const bright = make(nBright);
    const faint = make(total - nBright);
    let b = 0, f = 0;
    for (let i = 0; i < total; i++) {
        const [ra, dec, dist, mag, bv] = rows.subarray(i * GAIA_STRIDE, (i + 1) * GAIA_STRIDE);
        const out = isBright(i) ? bright : faint;
        const k = isBright(i) ? b++ : f++;
        out.positions.set(raDecToXYZ(ra, dec, dist), k * 3);
        out.colors.set(bvToColor(Number.isNaN(bv) ? null : bv), k * 3);
        out.absMags[k] = absoluteMagnitude(mag, dist);
    }
    return { bright, faint };
}

// One star's catalogue row as an object ({hip, ra, dec, mag, dist, err, src,
// bv, spect, name, radius, radiusRef, radiusMethod, radiusBib}): radius in
// solar radii (null if it can't be estimated); for one from stars_3d.json
// "radii", its reference, method ("lit" published radius, "diam" measured
// angular diameter x our distance) and ADS bibcode (diam only). All null
// for an estimate.
export function starRecord(starBuffers, index) {
    const row = starBuffers.rows[index];
    const radius = starBuffers.radius[index];
    const known = starBuffers.radii.get(index);
    return {
        ...Object.fromEntries(Object.entries(starBuffers.fieldIndex).map(([name, i]) => [name, row[i]])),
        radius: Number.isNaN(radius) ? null : radius,
        radiusRef: known?.ref ?? null,
        radiusMethod: known?.method ?? null,
        radiusBib: known?.bib ?? null,
    };
}

// hip -> what the constellation data knows about a line star
// ({bayer, name, origin, culturalGroup, constellations: [names]})
export function buildLineStarInfo(constellationData) {
    const info = new Map();
    for (const c of Object.values(constellationData)) {
        for (const star of c.stars) {
            const hip = Number(star.hip);
            const entry = info.get(hip) || {
                bayer: star.bayer,
                name: star.name,
                origin: star.origin,
                culturalGroup: star.cultural_group,
                constellations: [],
            };
            entry.constellations.push(c.name);
            info.set(hip, entry);
        }
    }
    return info;
}

const GENITIVES = {
    And: 'Andromedae', Ant: 'Antliae', Aps: 'Apodis', Aql: 'Aquilae', Aqr: 'Aquarii', Ara: 'Arae',
    Ari: 'Arietis', Aur: 'Aurigae', Boo: 'Boötis', CMa: 'Canis Majoris', CMi: 'Canis Minoris',
    CVn: 'Canum Venaticorum', Cae: 'Caeli', Cam: 'Camelopardalis', Cap: 'Capricorni', Car: 'Carinae',
    Cas: 'Cassiopeiae', Cen: 'Centauri', Cep: 'Cephei', Cet: 'Ceti', Cha: 'Chamaeleontis', Cir: 'Circini',
    Cnc: 'Cancri', Col: 'Columbae', Com: 'Comae Berenices', CrA: 'Coronae Australis', CrB: 'Coronae Borealis',
    Crt: 'Crateris', Cru: 'Crucis', Crv: 'Corvi', Cyg: 'Cygni', Del: 'Delphini', Dor: 'Doradus',
    Dra: 'Draconis', Equ: 'Equulei', Eri: 'Eridani', For: 'Fornacis', Gem: 'Geminorum', Gru: 'Gruis',
    Her: 'Herculis', Hor: 'Horologii', Hya: 'Hydrae', Hyi: 'Hydri', Ind: 'Indi', LMi: 'Leonis Minoris',
    Lac: 'Lacertae', Leo: 'Leonis', Lep: 'Leporis', Lib: 'Librae', Lup: 'Lupi', Lyn: 'Lyncis', Lyr: 'Lyrae',
    Men: 'Mensae', Mic: 'Microscopii', Mon: 'Monocerotis', Mus: 'Muscae', Nor: 'Normae', Oct: 'Octantis',
    Oph: 'Ophiuchi', Ori: 'Orionis', Pav: 'Pavonis', Peg: 'Pegasi', Per: 'Persei', Phe: 'Phoenicis',
    Pic: 'Pictoris', PsA: 'Piscis Austrini', Psc: 'Piscium', Pup: 'Puppis', Pyx: 'Pyxidis', Ret: 'Reticuli',
    Scl: 'Sculptoris', Sco: 'Scorpii', Sct: 'Scuti', Ser: 'Serpentis', Sex: 'Sextantis', Sge: 'Sagittae',
    Sgr: 'Sagittarii', Tau: 'Tauri', Tel: 'Telescopii', TrA: 'Trianguli Australis', Tri: 'Trianguli',
    Tuc: 'Tucanae', UMa: 'Ursae Majoris', UMi: 'Ursae Minoris', Vel: 'Velorum', Vir: 'Virginis',
    Vol: 'Volantis', Vul: 'Vulpeculae',
};
const SUPERSCRIPTS = '⁰¹²³⁴⁵⁶⁷⁸⁹';

// "θ2_Tau" -> "θ² Tau (Theta² Tauri)", the form the study notes use
export function formatBayer(bayer) {
    if (!bayer) return null;
    const m = bayer.match(/^(.)(\d*)_(\w+)$/);
    const spelled = m && GREEK_NAMES[m[1]];
    if (!spelled || !GENITIVES[m[3]]) return bayer.replace(/_/g, ' ');
    const sup = [...m[2]].map(d => SUPERSCRIPTS[d]).join('');
    return `${m[1]}${sup} ${m[3]} (${spelled[0].toUpperCase()}${spelled.slice(1)}${sup} ${GENITIVES[m[3]]})`;
}

const CLASS_COLOUR = {
    O: 'blue', B: 'blue-white', A: 'white', F: 'yellow-white', G: 'yellow',
    K: 'orange', M: 'red', C: 'red carbon', N: 'red carbon', R: 'red carbon', S: 'red', W: 'Wolf-Rayet',
};

// Checked in order, so longer codes come before their prefixes
const LUMINOSITY_CLASSES = [
    ['Ia0', 'hypergiant'], ['Ia+', 'hypergiant'], ['Iab', 'supergiant'], ['Ia', 'supergiant'],
    ['Ib', 'supergiant'], ['IV', 'subgiant'], ['VI', 'subdwarf'], ['V', 'main-sequence star'],
    ['III', 'giant'], ['II', 'bright giant'], ['I', 'supergiant'],
];
const LUMINOSITY_RE = new RegExp(LUMINOSITY_CLASSES.map(([code]) => code.replace('+', '\\+')).join('|'));

// Spectral type ("M2Ib", "G8IIIvar", "sdM4") -> plain English ("red supergiant")
export function describeSpectralType(spect) {
    if (!spect) return null;
    if (/^D/.test(spect)) return 'white dwarf';
    const isSubdwarf = spect.startsWith('sd');
    const letter = spect.replace(/^sd/, '')[0];
    const colour = CLASS_COLOUR[letter];
    if (!colour) return null;
    if (isSubdwarf) return `${colour} subdwarf`;

    const code = spect.slice(1).match(LUMINOSITY_RE)?.[0];
    const kind = LUMINOSITY_CLASSES.find(([c]) => c === code)?.[1];
    if (!kind) return `${colour} star`;
    if (kind === 'main-sequence star' && (letter === 'K' || letter === 'M')) return `${colour} dwarf`;
    return `${colour} ${kind}`;
}

// Parallax error is symmetric in parallax, so the distance range is
// d / (1 + err) .. d / (1 - err). Above 100% error there is no upper bound.
export function distanceRange(dist, err) {
    return { low: dist / (1 + err), high: err < 1 ? dist / (1 - err) : null };
}

// How bright the star really is, in visible light, relative to the Sun
export function luminosityVsSun(mag, dist) {
    return Math.pow(10, -0.4 * (absoluteMagnitude(mag, dist) - SUN_ABS_MAG_V));
}

// Line segment endpoints (flat xyz array) for one constellation's stick figure.
// Lines whose stars are missing from the 3D catalogue are skipped.
export function constellationLinePositions(constellation, starBuffers) {
    const { positions, hipToIndex } = starBuffers;
    const out = [];
    for (const [a, b] of constellation.lines) {
        const ia = hipToIndex.get(Number(constellation.stars[a].hip));
        const ib = hipToIndex.get(Number(constellation.stars[b].hip));
        if (ia === undefined || ib === undefined) continue;
        out.push(
            positions[ia * 3], positions[ia * 3 + 1], positions[ia * 3 + 2],
            positions[ib * 3], positions[ib * 3 + 1], positions[ib * 3 + 2],
        );
    }
    return out;
}

// ---------- Search ----------

// One decimal, without "-0.0" for magnitudes like -0.01
const formatMag = (mag) => (Math.abs(mag) < 0.05 ? '0.0' : mag.toFixed(1));

const GREEK_NAMES = {
    α: 'alpha', β: 'beta', γ: 'gamma', δ: 'delta', ε: 'epsilon', ζ: 'zeta', η: 'eta', θ: 'theta',
    ι: 'iota', κ: 'kappa', λ: 'lambda', μ: 'mu', ν: 'nu', ξ: 'xi', ο: 'omicron', π: 'pi',
    ρ: 'rho', σ: 'sigma', τ: 'tau', υ: 'upsilon', φ: 'phi', χ: 'chi', ψ: 'psi', ω: 'omega',
};
const SUPERSCRIPT_DIGITS = { '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };

// Lowercase, Greek letters spelled out, accents and punctuation dropped:
// "α¹ Cen" -> "alpha1 cen", "Achernar" -> "achernar"
export function normalizeSearchText(text) {
    return text
        .toLowerCase()
        .replace(/[α-ω]/g, ch => GREEK_NAMES[ch] ?? ch)
        .replace(/[¹²³⁴⁵⁶⁷⁸⁹]/g, ch => SUPERSCRIPT_DIGITS[ch])
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[_'’.-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

// Card / footer / search wording for small_bodies.json `type`
export const SMALL_BODY_TYPE_LABELS = {
    'dwarf planet': 'Dwarf planet',
    asteroid: 'Asteroid',
    'near-Earth asteroid': 'Near-Earth asteroid',
    'Trojan asteroid': 'Jupiter Trojan asteroid',
    centaur: 'Centaur',
    'trans-Neptunian object': 'Object beyond Neptune',
    comet: 'Comet',
    interstellar: 'Interstellar object',
};

// Asteroid and comet regions (small_bodies.json group ids, plus the Oort
// cloud model) for search: label and other names
export const SMALL_BODY_REGIONS = {
    main: { label: 'Asteroid belt', terms: ['main belt', 'main asteroid belt'] },
    hilda: { label: 'Hildas', terms: ['hilda asteroids', 'hilda group'] },
    trojan: { label: 'Jupiter Trojans', terms: ['trojans', 'trojan asteroids', 'greeks'] },
    neo: { label: 'Near-Earth asteroids', terms: ['neo', 'near earth objects', 'near-earth objects'] },
    centaur: { label: 'Centaurs', terms: ['centaur'] },
    tno: { label: 'Kuiper belt', terms: ['trans-neptunian objects', 'tno', 'edgeworth-kuiper belt'] },
    comet: { label: 'Comets', terms: ['comet', 'periodic comets'] },
    oort: { label: 'Oort cloud', terms: ['oort'] },
};

// Other names a body can be searched by (Latin names; "Solar System" for the Sun)
const BODY_ALIASES = {
    Sun: ['Sol', 'Solar System'],
    Earth: ['Terra'],
    Moon: ['Luna'],
};

// Everything the 3D search box can find. Items are
// {type: 'constellation' | 'star', label, sublabel, terms, sortKey, ...}
// where `terms` are normalized strings to match against. Type 'planet'
// covers every Solar System body (planetFacts = planets.json, moonsData =
// moons.json, smallBodies = small_bodies.json; all optional). Moon ids
// match solarSystem3d ('moon-<code>'); small bodies use their own ids.
export function buildSearchIndex(constellationData, starBuffers, lineStarInfo, planetFacts, moonsData, smallBodies) {
    const items = [];

    for (const body of planetFacts?.bodies ?? []) {
        const sublabel = {
            star: 'Our star',
            planet: 'Planet',
            'dwarf planet': 'Dwarf planet',
            moon: `Moon of ${body.parent}`,
        }[body.type];
        items.push({
            type: 'planet',
            id: body.id,
            label: body.name,
            sublabel,
            terms: [body.name, ...(BODY_ALIASES[body.id] ?? [])].map(normalizeSearchText),
            sortKey: -20,  // before constellations ("Sun" vs "Sculptor")
        });
    }
    for (const m of moonsData?.moons ?? []) {
        items.push({
            type: 'planet',
            id: `moon-${m.code}`,
            label: m.name,
            sublabel: `Moon of ${m.planet}`,
            terms: [normalizeSearchText(m.name)],
            sortKey: m.major ? -15 : 20,  // big moons first, small ones after stars
        });
    }
    for (const b of smallBodies?.named ?? []) {
        items.push({
            type: 'planet',
            id: b.id,
            label: b.name,
            sublabel: SMALL_BODY_TYPE_LABELS[b.type],
            // Also by full designation: "99942", "1P/Halley", "C/1995 O1"
            terms: [b.name, b.fullname].map(normalizeSearchText),
            sortKey: b.type === 'dwarf planet' ? -15 : 10,
        });
    }
    if (smallBodies) {
        const counts = new Map(smallBodies.groups.map((g, k) => [g.id, smallBodies.tiers.reduce((n, t) => n + t.group_counts[k], 0)]));
        for (const [id, region] of Object.entries(SMALL_BODY_REGIONS)) {
            items.push({
                type: 'region',
                id,
                label: region.label,
                sublabel: id === 'oort' ? 'Model: where long-period comets come from' : `${counts.get(id).toLocaleString()} known`,
                terms: [region.label, ...region.terms].map(normalizeSearchText),
                sortKey: -12,
            });
        }
    }

    for (const c of Object.values(constellationData)) {
        items.push({
            type: 'constellation',
            abbrev: c.abbrev,
            label: c.name,
            sublabel: c.name_english && c.name_english !== c.name ? `Constellation · ${c.name_english}` : 'Constellation',
            terms: [c.name, c.name_english, c.abbrev].filter(Boolean).map(normalizeSearchText),
            sortKey: -10,  // constellations first on equal matches
        });
    }

    // Stars with an IAU name, or a Bayer designation from the line figures
    for (let i = 0; i < starBuffers.count; i++) {
        const rec = starRecord(starBuffers, i);
        const info = lineStarInfo.get(rec.hip);
        const bayer = formatBayer(info?.bayer);
        if (!rec.name && !bayer) continue;
        items.push({
            type: 'star',
            starIndex: i,
            label: rec.name || bayer,
            sublabel: [rec.name && bayer, info?.constellations.join(', '), `mag ${formatMag(rec.mag)}`]
                .filter(Boolean).join(' · '),
            // Short ("θ² Tau") and full ("… (Theta² Tauri)") Bayer, each also without
            // its component number, so "alpha cen" finds "α¹ Cen"
            terms: [rec.name, ...[bayer?.split(' (')[0], bayer].flatMap(b => [b, b?.replace(/[0-9¹²³⁴⁵⁶⁷⁸⁹]/g, '')])]
                .filter(Boolean).map(normalizeSearchText),
            sortKey: rec.mag,  // brighter stars first on equal matches
        });
    }

    return items;
}

// Best matches for a query: whole-term prefix, then word prefix, then
// substring. "HIP 12345" or a bare number looks up a Hipparcos star.
export function searchIndex(items, starBuffers, query, limit = 8) {
    const q = normalizeSearchText(query);
    if (!q) return [];

    const hipMatch = q.match(/^(?:hip ?)?(\d+)$/);
    if (hipMatch) {
        const index = starBuffers.hipToIndex.get(Number(hipMatch[1]));
        if (index === undefined) return [];
        const rec = starRecord(starBuffers, index);
        return [{
            type: 'star',
            starIndex: index,
            label: rec.name || `HIP ${rec.hip}`,
            sublabel: `HIP ${rec.hip} · mag ${rec.mag.toFixed(1)}`,
        }];
    }

    const scored = [];
    for (const item of items) {
        let best = Infinity;
        for (const term of item.terms) {
            if (term === q) best = Math.min(best, 0);
            else if (term.startsWith(q)) best = Math.min(best, 1);
            else if (term.split(' ').some(word => word.startsWith(q))) best = Math.min(best, 2);
            else if (term.includes(q)) best = Math.min(best, 3);
        }
        if (best < Infinity) scored.push({ item, score: best });
    }
    scored.sort((a, b) => a.score - b.score || a.item.sortKey - b.item.sortKey);
    return scored.slice(0, limit).map(s => s.item);
}

// The point the camera orbits for a constellation: the average sky direction
// of its line stars, at their median distance. A plain 3D average gets
// dragged far off-centre by a single distant star (e.g. mu Sgr).
export function constellationFocus(constellation, starBuffers) {
    const { positions, hipToIndex } = starBuffers;
    let x = 0, y = 0, z = 0;
    const dists = [];
    for (const star of constellation.stars) {
        const i = hipToIndex.get(Number(star.hip));
        if (i === undefined) continue;
        const px = positions[i * 3], py = positions[i * 3 + 1], pz = positions[i * 3 + 2];
        const d = Math.hypot(px, py, pz);
        x += px / d;
        y += py / d;
        z += pz / d;
        dists.push(d);
    }
    if (!dists.length) return [0, 0, -1];
    dists.sort((a, b) => a - b);
    const median = dists[Math.floor(dists.length / 2)];
    const len = Math.hypot(x, y, z);
    return [x / len * median, y / len * median, z / len * median];
}
