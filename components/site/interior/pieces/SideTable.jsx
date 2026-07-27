'use client';

import React from 'react';
import { P } from '../palette';

// Tulip-pedestal side table, brushed brass.
export function SideTable({ position = [0, 0, 0], rotation = [0, 0, 0], onPointerOver, onPointerOut, onClick, hovered }) {
  const brassMat = (
    <meshStandardMaterial
      color={P.brass}
      roughness={0.35}
      metalness={0.85}
      emissive={hovered ? '#5a3a1a' : '#000000'}
      emissiveIntensity={hovered ? 0.45 : 0}
    />
  );
  const topMat = (
    <meshStandardMaterial
      color={P.walnutHi}
      roughness={0.45}
      metalness={0.1}
      emissive={hovered ? '#3a2010' : '#000000'}
      emissiveIntensity={hovered ? 0.25 : 0}
    />
  );

  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
    >
      {/* top disc */}
      <mesh position={[0, 0.62, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.06, 32]} />
        {topMat}
      </mesh>
      {/* pedestal — tulip shape via two stacked cones */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.12, 0.42, 20]} />
        {brassMat}
      </mesh>
      {/* base */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.04, 32]} />
        {brassMat}
      </mesh>
      {/* base flare */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.14, 0.14, 20]} />
        {brassMat}
      </mesh>
    </group>
  );
}
