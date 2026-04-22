"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.45 });
  const smoothY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.45 });
  const [isTouch, setIsTouch] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(pointer: coarse)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const mediaHandler = (event: MediaQueryListEvent) => {
      setIsTouch(event.matches);
    };

    mediaQuery.addEventListener("change", mediaHandler);

    const handler = (event: MouseEvent) => {
      x.set(event.clientX - 10);
      y.set(event.clientY - 10);
    };

    window.addEventListener("mousemove", handler);
    return () => {
      mediaQuery.removeEventListener("change", mediaHandler);
      window.removeEventListener("mousemove", handler);
    };
  }, [x, y]);

  if (isTouch) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] h-5 w-5 rounded-full bg-pink-200/70 shadow-[0_0_18px_rgba(255,183,214,0.9)]"
      style={{ x: smoothX, y: smoothY }}
    />
  );
}
