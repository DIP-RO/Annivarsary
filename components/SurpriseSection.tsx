"use client";

import Link from "next/link";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { TransitionWrapper } from "@/components/TransitionWrapper";

export function SurpriseSection() {
  const [showSecret, setShowSecret] = useState(false);

  const launchConfetti = () => {
    void confetti({
      particleCount: 160,
      spread: 90,
      startVelocity: 42,
      origin: { y: 0.58 },
      colors: ["#ffd1dc", "#ff8fab", "#ffc2d1", "#ffe5ec", "#fb6f92"],
    });
  };

  return (
    <TransitionWrapper>
      <ProgressBar step={6} total={6} title="Forever Start" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-120px)] w-full max-w-5xl flex-col items-center justify-center px-4 pb-14 text-center">
        <motion.h1
          className="glow-text text-5xl font-semibold text-rose-50 md:text-7xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          Happy 3 Months Anniversary ❤️
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg text-rose-100/90 md:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Three months of your hand in mine, and suddenly the world feels softer, kinder, and full of songs.
        </motion.p>

        <motion.button
          type="button"
          className="romantic-button mt-10 px-8 py-4 text-base md:text-lg"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={launchConfetti}
        >
          Tap To Celebrate
        </motion.button>

        <Link href="/" className="mt-5 text-sm font-semibold tracking-wide text-rose-100/90 underline underline-offset-4">
          Replay The Surprise
        </Link>

        <button
          type="button"
          className="absolute bottom-6 left-5 text-xl opacity-40 transition hover:opacity-100"
          onClick={() => setShowSecret((prev) => !prev)}
          aria-label="Open secret heart"
        >
          ❤
        </button>

        {showSecret ? (
          <motion.div
            className="absolute bottom-16 left-5 max-w-xs rounded-xl border border-rose-100/30 bg-rose-950/80 p-4 text-left text-sm text-rose-100"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Easter egg unlocked: You are my favorite place, my safest silence, and my loudest joy.
          </motion.div>
        ) : null}
      </section>
    </TransitionWrapper>
  );
}
