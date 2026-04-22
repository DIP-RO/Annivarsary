"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type MusicContextType = {
  isPlaying: boolean;
  hasInteracted: boolean;
  toggleMusic: () => Promise<void>;
};

const MusicContext = createContext<MusicContextType | null>(null);

type MusicProviderProps = {
  children: ReactNode;
};

export function MusicProvider({ children }: MusicProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const clearFade = useCallback(() => {
    if (fadeIntervalRef.current !== null) {
      window.clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const fadeInVolume = useCallback((player: HTMLAudioElement) => {
    clearFade();
    player.volume = 0;

    const targetVolume = 0.72;
    const durationMs = 2200;
    const stepMs = 100;
    const step = targetVolume / (durationMs / stepMs);

    fadeIntervalRef.current = window.setInterval(() => {
      const nextVolume = Math.min(targetVolume, player.volume + step);
      player.volume = nextVolume;

      if (nextVolume >= targetVolume) {
        clearFade();
      }
    }, stepMs);
  }, [clearFade]);

  useEffect(() => {
    return () => {
      clearFade();
    };
  }, [clearFade]);

  const toggleMusic = useCallback(async () => {
    const player = audioRef.current;
    if (!player) {
      return;
    }

    if (isPlaying) {
      clearFade();
      player.pause();
      setIsPlaying(false);
      return;
    }

    const firstPlay = !hasInteracted;

    if (!hasInteracted) {
      player.muted = false;
      setHasInteracted(true);
    }

    try {
      await player.play();
      if (firstPlay) {
        fadeInVolume(player);
      }
      setIsPlaying(true);
    } catch (error) {
      console.error("Playback was blocked:", error);
    }
  }, [clearFade, fadeInVolume, hasInteracted, isPlaying]);

  const value = useMemo(
    () => ({
      isPlaying,
      hasInteracted,
      toggleMusic,
    }),
    [hasInteracted, isPlaying, toggleMusic],
  );

  return (
    <MusicContext.Provider value={value}>
      <audio ref={audioRef} src="/music/love.mp3" preload="auto" loop muted />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error("useMusic must be used inside MusicProvider");
  }

  return context;
}
