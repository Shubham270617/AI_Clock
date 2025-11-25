# Jarvis 2.0 — Advanced AI Desktop System (Made on  OpenAI)

 **Jarvis 2.0** is a fully immersive, futuristic AI desktop system inspired by Iron Man’s JARVIS and powered by **OpenAI intelligence + React animations**.
This project combines advanced UI/UX concepts, 3D‑inspired effects, glowing neon themes, animated boot screens, an offline AI assistant, productivity tools, and a modular architecture.

---

##  Features

###  **1. Cinematic AI Boot System**

* Real robotic eyes with glow & pulse animations.
* Eye‑color transitions based on init steps.
* Glitch effects + blackout phase.
* Startup sound synced with UI loading.
* Animated boot logs appearing line‑by‑line.

###  **2. Realistic Robotic Eye Rendering**

* Low‑opacity background robotic eye on fullscreen.
* Electric sparks & particle flickers.
* Morphism glow effects.

###  **3. Adaptive Neon Themes**

Auto‑changing themes every 20 seconds:

* Fire
* Ice
* Galaxy
* Aurora

Each theme updates:

* Accent colors
* Shadows & glows
* Card styles
* Input fields

###  **4. Futuristic Circular Clock**

* Animated seconds ring SVG.
* Soft neon pulses.
* Smooth time transitions.

###  **5. Offline AI Assistant**

* 3D robotic head animation.
* Eyes follow cursor.
* Mouth animates while speaking.
* Typing dots animation.
* JS interview question generator:

  * Commands: `hello`, `sure`, `next`, `repeat`, `stop`

###  **6. Task Console**

* Add / View / Finish / Delete tasks.
* Progress bar with animated glow.
* Auto‑expanding card height.
* Fully theme‑aware neon colors.

###  **7. AI Stopwatch**

* Smooth millisecond‑accurate timer via requestAnimationFrame.
* Start / Pause / Reset.
* Neon glowing card.

###  **8. Fully Responsive Layout**

#### **Desktop Layout**

* Clock center.
* Stopwatch centered below clock.
* Task Console fixed bottom‑left near sidebar.
* Offline Assistant bottom‑right.

#### **Mobile Layout**

* Everything stays under clock.
* Interactive swipe‑carousel:

  * Slide 1 → Task Console
  * Slide 2 → Stopwatch
  * Slide 3 → Offline Assistant

###  **9. Particle Background Engine**

* Animated theme‑based particles using Canvas.
* Smooth GPU‑friendly motion.

###  **10. 50+ Multi‑language "Jarvis 2.0" sidebar text**

Languages auto‑cycle every 30 seconds.

---

##  Tech Stack

### **Frontend**

* React.js
* TailwindCSS
* Custom canvas animations
* SVG motion
* CSS keyframe animations
* Responsive layout system (desktop + mobile)

### **AI / Logic**

* OpenAI (concept + behaviour modelling)
* Interactive intelligent assistant system
* JS interview generator logic

---

##  Project Structure

```
src/
│
├── Components/
│   ├── AIBootScreen.jsx
│   ├── AIHeartbeatOverlay.jsx
│   ├── BackgroundQuote.jsx
│   ├── ClockWidget.jsx
│   ├── OfflineAssistant.jsx
│   ├── ParticlesCanvas.jsx
│   ├── StopWatch.jsx
│   └── TasksPanel.jsx
│
└── assets/
    ├── Robotic_eye.png
    ├── robot-sound.mp3
    └── icons / misc assets
```

---

##  Getting Started

### 1. Install dependencies

```
npm install
```

### 2. Start the dev server

```
npm run dev
```

### 3. Build for production

```
npm run build
```

---

##  Environment Requirements

Make sure the following are available:

* Node.js 18+
* Vite or CRA (based on your setup)
* Working audio permissions in browser

---

##  Why This Project Is Unique

- Fully movie‑grade boot animation
- Rich OpenAI‑inspired AI behaviour
- Neon‑themed futuristic UI
- Cursor‑tracking robotic reactions
- Pure React + CSS animations (no heavy libs)
- Modular design and scalable architecture

---

##  Future Enhancements

* Voice‑powered commands (OpenAI + WebSpeech)
* AI chat memory
* Task deadlines & reminders
* Integrated calendar module
* Voice‑activated stopwatch

---

##  Credits

**Developed by:** Shubham Sinha
AI logic, UI design, animations & system flow built using **React + Tailwind + OpenAI**.

Robotic elements, effects & behaviours are fully custom‑built without any external UI frameworks.

---

##  Show Support

If you like this project:

* Star the repo 
* Share it
* Extend it with your own modules

Jarvis 2.0 is your personal futuristic AI workspace — enjoy the power! 
