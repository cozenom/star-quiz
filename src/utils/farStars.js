// Gaia stars beyond 100 pc (stars_far.json + stars_far_<tier>.bin, from
// Star_Data/scripts/build_far_stars.py): real stars at measured positions out
// to ~16,000 ly, drawn like the other stars (absolute magnitude + colour; the
// star shader works out how bright each looks from the camera). Colours and
// brightness as seen, like stars_3d and stars_gaia (no dust correction).
//
// Each tier file: int16 x, y, z (ly, scene frame; in units of the meta's
// pos_unit_ly if it has one) for all its stars, then uint8 absolute
// magnitude, uint8 B-V, uint8 E(BP-RP) (see the meta). The RR Lyrae stars
// (stars_rrlyrae.json, Star_Data/scripts/build_rr_lyrae.py) come in the
// same layout, in units of 16 ly: they reach ~470,000 ly.

import { bvToColor } from './universe3d.js';

// One colour per B-V code (255 = no colour: white, as bvToColor(null))
function colorTable(meta) {
    const table = new Float32Array(256 * 3);
    for (let k = 0; k < 256; k++) {
        const bv = k === meta.bv.missing ? null : meta.bv.min + k * meta.bv.step;
        table.set(bvToColor(bv), k * 3);
    }
    return table;
}

// A tier's ArrayBuffer -> {positions, colors, absMags, count} for the star shader
export function decodeFarStars(buffer, meta, count) {
    const pos = new Int16Array(buffer, 0, count * 3);
    const bytes = new Uint8Array(buffer, count * 6);
    const mag = bytes.subarray(0, count);
    const bv = bytes.subarray(count, 2 * count);
    const unit = meta.pos_unit_ly ?? 1;
    const positions = Float32Array.from(pos, v => v * unit);
    const colors = new Float32Array(count * 3);
    const absMags = new Float32Array(count);
    const table = colorTable(meta);
    for (let i = 0; i < count; i++) {
        const c = bv[i] * 3;
        colors[i * 3] = table[c];
        colors[i * 3 + 1] = table[c + 1];
        colors[i * 3 + 2] = table[c + 2];
        absMags[i] = meta.abs_mag.min + mag[i] * meta.abs_mag.step;
    }
    return { positions, colors, absMags, count };
}

// fetchJson / fetchBuffer: (name) => Promise; metaFile: the meta's name.
// Returns {meta(), load(tier) -> Promise of decoded buffers}; each tier is
// fetched once.
export function farStarSource(fetchJson, fetchBuffer, metaFile = 'stars_far.json') {
    let metaPromise = null;
    const tiers = new Map();
    const meta = () => {
        if (!metaPromise) {
            metaPromise = fetchJson(metaFile).catch((error) => {
                metaPromise = null;  // try again later
                throw error;
            });
        }
        return metaPromise;
    };
    return {
        meta,
        load: (tier) => {
            if (!tiers.has(tier)) {
                tiers.set(tier, meta().then(m => fetchBuffer(m.tiers[tier].file)
                    .then(buffer => decodeFarStars(buffer, m, m.tiers[tier].count)))
                    .catch((error) => {
                        tiers.delete(tier);  // try again later
                        throw error;
                    }));
            }
            return tiers.get(tier);
        },
    };
}
