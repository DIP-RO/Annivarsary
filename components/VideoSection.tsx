"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProgressBar } from "@/components/ProgressBar";
import { TransitionWrapper } from "@/components/TransitionWrapper";

type VideoSectionProps = {
  videos: string[];
};

export function VideoSection({ videos }: VideoSectionProps) {
  return (
    <TransitionWrapper>
      <ProgressBar step={4} total={6} title="Our Little Cinema" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-120px)] w-full max-w-6xl flex-col px-4 pb-14">
        <motion.div
          className="romantic-card mx-auto w-full max-w-5xl rounded-3xl p-4 md:p-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="mb-3 text-center text-4xl font-semibold text-rose-50 md:text-6xl">Our Cinema Night</h1>
          <p className="mx-auto mb-6 max-w-2xl text-center text-rose-100/85">
            A little reel of us. Quiet smiles, loud hearts.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {videos.length > 0 ? (
              videos.map((videoPath, index) => (
                <motion.video
                  key={videoPath}
                  src={videoPath}
                  autoPlay
                  muted
                  playsInline
                  loop
                  controls
                  className="h-[360px] w-full rounded-2xl border border-rose-100/25 object-cover"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.16, duration: 0.6 }}
                />
              ))
            ) : (
              <div className="rounded-2xl border border-rose-100/25 bg-white/10 p-8 text-center text-rose-100/80 md:col-span-2">
                Add your videos inside /public/videos and they will appear here.
              </div>
            )}
          </div>
        </motion.div>

        <div className="mt-8 flex justify-center">
          <Link href="/letter" className="romantic-button">
            Continue
          </Link>
        </div>
      </section>
    </TransitionWrapper>
  );
}
