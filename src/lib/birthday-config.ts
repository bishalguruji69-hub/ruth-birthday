/**
 * ============================================================
 *  🌌 TO RUTH, WRITTEN IN THE STARS  —  CUSTOMIZE HERE
 * ============================================================
 *
 *  Everything you might want to change lives in this one file.
 *  Edit the values below, save, and the website updates.
 *
 *  TO ADD YOUR OWN PHOTOS/VIDEO:
 *    Drop your files in the matching paths in /public/assets/
 *    Use the EXACT filenames shown below.
 *
 *  TO DEPLOY ON VERCEL:
 *    1. Push this project to a GitHub repo
 *    2. Go to vercel.com → New Project → import the repo
 *    3. Click Deploy. Done. Vercel gives you a URL to send her.
 *
 *  ✨ The website is a single scroll-driven cinematic experience.
 *     The user just scrolls — no clicking through 8 separate pages.
 * ============================================================
 */

export const birthdayConfig = {
  // 🎀 Her details
  herName: "Ruth Tamang",
  herShortName: "Ruth",

  // 💝 YOUR name — replace with your name
  //     (this signs the final love message)
  yourName: "Bishal guruji", // ← CHANGE THIS

  // 📜 THE NEPALI POEM
  //     Paste your Nepali poem below, one line per array item.
  //     Devanagari script is supported (e.g., "तिमी मेरो संसार हौ").
  //     Lines appear letter-by-letter in starlight during the poem chapter.
  poemTitle: "जे छ, मनमै छ",
  poemLines: [
    "भन्न धेरै कुरा छन्, तर शब्दहरू निस्कँदैनन् । मनभित्र धेरै पीडा छ, तर आँखा पनि अब रोदैनन् ।",
    "कसैलाई दोष दिन मन छैन, कसैसँग गुनासो पनि छैन। बस, जे भयो मनमै राखेको छु, किनकि सबै कुरा सबैलाई सुनाउन सकिँदैन।",
    "केही सम्झना यस्ता हुन्छन्, जति बिर्सन खोजे पनि झन् गहिरिन्छन् । केही मान्छे टाढा भए पनि, मनबाट कहिल्यै टाढिँदैनन्",
    "अब जे छ, मनमै छ - केही पीडा, केही सम्झना, र केही अधुरा कुरा... जुन सायद जीवनभर मनमै रहन्छ",
  ].filter(Boolean),
  // Optional: a short English gloss/translation shown beneath the poem
  poemTranslation: "", // ← leave "" to hide

  // 📖 CHAPTER PROSE — the words she reads as she scrolls
  //     Each chapter is a moment in the journey. Edit the text freely.
  chapters: {
    opening: {
      // First thing she sees (letter-by-letter reveal)
      whispered: "Ruth",
      invitation: "There's something I want to show you.",
      hint: "(click anywhere to begin)",
    },
    cosmos: {
      // After the universe blooms
      headline: "Today, the universe has something to say to you.",
      subhead:
        "On the day you were born, the stars rearranged themselves.\nThey have been waiting to tell you something ever since.",
    },
    herLight: {
      // Beside her photo
      headline: "Of all the lights in the sky,",
      body:
        "Yours is the one I look for first.\n\n" +
        "You came into the world quietly, the way the best things do, " +
        "and somehow, against all probability, you ended up here — reading " +
        "this. That alone is worth a thousand birthdays.",
    },
    poem: {
      // Lead-in before the poem writes itself
      leadIn: "And then, the stars wrote you a poem.",
    },
    video: {
      headline: "A message, just for you.",
      subhead: "Press play. I'll wait.",
      caption: "Recorded with love.",
    },
    promise: {
      // The final chapter
      headline: "Happy Birthday,",
      nameLine: "Ruth Gurung.",
      body:
        "However many orbits the earth makes around the sun, I want to be " +
        "beside you for every single one. Thank you for being born. Thank " +
        "you for being mine. Thank you for being you.",
      closing: "Always & everywhere,",
    },
  },

  // 🃏 INSIDE JOKES — small whisper stars she can discover in the cosmos chapter
  //     Each appears as a clickable star. Click reveals the joke.
  //     Leave as empty array if you don't want any.
  whisperStars: [
    // "You still owe me a rematch at bowling.",
    // "Remember that disastrous momo attempt?",
  ],

  // 🎵 MUSIC
  //     Drop your soft instrumental at:
  //     /public/assets/audio/bg-music.mp3
  musicPath: "/assets/audio/piano.mp3",
  musicEnabled: true, // set to false to disable music entirely

  // 📁 ASSET PATHS — change these only if you rename your files
  assets: {
    //heroPhoto: "/assets/photos/together.jpeg",        // Chapter 3 — her photo floating in space
    herLightPhotos: [
      "/assets/photos/first_image.jpg",
      "/assets/photos/image_3.jpeg",
      "/assets/photos/image_4.jpeg",
      "/assets/photos/image_5.jpeg",
      "/assets/photos/image_6.jpg",
    ],
    video: "/assets/video/birthday_video.mp4",
  },
} as const;

export type BirthdayConfig = typeof birthdayConfig;
