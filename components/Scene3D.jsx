"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

const MODEL_URL = "/models/lipstick/model.glb";

// Entrance: rises from below the frame with a settling spin, as if emerging
// from behind the marquee band beneath the hero — instead of popping in
// the instant the asset finishes loading.
const ENTRY_START_Y = -3;
const ENTRY_SPIN = Math.PI * 1.3;
const ENTRY_DURATION = 1.1;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/* Real product model (GLB, PBR), turntable-spun on a fixed tilt.
   No extra shapes in the canvas — lipstick only. The GLB is produced by the
   free3d pipeline (scripts/free3d) or converted from a source model; its
   baked texture is kept, we only nudge roughness/metalness to catch the
   environment lighting the way the hero was tuned for. */
function LipstickModel() {
  const spinRef = useRef();
  const entryRef = useRef();
  const entryProgress = useRef(0);

  const { scene } = useGLTF(MODEL_URL);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = 0.32;
          child.material.metalness = 0.12;
        }
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (spinRef.current) spinRef.current.rotation.y += delta * 0.28;

    if (entryRef.current && entryProgress.current < 1) {
      entryProgress.current = Math.min(entryProgress.current + delta / ENTRY_DURATION, 1);
      const eased = easeOutCubic(entryProgress.current);
      entryRef.current.position.y = THREE.MathUtils.lerp(ENTRY_START_Y, 0, eased);
      entryRef.current.rotation.y = THREE.MathUtils.lerp(ENTRY_SPIN, 0, eased);
    }
  });

  return (
    <group ref={spinRef}>
      <group ref={entryRef} position={[0, ENTRY_START_Y, 0]} rotation={[0, ENTRY_SPIN, 0]}>
        {/* Fixed tilt — the lipstick leans slightly rather than standing dead upright */}
        <group rotation={[0.18, 0, 0.24]} scale={2.3}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <group scale={1.6}>
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1.1}
            color="#ffd9e0"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-5, -2, 2]} intensity={0.5} color="#d8b08a" />
          <pointLight position={[0, 0, 3]} intensity={1.1} color="#ffffff" />

          <LipstickModel />

          <Environment resolution={256}>
          <Lightformer
            intensity={2}
            color="#ffd9e0"
            position={[0, 3, 4]}
            scale={[8, 4, 1]}
          />
          <Lightformer
            intensity={1.3}
            color="#d8b08a"
            position={[-4, -2, 2]}
            scale={[6, 6, 1]}
          />
          <Lightformer
            intensity={1.4}
            color="#ffffff"
            position={[4, 2, -3]}
            scale={[5, 5, 1]}
          />
        </Environment>
        </group>
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
