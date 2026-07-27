'use client';

import React from 'react';
import { P } from '../palette';

// Wingback armchair in mossy velvet. Curved silhouette, tapered legs.
export function Armchair({ position = [0, 0, 0], rotation = [0, 0, 0], onPointerOver, onPointerOut, onClick, hovered }) {
  const W = 1.15;
  const D = 1.05;
  const seatY = 0.44;

  const velvetMat = (
    <meshStandardMaterial
      color={P.velvetMoss}
      roughness={0.85}
      metalness={0}
      emissive={hovered ? '#4a2810' : '#000000'}
      emissiveIntensity={hovered ? 0.35 : 0}
    />
  );
  const legMat = <meshStandardMaterial color={P.walnutDark} roughness={0.55} />;

  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
    >
      {/* seat */}
      <mesh position={[0, seatY, 0]} castShadow>
        <boxGeometry args={[W, 0.28, D]} />
        {velvetMat}
      </mesh>

      {/* seat cushion */}
      <mesh position={[0, seatY + 0.2, 0.02]} castShadow>
        <boxGeometry args={[W - 0.14, 0.16, D - 0.18]} />
        {velvetMat}
      </mesh>

      {/* backrest — tall, gently curved */}
      <mesh position={[0, seatY + 0.75, -D / 2 + 0.1]} rotation={[-0.1, 0, 0]} castShadow>
        <boxGeometry args={[W - 0.08, 1.05, 0.24]} />
        {velvetMat}
      </mesh>

      {/* wingback tops — angled panels */}
      <mesh position={[-W / 2 + 0.06, seatY + 0.9, -D / 2 + 0.35]} rotation={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.14, 0.85, 0.5]} />
        {velvetMat}
      </mesh>
      <mesh position={[W / 2 - 0.06, seatY + 0.9, -D / 2 + 0.35]} rotation={[0, -0.5, 0]} castShadow>
        <boxGeometry args={[0.14, 0.85, 0.5]} />
        {velvetMat}
      </mesh>

      {/* armrests */}
      <mesh position={[-W / 2 + 0.06, seatY + 0.16, 0.05]} castShadow>
        <boxGeometry args={[0.14, 0.3, D - 0.15]} />
        {velvetMat}
      </mesh>
      <mesh position={[W / 2 - 0.06, seatY + 0.16, 0.05]} castShadow>
        <boxGeometry args={[0.14, 0.3, D - 0.15]} />
        {velvetMat}
      </mesh>

      {/* legs */}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz], i) => (
        <mesh
          key={i}
          position={[sx * (W / 2 - 0.14), 0.18, sz * (D / 2 - 0.1)]}
          rotation={[sz * 0.14, 0, -sx * 0.14]}
          castShadow
        >
          <cylinderGeometry args={[0.045, 0.028, 0.36, 8]} />
          {legMat}
        </mesh>
      ))}
    </group>
  );
}
