"use client";

import { useEffect, useState } from "react";

type Line = { prompt?: string; text: string; className?: string };

// Types out a short sequence of terminal lines once on mount, then leaves a
// blinking caret on the last line. Falls back to instant full text if the
// user prefers reduced motion.
export default function TypedLines({ lines }: { lines: Line[] }) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [lineIndex, setLineIndex] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? lines.length : 0
  );
  const done = lineIndex >= lines.length;

  useEffect(() => {
    if (done) return;

    const current = lines[lineIndex].text;
    if (visibleChars < current.length) {
      const t = setTimeout(() => setVisibleChars((c) => c + 1), 18 + Math.random() * 22);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setLineIndex((i) => i + 1);
      setVisibleChars(0);
    }, 320);
    return () => clearTimeout(t);
  }, [done, visibleChars, lineIndex, lines]);

  return (
    <div>
      {lines.map((line, i) => {
        const isCurrent = i === lineIndex && !done;
        const isPast = i < lineIndex || done;
        const text = isPast ? line.text : isCurrent ? line.text.slice(0, visibleChars) : "";
        if (!isPast && !isCurrent) return null;
        const isActiveCaret = isCurrent || (done && i === lines.length - 1);
        return (
          <div key={i} className={line.className}>
            {line.prompt && <span className="text-accent">{line.prompt} </span>}
            <span className={isActiveCaret ? "caret" : ""}>{text}</span>
          </div>
        );
      })}
    </div>
  );
}
