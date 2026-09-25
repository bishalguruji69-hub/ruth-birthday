"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { birthdayConfig } from "@/lib/birthday-config";

type Props = { onBegin: () => void };

/**
 * OpeningChapter
 * Pitch black. Her name appears letter by letter, then a soft invitation.
 * A single pulsing dot at the bottom invites the user to click anywhere.
 */
export function OpeningChapter({ onBegin }: Props) {
  const name = birthdayConfig.herShortName;
  const [revealed, setRevealed] = useState(0);
  const [showRest, setShowRest] = useState(false);
  const [bursting, setBursting] = useState(false);

  // Reveal her name letter by letter
  useEffect(() => {
    if (revealed >= name.length) {
      const t = setTimeout(() => setShowRest(true), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setRevealed((r) => r + 1), 220);
    return () => clearTimeout(t);
  }, [revealed, name.length]);

  const handleClick = () => {
    if (bursting) return;
    setBursting(true);
    setTimeout(onBegin, 1200);
  };

  return (
    <section
      onClick={handleClick}
      className="relative flex h-[100svh] cursor-pointer flex-col items-center justify-center overflow-hidden bg-cosmos-deep"
      aria-label="Opening"
    >
      {/* Faint pre-burst radial glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,165,116,0.18) 0%, rgba(232,131,154,0.08) 40%, transparent 70%)",
        }}
        animate={{
          scale: bursting ? [1, 18, 22] : [1, 1.3, 1],
          opacity: bursting ? [0.8, 0.4, 0] : [0.6, 1, 0.6],
        }}
        transition={{
          duration: bursting ? 1.2 : 3,
          repeat: bursting ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Letter-by-letter reveal of her name */}
        <div className="flex items-end justify-center" aria-hidden={false}>
          {name.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={
                i < revealed
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 24, filter: "blur(8px)" }
              }
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-7xl font-light tracking-wide text-[#F5F0E1] sm:text-9xl"
              style={{ textShadow: "0 0 40px rgba(212, 165, 116, 0.6)" }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Invitation text */}
        <AnimatePresence>
          {showRest && !bursting && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mt-10 flex flex-col items-center"
            >
              <p className="font-display text-xl font-light italic text-[#F5F0E1]/80 sm:text-2xl">
                {birthdayConfig.chapters.opening.invitation}
              </p>
              <motion.p
                className="mt-12 text-xs uppercase tracking-[0.4em] text-[#D4A574]/70"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                {birthdayConfig.chapters.opening.hint}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bursting sparkles when clicked */}
      {bursting && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 24;
            const distance = 280 + (i % 3) * 100;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            return (
              <motion.span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-[#D4A574]"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1.5 }}
                animate={{ x: dx, y: dy, opacity: 0, scale: 0.2 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{
                  boxShadow: "0 0 12px rgba(212,165,116,0.8)",
                }}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
