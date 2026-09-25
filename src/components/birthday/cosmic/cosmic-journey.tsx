"use client";

import { useEffect, useState } from "react";
import { OpeningChapter } from "@/components/birthday/cosmic/chapters/opening-chapter";
import { CosmosChapter } from "@/components/birthday/cosmic/chapters/cosmos-chapter";
import { HerLightChapter } from "@/components/birthday/cosmic/chapters/her-light-chapter";
import { PoemChapter } from "@/components/birthday/cosmic/chapters/poem-chapter";
import { VideoChapter } from "@/components/birthday/cosmic/chapters/video-chapter";
import { PromiseChapter } from "@/components/birthday/cosmic/chapters/promise-chapter";
import { BackgroundMusic } from "@/components/birthday/parts/background-music";

/**
 * CosmicJourney
 *
 * iOS notes:
 * - Body overflow:hidden doesn't actually stop touch-scroll on iOS Safari.
 *   We also lock touchmove + wheel + a passive:false listener for reliability.
 */
export function CosmicJourney() {
  const [began, setBegan] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    if (began) {
      document.body.style.overflow = "auto";
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [began]);

  // iOS-specific scroll lock: prevent touchmove/wheel/keys while on the opening.
  useEffect(() => {
    if (began) return;
    const preventScroll = (e: TouchEvent | WheelEvent | KeyboardEvent) => {
      if (
        e.cancelable &&
        e.type === "touchmove" &&
        (e as TouchEvent).touches.length > 1
      ) {
        return; // allow pinch-zoom-out (escape hatch)
      }
      e.preventDefault();
    };
    document.addEventListener("touchmove", preventScroll, { passive: false });
    document.addEventListener("wheel", preventScroll, { passive: false });
    const keysToBlock = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", " ", "Home", "End"];
    const blockKeys = (e: KeyboardEvent) => {
      if (keysToBlock.includes(e.key)) e.preventDefault();
    };
    document.addEventListener("keydown", blockKeys);
    return () => {
      document.removeEventListener("touchmove", preventScroll);
      document.removeEventListener("wheel", preventScroll);
      document.removeEventListener("keydown", blockKeys);
    };
  }, [began]);

  const replay = () => {
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "smooth" });
    setBegan(false);
    setVideoPlaying(false);
  };

  return (
    <main className="relative">
      <OpeningChapter onBegin={() => setBegan(true)} />

      {began && (
        <>
          <CosmosChapter />
          <HerLightChapter />
          <PoemChapter />
          <VideoChapter
            onVideoPlay={() => setVideoPlaying(true)}
            onVideoPause={() => setVideoPlaying(false)}
          />
          <PromiseChapter onReplay={replay} />
        </>
      )}

      <BackgroundMusic autoStart={began} pauseForVideo={videoPlaying} />
    </main>
  );
}