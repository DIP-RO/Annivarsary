"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProgressBar } from "@/components/ProgressBar";
import { TransitionWrapper } from "@/components/TransitionWrapper";
import { TypewriterText } from "@/components/TypewriterText";

const loveLetter = `My love,

Three months may sound small to the world, but to my heart it feels like a lifetime of beautiful beginnings.

You walked into my days and suddenly everything softened. Morning light looked warmer. Music sounded deeper. Even silence became meaningful, because in silence I could still feel you.

You are the reason I smile at random moments.
You are the calm in my storms and the spark in my quiet nights.
You are the person who makes me feel seen, chosen, and endlessly loved.

I love the way you laugh.
I love the way you care.
I love the way your presence turns ordinary time into unforgettable memory.

If life is a long road, then I want to keep walking it with your hand in mine, celebrating tiny wins, surviving hard days, and making a thousand more memories together.

Thank you for these three months of warmth, patience, joy, and love.
This is only chapter one.

Forever yours.`;

export default function LetterPage() {
  return (
    <TransitionWrapper>
      <ProgressBar step={5} total={6} title="Love Letter" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-120px)] w-full max-w-5xl flex-col items-center justify-center px-4 pb-14">
        <motion.div
          className="romantic-card w-full rounded-3xl px-6 py-8 md:px-12 md:py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="mb-7 text-center text-4xl font-semibold text-rose-50 md:text-6xl">For You, Always</h1>

          <TypewriterText
            text={loveLetter}
            speed={14}
            className="mx-auto max-w-3xl whitespace-pre-line text-base leading-relaxed text-rose-100/90 md:text-xl"
          />

          <div className="mt-10 flex justify-center">
            <Link href="/surprise" className="romantic-button">
              Open The Final Surprise
            </Link>
          </div>
        </motion.div>
      </section>
    </TransitionWrapper>
  );
}
