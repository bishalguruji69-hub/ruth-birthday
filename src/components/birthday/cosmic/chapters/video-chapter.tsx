"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { StarfieldCanvas } from "@/components/birthday/cosmic/starfield-canvas";
import { birthdayConfig } from "@/lib/birthday-config";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

type Props = {
  /** Called when the video starts playing (so background music can pause). */
  onVideoPlay?: () => void;
  /** Called when the video is paused or ends (so background music can resume). */
  onVideoPause?: () => void;
};

/**
 * VideoChapter
 * A cinematic video frame. Letterbox bars top/bottom (cinema style) on desktop.
 * On mobile portrait, the video takes ~70% of the viewport height so it feels
 * big instead of being a short 16:9 strip surrounded by empty space.
 *
 * Fullscreen button:
 * - iOS Safari: uses video.webkitEnterFullscreen() (the native iOS fullscreen player)
 * - Desktop / Android: uses standard Element.requestFullscreen() on the container
 */
export function VideoChapter({ onVideoPlay, onVideoPause }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoMissing, setVideoMissing] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
      onVideoPause?.();
    } else {
      videoRef.current
        .play()
        .then(() => {
          setPlaying(true);
          onVideoPlay?.();
        })
        .catch(() => setPlaying(false));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  // When the video ends naturally, treat it like a pause so the music resumes.
  const handleEnded = () => {
    setPlaying(false);
    onVideoPause?.();
  };

  // Cross-platform fullscreen:
  // - iOS Safari does NOT support Element.requestFullscreen() — but video
  //   elements have their own webkitEnterFullscreen() that launches the native
  //   iOS fullscreen video player (with native controls + rotation support).
  // - Desktop + Android use the standard Fullscreen API on the container so
  //   our custom controls remain visible.
  const toggleFullscreen = () => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video) return;

    // iOS-specific path (iPhone / iPad Safari)
    const wVideo = video as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      webkitExitFullscreen?: () => void;
    };
    const wDoc = document as Document & {
      webkitFullscreenElement?: Element | null;
      webkitExitFullscreen?: () => void;
    };

    if (typeof wVideo.webkitEnterFullscreen === "function") {
      // iOS — toggle native video fullscreen
      if (wDoc.webkitFullscreenElement == null && !document.fullscreenElement) {
        wVideo.webkitEnterFullscreen?.();
      } else {
        wVideo.webkitExitFullscreen?.();
        wDoc.webkitExitFullscreen?.();
      }
      return;
    }

    // Standard Fullscreen API (desktop / Android)
    if (!document.fullscreenElement) {
      // Prefer container fullscreen so our custom controls stay visible.
      const target = container ?? video;
      target.requestFullscreen?.().catch(() => {
        // Fallback: try video-only fullscreen
        video.requestFullscreen?.().catch(() => {});
      });
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  return (
    <section className="relative flex min-h-screen-safe flex-col items-center justify-center overflow-hidden bg-cosmos-deep px-4 py-20 sm:px-6 sm:py-32">
      <StarfieldCanvas density={0.5} theme="cosmos" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 mb-6 max-w-2xl text-center sm:mb-10"
      >
        <p className="font-display text-2xl font-light text-[#F5F0E1] text-glow-soft sm:text-5xl">
          {birthdayConfig.chapters.video.headline}
        </p>
        <p className="mt-3 font-display text-sm font-light italic text-[#F5F0E1]/60 sm:mt-4 sm:text-lg">
          {birthdayConfig.chapters.video.subhead}
        </p>
      </motion.div>

      {/* Cinematic frame.
          - Mobile (portrait): h-[70vh] → video takes 70% of the screen height
            instead of being a short 16:9 strip with empty space around it.
          - Desktop (sm+): aspect-video → standard 16:9 cinematic with letterbox bars.
          The video itself uses object-contain so it never gets cropped. */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="letterbox relative z-10 w-full max-w-3xl overflow-hidden rounded-sm shadow-2xl ring-1 ring-[#F5F0E1]/20"
      >
        {/* Mobile: tall container / Desktop: 16:9 */}
        <div className="relative h-[70vh] w-full bg-black sm:h-auto sm:aspect-video">
          {!videoMissing ? (
            <video
              ref={videoRef}
              src={birthdayConfig.assets.video}
              poster={birthdayConfig.assets.herLightPhotos[0]}
              playsInline
              muted={muted}
              controls={false}
              onError={() => setVideoMissing(true)}
              onEnded={handleEnded}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-[#1A0E2E] via-[#06030F] to-[#1A0E2E] p-6 text-center">
              <div>
                <p className="font-display text-xl font-light italic text-[#F5F0E1]/80 sm:text-3xl">
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

          {/* Center play button (only when paused & video loaded) */}
          {!videoMissing && !playing && (
            <button
              onClick={togglePlay}
              aria-label="Play video"
              className="group absolute inset-0 grid place-items-center"
              style={{ touchAction: "manipulation" }}
            >
              <span className="grid h-16 w-16 place-items-center rounded-full bg-[#D4A574]/90 shadow-2xl transition group-hover:scale-110 group-hover:bg-[#D4A574] sm:h-20 sm:w-20">
                <Play className="h-6 w-6 translate-x-0.5 text-[#06030F] sm:h-8 sm:w-8" fill="currentColor" />
              </span>
            </button>
          )}

          {/* Bottom controls bar (only when video loaded) */}
          {!videoMissing && (
            <div className="absolute bottom-[8vh] left-0 right-0 z-10 flex items-center gap-2 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 sm:gap-3 sm:px-6 sm:py-4">
              <button
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="grid h-9 w-9 place-items-center rounded-full bg-[#D4A574] text-[#06030F] shadow-lg transition hover:bg-[#E8839A] hover:text-[#FFF4E0] sm:h-10 sm:w-10"
                style={{ touchAction: "manipulation" }}
              >
                {playing ? (
                  <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Play className="h-4 w-4 translate-x-0.5 sm:h-5 sm:w-5" fill="currentColor" />
                )}
              </button>
              <button
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-[#F5F0E1] backdrop-blur transition hover:bg-white/20 sm:h-10 sm:w-10"
                style={{ touchAction: "manipulation" }}
              >
                {muted ? (
                  <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
              {/* Fullscreen button — works on iOS (native player) + desktop/Android */}
              <button
                onClick={toggleFullscreen}
                aria-label="Fullscreen"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-[#F5F0E1] backdrop-blur transition hover:bg-white/20 sm:h-10 sm:w-10"
                style={{ touchAction: "manipulation" }}
              >
                <Maximize className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
              <p className="ml-auto text-[10px] italic text-[#F5F0E1]/70 sm:text-xs">
                {birthdayConfig.chapters.video.caption}
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Hint for mobile users */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6, duration: 1.0 }}
        className="relative z-10 mt-4 text-[10px] uppercase tracking-[0.25em] text-[#D4A574]/60 sm:hidden"
      >
        tap ⤢ for fullscreen
      </motion.p>
    </section>
  );
}