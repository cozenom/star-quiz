// The star sprite: how the 3D view draws a point of light from its apparent
// magnitude. The stars use it (Universe3D) and so do the planets and our
// Moon seen from afar (solarSystem3d), so a planet and a star of the same
// magnitude look the same.
//
// Brighter means a bigger sprite; brighter than mag ~2 it also gets a wide
// halo (vGlow). Fainter than the eye (~6.5) it fades to uMinAlpha. Colours
// are sRGB tints made linear, for the linear-light composer, so the faint
// halos of thousands of stars add up to a glow. With glow following
// brightness, bright ones get a spike (vGlare, see Universe3D's GLARE_MAG)
// that only the bloom shows. Drawn with additive blending.

// Opacity of points too faint to see (uMinAlpha's usual value)
export const STAR_MIN_ALPHA = 0.12;
// Sprite size cap (uMaxSize's usual value, CSS px, before the halo)
export const SPRITE_MAX_SIZE_PX = 24;
// The spike's light, relative to a point at the glare magnitude, grows in
// proportion up to GLARE_KNEE (Sirius, with the glow starting at mag 1),
// then only with its log, as an eye's dazzle levels off, up to GLARE_MAX.
// In proportion all the way, Venus got 13x Sirius's glow and the Sun
// whited out the screen.
const GLARE_KNEE = 10;
const GLARE_MAX = 50;
// Spike width (device px). The bloom samples the image at half resolution
// and then thresholds it: a narrower spike is split between up to four of
// those texels depending on where it falls, so its glow pulses as the view
// moves. 2 px is one half-resolution texel.
const GLARE_SIGMA_PX = 2.0;

const VARYINGS = `
    varying vec3 vColor;
    varying float vAlpha;
    varying float vGlow;
    varying float vGlare;
    varying float vSize;
`;

// Vertex stage: spriteFromMagnitude(mag, sRGB tint) sets gl_PointSize and
// the varyings
export const SPRITE_VERTEX_GLSL = `
    uniform float uPixelRatio;
    uniform float uMaxSize;
    uniform float uMinAlpha;
    uniform float uGlare;  // the spike's peak while glow follows brightness, else 0
    uniform float uGlareMag;
    ${VARYINGS}

    void spriteFromMagnitude(float mag, vec3 tint) {
        vGlow = clamp((2.0 - mag) / 5.0, 0.0, 1.0);
        float size = clamp(2.0 + (6.5 - mag) * 1.3, 1.5, uMaxSize) * (1.0 + vGlow * 2.0);
        gl_PointSize = size * uPixelRatio;
        vSize = gl_PointSize;
        vAlpha = max(smoothstep(7.5, 5.0, mag), uMinAlpha);
        // The light relative to a point at uGlareMag, levelling off above
        // the knee, phased in over the magnitude above uGlareMag
        float light = pow(10.0, -0.4 * (mag - uGlareMag));
        if (light > ${GLARE_KNEE.toFixed(1)}) light = ${GLARE_KNEE.toFixed(1)} * (1.0 + log(light / ${GLARE_KNEE.toFixed(1)}));
        vGlare = uGlare * min(light, ${GLARE_MAX.toFixed(1)})
            * (1.0 - smoothstep(uGlareMag - 1.0, uGlareMag, mag));
        vColor = pow(tint, vec3(2.2));  // sRGB tint -> linear
    }
`;

// Fragment stage: sprite() is this fragment's light (rgb, for additive
// blending's rgb * alpha) and alpha; alpha 0 where nothing shows
export const SPRITE_FRAGMENT_GLSL = `
    ${VARYINGS}

    vec4 sprite() {
        float r = length(gl_PointCoord - 0.5) * 2.0;
        // Sprite grows with vGlow, so tighten the core to keep it the same size
        float coreScale = (1.0 + vGlow * 2.0) * (1.0 + vGlow * 2.0);
        float core = exp(-r * r * 8.0 * coreScale);
        float halo = 0.35 * exp(-r * r * 2.5 * coreScale) + vGlow * 0.3 * exp(-r * r * 4.0);
        float alpha = (core + halo) * vAlpha;
        // Glare spike, brighter than white: the screen clips it, so only the
        // bloom shows it. rPx in device px.
        float rPx = r * vSize * 0.5;
        float spike = vGlare * exp(-rPx * rPx * ${(1 / (2 * GLARE_SIGMA_PX ** 2)).toFixed(4)});
        if (alpha + spike < 0.01) return vec4(0.0);
        // The sprite plus the spike
        return vec4(vColor * (1.0 + spike / max(alpha, 1e-6)), alpha);
    }
`;
