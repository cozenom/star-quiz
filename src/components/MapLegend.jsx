import React, { useState } from 'react';

// An on-screen key for something colour-coded, shown only while that thing
// is (the caller decides). Folds to a small chip; folding is remembered per
// legend (storageKey), and phones start folded. Several stack in
// .map-legends, bottom right.
//   title: heading; onTitle: makes it a button (e.g. opens a card)
//   items: [{key, swatch (element), name, onClick?}]

const readOpen = (storageKey) => {
    try {
        const v = localStorage.getItem(storageKey);
        if (v !== null) return v === '1';
    } catch { /* storage blocked */ }
    return !window.matchMedia('(pointer: coarse)').matches;
};

function MapLegend({ title, onTitle, items, storageKey }) {
    const [open, setOpen] = useState(() => readOpen(storageKey));
    const toggle = () => {
        setOpen(o => {
            try { localStorage.setItem(storageKey, o ? '0' : '1'); } catch { /* storage blocked */ }
            return !o;
        });
    };
    if (!open) {
        return (
            <button className="map-legend map-legend-chip" onClick={toggle} title={`Show the key: ${title}`}>
                {title} ▸
            </button>
        );
    }
    return (
        <div className="map-legend">
            <div className="map-legend-head">
                {onTitle
                    ? <button className="map-legend-title map-legend-link" onClick={onTitle}>{title} ›</button>
                    : <span className="map-legend-title">{title}</span>}
                <button className="map-legend-fold" onClick={toggle} aria-label="Hide the key" title="Hide the key">×</button>
            </div>
            {items.map(item => (item.onClick ? (
                <button key={item.key} className="map-legend-row map-legend-link" onClick={item.onClick}>
                    {item.swatch}{item.name}
                </button>
            ) : (
                <div key={item.key} className="map-legend-row">{item.swatch}{item.name}</div>
            )))}
        </div>
    );
}

export default MapLegend;
