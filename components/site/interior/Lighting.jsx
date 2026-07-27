'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { P } from './palette';

export function Lighting() {
  const flickerRef = useRef(null);

  // Subtle lamp flicker — barely perceptible, adds life.
  useFrame((state) => {
    if (!flickerRef.current) return;
    const t = state.clock.elapsedTime;
    flickerRef.current.intensity =
      6.8 + Math.sin(t * 3.1) * 0.18 + Math.sin(t * 7.7) * 0.12;
  });

  return (
    <>
      {/* Ambient teal fill — the shadow tone of the whole scene */}
      <ambientLight color={P.ambientTeal} intensity={0.28} />

      {/* Warm key point light — inside the lamp shade position. This is the star. */}
      <pointLight
        ref={flickerRef}
        position={[-4.2, 2.2, 1.4]}
        color={P.lampWarm}
        intensity={6.8}
        distance={12}
        decay={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Cool moonlight through the window — directional */}
      <directionalLight
        position={[-8, 4, 0]}
        color={P.moonlight}
        intensity={0.55}
        castShadow={false}
      />

      {/* Wall wash bounce, warm — imagined bounce off the floor */}
      <pointLight
        position={[0, 0.4, 2]}
        color={'#a86c3a'}
        intensity={0.9}
        distance={7}
        decay={2}
      />

      {/* Fog gives depth — makes everything past mid-room haze into teal */}
      <fog attach="fog" args={[P.fog, 6, 22]} />
    </>
  );
}
