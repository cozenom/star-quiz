import React from 'react';
import { BH_JET_COLOR, BH_MARKER_COLOR, bhState } from '../utils/blackHoles3d';
import { FastStarsSky, MassChart } from './ClusterHoleCharts';
import { msOf, yearOf } from '../utils/galacticCentre3d';
import { bvToColor } from '../utils/universe3d';
import { Facts, Sources } from './GalaxyInfoCard';
import LensingEventChart from './LensingEventChart';
import MapLegend from './MapLegend';

// A stellar black hole's system (black_holes.json systems[i], from
// Star_Data/curated/black_holes.json via scripts/build_black_holes.py): the
// black hole, its star and their orbit, and where they are at the clock's
// date; a fed one's spin, disc and jet too; a lone one (no star): the
// microlensing event it was found by (LensingEventChart); a cluster's
// (Omega Centauri's): the fast stars round it and each study's mass
// (ClusterHoleCharts). Uses the star and region cards' styles
// (.star-info-*).

const fmt = (n) => Math.round(n).toLocaleString();
const sig = (n, digits = 3) => Number(n.toPrecision(digits)).toLocaleString();
const hex = (n) => `#${n.toString(16).padStart(6, '0')}`;
const monthDay = (year) => new Date(msOf(year)).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const monthYear = (year) => new Date(msOf(year)).toLocaleDateString(undefined, { year: 'numeric', month: 'short', timeZone: 'UTC' });
const LIGHT_KM_S = 299792.458;
// The star's sRGB tint as CSS
const starCss = (sys) => `rgb(${bvToColor(sys.star.b_v).map(c => Math.round(c * 255)).join(', ')})`;
// Nearly circular orbits have no closest and farthest worth a row
const ROUND_E = 0.05;

// The share of the Sun's metals, from [Fe/H]: "63%" or "1/360"
const metalShare = (feH) => {
    const share = 10 ** feH;
    return share >= 0.1 ? `${Math.round(share * 100)}%` : `1/${Math.round(1 / share / 10) * 10}`;
};
// A position angle as a compass direction: 205 -> "south-southwest"
const COMPASS = ['north', 'north-northeast', 'northeast', 'east-northeast', 'east', 'east-southeast', 'southeast', 'south-southeast',
    'south', 'south-southwest', 'southwest', 'west-southwest', 'west', 'west-northwest', 'northwest', 'north-northwest'];
const compass = (pa) => COMPASS[Math.round((((pa % 360) + 360) % 360) / 22.5) % 16];
// km, rounded for reading: "940,000 km", "6.1 million km"
const km = (v) => (v >= 1e6 ? `${sig(v / 1e6, 2)} million km` : `${sig(v, 2)} km`);
const kelvin = (t) => (t >= 1e6 ? `${sig(t / 1e6, 2)} million K` : `${sig(t, 2)} K`);
// The light a disc's share was measured in, from its wavelength (nm)
const band = (nm) => (nm < 500 ? 'blue' : nm < 590 ? 'visible' : nm < 750 ? 'red' : 'near-infrared');
// The star's place along its orbit at the clock's date: known to within this
// share of an orbit (the published period's and timing's uncertainty
// carried on), roughly up to the second, not known past it
const PHASE_KNOWN = [0.1, 0.25];
function phaseText(o) {
    if (o.phase_note) return `where along its orbit it is isn't known: ${o.phase_note}`;
    if (o.phase_err === undefined || o.phase_err < PHASE_KNOWN[0]) return null;
    if (o.phase_err < PHASE_KNOWN[1]) return `where along its orbit it is now is known only roughly, to within ${Math.round(o.phase_err * 100)}% of an orbit`;
    return `where along its orbit it is now isn't known: its period isn't measured precisely enough to carry the timing to today`;
}

// Rows only a fed system has: its disc, jet, outbursts, third star
function fedRows(sys) {
    const hole = sys.black_hole;
    const d = sys.disc;
    const rows = [];
    if (d.state === 'soft') {
        rows.push(['Disc', <>from {km(d.r_in_rg * hole.rg_km)} out (the innermost stable orbit) to about {km(d.r_out_rg * hole.rg_km)}
            <div className="star-info-muted">{kelvin(d.t_peak_k)} at its hottest, shining in X-rays; {kelvin(d.t_out_k)} at its edge{d.r_out_note && ' (its outer edge assumed: a disc fed by a wind is small)'}{d.irradiation && ', its outer parts warmed by the X-rays from its centre'}. Fed {sig(d.mdot_g_s / 1e15, 2)} billion tonnes a second, {sig(d.l_edd * 100, 2)}% of the most it could take (Eddington&apos;s limit){d.state_note ? `: ${d.state_note}` : '; in its soft state'}</div></>]);
    } else {
        rows.push(['Disc', <>quiet: from about {km(d.r_in_rg * hole.rg_km)} to {km(d.r_out_rg * hole.rg_km)} from the black hole, about {kelvin(d.t_in_k)}
            <div className="star-info-muted">giving {Math.round(d.veiling * 100)}% of the system&apos;s {band(d.veiling_nm)} light{d.veiling_note && `: ${d.veiling_note}`}; inside it, a thin hot flow that doesn&apos;t show to the eye{d.r_in_note && `; its inner edge ${d.r_in_note}`}{d.r_out_note && `; its outer edge ${d.r_out_note}`}</div></>]);
    }
    if (sys.orbit.misalignment_deg > 5) {
        rows.push(['Tilted spin', <>its spin {Math.round(sys.orbit.misalignment_deg)}&deg; from its orbit&apos;s axis
            <div className="star-info-muted">the jets point along the spin, the disc lies in the orbit&apos;s plane; at least 40&deg; apart (from the jets&apos; angle and the orbit&apos;s, its polarised light), the smallest that fits is drawn</div></>]);
    }
    if (sys.jet) {
        rows.push(['Jet', <>pointing {compass(sys.jet.pa_deg)} on our sky
            <div className="star-info-muted">seen in radio, along the spin&apos;s axis; not visible to the eye</div></>]);
    }
    if (sys.outbursts) {
        rows.push(['Outbursts', <>{sys.outbursts.join(', ')}
            <div className="star-info-muted">{sys.outburst_note ?? 'the disc floods inwards and the system flares for weeks to months; drawn as it is between them'}</div></>]);
    }
    if (sys.tertiary) {
        const t = sys.tertiary;
        rows.push(['Third star', <>about {t.mass_msun} Suns, at least {t.min_sep_au.toLocaleString()} AU out
            <div className="star-info-muted">{t.sep_arcsec}&Prime; away on our sky, magnitude {t.g_mag}; not drawn</div></>]);
    }
    return rows;
}

// A lone black hole's card (OGLE-2011-BLG-0462): no star or orbit; the
// event, the star behind it, how its mass was measured
function LoneCard({ sys, data, t, onView, onCloseUp, onWatch, onClose }) {
    const hole = sys.black_hole;
    const ev = sys.event;
    const src = sys.source;
    const hstMax = ev.hst.reduce((a, b) => (b.shift_mas > a.shift_mas ? b : a));
    const hstLast = ev.hst[ev.hst.length - 1];
    const rows = [
        ['Distance', <>{fmt(sys.distance_ly)} ly
            <span className="star-info-muted"> ± {fmt(sys.distance_err_ly)} · in {sys.constellation}, towards the Galaxy&apos;s centre</span></>],
        ['Black hole', <>{hole.mass_msun} ± {hole.mass_err_msun} times the Sun&apos;s mass
            <div className="star-info-muted">its event horizon {sig(2 * hole.horizon_km)} km across; its shadow, the dark disc you&apos;d see, {sig(2 * hole.shadow_km)} km; no light of its own seen (fainter than a star of 0.15 Suns)</div></>],
        ['Alone', <>nothing found going round it
            <div className="star-info-muted">{sys.companions.map(([how, what]) => `${what} (${how})`).join('; ')}</div></>],
        ['The event', <>brightest {monthDay(ev.peak_year)}, {ev.a_max} times the star&apos;s own light
            <div className="star-info-muted">alerted {monthDay(ev.alert_year)} by the MOA and OGLE surveys; the star within the Einstein ring {monthYear(ev.inside_years[0])} to {monthYear(ev.inside_years[1])}. From the ground it looked only ~20 times brighter: a brighter star 0.4&Prime; away blends with it</div></>],
        ['Bent light', <>Einstein ring {ev.theta_e_mas} mas in radius
            <div className="star-info-muted">its two images at most {sig(2 * ev.theta_e_mas, 2)} mas apart, too close for any telescope to split; Hubble saw them pull the star&apos;s image {hstMax.shift_mas.toFixed(1)} mas aside ({Math.floor(hstMax.year)}), still {hstLast.shift_mas.toFixed(2)} mas in {Math.floor(hstLast.year)}. That, and the brightening&apos;s timing and Earth&apos;s yearly swing in it, gave the mass</div></>],
        ['Star behind', <>{src.type}, {fmt(src.distance_ly)} ly away
            <span className="star-info-muted"> ± {fmt(src.distance_err_ly)}</span>
            <div className="star-info-muted">{fmt(src.beyond_ly)} ly beyond the black hole; {fmt(src.teff_k)} K, {metalShare(src.fe_h)} of the Sun&apos;s share of metals; magnitude {src.mag_606.toFixed(1)} in visible light (dimmed by dust), {src.peak_mag_606} at the peak</div></>],
        ['Its mass, by study', <>{sys.masses[sys.masses.length - 1][1]} Suns
            <div className="star-info-muted">{sys.masses.map(([who, m]) => `${who}: ${m}`).join('; ')}. The low one fitted a neighbour star&apos;s light differently; with more Hubble data, all now give a black hole</div></>],
        ['Moves', <>{sys.speed_local_km_s} ± {sys.speed_local_err_km_s} km/s against the stars round it
            <div className="star-info-muted">faster than almost all of them: probably kicked when it formed; {sys.speed_km_s} km/s across our sky against the Sun ({sys.pm_mas_yr} mas a year; its speed towards or away from us isn&apos;t known). Drawn still, where it was in {sys.epoch}</div></>],
    ];
    return (
        <div className="star-info region-info">
            <button className="star-info-close" onClick={onClose} aria-label="Close">×</button>
            <h3 className="star-info-title">{sys.name}</h3>
            <div className="star-info-subtitle">{sys.title} · found {sys.found}</div>
            <div className="star-info-actions">
                <button className="button-secondary star-info-fly" onClick={onCloseUp} title="Right by the black hole: its shadow and the light bent round it">Close up</button>
                <button className="button-primary star-info-fly" onClick={onView}>Fly there</button>
            </div>
            <p className="star-info-origin">{sys.about}</p>
            <LensingEventChart sys={sys} t={t} onWatch={onWatch} />
            <Facts rows={rows} />
            <p className="star-info-muted star-info-origin">{data.about_lone} {data.drawn_lone}</p>
            <Sources refs={sys.refs} />
        </div>
    );
}

// A cluster's black hole (Omega Centauri's): the fast stars that betray
// it, where it is, how heavy (debated), what hasn't been seen
const WATCH_CENTURY_FROM = 1950;
const WATCH_CENTURY_RATE = 5 * 31557600;   // 5 years a second
// An offset on the sky [east, north] as a compass direction
const paCompass = ([e, n]) => compass(Math.atan2(e, n) * 180 / Math.PI);
function ClusterCard({ sys, data, t, onView, onCloseUp, onWatch, onClose }) {
    const hole = sys.black_hole;
    const stars = sys.fast_stars;
    const speeds = stars.map(s => s.v2d_km_s);
    const inner = stars.filter(s => s.r_proj_arcsec < 1).length;
    const au = sys.cluster.au_per_arcsec;
    const [mcmc, least] = [sys.centres.mcmc, sys.centres.min_mass];
    const off = ([e, n]) => Math.hypot(e, n).toFixed(2);
    const rows = [
        ['Distance', <>{fmt(sys.distance_ly)} ly
            <span className="star-info-muted"> ± {fmt(sys.distance_err_ly)} · at the centre of {sys.cluster.name}, in {sys.constellation}</span></>],
        ['Black hole', <>about {fmt(hole.mass_msun)} times the Sun&apos;s mass, as drawn
            <div className="star-info-muted">at least {fmt(hole.min_bound_msun)} if the fast stars are bound to it, {fmt(hole.min_accel_msun)} adding how little their paths curve (99% sure); its event horizon {sig(2 * hole.horizon_km, 2)} km across, its shadow {sig(2 * hole.shadow_km, 2)} km (about the Moon&apos;s orbit); spin unknown</div></>],
        ['Fast stars', <>{stars.length} within 3&Prime; of the centre, {Math.min(...speeds)} to {Math.max(...speeds)} km/s across the sky
            <div className="star-info-muted">the cluster&apos;s own escape speed there is {sys.cluster.v_esc_km_s} km/s: without something heavy at the centre they&apos;d leave it within a thousand years. {inner} of them, the fastest among them, within 1&Prime; ({fmt(au)} AU); all ordinary main-sequence stars of the cluster. Their speeds towards or away from us and their depths aren&apos;t measured, and none yet shows its path curving</div></>],
        ['Where exactly', <>within about {sys.centres.err_arcsec}&Prime; ({fmt(sys.centres.err_arcsec * au)} AU) of the cluster&apos;s centre
            <div className="star-info-muted">the stars&apos; accelerations, faint as they are, put it {off(mcmc)}&Prime; {paCompass(mcmc)} of the centre; the place needing the least mass is {off(least)}&Prime; {paCompass(least)}. Drawn at the centre</div></>],
        ['Unseen', <>no light from anything falling in
            <div className="star-info-muted">{sys.unseen.map(([how, what]) => `${how}: ${what}`).join('; ')}. The cluster&apos;s gas is thin, so it may feed too slowly to see</div></>],
        ['Debated', <>one black hole, or many small ones?
            <div className="star-info-muted">with the cluster&apos;s pulsars, Bañares-Hernández et al. (2025) find the core&apos;s dark mass better spread out, 200,000 to 300,000 Suns of dead stars and stellar black holes, leaving room for at most 6,000 Suns in one; that extra mass also raises the escape speed. Models growing one from a seed of 500 to 5,000 Suns reach about 50,000 and make fast stars like these. Measuring the stars&apos; speeds along our line of sight, and their paths curving, would settle it</div></>],
        ['The cluster', <>{sys.cluster.name}: {sig(sys.cluster.mass_msun / 1e6, 2)} million Suns of stars
            <div className="star-info-muted">the Milky Way&apos;s biggest globular cluster, with stars of many ages and makes: probably the core of a small galaxy the Milky Way swallowed (likely Gaia-Enceladus), its black hole with it</div></>],
    ];
    return (
        <div className="star-info region-info">
            <button className="star-info-close" onClick={onClose} aria-label="Close">×</button>
            <h3 className="star-info-title">{sys.name}</h3>
            <div className="star-info-subtitle">{sys.title} · found {sys.found}</div>
            <div className="star-info-actions">
                <button className="button-secondary star-info-fly" onClick={onCloseUp} title="Right by the black hole: its shadow, the cluster's stars bent round it">Close up</button>
                <button className="button-primary star-info-fly" onClick={onView} title="Its fast stars round it, as from Earth">Fly there</button>
            </div>
            <p className="star-info-origin">{sys.about}</p>
            <div className="lensing-chart">
                <div className="lensing-chart-head">
                    <span>The fast stars, at the clock&apos;s date</span>
                    <button className="button-secondary lensing-chart-watch" onClick={() => onWatch(WATCH_CENTURY_FROM, WATCH_CENTURY_RATE)} title="Set the clock to 1950, five years a second">Watch a century</button>
                </div>
                <FastStarsSky sys={sys} t={t} />
            </div>
            <Facts rows={rows} />
            <div className="lensing-chart">
                <div className="lensing-chart-head"><span>Its mass, by study</span></div>
                <MassChart sys={sys} />
            </div>
            <p className="star-info-muted star-info-origin">{data.about_cluster} {data.drawn_cluster}</p>
            <Sources refs={sys.refs} />
        </div>
    );
}

// time: the clock (ms); onWatch(fromYear, rate): run the clock from a year
// at a rate (s a second), for a lone hole's event or a cluster's stars
export default function BlackHoleInfoCard({ sys, data, time, onView, onCloseUp, onWatch, onClose }) {
    const t = yearOf(time);
    if (sys.kind === 'cluster') return <ClusterCard sys={sys} data={data} t={t} onView={onView} onCloseUp={onCloseUp} onWatch={onWatch} onClose={onClose} />;
    if (sys.kind === 'lone') return <LoneCard sys={sys} data={data} t={t} onView={onView} onCloseUp={onCloseUp} onWatch={onWatch} onClose={onClose} />;
    const state = bhState(sys, t);
    const o = sys.orbit;
    const hole = sys.black_hole;
    const star = sys.star;
    const isFed = sys.kind === 'fed';
    const period = o.period_yr < 2 ? `${o.period_d < 30 ? sig(o.period_d, 3) : fmt(o.period_d)} days` : `${o.period_yr.toFixed(1)} years`;
    const shape = o.e > 0.6 ? 'a long ellipse' : o.e > 0.3 ? 'an oval' : o.e > 0.005 ? 'nearly round' : 'round';
    const lightMinutes = (au) => au * 499.005 / 60;
    // A mass note that's a sentence (how the drawn mass was reached) goes
    // under the mass; a +/- or range stays beside it
    const massInline = !hole.mass_note || /^[+(]/.test(hole.mass_note);
    const spin = isFed && <div className="star-info-muted">{!massInline && `${hole.mass_note}; `}{hole.spin > 0 ? `spinning at ${hole.spin} of the most a black hole can: ${hole.spin_note}` : `its spin ${hole.spin_note}`}; its horizon {sig(2 * hole.rg_km * hole.r_plus_rg)} km across</div>;
    const phase = phaseText(o);
    const rows = [
        ['Distance', <>{fmt(sys.distance_ly)} ly
            <span className="star-info-muted"> ± {fmt(sys.distance_err_ly)} · in {sys.constellation}</span>
            {sys.distance_note && <div className="star-info-muted">{sys.distance_note}</div>}</>],
        ['Black hole', <>{!hole.mass_note ? `${hole.mass_msun} ± ${hole.mass_err_msun} times the Sun's mass`
            : /^[+(]/.test(hole.mass_note) ? `${hole.mass_msun.toFixed(1)} ${hole.mass_note} times the Sun's mass`
            : `about ${hole.mass_msun.toFixed(1)} times the Sun's mass`}
            {spin || <div className="star-info-muted">its event horizon {sig(2 * hole.horizon_km)} km across; its shadow, the dark disc you&apos;d see, {sig(2 * hole.shadow_km)} km</div>}</>],
        ['Star', <>{star.type}: {star.mass_msun} Suns, {sig(star.radius_rsun, 2)} times the Sun&apos;s width
            <div className="star-info-muted">{star.mass_note && `its mass ${star.mass_note}; `}{fmt(star.teff_k)} K at its surface, {sig(star.lum_lsun, 2)} times the Sun&apos;s light
                {star.fe_h !== null && <>, {metalShare(star.fe_h)} of the Sun&apos;s share of metals</>}; {star.mag_note ?? (star.g_mag === null ? 'hidden from Earth in visible light by dust, seen in infrared' : <>magnitude {star.g_mag} from Earth{star.g_mag > 6 && (star.g_mag < 10 ? ', too faint for the eye but easy in binoculars' : ', too faint to see by eye')}</>)}{star.teff_note && ` (its temperature ${star.teff_note})`}
                {isFed && <>. It {star.roche.fill >= 1 ? 'fills' : `fills ${Math.round(star.roche.fill * 100)}% of the way to the edge of`} the space where its own gravity rules, stretched towards the black hole</>}</div></>],
        ...(isFed ? fedRows(sys) : []),
        ['Orbit', <>once round every {period}
            <span className="star-info-muted"> · eccentricity {o.e.toFixed(o.e > ROUND_E ? 2 : 3)} ({shape})</span>
            {isFed && <div className="star-info-muted">tilted {Math.round(o.i_deg)}&deg; from face on as we see it{o.i_note && ` (${o.i_note})`}{o.pa_note && `; ${o.pa_note}`}</div>}</>],
        ...(o.e > ROUND_E ? [
            ['Closest', <>{sig(o.periapsis_au)} AU apart, the star at {fmt(o.speed_peri_km_s)} km/s
                <div className="star-info-muted">next: {monthYear(state.nextPeri)}</div></>],
            ['Farthest', <>{sig(o.apoapsis_au)} AU, at {fmt(o.speed_apo_km_s)} km/s</>],
        ] : []),
        ['Now', <>{sig(state.separationAu)} AU apart ({sig(lightMinutes(state.separationAu), 2)} light-minutes), the star moving at {fmt(state.speedKmS)} km/s
            <span className="star-info-muted"> ({(state.speedKmS / LIGHT_KM_S * 100).toFixed(2)}% of light&apos;s speed)</span>
            <div className="star-info-muted">at the clock&apos;s date, as seen from Earth{phase && `; ${phase}`}</div></>],
        ['Its own loop', <>the black hole, {sig(hole.mass_msun / star.mass_msun, 2)} times {hole.mass_msun > star.mass_msun ? 'heavier' : 'the star\'s mass'}, swings round their centre of mass on a loop {sig(2 * o.a_au * o.bh_share, 2)} AU long
            <div className="star-info-muted">the star&apos;s is {sig(2 * o.a_au * o.star_share, 2)} AU</div></>],
        ['Moves', <>{sys.speed_km_s === null ? 'its speed isn\'t fully measured' : `${fmt(sys.speed_km_s)} km/s against the Sun`}
            <div className="star-info-muted">drawn still, where it was measured ({sys.epoch})</div></>],
    ];
    return (
        <div className="star-info region-info">
            <button className="star-info-close" onClick={onClose} aria-label="Close">×</button>
            <h3 className="star-info-title">{sys.name}</h3>
            <div className="star-info-subtitle">{sys.title} · found {sys.found}</div>
            <div className="star-info-actions">
                <button className="button-secondary star-info-fly" onClick={onCloseUp} title={isFed ? 'Right by the black hole: its shadow, its disc and the light bent round it' : 'Right by the black hole: its shadow and the light bent round it'}>Close up</button>
                <button className="button-primary star-info-fly" onClick={onView}>Fly there</button>
            </div>
            <p className="star-info-origin">{sys.about}</p>
            <Facts rows={rows} />
            <p className="star-info-muted star-info-origin">{isFed ? `${data.about_fed} ${data.drawn_fed}` : `${data.about} ${data.drawn}`}</p>
            <Sources refs={sys.refs} />
        </div>
    );
}

// The close-up's key, shown while it is on screen
export function BlackHoleLegend({ sys, showOrbits, onOpen }) {
    if (!sys.star) {
        const items = [
            sys.fast_stars && { key: 'fast', swatch: <span className="universe-3d-swatch" style={{ background: '#ffd9a8' }} />, name: 'The fast stars, moving as measured (their depths drawn: not measured)' },
            { key: 'marker', swatch: <span className="universe-3d-swatch" style={{ background: 'transparent', border: `2px solid ${hex(BH_MARKER_COLOR)}` }} />, name: 'The black hole (marker, until its shadow is big enough to see)' },
            { key: 'shadow', swatch: <span className="universe-3d-swatch" style={{ background: '#000', border: '1px solid #64748b' }} />, name: 'Its shadow (true size), light bent round it' },
        ].filter(Boolean);
        return <MapLegend title={sys.name} onTitle={onOpen} storageKey="universe3d.legend.bh" items={items} />;
    }
    const isFed = sys.kind === 'fed';
    const items = [
        { key: 'star', swatch: <span className="universe-3d-swatch" style={{ background: starCss(sys) }} />, name: isFed ? 'Its star, its shape the space its gravity rules' : 'Its star, at its true brightness' },
        isFed && { key: 'disc', swatch: <span className="universe-3d-swatch" style={{ background: sys.disc.state === 'soft' ? 'radial-gradient(circle, #ffffff 30%, #cfe0ff 60%, #ffb46b)' : '#ff8a3d' }} />, name: sys.disc.state === 'soft' ? 'Its disc, at its temperatures: white-hot inside' : 'Its disc, quiet and faint' },
        showOrbits && { key: 'orbit', swatch: <span className="galaxy-legend-line" style={{ background: starCss(sys) }} />, name: 'The star\'s measured orbit round the black hole' },
        showOrbits && isFed && sys.jet && { key: 'jet', swatch: <span className="galaxy-legend-line" style={{ background: hex(BH_JET_COLOR) }} />, name: 'Its radio jet\'s direction (not visible to the eye)' },
        { key: 'marker', swatch: <span className="universe-3d-swatch" style={{ background: 'transparent', border: `2px solid ${hex(BH_MARKER_COLOR)}` }} />, name: 'The black hole (marker, until its shadow is big enough to see)' },
        { key: 'shadow', swatch: <span className="universe-3d-swatch" style={{ background: '#000', border: '1px solid #64748b' }} />, name: isFed ? 'Its shadow (true size), light bent round the spinning hole' : 'Its shadow (true size), light bent round it' },
    ].filter(Boolean);
    return <MapLegend title={sys.name} onTitle={onOpen} storageKey="universe3d.legend.bh" items={items} />;
}
