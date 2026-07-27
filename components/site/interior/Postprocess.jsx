'use client';

import React from 'react';
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

// Painterly post-processing stack. The mood does the heavy lifting.
export function Postprocess() {
  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <Bloom
        intensity={1.35}
        luminanceThreshold={0.35}
        luminanceSmoothing={0.6}
        mipmapBlur
        radius={0.85}
      />
      <ChromaticAberration
        offset={new Vector2(0.0009, 0.0011)}
        blendFunction={BlendFunction.NORMAL}
      />
      <Noise premultiply blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.35} />
      <Vignette eskil={false} offset={0.15} darkness={0.85} />
    </EffectComposer>
  );
}
