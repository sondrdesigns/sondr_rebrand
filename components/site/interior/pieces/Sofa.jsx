'use client';

import React from 'react';
import { P } from '../palette';

// 3-cushion MCM sofa: walnut base, cream boucle cushions, tapered legs.
export function Sofa({ position = [0, 0, 0], rotation = [0, 0, 0], onPointerOver, onPointerOut, onClick, hovered }) {
  const seatY = 0.46;
  const backY = 1.05;
  const W = 3.2;
  const D = 1.1;

  const legMat = <meshStandardMaterial color={P.walnutDark} roughness={0.55} metalness={0.1} />;
  const woodMat = <meshStandardMaterial color={P.walnutMid} roughness={0.6} metalness={0.05} />;
  const boucleMat = (
    <meshStandardMaterial
      color={P.boucleCream}
      roughness={1}
      metalness={0}
      emissive={hovered ? '#3a2810' : '#000000'}
      emissiveIntensity={hovered ? 0.35 : 0}
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
      {/* walnut base plinth */}
      <mesh position={[0, seatY - 0.14, 0]} castShadow receiveShadow>
        <boxGeometry args={[W - 0.1, 0.18, D - 0.05]} />
        {woodMat}
      </mesh>

      {/* seat cushions x3 */}
      {[-1, 0, 1].map((i) => (
        <mesh key={i} position={[i * (W / 3.05), seatY + 0.06, 0]} castShadow>
          <boxGeometry args={[W / 3.15, 0.22, D - 0.15]} />
          {boucleMat}
        </mesh>
      ))}

      {/* backrest cushions x3 */}
      {[-1, 0, 1].map((i) => (
        <mesh key={'b' + i} position={[i * (W / 3.05), backY, -D / 2 + 0.12]} rotation={[-0.08, 0, 0]} castShadow>
          <boxGeometry args={[W / 3.15, 0.9, 0.22]} />
          {boucleMat}
        </mesh>
      ))}

      {/* armrests — low, MCM style */}
      <mesh position={[-W / 2 + 0.06, seatY + 0.1, 0]} castShadow>
        <boxGeometry args={[0.15, 0.32, D]} />
        {woodMat}
      </mesh>
      <mesh position={[W / 2 - 0.06, seatY + 0.1, 0]} castShadow>
        <boxGeometry args={[0.15, 0.32, D]} />
        {woodMat}
      </mesh>

      {/* tapered legs — 4 corners, splayed */}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz], i) => (
        <mesh
          key={'l' + i}
          position={[sx * (W / 2 - 0.15), 0.2, sz * (D / 2 - 0.1)]}
          rotation={[sz * 0.14, 0, -sx * 0.14]}
          castShadow
        >
          <cylinderGeometry args={[0.05, 0.03, 0.4, 8]} />
          {legMat}
        </mesh>
      ))}
    </group>
  );
}
