"use client";

import { motion } from "framer-motion";
import { StarfieldCanvas } from "@/components/birthday/cosmic/starfield-canvas";
import { birthdayConfig } from "@/lib/birthday-config";
import { useState, useRef } from "react";

/**
 * CosmosChapter
 * After the user clicks to begin, the universe blooms.
 * Stars + parallax + prose. Also contains discoverable "whisper stars"
 * that reveal inside-jokes when clicked.
 */
export function CosmosChapter() {
  const [activeWhisper, setActiveWhisper] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const whispers = birthdayConfig.whisperStars;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[120svh] flex-col items-center justify-center overflow-hidden bg-cosmos px-6 py-32"
    >
      <StarfieldCanvas density={1.4} theme="cosmos" />

      {/* Whisper stars — small clickable stars that reveal inside jokes */}
      {whispers.map((text, i) => {
        const angle = (i / whispers.length) * Math.PI * 2;
        const radius = 32; // % from center
        const left = 50 + Math.cos(angle) * radius;
        const top = 50 + Math.sin(angle) * radius * 0.7;
        return (
          <button
            key={i}
            onClick={() => setActiveWhisper(activeWhisper === i ? null : i)}
            className="group absolute z-20 grid h-6 w-6 place-items-center rounded-full transition-transform hover:scale-125"
            style={{ left: `${left}%`, top: `${top}%` }}
            aria-label={`Whisper star ${i + 1}`}
          >
            <span className="absolute h-2 w-2 rounded-full bg-[#D4A574] star-twinkle" />
            <span className="absolute h-6 w-6 rounded-full border border-[#D4A574]/30" />
            {activeWhisper === i && (
              <motion.span
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: -36, scale: 1 }}
                className="absolute max-w-[200px] rounded-2xl bg-[#06030F]/90 px-3 py-2 text-center font-display text-sm italic text-[#F5F0E1] shadow-xl ring-1 ring-[#D4A574]/30"
              >
                {text}
              </motion.span>
            )}
          </button>
        );
      })}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-2xl text-center"
      >
        <p className="font-display text-4xl font-light leading-tight text-[#F5F0E1] text-glow-soft sm:text-6xl sm:leading-tight">
          {birthdayConfig.chapters.cosmos.headline}
        </p>
        <p className="mt-8 whitespace-pre-line font-display text-lg font-light italic leading-relaxed text-[#F5F0E1]/70 sm:text-xl">
          {birthdayConfig.chapters.cosmos.subhead}
        </p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" className="text-[#D4A574]/60">
          <rect x="4" y="0" width="16" height="32" rx="8" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="12" cy="10" r="2" fill="currentColor"/>
          <path d="M12 28 L12 32 M8 36 L12 32 L16 36" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </motion.div>
    </section>
  );
}
