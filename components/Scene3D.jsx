"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { MTLLoader } from "three/addons/loaders/MTLLoader.js";

const MODEL_PATH = "/models/lipstick/";

/* Real product model (OBJ + MTL + texture), turntable-spun on a
   fixed tilt. No extra shapes in the canvas — lipstick only. */
function LipstickModel() {
  const spinRef = useRef();

  const materials = useLoader(MTLLoader, `${MODEL_PATH}lipstick.mtl`, (loader) => {
    loader.setResourcePath(MODEL_PATH);
  });
  const obj = useLoader(OBJLoader, `${MODEL_PATH}lipstick.obj`, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  // Upgrade the baked Phong material to a PBR material so it responds
  // nicely to the environment lighting, while keeping the original texture.
  useEffect(() => {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        const map = child.material?.map ?? null;
        child.material = new THREE.MeshStandardMaterial({
          map,
          roughness: 0.32,
          metalness: 0.12,
        });
      }
    });
  }, [obj]);

  useFrame((_, delta) => {
    if (spinRef.current) spinRef.current.rotation.y += delta * 0.28;
  });

  return (
    <group ref={spinRef}>
      {/* Fixed tilt — the lipstick leans slightly rather than standing dead upright */}
      <group rotation={[0.18, 0, 0.24]} scale={2.3}>
        <primitive object={obj} />
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
