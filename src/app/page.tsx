"use client";

import dynamic from "next/dynamic";

// Load orchestrator client-side only — it uses framer-motion + browser APIs
const CosmicJourney = dynamic(
  () =>
    import("@/components/birthday/cosmic/cosmic-journey").then(
      (m) => m.CosmicJourney
    ),
  { ssr: false }
);

export default function Home() {
  return <CosmicJourney />;
}
