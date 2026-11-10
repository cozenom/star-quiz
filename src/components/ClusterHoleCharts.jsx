import React, { useState } from 'react';
import { BH_MARKER_COLOR } from '../utils/blackHoles3d';
import { bvToColor } from '../utils/universe3d';

// A cluster's black hole's card charts (black_holes.json, kind 'cluster':
// Omega Centauri's):
//   - FastStarsSky: the sky round the cluster's centre at the clock's date,
//     as Hubble sees it (east left, north up): the fast stars at their
//     places (each moving in a straight line as measured: the 2002-2023
//     stretch solid, a century either side faint), sized by brightness,
//     filled where 3 sigma above the escape speed; the centre with its 1"
//     uncertainty and the discoverers' two other places for the black
//     hole. Hover a star for its numbers
//   - MassChart: each study's mass for it on one log scale (limits as
//     arrows, ranges as bars), the drawn mass marked. Hover a row for how
//     it was measured
// Card-sized SVG; the black hole's marker colour for the marks, the card's
// inks for text.

const hex = (n) => `#${n.toString(16).padStart(6, '0')}`;
const ACCENT = hex(BH_MARKER_COLOR);
const INK_MUTED = '#94a3b8';
const INK = '#cbd5e1';
const INK_STRONG = '#f1f5f9';
const GRID = 'rgba(148, 163, 184, 0.18)';
const SURFACE = '#0f172a';
const W = 288;
const fmt = (n) => Math.round(n).toLocaleString();
const starCss = (bv) => `rgb(${bvToColor(bv).map(c => Math.round(c * 255)).join(', ')})`;

// The sky: arcsec from the centre to the side edges, the panel's height
// (px), the measured years, how far the faint track runs either side of
// them (years), a star's dot's radius by its magnitude (px)
const SKY_HALF = 2.9;
const SKY_H = 220;
const MEASURED = [2002, 2023];
const TRACK_YEARS = 100;
const DOT_PX = (mag) => 4 + Math.max(0, 22.5 - mag) * 0.8;
const HIT_PX = 12;

export function FastStarsSky({ sys, t }) {
    const [hover, setHover] = useState(null);
    const scale = W / 2 / SKY_HALF;     // px per arcsec
    const cx = W / 2, cy = SKY_H / 2;
    const sx = (e) => cx - e * scale;
    const sy = (n) => cy - n * scale;
    const at = (s, year) => {
        const dt = year - sys.epoch_year;
        return [s.off_arcsec[0] + s.pm_mas_yr[0] / 1000 * dt, s.off_arcsec[1] + s.pm_mas_yr[1] / 1000 * dt];
    };
    const au = sys.cluster.au_per_arcsec;
    const errPx = sys.centres.err_arcsec * scale;
    const [mx, my] = sys.centres.mcmc;
    const [lx, ly] = sys.centres.min_mass;
    const hs = hover !== null ? sys.fast_stars[hover] : null;
    return (
        <>
            <svg viewBox={`0 0 ${W} ${SKY_H}`} width="100%" role="img" onMouseLeave={() => setHover(null)}
                aria-label="The fast stars round the cluster's centre at the clock's date, as Hubble sees them">
                <defs>
                    <clipPath id="cluster-sky-clip"><rect x="0" y="0" width={W} height={SKY_H} /></clipPath>
                </defs>
                <g clipPath="url(#cluster-sky-clip)">
                    <circle cx={cx} cy={cy} r={errPx} fill="none" stroke={INK_MUTED} strokeOpacity="0.6" strokeDasharray="3 3" />
                    <path d={`M${cx - 5},${cy}L${cx + 5},${cy}M${cx},${cy - 5}L${cx},${cy + 5}`} stroke={INK} strokeWidth="1.5" />
                    <path d={`M${sx(mx)},${sy(my) - 4}L${sx(mx) + 4},${sy(my)}L${sx(mx)},${sy(my) + 4}L${sx(mx) - 4},${sy(my)}Z`} fill="none" stroke={INK} strokeWidth="1.2" />
                    <path d={`M${sx(lx) - 3},${sy(ly) - 3}L${sx(lx) + 3},${sy(ly) + 3}M${sx(lx) + 3},${sy(ly) - 3}L${sx(lx) - 3},${sy(ly) + 3}`} stroke={INK} strokeWidth="1.2" />
                    {sys.fast_stars.map((s, k) => {
                        const [a0, b0] = at(s, MEASURED[0] - TRACK_YEARS);
                        const [a1, b1] = at(s, MEASURED[1] + TRACK_YEARS);
                        const [m0, n0] = at(s, MEASURED[0]);
                        const [m1, n1] = at(s, MEASURED[1]);
                        const colour = starCss(s.b_v);
                        return (
                            <g key={s.id}>
                                <line x1={sx(a0)} y1={sy(b0)} x2={sx(a1)} y2={sy(b1)} stroke={ACCENT} strokeOpacity="0.3" strokeWidth="1" />
                                <line x1={sx(m0)} y1={sy(n0)} x2={sx(m1)} y2={sy(n1)} stroke={ACCENT} strokeOpacity={hover === k ? 1 : 0.75} strokeWidth="2" strokeLinecap="round" />
                                <circle cx={sx(a1)} cy={sy(b1)} r="1.5" fill={ACCENT} fillOpacity="0.5" />
                                {(() => {
                                    const [e, n] = at(s, t);
                                    const r = DOT_PX(s.mag_606);
                                    return (
                                        <>
                                            <circle cx={sx(e)} cy={sy(n)} r={r} fill={s.robust ? colour : SURFACE} stroke={s.robust ? SURFACE : colour} strokeWidth={s.robust ? 2 : 1.5} />
                                            <text x={sx(e) + r + 3} y={sy(n) - r + 1} fontSize="10" fill={hover === k ? INK_STRONG : INK}>{s.id}</text>
                                            <circle cx={sx(e)} cy={sy(n)} r={HIT_PX} fill="transparent" onMouseEnter={() => setHover(k)} onClick={() => setHover(k)} />
                                        </>
                                    );
                                })()}
                            </g>
                        );
                    })}
                </g>
                <g fontSize="9" fill={INK_MUTED}>
                    <line x1="18" y1="34" x2="18" y2="14" stroke={INK_MUTED} />
                    <text x="18" y="10" textAnchor="middle">N</text>
                    <line x1="18" y1="34" x2="2" y2="34" stroke={INK_MUTED} />
                    <text x="8" y="46" textAnchor="middle">E</text>
                    <line x1={W - 8 - scale} x2={W - 8} y1={SKY_H - 10} y2={SKY_H - 10} stroke={INK_MUTED} strokeWidth="1.5" />
                    <text x={W - 8 - scale / 2} y={SKY_H - 14} textAnchor="middle">1&Prime; = {fmt(au)} AU</text>
                </g>
            </svg>
            <div className="star-info-muted">
                {hs
                    ? <>Star {hs.id}: {hs.v2d_km_s} ± {hs.v2d_err_km_s} km/s across the sky, {hs.r_proj_arcsec}&Prime; ({fmt(hs.r_proj_au)} AU) from the centre; magnitude {hs.mag_606}{hs.robust ? '' : '; not 3σ above the escape speed, left out of the mass limits'}</>
                    : <>Hover a star for its numbers. + the centre, its 1&Prime; uncertainty dashed; ◇ where the stars&apos; accelerations put the black hole; × the place needing the least mass. Filled: 3σ above the escape speed</>}
            </div>
        </>
    );
}

// The mass scale (Suns, log), its ticks, a row's height (px: its label,
// then its mark)
const MASS_RANGE = [1000, 150000];
const MASS_TICKS = [1000, 3000, 10000, 30000, 100000];
const ROW_H = 30;
const AXIS_H = 20;
const PAD_X = 6;
const ARROW = 5;
// Below the rows: the drawn mass's label (px)
const DRAWN_H = 16;

const estimateText = (e) => (e.kind === 'min' ? `at least ${fmt(e.value)}`
    : e.kind === 'max' ? `at most ${fmt(e.value)}`
        : e.kind === 'range' ? `${fmt(e.lo)} to ${fmt(e.hi)}`
            : e.kind === 'value' ? (e.lo ? `${fmt(e.value)} (${fmt(e.lo)} to ${fmt(e.hi)})` : `about ${fmt(e.value)}`)
                : 'none needed');

export function MassChart({ sys }) {
    const [hover, setHover] = useState(null);
    const est = sys.estimates;
    const H = AXIS_H + est.length * ROW_H + DRAWN_H;
    const lx = Math.log10(MASS_RANGE[0]), hx = Math.log10(MASS_RANGE[1]);
    const x = (m) => PAD_X + (Math.log10(m) - lx) / (hx - lx) * (W - 2 * PAD_X);
    const drawn = sys.black_hole.mass_msun;
    const he = hover !== null ? est[hover] : null;
    return (
        <>
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" onMouseLeave={() => setHover(null)}
                aria-label="Each study's mass for the black hole, in Suns, on one scale">
                {MASS_TICKS.map(m => (
                    <g key={m}>
                        <line x1={x(m)} x2={x(m)} y1={AXIS_H - 4} y2={H} stroke={GRID} />
                        <text x={x(m)} y={AXIS_H - 8} fontSize="9" fill={INK_MUTED} textAnchor={m === MASS_TICKS[0] ? 'start' : 'middle'}>{m >= 1000 ? `${m / 1000}k` : m}</text>
                    </g>
                ))}
                <line x1={x(drawn)} x2={x(drawn)} y1={AXIS_H - 4} y2={H - DRAWN_H + 2} stroke={INK} strokeOpacity="0.7" strokeDasharray="3 3" />
                <text x={x(drawn)} y={H - 3} fontSize="9" fill={INK} textAnchor="middle">drawn: {fmt(drawn)}</text>
                {est.map((e, k) => {
                    const y0 = AXIS_H + k * ROW_H;
                    const ym = y0 + 21;
                    const on = hover === k;
                    const stroke = { stroke: ACCENT, strokeWidth: 2, strokeOpacity: on ? 1 : 0.85, strokeLinecap: 'round' };
                    let mark = null;
                    if (e.kind === 'min' || e.kind === 'max') {
                        const end = e.kind === 'min' ? W - PAD_X : PAD_X;
                        const dir = e.kind === 'min' ? 1 : -1;
                        mark = (
                            <>
                                <line x1={x(e.value)} x2={end} y1={ym} y2={ym} {...stroke} />
                                <path d={`M${end - dir * ARROW},${ym - ARROW}L${end},${ym}L${end - dir * ARROW},${ym + ARROW}`} fill="none" {...stroke} />
                                <line x1={x(e.value)} x2={x(e.value)} y1={ym - 5} y2={ym + 5} {...stroke} />
                            </>
                        );
                    } else if (e.kind === 'range') {
                        mark = <rect x={x(e.lo)} y={ym - 4} width={Math.max(x(e.hi) - x(e.lo), 4)} height="8" rx="4" fill={ACCENT} fillOpacity={on ? 1 : 0.85} />;
                    } else if (e.kind === 'value') {
                        mark = (
                            <>
                                {e.lo && <line x1={x(e.lo)} x2={x(e.hi)} y1={ym} y2={ym} {...stroke} />}
                                <circle cx={x(e.value)} cy={ym} r="4" fill={ACCENT} stroke={SURFACE} strokeWidth="2" />
                            </>
                        );
                    }
                    return (
                        <g key={k} onMouseEnter={() => setHover(k)} onClick={() => setHover(k)}>
                            <rect x="0" y={y0} width={W} height={ROW_H} fill={on ? 'rgba(148, 163, 184, 0.08)' : 'transparent'} />
                            <text x={PAD_X} y={y0 + 10} fontSize="10" fill={on ? INK_STRONG : INK}>{e.who}: {estimateText(e)}</text>
                            {mark}
                        </g>
                    );
                })}
            </svg>
            <div className="star-info-muted">
                {he ? <>{he.who}, from {he.how}{he.note ? `: ${he.note}` : ''}</>
                    : <>Suns, on a log scale. Arrows: limits (at least, at most); bars and dots: estimates with their range. Hover a row for how it was measured</>}
            </div>
        </>
    );
}
