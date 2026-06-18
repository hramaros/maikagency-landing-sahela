"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Environment,
  Lightformer,
  ContactShadows,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/* A small pearlescent sphere that drifts gently */
function Pearl({ position, scale = 0.18, color = "#fbe9ec" }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position} scale={scale} castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.08}
          metalness={0.6}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

/* The full floating composition with pointer parallax */
function Shapes() {
  const group = useRef();

  useFrame((state) => {
    const { pointer } = state;
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.4,
      0.04
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -pointer.y * 0.28,
      0.04
    );
  });

  return (
    <group ref={group}>
      {/* Central glossy rose blob */}
      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1.2}>
        <mesh castShadow scale={1.5}>
          <sphereGeometry args={[1, 96, 96]} />
          <MeshDistortMaterial
            color="#e1899a"
            roughness={0.12}
            metalness={0.35}
            distort={0.32}
            speed={1.5}
            envMapIntensity={1.3}
          />
        </mesh>
      </Float>

      {/* Rose-gold torus */}
      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.6}>
        <mesh
          position={[2.1, 1.1, -1]}
          rotation={[0.6, 0.2, 0]}
          castShadow
          scale={0.62}
        >
          <torusGeometry args={[1, 0.32, 32, 120]} />
          <meshStandardMaterial
            color="#c98a76"
            roughness={0.16}
            metalness={0.95}
            envMapIntensity={1.6}
          />
        </mesh>
      </Float>

      {/* Champagne capsule */}
      <Float speed={1.1} rotationIntensity={1.4} floatIntensity={1.3}>
        <mesh
          position={[-2.25, -0.95, -0.6]}
          rotation={[0.4, 0.3, 0.8]}
          castShadow
          scale={0.5}
        >
          <capsuleGeometry args={[0.55, 1, 16, 32]} />
          <meshStandardMaterial
            color="#ecd2b0"
            roughness={0.14}
            metalness={0.85}
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>

      {/* Pearls scattered around */}
      <Pearl position={[1.9, -1.3, 0.5]} scale={0.22} />
      <Pearl position={[-1.7, 1.55, 0.2]} scale={0.16} color="#ecd2b0" />
      <Pearl position={[0.3, 2.1, -0.5]} scale={0.13} />
      <Pearl position={[-2.65, 0.4, 0.6]} scale={0.12} color="#f7d9de" />
      <Pearl position={[2.75, 0.05, 0.2]} scale={0.1} />
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

        <Shapes />

        <ContactShadows
          position={[0, -2.6, 0]}
          opacity={0.32}
          scale={12}
          blur={2.6}
          far={4}
          color="#59293a"
        />

        {/* Self-contained environment (no external HDR fetch) */}
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
      </Suspense>
    </Canvas>
  );
}
