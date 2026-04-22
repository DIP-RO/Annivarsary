"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { TransitionWrapper } from "@/components/TransitionWrapper";

type GallerySectionProps = {
  images: string[];
};

export function GallerySection({ images }: GallerySectionProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <TransitionWrapper>
      <ProgressBar step={3} total={6} title="Our Memories" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-120px)] w-full max-w-6xl flex-col px-4 pb-14">
        <motion.h1
          className="mb-3 text-center text-4xl font-semibold tracking-wide text-rose-100 md:text-6xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Memory Gallery
        </motion.h1>
        <motion.p
          className="mx-auto mb-8 max-w-2xl text-center text-rose-100/85"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Every frame holds a heartbeat, every smile holds a story.
        </motion.p>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {images.length > 0 ? (
            images.map((image, index) => (
              <motion.button
                key={image}
                type="button"
                className="group relative h-40 overflow-hidden rounded-2xl border border-rose-100/25 md:h-56"
                onClick={() => setActiveImage(image)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={image}
                  alt="Romantic memory"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950/60 via-transparent to-transparent" />
              </motion.button>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-rose-100/25 bg-white/10 p-8 text-center text-rose-100/80">
              Add your photos inside /public/images and they will appear here.
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="/video" className="romantic-button">
            Continue
          </Link>
        </div>
      </section>

      <AnimatePresence>
        {activeImage ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              className="relative h-[75vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-rose-100/30"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={activeImage} alt="Expanded romantic memory" fill className="object-contain" sizes="100vw" />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </TransitionWrapper>
  );
}
