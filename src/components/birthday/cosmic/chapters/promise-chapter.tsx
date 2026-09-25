"use client";

import { motion } from "framer-motion";
import { RotateCcw, Heart } from "lucide-react";
import { StarfieldCanvas } from "@/components/birthday/cosmic/starfield-canvas";
import { birthdayConfig } from "@/lib/birthday-config";
import { fireHeartConfetti } from "@/components/birthday/parts/confetti";
import { useEffect, useState } from "react";

type Props = { onReplay: () => void };

/**
 * PromiseChapter
 * The final chapter. Palette shifts to dawn.
 * Headline + her name + body + closing + signature.
 * Heart confetti fires once on view.
 */
export function PromiseChapter({ onReplay }: Props) {
  const [fired, setFired] = useState(false);

  useEffect(() => {
    if (fired) return;
    // Fire confetti after a beat when this section enters view
    const t = setTimeout(() => {
      fireHeartConfetti();
      setFired(true);
    }, 1400);
    return () => clearTimeout(t);
  }, [fired]);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-dawn px-6 py-32 text-center">
      <StarfieldCanvas density={0.4} theme="dawn" />

      <div className="relative z-10 flex max-w-2xl flex-col items-center">
        {/* Floating heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.3 }}
          className="mb-10"
        >
          <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#E8839A] to-[#5C0A1F] pulse-glow-soft">
            <Heart className="h-8 w-8 text-[#FFF4E0]" fill="currentColor" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.0 }}
          className="font-display text-3xl font-light text-[#5C0A1F] sm:text-5xl"
        >
          {birthdayConfig.chapters.promise.headline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="mt-2 font-display text-4xl font-medium leading-tight text-[#5C0A1F] text-glow-rose sm:text-6xl sm:leading-tight"
        >
          {birthdayConfig.chapters.promise.nameLine}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.0, delay: 0.6 }}
          className="mt-8 max-w-xl whitespace-pre-line font-display text-base font-light italic leading-relaxed text-[#5C0A1F]/80 sm:text-lg"
        >
          {birthdayConfig.chapters.promise.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.0, delay: 0.9 }}
          className="mt-16"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.4em] text-[#5C0A1F]/60">
            {birthdayConfig.chapters.promise.closing}
          </p>
          <p className="font-script text-5xl text-[#5C0A1F] sm:text-6xl">
            {birthdayConfig.yourName === "YOUR_NAME_HERE"
              ? "(Your name here)"
              : birthdayConfig.yourName}
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.0, delay: 1.4 }}
          onClick={onReplay}
          className="mt-16 inline-flex items-center gap-2 rounded-full border border-[#5C0A1F]/30 bg-[#FFF4E0]/5 px-5 py-2 text-xs font-medium uppercase tracking-widest text-[#5C0A1F]/80 transition hover:bg-[#5C0A1F]/10"
        >
          <RotateCcw className="h-3 w-3" />
          Replay
        </motion.button>

        <p className="mt-16 text-xs italic text-[#5C0A1F]/40">
          Made with love, written in the stars.
        </p>
      </div>
    </section>
  );
}
