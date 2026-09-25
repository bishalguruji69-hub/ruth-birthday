# 🌌 To Ruth, Written in the Stars

A scroll-driven cinematic birthday surprise for Ruth Gurung.
Built with Next.js 16 + TypeScript + Tailwind 4 + Framer Motion.

## ✨ What this is

A single-page, scroll-driven cinematic experience. No clunky stage transitions —
the user simply scrolls through one continuous love letter written across the
universe. Seven chapters, each with its own atmosphere:

1. **Opening** — Pitch black. Her name appears letter by letter. A single
   pulsing dot invites a click.
2. **The Cosmos Awakens** — One click → the dot bursts into a parallax
   starfield. Prose: "Today, the universe has something to say to you."
3. **Her Light** — A photo of her drifts in space. Slow zoom. Glow halo.
4. **Moments Floating** — A horizontal drift of memory photos, each in its
   own cosmic frame with caption.
5. **The Poem** — Palette shifts from cosmic to warm sunset. The Nepali poem
   writes itself letter by letter in Devanagari, with starlight glow.
6. **A Message for You** — The video plays in a cinematic, letterboxed frame
   with custom controls.
7. **The Promise** — Final message + signature. Heart confetti. Replay button.

Throughout: discoverable **whisper stars** in the cosmos chapter that reveal
inside-jokes when clicked.

## ✏️ How to customize (everything lives in ONE file)

Open **`src/lib/birthday-config.ts`** and edit:

- `yourName` — your name (signature on the final chapter)
- `poemLines` — paste your Nepali poem, one line per array item. Devanagari
  script supported.
- `poemTranslation` — optional English gloss shown beneath the poem
- `whisperStars` — your shared inside-jokes (clickable stars in chapter 2)
- `chapters` — the prose text for every chapter; tweak freely
- `assets` — see below

## 📁 Where to drop your media

All media lives under `public/assets/`. Drop your real files in with these
**exact** filenames:

| Path | Used in |
|---|---|
| `public/assets/photos/hero-ruth.jpg` | Chapter 3 — her photo floating in space |
| `public/assets/photos/gallery-1.jpg` ... `gallery-5.jpg` | Chapter 4 — the memory drift row |
| `public/assets/video/birthday-video.mp4` | Chapter 6 — the cinematic video player |
| `public/assets/audio/bg-music.mp3` | Optional soft instrumental background music |

> The site works immediately even without your real files — placeholder
> images and a "Your message plays here" fallback are shown until you drop in
> real files.

## 🖥 Run locally

```bash
npm install
npm run dev
# Open http://localhost:3000 in your browser
```

(Install Node 18+ from [nodejs.org](https://nodejs.org) if needed.)

## 🚀 Deploy to Vercel (free)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "To Ruth, Written in the Stars"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ruth-birthday.git
   git push -u origin main
   ```
   (Create an empty repo on [github.com](https://github.com/new) first.)

2. **Deploy on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub
   - Click **"Import"** on your `ruth-birthday` repo
   - Vercel auto-detects Next.js → just click **"Deploy"**
   - Wait ~30 seconds. You'll get a URL like `ruth-birthday.vercel.app`
   - Optional: rename the project to something cuter in Vercel → Settings

3. **Send it to her** 🌌💌

## 🎁 Tips for the best experience

- **Send it on the morning of her birthday** so she experiences it fresh.
- The opening chapter asks her to click — perfect invitation on mobile.
- After that, she just scrolls. No instructions needed.
- Keep the video under ~50MB so it loads fast on her phone
  (use [HandBrake](https://handbrake.fr) to compress if needed).
- Photos: aim for ~1200px wide, JPG. Use [TinyPNG](https://tinypng.com) or
  [Squoosh](https://squoosh.app) to compress.
- Test the full scroll flow yourself on desktop AND mobile before sending.

## 🛠 Tech notes for nerds

- **Framework:** Next.js 16 (App Router) with Turbopack
- **Styling:** Tailwind CSS 4 + custom cosmic palette
- **Animations:** Framer Motion (`whileInView` for scroll-driven reveals)
- **Starfield:** Custom canvas component with parallax (mouse + scroll)
- **Confetti:** canvas-confetti (heart-shaped confetti on the final chapter)
- **Fonts:** Cormorant Garamond (display), Dancing Script (signature),
  Noto Serif Devanagari (poem), Inter (body)
- **Single route** (`/`) — one continuous scroll experience
- **Mobile-first responsive** — she'll probably open it on her phone

## 📂 Project structure

```
src/
├── app/
│   ├── layout.tsx              ← fonts + metadata
│   ├── page.tsx                ← loads CosmicJourney
│   └── globals.css             ← cosmic palette + animations
├── components/
│   └── birthday/
│       ├── cosmic/
│       │   ├── starfield-canvas.tsx        ← parallax star field (canvas)
│       │   ├── cosmic-journey.tsx         ← orchestrator
│       │   └── chapters/
│       │       ├── opening-chapter.tsx     ← "Ruth" letter-by-letter
│       │       ├── cosmos-chapter.tsx       ← universe blooms
│       │       ├── her-light-chapter.tsx   ← her photo + prose
│       │       ├── moments-chapter.tsx      ← horizontal drift gallery
│       │       ├── poem-chapter.tsx        ← Nepali poem letter-by-letter
│       │       ├── video-chapter.tsx        ← cinematic video
│       │       └── promise-chapter.tsx     ← final message + signature
│       └── parts/
│           ├── background-music.tsx
│           └── confetti.tsx
├── lib/
│   └── birthday-config.ts      ← ★ EDIT THIS FILE ★
└── public/
    └── assets/
        ├── photos/   ← drop your photos here
        ├── video/    ← drop your video here
        └── audio/    ← drop your music here
```

---

Made with love, written in the stars. 💫
