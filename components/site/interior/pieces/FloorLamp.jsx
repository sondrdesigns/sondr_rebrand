'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { P } from '../palette';

// Arc floor lamp — brass arm sweeps up and over. The shade is emissive:
// bloom in post makes this the visual anchor of the room.
export function FloorLamp({ position = [0, 0, 0], rotation = [0, 0, 0], onPointerOver, onPointerOut, onClick, hovered }) {
  // Build the arc arm as a tube geometry along a cubic bezier
  const arcGeometry = useMemo(() => {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(0, 0.05, 0),
      new THREE.Vector3(0, 2.6, 0),
      new THREE.Vector3(0.8, 3.1, 0),
      new THREE.Vector3(1.9, 2.3, 0),
    );
    return new THREE.TubeGeometry(curve, 40, 0.028, 8, false);
  }, []);

  const brassMat = (
    <meshStandardMaterial
      color={P.brass}
      roughness={0.35}
      metalness={0.88}
      emissive={hovered ? '#6a4a20' : '#000000'}
      emissiveIntensity={hovered ? 0.4 : 0}
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
      {/* base disc */}
      <mesh position={[0, 0.03, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.06, 32]} />
        <meshStandardMaterial color={'#171310'} roughness={0.4} metalness={0.6} />
      </mesh>
      {/* base ring accent */}
      <mesh position={[0, 0.08, 0]}>
        <torusGeometry args={[0.24, 0.012, 8, 24]} />
        {brassMat}
      </mesh>

      {/* arc arm */}
      <mesh geometry={arcGeometry} castShadow>
        <meshStandardMaterial color={P.brass} roughness={0.32} metalness={0.9} />
      </mesh>

      {/* shade — cone, warm-emissive */}
      <group position={[1.9, 2.2, 0]}>
        <mesh castShadow>
          <coneGeometry args={[0.42, 0.55, 24, 1, true]} />
          <meshStandardMaterial
            color={P.lampWarm}
            emissive={P.lampGlow}
            emissiveIntensity={2.6}
            roughness={0.6}
            metalness={0}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* bulb glow ball inside — pure white-hot core drives bloom */}
        <mesh position={[0, -0.14, 0]}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshBasicMaterial color={P.lampCore} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
