import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Clone } from "@react-three/drei";
import * as THREE from "three";
import { type CloudConfig } from "../const/clouds";

type CloudProps = CloudConfig & {
  mouseX: { current: number };
  mouseVelocity: { current: number };
};

export function Cloud({
  position,
  rotation,
  scale,
  speed,
  color = "#ffffff",
  parallaxFactor,
  mouseX,
  mouseVelocity,
}: CloudProps) {
  const { scene } = useGLTF("/glb/cloud.glb");
  const ref = useRef<THREE.Group>(null);
  const [offset] = useState(() => Math.random() * Math.PI * 2);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh)
        (
          (child as THREE.Mesh).material as THREE.MeshStandardMaterial
        ).color.set(color);
    });
  }, [scene, color]);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.position.y =
      position[1] +
      Math.sin(state.clock.elapsedTime * speed + offset) * 0.3;

    const targetX = position[0] + mouseX.current * parallaxFactor;
    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      targetX,
      0.02,
    );

    const targetTilt = THREE.MathUtils.clamp(
      mouseVelocity.current * parallaxFactor * 0.03,
      -0.2,
      0.2,
    );
    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      targetTilt,
      0.05,
    );
  });

  return (
    <Clone
      ref={ref}
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
}

export function VelocityDecay({
  mouseVelocity: mouseVelocityRef,
}: {
  mouseVelocity: { current: number };
}) {
  useFrame(() => {
    mouseVelocityRef.current *= 0.85;
  });
  return null;
}
