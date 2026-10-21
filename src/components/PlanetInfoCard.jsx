import React from 'react';
import { moonPhase } from '../utils/planets';
import { KM_PER_AU } from '../utils/universe3d';

// Uses the star card's styles (.star-info-*)

const TYPE_LABELS = {
    star: 'The star at the centre of the Solar System',
    planet: 'Planet',
    'dwarf planet': 'Dwarf planet',
    moon: 'Moon',
};

const fmt = (v, digits = 3) => Number(v.toPrecision(digits)).toLocaleString();

function formatAu(au) {
    if (au < 0.1) return `${fmt(au * KM_PER_AU)} km`;
    return `${au < 10 ? au.toFixed(2) : au.toFixed(1)} AU`;
}

function formatHours(h) {
    const abs = Math.abs(h);
    if (abs < 48) return `${fmt(abs)} hours`;
    return `${fmt(abs / 24)} days`;
}

function formatDays(d) {
    if (d < 730) return `${fmt(d)} days`;
    return `${fmt(d / 365.25)} years`;
}

// A moon's position source (moons.js moonPositionSource) in words
const within = (km) => (km != null ? ` (within ~${fmt(km, 2)} km)` : '');
function positionText(p) {
    if (p.kind === 'fit') {
        return `Position from JPL Horizons' orbit for ${p.years[0]}-${p.years[1]}${within(p.worstKm)}; `
            + 'carried on outside those years, less exactly.';
    }
    if (p.kind === 'fit+engine') {
        return `Position from JPL Horizons' orbit for ${p.years[0]}-${p.years[1]}${within(p.worstKm)}; `
            + 'outside those years from astronomy-engine (within ~2,000 km).';
    }
    if (p.kind === 'engine') return 'Position from astronomy-engine (within ~1,000 km).';
    return 'Position from one orbit fitted for 2026: approximate away from that year.';
}

const formatDate = (date) => date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

// time: the clock (ms), for our Moon's phase
function PlanetInfoCard({ body, distances, time, onClose, onFlyTo }) {
    const f = body.facts;
    const isSun = body.id === 'Sun';
    const map = body.surfaceMap;
    const subtitle = f.parent ? `${TYPE_LABELS[f.type]} of ${f.parent}` : TYPE_LABELS[f.type];
    const phase = body.id === 'Moon' ? moonPhase(new Date(time)) : null;

    return (
        <div className="star-info">
            <button className="star-info-close" onClick={onClose} aria-label="Close">×</button>
            <h3 className="star-info-title">{body.name}</h3>
            <div className="star-info-subtitle">{subtitle}</div>

            <dl className="star-info-facts">
                {!isSun && body.id !== 'Earth' && f.parent !== 'Earth' && (
                    <>
                        <dt>From Earth</dt>
                        <dd>{formatAu(distances.earth)} <span className="star-info-muted">now</span></dd>
                    </>
                )}
                {f.parent && (
                    <>
                        <dt>From {f.parent}</dt>
                        <dd>
                            {formatAu(distances.parent)} <span className="star-info-muted">now</span>
                            <div className="star-info-muted">
                                {fmt(f.orbit_radius_km ?? f.distance_mkm * 1e6)} km on average
                            </div>
                        </dd>
                    </>
                )}
                {!isSun && !f.parent && (
                    <>
                        <dt>From the Sun</dt>
                        <dd>{formatAu(distances.sun)} <span className="star-info-muted">now</span></dd>
                    </>
                )}

                {phase && (
                    <>
                        <dt>Phase</dt>
                        <dd>
                            {phase.name} <span className="star-info-muted">· {Math.round(phase.lit * 100)}% lit</span>
                            {phase.ageDays !== null && (
                                <div className="star-info-muted">{phase.ageDays.toFixed(1)} days since new Moon</div>
                            )}
                            <div className="star-info-muted">{phase.next.name}: {formatDate(phase.next.date)}</div>
                        </dd>
                    </>
                )}

                <dt>Diameter</dt>
                <dd>
                    {f.diameter_km ? (
                        <>
                            {fmt(f.diameter_km, f.diameter_km < 100 ? 2 : 4)} km
                            {body.id !== 'Earth' && f.diameter_km > 1000 && (
                                <div className="star-info-muted">{fmt(f.diameter_km / 12756, 2)}× Earth</div>
                            )}
                        </>
                    ) : (
                        <>Unknown <span className="star-info-muted">(likely a few km)</span></>
                    )}
                </dd>

                {f.mass_earth != null && (
                    <>
                        <dt>Mass</dt>
                        <dd>{body.id === 'Earth' ? '5.97 × 10²⁴ kg' : `${fmt(f.mass_earth, 3)}× Earth`}</dd>
                    </>
                )}

                {f.gravity_ms2 != null && (
                    <>
                        <dt>Gravity</dt>
                        <dd>
                            {f.gravity_ms2} m/s²
                            {body.id !== 'Earth' && <span className="star-info-muted"> ({fmt(f.gravity_ms2 / 9.8, 2)}× Earth)</span>}
                        </dd>
                    </>
                )}

                {f.day_h != null && (
                    <>
                        <dt>Day</dt>
                        <dd>
                            {formatHours(f.day_h)}
                            {f.rotation_h < 0 && <div className="star-info-muted">spins backwards (retrograde)</div>}
                        </dd>
                    </>
                )}

                {f.orbit_days != null && (
                    <>
                        <dt>{f.parent ? 'Orbit' : 'Year'}</dt>
                        <dd>{f.orbit_days < 2 ? formatHours(f.orbit_days * 24) : formatDays(f.orbit_days)}</dd>
                    </>
                )}

                {f.temp_c != null && (
                    <>
                        <dt>{isSun ? 'Surface' : 'Temperature'}</dt>
                        <dd>
                            {f.temp_c} °C
                            {['Jupiter', 'Saturn', 'Uranus', 'Neptune'].includes(body.id) && (
                                <div className="star-info-muted">at the cloud tops (1 bar)</div>
                            )}
                        </dd>
                    </>
                )}

                {f.moons != null && (
                    <>
                        <dt>Moons</dt>
                        <dd>{f.moons}{f.rings && <span className="star-info-muted"> · has rings</span>}</dd>
                    </>
                )}

                {map && (
                    <>
                        <dt>Surface map</dt>
                        <dd>
                            {map.from}
                            <div className="star-info-muted">
                                by <a href={map.href} target="_blank" rel="noopener noreferrer">{map.by}</a>
                            </div>
                            {map.note && <div className="star-info-muted">{map.note}</div>}
                        </dd>
                    </>
                )}
            </dl>

            {f.position && (
                <p className="star-info-muted star-info-origin">{positionText(f.position)}</p>
            )}

            <button className="button-primary star-info-fly" onClick={onFlyTo}>
                {isSun ? 'View the Solar System' : `Fly to ${body.name}`}
            </button>
        </div>
    );
}

export default PlanetInfoCard;
