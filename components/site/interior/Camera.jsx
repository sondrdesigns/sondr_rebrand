'use client';

import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const HERO_POS = new THREE.Vector3(2.6, 1.9, 5.4);
const HERO_LOOK = new THREE.Vector3(-0.4, 1.1, 0);

// Cinematic camera: idle drifts with mouse parallax; click-to-focus lerps to
// a curated close-up of the selected piece, then returns on back.
export function CameraRig({ focus }) {
  const { camera, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const targetPos = useRef(HERO_POS.clone());
  const targetLook = useRef(HERO_LOOK.clone());
  const currentLook = useRef(HERO_LOOK.clone());

  useEffect(() => {
    camera.position.copy(HERO_POS);
    camera.lookAt(HERO_LOOK);
    camera.fov = 42;
    camera.updateProjectionMatrix();
  }, [camera]);

  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width - 0.5;
      mouse.current.y = (e.clientY - rect.top) / rect.height - 0.5;
    };
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, [gl]);

  useFrame((_, delta) => {
    // Choose target based on focus
    if (focus) {
      targetPos.current.set(focus.pos[0], focus.pos[1], focus.pos[2]);
      targetLook.current.set(focus.look[0], focus.look[1], focus.look[2]);
    } else {
      // Idle hero position + gentle parallax
      const px = mouse.current.x * 0.7;
      const py = -mouse.current.y * 0.35;
      targetPos.current.set(HERO_POS.x + px, HERO_POS.y + py, HERO_POS.z);
      targetLook.current.copy(HERO_LOOK);
      // Slow breathing drift
      const t = performance.now() * 0.0002;
      targetPos.current.x += Math.sin(t) * 0.08;
      targetPos.current.y += Math.cos(t * 0.7) * 0.04;
    }

    // Smooth lerp — snappier when transitioning to/from focus
    const lerpAmt = focus ? Math.min(1, delta * 3.2) : Math.min(1, delta * 2.4);
    camera.position.lerp(targetPos.current, lerpAmt);
    currentLook.current.lerp(targetLook.current, lerpAmt);
    camera.lookAt(currentLook.current);
  });

  return null;
}
