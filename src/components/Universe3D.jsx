import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { addLayerPasses, createLayer, renderLayers, syncLayerCamera, syncLayerPasses } from '../utils/layers3d';
import { createStarDisc, radiusToLy } from '../utils/starDisc';
import { buildSolarSystem, ECLIPTIC_NORTH, minViewRadii } from '../utils/solarSystem3d';
import { buildSmallBodyCloud, COMET_FAMILIES, SMALL_BODY_GROUP_COLORS } from '../utils/smallBodies3d';
import { buildOortCloud, OORT_LABEL_POSITION } from '../utils/oortCloud';
import { ARM_LABELS, GALAXY_SEARCH, buildGalaxy, galaxyPose } from '../utils/galaxy3d';
import {
    AU_PER_LY,
    KM_PER_AU,
    LY_PER_PARSEC,
    SMALL_BODY_REGIONS,
    SMALL_BODY_TYPE_LABELS,
    buildGaiaBuffers,
    buildLineStarInfo,
    buildSearchIndex,
    buildStarBuffers,
    bvToColor,
    constellationFocus,
    constellationLinePositions,
    formatBayer,
    normalizeSearchText,
    scaleBarDistance,
    starRecord,
} from '../utils/universe3d';
import { RING_FEATURES, RING_FEATURES_BY_ID, ringLabelKm, ringPole, ringScaleKm, ringSubtitle } from '../utils/rings';
import GalaxyInfoCard, { GALAXY_KEY } from './GalaxyInfoCard';
import PlanetInfoCard from './PlanetInfoCard';
import RegionInfoCard from './RegionInfoCard';
import RingInfoCard from './RingInfoCard';
import SmallBodyInfoCard from './SmallBodyInfoCard';
import StarInfoCard from './StarInfoCard';
import Universe3DSearch from './Universe3DSearch';
import Universe3DTimeBar, { nextPresetRate, TIME_RANGE } from './Universe3DTimeBar';
import './Universe3D.css';

const SUN_ABS_MAG = 4.83;
const SUN_BV = 0.65;

// Stars fainter than this (seen from the camera) can't be picked or labelled
const PICK_MAG_LIMIT = 7.0;
// Opacity of stars too faint to see (see the star shader's uMinAlpha)
const STAR_MIN_ALPHA = 0.12;
// Named stars brighter than this get a label; the selected constellation's
// named stars are always labelled
const LABEL_MAG_LIMIT = 2.5;
const FLIGHT_SECONDS = 1.6;
// OrbitControls zoom: each wheel notch scales the distance by 0.95^ZOOM_SPEED
// (~23% at 5). Earth close-up to Orion is ~11 orders of magnitude, so the
// default of 1 (5% a notch) took hundreds of notches.
const ZOOM_SPEED = 5;

// Closest the camera may get to an orbit target that is a star or a
// constellation (ly). Planets use a multiple of their radius instead.
const ORBIT_MIN_DISTANCE = 0.01;
// Stars (radius curated or estimated): "Fly to star" stops this many radii
// from the centre (the disc ~20 deg across), and you may zoom in to this many
const STAR_VIEW_RADII = 6;
const STAR_MIN_RADII = 1.2;
const EARTH_RADIUS_LY = 6378 / KM_PER_AU / AU_PER_LY;
// Planet labels and picking only while the solar system is at least this visible
const BODY_MIN_FADE = 0.3;
// Moons are only picked once drawn this far (px) from their planet's edge
// (their dots fade in from about there; see solarSystem3d)
const MOON_PICK_SEPARATION_PX = 10;
// Earth's marker ring (18 px across) counts as a click target
const EARTH_RING_PICK_PX = 12;
// Solar-system near plane: this fraction of the distance to the nearest
// body's surface (see solarNearPlane)
const SOLAR_NEAR_FRACTION = 0.3;
const FOV = 60;
// Ring and gap labels show once the feature (its ringScaleKm) is drawn
// this many px across: gaps sooner, as they're narrow
const RING_LABEL_PX = 18;
const RING_GAP_LABEL_PX = 6;
// Ring labels keep this far (px) inside the screen edges
const RING_LABEL_MARGIN_PX = 24;
// Points tried around a ring for its label when its right-hand end is off screen
const RING_LABEL_SAMPLES = 48;
// Viewing a ring feature: this many times its size away, at least the minimum
const RING_VIEW_SCALE = 5;
const RING_VIEW_MIN_KM = 2000;
// Overview of an asteroid / comet region (search): camera this far from the
// Sun (AU), above the ecliptic on Earth's side
const REGION_VIEW_AU = {
    main: 9, hilda: 12, trojan: 16, neo: 4, centaur: 70, tno: 140, comet: 14, other: 10, oort: 400000,
};

// Points shader: each star stores its absolute magnitude, and the apparent
// magnitude is recomputed from the camera distance every frame. From Earth
// this reproduces the real sky; flying closer makes a star brighter.
// Stars brighter than mag ~2 get a larger sprite with a wide halo (vGlow).
// With haze on, colours are blended in linear light and run through bloom
// + sRGB output, so the faint halos of thousands of stars add up to a glow.
// uMaxSize caps the sprite; the Sun gets a bigger cap so it still gets
// brighter from Neptune to Mercury. The 1e-9 pc clamp (~0.0002 AU) only
// guards log(0); the camera never gets that close to a star centre.
// uMinAlpha keeps stars too faint for the eye as dim dots, so the shape of
// the catalogue (the Gaia 100 pc sphere) shows from outside.
// Positions are made camera-relative on the GPU from the camera split into
// a float32 part and the remainder (uCamHigh + uCamLow, see setStarCamera):
// position - uCamHigh is exact when the two are close, so a star stays put
// up close. modelViewMatrix * position would round the camera to float32
// (~2 AU at 500 ly) and the sprite would jump around next to its disc.
// The star Points sit at the layer origin, so mat3(modelViewMatrix) is just
// the view's rotation.
const starVertexShader = `
    attribute float absMag;
    attribute vec3 color;
    uniform float uPixelRatio;
    uniform float uLinear;
    uniform float uMaxSize;
    uniform float uMinAlpha;
    uniform vec3 uCamHigh;
    uniform vec3 uCamLow;
    varying vec3 vColor;
    varying float vAlpha;
    varying float vGlow;

    void main() {
        vec3 relative = (position - uCamHigh) - uCamLow;
        vec4 mvPosition = vec4(mat3(modelViewMatrix) * relative, 1.0);
        float distPc = max(length(mvPosition.xyz) / ${LY_PER_PARSEC}, 1e-9);
        float mag = absMag + 5.0 * log(distPc) / log(10.0) - 5.0;

        vGlow = clamp((2.0 - mag) / 5.0, 0.0, 1.0);
        float size = clamp(2.0 + (6.5 - mag) * 1.3, 1.5, uMaxSize) * (1.0 + vGlow * 2.0);
        gl_PointSize = size * uPixelRatio;
        vAlpha = max(smoothstep(7.5, 5.0, mag), uMinAlpha);
        vColor = mix(color, pow(color, vec3(2.2)), uLinear);  // sRGB tint -> linear for haze
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const starFragmentShader = `
    varying vec3 vColor;
    varying float vAlpha;
    varying float vGlow;

    void main() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        // Sprite grows with vGlow, so tighten the core to keep it the same size
        float coreScale = (1.0 + vGlow * 2.0) * (1.0 + vGlow * 2.0);
        float core = exp(-r * r * 8.0 * coreScale);
        float halo = 0.35 * exp(-r * r * 2.5 * coreScale) + vGlow * 0.3 * exp(-r * r * 4.0);
        float alpha = (core + halo) * vAlpha;
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(vColor, alpha);
    }
`;

// Fixed-size ring drawn around the hovered / selected star
const ringVertexShader = `
    uniform float uSize;
    void main() {
        gl_PointSize = uSize;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

// The line keeps its width in pixels (uWidth) however big the ring is drawn
const ringFragmentShader = `
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uSize;
    uniform float uWidth;
    void main() {
        float d = length(gl_PointCoord - 0.5) * uSize;  // px from the centre
        float outer = uSize * 0.47;
        float inner = outer - uWidth;
        float alpha = smoothstep(inner - 1.0, inner, d) * (1.0 - smoothstep(outer, outer + 1.0, d)) * uOpacity;
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(uColor, alpha);
    }
`;

// The star shader's camera uniforms, shared by every star Points object
function makeStarCamera() {
    return { uCamHigh: { value: new THREE.Vector3() }, uCamLow: { value: new THREE.Vector3() } };
}

// position: the star layer camera's position (ly, doubles)
function setStarCamera(starCamera, position) {
    const high = starCamera.uCamHigh.value.set(Math.fround(position.x), Math.fround(position.y), Math.fround(position.z));
    starCamera.uCamLow.value.subVectors(position, high);
}

function makeStarPoints(positions, colors, absMags, pixelRatio, starCamera, maxSize = 24) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('absMag', new THREE.BufferAttribute(absMags, 1));
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uPixelRatio: { value: pixelRatio },
            uLinear: { value: 0 },
            uMaxSize: { value: maxSize },
            uMinAlpha: { value: STAR_MIN_ALPHA },
            ...starCamera,
        },
        vertexShader: starVertexShader,
        fragmentShader: starFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
    });
    return new THREE.Points(geometry, material);
}

// sizePx: device pixels; the ring's minimum size (see sizeRingToBody)
function makeRing(color, opacity, sizePx) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3));
    const material = new THREE.ShaderMaterial({
        uniforms: {
            uSize: { value: sizePx },
            uWidth: { value: sizePx * 0.1 },
            // Raw hex values, like the star shader (no colour management)
            uColor: { value: new THREE.Color().setHex(color, THREE.LinearSRGBColorSpace) },
            uOpacity: { value: opacity },
        },
        vertexShader: ringVertexShader,
        fragmentShader: ringFragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
    });
    const ring = new THREE.Points(geometry, material);
    ring.renderOrder = 10;
    ring.visible = false;
    ring.frustumCulled = false;
    ring.userData = { minSize: sizePx, opacity };
    return ring;
}

// Around a planet the ring hugs its disc (minimum size when the planet is
// small), and fades out once the planet fills much of the screen: by then
// it's obvious what is selected. radiusPx: the disc's radius in CSS px.
const RING_FADE_PX = [90, 150];
function sizeRingToBody(ring, radiusPx, pixelRatio) {
    const { minSize, opacity } = ring.userData;
    const hug = (radiusPx * 2 * 1.25 + 10) * pixelRatio;
    ring.material.uniforms.uSize.value = Math.max(minSize, hug);
    ring.material.uniforms.uOpacity.value = opacity * (1 - THREE.MathUtils.smoothstep(radiusPx, ...RING_FADE_PX));
}

// Ring geometry sits at its own origin; the ring is placed by object
// position (JS doubles), so it works in any layer. xyz null hides it.
function placeRing(ring, xyz) {
    ring.visible = xyz !== null;
    if (xyz) ring.position.set(xyz[0], xyz[1], xyz[2]);
}

// Line opacity is given as it looks with haze on, where lines blend in
// linear light before the sRGB output. Without haze they blend after sRGB
// encoding, where the same opacity looks about half as bright over the
// dark sky; opacity^(1/2.2) matches it.
function setLineHaze(lines, haze) {
    if (lines) lines.material.opacity = haze ? lines.userData.opacity : Math.pow(lines.userData.opacity, 1 / 2.2);
}

function makeLines(flatPositions, color, opacity, haze) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(flatPositions, 3));
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
    const lines = new THREE.LineSegments(geometry, material);
    lines.userData.opacity = opacity;
    setLineHaze(lines, haze);
    return lines;
}

function disposeObject(obj) {
    if (!obj) return;
    obj.geometry.dispose();
    obj.material.dispose();
}

// A distance in ly, in km / AU / ly to suit
function formatLength(ly) {
    const au = ly * AU_PER_LY;
    if (au < 0.01) return `${Number((au * KM_PER_AU).toPrecision(3)).toLocaleString()} km`;
    if (ly < 0.05) return `${au < 10 ? au.toFixed(2) : Math.round(au).toLocaleString()} AU`;
    if (ly < 10) return `${ly.toFixed(2)} ly`;
    return `${Math.round(ly).toLocaleString()} ly`;
}

// Readout: how far the centre point (orbit target) is from the Sun, so it
// stays put while rotating. Positions in ly from the Sun.
function formatDistance(target, earthPosition) {
    if (target.distanceTo(earthPosition) < EARTH_RADIUS_LY) return 'Earth';
    return `${formatLength(target.length())} from the Sun`;
}

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function Universe3D({ constellationData, stars3d, planetFacts, moonsData, smallBodies, onBack }) {
    // Constellation picked in search (abbrev), or null: none drawn
    const [selectedAbbrev, setSelectedAbbrev] = useState(null);
    const [showLines, setShowLines] = useState(true);
    const [showAllLines, setShowAllLines] = useState(false);
    const [showLabels, setShowLabels] = useState(true);
    const [showPlanets, setShowPlanets] = useState(true);
    const [showOrbits, setShowOrbits] = useState(true);
    const [showSmallMoons, setShowSmallMoons] = useState(true);
    // Asteroids and comets: the named ones (showSmallBodies), the point
    // cloud's hidden groups (small_bodies.json group ids), and whether the
    // big "more" tier (all 1.5 million) is drawn. Each is switched alone;
    // the "Asteroids & comets" box switches them all (see setAllSmallBodies).
    // moreTier: 'idle' | 'loading' | 'loaded' | 'error'
    const [showSmallBodies, setShowSmallBodies] = useState(true);
    const [hiddenGroups, setHiddenGroups] = useState(() => new Set());
    const [showAllAsteroids, setShowAllAsteroids] = useState(false);
    const [moreTier, setMoreTier] = useState('idle');
    // The Oort cloud model (star layer), shown with the asteroids
    const [showOort, setShowOort] = useState(true);
    // The Milky Way model (star layer), seen once you fly out past the stars
    const [showGalaxy, setShowGalaxy] = useState(true);
    // Its card ('milky_way', 'centre' or an arm name) and the cards' content
    // (galaxy.json, fetched when first needed: flying out, a card or search)
    const [selectedGalaxy, setSelectedGalaxy] = useState(null);
    const [galaxyCards, setGalaxyCards] = useState(null);
    const galaxyDataRef = useRef(null);
    const loadGalaxyData = () => {
        if (!galaxyDataRef.current) {
            galaxyDataRef.current = fetch(`${import.meta.env.BASE_URL}data/galaxy.json`)
                .then(response => {
                    if (!response.ok) throw new Error(response.statusText);
                    return response.json();
                })
                .then(data => {
                    setGalaxyCards(data.cards);
                    return data;
                })
                .catch(error => {
                    galaxyDataRef.current = null;  // try again next time
                    throw error;
                });
        }
        return galaxyDataRef.current;
    };
    // At most one of these is set: a star index, a solar system body id, or
    // a ring feature id (utils/rings.js)
    const [selectedStar, setSelectedStar] = useState(null);
    const [selectedBody, setSelectedBody] = useState(null);
    const [selectedRing, setSelectedRing] = useState(null);
    // An asteroid / comet region whose card is open (SMALL_BODY_REGIONS key),
    // and the parts of regions switched off from their cards ('group:part',
    // e.g. 'main:inner', 'comet:halley')
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [hiddenParts, setHiddenParts] = useState(() => new Set());
    // On phones the options panel starts collapsed so it doesn't cover the sky
    const [panelOpen, setPanelOpen] = useState(() => window.innerWidth > 767);
    // What the view is centred on, for the footer title. Starts orbiting
    // Earth from outside (see bodyPose / resetView).
    // {type: 'body', id} | {type: 'star', index} | {type: 'constellation'} | {type: 'none'}
    const [focus, setFocus] = useState(() => (planetFacts ? { type: 'body', id: 'Earth' } : { type: 'none' }));
    // Bloom haze: on by default except on touch devices (heavy for phone GPUs)
    const [showHaze, setShowHaze] = useState(() => !window.matchMedia('(pointer: coarse)').matches);
    const mountRef = useRef(null);
    const labelsRef = useRef(null);
    const tooltipRef = useRef(null);
    const distanceRef = useRef(null);
    const scaleBarRef = useRef(null);
    const scaleLabelRef = useRef(null);
    const sceneRef = useRef(null);  // three.js objects + helpers, set up once
    // Simulated time, advanced by the render loop: {time (ms), rate (simulated
    // seconds per real second; 0 stops, negative runs backwards), playing}.
    // clockView is a copy for the time bar, refreshed a few times a second.
    const clockRef = useRef(null);
    if (!clockRef.current) clockRef.current = { time: Date.now(), rate: 1, playing: true };
    const [clockView, setClockView] = useState(() => ({ ...clockRef.current }));
    const optionsRef = useRef({});  // current toggles, read by the render loop

    const starBuffers = useMemo(() => (stars3d ? buildStarBuffers(stars3d) : null), [stars3d]);
    const gaiaBuffers = useMemo(() => (stars3d?.gaia ? buildGaiaBuffers(stars3d.gaia) : null), [stars3d]);
    const lineStarInfo = useMemo(() => buildLineStarInfo(constellationData), [constellationData]);
    const searchItems = useMemo(
        () => (starBuffers ? [
            ...buildSearchIndex(constellationData, starBuffers, lineStarInfo, planetFacts, moonsData, smallBodies?.meta),
            ...GALAXY_SEARCH.map(g => ({ ...g, type: 'galaxy', terms: [g.label, ...g.terms].map(normalizeSearchText), sortKey: -11 })),
        ] : []),
        [constellationData, starBuffers, lineStarInfo, planetFacts, moonsData, smallBodies]
    );

    const selectedHips = useMemo(
        () => new Set(selectedAbbrev ? constellationData[selectedAbbrev].stars.map(s => Number(s.hip)) : []),
        [constellationData, selectedAbbrev]
    );

    optionsRef.current = { showLines, showAllLines, showLabels, showPlanets, showSmallBodies, showOort, showGalaxy, selectedAbbrev, selectedHips, selectedRing, selectedRegion, selectedGalaxy };

    const selectStar = (index) => {
        setSelectedBody(null);
        setSelectedRing(null);
        setSelectedRegion(null);
        setSelectedGalaxy(null);
        setSelectedStar(index);
    };
    const selectBody = (id) => {
        setSelectedStar(null);
        setSelectedRing(null);
        setSelectedRegion(null);
        setSelectedGalaxy(null);
        setSelectedBody(id);
    };

    // Set up renderer, scene, camera, stars, picking and labels once
    useEffect(() => {
        if (!starBuffers) return;
        const mount = mountRef.current;
        const labelsEl = labelsRef.current;
        const tooltip = tooltipRef.current;
        const pixelRatio = Math.min(window.devicePixelRatio, 2);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(pixelRatio);
        renderer.setClearColor(0x02040a);
        mount.appendChild(renderer.domElement);

        // Master camera: ly from the Sun, driven by OrbitControls, never
        // rendered. Each layer derives its own camera from it (utils/layers3d).
        const camera = new THREE.PerspectiveCamera(FOV, 1, 0.0001, 1e6);
        camera.up.set(0, 1, 0);  // celestial north

        // Far -> near. The Earth layer (km) comes with satellites.
        const starLayer = createLayer({ name: 'universe', unit: 1, near: 0.0001, far: 1e6 });
        // Real-size disc of the nearest star with a known radius (AU, at that star)
        const starDisc = createStarDisc(starBuffers);
        const solarLayer = createLayer({ name: 'solar system', unit: 1 / AU_PER_LY, near: 1e-7, far: 1e5 });
        const layers = [starLayer, starDisc.layer, solarLayer];
        const scene = starLayer.scene;
        const starCamera = starLayer.camera;  // for picking and labels
        const solarCamera = solarLayer.camera;
        const syncCameras = () => layers.forEach(layer => syncLayerCamera(layer, camera));

        // Planets and moons at the clock's time (see the render loop). Without
        // planets.json the layer stays empty and Earth stays at the Sun.
        const solar = planetFacts ? buildSolarSystem(solarLayer.scene, planetFacts, moonsData, pixelRatio, smallBodies?.meta) : null;
        solar?.update(new Date(clockRef.current.time));
        // Unnamed asteroids and comets: a point cloud placed on the GPU. The
        // default tier now; the "more" tier when asked (see showAllAsteroids)
        const cloud = solar && smallBodies ? buildSmallBodyCloud(solarLayer.scene, smallBodies.meta, pixelRatio) : null;
        cloud?.addTier(0, smallBodies.points, smallBodies.parts);
        cloud?.update(new Date(clockRef.current.time));
        const earthPosition = new THREE.Vector3();
        if (solar?.byId.has('Earth')) earthPosition.copy(solar.byId.get('Earth').position).divideScalar(AU_PER_LY);

        // Camera pose for viewing a body, in ly: a few radii out on its
        // sunlit side, a little above the ecliptic. The Sun gets a view of
        // the whole Solar System. {position, target, minDistance} or null.
        const bodyPose = (id) => {
            const body = solar?.byId.get(id);
            if (!body) return null;
            const p = body.position.clone().divideScalar(AU_PER_LY);
            // How close you may zoom: before its map gets blurry (just
            // above the surface if it has none)
            const pxRadians = THREE.MathUtils.degToRad(camera.fov) / Math.max(mount.clientHeight, 1);
            const minRadii = minViewRadii(body.surfaceMap, pxRadians);
            let offset;
            if (id === 'Sun') {
                // Above the ecliptic on Earth's side, far enough to see Neptune's orbit
                offset = earthPosition.clone().normalize().add(ECLIPTIC_NORTH.clone().multiplyScalar(1.2))
                    .normalize().multiplyScalar(60 / AU_PER_LY);
            } else {
                const radii = Math.max(id === 'Saturn' ? 9 : 6, minRadii * 1.5);
                offset = p.clone().normalize().negate().add(ECLIPTIC_NORTH.clone().multiplyScalar(0.35))
                    .normalize().multiplyScalar(body.radiusAu * radii / AU_PER_LY);
            }
            return {
                position: p.clone().add(offset).toArray(),
                target: p.toArray(),
                minDistance: body.radiusAu * minRadii / AU_PER_LY,
            };
        };

        // Camera pose for viewing a ring feature, in ly: above the ring's
        // sunlit face, looking down at it where it is seen side-on from the
        // Sun (so it isn't in the planet's shadow), from RING_VIEW_SCALE
        // times its size away. {position, target, minDistance} or null.
        const ringPose = (featureId) => {
            const f = RING_FEATURES_BY_ID.get(featureId);
            const planet = f && solar?.byId.get(f.planet);
            if (!planet) return null;
            const pole = new THREE.Vector3(...ringPole(f.planet));
            const toSun = planet.position.clone().negate().normalize();
            if (pole.dot(toSun) < 0) pole.negate();
            const side = new THREE.Vector3().crossVectors(pole, toSun).normalize();
            const target = planet.position.clone().addScaledVector(side, ringLabelKm(f) / KM_PER_AU);
            const viewAu = Math.max(ringScaleKm(f) * RING_VIEW_SCALE, RING_VIEW_MIN_KM) / KM_PER_AU;
            const position = target.clone().addScaledVector(toSun.multiplyScalar(0.5).add(pole).normalize(), viewAu);
            return {
                position: position.divideScalar(AU_PER_LY).toArray(),
                target: target.divideScalar(AU_PER_LY).toArray(),
                minDistance: viewAu * 0.02 / AU_PER_LY,
            };
        };

        // Camera pose for an overview of an asteroid region, in ly: distAu
        // from the Sun, looking at it from above the ecliptic on Earth's side
        const regionPose = (distAu) => {
            const dir = earthPosition.lengthSq() > 0 ? earthPosition.clone().normalize() : new THREE.Vector3(1, 0, 0);
            const offset = dir.add(ECLIPTIC_NORTH.clone().multiplyScalar(1.2)).normalize().multiplyScalar(distAu / AU_PER_LY);
            return { position: offset.toArray(), target: [0, 0, 0], minDistance: distAu * 0.01 / AU_PER_LY };
        };

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.08;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = ZOOM_SPEED;
        controls.minDistance = ORBIT_MIN_DISTANCE;
        // Far enough to see the whole Milky Way model (~100,000 ly across)
        controls.maxDistance = 300000;
        // Start orbiting Earth (the home view). Without planets: at the Sun,
        // looking at the sky 500 ly out.
        const home = bodyPose('Earth');
        if (home) {
            camera.position.set(...home.position);
            controls.target.set(...home.target);
            controls.minDistance = home.minDistance;
        } else {
            controls.target.set(0, 0, -500);
        }

        const starCameraUniforms = makeStarCamera();
        const stars = makeStarPoints(starBuffers.positions, starBuffers.colors, starBuffers.absMags, pixelRatio, starCameraUniforms);
        scene.add(stars);

        // Gaia's nearby stars (within 100 pc, not in the catalogue above):
        // drawn only, not picked or labelled
        const gaiaStars = gaiaBuffers
            ? makeStarPoints(gaiaBuffers.positions, gaiaBuffers.colors, gaiaBuffers.absMags, pixelRatio, starCameraUniforms)
            : null;
        if (gaiaStars) scene.add(gaiaStars);

        // The Sun, so you can find home after flying away
        // The Oort cloud: a model, far beyond the planets (see utils/oortCloud)
        const oort = buildOortCloud(scene, pixelRatio);
        // The Milky Way: a model from published numbers (see utils/galaxy3d),
        // fetched and built the first time the camera heads out. Fewer
        // points on phones.
        const galaxy = buildGalaxy(scene, pixelRatio, loadGalaxyData, { lite: window.matchMedia('(pointer: coarse)').matches });

        const sun = makeStarPoints(
            new Float32Array([0, 0, 0]),
            new Float32Array(bvToColor(SUN_BV)),
            new Float32Array([SUN_ABS_MAG]),
            pixelRatio,
            starCameraUniforms,
            40
        );
        scene.add(sun);

        // One hover/selected ring pair per layer
        const hoverRing = makeRing(0xcbd5e1, 0.6, 26 * pixelRatio);
        const selectedRing = makeRing(0xfacc15, 0.9, 30 * pixelRatio);
        scene.add(hoverRing, selectedRing);
        const bodyHoverRing = makeRing(0xcbd5e1, 0.6, 26 * pixelRatio);
        const bodySelectedRing = makeRing(0xfacc15, 0.9, 30 * pixelRatio);
        // Earth is hard to find: it gets a blue ring while its sphere is small
        // on screen (placed by updateLabels). One in each layer: the solar
        // system's (AU) while that is drawn, the star layer's (ly) beyond it,
        // whose near plane (0.0001 ly, ~6 AU) would clip it close by.
        const earthMarkerNear = makeRing(0x60a5fa, 0.9, 18 * pixelRatio);
        const earthMarkerFar = makeRing(0x60a5fa, 0.9, 18 * pixelRatio);
        solarLayer.scene.add(bodyHoverRing, bodySelectedRing, earthMarkerNear);
        scene.add(earthMarkerFar);

        // Haze: bloom post-processing, used when s.haze is on
        const composer = new EffectComposer(renderer);
        const layerPasses = addLayerPasses(composer, layers);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.6, 0.4, 0.6);
        composer.addPass(bloomPass);
        composer.addPass(new OutputPass());

        const s = {
            scene, camera, controls, selectedRing, bodySelectedRing, solar, cloud,
            selectedLines: null, allLines: null, flight: null, haze: false,
            // Earth in ly from the Sun; everything Earth-relative reads this
            earthPosition,
            bodyPose,
            ringPose,
            regionPose,
            // The body the view rides along with as time runs (see setFollow)
            follow: { id: home ? 'Earth' : null, moveTarget: true },
            selectedBodyId: null,
        };
        // As time runs, keep the view with a moving body: the camera moves
        // with it, and so does the orbit target if it is that body
        // (moveTarget). Looking at stars from Earth, only the camera rides
        // along with Earth. id null: nothing moves.
        s.setFollow = (id, moveTarget = true) => {
            s.follow = { id: id && solar?.byId.has(id) ? id : null, moveTarget };
            s.focused = true;
        };
        // Centred on something (the footer names it); panning away clears it
        s.focused = true;
        s.setHaze = (on) => {
            s.haze = on;
            solar?.setHaze(on);
            cloud?.setHaze(on);
            [stars, gaiaStars, sun].forEach(obj => { if (obj) obj.material.uniforms.uLinear.value = on ? 1 : 0; });
            starDisc.setHaze(on);
            setLineHaze(s.selectedLines, on);
            setLineHaze(s.allLines, on);
        };
        sceneRef.current = s;

        // ---------- Camera flights ----------
        // Positions are in ly from the Sun (master camera space).
        // minDistance: how close the user may then zoom to the new target.
        // OrbitControls enforces it every frame, so during the flight it is
        // the smaller of old and new.
        s.flyTo = (toPosition, toTarget, minDistance = ORBIT_MIN_DISTANCE) => {
            const toPos = new THREE.Vector3(...toPosition);
            const toTgt = new THREE.Vector3(...toTarget);
            controls.minDistance = Math.min(controls.minDistance, minDistance);
            s.flight = {
                fromTarget: controls.target.clone(),
                toTarget: toTgt,
                fromOffset: camera.position.clone().sub(controls.target),
                toOffset: toPos.clone().sub(toTgt),
                pivot: toPos,
                minDistance,
                start: performance.now(),
            };
        };
        // Any drag/zoom by the user cancels a flight in progress
        controls.addEventListener('start', () => { s.flight = null; });

        // Move from a to b by swinging around a pivot: direction slerped,
        // distance interpolated in log space, so a flight covering many
        // orders of magnitude spends equal time at each scale. An end on
        // the pivot (log(0)) is treated as minR away in the other end's
        // direction; both ends on it is a straight line.
        const relA = new THREE.Vector3();
        const relB = new THREE.Vector3();
        const identity = new THREE.Quaternion();
        const fullRotation = new THREE.Quaternion();
        const rotation = new THREE.Quaternion();
        const swing = (out, a, b, k, pivot, minR) => {
            relA.subVectors(a, pivot);
            relB.subVectors(b, pivot);
            let r0 = relA.length();
            let r1 = relB.length();
            if (r0 < 1e-12 && r1 < 1e-12) return out.lerpVectors(a, b, k);
            if (r0 < 1e-12) {
                relA.copy(relB);
                r0 = Math.min(minR, r1);
                relA.setLength(r0);
            }
            if (r1 < 1e-12) {
                relB.copy(relA);
                r1 = Math.min(minR, r0);
                relB.setLength(r1);
            }
            relA.divideScalar(r0);
            relB.divideScalar(r1);
            fullRotation.setFromUnitVectors(relA, relB);
            rotation.slerpQuaternions(identity, fullRotation, k);
            return out.copy(relA).applyQuaternion(rotation)
                .multiplyScalar(r0 * Math.pow(r1 / r0, k))
                .add(pivot);
        };

        // The target swings around the flight's end camera position, so
        // switching between constellations on opposite sides of the sky
        // doesn't pass near the camera. The camera follows as target +
        // offset, the offset swinging the same way: when the camera starts
        // and ends at the same place (Earth) both swing together and it
        // stays exactly put; flying to a star or planet, the distance to it
        // shrinks smoothly in log space instead of a straight line that is
        // far out most of the time.
        const origin = new THREE.Vector3();
        const offset = new THREE.Vector3();
        const updateFlight = (now) => {
            const f = s.flight;
            if (!f) return;
            const t = Math.min(1, (now - f.start) / (FLIGHT_SECONDS * 1000));
            const k = easeInOutCubic(t);
            // A target starting on the pivot (e.g. orbiting Earth, flying
            // back to the Earth view) starts 1% of the camera distance out,
            // so the view barely jumps on the first frame
            const minR = Math.max(0.01 * Math.min(f.fromOffset.length(), f.toOffset.length()), 1e-12);
            swing(controls.target, f.fromTarget, f.toTarget, k, f.pivot, minR);
            swing(offset, f.fromOffset, f.toOffset, k, origin, minR);
            camera.position.copy(controls.target).add(offset);

            if (t === 1) {
                controls.target.copy(f.toTarget);
                camera.position.copy(f.toTarget).add(f.toOffset);
                controls.minDistance = f.minDistance;
                s.flight = null;
            }
        };

        // ---------- Screen-space star picking ----------
        const { positions, absMags, count } = starBuffers;
        const viewProjection = new THREE.Matrix4();

        // Visible stars near a screen point; prefers closer and brighter ones
        const pickStar = (clientX, clientY, radiusPx) => {
            const rect = renderer.domElement.getBoundingClientRect();
            const mx = clientX - rect.left;
            const my = clientY - rect.top;
            // The view may have moved since the last frame
            syncLayerCamera(starLayer, camera);
            viewProjection.multiplyMatrices(starCamera.projectionMatrix, starCamera.matrixWorldInverse);
            const e = viewProjection.elements;
            const cam = starCamera.position;
            let best = null;
            let bestScore = Infinity;
            for (let i = 0; i < count; i++) {
                const x = positions[i * 3], y = positions[i * 3 + 1], z = positions[i * 3 + 2];
                const w = e[3] * x + e[7] * y + e[11] * z + e[15];
                if (w <= 0) continue;  // behind the camera
                const sx = ((e[0] * x + e[4] * y + e[8] * z + e[12]) / w + 1) / 2 * rect.width;
                const sy = (1 - (e[1] * x + e[5] * y + e[9] * z + e[13]) / w) / 2 * rect.height;
                const d = Math.hypot(sx - mx, sy - my);
                if (d > radiusPx) continue;
                const distPc = Math.max(Math.hypot(x - cam.x, y - cam.y, z - cam.z) / LY_PER_PARSEC, 1e-4);
                const mag = absMags[i] + 5 * Math.log10(distPc) - 5;
                if (mag > PICK_MAG_LIMIT) continue;
                const score = d + mag * 2;
                if (score < bestScore) {
                    bestScore = score;
                    best = i;
                }
            }
            return best;
        };

        const starLabel = (index) => {
            const rec = starRecord(starBuffers, index);
            return rec.name || formatBayer(lineStarInfo.get(rec.hip)?.bayer) || `HIP ${rec.hip}`;
        };

        // ---------- Solar system bodies: screen positions + picking ----------
        // How visible the solar system is (0..1), set each frame
        let solarFade = 0;
        const bodyProjected = new THREE.Vector3();
        // Screen position and drawn radius (px) of a body, or null when it is
        // off screen, behind the camera, or the camera is inside it. Done by
        // hand rather than with project(): that also rejects points past the
        // layer's far plane (1e5 AU, ~1.6 ly), which would hide the Sun and
        // Earth labels from further out.
        const bodyOnScreen = (body, width, height) => {
            const dist = body.position.distanceTo(solarCamera.position);
            if (dist < body.radiusAu * 1.5) return null;
            bodyProjected.copy(body.position).applyMatrix4(solarCamera.matrixWorldInverse);
            if (bodyProjected.z >= 0) return null;  // behind the camera
            bodyProjected.applyMatrix4(solarCamera.projectionMatrix);
            if (Math.abs(bodyProjected.x) > 1.05 || Math.abs(bodyProjected.y) > 1.05) return null;
            const radiusPx = body.radiusAu / dist * (height / 2) / Math.tan(THREE.MathUtils.degToRad(solarCamera.fov) / 2);
            return { x: (bodyProjected.x + 1) / 2 * width, y: (1 - bodyProjected.y) / 2 * height, radiusPx };
        };
        const bodiesActive = () => solar && solarLayer.visible && solarFade >= BODY_MIN_FADE;
        // Earth's ring is showing (set each frame by updateLabels)
        let earthMarked = false;

        // Nearest body (by screen distance) whose dot or disc is under the point
        const pickBody = (clientX, clientY, radiusPx) => {
            if (!solar) return null;
            // From far out only Earth (marked by its ring) can be picked
            const active = bodiesActive();
            if (!active && !earthMarked) return null;
            const rect = renderer.domElement.getBoundingClientRect();
            const mx = clientX - rect.left;
            const my = clientY - rect.top;
            syncLayerCamera(solarLayer, camera);
            let best = null;
            let bestDist = Infinity;
            for (const body of solar.bodies) {
                const isEarth = body.id === 'Earth';
                if ((!active && !isEarth) || !solar.isShown(body)) continue;
                // Small moons only while their cloud is shown (zoomed in)
                if (body.major === false && solar.minorMoonFade(body.parentId) < 0.5) continue;
                const p = bodyOnScreen(body, rect.width, rect.height);
                if (!p) continue;
                let d = Math.hypot(p.x - mx, p.y - my);
                // Earth's ring is a click target too, and Earth wins close calls
                const hitRadius = isEarth && earthMarked ? Math.max(p.radiusPx, EARTH_RING_PICK_PX) : Math.max(p.radiusPx, 0);
                if (d > hitRadius + radiusPx) continue;
                if (isEarth) d -= EARTH_RING_PICK_PX;
                if (body.parentId) {
                    // A moon still drawn on top of its planet isn't shown, so it
                    // can't be picked; one just clear of it loses close calls
                    const parent = bodyOnScreen(solar.byId.get(body.parentId), rect.width, rect.height);
                    if (parent && Math.hypot(p.x - parent.x, p.y - parent.y) < MOON_PICK_SEPARATION_PX + parent.radiusPx) continue;
                    d += 3;
                }
                if (d < bestDist) {
                    bestDist = d;
                    best = body.id;
                }
            }
            return best;
        };

        // An unnamed asteroid or comet under the point (hover only), or null
        const pickCloudDot = (clientX, clientY, radiusPx) => {
            if (!cloud || !solarLayer.visible) return null;
            const rect = renderer.domElement.getBoundingClientRect();
            syncLayerCamera(solarLayer, camera);
            return cloud.pick(solarCamera, rect.width, rect.height, clientX - rect.left, clientY - rect.top, radiusPx);
        };

        // Planets win over stars: they're drawn on top. Cloud dots come
        // between, for hovering (withCloud): they have no card to open.
        const pickAny = (clientX, clientY, radiusPx, withCloud = false) => {
            const id = pickBody(clientX, clientY, radiusPx);
            if (id !== null) return { type: 'body', id };
            const dot = withCloud ? pickCloudDot(clientX, clientY, Math.min(radiusPx, 8)) : null;
            if (dot) return { type: 'cloud', ...dot };
            const index = pickStar(clientX, clientY, radiusPx);
            return index === null ? null : { type: 'star', index };
        };

        // Cloud dot names (small_bodies_names.json): loaded on the first hover
        let dotNames = null;  // null | 'loading' | {names, H}
        const loadDotNames = () => {
            if (dotNames) return;
            dotNames = 'loading';
            fetch(`${import.meta.env.BASE_URL}data/${smallBodies.meta.names_file}`)
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load asteroid names: ${response.statusText}`);
                    return response.json();
                })
                .then(data => { dotNames = data; })
                .catch(error => {
                    console.error(error);
                    dotNames = null;  // try again on a later hover
                });
        };
        const groupNames = new Map((smallBodies?.meta.groups ?? []).map(g => [g.id, g.name]));
        // "433 Eros · Near-Earth · ~17 km" (size from brightness, typical albedo)
        const dotLabel = (hit) => {
            loadDotNames();
            const group = groupNames.get(hit.groupId);
            if (typeof dotNames !== 'object' || dotNames === null) return group;
            const H = dotNames.H[hit.index];
            const km = H === null ? null : 1329 / Math.sqrt(0.14) * 10 ** (-H / 5);
            const size = km === null || hit.groupId === 'comet' ? ''
                : ` · ~${km < 1 ? `${Math.round(km * 1000)} m` : `${Number(km.toPrecision(2))} km`}`;
            return `${dotNames.names[hit.index]} · ${group}${size}`;
        };

        const showHover = (hit) => {
            placeRing(hoverRing, hit?.type === 'star' ? positions.subarray(hit.index * 3, hit.index * 3 + 3) : null);
            placeRing(bodyHoverRing, hit?.type === 'body' ? solar.byId.get(hit.id).position.toArray()
                : hit?.type === 'cloud' ? hit.position : null);
            if (hit?.type === 'cloud') {
                const u = bodyHoverRing.material.uniforms;
                u.uSize.value = bodyHoverRing.userData.minSize;
                u.uOpacity.value = bodyHoverRing.userData.opacity;
            }
            s.hoverBodyId = hit?.type === 'body' ? hit.id : null;
        };

        // Planet rings follow their body (time runs) and hug its disc
        const updateBodyRings = () => {
            const { clientWidth: width, clientHeight: height } = mount;
            for (const [ring, id] of [[bodySelectedRing, s.selectedBodyId], [bodyHoverRing, s.hoverBodyId]]) {
                const body = ring.visible && id ? solar?.byId.get(id) : null;
                if (!body) continue;
                ring.position.copy(body.position);
                const p = bodyOnScreen(body, width, height);
                if (p) sizeRingToBody(ring, p.radiusPx, pixelRatio);
                else ring.material.uniforms.uOpacity.value = 0;  // camera inside it, or off screen
            }
        };

        // Click (not drag) selects a star or planet; empty space clears the selection
        let downAt = null;
        let pressedRing = null;  // ring feature id when the press began on its label
        let pressedRegion = null;  // likewise a region's (the Oort cloud's)
        let pressedGalaxy = null;  // and the galaxy's (its centre or an arm)
        const onPointerDown = (e) => {
            downAt = { x: e.clientX, y: e.clientY };
            // Hide the hover state while dragging; it is stale once the view moves
            showHover(null);
            tooltip.style.display = 'none';
        };
        const onPointerUp = (e) => {
            const ringId = pressedRing;
            const labelRegion = pressedRegion;
            const labelGalaxy = pressedGalaxy;
            pressedRing = null;
            pressedRegion = null;
            pressedGalaxy = null;
            if (!downAt || e.button !== 0) return;
            const moved = Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y);
            downAt = null;
            if (moved > 5) return;
            // Ring features, the Oort cloud and the galaxy are picked by their labels
            const hit = ringId || labelRegion || labelGalaxy ? null : pickAny(e.clientX, e.clientY, e.pointerType === 'touch' ? 24 : 14, true);
            setSelectedGalaxy(labelGalaxy);
            setSelectedStar(hit?.type === 'star' ? hit.index : null);
            setSelectedBody(hit?.type === 'body' ? hit.id : null);
            setSelectedRing(ringId);
            // An unnamed asteroid or comet has no card of its own: its region's
            setSelectedRegion(labelRegion ?? (hit?.type === 'cloud' && SMALL_BODY_REGIONS[hit.groupId] ? hit.groupId : null));
        };
        // Hover: ring + name tooltip (mouse only, throttled to one pick per frame)
        let hoverRequest = null;
        const onPointerMove = (e) => {
            if (e.pointerType !== 'mouse' || e.buttons !== 0 || hoverRequest) return;
            hoverRequest = requestAnimationFrame(() => {
                hoverRequest = null;
                const hit = pickAny(e.clientX, e.clientY, 12, true);
                showHover(hit);
                renderer.domElement.style.cursor = hit === null ? '' : 'pointer';
                if (hit === null) {
                    tooltip.style.display = 'none';
                } else {
                    tooltip.textContent = hit.type === 'star' ? starLabel(hit.index)
                        : hit.type === 'cloud' ? dotLabel(hit)
                        : solar.byId.get(hit.id).name;
                    tooltip.style.display = 'block';
                    tooltip.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 10}px)`;
                }
            });
        };
        const onPointerLeave = () => {
            showHover(null);
            tooltip.style.display = 'none';
        };
        const canvas = renderer.domElement;
        canvas.addEventListener('pointerdown', onPointerDown);
        canvas.addEventListener('pointerup', onPointerUp);
        canvas.addEventListener('pointermove', onPointerMove);
        canvas.addEventListener('pointerleave', onPointerLeave);

        // ---------- Labels (HTML overlay, positioned every frame) ----------
        const makeLabelEl = (text, className) => {
            const el = document.createElement('div');
            el.className = className;
            el.textContent = text;
            el.style.display = 'none';
            labelsEl.appendChild(el);
            return el;
        };
        const starLabels = [];
        for (let i = 0; i < count; i++) {
            const rec = starRecord(starBuffers, i);
            if (rec.name) starLabels.push({ index: i, hip: rec.hip, el: makeLabelEl(rec.name, 'universe-3d-label'), shown: false });
        }
        const constellationLabels = Object.values(constellationData).map(c => ({
            abbrev: c.abbrev,
            position: new THREE.Vector3(...constellationFocus(c, starBuffers)),
            el: makeLabelEl(c.name, 'universe-3d-label universe-3d-label-constellation'),
            shown: false,
        }));
        // Sun first, Moon last: a label overlapping an earlier one is hidden
        // Minor moons get no label (hover names them)
        const bodyLabels = (solar?.bodies ?? []).filter(body => body.major !== false).map(body => ({
            body,
            el: makeLabelEl(body.name, `universe-3d-label universe-3d-label-planet${body.id === 'Earth' ? ' universe-3d-label-earth' : ''}`),
            shown: false,
        }));
        // Pressing a clickable label hands the pointer to the canvas, so a
        // drag that starts on it still turns the view; a press that doesn't
        // move selects what onPress marked (see onPointerUp)
        const makeClickable = (el, onPress) => {
            el.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                onPress();
                canvas.dispatchEvent(new PointerEvent('pointerdown', e));
                if (!canvas.hasPointerCapture(e.pointerId)) canvas.setPointerCapture(e.pointerId);
            });
            // Scrolling over a label still zooms
            el.addEventListener('wheel', (e) => {
                e.preventDefault();
                canvas.dispatchEvent(new WheelEvent('wheel', e));
            }, { passive: false });
        };
        // Rings and gaps: clickable labels (see placeRingLabel)
        const ringLabels = solar ? RING_FEATURES.filter(f => solar.byId.has(f.planet)).map(f => {
            const el = makeLabelEl(f.name, `universe-3d-label universe-3d-label-ring${f.kind === 'gap' ? ' universe-3d-label-gap' : ''}`);
            makeClickable(el, () => { pressedRing = f.id; });
            return {
                feature: f,
                el,
                shown: false,
                selected: false,
                pole: new THREE.Vector3(...ringPole(f.planet)),
                labelAu: ringLabelKm(f) / KM_PER_AU,
                scaleAu: ringScaleKm(f) / KM_PER_AU,
                minPx: f.kind === 'gap' ? RING_GAP_LABEL_PX : RING_LABEL_PX,
            };
        }) : [];
        // Its dots aren't real objects, so its label is what you click
        const oortLabel = {
            position: new THREE.Vector3(...OORT_LABEL_POSITION),
            el: makeLabelEl('Oort cloud (model)', 'universe-3d-label universe-3d-label-constellation universe-3d-label-link'),
            shown: false,
            selected: false,
        };
        makeClickable(oortLabel.el, () => { pressedRegion = 'oort'; });
        let galaxyLabels = [];
        const placedLabels = [];

        const projected = new THREE.Vector3();
        const toScreen = (position, width, height) => {
            projected.copy(position).project(starCamera);
            if (projected.z > 1 || Math.abs(projected.x) > 1.05 || Math.abs(projected.y) > 1.05) return null;
            return [(projected.x + 1) / 2 * width, (1 - projected.y) / 2 * height];
        };
        const setLabel = (label, screenPos, dx, dy) => {
            const show = screenPos !== null;
            if (show !== label.shown) {
                label.el.style.display = show ? 'block' : 'none';
                label.shown = show;
            }
            if (show) label.el.style.transform = `translate(${screenPos[0] + dx}px, ${screenPos[1] + dy}px)`;
        };
        const starPosition = new THREE.Vector3();

        // Where a ring feature's label goes, [x, y] px, or null. Shown once
        // the feature is drawn big enough (always when selected). It sits on
        // the ring at the point farthest right on screen, where rings look
        // widest; when that's off screen (zoomed in), at the visible point
        // nearest the screen centre. Points behind the planet don't count.
        const ringDirA = new THREE.Vector3();
        const ringDirB = new THREE.Vector3();
        const ringPoint = new THREE.Vector3();
        const cameraAxis = new THREE.Vector3();
        const placeRingLabel = (label, selected, width, height, pxPerRadian) => {
            const planet = solar.byId.get(label.feature.planet);
            const centre = planet.position;
            const dist = centre.distanceTo(solarCamera.position);
            if (!selected && label.scaleAu / dist * pxPerRadian < label.minPx) return null;
            // In the ring plane: A towards the screen's right (or up, if the
            // ring is seen edge-on running up the screen), B at right angles
            const { pole } = label;
            cameraAxis.setFromMatrixColumn(solarCamera.matrixWorld, 0);
            ringDirA.copy(cameraAxis).addScaledVector(pole, -cameraAxis.dot(pole));
            if (ringDirA.lengthSq() < 0.05) {
                cameraAxis.setFromMatrixColumn(solarCamera.matrixWorld, 1);
                ringDirA.copy(cameraAxis).addScaledVector(pole, -cameraAxis.dot(pole));
            }
            ringDirA.normalize();
            ringDirB.crossVectors(pole, ringDirA);
            const disc = bodyOnScreen(planet, width, height);
            const m = RING_LABEL_MARGIN_PX;
            const pointAt = (angle) => {
                ringPoint.copy(centre)
                    .addScaledVector(ringDirA, label.labelAu * Math.cos(angle))
                    .addScaledVector(ringDirB, label.labelAu * Math.sin(angle));
                bodyProjected.copy(ringPoint).applyMatrix4(solarCamera.matrixWorldInverse);
                if (bodyProjected.z >= 0) return null;  // behind the camera
                bodyProjected.applyMatrix4(solarCamera.projectionMatrix);
                const x = (bodyProjected.x + 1) / 2 * width;
                const y = (1 - bodyProjected.y) / 2 * height;
                if (x < m || x > width - m || y < m || y > height - m) return null;
                const behindPlanet = disc && ringPoint.distanceTo(solarCamera.position) > dist
                    && Math.hypot(x - disc.x, y - disc.y) < disc.radiusPx;
                return behindPlanet ? null : [x, y];
            };
            const rightEnd = pointAt(0);
            if (rightEnd) return rightEnd;
            let best = null;
            let bestDist = Infinity;
            for (let i = 1; i < RING_LABEL_SAMPLES; i++) {
                const p = pointAt(i / RING_LABEL_SAMPLES * 2 * Math.PI);
                const d = p && Math.hypot(p[0] - width / 2, p[1] - height / 2);
                if (p && d < bestDist) {
                    best = p;
                    bestDist = d;
                }
            }
            return best;
        };

        const updateLabels = () => {
            const opts = optionsRef.current;
            const { clientWidth: width, clientHeight: height } = mount;
            for (const label of starLabels) {
                let screenPos = null;
                if (opts.showLabels) {
                    starPosition.fromArray(positions, label.index * 3);
                    const distPc = Math.max(starPosition.distanceTo(starCamera.position) / LY_PER_PARSEC, 1e-4);
                    const mag = absMags[label.index] + 5 * Math.log10(distPc) - 5;
                    const inFigure = opts.selectedHips.has(label.hip);
                    if (mag <= LABEL_MAG_LIMIT || (inFigure && mag <= PICK_MAG_LIMIT)) {
                        screenPos = toScreen(starPosition, width, height);
                    }
                }
                setLabel(label, screenPos, 8, -8);
            }
            for (const label of constellationLabels) {
                const wanted = opts.showLabels && (
                    label.abbrev === opts.selectedAbbrev || (opts.showLines && opts.showAllLines)
                );
                setLabel(label, wanted ? toScreen(label.position, width, height) : null, 0, 0);
            }
            setLabel(oortLabel, opts.showLabels && oort.fade() > 0.3 ? toScreen(oortLabel.position, width, height) : null, 0, 0);
            const oortSelected = opts.selectedRegion === 'oort';
            if (oortSelected !== oortLabel.selected) {
                oortLabel.el.classList.toggle('selected', oortSelected);
                oortLabel.selected = oortSelected;
            }
            // The galaxy's labels appear once it is built
            if (!galaxyLabels.length) {
                galaxyLabels = galaxy.labels().map(l => {
                    const el = makeLabelEl(l.name, 'universe-3d-label universe-3d-label-constellation universe-3d-label-link');
                    makeClickable(el, () => { pressedGalaxy = l.id; });
                    return { id: l.id, position: l.position, el, shown: false, selected: false };
                });
            }
            const galaxyLabelsOn = opts.showLabels && galaxy.fade() > 0.3;
            for (const label of galaxyLabels) {
                setLabel(label, galaxyLabelsOn ? toScreen(label.position, width, height) : null, 0, 0);
                const selected = opts.selectedGalaxy === label.id;
                if (selected !== label.selected) {
                    label.el.classList.toggle('selected', selected);
                    label.selected = selected;
                }
            }
            // Earth is labelled from anywhere, with a ring, so you can always
            // find home, and other labels never hide it (next to the Sun's,
            // its label goes underneath). The Sun is labelled like the planets.
            placedLabels.length = 0;
            let sunAt = null;
            let earthRing = false;
            for (const label of bodyLabels) {
                const { body } = label;
                const isEarth = body.id === 'Earth';
                let screenPos = null;
                let dy = -8;
                const wanted = opts.showLabels && (isEarth || (opts.showPlanets && bodiesActive() && solar.isShown(body)));
                const p = wanted ? bodyOnScreen(body, width, height) : null;
                if (body.id === 'Sun') sunAt = p;
                const free = p && (isEarth || !placedLabels.some(q => Math.hypot(q.x - p.x, q.y - p.y) < 16));
                if (free) {
                    placedLabels.push(p);
                    const r = Math.min(p.radiusPx, height / 4) * 0.7;
                    screenPos = [p.x + r, p.y - r];
                    if (isEarth && sunAt && Math.hypot(sunAt.x - p.x, sunAt.y - p.y) < 16) dy = 8;
                    if (isEarth) earthRing = p.radiusPx < 5;
                }
                setLabel(label, screenPos, 8, dy);
            }
            // Ring labels after the bodies': a body's label wins an overlap
            const ringsWanted = opts.showLabels && opts.showPlanets && bodiesActive();
            const pxPerRadian = height / 2 / Math.tan(THREE.MathUtils.degToRad(solarCamera.fov) / 2);
            for (const label of ringLabels) {
                const selected = label.feature.id === opts.selectedRing;
                let p = ringsWanted ? placeRingLabel(label, selected, width, height, pxPerRadian) : null;
                // Centred text: overlapping if within about a label's size
                if (p && !selected && placedLabels.some(q => Math.abs(q.x - p[0]) < 60 && Math.abs(q.y - p[1]) < 14)) p = null;
                if (p) placedLabels.push({ x: p[0], y: p[1] });
                setLabel(label, p, 0, 0);
                if (selected !== label.selected) {
                    label.el.classList.toggle('selected', selected);
                    label.selected = selected;
                }
            }
            earthMarked = earthRing;
            earthMarkerNear.visible = earthRing && solarLayer.visible;
            earthMarkerFar.visible = earthRing && !solarLayer.visible;
            if (earthRing) {
                earthMarkerNear.position.copy(solar.byId.get('Earth').position);
                earthMarkerFar.position.copy(earthPosition);
            }
        };

        // ---------- Resize + render loop ----------
        const resize = () => {
            const { clientWidth, clientHeight } = mount;
            renderer.setSize(clientWidth, clientHeight);
            composer.setPixelRatio(pixelRatio);
            composer.setSize(clientWidth, clientHeight);
            camera.aspect = clientWidth / clientHeight;
            camera.updateProjectionMatrix();
            solar?.setViewportHeight(clientHeight * pixelRatio);
        };
        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(mount);

        // ---------- Scale bar ----------
        // Measured at the orbit point (screen centre): things nearer or
        // farther are drawn bigger or smaller.
        let lastScale = '';
        const updateScaleBar = () => {
            const bar = scaleBarRef.current;
            const label = scaleLabelRef.current;
            if (!bar || !label) return;
            const { clientWidth: width, clientHeight: height } = mount;
            if (!height) return;
            const maxPx = Math.min(120, width * 0.25);
            const dist = camera.position.distanceTo(controls.target);
            const lyPerPx = 2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) / height;
            const { lengthLy, label: text } = scaleBarDistance(maxPx * lyPerPx);
            const px = lengthLy / lyPerPx;
            const key = `${Math.round(px)}|${text}`;
            if (key === lastScale) return;
            lastScale = key;
            bar.style.width = `${Math.round(px)}px`;
            label.textContent = text;
        };

        // ---------- Clock ----------
        // clockRef.current: {time (ms), rate, playing}; the time bar changes it.
        // Each frame the time advances by the speed, the solar system moves,
        // and the followed body takes the camera (and target) along.
        const followBefore = new THREE.Vector3();
        const followDelta = new THREE.Vector3();
        let solarTime = clockRef.current.time;
        const moveSolarSystem = (time) => {
            const followed = s.follow.id ? solar.byId.get(s.follow.id) : null;
            if (followed) followBefore.copy(followed.position);
            solar.update(new Date(time));
            cloud?.update(new Date(time));
            if (solar.byId.has('Earth')) earthPosition.copy(solar.byId.get('Earth').position).divideScalar(AU_PER_LY);
            if (!followed) return;
            followDelta.subVectors(followed.position, followBefore).divideScalar(AU_PER_LY);
            camera.position.add(followDelta);
            if (s.follow.moveTarget) controls.target.add(followDelta);
            const f = s.flight;
            if (f) {
                // A flight to a moving body (or from moving Earth) moves with it
                f.pivot.add(followDelta);
                if (s.follow.moveTarget) {
                    f.fromTarget.add(followDelta);
                    f.toTarget.add(followDelta);
                } else {
                    f.toOffset.add(followDelta);
                }
            }
        };

        let lastFrame = null;
        let lastPublished = 0;
        const advanceClock = (now) => {
            const clock = clockRef.current;
            const dt = lastFrame === null ? 0 : Math.min(now - lastFrame, 250);  // ms; cap after a stalled tab
            lastFrame = now;
            if (clock.playing) {
                clock.time = THREE.MathUtils.clamp(clock.time + dt * clock.rate, TIME_RANGE[0], TIME_RANGE[1]);
            }
            if (solar && clock.time !== solarTime) {
                moveSolarSystem(clock.time);
                solarTime = clock.time;
            }
            // The time bar (and card distances) re-render a few times a second
            if (now - lastPublished > 250) {
                lastPublished = now;
                setClockView({ ...clock });
            }
        };

        // The solar-system layer spans 15 km to 100,000 AU; with a fixed near
        // plane the depth buffer can't tell moons, their orbits and their
        // planet apart (they flicker in front of and behind each other). So
        // the near plane sits at a fraction of the distance to the nearest
        // surface: depth is precise for whatever the camera is close to.
        // Every body counts, small moons too (one you've flown to must not be
        // clipped by a near plane set by its distant planet).
        const cameraAu = new THREE.Vector3();
        const solarNearPlane = () => {
            cameraAu.copy(camera.position).multiplyScalar(AU_PER_LY);
            let nearest = Infinity;
            for (const body of solar.bodies) {
                if (!solar.isShown(body)) continue;
                nearest = Math.min(nearest, body.position.distanceTo(cameraAu) - body.radiusAu);
            }
            return THREE.MathUtils.clamp(nearest * SOLAR_NEAR_FRACTION, 1e-9, 1e3);
        };

        const targetBefore = new THREE.Vector3();
        let frameId;
        let lastDistanceLabel = '';
        const animate = (now) => {
            advanceClock(now);
            updateFlight(now);
            targetBefore.copy(controls.target);
            controls.update();
            // Only panning moves the target inside controls.update (rotating
            // and zooming don't): the view is no longer centred on what it was.
            // The threshold ignores rounding (controls.update re-scales the
            // target every frame); a pan moves it by far more.
            const panTolerance = 1e-6 * camera.position.distanceTo(controls.target) + 1e-12 * controls.target.length();
            if (!s.flight && s.focused && targetBefore.distanceTo(controls.target) > panTolerance) {
                s.focused = false;
                s.follow = { id: null, moveTarget: true };
                setFocus({ type: 'none' });
            }
            // The solar system fades out as the camera leaves it
            solarFade = solar ? solar.fadeForDistance(camera.position.length() * AU_PER_LY) : 0;
            solar?.setFade(solarFade);
            solarLayer.visible = solarFade > 0 && optionsRef.current.showPlanets;
            cloud?.setFade(solarFade);
            cloud?.setCameraDistance(camera.position.length() * AU_PER_LY);
            oort.setVisible(optionsRef.current.showOort);
            oort.update(camera.position.length());
            galaxy.setVisible(optionsRef.current.showGalaxy);
            galaxy.update(camera.position, mount.clientHeight, camera.fov);
            if (solar) solarLayer.near = solarNearPlane();
            starDisc.update(camera, mount.clientHeight);
            syncCameras();
            setStarCamera(starCameraUniforms, starCamera.position);
            solar?.updateMinorMoonFade(solarCamera.position, mount.clientHeight, camera.fov);
            solar?.updateTextures(solarCamera.position, mount.clientHeight, camera.fov);
            solar?.updateRingView(solarCamera.position);
            updateBodyRings();
            if (s.haze) {
                syncLayerPasses(layerPasses, layers);
                composer.render();
            } else {
                renderLayers(renderer, layers);
            }
            updateLabels();
            updateScaleBar();
            // Update the distance readout directly to avoid a React render per frame
            const distanceLabel = formatDistance(controls.target, s.earthPosition);
            if (distanceLabel !== lastDistanceLabel && distanceRef.current) {
                distanceRef.current.textContent = distanceLabel;
                lastDistanceLabel = distanceLabel;
            }
            frameId = requestAnimationFrame(animate);
        };
        frameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frameId);
            if (hoverRequest) cancelAnimationFrame(hoverRequest);
            resizeObserver.disconnect();
            canvas.removeEventListener('pointerdown', onPointerDown);
            canvas.removeEventListener('pointerup', onPointerUp);
            canvas.removeEventListener('pointermove', onPointerMove);
            canvas.removeEventListener('pointerleave', onPointerLeave);
            controls.dispose();
            [stars, gaiaStars, sun, hoverRing, selectedRing, bodyHoverRing, bodySelectedRing, earthMarkerNear, earthMarkerFar, s.selectedLines, s.allLines]
                .forEach(disposeObject);
            solar?.dispose();
            cloud?.dispose();
            oort.dispose();
            galaxy.dispose();
            starDisc.dispose();
            bloomPass.dispose();
            composer.dispose();
            renderer.dispose();
            mount.removeChild(canvas);
            labelsEl.replaceChildren();
            sceneRef.current = null;
        };
    }, [starBuffers, gaiaBuffers, lineStarInfo, constellationData, planetFacts, moonsData, smallBodies]);

    // Fly back to Earth and orbit a constellation, so you see its figure as
    // in the night sky; dragging then shows it in 3D
    const viewConstellation = (abbrev) => {
        const s = sceneRef.current;
        if (!s) return;
        s.setFollow('Earth', false);
        s.flyTo(s.earthPosition.toArray(), constellationFocus(constellationData[abbrev], starBuffers));
        setFocus({ type: 'constellation' });
    };

    // R / Reset view: back home, orbiting Earth (without planets: at the
    // Sun, looking at the selected constellation or the default direction)
    const resetView = () => {
        const s = sceneRef.current;
        if (!s) return;
        const home = s.bodyPose('Earth');
        if (home) {
            s.setFollow('Earth');
            s.flyTo(home.position, home.target, home.minDistance);
            setFocus({ type: 'body', id: 'Earth' });
        } else if (selectedAbbrev) {
            viewConstellation(selectedAbbrev);
        } else {
            s.setFollow(null);
            s.flyTo([0, 0, 0], [0, 0, -500]);
            setFocus({ type: 'none' });
        }
    };

    // Fly out to a planet (see bodyPose in the setup)
    const flyToBody = (id) => {
        const s = sceneRef.current;
        const pose = s?.bodyPose(id);
        if (!pose) return;
        s.setFollow(id);
        s.flyTo(pose.position, pose.target, pose.minDistance);
        setFocus({ type: 'body', id });
    };

    // Fly to a ring feature (see ringPose in the setup), riding along with its planet
    const viewRing = (id) => {
        const s = sceneRef.current;
        const pose = s?.ringPose(id);
        if (!pose) return;
        s.setFollow(RING_FEATURES_BY_ID.get(id).planet);
        s.flyTo(pose.position, pose.target, pose.minDistance);
        setFocus({ type: 'ring', id });
    };

    // A star's radius in ly (curated or estimated), or null if unknown
    const starRadiusLy = (index) => {
        const radius = starBuffers.radius[index];
        return Number.isNaN(radius) ? null : radiusToLy(radius);
    };

    // How close the camera may zoom to a star: near its surface, or
    // ORBIT_MIN_DISTANCE if its radius is unknown
    const starMinDistance = (index) => {
        const radiusLy = starRadiusLy(index);
        return radiusLy ? radiusLy * STAR_MIN_RADII : ORBIT_MIN_DISTANCE;
    };

    // Turn to face the star without moving: it becomes the orbit target, so
    // dragging orbits it and zooming heads for it. The camera keeps riding
    // along with whatever it rode with (e.g. Earth), the target stays put.
    const focusStar = (index) => {
        const s = sceneRef.current;
        if (!s) return;
        const p = Array.from(starBuffers.positions.subarray(index * 3, index * 3 + 3));
        s.setFollow(s.follow.id, false);
        s.flyTo(s.camera.position.toArray(), p, starMinDistance(index));
        setFocus({ type: 'star', index });
    };

    // Fly out to an overview of an asteroid / comet region, switching it on
    const viewRegion = (id) => {
        const s = sceneRef.current;
        if (!s) return;
        if (id === 'oort') setShowOort(true);
        else setHiddenGroups(prev => new Set([...prev].filter(g => g !== id)));
        setShowPlanets(true);
        const pose = s.regionPose(REGION_VIEW_AU[id]);
        s.setFollow(null);
        s.flyTo(pose.position, pose.target, pose.minDistance);
        setFocus({ type: 'region', id });
        selectStar(null);
        setSelectedRegion(id);
    };

    // Stars, planets and moons: fly straight in, as their cards' buttons do
    // Fly to the galaxy, its centre or an arm, and open its card
    const viewGalaxy = (id) => {
        const s = sceneRef.current;
        if (!s) return;
        setShowGalaxy(true);
        selectStar(null);
        setSelectedGalaxy(id);
        setFocus({ type: 'galaxy', id });
        loadGalaxyData().then((data) => {
            const pose = galaxyPose(data, id);
            if (!pose || sceneRef.current !== s) return;
            s.setFollow(null);
            s.flyTo(pose.position, pose.target, pose.minDistance);
        }).catch(error => console.error('Error loading the galaxy model:', error));
    };
    // Open a galaxy card without moving (its data may still be on its way)
    const openGalaxyCard = (id) => {
        selectStar(null);
        setSelectedGalaxy(id);
        loadGalaxyData().catch(error => console.error('Error loading the galaxy model:', error));
    };

    const handleSearchSelect = (item) => {
        if (item.type === 'galaxy') {
            viewGalaxy(item.id);
        } else if (item.type === 'region') {
            viewRegion(item.id);
        } else if (item.type === 'constellation') {
            setSelectedAbbrev(item.abbrev);
            viewConstellation(item.abbrev);
        } else if (item.type === 'star') {
            selectStar(item.starIndex);
            flyToStar(item.starIndex);
        } else if (item.type === 'planet') {
            revealBody(item.id);
            selectBody(item.id);
            flyToBody(item.id);
        }
    };

    // Stop just short of the star (on the Earth side), looking at it: close
    // enough that its real disc fills the view (STAR_VIEW_RADII radii out);
    // it may then be zoomed to its surface. A star with no radius estimate
    // is only approached to a few ly.
    const flyToStar = (index) => {
        const s = sceneRef.current;
        if (!s) return;
        const p = Array.from(starBuffers.positions.subarray(index * 3, index * 3 + 3));
        const earth = s.earthPosition.toArray();
        const dir = p.map((v, i) => v - earth[i]);
        const dist = Math.hypot(...dir);
        const radiusLy = starRadiusLy(index);
        const stopAt = radiusLy ? radiusLy * STAR_VIEW_RADII : Math.min(Math.max(dist * 0.05, 0.3), 15);
        const keep = 1 - stopAt / dist;
        s.setFollow(null);
        s.flyTo(dir.map((v, i) => earth[i] + v * keep), p, starMinDistance(index));
        setFocus({ type: 'star', index });
    };

    // ---------- Clock controls (the render loop advances the time) ----------
    const updateClock = (changes) => {
        Object.assign(clockRef.current, changes);
        setClockView({ ...clockRef.current });
    };
    const togglePlay = () => updateClock({ playing: !clockRef.current.playing });
    const changeSpeed = (direction) => updateClock({ rate: nextPresetRate(clockRef.current.rate, direction), playing: true });
    const setRate = (rate) => updateClock({ rate, playing: true });
    const goToNow = () => updateClock({ time: Date.now(), rate: 1, playing: true });
    const setTime = (ms) => updateClock({ time: THREE.MathUtils.clamp(ms, TIME_RANGE[0], TIME_RANGE[1]) });

    // Draw the selected constellation's stick figure (the flight to it is
    // started by whatever selected it)
    useEffect(() => {
        const s = sceneRef.current;
        if (!s) return;
        if (s.selectedLines) {
            s.scene.remove(s.selectedLines);
            disposeObject(s.selectedLines);
            s.selectedLines = null;
        }
        if (!selectedAbbrev) return;
        s.selectedLines = makeLines(
            constellationLinePositions(constellationData[selectedAbbrev], starBuffers),
            0x60a5fa,
            0.8,
            s.haze
        );
        s.selectedLines.visible = showLines;
        s.scene.add(s.selectedLines);
    }, [selectedAbbrev, starBuffers, planetFacts]);

    // Line visibility. All 88 stick figures are built on first use.
    useEffect(() => {
        const s = sceneRef.current;
        if (!s) return;
        if (s.selectedLines) s.selectedLines.visible = showLines;
        if (showLines && showAllLines && !s.allLines) {
            const flat = Object.values(constellationData)
                .flatMap(c => constellationLinePositions(c, starBuffers));
            s.allLines = makeLines(flat, 0x94a3b8, 0.25, s.haze);
            s.scene.add(s.allLines);
        }
        if (s.allLines) s.allLines.visible = showLines && showAllLines;
    }, [showLines, showAllLines, starBuffers]);

    useEffect(() => {
        sceneRef.current?.setHaze(showHaze);
    }, [showHaze, starBuffers]);

    useEffect(() => {
        sceneRef.current?.solar?.setShowOrbits(showOrbits);
    }, [showOrbits, starBuffers, planetFacts, moonsData]);

    useEffect(() => {
        sceneRef.current?.solar?.setShowMinorMoons(showSmallMoons);
    }, [showSmallMoons, starBuffers, planetFacts, moonsData]);


    // Viewing the "Comets" region draws every comet's orbit, named and in
    // the cloud, until the view moves on
    useEffect(() => {
        const s = sceneRef.current;
        const on = selectedRegion === 'comet' || (focus.type === 'region' && focus.id === 'comet');
        s?.cloud?.setGroupOrbits('comet', on);
        s?.solar?.setCometOrbits(on);
    }, [focus, selectedRegion, starBuffers, planetFacts, moonsData, smallBodies]);

    useEffect(() => {
        const cloud = sceneRef.current?.cloud;
        for (const [group, parts] of Object.entries(smallBodies?.meta.subgroup_ids ?? {})) {
            for (const part of parts) cloud?.setPartVisible(group, part, !hiddenParts.has(`${group}:${part}`));
        }
        sceneRef.current?.solar?.setHiddenParts(hiddenParts);
    }, [hiddenParts, starBuffers, planetFacts, moonsData, smallBodies]);

    // Going to a named small body: make sure it's shown (named bodies on,
    // its region part on)
    const revealBody = (id) => {
        const solar = sceneRef.current?.solar;
        const key = solar?.byId.get(id) && solar.partKey(solar.byId.get(id));
        if (!key) return;
        setShowSmallBodies(true);
        setHiddenParts(prev => (prev.has(key) ? new Set([...prev].filter(k => k !== key)) : prev));
    };

    // "Asteroids & comets": on if anything in it is shown; switching it
    // turns everything in it on or off (each can then be switched alone)
    const smallGroupIds = (smallBodies?.meta.groups ?? []).map(g => g.id);
    const smallParts = [showSmallBodies, showOort, ...smallGroupIds.filter(id => id !== 'other').map(id => !hiddenGroups.has(id))];
    const smallAnyOn = smallParts.some(Boolean);
    const smallAllOn = smallParts.every(Boolean);
    const setAllSmallBodies = (on) => {
        setShowSmallBodies(on);
        setShowOort(on);
        setHiddenGroups(on ? new Set() : new Set(smallGroupIds));
    };
    const masterBoxRef = useRef(null);
    useEffect(() => {
        if (masterBoxRef.current) masterBoxRef.current.indeterminate = smallAnyOn && !smallAllOn;
    });

    useEffect(() => {
        sceneRef.current?.solar?.setShowSmallBodies(showSmallBodies);
    }, [showSmallBodies, starBuffers, planetFacts, moonsData, smallBodies]);

    useEffect(() => {
        const cloud = sceneRef.current?.cloud;
        if (!cloud) return;
        for (const { id } of smallBodies.meta.groups) cloud.setGroupVisible(id, !hiddenGroups.has(id));
    }, [hiddenGroups, starBuffers, planetFacts, moonsData, smallBodies]);

    // All 1.5 million asteroids: the big tier is fetched on first use (once;
    // later toggles and rebuilt scenes reuse it), then drawn whenever on
    const moreTierRef = useRef(null);  // Promise of its Uint16Array (or null on failure)
    useEffect(() => {
        const cloud = sceneRef.current?.cloud;
        if (!cloud) return;
        cloud.setTierVisible(1, showAllAsteroids);
        if (!showAllAsteroids || cloud.hasTier(1)) return;
        if (!moreTierRef.current) {
            setMoreTier('loading');
            moreTierRef.current = fetch(`${import.meta.env.BASE_URL}data/${smallBodies.meta.tiers[1].file}`)
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load more asteroids: ${response.statusText}`);
                    return response.arrayBuffer();
                })
                .then(buffer => {
                    setMoreTier('loaded');
                    const count = smallBodies.meta.tiers[1].count;
                    return { rows: new Uint16Array(buffer, 0, count * 6), parts: new Uint8Array(buffer, count * 12, count) };
                })
                .catch(error => {
                    console.error('Error loading more asteroids:', error);
                    moreTierRef.current = null;  // a later toggle tries again
                    setMoreTier('error');
                    setShowAllAsteroids(false);
                    return null;
                });
        }
        // Added even if switched off meanwhile: it stays hidden until on
        moreTierRef.current.then(data => {
            if (data && sceneRef.current?.cloud === cloud) cloud.addTier(1, data.rows, data.parts);
        });
    }, [showAllAsteroids, starBuffers, planetFacts, moonsData, smallBodies]);

    // Ring around the selected star or planet
    useEffect(() => {
        const s = sceneRef.current;
        if (!s) return;
        const i = selectedStar;
        placeRing(s.selectedRing, i === null ? null : starBuffers.positions.subarray(i * 3, i * 3 + 3));
        placeRing(s.bodySelectedRing, selectedBody && s.solar ? s.solar.byId.get(selectedBody).position.toArray() : null);
        s.selectedBodyId = selectedBody;  // the render loop keeps the ring on it as time runs
        s.solar?.setHighlightOrbit(selectedBody);
    }, [selectedStar, selectedBody, starBuffers, planetFacts, moonsData]);

    // Keyboard: Esc closes the card and clears the selection (it never leaves
    // the 3D view: the Back button does). L lines, N names, R reset.
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.target.tagName === 'SELECT' || e.target.tagName === 'INPUT') {
                if (e.code !== 'Escape') return;
            }
            if (e.code === 'Escape') selectStar(null);  // clears every selection
            if (e.code === 'KeyL') setShowLines(prev => !prev);
            if (e.code === 'KeyN') setShowLabels(prev => !prev);
            if (e.code === 'KeyR') resetView();
            if (e.code === 'Space') {
                e.preventDefault();  // no page scroll / button press
                togglePlay();
            }
            if (e.code === 'BracketLeft') changeSpeed(-1);
            if (e.code === 'BracketRight') changeSpeed(1);
            if (e.code === 'KeyT') goToNow();
            if (e.code === 'KeyH') setShowHaze(prev => !prev);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    });

    if (!stars3d) {
        return (
            <div className="universe-3d-screen universe-3d-error">
                <button className="back-button" onClick={onBack}>← Back</button>
                <p>Failed to load the 3D star catalogue.</p>
            </div>
        );
    }

    const selected = selectedAbbrev ? constellationData[selectedAbbrev] : null;
    const star = selectedStar !== null ? starRecord(starBuffers, selectedStar) : null;
    const solar = sceneRef.current?.solar;
    const body = selectedBody !== null && solar ? solar.byId.get(selectedBody) : null;
    const ring = selectedRing !== null ? RING_FEATURES_BY_ID.get(selectedRing) : null;
    // Current distances (AU), for the card
    const bodyDistances = body && {
        sun: body.position.length(),
        earth: body.position.distanceTo(solar.byId.get('Earth').position),
        parent: body.parentId ? body.position.distanceTo(solar.byId.get(body.parentId).position) : null,
    };

    // Footer: what the view is centred on
    // (nothing when the view isn't centred on anything, e.g. after panning)
    let title = null;
    let subtitle = null;
    if (focus.type === 'constellation' && selected) {
        title = selected.name;
        subtitle = selected.name_english !== selected.name ? selected.name_english : null;
    } else if (focus.type === 'body' && solar?.byId.has(focus.id)) {
        const f = solar.byId.get(focus.id).facts;
        title = f.name;
        subtitle = { star: 'Our star', planet: 'Planet', moon: `Moon of ${f.parent}`, ...SMALL_BODY_TYPE_LABELS }[f.type];
    } else if (focus.type === 'region') {
        title = SMALL_BODY_REGIONS[focus.id].label;
        subtitle = focus.id === 'oort' ? 'A model: never seen directly'
            : focus.id === 'comet' ? (
                // Key to the orbit colours
                <span className="universe-3d-key">
                    {COMET_FAMILIES.map(f => (
                        <span key={f.name}><span className="universe-3d-swatch" style={{ background: f.color }} />{f.name}</span>
                    ))}
                </span>
            )
            : 'Asteroids & comets';
    } else if (focus.type === 'galaxy') {
        title = focus.id === 'milky_way' ? 'Milky Way' : focus.id === 'centre' ? 'Galactic Centre' : ARM_LABELS[focus.id];
        // Key to the model's colours
        subtitle = (
            <span className="universe-3d-key">
                {GALAXY_KEY.map(k => (
                    <span key={k.name}><span className="universe-3d-swatch" style={{ background: k.color }} />{k.name}</span>
                ))}
            </span>
        );
    } else if (focus.type === 'ring') {
        const f = RING_FEATURES_BY_ID.get(focus.id);
        title = f.name;
        subtitle = ringSubtitle(f);
    } else if (focus.type === 'star') {
        const rec = starRecord(starBuffers, focus.index);
        const bayer = formatBayer(lineStarInfo.get(rec.hip)?.bayer);
        title = rec.name || bayer || `HIP ${rec.hip}`;
        subtitle = rec.name && bayer ? bayer : 'Star';
    }

    return (
        <div className={`universe-3d-screen ${star || body || ring || selectedRegion || (selectedGalaxy && galaxyCards) ? 'has-card' : ''}`}>
            <div className="universe-3d-canvas" ref={mountRef} />
            <div className="universe-3d-labels" ref={labelsRef} />
            <div className="universe-3d-tooltip" ref={tooltipRef} />

            <button className="back-button" onClick={onBack}>← Back</button>

            <Universe3DSearch items={searchItems} starBuffers={starBuffers} onSelect={handleSearchSelect} />

            <button
                className="universe-3d-panel-toggle"
                onClick={() => setPanelOpen(open => !open)}
                aria-expanded={panelOpen}
            >
                {panelOpen ? '✕ Close' : '☰ Options'}
            </button>

            <div className={`universe-3d-panel ${panelOpen ? 'open' : ''}`}>
                <label className="universe-3d-checkbox">
                    <input
                        type="checkbox"
                        checked={showLines}
                        onChange={(e) => setShowLines(e.target.checked)}
                    />
                    Show lines
                </label>
                <label className={`universe-3d-checkbox universe-3d-sub-option ${showLines ? '' : 'disabled'}`}>
                    <input
                        type="checkbox"
                        checked={showAllLines}
                        disabled={!showLines}
                        onChange={(e) => setShowAllLines(e.target.checked)}
                    />
                    All constellations
                </label>
                <label className="universe-3d-checkbox">
                    <input
                        type="checkbox"
                        checked={showLabels}
                        onChange={(e) => setShowLabels(e.target.checked)}
                    />
                    Show names
                </label>
                {planetFacts && (
                    <>
                        <label className="universe-3d-checkbox">
                            <input
                                type="checkbox"
                                checked={showPlanets}
                                onChange={(e) => setShowPlanets(e.target.checked)}
                            />
                            Planets
                        </label>
                        <label className={`universe-3d-checkbox universe-3d-sub-option ${showPlanets ? '' : 'disabled'}`}>
                            <input
                                type="checkbox"
                                checked={showOrbits}
                                disabled={!showPlanets}
                                onChange={(e) => setShowOrbits(e.target.checked)}
                            />
                            Orbits
                        </label>
                        {moonsData && (
                            <label
                                className={`universe-3d-checkbox universe-3d-sub-option ${showPlanets ? '' : 'disabled'}`}
                                title="Hundreds of tiny moons, shown when zoomed in on their planet"
                            >
                                <input
                                    type="checkbox"
                                    checked={showSmallMoons}
                                    disabled={!showPlanets}
                                    onChange={(e) => setShowSmallMoons(e.target.checked)}
                                />
                                Small moons
                            </label>
                        )}
                        {smallBodies && (
                            <>
                                <label
                                    className={`universe-3d-checkbox universe-3d-sub-option ${showPlanets ? '' : 'disabled'}`}
                                    title="Asteroids, comets and dwarf planets from JPL's Small-Body Database: switches everything below"
                                >
                                    <input
                                        ref={masterBoxRef}
                                        type="checkbox"
                                        checked={smallAnyOn}
                                        disabled={!showPlanets}
                                        onChange={() => setAllSmallBodies(!smallAnyOn)}
                                    />
                                    Asteroids &amp; comets
                                </label>
                                {showPlanets && (
                                    <div className="universe-3d-groups">
                                        <label
                                            className="universe-3d-checkbox universe-3d-group"
                                            title="Dwarf planets, mission targets and famous comets, with names and cards"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={showSmallBodies}
                                                onChange={(e) => setShowSmallBodies(e.target.checked)}
                                            />
                                            <span className="universe-3d-swatch" style={{ background: '#d8d2c8' }} />
                                            Named (Ceres, Halley…)
                                        </label>
                                        {smallBodies.meta.groups.filter(g => g.id !== 'other').map(g => (
                                            <label key={g.id} className="universe-3d-checkbox universe-3d-group">
                                                <input
                                                    type="checkbox"
                                                    checked={!hiddenGroups.has(g.id)}
                                                    onChange={(e) => setHiddenGroups(prev => {
                                                        const next = new Set(prev);
                                                        if (e.target.checked) next.delete(g.id);
                                                        else next.add(g.id);
                                                        return next;
                                                    })}
                                                />
                                                <span className="universe-3d-swatch" style={{ background: SMALL_BODY_GROUP_COLORS[g.id] }} />
                                                {g.name}
                                            </label>
                                        ))}
                                        <label
                                            className="universe-3d-checkbox universe-3d-group"
                                            title="Where long-period comets come from, out to ~1.6 light-years: never seen, drawn from the usual model"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={showOort}
                                                onChange={(e) => setShowOort(e.target.checked)}
                                            />
                                            <span className="universe-3d-swatch" style={{ background: '#9fb4d8' }} />
                                            Oort cloud (model)
                                        </label>
                                        <label
                                            className="universe-3d-checkbox universe-3d-group"
                                            title={`Adds ${smallBodies.meta.tiers[1].count.toLocaleString()} smaller asteroids (a ${Math.round(smallBodies.meta.tiers[1].count * 12 / 1e6)} MB download, heavy for phones)`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={showAllAsteroids}
                                                disabled={moreTier === 'loading'}
                                                onChange={(e) => setShowAllAsteroids(e.target.checked)}
                                            />
                                            {moreTier === 'loading' ? 'Loading…' : `All ${((smallBodies.meta.tiers[0].count + smallBodies.meta.tiers[1].count) / 1e6).toFixed(1)} million`}
                                            {moreTier === 'error' && <span className="universe-3d-error-note"> (failed)</span>}
                                        </label>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
                <div className="universe-3d-option-row">
                    <label
                        className="universe-3d-checkbox"
                        title="Fly out past the stars to see it: the bar, arms and dust drawn from published measurements (Reid et al. 2019 and others)"
                    >
                        <input
                            type="checkbox"
                            checked={showGalaxy}
                            onChange={(e) => setShowGalaxy(e.target.checked)}
                        />
                        Milky Way (model)
                    </label>
                    <button
                        className="universe-3d-info-button"
                        onClick={() => openGalaxyCard('milky_way')}
                        title="About the Milky Way and what the model's colours mean"
                        aria-label="About the Milky Way model"
                    >
                        ?
                    </button>
                </div>
                <label className="universe-3d-checkbox">
                    <input
                        type="checkbox"
                        checked={showHaze}
                        onChange={(e) => setShowHaze(e.target.checked)}
                    />
                    Haze
                </label>
                <button className="button-secondary" onClick={() => resetView()}>Reset view</button>
            </div>

            {star && (
                <StarInfoCard
                    star={star}
                    lineInfo={lineStarInfo.get(star.hip)}
                    onClose={() => setSelectedStar(null)}
                    onFlyTo={() => flyToStar(selectedStar)}
                    onFocus={() => focusStar(selectedStar)}
                />
            )}
            {body?.smallBody && (
                <SmallBodyInfoCard
                    body={body}
                    distances={bodyDistances}
                    time={clockView.time}
                    onClose={() => setSelectedBody(null)}
                    onFlyTo={() => flyToBody(selectedBody)}
                />
            )}
            {body && !body.smallBody && (
                <PlanetInfoCard
                    body={body}
                    distances={bodyDistances}
                    time={clockView.time}
                    onClose={() => setSelectedBody(null)}
                    onFlyTo={() => flyToBody(selectedBody)}
                />
            )}
            {selectedRegion && smallBodies && solar && (
                <RegionInfoCard
                    regionId={selectedRegion}
                    meta={smallBodies.meta}
                    bodies={solar.bodies}
                    time={clockView.time}
                    hiddenParts={hiddenParts}
                    onTogglePart={(key) => setHiddenParts(prev => {
                        const next = new Set(prev);
                        if (next.has(key)) next.delete(key);
                        else next.add(key);
                        return next;
                    })}
                    onSelectBody={(id) => {
                        revealBody(id);
                        selectBody(id);
                        flyToBody(id);
                    }}
                    onClose={() => setSelectedRegion(null)}
                />
            )}
            {selectedGalaxy && galaxyCards && (
                <GalaxyInfoCard
                    id={selectedGalaxy}
                    cards={galaxyCards}
                    onSelect={openGalaxyCard}
                    onView={() => viewGalaxy(selectedGalaxy)}
                    onClose={() => setSelectedGalaxy(null)}
                />
            )}
            {ring && (
                <RingInfoCard
                    feature={ring}
                    onClose={() => setSelectedRing(null)}
                    onView={() => viewRing(selectedRing)}
                />
            )}

            {planetFacts && (
                <Universe3DTimeBar
                    time={clockView.time}
                    rate={clockView.rate}
                    playing={clockView.playing}
                    onTogglePlay={togglePlay}
                    onStep={changeSpeed}
                    onSetRate={setRate}
                    onNow={goToNow}
                    onSetTime={setTime}
                />
            )}

            <div
                className="universe-3d-scale"
                title="Scale at the orbit point (screen centre)"
            >
                <div ref={scaleLabelRef} className="universe-3d-scale-label" />
                <div ref={scaleBarRef} className="universe-3d-scale-bar" />
            </div>

            <div className="universe-3d-footer">
                {title && <div className="universe-3d-title">{title}</div>}
                {title && subtitle && <div className="universe-3d-subtitle">{subtitle}</div>}
                <div ref={distanceRef} className="universe-3d-distance" />
                <div className="universe-3d-hint">
                    Click a star, planet or ring name for details · Drag to rotate · Scroll to zoom
                </div>
            </div>
        </div>
    );
}

export default Universe3D;
