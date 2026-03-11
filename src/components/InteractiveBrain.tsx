import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/brain_hologram.glb";

function BrainModel() {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Apply holographic material to all meshes
  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    const glowRaw = rootStyle.getPropertyValue("--glow").trim() || "215 80% 60%";
    const [h = "215", s = "80%", l = "60%"] = glowRaw.split(/\s+/);
    const hVal = parseFloat(h) / 360;
    const sVal = parseFloat(s) / 100;
    const lVal = parseFloat(l) / 100;
    const color = new THREE.Color().setHSL(hVal, sVal, lVal);

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: color,
          emissive: color,
          emissiveIntensity: 0.4,
          transparent: true,
          opacity: 0.85,
          wireframe: false,
          roughness: 0.3,
          metalness: 0.6,
        });
      }
    });
  }, [scene]);

  // Auto-fit model to viewport
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3.5 / maxDim;
    scene.scale.setScalar(scale);
    scene.position.sub(center.multiplyScalar(scale));
  }, [scene, viewport]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Gentle auto-rotation + mouse influence
    groupRef.current.rotation.y = t * 0.15 + mouseRef.current.x * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.05 + mouseRef.current.y * 0.15;
    // Subtle floating
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);

const InteractiveBrain = ({ className = "" }: { className?: string }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#4a9eff" />
        <pointLight position={[-5, -3, 3]} intensity={0.4} color="#7c3aed" />
        <pointLight position={[0, 3, -5]} intensity={0.3} color="#06b6d4" />
        <Suspense fallback={null}>
          <BrainModel />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default InteractiveBrain;
