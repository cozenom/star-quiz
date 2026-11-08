import React from 'react';
import { BH_MARKER_COLOR, bhState } from '../utils/blackHoles3d';
import { msOf, yearOf } from '../utils/galacticCentre3d';
import { bvToColor } from '../utils/universe3d';
import { Facts, Sources } from './GalaxyInfoCard';
import MapLegend from './MapLegend';

// A stellar black hole's system (black_holes.json systems[i], from
// Star_Data/curated/black_holes.json via scripts/build_black_holes.py): the
// black hole, its star and their orbit, and where they are at the clock's
// date. Uses the star and region cards' styles (.star-info-*).

const fmt = (n) => Math.round(n).toLocaleString();
const sig = (n, digits = 3) => Number(n.toPrecision(digits)).toLocaleString();
const hex = (n) => `#${n.toString(16).padStart(6, '0')}`;
const monthYear = (year) => new Date(msOf(year)).toLocaleDateString(undefined, { year: 'numeric', month: 'short', timeZone: 'UTC' });
const LIGHT_KM_S = 299792.458;
// The star's sRGB tint as CSS
const starCss = (sys) => `rgb(${bvToColor(sys.star.b_v).map(c => Math.round(c * 255)).join(', ')})`;

// The share of the Sun's metals, from [Fe/H]: "63%" or "1/360"
const metalShare = (feH) => {
    const share = 10 ** feH;
    return share >= 0.1 ? `${Math.round(share * 100)}%` : `1/${Math.round(1 / share / 10) * 10}`;
};

// time: the clock (ms)
export default function BlackHoleInfoCard({ sys, data, time, onView, onCloseUp, onClose }) {
    const t = yearOf(time);
    const state = bhState(sys, t);
    const o = sys.orbit;
    const hole = sys.black_hole;
    const star = sys.star;
    const period = o.period_yr < 2 ? `${fmt(o.period_d)} days` : `${o.period_yr.toFixed(1)} years`;
    const shape = o.e > 0.6 ? 'a long ellipse' : o.e > 0.3 ? 'an oval' : 'nearly round';
    const lightMinutes = (au) => au * 499.005 / 60;
    const rows = [
        ['Distance', <>{fmt(sys.distance_ly)} ly
            <span className="star-info-muted"> ± {fmt(sys.distance_err_ly)} · in {sys.constellation}</span></>],
        ['Black hole', <>{hole.mass_msun} ± {hole.mass_err_msun} times the Sun&apos;s mass
            <div className="star-info-muted">its event horizon {sig(2 * hole.horizon_km)} km across; its shadow, the dark disc you&apos;d see, {sig(2 * hole.shadow_km)} km</div></>],
        ['Star', <>{star.type}: {star.mass_msun} Suns, {sig(star.radius_rsun, 2)} times the Sun&apos;s width
            <div className="star-info-muted">{fmt(star.teff_k)} K at its surface, {sig(star.lum_lsun, 2)} times the Sun&apos;s light, {metalShare(star.fe_h)} of the
                Sun&apos;s share of metals; magnitude {star.g_mag} from Earth, too faint to see by eye</div></>],
        ['Orbit', <>once round every {period}
            <span className="star-info-muted"> · eccentricity {o.e.toFixed(2)} ({shape})</span></>],
        ['Closest', <>{sig(o.periapsis_au)} AU apart, the star at {fmt(o.speed_peri_km_s)} km/s
            <div className="star-info-muted">next: {monthYear(state.nextPeri)}</div></>],
        ['Farthest', <>{sig(o.apoapsis_au)} AU, at {fmt(o.speed_apo_km_s)} km/s</>],
        ['Now', <>{sig(state.separationAu)} AU apart ({sig(lightMinutes(state.separationAu), 2)} light-minutes), the star moving at {fmt(state.speedKmS)} km/s
            <span className="star-info-muted"> ({(state.speedKmS / LIGHT_KM_S * 100).toFixed(2)}% of light&apos;s speed)</span>
            <div className="star-info-muted">at the clock&apos;s date, as seen from Earth</div></>],
        ['Its own loop', <>the black hole, {sig(hole.mass_msun / star.mass_msun, 2)} times heavier, swings round their centre of mass on a loop {sig(2 * o.a_au * o.bh_share, 2)} AU long
            <div className="star-info-muted">the star&apos;s is {sig(2 * o.a_au * o.star_share, 2)} AU</div></>],
        ['Moves', <>{fmt(sys.speed_km_s)} km/s against the Sun
            <div className="star-info-muted">drawn still, where Gaia measured it ({sys.epoch})</div></>],
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
            <Facts rows={rows} />
            <p className="star-info-muted star-info-origin">{data.about} {data.drawn}</p>
            <Sources refs={sys.refs} />
        </div>
    );
}

// The close-up's key, shown while it is on screen
export function BlackHoleLegend({ sys, showOrbits, onOpen }) {
    const items = [
        { key: 'star', swatch: <span className="universe-3d-swatch" style={{ background: starCss(sys) }} />, name: 'Its star, at its true brightness' },
        showOrbits && { key: 'orbit', swatch: <span className="galaxy-legend-line" style={{ background: starCss(sys) }} />, name: 'The star\'s measured orbit round the black hole' },
        { key: 'marker', swatch: <span className="universe-3d-swatch" style={{ background: 'transparent', border: `2px solid ${hex(BH_MARKER_COLOR)}` }} />, name: 'The black hole (marker, until its shadow is big enough to see)' },
        { key: 'shadow', swatch: <span className="universe-3d-swatch" style={{ background: '#000', border: '1px solid #64748b' }} />, name: 'Its shadow (true size), light bent round it' },
    ].filter(Boolean);
    return <MapLegend title={sys.name} onTitle={onOpen} storageKey="universe3d.legend.bh" items={items} />;
}
