import React from 'react';
import { SMALL_BODY_REGIONS } from '../utils/universe3d';
import { COMET_FAMILIES, smallBodyColor } from '../utils/smallBodies3d';
import { currentElements, perihelionDate, smallBodyPeriodDays } from '../utils/smallBodies';

// An asteroid / comet region (search: "Asteroid belt", "Comets"...): what it
// is, its parts with how many are known, and the named bodies in each.
// Counts are small_bodies.json `regions` (every object in JPL's database
// with an orbit, both tiers); the split into parts is by orbit size and is
// rough (see subgroup_of in Star_Data/scripts/build_small_bodies.py).
// Uses the star card's styles (.star-info-*)

const REGION_INFO = {
    main: {
        about: 'Between Mars and Jupiter, 2.1 to 3.3 AU from the Sun. Jupiter clears gaps in it (the Kirkwood gaps) '
            + 'where an asteroid would go round in step with it. All of it together has about 3% of the Moon\'s mass, '
            + 'over a third of that in Ceres.',
        parts: [
            { id: 'inner', name: 'Inner belt', about: 'Inside the gap at 2.50 AU, where an asteroid would orbit 3 times to Jupiter\'s 1. Home of Vesta and its family.' },
            { id: 'middle', name: 'Middle belt', about: '2.50 to 2.82 AU, up to the 5:2 gap.' },
            { id: 'outer', name: 'Outer belt', about: '2.82 to 3.28 AU, up to the 2:1 gap. Mostly dark, carbon-rich asteroids.' },
            { id: 'cybele', name: 'Cybeles', about: 'Beyond the 2:1 gap, out to about 3.7 AU.' },
        ],
    },
    hilda: {
        about: 'Locked in step with Jupiter at about 4 AU: 3 orbits for every 2 of Jupiter\'s. Seen with Jupiter held still, '
            + 'they crowd into a triangle with corners ahead of, behind and opposite Jupiter.',
        parts: [],
    },
    trojan: {
        about: 'They share Jupiter\'s orbit, gathered 60° ahead of it and 60° behind, where the pulls of the Sun and Jupiter '
            + 'balance (the L4 and L5 points). Each rocks slowly around its point, over about 150 years.',
        parts: [
            { id: 'l4', name: 'Greek camp (L4)', about: 'Ahead of Jupiter, named after Greek heroes of the Trojan War. About 1.7 times as many as behind.' },
            { id: 'l5', name: 'Trojan camp (L5)', about: "Behind Jupiter, named after the Trojans. Patroclus and Hector were named before the rule and sit in each other's camps." },
        ],
    },
    neo: {
        about: 'Asteroids that come within 1.3 AU of the Sun, most knocked out of the belt by Jupiter\'s gaps. '
            + 'Surveys have found most of the ones bigger than 1 km; none of those is known to be on course to hit Earth.',
        parts: [
            { id: 'apollo', name: 'Apollos', about: 'Cross Earth\'s orbit, on orbits bigger than Earth\'s.' },
            { id: 'aten', name: 'Atens', about: 'Cross Earth\'s orbit, on orbits smaller than Earth\'s.' },
            { id: 'amor', name: 'Amors', about: 'Come close but stay just outside Earth\'s orbit.' },
            { id: 'atira', name: 'Atiras', about: 'Stay inside Earth\'s orbit all the way round.' },
        ],
    },
    centaur: {
        about: 'Icy bodies between Jupiter and Neptune, on orbits the giant planets keep reshaping: each lasts only a few '
            + 'million years before being thrown in or out. They come from the Kuiper belt, and some end up as Jupiter-family comets.',
        parts: [],
    },
    tno: {
        about: 'Icy bodies beyond Neptune, mostly 30 to 50 AU from the Sun: leftovers from when the planets formed. '
            + 'The split below is by orbit size, so it is rough.',
        parts: [
            { id: 'classical', name: 'Classical belt', about: '40 to 47 AU, on calm orbits Neptune never disturbed: the original belt.' },
            { id: 'plutino', name: 'Plutinos', about: '3 orbits for every 2 of Neptune\'s, like Pluto, which keeps them from ever meeting it.' },
            { id: 'twotino', name: 'Twotinos', about: '1 orbit for every 2 of Neptune\'s, at about 48 AU.' },
            { id: 'scattered', name: 'Scattered disc', about: 'Flung by Neptune onto long, tilted orbits reaching far beyond the belt.' },
            { id: 'detached', name: 'Detached', about: 'Far out and never coming near Neptune, like Sedna: how they got there is still a puzzle.' },
            { id: 'other', name: 'Others', about: 'In other steps with Neptune, or between these groups.' },
        ],
    },
    comet: {
        about: 'Icy bodies that grow a glowing coma and tails as they near the Sun. Grouped by how long they take to go round.',
        parts: COMET_FAMILIES.map(f => ({
            id: f.id,
            name: f.name,
            color: f.color,
            about: {
                jupiter: 'Under 20 years (typically 7). Jupiter\'s pull has shaped their orbits; they come from the Kuiper belt.',
                halley: '20 to 200 years (typically 50), often steeply tilted or going round backwards.',
                long: 'Hundreds to millions of years. They fall in from the Oort cloud.',
            }[f.id],
        })),
    },
    oort: {
        about: 'A vast cloud of icy bodies thought to surround the Solar System from about 2,000 to 100,000 AU (1.6 light-years), '
            + 'over a third of the way to the nearest star. Nobody has seen it: it is inferred from long-period comets, which '
            + 'fall in from all directions. Drawn here from the usual model (Duncan, Quinn & Tremaine 1987).',
        parts: [],
    },
};

// Meteor showers from named bodies' debris
const SHOWERS = {
    "Halley's Comet": 'Eta Aquariids, Orionids',
    '109P/Swift-Tuttle': 'Perseids',
    '55P/Tempel-Tuttle': 'Leonids',
    Phaethon: 'Geminids',
};

const fmtYears = (days) => {
    const y = days / 365.25;
    return y < 100 ? `${Number(y.toPrecision(2))} yr` : `~${Math.round(y).toLocaleString()} yr`;
};

// regionId: SMALL_BODY_REGIONS key; meta: small_bodies.json; bodies:
// Solar System bodies (named small bodies and Pluto are listed);
// time: the clock (ms); hiddenParts: Set of 'region:part' switched off;
// onTogglePart('region:part') switches one: its dots, its named members,
// and for comets their orbits; trueColors: true colour mode is on
function RegionInfoCard({ regionId, meta, bodies, time, hiddenParts, onTogglePart, onSelectBody, onClose, trueColors = false }) {
    const info = REGION_INFO[regionId];
    const counts = meta.regions?.[regionId] ?? {};
    const total = regionId === 'oort' ? null
        : meta.tiers.reduce((n, t) => n + t.group_counts[meta.groups.findIndex(g => g.id === regionId)], 0);
    const date = new Date(time);
    const members = (sub) => bodies.filter(b => (b.smallBody
        ? b.smallBody.group === regionId && (sub === null || b.smallBody.subgroup === sub)
        : b.id === 'Pluto' && regionId === 'tno' && (sub === null || sub === 'plutino')));
    const isComets = regionId === 'comet';

    const memberRow = (b) => {
        const sb = b.smallBody;
        const el = sb ? currentElements(sb, date) : null;
        const period = el && smallBodyPeriodDays(el);
        const extra = isComets && period
            ? `${fmtYears(period)}${period < 200 * 365.25 ? ` · next ${perihelionDate(el, date).getUTCFullYear()}` : ''}`
            : SHOWERS[b.name] ?? (sb?.diameter_km ? `${sb.diameter_estimated ? '~' : ''}${Number(sb.diameter_km.toPrecision(3)).toLocaleString()} km across` : '');
        const shower = isComets && SHOWERS[b.name];
        return (
            <li key={b.id}>
                <button className="region-member" onClick={() => onSelectBody(b.id)}>
                    <span>{b.name}</span>
                    <span className="star-info-muted">{extra}{shower ? ` · ${shower}` : ''} ›</span>
                </button>
            </li>
        );
    };

    const unbound = isComets ? bodies.filter(b => b.smallBody && b.smallBody.group === null) : [];

    return (
        <div className="star-info region-info">
            <button className="star-info-close" onClick={onClose} aria-label="Close">×</button>
            <h3 className="star-info-title">{SMALL_BODY_REGIONS[regionId].label}</h3>
            <div className="star-info-subtitle">
                {regionId === 'oort' ? 'A model: never seen directly' : `${total.toLocaleString()} with known orbits`}
            </div>
            <p className="star-info-origin">{info.about}</p>

            {info.parts.length === 0 && members(null).length > 0 && (
                <ul className="region-members">{members(null).map(memberRow)}</ul>
            )}

            {info.parts.map(part => {
                const swatch = part.color ?? smallBodyColor(regionId, trueColors);
                const key = `${regionId}:${part.id}`;
                const hidden = hiddenParts.has(key);
                return (
                    <div key={part.id} className="region-part">
                        {/* The whole heading switches the part's dots (and comets' orbits) */}
                        <button
                            className={`region-part-head ${hidden ? 'off' : ''}`}
                            onClick={() => onTogglePart(key)}
                            title={hidden ? 'Show these again' : 'Hide these'}
                            aria-pressed={!hidden}
                        >
                            <span className="universe-3d-swatch" style={{ background: swatch }} />
                            <strong>{part.name}</strong>
                            <span className="region-count">{(counts[part.id] ?? 0).toLocaleString()}</span>
                        </button>
                        <div className="star-info-muted region-part-about">{part.about}</div>
                        {members(part.id).length > 0 && <ul className="region-members">{members(part.id).map(memberRow)}</ul>}
                    </div>
                );
            })}

            {isComets && (
                <div className="region-part">
                    {/* No dots drawn: switches its named members */}
                    <button
                        className={`region-part-head ${hiddenParts.has('comet:once') ? 'off' : ''}`}
                        onClick={() => onTogglePart('comet:once')}
                        title={hiddenParts.has('comet:once') ? 'Show these again' : 'Hide these'}
                        aria-pressed={!hiddenParts.has('comet:once')}
                    >
                        <span className="universe-3d-swatch" style={{ background: 'transparent', border: '1px solid #94a3b8' }} />
                        <strong>Seen once</strong>
                        <span className="region-count">{(meta.unbound_comets?.count ?? 0).toLocaleString()}</span>
                    </button>
                    <div className="star-info-muted region-part-about">
                        Not drawn: their orbits are open, or they were seen too briefly to tell.{' '}
                        {(meta.unbound_comets?.sungrazers ?? 0).toLocaleString()} are tiny sungrazers the SOHO
                        telescope caught diving into the Sun, most of them pieces of one great comet that broke up
                        (the Kreutz family). Most others are Oort cloud comets on their first visit, a few were
                        flung out by Jupiter, and just three came from other stars.
                    </div>
                    {unbound.length > 0 && <ul className="region-members">{unbound.map(memberRow)}</ul>}
                </div>
            )}

            <p className="star-info-muted star-info-origin">
                {regionId === 'oort'
                    ? 'The dots are scattered to match the model, not real objects.'
                    : 'Counts: every object with an orbit in JPL\'s Small-Body Database; more are found every night.'}
            </p>
        </div>
    );
}

export default RegionInfoCard;
