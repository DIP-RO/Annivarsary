"use client";

import { motion } from "framer-motion";
import { useMusic } from "@/components/music-context";

export function MusicPlayer() {
  const { isPlaying, hasInteracted, toggleMusic } = useMusic();

  return (
    <motion.button
      type="button"
      onClick={() => void toggleMusic()}
      className="fixed bottom-5 right-4 z-50 rounded-full border border-rose-100/40 bg-rose-100/20 px-4 py-3 text-sm font-semibold text-rose-50 shadow-xl backdrop-blur-md"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? "Pause Music" : hasInteracted ? "Play Music" : "Tap For Music"}
    </motion.button>
  );
}
