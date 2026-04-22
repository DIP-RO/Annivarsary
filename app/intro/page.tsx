"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProgressBar } from "@/components/ProgressBar";
import { TransitionWrapper } from "@/components/TransitionWrapper";
import { TypewriterText } from "@/components/TypewriterText";

const introMessage =
  "If I had to choose one place to stay forever, I would choose every moment that includes you. Thank you for making ordinary days feel like magic and simple smiles feel like festivals.";

export default function IntroPage() {
  return (
    <TransitionWrapper>
      <ProgressBar step={2} total={6} title="Intro" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-120px)] w-full max-w-4xl flex-col items-center justify-center px-4 pb-14 text-center">
        <motion.div
          className="romantic-card w-full rounded-3xl px-6 py-10 md:px-12 md:py-14"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="mb-6 text-4xl font-semibold text-rose-50 md:text-6xl">A Note Before We Continue</h1>

          <TypewriterText
            text={introMessage}
            speed={20}
            className="mx-auto max-w-2xl whitespace-pre-line text-lg leading-relaxed text-rose-100/90 md:text-2xl"
          />

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
          >
            <Link href="/gallery" className="romantic-button">
              Continue
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </TransitionWrapper>
  );
}
