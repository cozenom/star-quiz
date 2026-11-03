import React, { useState } from 'react';

// A section of the 3D view's options panel, folded by its heading.
// Open/closed is remembered per section (id); all start open.
//   info: {onClick, title}: a "?" beside the heading (e.g. opens a card)

const storageKey = (id) => `universe3d.section.${id}`;

const readOpen = (id) => {
    try {
        const v = localStorage.getItem(storageKey(id));
        if (v !== null) return v === '1';
    } catch { /* storage blocked */ }
    return true;
};

function Universe3DSection({ id, title, info, children }) {
    const [open, setOpen] = useState(() => readOpen(id));
    const toggle = () => setOpen(o => {
        try { localStorage.setItem(storageKey(id), o ? '0' : '1'); } catch { /* storage blocked */ }
        return !o;
    });
    return (
        <div className="universe-3d-section">
            <div className="universe-3d-option-row">
                <button className="universe-3d-section-head" onClick={toggle} aria-expanded={open}>
                    <span className="universe-3d-section-arrow">{open ? '▾' : '▸'}</span>
                    {title}
                </button>
                {info && (
                    <button className="universe-3d-info-button" onClick={info.onClick} title={info.title} aria-label={info.title}>
                        ?
                    </button>
                )}
            </div>
            {open && <div className="universe-3d-section-body">{children}</div>}
        </div>
    );
}

export default Universe3DSection;
