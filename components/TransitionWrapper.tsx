"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type TransitionWrapperProps = {
  children: ReactNode;
};

export function TransitionWrapper({ children }: TransitionWrapperProps) {
  return (
    <motion.main
      className="relative min-h-screen"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      {children}
    </motion.main>
  );
}
