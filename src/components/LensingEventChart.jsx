import React, { useMemo, useState } from 'react';
import { BH_EVENT_COLOR, BH_MARKER_COLOR, bhEvent } from '../utils/blackHoles3d';
import { msOf } from '../utils/galacticCentre3d';

// A lone black hole's microlensing event, as seen from Earth (black_holes.json
// event, utils/blackHoles3d bhEvent), at the clock's date:
//   - the light curve: how many times brighter the star behind looked (its
//     two images together, against the star alone; log scale), the clock's
//     date marked; hover for the date and the brightening
//   - the sky round the black hole: its Einstein ring, the star's path past
//     it, and at the clock's date the star's true place and its two images
//     (sized by their brightness). North up, east left, as on the sky.
// Card-sized SVG; colours: the event's (BH_EVENT_COLOR, amber) and the
// black hole's marker's; text in the card's inks.

const hex = (n) => `#${n.toString(16).padStart(6, '0')}`;
const EVENT = hex(BH_EVENT_COLOR);
const MARKER = hex(BH_MARKER_COLOR);
const INK_MUTED = '#94a3b8';
const INK = '#cbd5e1';
const GRID = 'rgba(148, 163, 184, 0.18)';
const SURFACE = '#0f172a';
const W = 288;
// The light curve: its years, its height (px) and margins, its brightening
// range (log)
const CURVE_YEARS = [2010.6, 2012.5];
const CURVE_H = 120;
const M = { left: 34, right: 8, top: 10, bottom: 18 };
const A_MAX_AXIS = 600;
const A_TICKS = [1, 10, 100];
// Samples: evenly over the years, and finely round the peak (it lasts a few
// days: brighter than 100x for about 2)
const CURVE_SAMPLES = 700;
const PEAK_SAMPLES = 600;
const PEAK_HALF_DAYS = 12;
// The sky: how many theta_E from the black hole to each edge, the panel's
// height (px), the star's path's years, the images' sizes (px, by
// brightness)
const SKY_THETA = 1.8;
const SKY_H = 200;
const PATH_YEARS = [2010.5, 2013.0];
const PATH_SAMPLES = 400;
const PATH_TICKS = [2011, 2012];
const IMAGE_PX = (m) => Math.min(2.5 + 2 * Math.sqrt(m), 9);

const dateOf = (year) => new Date(msOf(year)).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
const times = (a) => (a >= 10 ? `${Math.round(a)}x` : `${a.toFixed(2)}x`);

function LightCurve({ sys, t }) {
    const [hover, setHover] = useState(null);
    const ev = sys.event;
    const x = (year) => M.left + (year - CURVE_YEARS[0]) / (CURVE_YEARS[1] - CURVE_YEARS[0]) * (W - M.left - M.right);
    const y = (a) => M.top + (1 - Math.log10(a) / Math.log10(A_MAX_AXIS)) * (CURVE_H - M.top - M.bottom);
    const path = useMemo(() => {
        const years = [];
        for (let k = 0; k <= CURVE_SAMPLES; k++) years.push(CURVE_YEARS[0] + (CURVE_YEARS[1] - CURVE_YEARS[0]) * k / CURVE_SAMPLES);
        for (let k = 0; k <= PEAK_SAMPLES; k++) years.push(ev.peak_year + (2 * k / PEAK_SAMPLES - 1) * PEAK_HALF_DAYS / 365.25);
        years.sort((a, b) => a - b);
        return years.map((year, k) => `${k ? 'L' : 'M'}${x(year).toFixed(2)},${y(bhEvent(sys, year).magnification).toFixed(2)}`).join('');
    }, [sys]);
    const inRange = t >= CURVE_YEARS[0] && t <= CURVE_YEARS[1];
    const now = inRange ? bhEvent(sys, t) : null;
    const onMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) * W / rect.width;
        const year = CURVE_YEARS[0] + (px - M.left) / (W - M.left - M.right) * (CURVE_YEARS[1] - CURVE_YEARS[0]);
        setHover(year >= CURVE_YEARS[0] && year <= CURVE_YEARS[1] ? year : null);
    };
    const hoverEv = hover !== null ? bhEvent(sys, hover) : null;
    const peakX = x(ev.peak_year), peakY = y(ev.a_max);
    return (
        <svg viewBox={`0 0 ${W} ${CURVE_H}`} width="100%" role="img" onMouseMove={onMove} onMouseLeave={() => setHover(null)}
            aria-label={`How much brighter the star behind looked: up to ${ev.a_max} times, on ${dateOf(ev.peak_year)}`}>
            {A_TICKS.map(a => (
                <g key={a}>
                    <line x1={M.left} x2={W - M.right} y1={y(a)} y2={y(a)} stroke={GRID} />
                    <text x={M.left - 5} y={y(a) + 3.5} fontSize="10" fill={INK_MUTED} textAnchor="end">{a}x</text>
                </g>
            ))}
            {[2011, 2012].map(year => (
                <text key={year} x={x(year)} y={CURVE_H - 4} fontSize="10" fill={INK_MUTED} textAnchor="middle">{year}</text>
            ))}
            <path d={path} fill="none" stroke={EVENT} strokeWidth="2" strokeLinejoin="round" />
            <text x={peakX + 7} y={peakY + 4} fontSize="10" fill={INK}>{ev.a_max}x · {dateOf(ev.peak_year)}</text>
            {now && (
                <g>
                    <line x1={x(t)} x2={x(t)} y1={M.top} y2={CURVE_H - M.bottom} stroke={INK_MUTED} strokeDasharray="2 3" />
                    <circle cx={x(t)} cy={y(now.magnification)} r="4.5" fill={EVENT} stroke={SURFACE} strokeWidth="2" />
                </g>
            )}
            {hoverEv && (
                <g pointerEvents="none">
                    <line x1={x(hover)} x2={x(hover)} y1={M.top} y2={CURVE_H - M.bottom} stroke={INK} strokeOpacity="0.5" />
                    <circle cx={x(hover)} cy={y(hoverEv.magnification)} r="3" fill={INK} />
                    <text x={x(hover) > W / 2 ? x(hover) - 6 : x(hover) + 6} y={M.top + 10} fontSize="10" fill="#f1f5f9"
                        textAnchor={x(hover) > W / 2 ? 'end' : 'start'}>{dateOf(hover)}: {times(hoverEv.magnification)}</text>
                </g>
            )}
        </svg>
    );
}

function Sky({ sys, t }) {
    const ev = sys.event;
    const scale = SKY_H / 2 / SKY_THETA;     // px per theta_E
    const cx = W / 2, cy = SKY_H / 2;
    // East left, north up
    const sx = (e) => cx - e * scale;
    const sy = (n) => cy - n * scale;
    const path = useMemo(() => {
        const pts = [];
        for (let k = 0; k <= PATH_SAMPLES; k++) {
            const year = PATH_YEARS[0] + (PATH_YEARS[1] - PATH_YEARS[0]) * k / PATH_SAMPLES;
            const l = bhEvent(sys, year).lens;
            pts.push(`${k ? 'L' : 'M'}${sx(-l[0]).toFixed(2)},${sy(-l[1]).toFixed(2)}`);
        }
        return pts.join('');
    }, [sys]);
    const now = bhEvent(sys, t);
    const inView = now && now.u < SKY_THETA * 1.2;
    const fiveMas = 5 / ev.theta_e_mas * scale;
    return (
        <svg viewBox={`0 0 ${W} ${SKY_H}`} width="100%" role="img"
            aria-label="The sky round the black hole as seen from Earth: its Einstein ring, the star's path behind it, and the star's two images at the clock's date">
            <defs>
                <clipPath id="lensing-sky-clip"><rect x="0" y="0" width={W} height={SKY_H} /></clipPath>
            </defs>
            <g clipPath="url(#lensing-sky-clip)">
                <circle cx={cx} cy={cy} r={scale} fill="none" stroke={INK_MUTED} strokeOpacity="0.6" strokeDasharray="3 3" />
                <path d={path} fill="none" stroke={INK_MUTED} strokeOpacity="0.55" strokeWidth="1" />
                {PATH_TICKS.map(year => {
                    const l = bhEvent(sys, year).lens;
                    return (
                        <g key={year}>
                            <circle cx={sx(-l[0])} cy={sy(-l[1])} r="2" fill={INK_MUTED} />
                            <text x={sx(-l[0]) + 5} y={sy(-l[1]) + 3.5} fontSize="9" fill={INK_MUTED}>Jan {year}</text>
                        </g>
                    );
                })}
                {inView && (
                    <g>
                        <circle cx={sx(-now.lens[0])} cy={sy(-now.lens[1])} r="3" fill="none" stroke={INK} strokeWidth="1" />
                        {now.images.map(([e, n, m], k) => (
                            <circle key={k} cx={sx(e)} cy={sy(n)} r={IMAGE_PX(m)} fill={EVENT} stroke={SURFACE} strokeWidth="1.5" />
                        ))}
                    </g>
                )}
                <circle cx={cx} cy={cy} r="4" fill="#000" stroke={MARKER} strokeWidth="1.5" />
            </g>
            <text x={cx + scale * 0.72 + 4} y={cy + scale * 0.72 + 10} fontSize="9" fill={INK_MUTED}>Einstein ring</text>
            {/* Compass and scale */}
            <g fontSize="9" fill={INK_MUTED}>
                <line x1="18" y1="34" x2="18" y2="14" stroke={INK_MUTED} />
                <text x="18" y="10" textAnchor="middle">N</text>
                <line x1="18" y1="34" x2="2" y2="34" stroke={INK_MUTED} />
                <text x="8" y="46" textAnchor="middle">E</text>
                <line x1={W - 8 - fiveMas} x2={W - 8} y1={SKY_H - 10} y2={SKY_H - 10} stroke={INK_MUTED} strokeWidth="1.5" />
                <text x={W - 8 - fiveMas / 2} y={SKY_H - 14} textAnchor="middle">5 mas</text>
            </g>
        </svg>
    );
}

// sys: a lone system; t: the clock (year); onWatch: set the clock to just
// before the event, running
export default function LensingEventChart({ sys, t, onWatch }) {
    const ev = sys.event;
    const now = bhEvent(sys, t);
    // Off the build's path (before 2009, after 2024): far from it, moving
    // straight away at their relative speed
    const apartMas = now ? now.u * ev.theta_e_mas : Math.abs(t - ev.peak_year) * ev.mu_rel_mas_yr;
    return (
        <div className="lensing-chart">
            <div className="lensing-chart-head">
                <span>The event, from Earth</span>
                <button className="button-secondary lensing-chart-watch" onClick={onWatch} title="Set the clock to late 2010, a month a second">Watch it</button>
            </div>
            <div className="star-info-muted">How many times brighter the star behind looked</div>
            <LightCurve sys={sys} t={t} />
            <div className="star-info-muted">The sky round it at the clock&apos;s date ({dateOf(t)}): the black hole at the centre, its Einstein ring dashed, the star&apos;s path past it, its true place (open) and its two images (filled, sized by brightness)</div>
            <Sky sys={sys} t={t} />
            <div className="star-info-muted">
                {now && now.u < 1.2 * SKY_THETA
                    ? <>The star {apartMas.toFixed(apartMas < 0.1 ? 3 : 1)} mas from the black hole, {times(now.magnification)} as bright; its images together seen {now.shiftMas.toFixed(2)} mas from its true place</>
                    : <>The star {apartMas >= 1000 ? `${(apartMas / 1000).toFixed(2)} arcseconds` : `${Math.round(apartMas)} mas`} from the black hole at the clock&apos;s date, off this view{now ? <>; its image still seen {now.shiftMas.toFixed(2)} mas from its true place</> : ''}</>}
            </div>
        </div>
    );
}
