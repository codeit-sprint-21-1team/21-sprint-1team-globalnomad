"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useMouseParallax } from "./lib/useMouseParallax";
import { CLOUDS } from "./const/clouds";
import { Cloud, VelocityDecay } from "./ui/Cloud";

useGLTF.preload("/glb/cloud.glb");

function CloudScene() {
  const { mouseX, mouseVelocity } = useMouseParallax();

  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
      <ambientLight intensity={20} />
      <directionalLight position={[10, 10, 5]} intensity={5.5} />
      <VelocityDecay mouseVelocity={mouseVelocity} />
      {CLOUDS.map((cloud, i) => (
        <Cloud
          key={i}
          {...cloud}
          mouseX={mouseX}
          mouseVelocity={mouseVelocity}
        />
      ))}
    </Canvas>
  );
}

const fallback = (
  <div className="w-full h-full fixed z-0 bg-gradient-to-b from-sky-300 to-white" />
);

export default function CloudRender() {
  return (
    <div className="w-full h-full fixed z-0 bg-gradient-to-b from-sky-300 to-white">
      <Suspense fallback={fallback}>
        <CloudScene />
      </Suspense>
    </div>
  );
}
