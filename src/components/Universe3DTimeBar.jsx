import React, { useEffect, useRef, useState } from 'react';

// ---------- Speed ----------
// The clock's rate is simulated seconds per real second: 0 stops time,
// negative runs backwards. Round speeds the slider snaps to and « » / [ ]
// jump between:
const YEAR_S = 31557600;
export const PRESETS = [1, 60, 3600, 86400, 604800, 2629800, YEAR_S];
const MAX_RATE = YEAR_S;

// Next round speed above (direction +1) or below (-1) a rate, through 0:
// slower than real time forwards is real time backwards
export function nextPresetRate(rate, direction) {
    const all = [...PRESETS.map(r => -r).reverse(), ...PRESETS];
    const eps = 1e-6 * Math.max(1, Math.abs(rate));
    const next = direction > 0
        ? all.find(r => r > rate + eps)
        : [...all].reverse().find(r => r < rate - eps);
    return next ?? (direction > 0 ? MAX_RATE : -MAX_RATE);
}

// Speed slider position (-1..1) <-> rate. The middle (|v| < DEAD) stops
// time; outwards the speed grows on a log scale, 1x to 1 year/s.
const DEAD = 0.06;
const SNAP = 0.025;
const LOG_MAX = Math.log10(MAX_RATE);
const presetPosition = (rate) => DEAD + (1 - DEAD) * Math.log10(rate) / LOG_MAX;

function rateToSlider(rate) {
    if (rate === 0) return 0;
    return Math.sign(rate) * presetPosition(Math.min(Math.abs(rate), MAX_RATE));
}

function sliderToRate(v) {
    const a = Math.abs(v);
    if (a < DEAD) return 0;
    // Snap onto a round speed when close to it
    const preset = PRESETS.find(r => Math.abs(presetPosition(r) - a) < SNAP);
    const rate = preset ?? 10 ** ((a - DEAD) / (1 - DEAD) * LOG_MAX);
    return Math.sign(v) * rate;
}

const UNITS = [
    [YEAR_S, 'year'], [2629800, 'month'], [604800, 'week'], [86400, 'day'],
    [3600, 'hour'], [60, 'min'], [1, 'sec'],
];

// 86400 -> "1 day/s", 280000 -> "3.2 days/s", 1 -> "Real time"
export function formatRate(rate) {
    const r = Math.abs(rate);
    if (r === 0) return 'Stopped';
    if (Math.abs(r - 1) < 1e-9) return 'Real time';
    const [size, unit] = UNITS.find(([s]) => r >= s * 0.999) ?? UNITS[UNITS.length - 1];
    const n = r / size;
    const shown = n < 9.95 ? Number(n.toFixed(1)) : Math.round(n);
    return `${shown} ${unit}${shown === 1 || unit === 'min' || unit === 'sec' ? '' : 's'}/s`;
}

// ---------- Dates ----------
// Planets follow JPL Horizons over the whole range (planet_orbits.json);
// the big moons' Horizons orbits cover at least 1800-2200 (Saturn's from
// 1750, Uranus' 1600-2400), and are carried on, drifting, outside them
const MOONS_FITTED_YEARS = [1800, 2200];
export const TIME_RANGE = [Date.UTC(1600, 0, 1), Date.UTC(2500, 0, 1)];
// How far the date scrubber reaches either side of its centre (All: the
// whole range). Its ends label the dates at the span's own resolution.
const DAY_MS = 86400000;
const SCRUB_SPANS = [
    { id: 'day', label: 'Day', half: DAY_MS, ends: { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' } },
    { id: 'month', label: 'Month', half: 30.44 * DAY_MS, ends: { month: 'short', day: 'numeric', year: 'numeric' } },
    { id: 'year', label: 'Year', half: YEAR_S * 1000, ends: { month: 'short', year: 'numeric' } },
    { id: 'decade', label: 'Decade', half: 10 * YEAR_S * 1000, ends: { year: 'numeric' } },
    { id: 'century', label: 'Century', half: 100 * YEAR_S * 1000, ends: { year: 'numeric' } },
    { id: 'all', label: 'All', half: null, ends: { year: 'numeric' } },
];
const SCRUB_STEPS = 10000;

const pad = (n) => String(n).padStart(2, '0');
// Local time as a datetime-local input value ("2026-10-14T21:45")
const toInputValue = (ms) => {
    const d = new Date(ms);
    return `${String(d.getFullYear()).padStart(4, '0')}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const clampTime = (ms) => Math.min(TIME_RANGE[1], Math.max(TIME_RANGE[0], ms));

// The scrubber's window [start, end] for a span around its centre, kept
// inside TIME_RANGE (shifted, not cut, near the ends)
function scrubWindow(span, anchor) {
    if (!span.half) return TIME_RANGE;
    const half = Math.min(span.half, (TIME_RANGE[1] - TIME_RANGE[0]) / 2);
    const start = Math.min(TIME_RANGE[1] - 2 * half, Math.max(TIME_RANGE[0], anchor - half));
    return [start, start + 2 * half];
}

function Universe3DTimeBar({ time, rate, playing, onTogglePlay, onSetRate, onStep, onNow, onSetTime }) {
    const inputRef = useRef(null);

    // Date scrubber window: the chosen span centred on `anchor`, re-centred
    // whenever the time leaves it (running time, a jump) unless the user is
    // dragging it, and on a new span
    const [spanId, setSpanId] = useState('year');
    const span = SCRUB_SPANS.find(sp => sp.id === spanId);
    const [anchor, setAnchor] = useState(time);
    const [start, end] = scrubWindow(span, anchor);
    const scrubbing = useRef(false);
    useEffect(() => {
        if (!scrubbing.current && (time < start || time > end)) setAnchor(time);
    }, [time, start, end]);
    const endLabel = (ms) => new Date(ms).toLocaleString(undefined, span.ends);

    const date = new Date(time);
    const showSeconds = playing && Math.abs(rate) <= 60;
    const dateText = date.toLocaleString(undefined, {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', ...(showSeconds ? { second: '2-digit' } : {}),
    });
    const year = date.getFullYear();
    const moonsApprox = year < MOONS_FITTED_YEARS[0] || year > MOONS_FITTED_YEARS[1];
    const isNow = playing && rate === 1 && Math.abs(time - Date.now()) < 60000;
    const speedText = !playing ? 'Paused' : `${rate < 0 ? '◀ ' : ''}${formatRate(rate)}`;

    return (
        <div className="universe-3d-time">
            <div className="universe-3d-time-row">
                <button onClick={() => onStep(-1)} title="Slower / backwards ( [ )" aria-label="Slower">«</button>
                <button onClick={onTogglePlay} title="Play / pause (Space)" aria-label={playing ? 'Pause' : 'Play'}>
                    {playing ? '❚❚' : '▶'}
                </button>
                <button onClick={() => onStep(1)} title="Faster ( ] )" aria-label="Faster">»</button>
                <span className="universe-3d-time-speed">{speedText}</span>
                <button className="universe-3d-time-now" onClick={onNow} disabled={isNow} title="Back to now (T)">Now</button>
            </div>

            {/* Speed: middle stops time, right runs forwards, left backwards */}
            <div className="universe-3d-time-slider">
                <span aria-hidden="true">◀</span>
                <input
                    type="range"
                    className="universe-3d-time-speed-slider"
                    min={-1000}
                    max={1000}
                    step={1}
                    value={Math.round(rateToSlider(rate) * 1000)}
                    onChange={(e) => onSetRate(sliderToRate(Number(e.target.value) / 1000))}
                    aria-label="Time speed"
                    title="Speed: drag right to run forwards, left to run backwards"
                />
                <span aria-hidden="true">▶</span>
            </div>

            <div className="universe-3d-time-date">
                <button
                    title="Jump to a date"
                    onClick={() => {
                        try {
                            inputRef.current.showPicker();
                        } catch {
                            inputRef.current.focus();
                        }
                    }}
                >
                    {dateText}
                </button>
                {/* Native picker, opened by the button above */}
                <input
                    ref={inputRef}
                    type="datetime-local"
                    tabIndex={-1}
                    aria-label="Date and time"
                    value={toInputValue(time)}
                    min={toInputValue(TIME_RANGE[0])}
                    max={toInputValue(TIME_RANGE[1])}
                    onChange={(e) => {
                        const ms = new Date(e.target.value).getTime();
                        if (!Number.isNaN(ms)) onSetTime(ms);
                    }}
                />
            </div>

            {/* Date: scrub through the chosen span (All: 1600-2500) */}
            <div className="universe-3d-time-slider universe-3d-time-scrub">
                <div className="universe-3d-time-spans" role="group" aria-label="Scrubber reach">
                    {SCRUB_SPANS.map(sp => (
                        <button
                            key={sp.id}
                            className={sp.id === spanId ? 'active' : ''}
                            aria-pressed={sp.id === spanId}
                            onClick={() => { setSpanId(sp.id); setAnchor(time); }}
                            title={sp.half ? `Scrub a ${sp.label.toLowerCase()} either side` : 'Scrub the whole of 1600-2500'}
                        >
                            {sp.label}
                        </button>
                    ))}
                </div>
                <input
                    type="range"
                    min={0}
                    max={SCRUB_STEPS}
                    step={1}
                    value={Math.round((time - start) / (end - start) * SCRUB_STEPS)}
                    onPointerDown={() => { scrubbing.current = true; }}
                    onPointerUp={() => { scrubbing.current = false; }}
                    onChange={(e) => onSetTime(clampTime(start + Number(e.target.value) / SCRUB_STEPS * (end - start)))}
                    aria-label="Date"
                    title="Drag to move through time"
                />
                <div className="universe-3d-time-scrub-ends" aria-hidden="true">
                    <span>{endLabel(start)}</span>
                    <span>{endLabel(end)}</span>
                </div>
            </div>

            {moonsApprox && (
                <div className="universe-3d-time-note">
                    Some moons extrapolated (past JPL's orbits)
                </div>
            )}
        </div>
    );
}

export default Universe3DTimeBar;
