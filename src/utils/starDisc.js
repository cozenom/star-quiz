// Real-size star discs. Every star has a radius (starBuffers.radius): the
// curated one (stars_3d.json "radii", from Star_Data/curated/star_radii.json)
// where known, else an estimate from its brightness and colour.
//
// Seen from afar a star is a sprite whose size only says how bright it is.
// Close up, its true disc is drawn as well: a sphere in its own scale layer
// (AU, origin at the star, see layers3d), so it stays precise however far
// the star is from the Sun. Only the star that looks biggest from the
// camera gets one; discs only show within a fraction of a light-year of a
// star, and stars are light-years apart. The sprite stays in the star layer
// behind it, so a small disc keeps its glow.

import * as THREE from 'three';
import { createLayer } from './layers3d';
import { AU_PER_LY, KM_PER_AU } from './universe3d';

export const SUN_RADIUS_KM = 695700;

// The disc is drawn once it is this many px in radius
const MIN_DISC_PX = 0.5;
// Limb darkening: the edge is (1 - LIMB_DARKENING) as bright as the centre
// (a linear law; ~0.6 for Sun-like stars in visible light)
const LIMB_DARKENING = 0.6;

// Brightest at the centre, darker towards the edge (mu = cos of the angle
// between the surface normal and the line of sight). Colour handling as in
// the star shader: the sRGB tint made linear.
const discVertexShader = `
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = normalize(-mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const discFragmentShader = `
    uniform vec3 uColor;
    varying vec3 vNormal;
    varying vec3 vView;
    void main() {
        float mu = clamp(dot(normalize(vNormal), normalize(vView)), 0.0, 1.0);
        vec3 color = uColor * (1.0 - ${LIMB_DARKENING.toFixed(2)} * (1.0 - mu));
        gl_FragColor = vec4(pow(color, vec3(2.2)), 1.0);
    }
`;

export const radiusToLy = (radiusSun) => radiusSun * SUN_RADIUS_KM / KM_PER_AU / AU_PER_LY;

// starBuffers: from buildStarBuffers (positions, colors, radius)
export function createStarDisc(starBuffers) {
    const origin = new THREE.Vector3();
    const layer = createLayer({ name: 'star disc', unit: 1 / AU_PER_LY, origin: () => origin, near: 1e-6, far: 1 });
    layer.visible = false;

    const material = new THREE.ShaderMaterial({
        uniforms: { uColor: { value: new THREE.Color() } },
        vertexShader: discVertexShader,
        fragmentShader: discFragmentShader,
    });
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 32), material);
    layer.scene.add(sphere);

    const { positions, colors, radius, count } = starBuffers;
    const radiusLy = radius.map(radiusToLy);  // NaN stays NaN and is never picked

    return {
        layer,
        // Index of the star whose disc is drawn, or null
        index: null,

        // Pick the biggest-looking star and place its disc. camera: the
        // master camera (ly); viewportHeight in px.
        update(camera, viewportHeight) {
            const { x, y, z } = camera.position;
            let best = -1;
            let bestAngle = 0;
            let bestDist = 0;
            for (let i = 0; i < count; i++) {
                const dist = Math.hypot(positions[i * 3] - x, positions[i * 3 + 1] - y, positions[i * 3 + 2] - z);
                const angle = radiusLy[i] / Math.max(dist, radiusLy[i]);
                if (angle > bestAngle) {
                    best = i;
                    bestAngle = angle;
                    bestDist = dist;
                }
            }
            const pxPerRadian = viewportHeight / THREE.MathUtils.degToRad(camera.fov);
            if (best < 0 || bestAngle * pxPerRadian < MIN_DISC_PX) {
                layer.visible = false;
                this.index = null;
                return;
            }

            origin.fromArray(positions, best * 3);
            const radiusAu = radiusLy[best] * AU_PER_LY;
            const distAu = bestDist * AU_PER_LY;
            sphere.scale.setScalar(radiusAu);
            layer.near = Math.max((distAu - radiusAu) * 0.5, radiusAu * 1e-4);
            layer.far = distAu + radiusAu * 2;
            if (this.index !== best) {
                material.uniforms.uColor.value.fromArray(colors, best * 3);
                this.index = best;
            }
            layer.visible = true;
        },

        dispose() {
            sphere.geometry.dispose();
            material.dispose();
        },
    };
}
