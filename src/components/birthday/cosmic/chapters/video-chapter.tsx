"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { StarfieldCanvas } from "@/components/birthday/cosmic/starfield-canvas";
import { birthdayConfig } from "@/lib/birthday-config";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

/**
 * VideoChapter
 * A cinematic video frame. Letterbox bars top/bottom (cinema style).
 * Custom controls with golden accents.
 */
export function VideoChapter() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoMissing, setVideoMissing] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <section className="relative flex min-h-[110svh] flex-col items-center justify-center overflow-hidden bg-cosmos-deep px-6 py-32">
      <StarfieldCanvas density={0.5} theme="cosmos" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 mb-10 max-w-2xl text-center"
      >
        <p className="font-display text-3xl font-light text-[#F5F0E1] text-glow-soft sm:text-5xl">
          {birthdayConfig.chapters.video.headline}
        </p>
        <p className="mt-4 font-display text-base font-light italic text-[#F5F0E1]/60 sm:text-lg">
          {birthdayConfig.chapters.video.subhead}
        </p>
      </motion.div>

      {/* Cinematic frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="letterbox relative z-10 w-full max-w-3xl overflow-hidden rounded-sm shadow-2xl ring-1 ring-[#F5F0E1]/20"
      >
        <div className="relative aspect-video w-full bg-black">
          {!videoMissing ? (
            <video
              ref={videoRef}
              src={birthdayConfig.assets.video}
              poster={birthdayConfig.assets.herLightPhotos[0]}
              playsInline
              muted={muted}
              controls={false}
              onError={() => setVideoMissing(true)}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#1A0E2E] via-[#06030F] to-[#1A0E2E] p-6 text-center">
              <div>
                <p className="font-display text-2xl font-light italic text-[#F5F0E1]/80 sm:text-3xl">
                  Your message plays here.
                </p>
                <p className="mt-4 text-sm text-[#D4A574]/80">
                  Drop your recorded video at:
                </p>
                <code className="mt-2 block rounded bg-black/40 px-3 py-1 text-xs text-[#D4A574]">
                  public/assets/video/birthday-video.mp4
                </code>
                <p className="mt-3 text-xs italic text-[#F5F0E1]/50">
                  Until then — keep scrolling. The final note is waiting.
                </p>
              </div>
            </div>
          )}

          {/* Center play button (only when paused) */}
          {!videoMissing && !playing && (
            <button
              onClick={togglePlay}
              aria-label="Play video"
              className="group absolute inset-0 grid place-items-center"
            >
              <span className="grid h-20 w-20 place-items-center rounded-full bg-[#D4A574]/90 shadow-2xl transition group-hover:scale-110 group-hover:bg-[#D4A574]">
                <Play className="h-8 w-8 translate-x-0.5 text-[#06030F]" fill="currentColor" />
              </span>
            </button>
          )}

          {/* Bottom controls (only when video loaded) */}
          {!videoMissing && (
            <div className="absolute bottom-[8vh] left-0 right-0 z-10 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
              <button
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="grid h-10 w-10 place-items-center rounded-full bg-[#D4A574] text-[#06030F] shadow-lg transition hover:bg-[#E8839A] hover:text-[#FFF4E0]"
              >
                {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />}
              </button>
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[#F5F0E1] backdrop-blur transition hover:bg-white/20"
              >
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              <p className="ml-auto text-xs italic text-[#F5F0E1]/70">
                {birthdayConfig.chapters.video.caption}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
