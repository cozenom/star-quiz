// Scale layers for the 3D Universe mode.
//
// The GPU works in Float32 (~7 significant digits), so one scene can't hold
// both stars (1000s of ly) and satellites (km from Earth). Instead each scale
// gets its own scene in its own units, with its own origin:
//
//   Universe       ly    Sun            stars, constellation lines
//   Solar System   AU    Sun            planets, Moon, orbits          (later)
//   Earth          km    Earth centre   globe, satellites              (later)
//
// One master camera (OrbitControls drives it) lives in ly, heliocentric, in
// JS doubles and is never rendered. Each frame every layer camera copies its
// rotation and FOV and takes position (master - origin) / unit, so each layer
// keeps full precision near its own origin. Layers render far to near with a
// depth-only clear in between, so they never fight over depth.
//
// A sky background at infinity is a layer whose origin is the camera itself
// (origin: () => master.position): it turns with the view but never moves.

import * as THREE from 'three';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

const SUN = new THREE.Vector3();

// unit:   ly per layer unit (1 for ly, 1 / 63241 for AU, ...)
// origin: () => THREE.Vector3, the layer's origin in ly from the Sun
//         (omitted = the Sun); called every frame, so it can move
// near / far: clip planes in layer units. Both can be changed later
// (layer.near / layer.far): the depth buffer only has ~16 million steps
// between them, so a layer whose contents span a huge range can move its
// near plane with the camera to stay precise close by.
export function createLayer({ name, unit = 1, origin = () => SUN, near, far }) {
    const camera = new THREE.PerspectiveCamera(60, 1, near, far);
    return { name, unit, origin, near, far, scene: new THREE.Scene(), camera, visible: true };
}

// Derive a layer's camera from the master camera. Call before rendering,
// picking or projecting labels with layer.camera.
export function syncLayerCamera(layer, master) {
    const cam = layer.camera;
    cam.position.subVectors(master.position, layer.origin()).divideScalar(layer.unit);
    cam.quaternion.copy(master.quaternion);
    if (cam.fov !== master.fov || cam.aspect !== master.aspect || cam.near !== layer.near || cam.far !== layer.far) {
        cam.fov = master.fov;
        cam.aspect = master.aspect;
        cam.near = layer.near;
        cam.far = layer.far;
        cam.updateProjectionMatrix();
    }
    cam.updateMatrixWorld();
}

// One RenderPass per layer for the composer. All draw into the same
// buffer (RenderPass doesn't swap); see syncLayerPasses for the clears.
export function addLayerPasses(composer, layers) {
    const passes = layers.map((layer) => {
        const pass = new RenderPass(layer.scene, layer.camera);
        composer.addPass(pass);
        return pass;
    });
    syncLayerPasses(passes, layers);
    return passes;
}

// Match passes to layer.visible: the first drawn layer clears everything,
// later ones only depth
export function syncLayerPasses(passes, layers) {
    let first = true;
    passes.forEach((pass, i) => {
        pass.enabled = layers[i].visible;
        pass.clear = pass.enabled && first;
        pass.clearDepth = pass.enabled && !first;
        if (pass.enabled) first = false;
    });
}
