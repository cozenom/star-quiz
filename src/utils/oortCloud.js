// The Oort cloud: a model, drawn as faint points in the star layer (ly).
//
// Nobody has seen it: it is inferred from long-period comets, which fall in
// from all directions on orbits reaching tens of thousands of AU. The
// usual picture (e.g. Duncan, Quinn & Tremaine 1987): an inner "Hills"
// cloud from ~2,000 to 20,000 AU, still flattened towards the planets'
// plane, and a round outer cloud out to ~100,000 AU (1.6 ly), the number
// of comets per volume falling off as r^-3.5. Points are scattered to
// match, from a fixed seed so the picture is the same every time.

import * as THREE from 'three';
import { AU_PER_LY } from './universe3d.js';

const INNER_AU = 2000;
const HILLS_EDGE_AU = 20000;
const OUTER_AU = 100000;
const COUNT = 20000;
const DENSITY_POWER = 3.5;
// Hills cloud: how squashed towards the ecliptic at its inner edge (1 = round)
const INNER_FLATTENING = 0.3;
// Shown between these camera distances from the Sun (ly): fading in past
// the planets, out again once it's a speck
const FADE_IN_LY = [0.02, 0.1];
const FADE_OUT_LY = [20, 60];
const COLOR = 0x9fb4d8;
const SIZE_PX = 1.6;
const ALPHA = 0.35;

// J2000 ecliptic -> equator tilt
const OBLIQUITY = 23.4392911 * Math.PI / 180;

// Deterministic random numbers (mulberry32)
export function random(seed) {
    let a = seed;
    return () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function positions() {
    const rand = random(1987);
    const out = new Float32Array(COUNT * 3);
    // Radius from n(r) ~ r^-p: the number in a shell goes as r^(2-p),
    // sampled by inverting its cumulative distribution
    const k = 3 - DENSITY_POWER;  // -0.5
    const lo = INNER_AU ** k, hi = OUTER_AU ** k;
    const cosE = Math.cos(OBLIQUITY), sinE = Math.sin(OBLIQUITY);
    for (let n = 0; n < COUNT; n++) {
        const r = (lo + (hi - lo) * rand()) ** (1 / k);
        // Uniform direction, then squash the Hills cloud towards the ecliptic
        const z0 = 2 * rand() - 1;
        const phi = 2 * Math.PI * rand();
        const s = Math.sqrt(1 - z0 * z0);
        const flat = r < HILLS_EDGE_AU
            ? INNER_FLATTENING + (1 - INNER_FLATTENING) * (r - INNER_AU) / (HILLS_EDGE_AU - INNER_AU)
            : 1;
        let x = s * Math.cos(phi), y = s * Math.sin(phi), z = z0 * flat;
        const len = Math.hypot(x, y, z);
        x /= len; y /= len; z /= len;
        // Ecliptic -> equatorial -> scene (north = +Y)
        const ye = cosE * y - sinE * z, ze = sinE * y + cosE * z;
        const ly = r / AU_PER_LY;
        out.set([x * ly, ze * ly, -ye * ly], n * 3);
    }
    return out;
}

const vertexShader = `
    uniform float uSize;
    void main() {
        gl_PointSize = uSize;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;
const fragmentShader = `
    uniform vec3 uColor;
    uniform float uAlpha;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float alpha = (1.0 - smoothstep(0.5, 1.0, r)) * uAlpha;
        if (alpha < 0.004) discard;
        gl_FragColor = vec4(uColor, alpha);
    }
`;

// Returns update(cameraDistanceLy), setVisible(on), dispose()
export function buildOortCloud(scene, pixelRatio) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions(), 3));
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uSize: { value: SIZE_PX * pixelRatio },
            uAlpha: { value: 0 },
            uColor: { value: new THREE.Color().setHex(COLOR, THREE.LinearSRGBColorSpace) },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);
    let wanted = true;
    let fade = 0;
    return {
        update: (ly) => {
            fade = THREE.MathUtils.smoothstep(ly, ...FADE_IN_LY) * (1 - THREE.MathUtils.smoothstep(ly, ...FADE_OUT_LY));
            material.uniforms.uAlpha.value = ALPHA * fade;
            points.visible = wanted && fade > 0;
        },
        // How visible it is now (0..1), for its label
        fade: () => (wanted ? fade : 0),
        setVisible: (on) => { wanted = on; },
        dispose: () => {
            scene.remove(points);
            geometry.dispose();
            material.dispose();
        },
    };
}

// Where its label goes (ly, scene frame): above the Hills cloud's edge,
// towards ecliptic north. Most of the points (~80%) are inside it.
export const OORT_LABEL_POSITION = (() => {
    const r = HILLS_EDGE_AU / AU_PER_LY;
    return [0, Math.cos(OBLIQUITY) * r, Math.sin(OBLIQUITY) * r];
})();
