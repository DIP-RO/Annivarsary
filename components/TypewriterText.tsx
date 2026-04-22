"use client";

import { useEffect, useMemo, useState } from "react";

type TypewriterTextProps = {
  text: string;
  speed?: number;
  className?: string;
};

export function TypewriterText({ text, speed = 24, className = "" }: TypewriterTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= text.length) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, speed);

    return () => window.clearTimeout(timer);
  }, [index, speed, text.length]);

  const displayText = useMemo(() => text.slice(0, index), [index, text]);

  return (
    <p className={className}>
      {displayText}
      <span className="animate-pulse text-rose-200">|</span>
    </p>
  );
}
