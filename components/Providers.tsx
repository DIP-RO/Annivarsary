"use client";

import { ReactNode } from "react";
import { MusicProvider } from "@/components/music-context";
import { MusicPlayer } from "@/components/MusicPlayer";
import { FloatingHearts } from "@/components/FloatingHearts";
import { CustomCursor } from "@/components/CustomCursor";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <MusicProvider>
      <FloatingHearts />
      <CustomCursor />
      {children}
      <MusicPlayer />
    </MusicProvider>
  );
}
