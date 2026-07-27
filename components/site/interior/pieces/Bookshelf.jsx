'use client';

import React, { useMemo } from 'react';
import { P } from '../palette';

// Teak modular bookshelf. Books are cheap enough to be simple boxes with
// per-book color variation — no instancing needed at this count.
export function Bookshelf({ position = [0, 0, 0], rotation = [0, 0, 0], onPointerOver, onPointerOut, onClick, hovered }) {
  const W = 1.8;
  const H = 2.4;
  const D = 0.32;
  const shelves = 4; // internal shelf count (between top/bottom)

  const teakMat = (
    <meshStandardMaterial
      color={P.walnutHi}
      roughness={0.6}
      metalness={0.05}
      emissive={hovered ? '#3a1e10' : '#000000'}
      emissiveIntensity={hovered ? 0.28 : 0}
    />
  );

  // Book palette — dusty, painterly, so the shelf reads as a warm band.
  const bookColors = ['#5a2a1e', '#3a3a2a', '#684a2a', '#28323a', '#4a3a2a', '#7a5232', '#3a2a4a', '#2c3f34'];

  const books = useMemo(() => {
    const list = [];
    const shelfCount = shelves + 1; // spaces between horizontal shelves
    const shelfH = (H - 0.2) / shelfCount;
    for (let s = 0; s < shelfCount; s++) {
      const yBase = 0.1 + s * shelfH + 0.02;
      let x = -W / 2 + 0.15;
      let n = 0;
      while (x < W / 2 - 0.15 && n < 14) {
        const w = 0.06 + Math.random() * 0.05;
        const h = shelfH * (0.62 + Math.random() * 0.32);
        const color = bookColors[(s * 3 + n) % bookColors.length];
        list.push({ x: x + w / 2, y: yBase + h / 2, w, h, color });
        x += w + 0.008;
        n++;
      }
    }
    return list;
  }, []);

  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
    >
      {/* side panels */}
      <mesh position={[-W / 2, H / 2, 0]} castShadow>
        <boxGeometry args={[0.05, H, D]} />
        {teakMat}
      </mesh>
      <mesh position={[W / 2, H / 2, 0]} castShadow>
        <boxGeometry args={[0.05, H, D]} />
        {teakMat}
      </mesh>
      {/* top */}
      <mesh position={[0, H - 0.025, 0]} castShadow>
        <boxGeometry args={[W, 0.05, D]} />
        {teakMat}
      </mesh>
      {/* bottom */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[W, 0.05, D]} />
        {teakMat}
      </mesh>
      {/* back panel */}
      <mesh position={[0, H / 2, -D / 2 + 0.01]}>
        <boxGeometry args={[W - 0.05, H - 0.05, 0.02]} />
        <meshStandardMaterial color={P.walnutDark} roughness={0.9} />
      </mesh>
      {/* internal shelves */}
      {Array.from({ length: shelves }).map((_, i) => {
        const y = 0.1 + ((i + 1) * (H - 0.2)) / (shelves + 1);
        return (
          <mesh key={i} position={[0, y, 0]} castShadow>
            <boxGeometry args={[W - 0.05, 0.04, D - 0.04]} />
            {teakMat}
          </mesh>
        );
      })}
      {/* books */}
      {books.map((b, i) => (
        <mesh key={i} position={[b.x, b.y, 0.02]} castShadow>
          <boxGeometry args={[b.w, b.h, D - 0.1]} />
          <meshStandardMaterial color={b.color} roughness={0.85} />
        </mesh>
      ))}
    </group>
  );
}
