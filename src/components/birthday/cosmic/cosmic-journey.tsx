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
 * The single scroll-driven experience.
 *
 * Flow:
 * 1. Opening (locked, click to begin)
 * 2. Cosmos chapter (universe blooms, prose)
 * 3. Her Light chapter (4-photo collage, prose)
 * 4. Poem chapter (sunset, Nepali poem writes itself)
 * 5. Video chapter (cinematic player)
 * 6. Promise chapter (final message + signature)
 */
export function CosmicJourney() {
  const [began, setBegan] = useState(false);

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

  const replay = () => {
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "smooth" });
    setBegan(false);
  };

  return (
    <main className="relative">
      <OpeningChapter onBegin={() => setBegan(true)} />

      {began && (
        <>
          <CosmosChapter />
          <HerLightChapter />
          <PoemChapter />
          <VideoChapter />
          <PromiseChapter onReplay={replay} />
        </>
      )}

      <BackgroundMusic autoStart={began} />
    </main>
  );
}