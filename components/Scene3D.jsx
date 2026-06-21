"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  Lightformer,
  ContactShadows,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/* Stylized lipstick — procedural geometry colored from the brand's
   product photo (brick-red bullet, gold trim, champagne sleeve). */
function Lipstick() {
  return (
    <group position={[0, -0.15, 0]}>
      {/* Square case base */}
      <mesh position={[0, -0.95, 0]} castShadow>
        <boxGeometry args={[0.95, 1.25, 0.95]} />
        <meshStandardMaterial color="#7c3326" roughness={0.35} metalness={0.3} />
      </mesh>

      {/* Gold trim band */}
      <mesh position={[0, -0.31, 0]} castShadow>
        <boxGeometry args={[1.0, 0.14, 1.0]} />
        <meshStandardMaterial color="#c9974f" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Champagne sleeve */}
      <mesh position={[0, 0.27, 0]} castShadow>
        <cylinderGeometry args={[0.56, 0.6, 1.08, 48]} />
        <meshStandardMaterial color="#ecd2b0" roughness={0.28} metalness={0.5} />
      </mesh>

      {/* Gold ring at sleeve top */}
      <mesh position={[0, 0.82, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.57, 0.045, 16, 48]} />
        <meshStandardMaterial color="#c9974f" roughness={0.18} metalness={0.95} />
      </mesh>

      {/* Lipstick bullet — angled cut */}
      <mesh position={[0, 1.32, 0]} rotation={[0, 0, 0.07]} castShadow>
        <capsuleGeometry args={[0.36, 0.5, 8, 24]} />
        <meshStandardMaterial color="#9c4a3a" roughness={0.14} metalness={0.25} />
      </mesh>
    </group>
  );
}

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

/* The full composition with pointer parallax */
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
      -pointer.y * 0.22,
      0.04
    );
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.9}>
        <Lipstick />
      </Float>

      {/* Pearls scattered around */}
      <Pearl position={[1.9, 0.4, 0.5]} scale={0.22} />
      <Pearl position={[-1.7, 1.3, 0.2]} scale={0.16} color="#ecd2b0" />
      <Pearl position={[0.3, 2.0, -0.5]} scale={0.13} />
      <Pearl position={[-2.0, -0.6, 0.6]} scale={0.12} color="#f7d9de" />
      <Pearl position={[2.1, -0.9, 0.2]} scale={0.1} />
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
          position={[0, -2.1, 0]}
          opacity={0.32}
          scale={12}
          blur={2.6}
          far={4}
          color="#59293a"
        />

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
