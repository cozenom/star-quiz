// The background all round the camera, for a black hole's lens pass
// (utils/blackHoleLens): rays bent off the screen (round the photon ring,
// close to a hole) look it up here instead of taking the screen's mean
// light. The far layers (the sky band's, the stars' and clusters') are
// drawn into a cube map from the camera's place, each with its own camera
// as in the view (layers3d), re-drawn only while a shadow is big enough on
// screen to need it, when the camera has moved enough to change it or
// every REDRAW_SECONDS (turning is free: the cube is fixed to the sky). The
// cube is linear light, as the view's buffer.

import * as THREE from 'three';

// Cube face size (px); phones get less
const CUBE_SIZE = { full: 512, lite: 256 };
// Re-draw when the camera has moved this far (ly: the nearest stars drawn
// in a cluster's core are ~0.05 ly off), or after this long anyway (the
// view's options, the clock)
const REDRAW_LY = 1e-4;
const REDRAW_SECONDS = 2;

// renderer; layers: the far layers to draw, far to near (layers3d
// createLayer: scene, camera, near, far, visible); hide: things in them that
// belong to the screen (the hover and selection rings). Returns
// update(cameraLy, wanted): re-draws the cube if wanted and needed;
// texture (null until drawn); dispose()
export function createLensSky(renderer, layers, { lite = false, hide = [] } = {}) {
    const target = new THREE.WebGLCubeRenderTarget(lite ? CUBE_SIZE.lite : CUBE_SIZE.full, { type: THREE.HalfFloatType, generateMipmaps: false });
    // One cube camera per layer, at that layer's camera's place
    const cubes = layers.map(layer => new THREE.CubeCamera(layer.near, layer.far, target));
    const last = new THREE.Vector3(Infinity, 0, 0);
    let lastTime = -Infinity;
    let drawn = false;
    return {
        update(cameraLy, wanted) {
            if (!wanted) return;
            const now = performance.now() / 1000;
            if (cameraLy.distanceTo(last) < REDRAW_LY && now - lastTime < REDRAW_SECONDS) return;
            last.copy(cameraLy);
            lastTime = now;
            const shown = hide.map(o => o.visible);
            hide.forEach((o) => { o.visible = false; });
            const autoClear = renderer.autoClear;
            const before = [renderer.getRenderTarget(), renderer.getActiveCubeFace(), renderer.getActiveMipmapLevel()];
            const xr = renderer.xr.enabled;
            renderer.autoClear = false;
            renderer.xr.enabled = false;
            const faces = cubes.map((cube, i) => {
                const layer = layers[i];
                // Its faces' directions (three sets them on its first update)
                if (cube.coordinateSystem !== renderer.coordinateSystem) {
                    cube.coordinateSystem = renderer.coordinateSystem;
                    cube.updateCoordinateSystem();
                }
                cube.position.copy(layer.camera.position);
                cube.updateMatrixWorld();
                for (const cam of cube.children) {
                    if (cam.near !== layer.near || cam.far !== layer.far) {
                        cam.near = layer.near;
                        cam.far = layer.far;
                        cam.updateProjectionMatrix();
                    }
                }
                return cube.children;
            });
            for (let f = 0; f < 6; f++) {
                renderer.setRenderTarget(target, f);
                renderer.clear(true, true, false);
                layers.forEach((layer, i) => {
                    if (!layer.visible) return;
                    renderer.clearDepth();
                    renderer.render(layer.scene, faces[i][f]);
                });
            }
            renderer.setRenderTarget(...before);
            renderer.autoClear = autoClear;
            renderer.xr.enabled = xr;
            hide.forEach((o, i) => { o.visible = shown[i]; });
            drawn = true;
        },
        texture: () => (drawn ? target.texture : null),
        dispose: () => target.dispose(),
    };
}
