// Gaia stars beyond 100 pc (stars_far.json + stars_far_<tier>_<part>.bin,
// from Star_Data/scripts/build_far_stars.py): real stars at measured
// positions out to ~19,000 ly, distances good to 5%, drawn like the other
// stars (absolute magnitude + colour; the star shader works out how bright
// each looks from the camera). Colours and brightness as seen, like stars_3d
// and stars_gaia (no dust correction).
//
// Each file: int16 x, y, z (ly, scene frame; in units of the meta's
// pos_unit_ly if it has one) for all its stars, then uint8 absolute
// magnitude, uint8 B-V, uint8 E(BP-RP) (see the meta). The RR Lyrae stars
// (stars_rrlyrae.json, Star_Data/scripts/build_rr_lyrae.py) come in the
// same layout, in units of 16 ly: they reach ~470,000 ly.
//
// The rows go to the GPU as they are (8 bytes a star; E(BP-RP) stays
// behind): the GPU reads the integers as floats, and the compact star
// shader scales them with farStarDecoding's uniforms.

import * as THREE from 'three';
import { bvToColor } from './universe3d.js';

// One colour per B-V code (255 = no colour: white, as bvToColor(null)), as
// a 256 x 1 texture the shader reads by code
function colorTable(meta) {
    const table = new Float32Array(256 * 4);
    for (let k = 0; k < 256; k++) {
        const bv = k === meta.bv.missing ? null : meta.bv.min + k * meta.bv.step;
        table.set([...bvToColor(bv), 1], k * 4);
    }
    const texture = new THREE.DataTexture(table, 256, 1, THREE.RGBAFormat, THREE.FloatType);
    texture.needsUpdate = true;
    return texture;
}

// The compact star shader's uniforms for a meta's encoding
export function farStarDecoding(meta) {
    return {
        uPosUnit: { value: meta.pos_unit_ly ?? 1 },
        uMagMin: { value: meta.abs_mag.min },
        uMagStep: { value: meta.abs_mag.step },
        uBvTable: { value: colorTable(meta) },
    };
}

// The largest distance a meta's positions can encode (ly)
export function farStarReach(meta) {
    return 32767 * (meta.pos_unit_ly ?? 1) * Math.sqrt(3);
}

// A file's ArrayBuffer -> {positions (Int16Array), magCodes, bvCodes
// (Uint8Array), count}, views into the buffer
export function splitFarStars(buffer, count) {
    return {
        positions: new Int16Array(buffer, 0, count * 3),
        magCodes: new Uint8Array(buffer, count * 6, count),
        bvCodes: new Uint8Array(buffer, count * 7, count),
        count,
    };
}

// A tier's files: [{file, count}] (the RR Lyrae meta lists one file per tier)
export function tierFiles(tier) {
    return tier.files ?? [{ file: tier.file, count: tier.count }];
}

// fetchJson / fetchBuffer: (name) => Promise; metaFile: the meta's name.
// Returns {meta(), load(tier) -> Promise of [split file, ...]}. The meta is
// fetched once; the files aren't kept here, so their memory goes once the
// GPU has them (a rebuilt scene fetches them again, from the browser cache).
export function farStarSource(fetchJson, fetchBuffer, metaFile = 'stars_far.json') {
    let metaPromise = null;
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
        load: tier => meta().then(m => Promise.all(tierFiles(m.tiers[tier])
            .map(({ file, count }) => fetchBuffer(file).then(buffer => splitFarStars(buffer, count))))),
    };
}
