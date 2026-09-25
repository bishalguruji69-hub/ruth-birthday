# 🎀 How to run "To Ruth, Written in the Stars" on your computer

## What's inside this ZIP

```
to-ruth-written-in-the-stars/
├── src/                          ← all the website code
├── public/assets/                ← drop your photos + video + audio here
├── package.json                  ← dependencies list
├── tsconfig.json, next.config.ts, etc. ← config files
├── README.md                     ← full design + Vercel deploy guide
└── INSTALL.md                    ← this file
```

You do **NOT** need to know how to code. Just follow the 4 steps below.

---

## ✅ Step 1 — Install Node.js (one-time setup)

This website runs on Node.js. It's free and standard.

1. Go to https://nodejs.org
2. Download the **LTS** version (the green button, not the "Current" one).
3. Run the installer. Just click "Next" through all the defaults.
4. **Restart your computer** (or at least close and reopen your terminal).

> To verify it installed: open a terminal and type `node -v` then `npm -v`.
> You should see version numbers (Node 18+ and npm 9+).

---

## ✅ Step 2 — Unzip and install dependencies

1. **Unzip** this ZIP file anywhere you like, e.g.:
   - Windows: `C:\Users\YOUR_NAME\Desktop\ruth-birthday`
   - Mac: `~/Desktop/ruth-birthday`

2. Open a terminal **inside that folder**:
   - **Windows**: Open the folder in File Explorer, then hold `Shift` and right-click
     in empty space → choose "Open PowerShell window here" (or "Open Terminal").
   - **Mac**: Open Terminal, type `cd ` (with the trailing space), then drag the
     folder from Finder into the Terminal window and press Enter.

3. Run this command to install all dependencies (this takes ~2–4 minutes the first time):
   ```
   npm install
   ```

---

## ✅ Step 3 — Run it locally

In the same terminal:

```
npm run dev
```

You'll see something like:
```
  ▲ Next.js 16.1.3
  - Local:        http://localhost:3000
  ✓ Ready in 1.2s
```

**Open your browser** and go to: **http://localhost:3000**

🎉 The website is now running on your computer. Bookmark that URL.

> To **stop the server**: go back to the terminal and press `Ctrl + C`.

---

## ✏️ Step 4 — Customize it (your name, poem, photos, video)

### A) Edit your name + the Nepali poem + inside jokes

Open this file in any text editor (VS Code, Notepad, TextEdit — anything works):

```
src/lib/birthday-config.ts
```

Find and change:
- `yourName: "YOUR_NAME_HERE"` → your name
- `poemLines: [...]` → paste your Nepali poem, one line per item
- `whisperStars: [...]` → your shared inside jokes (optional)
- All the prose under `chapters: {...}` is yours to edit freely

Save the file. The website in your browser will **auto-refresh** within a second.

### B) Drop your photos + video + music in

Open the folder `public/assets/`. You'll see subfolders:

```
public/assets/
├── photos/
│   ├── hero-ruth.jpg          ← your favorite photo of her (shown in chapter 3)
│   ├── gallery-1.jpg ... gallery-5.jpg    ← 5 memory photos (chapter 4)
├── video/
│   └── birthday-video.mp4     ← your recorded video (chapter 6)
└── audio/
    └── bg-music.mp3            ← soft instrumental (optional)
```

**Replace the placeholder files with your real ones, using the EXACT same filenames.**
The website will pick them up automatically.

> Tip: For photos, JPG ~1200px wide works great. Compress with
> https://tinypng.com if needed. For the video, keep it under 50 MB.

---

## 🚀 Step 5 (later) — Deploy to Vercel and send her the link

Once you're happy with how it looks locally, deploy it so Ruth can open it
from her phone:

1. **Create a GitHub account** (free) at https://github.com if you don't have one.
2. **Download GitHub Desktop** from https://desktop.github.com (easier than the
   command line) — or use the `git` commands in README.md.
3. **Push your project folder to a new GitHub repo** named something like
   `ruth-birthday`.
4. Go to **https://vercel.com/new**
5. Sign in with GitHub → click **"Import"** on your `ruth-birthday` repo
6. Click **"Deploy"** (don't change any settings — Vercel auto-detects Next.js)
7. Wait ~30 seconds. Vercel gives you a URL like:
   `https://ruth-birthday-xyz123.vercel.app`
8. **Send her the URL** 💝

You can also rename the project to something cuter in Vercel → Settings → Domains.

---

## 🆘 Troubleshooting

**"command not found: npm"** — Node.js isn't installed. Go back to Step 1.

**Port 3000 is already in use** — Run `npm run dev -- -p 3001` instead, then
open `http://localhost:3001`.

**Photos aren't showing** — Make sure the filenames match EXACTLY
(case-sensitive). `hero-ruth.jpg` not `Hero-Ruth.JPG` or `hero_ruth.jpg`.

**Video doesn't play** — Make sure it's an MP4 file and not too large
(under 50MB is best). Try https://handbrake.fr to compress.

**Anything else** — open an issue on the GitHub repo, or just email me.

---

Made with love. Have a beautiful birthday, Ruth. 💫
