'use client';

import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { ACESFilmicToneMapping, PCFSoftShadowMap } from 'three';

import { Room } from './Room';
import { Lighting } from './Lighting';
import { CameraRig } from './Camera';
import { Postprocess } from './Postprocess';
import { Sofa } from './pieces/Sofa';
import { Armchair } from './pieces/Armchair';
import { CoffeeTable } from './pieces/CoffeeTable';
import { SideTable } from './pieces/SideTable';
import { FloorLamp } from './pieces/FloorLamp';
import { Bookshelf } from './pieces/Bookshelf';

// Piece registry — placement + close-up camera framing per piece.
// pos: piece world position | camera pos+look for click-focus shot
const PIECES = [
  {
    id: 'sofa',        category: 'seating',  label: 'sofa',
    pos: [0, 0, -3.4], rot: [0, 0, 0],
    Component: Sofa,
    focus: { pos: [0, 1.4, -0.5], look: [0, 0.9, -3.2] },
  },
  {
    id: 'coffee-table', category: 'tables',  label: 'coffee table',
    pos: [0, 0, -1.3], rot: [0, 0.2, 0],
    Component: CoffeeTable,
    focus: { pos: [0, 1.2, 1.4], look: [0, 0.4, -1.3] },
  },
  {
    id: 'armchair',    category: 'seating',  label: 'armchair',
    pos: [-2.4, 0, 0.4], rot: [0, 0.7, 0],
    Component: Armchair,
    focus: { pos: [-0.6, 1.3, 2.4], look: [-2.4, 0.7, 0.4] },
  },
  {
    id: 'side-table',  category: 'tables',   label: 'side table',
    pos: [-3.5, 0, -1.4], rot: [0, 0, 0],
    Component: SideTable,
    focus: { pos: [-2.0, 1.2, 0.4], look: [-3.5, 0.5, -1.4] },
  },
  {
    id: 'floor-lamp',  category: 'lighting', label: 'floor lamp',
    pos: [-4.4, 0, 1.4], rot: [0, 0.3, 0],
    Component: FloorLamp,
    focus: { pos: [-2.2, 2.0, 3.4], look: [-3.6, 1.8, 1.4] },
  },
  {
    id: 'bookshelf',   category: 'storage',  label: 'bookshelf',
    pos: [3.8, 0, -3.2], rot: [0, -0.35, 0],
    Component: Bookshelf,
    focus: { pos: [1.4, 1.6, -0.6], look: [3.8, 1.3, -3.2] },
  },
];

function Piece({ piece, hovered, onHover, onSelect }) {
  const { Component, pos, rot, id, label } = piece;
  return (
    <Component
      position={pos}
      rotation={rot}
      hovered={hovered === id}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(null);
        document.body.style.cursor = '';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(piece);
      }}
    />
  );
}

export function Lounge({ onSelectPiece, focusedId }) {
  const [hovered, setHovered] = useState(null);

  const focus = useMemo(() => {
    const p = PIECES.find((x) => x.id === focusedId);
    return p ? p.focus : null;
  }, [focusedId]);

  return (
    <Canvas
      shadows={{ type: PCFSoftShadowMap }}
      gl={{
        antialias: true,
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      dpr={[1, 1.75]}
      camera={{ fov: 42, near: 0.1, far: 60, position: [2.6, 1.9, 5.4] }}
      style={{ background: '#0e1518' }}
    >
      <CameraRig focus={focus} />
      <Lighting />
      <Room />
      {PIECES.map((p) => (
        <Piece
          key={p.id}
          piece={p}
          hovered={hovered}
          onHover={setHovered}
          onSelect={(piece) => onSelectPiece(piece)}
        />
      ))}
      <Postprocess />
    </Canvas>
  );
}

export { PIECES };
