// The Milky Way's landmarks: real objects at their measured distances
// (landmarks.json, from Star_Data/scripts/build_landmarks.py), in the star
// layer (ly). So far the globular clusters: Baumgardt et al.'s database v4
// (distances from Baumgardt & Vasiliev 2021, masses and radii from
// Baumgardt & Hilker 2018), names from OpenNGC.
//
// Each cluster is a soft glow with a Plummer profile (surface brightness
// (1 + (R/a)^2)^-2, a = the half-light radius), out to GLOBULAR_RADII
// half-light radii: a marker of a few px from afar (bigger for more
// massive clusters), its true size once that's bigger. Real, so shown
// from closer in than the model (like the masers). Up close, its stars:
// Gaia's members (Vasiliev & Baumgardt 2021; globular_stars.bin, drawn by
// the star shader like the other stars, see decodeGlobularStars), and the
// glow then carries only the light they don't (Gaia misses the faint
// stars and the crowded cores).

import * as THREE from 'three';
import { bvToColor } from './universe3d.js';

// Old stars: yellow-white (raw hex, ours; also the legend's swatch)
export const GLOBULAR_COLOR = 0xffe2ad;
// Marker diameter (px) from 10^4 to 10^6.5 Suns (log), and the glow's reach
const MARKER_PX = [3.5, 8];
const GLOBULAR_RADII = 3;
const MAX_PX = 900;
const BRIGHTNESS = 0.9;
// Shown between these camera distances from the Sun (ly)
const FADE_IN_LY = [1000, 3000];
// Flying to one: this many half-light radii from it, at least this far
const VIEW_RADII = 25;
const VIEW_MIN_LY = 60;

const vertexShader = /* glsl */ `
    attribute float rh;          // half-light radius (ly)
    attribute float marker;      // marker diameter (px)
    attribute float unresolved;  // share of its light Gaia's stars don't hold
    uniform float uFocalPx;      // px per unit at distance 1
    uniform float uPixelRatio;
    uniform float uStarsOn;      // 1 while its stars are drawn
    varying float vGlow;
    void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        float world = 2.0 * ${GLOBULAR_RADII.toFixed(1)} * rh * uFocalPx / max(-mv.z, 1e-3);
        float m = marker * uPixelRatio;
        gl_PointSize = clamp(max(m, world), 1.0, ${MAX_PX.toFixed(1)});
        // Once it's bigger than its marker its stars show: the rest only
        vGlow = mix(1.0, unresolved, smoothstep(m, 4.0 * m, world) * uStarsOn);
        gl_Position = projectionMatrix * mv;
    }
`;
const fragmentShader = /* glsl */ `
    uniform vec3 uColor;
    uniform float uFade;
    varying float vGlow;
    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float x = r * ${GLOBULAR_RADII.toFixed(1)};
        float glow = vGlow / ((1.0 + x * x) * (1.0 + x * x)) * (1.0 - smoothstep(0.8, 1.0, r));
        if (glow * uFade < 0.003) discard;
        gl_FragColor = vec4(uColor * glow * uFade * ${BRIGHTNESS.toFixed(2)}, 1.0);
    }
`;

const fmt = (n) => Math.round(n).toLocaleString();

// Globular i of landmarks.json `globulars`: {index, name, title, ids,
// messier, position (ly array), distance, distanceErr, rGc (ly), mass
// (Suns), rh, rt (ly), vmag, constellation, note, noteRef, superlative,
// resolved (share of its light in its Gaia stars), starCount, starsRef,
// labelled, label (one line)}
export function globularInfo(g, i) {
    return {
        index: i,
        name: g.name[i],
        title: g.title[i],
        ids: g.ids[i],
        messier: g.messier[i],
        position: g.xyz_ly.slice(3 * i, 3 * i + 3),
        distance: g.distance_ly[i],
        distanceErr: g.distance_err_ly[i],
        rGc: g.r_gc_ly[i],
        mass: g.mass_msun[i],
        rh: g.rh_ly[i],
        rt: g.rt_ly[i],
        vmag: g.vmag[i],
        constellation: g.constellation[i],
        note: g.note[i],
        noteRef: g.note_ref[i],
        superlative: g.superlative[i],
        resolved: g.resolved?.[i] ?? null,
        starCount: g.stars?.clusters.find(c => c.cluster === i)?.count ?? 0,
        starsRef: g.stars?.ref ?? null,
        labelled: g.label[i],
        label: `${g.name[i]} · globular cluster, ${fmt(g.distance_ly[i])} ly`,
    };
}

// Camera view of globular i: from the Sun's side, looking at it with the
// sky beyond. {position, target, minDistance}
export function globularPose(g, i) {
    const target = new THREE.Vector3().fromArray(g.xyz_ly, 3 * i);
    const rh = g.rh_ly[i] ?? 10;
    const distance = Math.max(VIEW_RADII * rh, VIEW_MIN_LY);
    const position = target.clone().addScaledVector(target.clone().normalize(), -distance);
    return { position: position.toArray(), target: target.toArray(), minDistance: rh };
}

// The clusters' stars (globular_stars.bin, see landmarks.json stars) ->
// {positions (scene ly), colors, absMags, count} for the star shader
export function decodeGlobularStars(buffer, g) {
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

// scene: the star layer's scene; g: landmarks.json globulars. Returns
// {update(cameraLy, viewportHeightPx, fovDeg), fade(), setVisible(on),
// setStarsOn(on) (their stars are drawn: the glow keeps only the rest),
// nearest(cameraLy) (ly to the nearest cluster's centre), labels() [{index,
// name, position (Vector3)}], info(i), pick(camera, width, height, x, y,
// radiusPx) -> index | null, dispose()}
export function buildGlobulars(scene, g, pixelRatio) {
    const n = g.name.length;
    const rh = new Float32Array(n);
    const marker = new Float32Array(n);
    const unresolved = new Float32Array(n);
    for (let i = 0; i < n; i++) {
        rh[i] = g.rh_ly[i] ?? 0;
        const t = THREE.MathUtils.clamp((Math.log10(g.mass_msun[i] ?? 1e4) - 4) / 2.5, 0, 1);
        marker[i] = MARKER_PX[0] + (MARKER_PX[1] - MARKER_PX[0]) * t;
        unresolved[i] = 1 - (g.resolved?.[i] ?? 0);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(g.xyz_ly, 3));
    geometry.setAttribute('rh', new THREE.BufferAttribute(rh, 1));
    geometry.setAttribute('marker', new THREE.BufferAttribute(marker, 1));
    geometry.setAttribute('unresolved', new THREE.BufferAttribute(unresolved, 1));
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uFocalPx: { value: 1 },
            uPixelRatio: { value: pixelRatio },
            uColor: { value: new THREE.Color().setHex(GLOBULAR_COLOR, THREE.LinearSRGBColorSpace) },
            uFade: { value: 0 },
            uStarsOn: { value: 0 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    // After the dust volume (-2.5): they're mostly far above and below the
    // disc, and their own light is what's drawn
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
        info: (i) => globularInfo(g, i),
        // Index of the cluster drawn nearest (x, y) px within radiusPx (or
        // under its glow, if that's bigger), once clearly visible
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
                const reach = Math.max(radiusPx, GLOBULAR_RADII * rh[i] * focal / dist * 0.5);
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
