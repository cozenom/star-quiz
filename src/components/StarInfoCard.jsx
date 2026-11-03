import React from 'react';
import { describeSpectralType, distanceRange, formatBayer, KM_PER_AU, luminosityVsSun } from '../utils/universe3d';
import { SUN_RADIUS_KM } from '../utils/starDisc';

// Planet orbits (AU) for "if it replaced the Sun, its surface would reach..."
const ORBITS = [['Mercury', 0.387], ['Venus', 0.723], ['Earth', 1.0], ['Mars', 1.524], ['Jupiter', 5.203], ['Saturn', 9.537]];

// Where a radius comes from: a published radius (its reference), a measured
// angular diameter x our distance (linked to the paper on ADS), or estimated
function RadiusSource({ radiusRef, radiusMethod, radiusBib }) {
    if (!radiusRef) return 'estimated from its brightness and colour';
    if (radiusMethod !== 'diam') return radiusRef;
    return (
        <>
            measured diameter ·{' '}
            <a href={`https://ui.adsabs.harvard.edu/abs/${radiusBib}`} target="_blank" rel="noopener noreferrer">{radiusRef}</a>
        </>
    );
}

// radiusRef: source of a measured radius; null = estimated from brightness and colour
function RadiusValue({ radius, radiusRef, radiusMethod, radiusBib }) {
    const km = radius * SUN_RADIUS_KM;
    const au = km / KM_PER_AU;
    const digits = radiusRef ? 3 : 2;  // estimates are good to ~50% at best
    const times = radius >= 10 ** digits ? Math.round(radius).toLocaleString() : Number(radius.toPrecision(digits)).toLocaleString();
    const size = au >= 0.1 ? `${Number(au.toPrecision(digits))} AU` : `${Number(km.toPrecision(digits)).toLocaleString()} km`;
    const passed = ORBITS.filter(([, a]) => au > a).pop();
    return (
        <>
            {radiusRef ? '' : '~'}{times}× the Sun's
            <div className="star-info-muted">{size} · <RadiusSource radiusRef={radiusRef} radiusMethod={radiusMethod} radiusBib={radiusBib} /></div>
            {passed && <div className="star-info-muted">In the Sun's place it would reach past {passed[0]}'s orbit</div>}
        </>
    );
}

// Distances at or above this relative error are shown as approximate
const APPROX_ERR = 0.25;

function formatLy(ly) {
    if (ly < 10) return ly.toFixed(1);
    if (ly < 1000) return String(Math.round(ly));
    return (Math.round(ly / 10) * 10).toLocaleString();
}

function formatLuminosity(times) {
    if (times >= 1) return `${Number(times.toPrecision(2)).toLocaleString()}× the Sun`;
    return `1/${Number((1 / times).toPrecision(2)).toLocaleString()} of the Sun`;
}

function DistanceValue({ dist, err }) {
    const { low, high } = distanceRange(dist, err);
    if (err < 0.1) {
        const pct = err < 0.01 ? '<1' : Math.round(err * 100);
        return <>{formatLy(dist)} ly <span className="star-info-muted">± {pct}%</span></>;
    }
    if (high !== null) {
        return (
            <>
                ~{formatLy(dist)} ly
                <div className="star-info-muted">likely {formatLy(low)}–{formatLy(high)} ly</div>
            </>
        );
    }
    return (
        <>
            over {formatLy(low)} ly
            <div className="star-info-muted">too far for its parallax to be measured well</div>
        </>
    );
}

function StarInfoCard({ star, lineInfo, onClose, onFlyTo, onFocus }) {
    const bayer = formatBayer(lineInfo?.bayer);
    const title = star.name || bayer || `HIP ${star.hip}`;
    const subtitle = [
        star.name && bayer,
        lineInfo?.constellations.join(', '),
        `HIP ${star.hip}`,
    ].filter(Boolean).join(' · ');
    const isApprox = star.err >= APPROX_ERR;
    const description = describeSpectralType(star.spect);

    return (
        <div className="star-info">
            <button className="star-info-close" onClick={onClose} aria-label="Close">×</button>
            <h3 className="star-info-title">{title}</h3>
            <div className="star-info-subtitle">{subtitle}</div>
            <div className="star-info-actions">
                <button className="button-secondary star-info-fly" onClick={onFocus} title="Turn to face it without moving">Focus on</button>
                <button className="button-primary star-info-fly" onClick={onFlyTo}>Fly to star</button>
            </div>

            <dl className="star-info-facts">
                <dt>Distance {isApprox && <span className="star-info-approx">approx.</span>}</dt>
                <dd>
                    <DistanceValue dist={star.dist} err={star.err} />
                    <div className="star-info-muted">
                        {star.src === 'lit'
                            ? 'Published estimate (its own parallax is too uncertain)'
                            : `${star.src === 'gaia' ? 'Gaia DR3' : 'Hipparcos'} parallax`}
                    </div>
                </dd>

                {star.spect && (
                    <>
                        <dt>Type</dt>
                        <dd>
                            {description ? `${description[0].toUpperCase()}${description.slice(1)}` : 'Star'}
                            <span className="star-info-muted"> ({star.spect})</span>
                        </dd>
                    </>
                )}

                {star.radius && (
                    <>
                        <dt>Radius {!star.radiusRef && <span className="star-info-approx">est.</span>}</dt>
                        <dd><RadiusValue radius={star.radius} radiusRef={star.radiusRef} radiusMethod={star.radiusMethod} radiusBib={star.radiusBib} /></dd>
                    </>
                )}

                <dt>Brightness</dt>
                <dd>
                    Magnitude {star.mag.toFixed(2)} from Earth
                    <div className="star-info-muted">
                        {isApprox ? '~' : ''}{formatLuminosity(luminosityVsSun(star.mag, star.dist))} in visible light
                    </div>
                </dd>
            </dl>

            {lineInfo?.origin && (
                <p className="star-info-origin">
                    <strong>Name origin{lineInfo.culturalGroup ? ` (${lineInfo.culturalGroup})` : ''}:</strong> {lineInfo.origin}
                </p>
            )}
        </div>
    );
}

export default StarInfoCard;
