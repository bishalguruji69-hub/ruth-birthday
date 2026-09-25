"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { StarfieldCanvas } from "@/components/birthday/cosmic/starfield-canvas";
import { birthdayConfig } from "@/lib/birthday-config";

/**
 * PoemChapter
 * The color palette shifts from cosmic to sunset.
 * The Nepali poem writes itself letter by letter (Devanagari).
 * English translation fades in below (if provided).
 */
export function PoemChapter() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.4 });

  // Pre-compute letter sequence for the whole poem
  // so we can stagger-reveal across lines.
  const lines = birthdayConfig.poemLines;
  const isPlaceholder =
    lines.length === 0 ||
    lines[0].startsWith("PASTE YOUR");

  // total letters we will reveal, and current count
  const totalLetters = lines.reduce((n, l) => n + l.length, 0);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    if (!inView || isPlaceholder) return;
    if (revealedCount >= totalLetters) return;
    // Speed: ~30ms per character (fast enough not to bore, slow enough to feel handwritten)
    const interval = setInterval(() => {
      setRevealedCount((c) => {
        if (c >= totalLetters) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 38);
    return () => clearInterval(interval);
  }, [inView, isPlaceholder, revealedCount, totalLetters]);

  // Walk letters across lines — pure functional reduce (no mutation lint).
  const lineReveals = lines.reduce(
    (acc, line) => {
      const start = acc.length === 0 ? 0 : acc[acc.length - 1].end;
      return [...acc, { line, start, end: start + line.length }];
    },
    [] as { line: string; start: number; end: number }[]
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[110svh] flex-col items-center justify-center overflow-hidden bg-sunset px-6 py-32"
    >
      <StarfieldCanvas density={0.5} theme="sunset" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        {/* Lead-in */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2 }}
          className="mb-12 font-display text-lg font-light italic text-[#FFF4E0]/80 sm:text-xl"
        >
          {birthdayConfig.chapters.poem.leadIn}
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="mb-10 font-script text-5xl text-[#FFF4E0] text-glow-rose sm:text-7xl"
        >
          {birthdayConfig.poemTitle}
        </motion.h2>

        {/* Poem */}
        {isPlaceholder ? (
          <p className="font-devanagari text-base italic text-[#FFF4E0]/60 sm:text-lg">
            {`(Your Nepali poem will write itself here letter by letter,
            in starlight. Paste it into src/lib/birthday-config.ts → poemLines.)`}
          </p>
        ) : (
          <div className="space-y-3">
            {lineReveals.map(({ line, start, end }, i) => {
              const lineRevealed = Math.max(0, Math.min(line.length, revealedCount - start));
              return (
                <p
                  key={i}
                  className="font-devanagari text-xl leading-loose text-[#FFF4E0] sm:text-2xl sm:leading-loose"
                  style={{ minHeight: "1.5em" }}
                >
                  {line.split("").map((ch, j) => (
                    <motion.span
                      key={j}
                      initial={{ opacity: 0, filter: "blur(6px)" }}
                      animate={
                        j < lineRevealed
                          ? { opacity: 1, filter: "blur(0px)" }
                          : { opacity: 0, filter: "blur(6px)" }
                      }
                      transition={{ duration: 0.3 }}
                      style={{ textShadow: "0 0 12px rgba(232,131,154,0.6)" }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                  {/* Cursor */}
                  {i === lineReveals.length - 1 && revealedCount < end && (
                    <span className="ml-1 inline-block h-6 w-px bg-[#FFF4E0] animate-pulse" />
                  )}
                </p>
              );
            })}
          </div>
        )}

        {/* English translation (optional) */}
        {!isPlaceholder && birthdayConfig.poemTranslation && revealedCount >= totalLetters && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="mt-12 max-w-xl font-display text-sm font-light italic leading-relaxed text-[#FFF4E0]/60 sm:text-base"
          >
            {birthdayConfig.poemTranslation}
          </motion.p>
        )}
      </div>
    </section>
  );
}
