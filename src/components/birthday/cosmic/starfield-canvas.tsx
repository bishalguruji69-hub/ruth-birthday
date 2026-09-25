"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number; // depth 0..1 (smaller z = farther)
  r: number;
  baseAlpha: number;
  twinklePhase: number;
  twinkleSpeed: number;
  hue: number; // 0 = white, 1 = gold, 2 = rose
};

const HUES = [
  { r: 245, g: 240, b: 225 }, // warm white
  { r: 212, g: 165, b: 116 }, // gold
  { r: 232, g: 131, b: 154 }, // rose
  { r: 255, g: 255, b: 240 }, // pure white
];

type Props = {
  /** Density multiplier — more for hero sections. */
  density?: number;
  /** Color theme — shifts the palette per chapter. */
  theme?: "cosmos" | "sunset" | "dawn";
  className?: string;
};

/**
 * StarfieldCanvas
 * A canvas-rendered parallax starfield.
 * - Stars twinkle independently
 * - Mouse / scroll drives subtle parallax (closer stars move more)
 * - Theme shifts the visible palette + background tint
 */
export function StarfieldCanvas({
  density = 1,
  theme = "cosmos",
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const scrollRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize handling
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Regenerate stars on resize
      const count = Math.floor((w * h) / 4500 * density);
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.3 + 0.3,
        baseAlpha: Math.random() * 0.7 + 0.3,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.025 + 0.005,
        hue: Math.floor(Math.random() * HUES.length),
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Animation loop
    const render = () => {
      const w = canvas.width / (window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, w, h);

      // Subtle background gradient already provided by parent. Stars on top.
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.twinklePhase += s.twinkleSpeed;
        const flicker = (Math.sin(s.twinklePhase) + 1) / 2;
        const alpha = s.baseAlpha * (0.4 + 0.6 * flicker);

        // Parallax — closer stars (higher z) move more
        const parallaxX = mouseRef.current.x * s.z * 18;
        const parallaxY = mouseRef.current.y * s.z * 18;
        const scrollParallax = scrollRef.current * s.z * 0.06;

        const x = s.x + parallaxX;
        const y = s.y + parallaxY - scrollParallax;
        const wrappedY = ((y % h) + h) % h;

        const hueColor = HUES[s.hue];
        // Glow for closer stars
        if (s.z > 0.7) {
          const grad = ctx.createRadialGradient(x, wrappedY, 0, x, wrappedY, s.r * 6);
          grad.addColorStop(0, `rgba(${hueColor.r}, ${hueColor.g}, ${hueColor.b}, ${alpha * 0.35})`);
          grad.addColorStop(1, `rgba(${hueColor.r}, ${hueColor.g}, ${hueColor.b}, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, wrappedY, s.r * 6, 0, Math.PI * 2);
          ctx.fill();
        }
        // Star core
        ctx.fillStyle = `rgba(${hueColor.r}, ${hueColor.g}, ${hueColor.b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, wrappedY, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [density, theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className || ""}`}
    />
  );
}
