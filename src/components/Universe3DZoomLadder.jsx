import React from 'react';

// Scale bar and zoom ladder, bottom left: the ruler over a row of steps,
// one per scale, nearest on the left. Clicking a step flies there, and it
// stays lit until you zoom; the marker on the line is the zoom now, between
// the steps. The render loop sets the ruler and the marker (the refs).
//   levels: [{id, label, short, title}], nearest first; current: the lit
//   one's id (or null); onSelect(id)

function Universe3DZoomLadder({ levels, current, onSelect, scaleLabelRef, scaleBarRef, markerRef }) {
    return (
        <div className="universe-3d-scale-ladder">
            <div className="universe-3d-scale" title="Scale at the orbit point (screen centre)">
                <div ref={scaleLabelRef} className="universe-3d-scale-label" />
                <div ref={scaleBarRef} className="universe-3d-scale-bar" />
            </div>
            <nav className="universe-3d-ladder" aria-label="Zoom levels">
                <span ref={markerRef} className="universe-3d-ladder-marker" aria-hidden="true" />
                {levels.map(level => (
                    <button
                        key={level.id}
                        className={`universe-3d-ladder-step ${level.id === current ? 'current' : ''}`}
                        onClick={() => onSelect(level.id)}
                        title={level.title}
                        aria-current={level.id === current ? 'true' : undefined}
                    >
                        <span className="universe-3d-ladder-dot" />
                        <span className="universe-3d-ladder-label">{level.label}</span>
                        <span className="universe-3d-ladder-short" aria-hidden="true">{level.short}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}

export default Universe3DZoomLadder;
