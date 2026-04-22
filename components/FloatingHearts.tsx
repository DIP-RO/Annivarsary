"use client";

import { motion } from "framer-motion";

const HEARTS = [
  { left: "8%", delay: 0.1, duration: 12, size: "text-xl", opacity: 0.5 },
  { left: "22%", delay: 1.4, duration: 11, size: "text-sm", opacity: 0.35 },
  { left: "40%", delay: 0.7, duration: 13, size: "text-lg", opacity: 0.45 },
  { left: "58%", delay: 2.2, duration: 10, size: "text-base", opacity: 0.35 },
  { left: "74%", delay: 1.1, duration: 14, size: "text-xl", opacity: 0.42 },
  { left: "88%", delay: 2.8, duration: 9, size: "text-sm", opacity: 0.3 },
];

export function FloatingHearts() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {HEARTS.map((heart, index) => (
        <motion.span
          key={`${heart.left}-${index}`}
          className={`absolute bottom-[-10%] ${heart.size}`}
          style={{ left: heart.left, opacity: heart.opacity }}
          initial={{ y: 0, x: 0, rotate: 0 }}
          animate={{
            y: [0, -220, -460, -760],
            x: [0, 14, -14, 6],
            rotate: [0, 16, -8, 4],
          }}
          transition={{
            duration: heart.duration,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
            delay: heart.delay,
          }}
        >
          ❤️
        </motion.span>
      ))}
    </div>
  );
}
