// The Milky Way's landmarks: real objects at their measured distances
// (landmarks.json, from Star_Data/scripts/build_landmarks.py), in the star
// layer (ly). So far the star clusters, two kinds (CLUSTER_KINDS):
//   - globulars: Baumgardt et al.'s database v4 (distances from Baumgardt
//     & Vasiliev 2021, masses and radii from Baumgardt & Hilker 2018)
//   - open_clusters: Hunt & Reffert 2023's Gaia DR3 census (reliable
//     sample), coloured by age
// Names from OpenNGC. Real, so shown from closer in than the model (like
// the masers).
//
// A globular is a soft glow with a Plummer profile (surface brightness
// (1 + (R/a)^2)^-2, a = the half-light radius), out to GLOBULAR_RADII
// half-light radii: a marker of a few px from afar (bigger for more
// massive clusters), its true size once that's bigger. An open cluster
// is a small dot (bigger for more members). Up close, each kind's stars:
// Gaia's members (<kind>_stars.bin, drawn by the star shader like the
// other stars, see decodeClusterStars); a globular's glow then carries
// only the light they don't (Gaia misses the faint stars and the crowded
// cores), an open cluster's dot fades out.

import * as THREE from 'three';
import { bvToColor } from './universe3d.js';

// Old stars: yellow-white (raw hex, ours; also the legend's swatch)
export const GLOBULAR_COLOR = 0xffe2ad;
// Open clusters by age (log10 years), young to old (raw hex, ours)
export const OPEN_AGE_COLORS = [[6.5, 0x9fc4ff], [7.7, 0xe8eeff], [8.7, 0xffe0a0], [9.7, 0xff9e60]];
// Per kind: marker diameter (px) over the range of its size measure
// (log10 Suns for globulars, log10 members for open clusters), brightness
const KIND = {
    globulars: { markerPx: [3.5, 8], sizeRange: [4, 6.5], brightness: 0.9, glow: true },
    open_clusters: { markerPx: [2.5, 5.5], sizeRange: [1, 3.5], brightness: 0.7, glow: false },
};
export const CLUSTER_KINDS = Object.keys(KIND);
const GLOBULAR_RADII = 3;
const MAX_PX = 900;
// Shown between these camera distances from the Sun (ly)
const FADE_IN_LY = [1000, 3000];
// Flying to one: this many radii (half-light / half-member) from it, at
// least this far
const VIEW_RADII = 25;
const VIEW_MIN_LY = 60;

const vertexShader = /* glsl */ `
    attribute vec3 color;
    attribute float radius;      // half-light / half-member radius (ly)
    attribute float marker;      // marker diameter (px)
    attribute float unresolved;  // share of its light Gaia's stars don't hold
    uniform float uFocalPx;      // px per unit at distance 1
    uniform float uPixelRatio;
    uniform float uStarsOn;      // 1 while its stars are drawn
    uniform float uGlow;         // 1: a Plummer glow at its true size (globulars)
    varying vec3 vColor;
    varying float vBright;
    void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float world = 2.0 * ${GLOBULAR_RADII.toFixed(1)} * radius * uFocalPx / max(-mv.z, 1e-3);
        float m = marker * uPixelRatio;
        gl_PointSize = clamp(uGlow > 0.5 ? max(m, world) : m, 1.0, ${MAX_PX.toFixed(1)});
        // Once it's bigger than its marker its stars show: a glow keeps the
        // light they don't hold, a dot goes
        float near = smoothstep(m, 4.0 * m, world) * uStarsOn;
        vBright = uGlow > 0.5 ? mix(1.0, unresolved, near) : 1.0 - near;
        vColor = color;
        gl_Position = projectionMatrix * mv;
    }
`;
const fragmentShader = /* glsl */ `
    uniform float uFade;
    uniform float uBrightness;
    varying vec3 vColor;
    varying float vBright;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float x = r * ${GLOBULAR_RADII.toFixed(1)};
        float glow = vBright / ((1.0 + x * x) * (1.0 + x * x)) * (1.0 - smoothstep(0.8, 1.0, r));
        if (glow * uFade < 0.003) discard;
        gl_FragColor = vec4(vColor * glow * uFade * uBrightness, 1.0);
    }
`;

const fmt = (n) => Math.round(n).toLocaleString();

// Raw hex -> [r, g, b] 0..1, and an open cluster's colour by its age
const rgb = (h) => [((h >> 16) & 255) / 255, ((h >> 8) & 255) / 255, (h & 255) / 255];
export function openAgeColor(ageMyr) {
    const x = Math.log10(Math.max(ageMyr ?? 300, 0.1) * 1e6);
    const stops = OPEN_AGE_COLORS;
    if (x <= stops[0][0]) return rgb(stops[0][1]);
    for (let k = 1; k < stops.length; k++) {
        if (x <= stops[k][0]) {
            const t = (x - stops[k - 1][0]) / (stops[k][0] - stops[k - 1][0]);
            const a = rgb(stops[k - 1][1]), b = rgb(stops[k][1]);
            return a.map((v, j) => v + (b[j] - v) * t);
        }
    }
    return rgb(stops[stops.length - 1][1]);
}

// What both kinds share, for cluster i of landmarks.json[kind]
function commonInfo(kind, g, i) {
    return {
        kind,
        index: i,
        name: g.name[i],
        title: g.title[i],
        ids: g.ids[i],
        messier: g.messier[i],
        position: g.xyz_ly.slice(3 * i, 3 * i + 3),
        distance: g.distance_ly[i],
        constellation: g.constellation[i],
        note: g.note[i],
        noteRef: g.note_ref[i],
        superlative: g.superlative[i],
        starCount: g.stars?.clusters.find(c => c.cluster === i)?.count ?? 0,
        starsRef: g.stars?.ref ?? null,
        labelled: g.label[i],
    };
}

// Cluster i of landmarks.json[kind]: {kind, index, name, title, ids,
// messier, position (ly array), distance, constellation, note, noteRef,
// superlative, starCount, starsRef, labelled, label (one line), radius
// (ly: half-light / half-member), and per kind: globulars: distanceErr,
// rGc, mass (Suns), rh, rt, vmag, resolved (share of its light in its Gaia
// stars); open clusters: distanceRange, age, ageRange (million years),
// members, r50, rt, av}
export function clusterInfo(kind, g, i) {
    const info = commonInfo(kind, g, i);
    if (kind === 'globulars') {
        return {
            ...info,
            distanceErr: g.distance_err_ly[i],
            rGc: g.r_gc_ly[i],
            mass: g.mass_msun[i],
            rh: g.rh_ly[i],
            rt: g.rt_ly[i],
            vmag: g.vmag[i],
            resolved: g.resolved?.[i] ?? null,
            radius: g.rh_ly[i],
            label: `${g.name[i]} · globular cluster, ${fmt(g.distance_ly[i])} ly`,
        };
    }
    return {
        ...info,
        distanceRange: g.distance_range_ly[i],
        age: g.age_myr[i],
        ageRange: g.age_range_myr[i],
        members: g.members[i],
        r50: g.r50_ly[i],
        rt: g.rt_ly[i],
        av: g.av[i],
        radius: g.r50_ly[i],
        label: `${g.name[i]} · open cluster, ${fmt(g.distance_ly[i])} ly`,
    };
}

// What a kind is called, one and many
export const CLUSTER_NAMES = {
    globulars: ['Globular cluster', 'Globular clusters'],
    open_clusters: ['Open cluster', 'Open clusters'],
};

// Camera view of cluster i: from the Sun's side, looking at it with the
// sky beyond. {position, target, minDistance}
export function clusterPose(kind, g, i) {
    const target = new THREE.Vector3().fromArray(g.xyz_ly, 3 * i);
    const radius = (kind === 'globulars' ? g.rh_ly[i] : g.r50_ly[i]) ?? 10;
    const distance = Math.max(VIEW_RADII * radius, VIEW_MIN_LY);
    const position = target.clone().addScaledVector(target.clone().normalize(), -distance);
    return { position: position.toArray(), target: target.toArray(), minDistance: radius };
}

// A kind's stars (<kind>_stars.bin, see landmarks.json[kind].stars) ->
// {positions (scene ly), colors, absMags, count} for the star shader
export function decodeClusterStars(buffer, g) {
    const meta = g.stars;
    const count = meta.count;
    const off = new Int16Array(buffer, 0, count * 3);
    const bytes = new Uint8Array(buffer, count * 6);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const absMags = new Float32Array(count);
    for (const c of meta.clusters) {
        const cx = g.xyz_ly[3 * c.cluster], cy = g.xyz_ly[3 * c.cluster + 1], cz = g.xyz_ly[3 * c.cluster + 2];
        for (let k = c.start; k < c.start + c.count; k++) {
            positions[3 * k] = cx + off[3 * k] * c.scale_ly;
            positions[3 * k + 1] = cy + off[3 * k + 1] * c.scale_ly;
            positions[3 * k + 2] = cz + off[3 * k + 2] * c.scale_ly;
        }
    }
    const table = new Float32Array(256 * 3);
    for (let k = 0; k < 256; k++) table.set(bvToColor(k === meta.bv.missing ? null : meta.bv.min + k * meta.bv.step), k * 3);
    for (let k = 0; k < count; k++) {
        absMags[k] = meta.abs_mag.min + bytes[k] * meta.abs_mag.step;
        colors.set(table.subarray(bytes[count + k] * 3, bytes[count + k] * 3 + 3), 3 * k);
    }
    return { positions, colors, absMags, count };
}

// scene: the star layer's scene; kind: a CLUSTER_KINDS key; g:
// landmarks.json[kind]. Returns {update(cameraLy, viewportHeightPx,
// fovDeg), fade(), setVisible(on), setStarsOn(on) (their stars are drawn),
// nearest(cameraLy) (ly to the nearest cluster's centre), labels() [{index,
// name, position (Vector3)}], info(i), pick(camera, width, height, x, y,
// radiusPx) -> index | null, dispose()}
export function buildClusters(scene, kind, g, pixelRatio) {
    const k = KIND[kind];
    const n = g.name.length;
    const radius = new Float32Array(n);
    const marker = new Float32Array(n);
    const unresolved = new Float32Array(n);
    const colors = new Float32Array(n * 3);
    const globularColor = rgb(GLOBULAR_COLOR);
    for (let i = 0; i < n; i++) {
        radius[i] = (kind === 'globulars' ? g.rh_ly[i] : g.r50_ly[i]) ?? 0;
        const size = kind === 'globulars' ? Math.log10(g.mass_msun[i] ?? 1e4) : Math.log10(g.members[i] || 10);
        const t = THREE.MathUtils.clamp((size - k.sizeRange[0]) / (k.sizeRange[1] - k.sizeRange[0]), 0, 1);
        marker[i] = k.markerPx[0] + (k.markerPx[1] - k.markerPx[0]) * t;
        unresolved[i] = 1 - (g.resolved?.[i] ?? 0);
        colors.set(kind === 'globulars' ? globularColor : openAgeColor(g.age_myr[i]), 3 * i);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(g.xyz_ly, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('radius', new THREE.BufferAttribute(radius, 1));
    geometry.setAttribute('marker', new THREE.BufferAttribute(marker, 1));
    geometry.setAttribute('unresolved', new THREE.BufferAttribute(unresolved, 1));
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uFocalPx: { value: 1 },
            uPixelRatio: { value: pixelRatio },
            uFade: { value: 0 },
            uStarsOn: { value: 0 },
            uGlow: { value: k.glow ? 1 : 0 },
            uBrightness: { value: k.brightness },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    // After the dust volume (-2.5): their own light is what's drawn
    points.renderOrder = -1;
    points.frustumCulled = false;
    points.visible = false;
    scene.add(points);

    const labels = [];
    for (let i = 0; i < n; i++) {
        if (g.label[i]) labels.push({ index: i, name: g.name[i], position: new THREE.Vector3().fromArray(g.xyz_ly, 3 * i) });
    }
    let wanted = true;
    let fade = 0;
    const projected = new THREE.Vector3();
    return {
        update: (cameraLy, viewportHeightPx, fovDeg) => {
            fade = wanted ? THREE.MathUtils.smoothstep(cameraLy.length(), ...FADE_IN_LY) : 0;
            points.visible = fade > 0;
            material.uniforms.uFade.value = fade;
            material.uniforms.uFocalPx.value = viewportHeightPx * pixelRatio / (2 * Math.tan(THREE.MathUtils.degToRad(fovDeg) / 2));
        },
        fade: () => fade,
        setVisible: (on) => { wanted = on; },
        setStarsOn: (on) => { material.uniforms.uStarsOn.value = on ? 1 : 0; },
        nearest: (cameraLy) => {
            let best = Infinity;
            for (let i = 0; i < n; i++) {
                const dx = g.xyz_ly[3 * i] - cameraLy.x, dy = g.xyz_ly[3 * i + 1] - cameraLy.y, dz = g.xyz_ly[3 * i + 2] - cameraLy.z;
                best = Math.min(best, dx * dx + dy * dy + dz * dz);
            }
            return Math.sqrt(best);
        },
        labels: () => labels,
        info: (i) => clusterInfo(kind, g, i),
        // Index of the cluster drawn nearest (x, y) px within radiusPx (or
        // under a globular's glow, if that's bigger), once clearly visible
        pick: (camera, width, height, x, y, radiusPx) => {
            if (fade < 0.3) return null;
            let best = null;
            let bestD = Infinity;
            const focal = height / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
            for (let i = 0; i < n; i++) {
                projected.fromArray(g.xyz_ly, 3 * i);
                const dist = projected.distanceTo(camera.position);
                projected.project(camera);
                if (projected.z > 1 || projected.z < -1) continue;
                const d = Math.hypot((projected.x + 1) / 2 * width - x, (1 - projected.y) / 2 * height - y);
                const reach = k.glow ? Math.max(radiusPx, GLOBULAR_RADII * radius[i] * focal / dist * 0.5) : radiusPx;
                if (d < reach && d < bestD) {
                    bestD = d;
                    best = i;
                }
            }
            return best;
        },
        dispose: () => {
            scene.remove(points);
            geometry.dispose();
            material.dispose();
        },
    };
}
