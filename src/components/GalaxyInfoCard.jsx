import React from 'react';
import { ARM_LABELS, GALAXY_COLORS, MASER_COLOR } from '../utils/galaxy3d';
import MapLegend from './MapLegend';

// The Milky Way model's cards: the galaxy as a whole (with the key to the
// model's colours), its centre, and each spiral arm. Text and numbers are
// galaxy.json `cards` (Star_Data/curated/galaxy_cards.json, plus numbers
// worked out by scripts/build_galaxy.py). Uses the star and region cards'
// styles (.star-info-*, .region-*).

const hex = (n) => `#${n.toString(16).padStart(6, '0')}`;

// What each colour in the model stands for
export const GALAXY_KEY = [
    { band: true, name: 'Band on the sky', about: 'The Milky Way as seen from inside the disc: this model\'s starlight added up along each line of sight and dimmed by its dust, worked out from wherever you are (not a photo). The band turns into the disc as you fly out.' },
    { color: hex(GALAXY_COLORS.thin[0]), name: 'Old disc stars', about: 'Most of the disc\'s stars: long-lived, cooler and yellower than the Sun on average, spread smoothly round the whole disc.' },
    { color: hex(GALAXY_COLORS.bulge[0]), name: 'Bar and bulge', about: 'The oldest stars, with hardly any new ones forming, so the most orange.' },
    { color: hex(GALAXY_COLORS.arms[0]), name: 'Young stars', about: 'Massive stars are hot and blue-white, and burn out within a few million years, before drifting far from the arm they formed in. That is why the arms stand out.' },
    { color: hex(GALAXY_COLORS.clumps[0]), name: 'Star clusters', about: 'Young stars born together in groups (OB associations), still close to one another.' },
    { color: hex(GALAXY_COLORS.hii[0]), name: 'Glowing gas', about: 'Hydrogen lit up by young hot stars glows red-pink (H II regions), like the Orion Nebula.' },
    { color: '#15110d', name: 'Dust', about: 'Grains of rock and soot that block light, thickest along the inner edge of each arm and in the middle of the disc.' },
    { color: hex(MASER_COLOR), ring: true, name: 'Masers', about: 'Real, not drawn to match: the measured masers at their distances. The faint line through each spans its distance\'s uncertainty, along our line of sight (cut at twice the distance when the far end is open).' },
];

// A key swatch: a dot, a ring for the masers' markers, or a short line
// for their distance ranges
export function KeySwatch({ k }) {
    if (k.line) return <span className="galaxy-legend-line" style={{ background: k.color }} />;
    if (k.band) return <span className="galaxy-legend-band" />;
    const style = k.ring
        ? { background: 'transparent', border: `2px solid ${k.color}` }
        : { background: k.color, border: k.name === 'Dust' ? '1px solid #64748b' : undefined };
    return <span className="universe-3d-swatch" style={style} />;
}

// The on-screen legend, shown while the model is: short names; the card
// (onOpen) has the explanations. Masers' entries only while they're shown.
const LEGEND = [
    ...GALAXY_KEY.filter(k => !k.ring && !k.band),
    { ...GALAXY_KEY.find(k => k.ring), name: 'Masers (measured)', maser: true },
    { color: hex(MASER_COLOR), line: true, name: 'Maser distance uncertainty range', maser: true },
];
// showModel: the model is on screen; showMasers: its masers are (they
// fade in before the model does); showRanges: their distance ranges are drawn
export function GalaxyLegend({ showModel, showMasers, showRanges = true, onOpen }) {
    return (
        <MapLegend
            title="Milky Way (model)"
            onTitle={onOpen}
            storageKey="universe3d.legend.galaxy"
            items={LEGEND.filter(k => (k.maser ? showMasers && (!k.line || showRanges) : showModel)).map(k => ({ key: k.name, swatch: <KeySwatch k={k} />, name: k.name }))}
        />
    );
}

const fmt = (n) => Math.round(n).toLocaleString();
const listing = (names) => names.join(', ');

function Facts({ rows }) {
    return (
        <dl className="star-info-facts">
            {rows.filter(Boolean).map(([label, value]) => (
                <React.Fragment key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                </React.Fragment>
            ))}
        </dl>
    );
}

// Well-known masers on an arm (or at the centre), with their distance;
// each opens its own card (onSelectMaser(index))
function Objects({ objects, onSelectMaser }) {
    if (!objects?.length) return null;
    return (
        <div className="region-part">
            <div className="region-part-head static"><strong>Well-known masers here</strong></div>
            <ul className="region-members">
                {objects.map(o => (
                    <li key={o.name}>
                        <button className="region-member galaxy-object" onClick={() => onSelectMaser(o.maser)}>
                            <div className="galaxy-object-head">
                                <span>{o.name}</span>
                                <span className="star-info-muted">{fmt(o.distance)} ly · {o.constellation} ›</span>
                            </div>
                            <div className="star-info-muted">{o.note}</div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Sources({ refs }) {
    const unique = [...new Set(refs.filter(Boolean))];
    return (
        <p className="star-info-muted star-info-origin">
            Sources: {unique.join('; ')}.
        </p>
    );
}

// Links to the other cards
function Links({ current, cards, onSelect }) {
    const ids = ['milky_way', 'centre', ...Object.keys(cards.arms)].filter(id => id !== current);
    const name = (id) => (id === 'milky_way' ? 'Milky Way' : id === 'centre' ? 'Galactic Centre' : ARM_LABELS[id]);
    return (
        <div className="region-part">
            <ul className="region-members">
                {ids.map(id => (
                    <li key={id}>
                        <button className="region-member" onClick={() => onSelect(id)}>
                            <span>{name(id)}</span>
                            <span className="star-info-muted">›</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function MilkyWay({ card }) {
    return (
        <>
            <h3 className="star-info-title">Milky Way</h3>
            <div className="star-info-subtitle">Our galaxy · barred spiral · drawn as a model</div>
            <p className="star-info-origin">{card.about}</p>
            <Facts rows={[
                ['The Sun', `${fmt(card.sun_distance)} ly from the centre, ${card.sun_height} ly above the middle of the disc`],
                ['Its orbit', `once round every ~${card.orbit_myr} million years, at ${card.orbit_speed_km_s} km/s`],
                ['Bar', `${fmt(card.bar_half_length * 2)} ly long, ${card.bar_angle_deg}° from the line to the Sun`],
                ...card.facts.map(f => [f.label, f.value]),
            ]} />
            <div className="region-part">
                <div className="region-part-head static"><strong>What the colours mean</strong></div>
                {GALAXY_KEY.map(k => (
                    <div key={k.name} className="galaxy-key-row">
                        <KeySwatch k={k} />
                        <div><strong>{k.name}</strong> <span className="star-info-muted">{k.about}</span></div>
                    </div>
                ))}
            </div>
            <div className="region-part">
                <div className="region-part-head static"><strong>What is a maser?</strong></div>
                <p className="star-info-muted region-part-about">{card.maser}</p>
            </div>
            <div className="region-part">
                <div className="region-part-head static"><strong>How we know</strong></div>
                {card.history.map(h => (
                    <div key={h.year} className="galaxy-key-row">
                        <span className="galaxy-year">{h.year}</span>
                        <span className="star-info-muted">{h.text}</span>
                    </div>
                ))}
            </div>
            <Sources refs={[card.orbit_speed_ref, ...card.facts.map(f => f.ref), card.maser_ref, ...card.history.map(h => h.ref)]} />
        </>
    );
}

function Centre({ card, bar, onSelectMaser }) {
    return (
        <>
            <h3 className="star-info-title">Galactic Centre</h3>
            <div className="star-info-subtitle">Sagittarius A* · supermassive black hole</div>
            <p className="star-info-origin">{card.about}</p>
            <Facts rows={[
                ['Distance', `${fmt(card.distance)} ly, in ${card.constellation}`],
                ['Mass', `${(card.mass_msun / 1e6).toFixed(1)} million Suns`],
                ['Event horizon', <>{(card.horizon_km / 1e6).toFixed(1)} million km in radius ({card.horizon_au} AU) <span className="star-info-muted">· worked out from its mass</span></>],
                ['Bar', `${fmt(bar.bar_half_length * 2)} ly long, around it`],
                ...card.facts.map(f => [f.label, f.value]),
            ]} />
            <Objects objects={card.objects} onSelectMaser={onSelectMaser} />
            <Sources refs={[card.mass_ref, ...card.facts.map(f => f.ref), 'Reid et al. 2019, ApJ 885, 131 (Table 1)']} />
        </>
    );
}

function Arm({ id, card, maserShort, onSelectMaser }) {
    // The Sun is inside an arm when it is within the arm's width of its middle
    const inside = card.nearest < card.width / 2;
    // Per measured segment (Norma and Outer for the Norma–Outer arm), the
    // pitch before and after its kink
    const pitch = card.pitch.map(p => (card.pitch.length > 1 ? `${p.segment} ` : '')
        + p.deg.map(d => `${d}°`).join(' then ')).join('; ');
    return (
        <>
            <h3 className="star-info-title">{ARM_LABELS[id]}</h3>
            <div className="star-info-subtitle">{id === 'Local' ? 'Arm segment · the Sun is in it' : 'Major spiral arm'}</div>
            <p className="star-info-origin">{card.about}</p>
            <Facts rows={[
                inside
                    ? ['The Sun', `inside it, ${fmt(card.nearest)} ly from its middle`]
                    : ['Nearest', `${fmt(card.nearest)} ly from the Sun`],
                ['Length', `about ${fmt(card.length)} ly as drawn`],
                ['From the centre', `${fmt(card.r_range[0])} to ${fmt(card.r_range[1])} ly`],
                ['Width', `about ${fmt(card.width)} ly near the Sun`],
                ['Winds out at', <>{pitch} <span className="star-info-muted">· angle to a circle round the centre</span></>],
                ['Measured', <>{card.measured} maser sources (mostly newborn massive stars), with parallaxes
                    <div className="star-info-muted">{maserShort}</div></>],
                ['In the sky', <>{listing(card.constellations)} <span className="star-info-muted">· where it lies within ~20,000 ly</span></>],
            ]} />
            <Objects objects={card.objects} onSelectMaser={onSelectMaser} />
            <Sources refs={[card.ref, 'Reid et al. 2019, ApJ 885, 131 (Tables 1 and 2, arm tracks and widths)']} />
            <p className="star-info-muted">The dots are scattered to match the measured arm, not real stars; the rings are the real masers.</p>
        </>
    );
}

// id: 'milky_way', 'centre' or an arm name; cards: galaxy.json cards;
// onSelect(id) opens another card, onSelectMaser(index) a maser's;
// onView flies the camera to this one
function GalaxyInfoCard({ id, cards, onSelect, onSelectMaser, onView, onClose }) {
    const arm = cards.arms[id];
    return (
        <div className="star-info region-info">
            <button className="star-info-close" onClick={onClose} aria-label="Close">×</button>
            {id === 'milky_way' && <MilkyWay card={cards.milky_way} />}
            {id === 'centre' && <Centre card={cards.centre} bar={cards.milky_way} onSelectMaser={onSelectMaser} />}
            {arm && <Arm id={id} card={arm} maserShort={cards.milky_way.maser_short} onSelectMaser={onSelectMaser} />}
            <button className="button-primary star-info-fly" onClick={onView}>
                {id === 'milky_way' ? 'View the whole galaxy' : 'Fly there'}
            </button>
            <Links current={id} cards={cards} onSelect={onSelect} />
        </div>
    );
}

// "G049.48-00.38" -> its Galactic longitude and latitude as written
// ("49.48", "−0.38"), or null
const galacticFromName = (gname) => {
    const match = /^G(\d{3}\.\d{2})([+-])(\d{2}\.\d{2})$/.exec(gname);
    if (!match) return null;
    return [String(Number(match[1]).toFixed(2)), `${match[2] === '-' ? '−' : ''}${Number(match[3]).toFixed(2)}`];
};
// To a few significant figures: no more than the measurement supports
const roundSig = (n, sig) => Number(n.toPrecision(sig));

// How it moves round the Galaxy: [[round the centre, err], [outwards, err],
// [north, err]] km/s, or null (see Star_Data/scripts/build_galaxy.py)
function Motion({ motion, sunSpeed, distanceTooUncertain }) {
    if (!motion) {
        return (
            <span className="star-info-muted">
                {distanceTooUncertain
                    ? 'too uncertain: its parallax is under twice its error, so its distance (and speed) could be far off'
                    : 'not known: part of its motion wasn\'t measured'}
            </span>
        );
    }
    const [[rot, eRot], [out, eOut], [up, eUp]] = motion;
    return (
        <>
            <div>round the centre at {rot} ± {eRot} km/s</div>
            <div>{out < 0 ? 'inwards' : 'outwards'} {Math.abs(out)} ± {eOut} km/s, {up < 0 ? 'south' : 'north'} {Math.abs(up)} ± {eUp} km/s</div>
            <div className="star-info-muted">
                The Sun goes round at {sunSpeed} km/s. Worked out from its parallax, proper motion (its drift across the sky)
                and radial velocity, with their errors.
            </div>
        </>
    );
}

// One measured maser. info: maserInfo() (utils/galaxy3d); onArm opens its
// arm's (or the centre's) card
export function MaserInfoCard({ info, cards, onArm, onView, onClose }) {
    const lb = galacticFromName(info.gname);
    const [plx, ePlx] = info.plx;
    const [near, far] = info.range;
    const openEnded = plx - ePlx <= 0;
    const sig = info.errorPct >= 10 ? 2 : 3;
    const ly = (n) => fmt(roundSig(n, sig));
    return (
        <div className="star-info region-info">
            <button className="star-info-close" onClick={onClose} aria-label="Close">×</button>
            <h3 className="star-info-title">{info.name}</h3>
            <div className="star-info-subtitle">Maser · {info.armName}</div>
            {info.note && <p className="star-info-origin">{info.note}</p>}
            <Facts rows={[
                ['Distance', <>{ly(info.distance)} ly <span className="star-info-muted">± {info.errorPct}%</span>
                    <div className="star-info-muted">
                        {openEnded ? `at least ${ly(near)} ly: its parallax is within its error of zero`
                            : `likely ${ly(near)}–${ly(far)} ly (1σ)`}
                    </div></>],
                ['Parallax', <>{plx} ± {ePlx} mas <span className="star-info-muted">· its tiny yearly shift as Earth goes round the Sun (1 mas = 1/3,600,000°); distance = 1 / parallax</span></>],
                ['Name', <>{info.gname}{lb && <span className="star-info-muted"> · its place in Galactic coordinates: longitude {lb[0]}°, latitude {lb[1]}°</span>}
                    {info.alias && info.alias !== info.name && <div className="star-info-muted">also {info.alias}</div>}</>],
                ['In the sky', info.constellation],
                ['Arm', info.card
                    ? <button className="star-info-link" onClick={onArm}>{info.armName} ›</button>
                    : info.armName],
                ['From the centre', `${fmt(info.rGc)} ly`],
                ['Motion', <Motion motion={info.motion} sunSpeed={cards.milky_way.orbit_speed_km_s} distanceTooUncertain={plx < 2 * ePlx} />],
                ['Measured by', info.refs.join('; ')],
            ]} />
            <p className="star-info-muted star-info-origin">{cards.milky_way.maser_short}</p>
            <p className="star-info-muted">
                From Reid et al. 2019, ApJ 885, 131, Table 1, which collects these measurements; the motion uses the Sun&apos;s own from their fit A5.
            </p>
            <button className="button-primary star-info-fly" onClick={onView}>Fly there</button>
        </div>
    );
}

export default GalaxyInfoCard;
