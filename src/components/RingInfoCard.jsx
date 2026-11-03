import React from 'react';
import { ringSubtitle } from '../utils/rings';

// Uses the star card's styles (.star-info-*). feature: a RING_FEATURES entry.

const fmt = (km) => Math.round(km).toLocaleString();

function RingInfoCard({ feature: f, onClose, onView }) {
    const [inner, outer] = f.km;
    const narrow = outer - inner < 200 && f.kind !== 'group';

    return (
        <div className="star-info">
            <button className="star-info-close" onClick={onClose} aria-label="Close">×</button>
            <h3 className="star-info-title">{f.name}</h3>
            <div className="star-info-subtitle">{ringSubtitle(f)}</div>
            <div className="star-info-actions">
                <button className="button-primary star-info-fly" onClick={onView}>
                    {f.kind === 'gap' ? 'View the gap' : f.kind === 'group' ? 'View the rings' : 'View the ring'}
                </button>
            </div>

            <dl className="star-info-facts">
                <dt>From {f.planet}</dt>
                <dd>
                    {narrow ? `${fmt((inner + outer) / 2)} km` : `${fmt(inner)} – ${fmt(outer)} km`}
                    <div className="star-info-muted">from its centre</div>
                </dd>

                <dt>Width</dt>
                <dd>{f.width ?? `${fmt(outer - inner)} km`}</dd>

                <dt>Made of</dt>
                <dd>{f.madeOf}</dd>

                {f.discovered && (
                    <>
                        <dt>Discovered</dt>
                        <dd>{f.discovered}</dd>
                    </>
                )}
            </dl>

            <p className="star-info-origin">{f.note}</p>
        </div>
    );
}

export default RingInfoCard;
