import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingGeometry({ 
  position, 
  color, 
  scale = 1,
  speed = 1,
  distort = 0.3
}: { 
  position: [number, number, number]; 
  color: string; 
  scale?: number;
  speed?: number;
  distort?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  return (
    <Float
      speed={2 * speed}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.6}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 200;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
      
      const purple = new THREE.Color("#8B5CF6");
      const blue = new THREE.Color("#06B6D4");
      const mix = purple.clone().lerp(blue, Math.random());
      
      colors[i3] = mix.r;
      colors[i3 + 1] = mix.g;
      colors[i3 + 2] = mix.b;
    }
    
    return { positions, colors };
  }, []);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

function GradientMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[30, 30, 32, 32]} />
      <meshBasicMaterial
        color="#1a1a2e"
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06B6D4" />
      
      <FloatingGeometry 
        position={[-4, 2, -2]} 
        color="#8B5CF6" 
        scale={0.8}
        speed={0.8}
      />
      <FloatingGeometry 
        position={[4, -1, -3]} 
        color="#06B6D4" 
        scale={0.6}
        speed={1.2}
        distort={0.4}
      />
      <FloatingGeometry 
        position={[2, 3, -4]} 
        color="#A78BFA" 
        scale={0.5}
        speed={0.6}
        distort={0.2}
      />
      <FloatingGeometry 
        position={[-3, -2, -2]} 
        color="#22D3EE" 
        scale={0.4}
        speed={1}
        distort={0.5}
      />
      
      <ParticleField />
      <GradientMesh />
    </>
  );
}

export function ThreeBackground() {
  return (
    <div 
      className="absolute inset-0 -z-10"
      data-testid="three-background"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
