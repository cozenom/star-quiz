import React from 'react';
import { ARM_LABELS, GALAXY_COLORS, MASER_COLOR } from '../utils/galaxy3d';
import { DWARF_COLOR, DWARF_TRUE_COLOR, LANDMARK_NAMES, GLOBULAR_COLOR, NEBULA_COLOR, OPEN_AGE_COLORS } from '../utils/landmarks3d';
import { GC_CLOUD_COLOR, GC_MAGNETAR_COLOR, gcKindName, gcState, msOf, yearOf } from '../utils/galacticCentre3d';
import { AU_PER_LY, KM_PER_AU } from '../utils/universe3d';
import MapLegend from './MapLegend';

// The Milky Way model's cards: the galaxy as a whole (with the key to the
// model's colours), its centre, and each spiral arm. Text and numbers are
// galaxy.json `cards` (Star_Data/curated/galaxy_cards.json, plus numbers
// worked out by scripts/build_galaxy.py). Uses the star and region cards'
// styles (.star-info-*, .region-*).

const hex = (n) => `#${n.toString(16).padStart(6, '0')}`;

// What each colour in the model stands for (trueColor: its colour in true
// colour mode, where that differs)
export const GALAXY_KEY = [
    { band: true, name: 'Glow across the sky', about: 'The Milky Way as seen from inside the disc: this model\'s starlight added up along each line of sight and dimmed by the dust in front (the measured dust near the Sun, the model\'s further out), worked out from wherever you are (not a photo). The band turns into the disc as you fly out.' },
    { color: hex(GALAXY_COLORS.thin[0]), name: 'Old disc stars', about: 'Most of the disc\'s stars: long-lived, cooler and yellower than the Sun on average, spread smoothly round the whole disc.' },
    { color: hex(GALAXY_COLORS.bulge[0]), name: 'Bar and bulge', about: 'The oldest stars, with hardly any new ones forming, so the most orange.' },
    { color: hex(GALAXY_COLORS.arms[0]), name: 'Young stars', about: 'Massive stars are hot and blue-white, and burn out within a few million years, before drifting far from the arm they formed in. That is why the arms stand out.' },
    { color: hex(GALAXY_COLORS.clumps[0]), name: 'Star clusters', about: 'Young stars born together in groups (OB associations), still close to one another.' },
    { color: hex(GALAXY_COLORS.hii[0]), name: 'Glowing gas', about: 'Hydrogen lit up by young hot stars glows red-pink (H II regions), like the Orion Nebula.' },
    { color: '#15110d', name: 'Dust', about: 'Grains of rock and soot that block light, thickest along the inner edge of each arm and in the middle of the disc. Within about 15,000 ly of the Sun it is the measured 3D map (below), not drawn to match.' },
    { color: hex(MASER_COLOR), ring: true, name: 'Masers', about: 'Real, not drawn to match: the measured masers at their distances. The faint line through each spans its distance\'s uncertainty, along our line of sight (cut at twice the distance when the far end is open).' },
    // (the stars' own colours: RR Lyrae are white to yellow-white, B-V ~0.2-0.4)
    { color: '#f6f0e2', halo: true, name: 'Halo stars', about: 'Real, not drawn to match: about 134,000 RR Lyrae stars, old giants that pulse every half day or so. They all shine with nearly the same brightness, so how bright each looks tells how far it is, out past 450,000 ly, far beyond where parallaxes work (Li et al. 2023, from Gaia). They trace the faint halo of old stars round the disc, the Sagittarius stream (a small galaxy being torn apart as it orbits ours), the bulge, and the Large and Small Magellanic Clouds. The halo holds only a few percent of the Milky Way\'s stars (about 1.4 billion Suns\' worth, Deason et al. 2019), spread over a volume far bigger than the disc: each dot stands in for many thousands of stars too faint to see from out here.' },
    { color: hex(GLOBULAR_COLOR), globular: true, name: 'Globular clusters', about: 'Real, not drawn to match: 167 globular clusters at their measured distances, balls of hundreds of thousands of stars swarming round the centre in a halo, far above and below the disc. Each glows out to its true size when you get close.' },
    { color: hex(NEBULA_COLOR), nebula: true, name: 'Nebulae', about: 'Real, not drawn to match: the few nebulae whose 3D shape has been measured, each drawn from its published model at its measured distance. A dot from afar; fly close to see its shape: glowing gas, or dust lit by its star.' },
    { gradient: OPEN_AGE_COLORS.map(([, c]) => hex(c)), open: true, name: 'Open clusters', about: 'Real, not drawn to match: 4,000 open clusters found by Gaia, at their measured distances, coloured by age: blue for the young ones (a few million years), white, yellow, then orange for the old (billions). The youngest trace the spiral arms they formed in.' },
    { color: hex(DWARF_COLOR), trueColor: hex(DWARF_TRUE_COLOR), dwarf: true, name: 'Dwarf galaxies', about: 'Real, not drawn to match: the small galaxies orbiting the Milky Way, at their measured distances, the brightest labelled. Fly to one to see the members Gaia picked out, the brightest of its stars. The Magellanic Clouds and Sagittarius show only their RR Lyrae stars, each at its own distance, so errors of a few percent stretch them along our line of sight.' },
];

// A key swatch: a dot, a ring for the masers' markers, or a short line
// for their distance ranges. trueColors: true colour mode is on.
export function KeySwatch({ k, trueColors = false }) {
    const color = trueColors && k.trueColor ? k.trueColor : k.color;
    if (k.line) return <span className="galaxy-legend-line" style={{ background: color }} />;
    if (k.band) return <span className="galaxy-legend-band" />;
    if (k.gradient) return <span className="universe-3d-swatch" style={{ background: `linear-gradient(90deg, ${k.gradient.join(', ')})` }} />;
    const style = k.ring
        ? { background: 'transparent', border: `2px solid ${color}` }
        : { background: color, border: k.name === 'Dust' ? '1px solid #64748b' : undefined };
    return <span className="universe-3d-swatch" style={style} />;
}

// The on-screen legend, shown while the model is: short names; the card
// (onOpen) has the explanations. Masers' entries only while they're shown.
const LEGEND = [
    ...GALAXY_KEY.filter(k => !k.ring && !k.band && !k.halo && !k.globular && !k.open && !k.nebula && !k.dwarf),
    { ...GALAXY_KEY.find(k => k.ring), name: 'Masers along the arms', maser: true },
    { color: hex(MASER_COLOR), line: true, name: 'Maser distance uncertainty range', maser: true },
    { ...GALAXY_KEY.find(k => k.halo), name: 'Halo stars (RR Lyrae)' },
    { ...GALAXY_KEY.find(k => k.globular), name: 'Globular clusters' },
    { ...GALAXY_KEY.find(k => k.open), name: 'Open clusters, young → old' },
    { ...GALAXY_KEY.find(k => k.nebula), name: 'Nebulae (Crab, Carina)' },
    { ...GALAXY_KEY.find(k => k.dwarf), name: 'Dwarf galaxies' },
];
// showModel: the model is on screen; showMasers: its masers are (they
// fade in before the model does); showRanges: their distance ranges are
// drawn; showGlobulars / showOpenClusters / showNebulae / showDwarfs: those landmarks
// are; showHalo: the RR Lyrae are (listed while the model is);
// trueColors: true colour mode is on
export function GalaxyLegend({ showModel, showMasers, showRanges = true, showGlobulars = false, showOpenClusters = false, showNebulae = false, showDwarfs = false, showHalo = false, trueColors = false, onOpen }) {
    const shown = (k) => (k.globular ? showGlobulars : k.open ? showOpenClusters : k.nebula ? showNebulae : k.dwarf ? showDwarfs
        : k.halo ? showHalo && showModel
        : k.maser ? showMasers && (!k.line || showRanges) : showModel);
    return (
        <MapLegend
            title="Milky Way (model)"
            onTitle={onOpen}
            storageKey="universe3d.legend.galaxy"
            items={LEGEND.filter(shown).map(k => ({ key: k.name, swatch: <KeySwatch k={k} trueColors={trueColors} />, name: k.name }))}
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

function MilkyWay({ card, actions, trueColors }) {
    return (
        <>
            <h3 className="star-info-title">Milky Way</h3>
            <div className="star-info-subtitle">Our galaxy · barred spiral · drawn as a model</div>
            {actions}
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
                        <KeySwatch k={k} trueColors={trueColors} />
                        <div><strong>{k.name}</strong> <span className="star-info-muted">{k.about}</span></div>
                    </div>
                ))}
            </div>
            <div className="region-part">
                <div className="region-part-head static"><strong>What is a maser?</strong></div>
                <p className="star-info-muted region-part-about">{card.maser}</p>
            </div>
            {card.dust && (
                <div className="region-part">
                    <div className="region-part-head static"><strong>The dust near the Sun is measured</strong></div>
                    <p className="star-info-muted region-part-about">{card.dust.about}</p>
                    <p className="star-info-muted region-part-about">{card.dust.check}</p>
                </div>
            )}
            <div className="region-part">
                <div className="region-part-head static"><strong>How we know</strong></div>
                {card.history.map(h => (
                    <div key={h.year} className="galaxy-key-row">
                        <span className="galaxy-year">{h.year}</span>
                        <span className="star-info-muted">{h.text}</span>
                    </div>
                ))}
            </div>
            <Sources refs={[card.orbit_speed_ref, ...card.facts.map(f => f.ref), card.maser_ref, ...card.history.map(h => h.ref), ...(card.dust?.refs ?? [])]} />
        </>
    );
}

function Centre({ card, bar, gc, onSelectMaser, onSelectGc, actions }) {
    const shadow = gc?.black_hole;
    return (
        <>
            <h3 className="star-info-title">Galactic Centre</h3>
            <div className="star-info-subtitle">Sagittarius A* · supermassive black hole</div>
            {actions}
            <p className="star-info-origin">{card.about}</p>
            <Facts rows={[
                ['Distance', `${fmt(card.distance)} ly, in ${card.constellation}`],
                ['Mass', `${(card.mass_msun / 1e6).toFixed(1)} million Suns`],
                ['Event horizon', <>{(card.horizon_km / 1e6).toFixed(1)} million km in radius ({card.horizon_au} AU) <span className="star-info-muted">· worked out from its mass</span></>],
                shadow && ['Shadow', <>{shadow.shadow_au.toFixed(2)} AU in radius, {shadow.shadow_uas} microarcseconds across from here
                    <div className="star-info-muted">{shadow.about}. Drawn black at its true size in the close-up.</div></>],
                ['Bar', `${fmt(bar.bar_half_length * 2)} ly long, around it`],
                ...card.facts.map(f => [f.label, f.value]),
            ]} />
            {gc && <GcObjects gc={gc} onSelectGc={onSelectGc} />}
            <Objects objects={card.objects} onSelectMaser={onSelectMaser} />
            <Sources refs={[card.mass_ref, ...card.facts.map(f => f.ref), ...(shadow?.refs ?? []), 'Reid et al. 2019, ApJ 885, 131 (Table 1)']} />
        </>
    );
}

// The labelled ones orbiting Sgr A*, each opening its card (and flying
// in to it); the rest are in search and the close-up
function GcObjects({ gc, onSelectGc }) {
    const shown = gc.objects.map((obj, i) => ({ obj, i })).filter(({ obj }) => obj.label);
    const stars = gc.objects.filter(o => o.kind === 'star').length;
    return (
        <div className="region-part">
            <div className="region-part-head static"><strong>Round the black hole</strong></div>
            <p className="star-info-muted region-part-about">
                {stars} stars and {gc.objects.filter(o => o.kind === 'cloud').length} dusty clouds on their measured orbits, moving
                with the clock (fly in to see them). The closest swing within about 100 AU of it, a few times Neptune&apos;s
                distance from the Sun, every few years to decades.
            </p>
            <ul className="region-members">
                {shown.map(({ obj, i }) => (
                    <li key={obj.id}>
                        <button className="region-member galaxy-object" onClick={() => onSelectGc(i)}>
                            <div className="galaxy-object-head">
                                <span>{obj.kind === 'magnetar' ? 'Magnetar' : obj.name}</span>
                                <span className="star-info-muted">
                                    {obj.orbit ? `every ${gcYears(obj.orbit.period_yr)} years` : 'orbit unknown'} ›
                                </span>
                            </div>
                            <div className="star-info-muted">{gcKindName(obj)}</div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

const gcYears = (p) => (p < 100 ? p.toFixed(1) : fmt(p));
// AU, or ly once that's shorter to read
const gcDistance = (au) => (au < 10000 ? `${fmt(roundSig(au, 3))} AU` : `${roundSig(au / AU_PER_LY, 2)} ly (${fmt(roundSig(au, 3))} AU)`);
const LIGHT_KM_S = 299792.458;
const monthYear = (year) => new Date(msOf(year)).toLocaleDateString(undefined, { year: 'numeric', month: 'short', timeZone: 'UTC' });

// One of the things orbiting Sgr A* (galactic_centre.json objects[i]).
// time: the clock (ms), for where it is now and its next closest approach.
export function GcObjectInfoCard({ obj, data, time, onView, onCentre, onClose }) {
    const t = yearOf(time);
    const state = gcState(obj, t, data.mass_msun);
    const o = obj.orbit;
    const lightHours = (au) => au * KM_PER_AU / LIGHT_KM_S / 3600;
    const rows = o ? [
        ['Orbit', <>once round every {gcYears(o.period_yr)} years
            <span className="star-info-muted"> · eccentricity {o.e.toFixed(o.e > 0.9 ? 3 : 2)} ({o.e > 0.9 ? 'a very long ellipse' : o.e > 0.6 ? 'a long ellipse' : o.e > 0.3 ? 'an oval' : 'nearly round'})</span></>],
        ['Closest', <>{gcDistance(o.periapsis_au)} from Sgr A*, at {fmt(o.speed_peri_km_s)} km/s
            <span className="star-info-muted"> ({(o.speed_peri_km_s / LIGHT_KM_S * 100).toFixed(1)}% of light&apos;s speed)</span>
            <div className="star-info-muted">next: {monthYear(state.nextPeri)}</div></>],
        ['Farthest', <>{gcDistance(o.apoapsis_au)}, at {fmt(o.speed_apo_km_s)} km/s</>],
        ['Now', <>{gcDistance(state.distanceAu)} from it ({lightHours(state.distanceAu) < 48 ? `${lightHours(state.distanceAu).toFixed(1)} light-hours` : `${(lightHours(state.distanceAu) / 24).toFixed(0)} light-days`}), moving at {fmt(state.speedKmS)} km/s
            <div className="star-info-muted">at the clock&apos;s date, as seen from Earth</div></>],
        o.precess_deg * 60 >= 0.05 && ['Turns', <>{(o.precess_deg * 60).toFixed(1)}′ further round each orbit
            <span className="star-info-muted"> · the Schwarzschild precession of Einstein&apos;s gravity, drawn in</span></>],
        obj.kind === 'star' && ['Star', <>{obj.type}, K magnitude {obj.m_k} from Earth
            <div className="star-info-muted">{obj.type_note ?? 'from its spectrum'}; invisible to the eye from here behind ~30 magnitudes of dust, drawn as if it weren&apos;t</div></>],
        obj.kind === 'cloud' && ['Drawn as', <>a glow about {2 * data.g_object_radius_au} AU across
            <div className="star-info-muted">its size is of that order; it glows in hydrogen&apos;s light and warm dust</div></>],
    ] : [
        ['From Sgr A*', <>at least {gcDistance(Math.hypot(...obj.position_au))}
            <div className="star-info-muted">{Math.hypot(...obj.offset_arcsec).toFixed(2)}″ from it on the sky in {Math.floor(obj.year)}. {obj.position_note}</div></>],
        ['Moves', <>{fmt(obj.proper_motion_km_s)} km/s across the sky
            <div className="star-info-muted">its orbit isn&apos;t known, so it is drawn where it was measured</div></>],
    ];
    return (
        <div className="star-info region-info">
            <button className="star-info-close" onClick={onClose} aria-label="Close">×</button>
            <h3 className="star-info-title">{obj.kind === 'magnetar' ? 'Galactic Centre magnetar' : obj.name}</h3>
            <div className="star-info-subtitle">
                {obj.kind === 'magnetar' ? obj.name : gcKindName(obj)}{obj.aka.length > 0 && obj.kind !== 'magnetar' ? ` · also ${obj.aka[0]}` : ''}
            </div>
            <div className="star-info-actions">
                <button className="button-primary star-info-fly" onClick={onView}>Fly there</button>
            </div>
            {obj.note && <p className="star-info-origin">{obj.note}</p>}
            <Facts rows={rows} />
            <div className="region-part">
                <ul className="region-members">
                    <li>
                        <button className="region-member" onClick={onCentre}>
                            <span>Sgr A*, the black hole</span>
                            <span className="star-info-muted">›</span>
                        </button>
                    </li>
                </ul>
            </div>
            {o && (
                <p className="star-info-muted star-info-origin">
                    Its measured orbit (the first source), drawn as an ellipse that turns slowly as Einstein&apos;s gravity predicts.
                    Further from the years it was watched (1992 onwards), the less sure where it is. Seen from Earth: the light left about 27,000 years earlier.
                </p>
            )}
            <Sources refs={obj.refs} />
        </div>
    );
}

// The close-up's key, shown while it is on screen
export function GalacticCentreLegend({ showOrbits, onOpen }) {
    const items = [
        { key: 'stars', swatch: <span className="universe-3d-swatch" style={{ background: '#dbe6ff' }} />, name: 'S-stars (blue-white: young; orange: red giants)' },
        showOrbits && { key: 'orbits', swatch: <span className="galaxy-legend-line" style={{ background: 'linear-gradient(90deg, #dbe6ff, #ffc38a)' }} />, name: 'Their measured orbits, in the star\'s colour' },
        { key: 'clouds', swatch: <span className="universe-3d-swatch" style={{ background: hex(GC_CLOUD_COLOR) }} />, name: 'G objects: dusty clouds' },
        showOrbits && { key: 'cloud-orbits', swatch: <span className="galaxy-legend-line" style={{ background: hex(GC_CLOUD_COLOR) }} />, name: 'G objects\' orbits' },
        { key: 'magnetar', swatch: <span className="universe-3d-swatch" style={{ background: hex(GC_MAGNETAR_COLOR) }} />, name: 'Magnetar' },
        { key: 'shadow', swatch: <span className="universe-3d-swatch" style={{ background: '#000', border: '1px solid #64748b' }} />, name: 'Sgr A*\'s shadow (true size)' },
    ].filter(Boolean);
    return <MapLegend title="Galactic Centre" onTitle={onOpen} storageKey="universe3d.legend.gc" items={items} />;
}

function Arm({ id, card, maserShort, onSelectMaser, actions }) {
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
            {actions}
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
// onView flies the camera to this one; trueColors: true colour mode is on
// gc: galactic_centre.json (null until in): the centre's card lists
// what orbits Sgr A* (onSelectGc(index)) and flies in to it (onCloseUp)
function GalaxyInfoCard({ id, cards, gc = null, onSelect, onSelectMaser, onSelectGc, onCloseUp, onView, onClose, trueColors = false }) {
    const arm = cards.arms[id];
    // (under the title, which each part draws)
    const actions = (
        <div className="star-info-actions">
            <button className="button-primary star-info-fly" onClick={onView}>
                {id === 'milky_way' ? 'View the whole galaxy' : 'Fly there'}
            </button>
            {id === 'centre' && gc && (
                <button className="button-secondary star-info-fly" onClick={onCloseUp}>Close-up</button>
            )}
        </div>
    );
    return (
        <div className="star-info region-info">
            <button className="star-info-close" onClick={onClose} aria-label="Close">×</button>
            {id === 'milky_way' && <MilkyWay card={cards.milky_way} actions={actions} trueColors={trueColors} />}
            {id === 'centre' && <Centre card={cards.centre} bar={cards.milky_way} gc={gc} onSelectMaser={onSelectMaser} onSelectGc={onSelectGc} actions={actions} />}
            {arm && <Arm id={id} card={arm} maserShort={cards.milky_way.maser_short} onSelectMaser={onSelectMaser} actions={actions} />}
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
            <div className="star-info-actions">
                <button className="button-primary star-info-fly" onClick={onView}>Fly there</button>
            </div>
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
        </div>
    );
}

// A landmark's card (star cluster or nebula). info: landmarks3d
// clusterInfo; text: that kind's about and refs (landmarks.json)
export function ClusterInfoCard({ info, text, onView, onClose }) {
    const ly = (n) => fmt(roundSig(n, 3));
    const myr = (m) => (m >= 1000 ? `${roundSig(m / 1000, 2)} billion` : `${roundSig(m, 2)} million`);
    const size = (n) => (n < 10 ? roundSig(n, 2).toLocaleString() : ly(n));
    const rows = info.kind === 'dwarf_galaxies' ? [
        ['Distance', <>{ly(info.distance)} ly <span className="star-info-muted">± {ly(info.distanceErr)} ly</span></>],
        info.mass && ['Mass in stars', `about ${fmt(roundSig(info.mass, 2))} Suns`],
        ['Size', `half its light within ${size(info.rh)} ly of the middle`],
        ['In our sky', info.vmag !== null
            ? <>{info.constellation}, magnitude {info.vmag.toFixed(1)}
                <span className="star-info-muted">{info.vmag <= 6 ? ' · visible to the naked eye from a dark site' : ' · a telescope'}</span></>
            : info.constellation],
        ['Stars drawn', info.starCount > 0
            ? <>{fmt(info.starCount)} members found by Gaia
                <div className="star-info-muted">
                    only its brightest stars; each at the galaxy&apos;s distance, with a depth drawn from its size
                </div></>
            : <>Only RR Lyrae stars, where any are known
                <div className="star-info-muted">each at its own measured distance</div></>],
    ] : info.kind === 'nebulae' ? [
        ['Distance', <>{ly(info.distance)} ly <span className="star-info-muted">± {ly(info.distanceErr)} ly</span></>],
        ['Size', `${size(2 * info.radius)} ly across`],
        ['In our sky', info.constellation],
        // (a model drawn as several parts, e.g. a cloud's points and its haze: once)
        ...info.models.filter((m, k, all) => all.findIndex(o => o.name === m.name) === k).map(m => [m.name, <>{m.shape[0].toUpperCase() + m.shape.slice(1)}
            {m.unknown && <div className="star-info-muted">{m.unknown}</div>}</>]),
    ] : info.kind === 'globulars' ? [
        ['Distance', <>{ly(info.distance)} ly <span className="star-info-muted">± {ly(info.distanceErr)} ly</span></>],
        ['From the centre', `${ly(info.rGc)} ly`],
        info.mass && ['Mass', `about ${fmt(roundSig(info.mass, 2))} Suns`],
        info.rh && ['Size', <>half its light within {ly(info.rh)} ly of the middle
            {info.rt && <div className="star-info-muted">its gravity holds stars out to about {ly(info.rt)} ly (tidal radius)</div>}</>],
        info.vmag !== null && ['In our sky', <>magnitude {info.vmag.toFixed(1)}
            <span className="star-info-muted">{info.vmag <= 6 ? ' · visible to the naked eye from a dark site' : ' · binoculars or a telescope'}</span>
            <div>{info.constellation}</div></>],
        info.starCount > 0 && ['Stars drawn', <>{fmt(info.starCount)} real ones, measured by Gaia
            <div className="star-info-muted">
                {info.resolved !== null && `holding ${Math.round(info.resolved * 100)}% of its light; `}
                the glow is the rest: stars too faint for Gaia, or too crowded in the core to pick out. Each sits at its place in the sky; its depth is drawn from the cluster&apos;s measured profile
            </div></>],
    ] : [
        ['Distance', <>{ly(info.distance)} ly <span className="star-info-muted">likely {ly(info.distanceRange[0])}–{ly(info.distanceRange[1])} ly</span></>],
        info.age && ['Age', <>about {myr(info.age)} years
            {info.ageRange && <span className="star-info-muted"> · likely {myr(info.ageRange[0])}–{myr(info.ageRange[1])}</span>}</>],
        ['Stars', <>{fmt(info.members)} found by Gaia
            {info.r50 && <div className="star-info-muted">half of them within {ly(info.r50)} ly of the middle{info.rt ? `, held out to about ${ly(info.rt)} ly` : ''}</div>}</>],
        info.av !== null && ['Dust in front', `${info.av.toFixed(1)} mag (dims it ${Math.round((1 - 10 ** (-0.4 * info.av)) * 100)}% to the eye)`],
        ['In our sky', info.constellation],
        info.starCount > 0 && ['Stars drawn', <>{fmt(info.starCount)} measured by Gaia, besides any already among the catalogue&apos;s stars
            <div className="star-info-muted">
                each at its own measured distance where that&apos;s precise enough (nearby clusters keep their real shape); else at the cluster&apos;s, with a depth drawn from its size
            </div></>],
    ];
    return (
        <div className="star-info region-info">
            <button className="star-info-close" onClick={onClose} aria-label="Close">×</button>
            <h3 className="star-info-title">{info.name}</h3>
            <div className="star-info-subtitle">{LANDMARK_NAMES[info.kind][0]}{info.title ? ` · ${info.title}` : ''}</div>
            <div className="star-info-actions">
                <button className="button-primary star-info-fly" onClick={onView}>Fly there</button>
            </div>
            {info.superlative && <p className="star-info-origin"><strong>{info.superlative}.</strong></p>}
            {info.note && <p className="star-info-origin">{info.note}</p>}
            {info.about && <p className="star-info-origin">{info.about}</p>}
            <Facts rows={rows} />
            <p className="star-info-muted star-info-origin">{text.about}</p>
            <Sources refs={[...text.refs, ...(info.refs ?? []), info.starCount > 0 && info.starsRef, info.noteRef]} />
        </div>
    );
}

export default GalaxyInfoCard;
