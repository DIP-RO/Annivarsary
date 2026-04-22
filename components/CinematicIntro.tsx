"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type CinematicIntroProps = {
  onFinish: () => void;
};

const LINES = [
  "Tonight is for us.",
  "For every laugh, every look, every little forever.",
  "A tiny film made from our love.",
];

const TOTAL_DURATION = 9800;
const COUNTDOWN_SECONDS = 3;

export function CinematicIntro({ onFinish }: CinematicIntroProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();

    const timer = window.setInterval(() => {
      const nextElapsed = Date.now() - start;
      setElapsed(nextElapsed);

      if (nextElapsed >= TOTAL_DURATION) {
        window.clearInterval(timer);
        onFinish();
      }
    }, 100);

    return () => window.clearInterval(timer);
  }, [onFinish]);

  const phaseIndex = useMemo(() => {
    if (elapsed < 2500) {
      return 0;
    }
    if (elapsed < 5000) {
      return 1;
    }
    return 2;
  }, [elapsed]);

  const countdownStart = TOTAL_DURATION - COUNTDOWN_SECONDS * 1000;
  const countdown = useMemo(() => {
    if (elapsed < countdownStart) {
      return null;
    }

    const remaining = COUNTDOWN_SECONDS - Math.floor((elapsed - countdownStart) / 1000);
    return Math.max(0, remaining);
  }, [elapsed, countdownStart]);

  return (
    <motion.section
      className="fixed inset-0 z-[65] flex items-center justify-center bg-gradient-to-b from-rose-950/95 via-rose-900/95 to-black/90 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <button
        type="button"
        onClick={onFinish}
        className="absolute right-5 top-5 rounded-full border border-rose-100/40 bg-rose-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-100/90 transition hover:bg-rose-100/20"
      >
        Skip
      </button>

      <div className="relative mx-auto w-full max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.h2
            key={phaseIndex}
            className="text-3xl font-semibold leading-tight text-rose-50 md:text-5xl"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(5px)" }}
            transition={{ duration: 0.8 }}
          >
            {LINES[phaseIndex]}
          </motion.h2>
        </AnimatePresence>

        {countdown !== null ? (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-sm uppercase tracking-[0.25em] text-rose-100/70">Opening in</p>
            <motion.p
              key={countdown}
              className="glow-text mt-2 text-6xl font-semibold text-rose-100 md:text-7xl"
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {countdown}
            </motion.p>
          </motion.div>
        ) : null}
      </div>
    </motion.section>
  );
}
