"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { birthdayConfig } from "@/lib/birthday-config";

/**
 * BackgroundMusic
 * Lazy-loads the audio file only after user interaction.
 * Browsers block autoplay — so we expose a small toggle button.
 */
export function BackgroundMusic({ autoStart = false }: { autoStart?: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [triedAutostart, setTriedAutostart] = useState(false);

  useEffect(() => {
    if (!birthdayConfig.musicEnabled) return;
    const audio = new Audio(birthdayConfig.musicPath);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (autoStart && !triedAutostart && audioRef.current) {
      // Defer setState via rAF to avoid cascading renders.
      const raf = requestAnimationFrame(() => {
        setTriedAutostart(true);
        audioRef.current?.play().then(() => setPlaying(true)).catch(() => {
          // Autoplay blocked — user must interact first
          setPlaying(false);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [autoStart, triedAutostart]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  if (!birthdayConfig.musicEnabled) return null;

  return (
    <AnimatePresence>
      <motion.button
        key="music-toggle"
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        aria-label={playing ? "Mute background music" : "Play background music"}
        className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full bg-white/80 shadow-lg backdrop-blur transition hover:bg-white"
      >
        {playing ? <Volume2 className="h-5 w-5 text-[#5C0A1F]" /> : <VolumeX className="h-5 w-5 text-[#5C0A1F]" />}
        {playing && (
          <span className="absolute inset-0 rounded-full border-2 border-[#E63946]/50 animate-ping" />
        )}
      </motion.button>
    </AnimatePresence>
  );
}
