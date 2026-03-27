import { useRef, useEffect } from "react";

type MouseParallaxRefs = {
  mouseX: { current: number };
  mouseVelocity: { current: number };
};

export function useMouseParallax(): MouseParallaxRefs {
  const mouseX = useRef(0);
  const mouseVelocity = useRef(0);

  useEffect(() => {
    let lastX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const normalized = (e.clientX / window.innerWidth) * 2 - 1;
      mouseVelocity.current = (normalized - lastX) * 60;
      lastX = normalized;
      mouseX.current = normalized;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { mouseX, mouseVelocity };
}
