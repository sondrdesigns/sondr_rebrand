'use client';

import React from 'react';
import { P } from './palette';

// Room dimensions — MCM lounges tend to be low + wide.
const W = 14;
const D = 12;
const H = 5.2;

function Wall({ position, rotation, size, color }) {
  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.95} metalness={0} />
    </mesh>
  );
}

function HerringboneFloor() {
  // Floor is a single plane with a subtle multi-tone material. We fake
  // herringbone with light-catching normal noise from the material — the
  // painterly post pass will haze any sharp geometry anyway.
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[W * 1.6, D * 1.6, 40, 40]} />
      <meshStandardMaterial
        color={P.floorWood}
        roughness={0.75}
        metalness={0.05}
      />
    </mesh>
  );
}

function Rug() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0.6]} receiveShadow>
      <planeGeometry args={[7, 5]} />
      <meshStandardMaterial color={P.rug} roughness={1} metalness={0} />
    </mesh>
  );
}

function Window() {
  // A tall casement on the left wall. The pane is a self-lit plane —
  // "dusk sky" seen through the window. Bloom will haze it.
  const paneW = 3.4;
  const paneH = 3.4;
  const x = -W / 2 + 0.02;
  const y = H * 0.55;
  const z = -1.2;
  const frame = 0.14;

  return (
    <group position={[x, y, z]} rotation={[0, Math.PI / 2, 0]}>
      {/* dusk sky pane (self-lit) */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[paneW, paneH]} />
        <meshBasicMaterial color={'#8a6a58'} toneMapped={false} />
      </mesh>
      {/* horizon warmth */}
      <mesh position={[0, -paneH * 0.15, 0.02]}>
        <planeGeometry args={[paneW, paneH * 0.45]} />
        <meshBasicMaterial color={'#c8815a'} toneMapped={false} transparent opacity={0.7} />
      </mesh>
      {/* mullion cross */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[frame, paneH, 0.06]} />
        <meshStandardMaterial color={'#1a120c'} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[paneW, frame, 0.06]} />
        <meshStandardMaterial color={'#1a120c'} roughness={0.9} />
      </mesh>
      {/* casing */}
      <mesh position={[0, paneH / 2 + frame, 0.05]}>
        <boxGeometry args={[paneW + frame * 2, frame * 1.5, 0.08]} />
        <meshStandardMaterial color={'#1a120c'} roughness={0.9} />
      </mesh>
      <mesh position={[0, -paneH / 2 - frame, 0.05]}>
        <boxGeometry args={[paneW + frame * 2, frame * 1.5, 0.08]} />
        <meshStandardMaterial color={'#1a120c'} roughness={0.9} />
      </mesh>
      <mesh position={[-paneW / 2 - frame, 0, 0.05]}>
        <boxGeometry args={[frame * 1.5, paneH + frame * 2, 0.08]} />
        <meshStandardMaterial color={'#1a120c'} roughness={0.9} />
      </mesh>
      <mesh position={[paneW / 2 + frame, 0, 0.05]}>
        <boxGeometry args={[frame * 1.5, paneH + frame * 2, 0.08]} />
        <meshStandardMaterial color={'#1a120c'} roughness={0.9} />
      </mesh>
    </group>
  );
}

function FramedArt({ position, rotation, size = [1.6, 2.0], tint = '#3a5060', accent = '#a8763a' }) {
  const [w, h] = size;
  return (
    <group position={position} rotation={rotation}>
      {/* frame */}
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[w + 0.12, h + 0.12, 0.06]} />
        <meshStandardMaterial color={'#1e140c'} roughness={0.6} />
      </mesh>
      {/* canvas — impressionist wash: two overlapping tinted planes */}
      <mesh position={[0, 0, 0.065]}>
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial color={tint} toneMapped={false} />
      </mesh>
      <mesh position={[0, -h * 0.15, 0.066]}>
        <planeGeometry args={[w * 0.9, h * 0.5]} />
        <meshBasicMaterial color={accent} toneMapped={false} transparent opacity={0.55} />
      </mesh>
      <mesh position={[w * 0.15, h * 0.2, 0.067]}>
        <planeGeometry args={[w * 0.5, h * 0.35]} />
        <meshBasicMaterial color={'#c9a67a'} toneMapped={false} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export function Room() {
  return (
    <group>
      {/* back wall */}
      <Wall
        position={[0, H / 2, -D / 2]}
        rotation={[0, 0, 0]}
        size={[W, H]}
        color={P.wallTop}
      />
      {/* left wall (has window) */}
      <Wall
        position={[-W / 2, H / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        size={[D, H]}
        color={P.wallAccent}
      />
      {/* right wall */}
      <Wall
        position={[W / 2, H / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        size={[D, H]}
        color={P.wallTop}
      />
      {/* ceiling */}
      <mesh position={[0, H, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color={P.ceiling} roughness={1} />
      </mesh>

      <HerringboneFloor />
      <Rug />
      <Window />

      {/* back wall art — impressionist wash */}
      <FramedArt
        position={[3.2, H * 0.58, -D / 2 + 0.05]}
        rotation={[0, 0, 0]}
        size={[2.0, 1.4]}
        tint={'#2f4a55'}
        accent={'#b4794a'}
      />
      <FramedArt
        position={[-2.6, H * 0.60, -D / 2 + 0.05]}
        rotation={[0, 0, 0]}
        size={[1.2, 1.6]}
        tint={'#4a3e52'}
        accent={'#a0805a'}
      />
    </group>
  );
}

export const ROOM_DIMS = { W, D, H };
