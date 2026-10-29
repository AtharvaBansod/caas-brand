import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function Core() {
  const g = React.useRef<THREE.Group>(null);
  const ring = React.useRef<THREE.Mesh>(null);
  useFrame((s, dt) => {
    if (g.current) { g.current.rotation.y += dt * 0.25; g.current.rotation.x = Math.sin(s.clock.elapsedTime * 0.4) * 0.15; }
    if (ring.current) ring.current.rotation.z += dt * 0.5;
  });
  return (
    <group ref={g}>
      <mesh><icosahedronGeometry args={[1.25, 1]} /><meshBasicMaterial color="#5b5bf0" wireframe transparent opacity={0.55} /></mesh>
      <mesh><icosahedronGeometry args={[0.8, 0]} /><meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} emissive="#4338ca" emissiveIntensity={0.7} /></mesh>
      <mesh ref={ring} rotation={[Math.PI / 2.4, 0, 0]}><torusGeometry args={[1.8, 0.012, 8, 160]} /><meshBasicMaterial color="#22d3ee" /></mesh>
      <mesh rotation={[Math.PI / 1.7, 0.4, 0]}><torusGeometry args={[2.1, 0.008, 8, 160]} /><meshBasicMaterial color="#f472b6" transparent opacity={0.8} /></mesh>
    </group>
  );
}

export function SecurityScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 5.2], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.6} /><pointLight position={[4, 4, 4]} intensity={30} color="#a5b4fc" />
      <Float speed={1.4} floatIntensity={0.6}><Core /></Float>
      <Sparkles count={50} scale={[7, 5, 3]} size={2.4} speed={0.3} color="#a5b4fc" />
    </Canvas>
  );
}
