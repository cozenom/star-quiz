import React from 'react';
import { KM_PER_AU, SMALL_BODY_TYPE_LABELS } from '../utils/universe3d';
import { currentElements, historyYears, perihelionDate, semiMajorAxis, smallBodyPeriodDays } from '../utils/smallBodies';

// A named asteroid, dwarf planet or comet (small_bodies.json `named`).
// Uses the star card's styles (.star-info-*)

// SBDB orbit classes worth adding to the type; the rest repeat it
const CLASS_LABELS = {
    'Main-belt Asteroid': 'main belt',
    Apollo: 'Apollo group',
    Aten: 'Aten group',
    Amor: 'Amor group',
    'Halley-type Comet': 'Halley-type',
    'Jupiter-family Comet': 'Jupiter-family',
    'Encke-type Comet': 'Encke-type',
};

const fmt = (v, digits = 3) => Number(v.toPrecision(digits)).toLocaleString();

function formatAu(au) {
    if (au < 0.1) return `${fmt(au * KM_PER_AU)} km`;
    return `${au < 10 ? au.toFixed(2) : au.toFixed(1)} AU`;
}

function formatHours(h) {
    if (h < 48) return `${fmt(h)} hours`;
    return `${fmt(h / 24)} days`;
}

function formatDays(d) {
    if (d < 730) return `${fmt(d)} days`;
    return `${fmt(d / 365.25)} years`;
}

function formatSize(km) {
    if (km < 1) return `${fmt(km * 1000, 2)} m`;
    return `${fmt(km, km < 100 ? 2 : 4)} km`;
}

const formatDate = (date) => date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

// distances: {sun, earth} in AU, now. time: the clock (ms)
function SmallBodyInfoCard({ body, distances, time, onClose, onFlyTo }) {
    const b = body.smallBody;
    // The orbit as it is at the clock's time (it changes over the centuries)
    const el = currentElements(b, new Date(time));
    const bound = el.e < 1;
    const period = smallBodyPeriodDays(el);
    const perihelion = perihelionDate(el, new Date(time));
    const perihelionPast = perihelion.getTime() < time;
    const years = historyYears(b);
    const classLabel = CLASS_LABELS[b.class];

    return (
        <div className="star-info">
            <button className="star-info-close" onClick={onClose} aria-label="Close">×</button>
            <h3 className="star-info-title">{b.name}</h3>
            <div className="star-info-subtitle">
                {SMALL_BODY_TYPE_LABELS[b.type]}{classLabel && ` · ${classLabel}`}
                {b.fullname !== b.name && <div className="star-info-muted">{b.fullname}</div>}
            </div>

            <dl className="star-info-facts">
                <dt>From Earth</dt>
                <dd>{formatAu(distances.earth)} <span className="star-info-muted">now</span></dd>
                <dt>From the Sun</dt>
                <dd>{formatAu(distances.sun)} <span className="star-info-muted">now</span></dd>

                <dt>{b.type === 'comet' || (b.type === 'interstellar' && !b.diameter_km) ? 'Nucleus' : 'Size'}</dt>
                <dd>
                    {b.diameter_km ? (
                        <>
                            {b.diameter_estimated && '~'}{formatSize(b.diameter_km)}
                            {b.diameter_estimated && <div className="star-info-muted">estimated from its brightness</div>}
                            {b.size_note && <div className="star-info-muted">{b.size_note}</div>}
                        </>
                    ) : (
                        <>Unknown <span className="star-info-muted">(hidden in its glowing coma)</span></>
                    )}
                </dd>

                {b.rotation_h != null && (
                    <>
                        <dt>Day</dt>
                        <dd>{formatHours(b.rotation_h)}</dd>
                    </>
                )}

                <dt>Orbit</dt>
                <dd>
                    {bound ? (
                        <>
                            {formatDays(period)}
                            <div className="star-info-muted">
                                {formatAu(el.q)} to {formatAu(semiMajorAxis(el) * (1 + el.e))} from the Sun
                            </div>
                        </>
                    ) : (
                        <>
                            Not bound to the Sun
                            <div className="star-info-muted">passing through once, {formatAu(el.q)} from the Sun at closest</div>
                        </>
                    )}
                    {el.i > 90 && <div className="star-info-muted">goes round backwards (tilted {Math.round(el.i)}°)</div>}
                </dd>

                <dt>{perihelionPast ? 'Closest to Sun' : 'Next closest'}</dt>
                <dd>{formatDate(perihelion)}</dd>

                {body.surfaceMap && (
                    <>
                        <dt>Surface map</dt>
                        <dd>
                            {body.surfaceMap.from}
                            <div className="star-info-muted">
                                by <a href={body.surfaceMap.href} target="_blank" rel="noopener noreferrer">{body.surfaceMap.by}</a>
                            </div>
                            {body.surfaceMap.note && <div className="star-info-muted">{body.surfaceMap.note}</div>}
                        </dd>
                    </>
                )}

                {b.discovery && (
                    <>
                        <dt>Found</dt>
                        <dd className="star-info-muted">{b.discovery.replace(/^Discovered /, '')}</dd>
                    </>
                )}
            </dl>

            {b.note && <p className="star-info-origin">{b.note}</p>}
            {b.name_origin && <p className="star-info-muted star-info-origin">Name: {b.name_origin}</p>}
            <p className="star-info-muted star-info-origin">
                {years
                    ? `Orbit from JPL Horizons, which includes the planets' pull, ${years[0]}-${years[1]}`
                        + (b.orbit?.check ? ` (within ~${Number(b.orbit.check.worst_km.toPrecision(2)).toLocaleString()} km)` : '')
                        + (years[0] > 1600 || years[1] < 2499 ? ': only approximate outside those years.' : '.')
                    : 'Position from its orbit around the Sun alone (JPL Small-Body Database): close for years around now, drifting over decades as the planets tug it.'}
            </p>

            <button className="button-primary star-info-fly" onClick={onFlyTo}>
                Fly to {b.name}
            </button>
        </div>
    );
}

export default SmallBodyInfoCard;
