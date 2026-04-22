"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { CinematicIntro } from "@/components/CinematicIntro";
import { ProgressBar } from "@/components/ProgressBar";
import { TransitionWrapper } from "@/components/TransitionWrapper";

const PASSCODE = process.env.NEXT_PUBLIC_LOVE_PASSCODE ?? "0123";

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (countdown === null || countdown <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCountdown((prev) => (prev ? prev - 1 : 0));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [countdown]);

  const countdownLabel = useMemo(() => {
    if (countdown === null) {
      return "";
    }

    return countdown > 0 ? `Starting in ${countdown}` : "It is ready";
  }, [countdown]);

  const handleUnlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.trim() !== PASSCODE) {
      setShowError(true);
      return;
    }

    setUnlocked(true);
    setShowError(false);
    setCountdown(4);
  };

  return (
    <TransitionWrapper>
      {showIntro ? <CinematicIntro onFinish={() => setShowIntro(false)} /> : null}

      {!showIntro ? <ProgressBar step={1} total={6} title="Entrance" /> : null}

      {!showIntro ? (
        <section className="relative z-10 mx-auto flex min-h-[calc(100vh-120px)] w-full max-w-4xl flex-col items-center justify-center px-4 pb-12 text-center">
          <motion.div
            className="romantic-card w-full rounded-3xl px-6 py-10 md:px-12 md:py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.p
              className="mb-3 text-sm uppercase tracking-[0.34em] text-rose-100/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              A small surprise for us
            </motion.p>

            <h1 className="glow-text text-4xl font-semibold leading-tight text-rose-50 md:text-6xl">
              Hey love ❤️, I made something special for you...
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base text-rose-100/85 md:text-lg">
              This is a little cinematic journey made from our memories, our laughter, and all the quiet moments that became my favorite home.
            </p>

            {!unlocked ? (
              <form onSubmit={handleUnlock} className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3">
                <label htmlFor="passcode" className="text-left text-sm font-semibold uppercase tracking-[0.2em] text-rose-100/80">
                  Enter Our Secret Passcode
                </label>
                <input
                  id="passcode"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Hint: your special date"
                  className="rounded-2xl border border-rose-100/25 bg-white/10 px-4 py-3 text-rose-50 placeholder:text-rose-100/50 focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
                <button type="submit" className="romantic-button mt-1">
                  Unlock Surprise
                </button>
                {showError ? <p className="text-sm text-rose-200">That is not our passcode yet. Try again, my love.</p> : null}
              </form>
            ) : (
              <div className="mt-10 flex flex-col items-center gap-4">
                <motion.p
                  className="text-lg font-semibold text-rose-100"
                  key={countdownLabel}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {countdownLabel}
                </motion.p>

                {countdown === 0 ? (
                  <Link href="/intro" className="romantic-button">
                    Start The Journey
                  </Link>
                ) : (
                  <div className="h-12" />
                )}
              </div>
            )}
          </motion.div>
        </section>
      ) : null}
    </TransitionWrapper>
  );
}
