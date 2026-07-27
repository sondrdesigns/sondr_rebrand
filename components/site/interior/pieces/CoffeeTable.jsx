'use client';

import React from 'react';
import { P } from '../palette';

// Boomerang walnut coffee table on hairpin legs.
export function CoffeeTable({ position = [0, 0, 0], rotation = [0, 0, 0], onPointerOver, onPointerOut, onClick, hovered }) {
  const woodMat = (
    <meshStandardMaterial
      color={P.walnutMid}
      roughness={0.5}
      metalness={0.15}
      emissive={hovered ? '#3a2010' : '#000000'}
      emissiveIntensity={hovered ? 0.28 : 0}
    />
  );
  const legMat = <meshStandardMaterial color={'#1a1310'} roughness={0.35} metalness={0.7} />;

  const topY = 0.42;

  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
    >
      {/* main slab — a rounded box with slight taper suggested by two overlapping */}
      <mesh position={[0, topY, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.09, 0.85]} />
        {woodMat}
      </mesh>
      {/* boomerang overhang lobe */}
      <mesh position={[0.35, topY, 0.15]} rotation={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.7, 0.09, 0.55]} />
        {woodMat}
      </mesh>
      <mesh position={[-0.35, topY, 0.15]} rotation={[0, -0.35, 0]} castShadow>
        <boxGeometry args={[0.7, 0.09, 0.55]} />
        {woodMat}
      </mesh>

      {/* hairpin legs — thin metal U at 4 corners */}
      {[[-0.65, -0.28], [0.65, -0.28], [-0.65, 0.28], [0.65, 0.28]].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh position={[0, topY / 2, 0]} castShadow>
            <cylinderGeometry args={[0.014, 0.014, topY, 6]} />
            {legMat}
          </mesh>
          <mesh position={[0.03, topY / 2, 0.03]} castShadow>
            <cylinderGeometry args={[0.014, 0.014, topY, 6]} />
            {legMat}
          </mesh>
        </group>
      ))}
    </group>
  );
}
