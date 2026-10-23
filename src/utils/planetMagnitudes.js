// Apparent magnitudes of the planets, Pluto and our Moon seen from anywhere
// (the 3D view's camera): from Earth they match the sky, and flying in or
// out they brighten or fade as they really would.
//
// magnitude = phase law (the body's brightness 1 AU from both the Sun and
// the observer, by the Sun-body-observer angle alpha) + 5 log10(r * delta),
// r and delta its distances (AU) from the Sun and the observer.
// The laws are the ones astronomy-engine's Illumination uses from Earth:
// Mercury and Venus from Hilton 2005, the others polynomial fits, Saturn
// after Paul Schlyter with its rings' tilt, our Moon scaled from its mean
// distance. Earth (never seen from outside there): Mallama & Hilton 2018.

import * as THREE from 'three';
import { RING_SYSTEMS } from './rings.js';
import { KM_PER_AU, raDecToXYZ } from './universe3d.js';

// Phase laws: coefficients of a polynomial in alpha / 100 (alpha in degrees)
const PHASE_LAWS = {
    Mercury: [-0.60, 4.98, -4.88, 3.02],
    Earth: [-3.99, -0.1060, 2.054],
    Mars: [-1.52, 1.60],
    Jupiter: [-9.40, 0.50],
    Uranus: [-7.19, 0.25],
    Neptune: [-6.87],
    Pluto: [-1.00, 4.00],
};
// Venus as a thin crescent (alpha past 163.6 deg) follows a second law
const VENUS = [-4.47, 1.03, 0.57, 0.13];
const VENUS_CRESCENT = [0.98, -1.02];
const VENUS_CRESCENT_DEG = 163.6;
const MOON_MEAN_DISTANCE_AU = 385000.6 / KM_PER_AU;
const SATURN_POLE = new THREE.Vector3(...raDecToXYZ(RING_SYSTEMS.Saturn.pole[0] / 15, RING_SYSTEMS.Saturn.pole[1], 1));
const RAD_TO_DEG = 180 / Math.PI;

// The bodies apparentMagnitude knows
export const MAGNITUDE_BODIES = new Set([...Object.keys(PHASE_LAWS), 'Venus', 'Saturn', 'Moon']);

const toSun = new THREE.Vector3();
const toObserver = new THREE.Vector3();
const polynomial = (coeffs, x) => coeffs.reduceRight((sum, c) => sum * x + c, 0);

// position, observer: heliocentric AU, scene frame (THREE.Vector3)
export function apparentMagnitude(id, position, observer) {
    toSun.copy(position).negate();
    toObserver.subVectors(observer, position);
    const r = Math.max(toSun.length(), 1e-9);
    const delta = Math.max(toObserver.length(), 1e-9);
    const alphaRad = toSun.angleTo(toObserver);
    const alpha = alphaRad * RAD_TO_DEG;
    if (id === 'Moon') {
        return -12.717 + 1.49 * alphaRad + 0.0431 * alphaRad ** 4 + 5 * Math.log10(r * delta / MOON_MEAN_DISTANCE_AU);
    }
    const distances = 5 * Math.log10(r * delta);
    if (id === 'Saturn') {
        // The rings add light the more open they are seen
        const sinTilt = Math.abs(toObserver.dot(SATURN_POLE)) / delta;
        return -9.0 + 0.044 * alpha + sinTilt * (-2.6 + 1.2 * sinTilt) + distances;
    }
    const law = id === 'Venus' ? (alpha < VENUS_CRESCENT_DEG ? VENUS : VENUS_CRESCENT) : PHASE_LAWS[id];
    return polynomial(law, alpha / 100) + distances;
}
