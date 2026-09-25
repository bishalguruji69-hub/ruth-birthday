"use client";

import { motion } from "framer-motion";
import { StarfieldCanvas } from "@/components/birthday/cosmic/starfield-canvas";
import { birthdayConfig } from "@/lib/birthday-config";

// Each photo gets a slight rotation so they feel scattered, like memories.
const ROTATIONS = [-3, 2.5, -1.5, 3.5];

/**
 * HerLightChapter
 * A 4-photo collage floating in space, with prose to the side.
 * Uses plain <img> tags so replacing files in /public/assets/photos/
 * always shows up immediately (no Next.js Image cache).
 */
export function HerLightChapter() {
  const photos = birthdayConfig.assets.herLightPhotos;

  return (
    <section className="relative flex min-h-[110svh] flex-col items-center justify-center overflow-hidden bg-cosmos px-6 py-32">
      <StarfieldCanvas density={0.7} theme="cosmos" />

      <div className="relative z-10 grid max-w-5xl gap-12 sm:grid-cols-2 sm:gap-16">
        {/* 4-photo collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 mx-auto sm:order-2"
        >
          {/* Glow halo behind the whole collage */}
          <div
            className="absolute -inset-8 -z-10 rounded-full opacity-60 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(232,131,154,0.45) 0%, rgba(212,165,116,0.18) 40%, transparent 70%)",
            }}
          />

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {photos.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24, rotate: 0 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: ROTATIONS[i % ROTATIONS.length],
                }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformOrigin: "center" }}
              >
                {/* Inner div handles the float animation (separate transform
                    stack from the entry rotation above) */}
                <div
                  className="float-gentle relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl ring-1 ring-[#F5F0E1]/20"
                  style={{ animationDelay: `${i * 1.5}s` }}
                >
                  {/* Plain <img> — bypasses Next.js Image cache so
                      replacing files in /public/assets/photos/ always
                      shows the new image immediately on refresh. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`A moment with ${birthdayConfig.herShortName} — ${i + 1}`}
                    className="h-full w-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  {/* Vignette overlay */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      boxShadow: "inset 0 0 60px 6px rgba(6, 3, 15, 0.5)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tiny decorative stars */}
          <div className="absolute -top-3 -right-3 h-1.5 w-1.5 rounded-full bg-[#D4A574] star-twinkle" />
          <div className="absolute -bottom-4 left-4 h-1 w-1 rounded-full bg-[#E8839A] star-twinkle" />
        </motion.div>

        {/* Prose */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 flex flex-col justify-center text-center sm:order-1 sm:text-left"
        >
          <p className="font-display text-3xl font-light leading-tight text-[#F5F0E1] text-glow-soft sm:text-5xl">
            {birthdayConfig.chapters.herLight.headline}
          </p>
          <p className="mt-6 whitespace-pre-line font-display text-base font-light italic leading-relaxed text-[#F5F0E1]/70 sm:text-lg">
            {birthdayConfig.chapters.herLight.body}
          </p>
        </motion.div>
      </div>
    </section>
  );
}