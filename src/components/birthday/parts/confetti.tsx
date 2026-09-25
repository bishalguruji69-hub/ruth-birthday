"use client";

import confetti from "canvas-confetti";

export function fireConfettiFromSides(durationMs = 2500) {
  const end = Date.now() + durationMs;
  const colors = ["#E63946", "#FFB4A2", "#D4A574", "#FFD9C9", "#FF8FA3", "#FFFFFF"];

  const leftFrame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 1 },
      colors,
      scalar: 1.1,
      ticks: 200,
    });
    if (Date.now() < end) requestAnimationFrame(leftFrame);
  };
  const rightFrame = () => {
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 1 },
      colors,
      scalar: 1.1,
      ticks: 200,
    });
    if (Date.now() < end) requestAnimationFrame(rightFrame);
  };
  leftFrame();
  rightFrame();
}

export function fireConfettiBurst() {
  const colors = ["#E63946", "#FFB4A2", "#D4A574", "#FFD9C9", "#FF8FA3"];
  confetti({
    particleCount: 120,
    spread: 80,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.6 },
    colors,
    scalar: 1.2,
  });
}

export function fireHeartConfetti() {
  const heart = confetti.shapeFromText({ text: "❤", scalar: 2 });
  confetti({
    particleCount: 40,
    spread: 100,
    startVelocity: 35,
    origin: { x: 0.5, y: 0.7 },
    shapes: [heart],
    scalar: 1.6,
    ticks: 250,
  });
}
