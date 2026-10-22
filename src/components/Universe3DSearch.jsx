import React, { useState, useEffect, useMemo, useRef } from 'react';
import { searchIndex } from '../utils/universe3d';

const TYPE_ICONS = { constellation: '✧', star: '★', planet: '●', region: '∴', galaxy: '◎', maser: '◌' };

// Search box with a results dropdown. `/` focuses it, arrows move, Enter picks.
function Universe3DSearch({ items, starBuffers, onSelect }) {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);

    const results = useMemo(() => searchIndex(items, starBuffers, query), [items, starBuffers, query]);

    useEffect(() => setActiveIndex(0), [query]);

    useEffect(() => {
        const handleSlash = (e) => {
            if (e.key === '/' && document.activeElement !== inputRef.current) {
                e.preventDefault();
                inputRef.current.focus();
            }
        };
        window.addEventListener('keydown', handleSlash);
        return () => window.removeEventListener('keydown', handleSlash);
    }, []);

    const pick = (item) => {
        onSelect(item);
        setQuery('');
        inputRef.current.blur();
    };

    const handleKeyDown = (e) => {
        // Keep keys typed here away from the 3D view's shortcuts (Esc, L, N...)
        e.stopPropagation();
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(i => Math.min(i + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(i => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' && results[activeIndex]) {
            pick(results[activeIndex]);
        } else if (e.key === 'Escape') {
            setQuery('');
            inputRef.current.blur();
        }
    };

    const showResults = focused && query.trim() !== '';

    return (
        <div className="universe-3d-search">
            <input
                ref={inputRef}
                type="text"
                value={query}
                placeholder="Search stars, planets, constellations  ( / )"
                aria-label="Search stars, planets or constellations"
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            {showResults && (
                <ul className="universe-3d-search-results" role="listbox">
                    {results.length === 0 && <li className="universe-3d-search-empty">No matches</li>}
                    {results.map((item, i) => (
                        <li
                            key={`${item.type}-${item.abbrev ?? item.starIndex ?? item.id}`}
                            role="option"
                            aria-selected={i === activeIndex}
                            className={i === activeIndex ? 'active' : ''}
                            // mousedown, not click: fires before the input's blur hides the list
                            onMouseDown={(e) => { e.preventDefault(); pick(item); }}
                            onMouseEnter={() => setActiveIndex(i)}
                        >
                            <span className="universe-3d-search-icon">{TYPE_ICONS[item.type]}</span>
                            <span className="universe-3d-search-text">
                                <span className="universe-3d-search-label">{item.label}</span>
                                <span className="universe-3d-search-sublabel">{item.sublabel}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Universe3DSearch;
