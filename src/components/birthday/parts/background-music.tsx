"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { birthdayConfig } from "@/lib/birthday-config";

type Props = {
  /** Start the music as soon as the user has interacted (we pass `began` here). */
  autoStart?: boolean;
  /** Pause the music while this is true (e.g. while the video is playing). */
  pauseForVideo?: boolean;
};

/**
 * BackgroundMusic
 *
 * - Music loops forever.
 * - Music starts on first user interaction (the click-to-begin on the opening
 *   chapter). Browsers block autoplay before any click, so this is the earliest
 *   possible moment.
 * - When `pauseForVideo` becomes true, music pauses (and resumes when it goes
 *   false again) — used so the video message can play in silence, then the
 *   music comes back.
 * - User can also mute/unmute via the toggle button (bottom-right).
 */
export function BackgroundMusic({ autoStart = false, pauseForVideo = false }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [userMuted, setUserMuted] = useState(false);

  // The audio should be playing iff: autoStarted AND NOT user-muted AND NOT paused-for-video.
  const shouldPlay = autoStart && !userMuted && !pauseForVideo;

  // Create the audio element once on mount.
  useEffect(() => {
    if (!birthdayConfig.musicEnabled) return;
    const audio = new Audio(birthdayConfig.musicPath);
    audio.loop = true; // ← song plays in loop
    audio.volume = 0.35;
    audio.preload = "auto";
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Play or pause the audio element whenever shouldPlay changes.
  // This single effect handles all transitions:
  //   - autoStart turning true (user clicked to begin) → play
  //   - userMuted turning true → pause
  //   - pauseForVideo turning true (video started) → pause
  //   - pauseForVideo turning false (video paused) → resume
  useEffect(() => {
    if (!audioRef.current) return;
    if (shouldPlay) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked or audio file missing — fail silently.
      });
    } else {
      audioRef.current.pause();
    }
  }, [shouldPlay]);

  if (!birthdayConfig.musicEnabled) return null;

  const toggle = () => setUserMuted((m) => !m);

  return (
    <AnimatePresence>
      <motion.button
        key="music-toggle"
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        aria-label={shouldPlay ? "Mute background music" : "Play background music"}
                // bottom-safe + right-safe account for iOS Safari bottom bar + iPhone notch
        className="bottom-safe right-safe fixed z-50 grid h-12 w-12 place-items-center rounded-full bg-white/80 shadow-lg backdrop-blur transition hover:bg-white"
        style={{ touchAction: "manipulation" }}
      >
        {shouldPlay ? (
          <Volume2 className="h-5 w-5 text-[#5C0A1F]" />
        ) : (
          <VolumeX className="h-5 w-5 text-[#5C0A1F]" />
        )}
        {shouldPlay && (
          <span className="absolute inset-0 rounded-full border-2 border-[#E63946]/50 animate-ping" />
        )}
      </motion.button>
    </AnimatePresence>
  );
}