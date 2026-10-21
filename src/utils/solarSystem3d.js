// The Solar System layer of the 3D view (units AU, origin the Sun).
//
// Each body is a real-size sphere plus a fixed-size dot, so it can be found
// from far away; the dot fades out once the sphere is drawn bigger than it.
// Spheres sit at mesh.position (JS doubles), so the GPU only ever sees
// camera-relative numbers and close-ups stay sharp. The Sun's glow is the
// star-layer point at the origin; here it is only a sphere.
//
// The Sun, planets, Pluto and our Moon turn on their real axes (IAU poles
// and prime meridians, utils/planets.js bodyAxes), so their surface maps
// show the side really facing you at the clock's time. The other major
// moons are tidally locked: longitude 0 faces their planet and their pole
// is their orbit's. Each body is an anchor group at its place holding the
// dot (and the giants' rings), with the spinning sphere inside it.
//
// Moons: the major ones (moons.json `major`, plus our Moon) are bodies like
// the planets, with orbit lines and labels. The minor ones are one cloud of
// small dots per planet, positioned at the planet, with no labels (hover
// and click still find them, and a clicked one gets its orbit line). A
// moon's dot only shows once it is drawn a few pixels clear of its planet,
// so from far away a planet is just its own dot.
//
// Named asteroids, dwarf planets and comets (small_bodies.json `named`)
// are bodies too, plain grey spheres; dwarf planets always show their
// orbits, the rest only while selected. The unnamed ones are a point cloud
// of their own (smallBodies3d.js).
// Positions come from utils/planets.js, utils/moons.js and
// utils/smallBodies.js (scene frame: J2000, north = +Y).

import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { moonMeanAnomaly, moonMeanOrbit, moonOrbitLoop, moonPeriodDays, moonPosition, moonPositionSource } from './moons.js';
import { RING_SYSTEMS } from './rings.js';
import { bodyAxes, heliocentricPosition, moonOrbitPath, orbitPath, orbitPeriodDays, SOLAR_SYSTEM_BODIES } from './planets.js';
import { smallBodyOrbit, smallBodyPeriodDays, smallBodyPosition, spinAxes } from './smallBodies.js';
import { KM_PER_AU, raDecToXYZ } from './universe3d.js';

// Whole layer fades out between these camera distances from the Sun (AU)
const FADE_START_AU = 300;
const FADE_END_AU = 5000;

const DOT_SIZE_PX = 6;
// A body's texture starts loading once it is drawn this many px in radius
// (a little before its sphere outgrows its dot, so it's there when visible)
const TEXTURE_LOAD_PX = 2;
const MINOR_MOON_SIZE_PX = 3;
const DEG_TO_RAD = Math.PI / 180;
const ORBIT_OPACITY = 0.35;
// Orbit lines are resampled once their body has moved this much of an orbit,
// spending at most ORBIT_BUDGET_MS a frame on it (see resampleStaleOrbits)
const ORBIT_RESAMPLE_FRACTION = 1 / 200;
const ORBIT_BUDGET_MS = 4;
// A moon's dot fades in between these distances (px) from its planet's centre
const MOON_SEPARATION_PX = [6, 14];
// A planet's small-moon cloud fades in as its typical orbit grows across
// the screen between these sizes (px, radius): most small moons are 1-4 km
// rocks far too faint to see, so they only show once you zoom in
const MINOR_CLOUD_FADE_PX = [150, 450];
// Minor moons with no measured size are drawn (and flown to) at this radius
const UNKNOWN_MOON_RADIUS_KM = 5;
// Comet nuclei with no measured size (the new and interstellar ones)
const UNKNOWN_NUCLEUS_RADIUS_KM = 1;
const ASTEROID_COLOR = '#9a948b';
const ICY_COLOR = '#c2b5a8';      // dwarf planets and bodies beyond Jupiter
const COMET_COLOR = '#7fd6ea';
const ICY_TYPES = new Set(['dwarf planet', 'centaur', 'trans-Neptunian object']);
const DEFAULT_MOON_COLOR = '#aaa49b';
const MOON_COLORS = {
    Io: '#d8c46f', Europa: '#cdbea2', Ganymede: '#9f978b', Callisto: '#6e665d',
    Titan: '#d6a25a', Enceladus: '#e8eef2', Iapetus: '#8f8676', Triton: '#cdbcb3',
    Phobos: '#7d7268', Deimos: '#9a8f82', Charon: '#9b958f',
};

// Surface maps in public/textures, by body name: equirectangular, longitude
// 0 in the middle, east to the right. Sun and planets: Solar System Scope
// (CC BY 4.0; credited in the About box). Our Moon: NASA's CGI Moon Kit
// (colour + a normal map, built by Star_Data/scripts/build_lunar_textures.py).
// Pluto and the other moons: USGS / NASA maps, built by
// Star_Data/scripts/build_moon_textures.py (which re-centres them, fills
// unseen areas and tints the greyscale ones).
// Bodies without one keep their colour. The info card shows `from` (what
// the map is made of), `by` (who made it, linked) and `note`.
// widthPx: the maps' width, which sets how close the camera may come
// (see minViewRadii)
const SSS = { by: 'Solar System Scope', href: 'https://www.solarsystemscope.com/textures/', widthPx: 2048 };
const USGS = { by: 'USGS Astrogeology', href: 'https://astrogeology.usgs.gov/', widthPx: 1024 };
const NASA_3D = { by: 'NASA 3D Resources', href: 'https://github.com/nasa/NASA-3D-Resources', widthPx: 1440 };
const TINTED = 'Greyscale map, tinted with its usual colour';
const UNSEEN_NORTH = 'Voyager 2 saw only the southern half (the north was in darkness); the rest is filled in';
const NEW_HORIZONS_SOUTH = 'South of about 30° S was in darkness during the flyby; it is filled in';
// How close (in radii, from the centre) the camera may come to a body
// before its surface map is blown up past MAX_TEXEL_PX screen pixels per
// map pixel (at the point straight below). pxRadians: one screen pixel's
// angle. Bodies without a map: just above the surface.
const MAX_TEXEL_PX = 3;
const MIN_VIEW_RADII = 1.2;
export function minViewRadii(surfaceMap, pxRadians) {
    if (!surfaceMap) return MIN_VIEW_RADII;
    const fromSurface = 2 * Math.PI / (surfaceMap.widthPx * MAX_TEXEL_PX * pxRadians);
    return Math.max(MIN_VIEW_RADII, 1 + fromSurface);
}

export const SURFACE_MAPS = {
    Sun: { file: '2k_sun.jpg', ...SSS, from: 'Artwork', note: 'The real surface changes by the minute' },
    Mercury: { file: '2k_mercury.jpg', ...SSS, from: 'Based on NASA spacecraft images' },
    Venus: { file: '2k_venus_atmosphere.jpg', ...SSS, from: 'Based on NASA spacecraft images', note: 'The cloud tops: thick clouds hide the surface' },
    Earth: {
        file: '2k_earth_daymap.jpg', ...SSS, from: 'Based on NASA satellite images',
        note: 'A cloud-free day map, with city lights from a night map. The clouds are a separate layer '
            + 'from one snapshot, drifting slowly east: not the real weather',
    },
    Moon: {
        file: 'moon_color_4k.jpg', normal: 'moon_normal_4k.jpg',
        by: 'NASA SVS (CGI Moon Kit)', href: 'https://svs.gsfc.nasa.gov/4720', widthPx: 4096,
        from: 'Lunar Reconnaissance Orbiter colour mosaic, with relief from its laser altimeter',
        note: 'Relief is exaggerated 2×. The glow on the night side is earthshine (sunlight bounced off Earth), '
            + 'brightest near new Moon; drawn far brighter than the real thing so it shows',
    },
    Mars: { file: '2k_mars.jpg', ...SSS, from: 'Based on NASA spacecraft images' },
    Jupiter: { file: '2k_jupiter.jpg', ...SSS, from: 'Based on NASA spacecraft images', note: 'Cloud bands: they shift over weeks' },
    Saturn: { file: '2k_saturn.jpg', ...SSS, from: 'Based on NASA spacecraft images' },
    Uranus: { file: '2k_uranus.jpg', ...SSS, from: 'Based on NASA spacecraft images' },
    Neptune: { file: '2k_neptune.jpg', ...SSS, from: 'Based on NASA spacecraft images' },
    Pluto: { file: 'pluto.jpg', ...USGS, from: 'New Horizons mosaic (2015 flyby)', note: `${NEW_HORIZONS_SOUTH}. ${TINTED}` },
    Io: { file: 'io.jpg', ...USGS, from: 'Galileo and Voyager colour mosaic' },
    Europa: { file: 'europa.jpg', ...USGS, from: 'Galileo and Voyager mosaic', note: TINTED },
    Ganymede: { file: 'ganymede.jpg', ...USGS, from: 'Galileo and Voyager colour mosaic' },
    Callisto: { file: 'callisto.jpg', ...USGS, from: 'Galileo and Voyager mosaic', note: TINTED },
    Mimas: { file: 'mimas.jpg', ...NASA_3D, from: 'Spacecraft map with gaps', note: `Unmapped areas are filled in. ${TINTED}` },
    Enceladus: { file: 'enceladus.jpg', ...USGS, from: 'Cassini mosaic', note: TINTED },
    Tethys: { file: 'tethys.jpg', ...NASA_3D, from: 'Spacecraft map with gaps', note: `Unmapped areas are filled in. ${TINTED}` },
    Dione: { file: 'dione.jpg', ...USGS, from: 'Cassini and Voyager mosaic', note: TINTED },
    Rhea: { file: 'rhea.jpg', ...USGS, from: 'Cassini and Voyager mosaic', note: TINTED },
    Titan: { file: 'titan.jpg', ...USGS, from: 'Cassini near-infrared mosaic', note: `The surface under the haze, which hides it from ordinary cameras. ${TINTED}` },
    Iapetus: { file: 'iapetus.jpg', ...NASA_3D, from: 'Spacecraft map', note: `Keeps its dark leading and bright trailing halves. ${TINTED}` },
    Phobos: { file: 'phobos.jpg', ...NASA_3D, from: 'Spacecraft map', note: `Drawn as a sphere: the real Phobos is potato-shaped. ${TINTED}` },
    Deimos: { file: 'deimos.jpg', ...NASA_3D, from: 'Spacecraft map', note: `Drawn as a sphere: the real Deimos is potato-shaped. ${TINTED}` },
    Miranda: { file: 'miranda.jpg', ...NASA_3D, from: 'Voyager 2 map (1986 flyby)', note: `${UNSEEN_NORTH}. ${TINTED}` },
    Ariel: { file: 'ariel.jpg', ...NASA_3D, from: 'Voyager 2 map (1986 flyby)', note: `${UNSEEN_NORTH}. ${TINTED}` },
    Umbriel: { file: 'umbriel.jpg', ...NASA_3D, from: 'Voyager 2 map (1986 flyby)', note: `${UNSEEN_NORTH}. ${TINTED}` },
    Titania: { file: 'titania.jpg', ...NASA_3D, from: 'Voyager 2 map (1986 flyby)', note: `${UNSEEN_NORTH}. ${TINTED}` },
    Oberon: { file: 'oberon.jpg', ...NASA_3D, from: 'Voyager 2 map (1986 flyby)', note: `${UNSEEN_NORTH}. ${TINTED}` },
    Triton: { file: 'triton.jpg', ...USGS, from: 'Voyager 2 colour mosaic (1989 flyby)', note: 'Voyager 2 saw mostly the southern half; the rest is filled in' },
    Charon: { file: 'charon.jpg', ...USGS, from: 'New Horizons mosaic (2015 flyby)', note: `${NEW_HORIZONS_SOUTH}. ${TINTED}` },
    Ceres: { file: 'ceres.jpg', ...USGS, from: 'Dawn mosaic (2015, made by DLR)', note: 'Around the south pole is filled in. Its bright spots are salt deposits in Occator crater' },
    Vesta: { file: 'vesta.jpg', ...USGS, from: 'Dawn mosaic (2011-2012, made by DLR)', note: 'The north was in winter darkness while Dawn mapped it, so it shows dark. Drawn as a sphere: the real Vesta is squashed, with a giant crater at its south pole' },
};
// Earth's extra maps (Solar System Scope, like its day map; the ocean mask
// converted from their TIFF) and look (see setupEarth)
const EARTH_TEXTURES = {
    night: '2k_earth_nightmap.jpg',
    clouds: '2k_earth_clouds.jpg',
    ocean: '2k_earth_specular.jpg',  // white = water
};
const EARTH_NIGHT_LIGHTS = 1.5;     // city light brightness
const EARTH_CLOUD_DIMMING = 0.8;    // how much clouds hide city lights
const EARTH_GLINT = 0x262626;       // sunglint strength on water (a soft sheen)
const EARTH_SHININESS = 30;         // sunglint tightness
const EARTH_CLOUD_SCALE = 1.004;    // cloud layer radius (~25 km up)
const EARTH_ATMOSPHERE_SCALE = 1.025;
// The cloud map is one snapshot; it drifts east (with the mid-latitude
// westerlies, ~10 m/s) so time-lapses look alive. Not real weather.
const EARTH_CLOUD_DRIFT_DEG_PER_DAY = 8;
// Our Moon's look (see setupMoon). Its normal map holds true slopes;
// MOON_RELIEF scales them up so craters show at the terminator.
const MOON_RELIEF = 2;
// Earthshine on the night side, as a fraction of full sunlight, when Earth
// is full as seen from the Moon (at new Moon). The real thing is ~1/10,000;
// this is a long exposure. (The scene's ambient light adds ~0.02 everywhere.)
const MOON_EARTHSHINE = 0.06;
// Not tidally locked (spins every ~12 h); has no map anyway
const UNLOCKED_MOONS = new Set(['Nereid']);
// Time step for a locked moon's direction of motion (its orbit's pole)
const LOCK_STEP_MS = 10 * 60 * 1000;
const textureUrl = (file) => `${import.meta.env.BASE_URL}textures/${file}`;

// ---------- Rings ----------
// Ring systems (what to draw, in which plane) are in utils/rings.js
const RING_TEXTURE_PX = 2048;
// Sharper rings seen at a slant (clamped to what the GPU supports)
const RING_ANISOTROPY = 8;

// Ecliptic north in the scene frame (RA 18h, Dec +66.56)
export const ECLIPTIC_NORTH = new THREE.Vector3(...raDecToXYZ(18, 66.56, 1));

// Screen distance (px) between two view-space points, from the projection's
// y scale (the x scale is the same per pixel)
const separationGlsl = `
    float separationPx(vec4 a, vec4 b) {
        vec2 pa = a.xy / max(-a.z, 1e-30);
        vec2 pb = b.xy / max(-b.z, 1e-30);
        return length(pa - pb) * projectionMatrix[1][1] * uViewportHeight * 0.5;
    }
`;

// Fixed-size dot at the object's origin; fades as the sphere outgrows it.
// Moons also fade in only once clear of their planet (uParentOffset is the
// planet's position relative to the moon, AU).
const dotVertexShader = `
    uniform float uSize;
    uniform float uRadius;
    uniform float uViewportHeight;
    uniform float uFade;
    uniform float uHasParent;
    uniform vec3 uParentOffset;
    varying float vAlpha;
    ${separationGlsl}

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        float radiusPx = uRadius / max(-mvPosition.z, 1e-30) * projectionMatrix[1][1] * uViewportHeight * 0.5;
        vAlpha = uFade * (1.0 - smoothstep(uSize * 0.25, uSize * 0.5, radiusPx));
        if (uHasParent > 0.5) {
            vec4 parent = modelViewMatrix * vec4(uParentOffset, 1.0);
            vAlpha *= smoothstep(${MOON_SEPARATION_PX[0].toFixed(1)}, ${MOON_SEPARATION_PX[1].toFixed(1)}, separationPx(mvPosition, parent));
        }
        gl_PointSize = vAlpha > 0.0 ? uSize : 0.0;
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const dotFragmentShader = `
    uniform vec3 uColor;
    uniform float uLinear;
    varying float vAlpha;

    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        float alpha = (1.0 - smoothstep(0.55, 1.0, r)) * vAlpha;
        if (alpha < 0.01) discard;
        vec3 color = mix(uColor, pow(uColor, vec3(2.2)), uLinear);  // like the star shader
        gl_FragColor = vec4(color, alpha);
    }
`;

// Minor moons: positions are relative to the planet (the object's origin).
// uCloudFade: the whole cloud only shows when zoomed in on its planet.
const minorMoonVertexShader = `
    uniform float uSize;
    uniform float uViewportHeight;
    uniform float uFade;
    uniform float uCloudFade;
    varying float vAlpha;
    ${separationGlsl}

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vec4 parent = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        vAlpha = uFade * uCloudFade * 0.55 * smoothstep(${MOON_SEPARATION_PX[0].toFixed(1)}, ${MOON_SEPARATION_PX[1].toFixed(1)}, separationPx(mvPosition, parent));
        gl_PointSize = vAlpha > 0.0 ? uSize : 0.0;
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const colorUniform = (hex) => ({ value: new THREE.Color().setHex(hex, THREE.LinearSRGBColorSpace) });

function makeDot(color, radiusAu, pixelRatio, hasParent) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3));
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uSize: { value: DOT_SIZE_PX * pixelRatio },
            uRadius: { value: radiusAu },
            uViewportHeight: { value: 1 },
            uFade: { value: 1 },
            uLinear: { value: 0 },
            uHasParent: { value: hasParent ? 1 : 0 },
            uParentOffset: { value: new THREE.Vector3() },
            // Raw hex values, like the star shader (no colour management)
            uColor: colorUniform(color),
        },
        vertexShader: dotVertexShader,
        fragmentShader: dotFragmentShader,
        transparent: true,
        depthWrite: false,
    });
    const dot = new THREE.Points(geometry, material);
    dot.frustumCulled = false;
    return dot;
}

function makeMinorMoonCloud(count, pixelRatio) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uSize: { value: MINOR_MOON_SIZE_PX * pixelRatio },
            uViewportHeight: { value: 1 },
            uFade: { value: 1 },
            uCloudFade: { value: 0 },
            uLinear: { value: 0 },
            uColor: colorUniform(new THREE.Color(DEFAULT_MOON_COLOR).getHex()),
        },
        vertexShader: minorMoonVertexShader,
        fragmentShader: dotFragmentShader,
        transparent: true,
        depthWrite: false,
    });
    const cloud = new THREE.Points(geometry, material);
    cloud.frustumCulled = false;
    return cloud;
}

// Orbit lines write depth, so where two cross on screen the nearer one is
// drawn on top instead of whichever happened to be drawn last.
// closed: false for the open paths of objects escaping the Sun
function makeOrbitLine(flatPositions, color, opacity = ORBIT_OPACITY, closed = true) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(flatPositions, 3));
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    const line = closed ? new THREE.LineLoop(geometry, material) : new THREE.Line(geometry, material);
    line.userData.baseOpacity = opacity;
    return line;
}

function disposeLine(line) {
    line.parent?.remove(line);
    line.geometry.dispose();
    line.material.dispose();
}

// A 1-px-high strip across [innerKm, outerKm]: each texel's alpha is the
// bands' opacity times how much of the texel they cover, so rings thinner
// than a texel come out as faint lines instead of vanishing or flickering.
// Red holds the texel's dust fraction (opacity-weighted), which the ring
// shader reads (uBandData); green and blue are unused.
function makeBandTexture(bands, [innerKm, outerKm]) {
    const data = new Uint8Array(RING_TEXTURE_PX * 4);
    const texelKm = (outerKm - innerKm) / RING_TEXTURE_PX;
    for (let x = 0; x < RING_TEXTURE_PX; x++) {
        const a = innerKm + x * texelKm;
        let alpha = 0;
        let dusty = 0;
        for (const [r0, r1, opacity, dust = 0] of bands) {
            const overlap = Math.min(a + texelKm, r1) - Math.max(a, r0);
            if (overlap > 0) {
                alpha += opacity * overlap / texelKm;
                dusty += dust * opacity * overlap / texelKm;
            }
        }
        const dustFraction = alpha > 0 ? dusty / alpha : 0;
        data.set([Math.round(dustFraction * 255), 255, 255, Math.round(Math.min(alpha, 1) * 255)], x * 4);
    }
    const texture = new THREE.DataTexture(data, RING_TEXTURE_PX, 1);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = RING_ANISOTROPY;
    texture.needsUpdate = true;
    return texture;
}

// Ring shading, replacing a ring strip material's texture lookup. Works in
// the ring mesh's own frame (planet at the origin, ring in the xy plane,
// moons going round counterclockwise), in AU. Per fragment:
//  - edges (rings.js) move ring material near them in and out: the
//    texture is looked up at r - shift(r, angle), so the texture's own
//    features move too. A moon's angle (uEdgeB.w) is set by update().
//  - the texture position comes from the strip's stops (u at radius),
//    linear between them
//  - carve: gaps cut out (at the moved radius, so their edges wave)
//  - channels: Prometheus' dark channels across the F ring
//  - the planet's shadow: a point is shadowed if its line to the Sun
//    (uSunDir, set by update()) passes through the planet
// Returns the uniforms.
const RING_SHADOW_DARKNESS = 0.9;
const RING_MAX_STOPS = 8;
const RING_MAX_EDGES = 6;
const RING_MAX_CARVES = 2;
const CHANNEL_WIDTH_DEG = 0.3;
const CHANNEL_DEPTH = 0.85;
// Shared by every ring material: how much the moving edges are exaggerated
const ringEdgeScale = { value: 1 };
// Forward-scattering strength of ring dust (Henyey-Greenstein g): relative
// to side lighting, ~0.4x lit from the front and ~25x backlit
const DUST_G = 0.6;
const ringShaderCode = `
    #define RING_PI 3.141592653589793
    varying vec3 vRingPos;
    uniform vec3 uSunDir;
    uniform float uPlanetRadius;
    uniform vec2 uStops[${RING_MAX_STOPS}];   // (u, r)
    uniform int uStopCount;
    uniform vec4 uEdgeA[${RING_MAX_EDGES}];   // (radius, window, amplitude, kind: 1 resonance, 2 wake)
    uniform vec4 uEdgeB[${RING_MAX_EDGES}];   // resonance: (m, -, -, moon angle); wake: (wavelength, damping, side, moon angle)
    uniform int uEdgeCount;
    uniform float uEdgeScale;                 // 1 = true size; more exaggerates (setRingWaveScale)
    uniform vec2 uCarves[${RING_MAX_CARVES}];
    uniform int uCarveCount;
    uniform vec4 uChannels;                   // (radius, window, newest channel's angle, count; 0 = none)
    uniform float uChannelSpacing;            // radians
    uniform float uBandData;                  // 1: map is a band strip (red = dust, alpha = opacity)
    uniform vec3 uCameraLocal;                // the camera, in this frame (set each frame)

    // Henyey-Greenstein phase function relative to side lighting:
    // cosScatter 1 = light passing straight on to the camera (backlit)
    float dustPhase(float cosScatter) {
        float g = ${DUST_G.toFixed(2)};
        float hg = (1.0 - g * g) / pow(1.0 + g * g - 2.0 * g * cosScatter, 1.5);
        float side = (1.0 - g * g) / pow(1.0 + g * g, 1.5);
        return hg / side;
    }

    float ringU(float r) {
        for (int i = 0; i < ${RING_MAX_STOPS - 1}; i++) {
            if (i + 2 >= uStopCount || r <= uStops[i + 1].y) {
                return mix(uStops[i].x, uStops[i + 1].x, (r - uStops[i].y) / (uStops[i + 1].y - uStops[i].y));
            }
        }
        return uStops[0].x;
    }

    float edgeShift(float r, float theta) {
        float shift = 0.0;
        for (int i = 0; i < ${RING_MAX_EDGES}; i++) {
            if (i >= uEdgeCount) break;
            vec4 a = uEdgeA[i];
            vec4 b = uEdgeB[i];
            float amplitude = a.z * uEdgeScale;
            // The window grows with the amplitude so the moved material
            // never folds over itself (shift changes slower than radius)
            float window = 1.0 - smoothstep(0.0, max(a.y, 2.0 * amplitude), abs(r - a.x));
            if (window <= 0.0 || amplitude == 0.0) continue;
            float psi = mod(theta - b.w + RING_PI, 2.0 * RING_PI) - RING_PI;  // from the moon, forwards
            float s = 0.0;
            if (a.w < 1.5) {
                s = -cos(b.x * psi);
            } else {
                float x = b.z * psi * a.x;  // downstream distance
                if (x > 0.0) s = exp(-x / b.y) * sin(2.0 * RING_PI * x / b.x);
            }
            shift += window * amplitude * s;
        }
        return shift;
    }
`;
function addRingShading(material, planetRadiusAu, strip) {
    const au = (km) => km / KM_PER_AU;
    const stops = strip.stops ?? [[0, strip.km[0]], [1, strip.km[1]]];
    const edges = strip.edges ?? [];
    const carves = strip.carve ?? [];
    const pad = (list, n, make) => [...list, ...Array.from({ length: n - list.length }, make)];
    const uniforms = {
        uSunDir: { value: new THREE.Vector3(1, 0, 0) },
        uPlanetRadius: { value: planetRadiusAu },
        uStops: { value: pad(stops.map(([u, km]) => new THREE.Vector2(u, au(km))), RING_MAX_STOPS, () => new THREE.Vector2()) },
        uStopCount: { value: stops.length },
        uEdgeA: {
            value: pad(edges.map(e => new THREE.Vector4(au(e.km), au(e.windowKm), au(e.amplitudeKm), e.kind === 'wake' ? 2 : 1)),
                RING_MAX_EDGES, () => new THREE.Vector4()),
        },
        uEdgeB: {
            value: pad(edges.map(e => (e.kind === 'wake'
                ? new THREE.Vector4(au(e.wavelengthKm), au(e.dampingKm), e.side, 0)
                : new THREE.Vector4(e.m, 0, 0, 0))), RING_MAX_EDGES, () => new THREE.Vector4()),
        },
        uEdgeCount: { value: edges.length },
        uEdgeScale: ringEdgeScale,
        uCarves: { value: pad(carves.map(([a, b]) => new THREE.Vector2(au(a), au(b))), RING_MAX_CARVES, () => new THREE.Vector2()) },
        uCarveCount: { value: carves.length },
        uChannels: {
            value: strip.channels
                ? new THREE.Vector4(au(strip.channels.km), au(strip.channels.windowKm), 0, strip.channels.count)
                : new THREE.Vector4(),
        },
        uChannelSpacing: { value: (strip.channels?.spacingDeg ?? 1) * DEG_TO_RAD },
        uBandData: { value: strip.bands ? 1 : 0 },
        uCameraLocal: { value: new THREE.Vector3() },
    };
    material.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, uniforms);
        shader.vertexShader = 'varying vec3 vRingPos;\n' + shader.vertexShader.replace(
            '#include <begin_vertex>',
            '#include <begin_vertex>\n    vRingPos = position;'
        );
        shader.fragmentShader = ringShaderCode + shader.fragmentShader.replace('#include <map_fragment>', `
    float ringR = length(vRingPos.xy);
    float ringTheta = atan(vRingPos.y, vRingPos.x);
    float ringREff = ringR - edgeShift(ringR, ringTheta);
    #ifdef USE_MAP
        vec4 ringTexel = texture2D(map, vec2(ringU(ringREff), 0.5));
        if (uBandData > 0.5) {
            // Dust scatters forwards: faint lit from the front, glowing backlit
            vec3 toCamera = normalize(uCameraLocal - vRingPos);
            float boost = mix(1.0, dustPhase(dot(-uSunDir, toCamera)), ringTexel.r);
            diffuseColor.a *= min(1.0, ringTexel.a * boost);
        } else {
            diffuseColor *= ringTexel;
        }
    #endif
    float ringW = fwidth(ringR);
    for (int i = 0; i < ${RING_MAX_CARVES}; i++) {
        if (i >= uCarveCount) break;
        diffuseColor.a *= 1.0 - smoothstep(uCarves[i].x - ringW, uCarves[i].x + ringW, ringREff)
            * (1.0 - smoothstep(uCarves[i].y - ringW, uCarves[i].y + ringW, ringREff));
    }
    if (uChannels.w > 0.0) {
        float chNear = 1.0 - smoothstep(0.0, uChannels.y, abs(ringR - uChannels.x));
        float chBack = mod(uChannels.z - ringTheta, 2.0 * RING_PI) / uChannelSpacing;  // channels behind the newest
        float chK = floor(chBack + 0.5);
        if (chNear > 0.0 && chK < uChannels.w) {
            float chD = abs(chBack - chK) * uChannelSpacing / ${(CHANNEL_WIDTH_DEG * DEG_TO_RAD).toFixed(6)};
            float chAge = min(1.0, (chK + 1.0) / 2.0) * exp(-chK / 10.0);  // newest still opening, oldest fading
            diffuseColor.a *= 1.0 - ${CHANNEL_DEPTH.toFixed(2)} * chNear * chAge * exp(-chD * chD);
        }
    }
    float along = dot(vRingPos, uSunDir);
    float off = length(vRingPos - along * uSunDir);
    float shadow = along < 0.0 ? 1.0 - smoothstep(uPlanetRadius * 0.98, uPlanetRadius * 1.02, off) : 0.0;
    diffuseColor.rgb *= 1.0 - ${RING_SHADOW_DARKNESS.toFixed(2)} * shadow;`);
    };
    return uniforms;
}

// A flat ring in the plane whose normal is `pole`. stops: [[u, km], ...]
// from the inner to the outer edge: texture position u lies at radius km,
// linear in between. One ring of triangles per interval, so the stops sit
// exactly on vertices.
function makeRingMesh(stops, pole, material) {
    const parts = [];
    for (let i = 0; i + 1 < stops.length; i++) {
        const [u0, km0] = stops[i], [u1, km1] = stops[i + 1];
        const inner = km0 / KM_PER_AU, outer = km1 / KM_PER_AU;
        const part = new THREE.RingGeometry(inner, outer, 256);
        const pos = part.attributes.position;
        const uv = part.attributes.uv;
        for (let j = 0; j < pos.count; j++) {
            const t = (Math.hypot(pos.getX(j), pos.getY(j)) - inner) / (outer - inner);
            uv.setXY(j, u0 + t * (u1 - u0), 0.5);
        }
        parts.push(part);
    }
    const geometry = parts.length > 1 ? mergeGeometries(parts) : parts[0];
    if (parts.length > 1) parts.forEach(p => p.dispose());
    const mesh = new THREE.Mesh(geometry, material);
    // RingGeometry lies in XY (normal +Z); turn the normal to the pole
    const [raDeg, decDeg] = pole;
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), new THREE.Vector3(...raDecToXYZ(raDeg / 15, decDeg, 1)));
    return mesh;
}

// The facts the info card shows for a moons.json moon
function moonFacts(m) {
    return {
        id: `moon-${m.code}`,
        name: m.name,
        type: 'moon',
        parent: m.planet,
        diameter_km: m.radius_km ? m.radius_km * 2 : null,
        orbit_days: moonPeriodDays(m),
        orbit_radius_km: moonMeanOrbit(m).aKm,
        position: moonPositionSource(m),
    };
}

// facts: planets.json; moonsData: moons.json (optional); smallBodies:
// small_bodies.json (optional; its named bodies). Returns the
// layer's contents and controls:
//   bodies: [{id, name, type, facts, radiusAu, position (Vector3, AU),
//             parentId?, major?, surfaceMap? (SURFACE_MAPS entry),
//             smallBody? (small_bodies.json entry)}],
//           planets first, then major moons, minor moons, small bodies
//   byId:   Map id -> body
//   isShown(body): false for small bodies while they're switched off
//   update(date), setFade(f), setShowOrbits(on), setHighlightOrbit(id),
//   setShowSmallBodies(on), setCometOrbits(on) (every named comet's),
//   updateTextures(cameraAu, heightPx, fovDeg) (call each frame: lazy loading),
//   updateMinorMoonFade(cameraAu, heightPx, fovDeg), minorMoonFade(planetId),
//   setShowMinorMoons(on), setRingWaveScale(scale), updateRingView(cameraAu)
//   (each frame), setHaze(on),
//   setViewportHeight(px), dispose()
export function buildSolarSystem(scene, facts, moonsData, pixelRatio, smallBodies = null) {
    const factsById = new Map(facts.bodies.map(b => [b.id, b]));
    const disposables = [];
    const track = (obj) => { disposables.push(obj); return obj; };

    // Sunlight; a little ambient so night sides aren't pure black
    scene.add(new THREE.PointLight(0xffffff, Math.PI, 0, 0));
    scene.add(new THREE.AmbientLight(0xffffff, 0.06));

    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    // Textures load in the background; until then a body shows its colour.
    // They load lazily: a body's (and its rings') only once it is drawn
    // TEXTURE_LOAD_PX across (see updateTextures), so opening the view only
    // fetches what you can see.
    const loader = new THREE.TextureLoader();
    const textures = [];
    const pendingTextures = [];  // {position (Vector3, AU), extentAu, loads: [() => void]}
    let disposed = false;
    // colorSpace: sRGB for pictures; NoColorSpace for data (masks)
    const loadTexture = (file, onLoad, colorSpace = THREE.SRGBColorSpace) => {
        loader.load(textureUrl(file), (texture) => {
            if (disposed) { texture.dispose(); return; }
            texture.colorSpace = colorSpace;
            textures.push(texture);
            onLoad(texture);
        });
    };
    const applyTexture = (material, file, onLoad) => loadTexture(file, (texture) => {
        material.map = texture;
        material.color.set(0xffffff);
        material.needsUpdate = true;
        onLoad?.(texture);
    });

    // ---------- Earth: night lights, ocean glint, clouds, atmosphere ----------
    // Earth gets a Phong material, so sunlight glints off the oceans (masked
    // by the ocean map), and its shader adds city lights on the night side,
    // fading in across the terminator and dimmed under clouds. A cloud layer
    // sits just above the surface, turning with Earth and drifting east, and
    // a thin atmosphere rim glows blue on the day side. update() sets the
    // Sun's direction (uSunDir, world) and the clouds' drift.
    const earthUniforms = {
        uSunDir: { value: new THREE.Vector3(1, 0, 0) },
        uNightMap: { value: null },
        uCloudMap: { value: null },
        uCloudShift: { value: 0 },  // cloud drift, as a fraction of a turn
    };
    let earthClouds = null;
    const setupEarth = (material, mesh, anchor, radiusAu, loads) => {
        material.onBeforeCompile = (shader) => {
            Object.assign(shader.uniforms, earthUniforms);
            shader.vertexShader = 'varying vec3 vWorldNormal;\n' + shader.vertexShader.replace(
                '#include <beginnormal_vertex>',
                '#include <beginnormal_vertex>\n    vWorldNormal = normalize(mat3(modelMatrix) * objectNormal);'
            );
            shader.fragmentShader = `
                varying vec3 vWorldNormal;
                uniform vec3 uSunDir;
                uniform sampler2D uNightMap;
                uniform sampler2D uCloudMap;
                uniform float uCloudShift;
            ` + shader.fragmentShader.replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
                #ifdef USE_MAP
                    float sunHeight = dot(normalize(vWorldNormal), uSunDir);
                    float night = 1.0 - smoothstep(-0.12, 0.08, sunHeight);
                    float cloud = texture2D(uCloudMap, vec2(vMapUv.x - uCloudShift, vMapUv.y)).g;
                    totalEmissiveRadiance += texture2D(uNightMap, vMapUv).rgb * night
                        * (1.0 - ${EARTH_CLOUD_DIMMING.toFixed(2)} * cloud) * ${EARTH_NIGHT_LIGHTS.toFixed(2)};
                #endif`);
        };
        loads.push(
            () => loadTexture(EARTH_TEXTURES.night, (t) => { earthUniforms.uNightMap.value = t; }),
            () => loadTexture(EARTH_TEXTURES.ocean, (t) => {
                material.specularMap = t;
                material.specular.set(EARTH_GLINT);
                material.needsUpdate = true;
            }, THREE.NoColorSpace),
        );

        // Clouds: invisible until their map arrives (it's their alpha)
        const cloudMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff, transparent: true, opacity: 0, depthWrite: false,
        });
        earthClouds = track(new THREE.Mesh(new THREE.SphereGeometry(radiusAu * EARTH_CLOUD_SCALE, 64, 32), cloudMaterial));
        mesh.add(earthClouds);
        loads.push(() => loadTexture(EARTH_TEXTURES.clouds, (t) => {
            cloudMaterial.alphaMap = t;
            cloudMaterial.opacity = 0.95;
            cloudMaterial.needsUpdate = true;
            earthUniforms.uCloudMap.value = t;
        }, THREE.NoColorSpace));

        // Atmosphere: a slightly bigger shell, added on top, brightest
        // edge-on (where you look through the most air) and on the day side
        const atmosphere = track(new THREE.Mesh(
            new THREE.SphereGeometry(radiusAu * EARTH_ATMOSPHERE_SCALE, 64, 32),
            new THREE.ShaderMaterial({
                uniforms: { uSunDir: earthUniforms.uSunDir },
                vertexShader: `
                    varying vec3 vNormalView;
                    varying vec3 vViewPos;
                    void main() {
                        vec4 mv = modelViewMatrix * vec4(position, 1.0);
                        vViewPos = mv.xyz;
                        vNormalView = normalize(normalMatrix * normal);
                        gl_Position = projectionMatrix * mv;
                    }
                `,
                fragmentShader: `
                    uniform vec3 uSunDir;
                    varying vec3 vNormalView;
                    varying vec3 vViewPos;
                    void main() {
                        vec3 n = normalize(vNormalView);
                        float rim = pow(1.0 - max(dot(n, normalize(-vViewPos)), 0.0), 3.0);
                        vec3 sun = normalize((viewMatrix * vec4(uSunDir, 0.0)).xyz);
                        float lit = smoothstep(-0.25, 0.35, dot(n, sun));
                        gl_FragColor = vec4(vec3(0.35, 0.6, 1.0) * rim * lit * 1.2, 1.0);
                    }
                `,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            })
        ));
        anchor.add(atmosphere);
    };

    // ---------- Our Moon: relief, lunar lighting, earthshine ----------
    // A normal map from LRO's laser altimeter gives the relief (the colour
    // map is pure albedo, no shadows). Sunlight follows the Lunar-Lambert
    // law (McEwen 1991) instead of plain Lambert: the regolith reflects
    // light back towards the Sun, so the full Moon is evenly bright to the
    // limb rather than shaded like a ball, and the terminator stays sharp.
    // Earthshine lights the side facing Earth, scaled by how much of
    // Earth's day side faces the Moon. update() sets uEarthDir (world, Moon
    // to Earth) and uEarthshine.
    const moonUniforms = {
        uEarthDir: { value: new THREE.Vector3(1, 0, 0) },
        uEarthshine: { value: 0 },
    };
    const setupMoon = (material, surfaceMap, loads) => {
        material.onBeforeCompile = (shader) => {
            Object.assign(shader.uniforms, moonUniforms);
            shader.fragmentShader = shader.fragmentShader.replace('#include <lights_lambert_pars_fragment>', `
                #include <lights_lambert_pars_fragment>
                uniform vec3 uEarthDir;
                uniform float uEarthshine;
                // Lunar-Lambert: f = 2 L mu0 / (mu0 + mu) + (1 - L) mu0, with
                // L(phase angle) from McEwen's fit (degrees)
                void RE_Direct_Lunar(const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight) {
                    float mu0 = dot(geometryNormal, directLight.direction);
                    if (mu0 <= 0.0) return;
                    float mu = max(dot(geometryNormal, geometryViewDir), 0.0);
                    float a = degrees(acos(clamp(dot(directLight.direction, geometryViewDir), -1.0, 1.0)));
                    float L = clamp(1.0 + a * (-0.019 + a * (2.42e-4 - a * 1.46e-6)), 0.0, 1.0);
                    float f = 2.0 * L * mu0 / (mu0 + mu) + (1.0 - L) * mu0;
                    reflectedLight.directDiffuse += f * directLight.color * BRDF_Lambert(material.diffuseColor);
                }
                #undef RE_Direct
                #define RE_Direct RE_Direct_Lunar
            `).replace('#include <lights_fragment_end>', `#include <lights_fragment_end>
                vec3 earthView = normalize((viewMatrix * vec4(uEarthDir, 0.0)).xyz);
                reflectedLight.indirectDiffuse += uEarthshine * saturate(dot(normal, earthView)) * material.diffuseColor;
            `);
        };
        loads.push(() => loadTexture(surfaceMap.normal, (t) => {
            material.normalMap = t;
            material.normalScale.set(MOON_RELIEF, MOON_RELIEF);
            material.needsUpdate = true;
        }, THREE.NoColorSpace));
    };

    // Ring strips' shader uniforms, kept up to date by update(): the Sun's
    // direction, and the angles of the moons that move their edges
    const ringShading = [];  // {uniforms, strip, planetId, position (the planet's, AU), inverse (mesh rotation, inverted)}

    // One strip of a ring system: a loaded texture (shown as a translucent
    // flat colour until it arrives; its load is added to `loads`) or one
    // drawn from its bands. Shaded with the planet's shadow.
    const makeRingStrip = (strip, pole, bodyColor, loads, planetId, planetRadiusAu, planetPosition) => {
        const material = new THREE.MeshBasicMaterial({
            color: strip.color ?? bodyColor, transparent: true, side: THREE.DoubleSide, depthWrite: false,
        });
        const uniforms = addRingShading(material, planetRadiusAu, strip);
        if (strip.texture) {
            material.opacity = 0.55;
            loads.push(() => applyTexture(material, strip.texture, (texture) => {
                texture.anisotropy = RING_ANISOTROPY;
                material.opacity = 1;
            }));
        } else {
            material.map = makeBandTexture(strip.bands, strip.km);
            textures.push(material.map);
        }
        const stops = strip.stops ?? [[0, strip.km[0]], [1, strip.km[1]]];
        const mesh = track(makeRingMesh(stops, pole, material));
        ringShading.push({ uniforms, strip, planetId, position: planetPosition, inverse: mesh.quaternion.clone().invert() });
        return mesh;
    };

    const makeBody = ({ id, name, type, facts: f, radiusAu, color, isSun = false, parentId = null, major = true }) => {
        const isEarth = id === 'Earth';
        const material = isSun ? new THREE.MeshBasicMaterial({ color })
            // No glint until the ocean map arrives (it would shine off land too)
            : isEarth ? new THREE.MeshPhongMaterial({ color, specular: 0x000000, shininess: EARTH_SHININESS })
            : new THREE.MeshLambertMaterial({ color });
        const surfaceMap = SURFACE_MAPS[name] ?? null;
        const loads = surfaceMap ? [() => applyTexture(material, surfaceMap.file)] : [];
        const anchor = new THREE.Group();
        scene.add(anchor);
        const mesh = track(new THREE.Mesh(new THREE.SphereGeometry(radiusAu, 64, 32), material));
        anchor.add(mesh);
        const dot = isSun ? null : track(makeDot(color, radiusAu, pixelRatio, parentId !== null));
        if (dot) anchor.add(dot);
        if (isEarth) setupEarth(material, mesh, anchor, radiusAu, loads);
        if (id === 'Moon') setupMoon(material, surfaceMap, loads);
        const rings = RING_SYSTEMS[id];
        let extentAu = radiusAu;
        for (const strip of rings?.strips ?? []) {
            anchor.add(makeRingStrip(strip, rings.pole, color, loads, id, radiusAu, anchor.position));
            if (strip.texture) extentAu = Math.max(extentAu, strip.stops.at(-1)[1] / KM_PER_AU);
        }
        if (loads.length) pendingTextures.push({ position: anchor.position, extentAu, loads });
        return { id, name, type, facts: f, radiusAu, color, mesh, dot, position: anchor.position, parentId, major, surfaceMap };
    };

    // Sun, planets, Pluto, our Moon
    const ids = ['Sun', ...SOLAR_SYSTEM_BODIES, 'Moon'];
    const bodies = ids.filter(id => factsById.has(id)).map(id => {
        const f = factsById.get(id);
        return makeBody({
            id, name: f.name, type: f.type, facts: f,
            radiusAu: f.diameter_km / 2 / KM_PER_AU,
            color: new THREE.Color(f.color).getHex(),
            isSun: id === 'Sun',
            parentId: f.parent ?? null,
        });
    });
    const planetIds = new Set(bodies.map(b => b.id));
    const spinning = [...bodies];  // the ones bodyAxes knows

    // Moons of the other planets
    const moons = (moonsData?.moons ?? []).filter(m => planetIds.has(m.planet));
    for (const m of moons.filter(m => m.major)) {
        const body = makeBody({
            id: `moon-${m.code}`, name: m.name, type: 'moon', facts: moonFacts(m),
            radiusAu: (m.radius_km ?? UNKNOWN_MOON_RADIUS_KM) / KM_PER_AU,
            color: new THREE.Color(MOON_COLORS[m.name] ?? DEFAULT_MOON_COLOR).getHex(),
            parentId: m.planet,
        });
        body.moon = m;
        bodies.push(body);
    }
    // Minor moons: one dot cloud per planet; bodies without a mesh
    const clouds = new Map();  // planet -> {cloud, moons: [body]}
    for (const m of moons.filter(m => !m.major)) {
        const body = {
            id: `moon-${m.code}`, name: m.name, type: 'moon', facts: moonFacts(m),
            radiusAu: (m.radius_km ?? UNKNOWN_MOON_RADIUS_KM) / KM_PER_AU,
            color: new THREE.Color(DEFAULT_MOON_COLOR).getHex(),
            mesh: null, dot: null, position: new THREE.Vector3(), parentId: m.planet, major: false, moon: m,
        };
        bodies.push(body);
        if (!clouds.has(m.planet)) clouds.set(m.planet, { moons: [] });
        clouds.get(m.planet).moons.push(body);
    }
    for (const entry of clouds.values()) {
        entry.cloud = track(makeMinorMoonCloud(entry.moons.length, pixelRatio));
        scene.add(entry.cloud);
        // Typical orbit size (median), for the zoom fade
        const radii = entry.moons.map(b => moonMeanOrbit(b.moon).aKm / KM_PER_AU).sort((x, y) => x - y);
        entry.spreadAu = radii[Math.floor(radii.length / 2)];
        entry.fade = 0;
    }
    // Named asteroids, dwarf planets and comets
    const smallBodyList = [];
    for (const sb of smallBodies?.named ?? []) {
        const isComet = sb.type === 'comet' || (sb.type === 'interstellar' && sb.diameter_km === null);
        const body = makeBody({
            id: sb.id, name: sb.name, type: sb.type, facts: { id: sb.id, name: sb.name, type: sb.type },
            radiusAu: (sb.diameter_km ? sb.diameter_km / 2 : UNKNOWN_NUCLEUS_RADIUS_KM) / KM_PER_AU,
            color: new THREE.Color(isComet ? COMET_COLOR : ICY_TYPES.has(sb.type) ? ICY_COLOR : ASTEROID_COLOR).getHex(),
        });
        body.smallBody = sb;
        body.isComet = isComet;
        bodies.push(body);
        smallBodyList.push(body);
    }
    let showSmallBodies = true;
    // Region parts switched off ('group:part', see setHiddenParts): their
    // named bodies hide too. One-time visitors (no region) count as
    // 'comet:once'.
    let hiddenParts = new Set();
    const partKey = (body) => (body.smallBody.group ? `${body.smallBody.group}:${body.smallBody.subgroup}` : 'comet:once');
    function isShown(body) {
        return !body.smallBody || (showSmallBodies && !hiddenParts.has(partKey(body)));
    }
    function applySmallBodyVisibility() {
        for (const body of smallBodyList) body.mesh.parent.visible = isShown(body);
        // (lines not sampled yet stay hidden until they are)
        for (const orbit of orbits) if (orbit.body) orbit.line.visible = orbit.sampledAt !== null && isShown(orbit.body);
    }
    const spinningSmall = smallBodyList.filter(b => b.smallBody.spin);
    const byId = new Map(bodies.map(b => [b.id, b]));
    const moonBodies = bodies.filter(b => b.parentId && b.id !== 'Moon');
    const lockedMoons = moonBodies.filter(b => b.mesh && !UNLOCKED_MOONS.has(b.name));

    // ---------- Orbit lines ----------
    // Each orbit is sampled densely around its body's current place (see
    // sampleOrbit in planets.js). As time runs the body moves on, so a line
    // is resampled once its body has gone ORBIT_RESAMPLE_FRACTION of the way
    // round; the most out-of-date first, within ORBIT_BUDGET_MS a frame, so
    // fast time stays smooth (lines just lag a little). Moon orbits sit in a
    // group per planet, kept at the planet.
    // Between resamples the body runs along the true curve, which strays
    // from the straight segments (Pluto: ~8,000 km, seven of its radii), so
    // each frame the body's own position is put into the line between the
    // two samples around it (bodyAt): the line always passes through it.
    const orbits = [];  // {line, sample(date), periodDays, sampledAt (ms) | null, ...}
    const moonOrbitGroups = new Map();  // planet id -> Group
    const moonOrbitGroup = (planetId) => {
        if (!moonOrbitGroups.has(planetId)) {
            const group = new THREE.Group();
            orbitGroup.add(group);
            moonOrbitGroups.set(planetId, group);
        }
        return moonOrbitGroups.get(planetId);
    };
    // Small bodies' orbits, hidden with them (setShowSmallBodies)
    const smallOrbitGroup = new THREE.Group();
    orbitGroup.add(smallOrbitGroup);
    // everyFrame: resampled whenever the time changes (small bodies: cheap
    // to sample, and their body must sit exactly on its line up close).
    // bodyAt() -> Vector3: the body in the line's frame (sampleOrbit lines,
    // see placeBody), so the line can be drawn through it
    // body: a small body whose orbit this is (hidden with it, see isShown)
    const addOrbit = ({ sample, periodDays, color, opacity, parent = orbitGroup, segments, closed = true, everyFrame = false, bodyAt = null, body = null }) => {
        const vertices = bodyAt ? segments + 1 : segments;
        const line = makeOrbitLine(new Float32Array(vertices * 3), color, opacity, closed);
        line.frustumCulled = false;  // samples move round the orbit
        line.visible = false;        // until first sampled
        parent.add(line);
        const orbit = { line, sample, periodDays, segments, everyFrame, bodyAt, body, sampledAt: null, loop: null, origin: null };
        orbits.push(orbit);
        return orbit;
    };
    // The line's points go to the GPU as 32-bit floats, precise to ~1 km at
    // 0.1 AU: too coarse up close to a distant moon. So they are stored
    // relative to where the body was when sampled (the middle point), and
    // the line is placed there in JS doubles: near the body the numbers stay
    // small and precise.
    const resample = (orbit, date) => {
        const loop = orbit.sample(date);  // doubles
        const mid = loop.length / 6 | 0;  // the point at `date`
        orbit.loop = loop;
        orbit.origin = [loop[mid * 3], loop[mid * 3 + 1], loop[mid * 3 + 2]];
        orbit.line.position.set(...orbit.origin);
        orbit.line.visible = !orbit.body || isShown(orbit.body);
        orbit.sampledAt = date.getTime();
        if (orbit.bodyAt) {
            placeBody(orbit, date);
            return;
        }
        const [ax, ay, az] = orbit.origin;
        const array = orbit.line.geometry.attributes.position.array;
        for (let i = 0; i < loop.length; i += 3) {
            array[i] = loop[i] - ax;
            array[i + 1] = loop[i + 1] - ay;
            array[i + 2] = loop[i + 2] - az;
        }
        orbit.line.geometry.attributes.position.needsUpdate = true;
    };
    // Write the line with the body put in after the last sample before it.
    // sampleOrbit's point i is at sampledAt + sign(u) |u|^3 period/2, with
    // u = -1 + 2i/segments, so that sample is found by inverting this.
    const placeBody = (orbit, date) => {
        const { loop, segments, origin: [ax, ay, az] } = orbit;
        const halfPeriod = orbit.periodDays * 86400000 / 2;
        const u = Math.cbrt((date.getTime() - orbit.sampledAt) / halfPeriod);
        const before = THREE.MathUtils.clamp(Math.floor((u + 1) * segments / 2), 0, segments - 1);
        const body = orbit.bodyAt();
        const array = orbit.line.geometry.attributes.position.array;
        let out = 0;
        for (let i = 0; i < segments; i++) {
            array[out++] = loop[i * 3] - ax;
            array[out++] = loop[i * 3 + 1] - ay;
            array[out++] = loop[i * 3 + 2] - az;
            if (i === before) {
                array[out++] = body.x - ax;
                array[out++] = body.y - ay;
                array[out++] = body.z - az;
            }
        }
        orbit.line.geometry.attributes.position.needsUpdate = true;
    };
    const relative = new THREE.Vector3();
    const fromParent = (body) => () => relative.subVectors(body.position, byId.get(body.parentId).position);
    const moonOrbit = (body, opacity) => addOrbit({
        sample: (d) => moonOrbitLoop(body.moon, d),
        periodDays: moonPeriodDays(body.moon), color: body.color, opacity,
        parent: moonOrbitGroup(body.parentId), segments: 256, bodyAt: fromParent(body),
    });

    for (const id of SOLAR_SYSTEM_BODIES) {
        const body = byId.get(id);
        if (body) {
            addOrbit({
                sample: (d) => orbitPath(id, d), periodDays: orbitPeriodDays(id), color: body.color, segments: 512,
                bodyAt: () => body.position,
            });
        }
    }
    if (byId.has('Moon')) {
        addOrbit({
            sample: (d) => moonOrbitPath(d), periodDays: orbitPeriodDays('Moon'),
            color: byId.get('Moon').color, parent: moonOrbitGroup('Earth'), segments: 512,
            bodyAt: fromParent(byId.get('Moon')),
        });
    }
    for (const body of moonBodies.filter(b => b.major)) moonOrbit(body);

    // An open line of 513 points, closed or not by its points (see smallBodyOrbit)
    const smallBodyOrbitLine = (body, opacity) => addOrbit({
        sample: (d) => smallBodyOrbit(body.smallBody, d, 512),
        periodDays: smallBodyPeriodDays(body.smallBody), color: body.color, opacity,
        parent: smallOrbitGroup, segments: 513, closed: false, everyFrame: true, body,
    });
    for (const body of smallBodyList.filter(b => b.type === 'dwarf planet')) smallBodyOrbitLine(body);

    let lastDate = null;
    const resampleStaleOrbits = (date) => {
        const now = date.getTime();
        // Every-frame lines (a few, microseconds each) outside the budget
        for (const o of orbits) {
            if (o.everyFrame && o.sampledAt !== now) resample(o, date);
        }
        const stale = orbits
            .filter(o => !o.everyFrame)
            .map(o => ({
                o,
                age: o.sampledAt === null ? Infinity
                    : Math.abs(now - o.sampledAt) / (o.periodDays * 86400000 * ORBIT_RESAMPLE_FRACTION),
            }))
            .filter(s => s.age >= 1)
            .sort((a, b) => b.age - a.age);
        const start = performance.now();
        const resampled = new Set();
        for (const { o } of stale) {
            resample(o, date);
            resampled.add(o);
            // First build: everything at once; afterwards a few ms a frame
            if (lastDate !== null && performance.now() - start > ORBIT_BUDGET_MS) break;
        }
        // The rest keep their samples; put their bodies' new places in
        for (const o of orbits) {
            if (o.bodyAt && o.loop && !resampled.has(o) && o.sampledAt !== now) placeBody(o, date);
        }
    };

    // Every named comet's orbit at once (the "Comets" region in search)
    let cometOrbits = [];
    const setCometOrbits = (on) => {
        if (on === cometOrbits.length > 0) return;
        if (on) {
            cometOrbits = smallBodyList.filter(b => b.isComet).map(b => {
                const orbit = smallBodyOrbitLine(b, 0.5);
                if (lastDate) resample(orbit, lastDate);
                return orbit;
            });
        } else {
            for (const orbit of cometOrbits) {
                orbits.splice(orbits.indexOf(orbit), 1);
                disposeLine(orbit.line);
            }
            cometOrbits = [];
        }
        applyOrbitOpacity();
    };

    // A selected minor moon gets its orbit drawn (major ones always have
    // one), as does a selected small body other than a dwarf planet
    let highlightId = null;
    let highlight = null;
    // It also gets its own sphere and dot, placed in JS doubles like the
    // major moons: in the shared cloud its position is a 32-bit float
    // relative to the planet, which jitters by ~1 km up close.
    let highlightVisual = null;  // {body, mesh, dot}
    const setHighlight = (id) => {
        if (highlight) {
            orbits.splice(orbits.indexOf(highlight), 1);
            disposeLine(highlight.line);
            highlight = null;
        }
        if (highlightVisual) {
            const { mesh, dot } = highlightVisual;
            scene.remove(mesh);
            dotMaterials.splice(dotMaterials.indexOf(dot.material), 1);
            [mesh, dot].forEach(obj => { obj.geometry.dispose(); obj.material.dispose(); });
            highlightVisual = null;
        }
        highlightId = id;
        const body = id && byId.get(id);
        if (body?.smallBody && body.type !== 'dwarf planet') {
            highlight = smallBodyOrbitLine(body, 0.6);
            if (lastDate) resample(highlight, lastDate);
            applyOrbitOpacity();
        }
        if (body && body.moon && !body.major) {
            highlight = moonOrbit(body, 0.6);
            if (lastDate) resample(highlight, lastDate);
            applyOrbitOpacity();

            const mesh = new THREE.Mesh(
                new THREE.SphereGeometry(body.radiusAu, 24, 12),
                new THREE.MeshLambertMaterial({ color: body.color }),
            );
            const dot = makeDot(body.color, body.radiusAu, pixelRatio, true);
            const u = dot.material.uniforms;
            u.uFade.value = fade;
            u.uLinear.value = hazeOn ? 1 : 0;
            u.uViewportHeight.value = viewportPx;
            mesh.add(dot);
            scene.add(mesh);
            dotMaterials.push(dot.material);
            highlightVisual = { body, mesh, dot };
            placeHighlightVisual();
        }
    };
    function placeHighlightVisual() {
        if (!highlightVisual) return;
        const { body, mesh, dot } = highlightVisual;
        mesh.position.copy(body.position);
        dot.material.uniforms.uParentOffset.value.subVectors(byId.get(body.parentId).position, body.position);
    }

    const parentOffset = new THREE.Vector3();
    // Sphere axes: x to the prime meridian, y to the north pole (three.js
    // spheres put the texture's middle on +x and its top on +y)
    const basis = new THREE.Matrix4();
    const xAxis = new THREE.Vector3(), yAxis = new THREE.Vector3(), zAxis = new THREE.Vector3();
    const fromPlanet = new THREE.Vector3(), step = new THREE.Vector3();

    // Ring shader inputs (see addRingShading), in each ring mesh's own
    // frame: the Sun's direction, the angles of the moons that move ring
    // edges (off while an edge's `active` says so), and where Prometheus'
    // newest F ring channel is
    const moonsByName = new Map(bodies.filter(b => b.moon).map(b => [`${b.parentId}/${b.name}`, b]));
    const ringLocal = new THREE.Vector3();
    const ringAngle = (r, v) => {
        ringLocal.copy(v).applyQuaternion(r.inverse);
        return Math.atan2(ringLocal.y, ringLocal.x);
    };
    const updateRingShading = (date) => {
        for (const r of ringShading) {
            const u = r.uniforms;
            u.uSunDir.value.copy(r.position).negate().normalize().applyQuaternion(r.inverse);
            (r.strip.edges ?? []).forEach((e, i) => {
                const moon = moonsByName.get(`${r.planetId}/${e.moon}`);
                const on = moon && (!e.active || e.active(date));
                u.uEdgeA.value[i].z = on ? e.amplitudeKm / KM_PER_AU : 0;
                if (moon) u.uEdgeB.value[i].w = ringAngle(r, fromPlanet.subVectors(moon.position, r.position));
            });
            const ch = r.strip.channels;
            const moon = ch && moonsByName.get(`${r.planetId}/${ch.moon}`);
            if (moon) {
                // A channel forms as Prometheus passes apoapse (closest to the
                // F ring), then rides along with the F ring, which falls
                // spacingDeg behind the moon each of its orbits
                const m = moon.moon;
                const sinceApoDays = (((moonMeanAnomaly(m, date) - 180) % 360) + 360) % 360 / m.n;
                const atApo = moonPosition(m, new Date(date.getTime() - sinceApoDays * 86400000));
                const ringRate = m.n * (1 - ch.spacingDeg / 360);  // F ring, deg/day
                u.uChannels.value.z = ringAngle(r, ringLocal.set(atApo[0], atApo[1], atApo[2]))
                    + ringRate * sinceApoDays * DEG_TO_RAD;
            } else if (ch) {
                u.uChannels.value.w = 0;
            }
        }
    };

    const update = (date) => {
        for (const body of bodies) {
            if (body.id === 'Sun' || body.moon || body.smallBody) continue;
            body.position.set(...heliocentricPosition(body.id, date));
        }
        for (const body of smallBodyList) body.position.set(...smallBodyPosition(body.smallBody, date));
        if (byId.has('Earth')) earthUniforms.uSunDir.value.copy(byId.get('Earth').position).negate().normalize();
        if (earthClouds) {
            // Drift east about Earth's axis (the sphere's y); the night-light
            // dimming shifts its cloud lookup to match
            const turns = date.getTime() / 86400000 * EARTH_CLOUD_DRIFT_DEG_PER_DAY / 360;
            const fraction = turns - Math.floor(turns);
            earthClouds.rotation.y = fraction * 2 * Math.PI;
            earthUniforms.uCloudShift.value = fraction;
        }
        // Small bodies with a map turn on their own model (spinAxes)
        for (const body of [...spinning, ...spinningSmall]) {
            const { pole, meridian } = body.smallBody ? spinAxes(body.smallBody.spin, date) : bodyAxes(body.id, date);
            xAxis.set(...meridian);
            yAxis.set(...pole);
            zAxis.crossVectors(xAxis, yAxis);
            body.mesh.quaternion.setFromRotationMatrix(basis.makeBasis(xAxis, yAxis, zAxis));
        }
        for (const body of moonBodies) {
            const parent = byId.get(body.parentId).position;
            const rel = moonPosition(body.moon, date);
            body.position.set(rel[0], rel[1], rel[2]).add(parent);
            if (body.dot) body.dot.material.uniforms.uParentOffset.value.set(-rel[0], -rel[1], -rel[2]);
        }
        // Locked moons: x (longitude 0) to the planet; y (north) along the
        // orbit's pole. IAU poles of planets' moons lie on the ecliptic-north
        // side (so the Uranus moons and Triton spin backwards about it);
        // a dwarf planet's moons, like Charon, keep the right-hand pole
        const later = new Date(date.getTime() + LOCK_STEP_MS);
        for (const body of lockedMoons) {
            fromPlanet.subVectors(body.position, byId.get(body.parentId).position);
            const next = moonPosition(body.moon, later);
            step.set(next[0], next[1], next[2]).sub(fromPlanet);
            yAxis.crossVectors(fromPlanet, step).normalize();
            if (body.parentId !== 'Pluto' && yAxis.dot(ECLIPTIC_NORTH) < 0) yAxis.negate();
            xAxis.copy(fromPlanet).negate().normalize();
            zAxis.crossVectors(xAxis, yAxis);
            body.mesh.quaternion.setFromRotationMatrix(basis.makeBasis(xAxis, yAxis, zAxis));
        }
        updateRingShading(date);
        // Our Moon's dot fades by its separation from Earth too
        if (byId.has('Moon') && byId.has('Earth')) {
            const earth = byId.get('Earth').position;
            parentOffset.subVectors(earth, byId.get('Moon').position);
            byId.get('Moon').dot.material.uniforms.uParentOffset.value.copy(parentOffset);
            // Earthshine: Earth's phase angle seen from the Moon (Sun-Earth-
            // Moon), through a Lambert sphere's phase law
            moonUniforms.uEarthDir.value.copy(parentOffset).normalize();
            const phaseAngle = step.copy(earth).negate().angleTo(fromPlanet.copy(parentOffset).negate());
            moonUniforms.uEarthshine.value = MOON_EARTHSHINE
                * (Math.sin(phaseAngle) + (Math.PI - phaseAngle) * Math.cos(phaseAngle)) / Math.PI;
        }
        for (const [planetId, { cloud, moons: list }] of clouds) {
            const parent = byId.get(planetId).position;
            cloud.position.copy(parent);
            const array = cloud.geometry.attributes.position.array;
            list.forEach((body, i) => {
                // The selected one has its own dot (highlightVisual); its cloud
                // point goes to the planet's centre, where cloud dots don't show
                const own = body.id === highlightId;
                array[i * 3] = own ? 0 : body.position.x - parent.x;
                array[i * 3 + 1] = own ? 0 : body.position.y - parent.y;
                array[i * 3 + 2] = own ? 0 : body.position.z - parent.z;
            });
            cloud.geometry.attributes.position.needsUpdate = true;
        }
        placeHighlightVisual();
        resampleStaleOrbits(date);
        if (lastDate === null) applyOrbitOpacity();
        lastDate = date;
        for (const [planetId, group] of moonOrbitGroups) group.position.copy(byId.get(planetId).position);
    };

    const dotMaterials = [
        ...bodies.filter(b => b.dot).map(b => b.dot.material),
        ...[...clouds.values()].map(c => c.cloud.material),
    ];
    let showOrbits = true;
    let showMinorMoons = true;
    let fade = 1;
    let hazeOn = false;
    let viewportPx = 1;
    function applyOrbitOpacity() {
        orbitGroup.visible = showOrbits && fade > 0;
        orbits.forEach(({ line }) => { line.material.opacity = line.userData.baseOpacity * fade; });
    }

    return {
        bodies,
        byId,
        isShown,
        // The region part a named small body belongs to ('group:part')
        partKey: (body) => (body.smallBody ? partKey(body) : null),
        setHiddenParts: (parts) => {
            hiddenParts = new Set(parts);
            applySmallBodyVisibility();
        },
        setCometOrbits,
        update,
        setShowSmallBodies: (on) => {
            showSmallBodies = on;
            smallOrbitGroup.visible = on;
            applySmallBodyVisibility();
        },
        // 1 near the Sun, 0 far out (log scale), from camera distance in AU
        fadeForDistance: (au) => 1 - THREE.MathUtils.smoothstep(
            Math.log10(Math.max(au, 1e-9)), Math.log10(FADE_START_AU), Math.log10(FADE_END_AU)
        ),
        setFade: (f) => {
            if (f === fade) return;
            fade = f;
            dotMaterials.forEach(m => { m.uniforms.uFade.value = f; });
            applyOrbitOpacity();
        },
        setShowOrbits: (on) => {
            showOrbits = on;
            applyOrbitOpacity();
        },
        // Fade each small-moon cloud by how big it is drawn. cameraAu: camera
        // position (AU); heightPx: viewport height (CSS px); fovDeg: vertical FOV.
        // Start loading the textures of bodies now drawn TEXTURE_LOAD_PX
        // across (radius, rings included). Same arguments as below.
        updateTextures: (cameraAu, heightPx, fovDeg) => {
            if (!pendingTextures.length) return;
            const pxPerRadian = heightPx / 2 / Math.tan(fovDeg * DEG_TO_RAD / 2);
            for (let i = pendingTextures.length - 1; i >= 0; i--) {
                const p = pendingTextures[i];
                if (p.extentAu / Math.max(cameraAu.distanceTo(p.position), 1e-12) * pxPerRadian < TEXTURE_LOAD_PX) continue;
                p.loads.forEach(load => load());
                pendingTextures.splice(i, 1);
            }
        },
        updateMinorMoonFade: (cameraAu, heightPx, fovDeg) => {
            const pxPerRadian = heightPx / 2 / Math.tan(fovDeg * DEG_TO_RAD / 2);
            for (const [planetId, entry] of clouds) {
                const distance = cameraAu.distanceTo(byId.get(planetId).position);
                const px = entry.spreadAu / Math.max(distance, 1e-12) * pxPerRadian;
                entry.fade = showMinorMoons
                    ? THREE.MathUtils.smoothstep(px, MINOR_CLOUD_FADE_PX[0], MINOR_CLOUD_FADE_PX[1])
                    : 0;
                entry.cloud.material.uniforms.uCloudFade.value = entry.fade;
                entry.cloud.visible = entry.fade > 0;
            }
        },
        // How visible a planet's small-moon cloud is (0..1), for picking
        minorMoonFade: (planetId) => clouds.get(planetId)?.fade ?? 0,
        setShowMinorMoons: (on) => { showMinorMoons = on; },
        // Exaggerate the moon-driven ring edges (1 = true size)
        setRingWaveScale: (scale) => { ringEdgeScale.value = scale; },
        // The camera (AU, this layer) in each ring's frame, for how its
        // dust scatters light. Call each frame.
        updateRingView: (cameraAu) => {
            for (const r of ringShading) {
                r.uniforms.uCameraLocal.value.subVectors(cameraAu, r.position).applyQuaternion(r.inverse);
            }
        },
        // Draw the orbit of a selected minor moon (major ones always have one)
        setHighlightOrbit: (id) => {
            if (id !== highlightId) setHighlight(id);
        },
        setHaze: (on) => {
            hazeOn = on;
            dotMaterials.forEach(m => { m.uniforms.uLinear.value = on ? 1 : 0; });
        },
        setViewportHeight: (px) => {
            viewportPx = px;
            dotMaterials.forEach(m => { m.uniforms.uViewportHeight.value = px; });
        },
        dispose: () => {
            disposed = true;
            textures.forEach(t => t.dispose());
            setHighlight(null);
            orbits.forEach(({ line }) => disposeLine(line));
            disposables.forEach(obj => {
                obj.geometry.dispose();
                obj.material.dispose();
            });
        },
    };
}
