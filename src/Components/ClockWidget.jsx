import React, { useEffect, useState } from "react";
import ParticlesCanvas from "./ParticlesCanvas";
import BackgroundQuote from "./BackgroundQuote";
import TasksPanel from "./TasksPanel";
import StopWatch from "./StopWatch";
import OfflineAssistant from "./OfflineAssistant";

const UI_REF_IMAGE = "/mnt/data/818392ef-7073-4141-889a-59c2d33a6c4e.png";

function formatTime(date) {
  return {
    hh: String(date.getHours()).padStart(2, "0"),
    mm: String(date.getMinutes()).padStart(2, "0"),
    ss: String(date.getSeconds()).padStart(2, "0"),
  };
}

export default function ClockWidget() {
  const [now, setNow] = useState(new Date());
  const [themeIndex, setThemeIndex] = useState(0);
  const themes = ["fire", "ice", "galaxy", "aurora"];

  // Update time smoothly
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 500);
    return () => clearInterval(timer);
  }, []);

  // Auto-cycle theme every 20 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setThemeIndex((i) => (i + 1) % themes.length);
    }, 20000); // 20s per theme
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const theme = themes[themeIndex];
    document.body.classList.remove(
      "theme-fire",
      "theme-ice",
      "theme-galaxy",
      "theme-aurora"
    );
    document.body.classList.add(`theme-${theme}`);
  }, [themeIndex]);

  const { hh, mm, ss } = formatTime(now);
  const theme = themes[themeIndex]; // (agar kahin use karna ho future me)

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
      {/* Particles behind everything. Pass theme so colors follow theme */}
      <ParticlesCanvas theme={theme} />

      {/* Top big quote */}
      <BackgroundQuote />

      {/* (hidden ref image) */}
      <img
        src={UI_REF_IMAGE}
        alt="ui-ref"
        className="hidden"
        style={{ width: 420, height: 420 }}
      />

      {/* MAIN WRAPPER */}
      <div className="relative z-20 flex flex-col items-center gap-6 w-full max-w-6xl px-4 pb-6 md:pb-10">
        {/* -------- CLOCK CIRCLE (same UI) -------- */}
        <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] rounded-full flex items-center justify-center clock-card">
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: "inset 0 12px 40px rgba(0,0,0,0.6)",
            }}
          />

          {/* Inner face */}
          <div className="w-60 h-60 sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px] rounded-full bg-white/4 flex items-center justify-center">
            <div className="text-center select-none">
              <div className="font-extrabold tracking-wide fire-glow text-[40px] sm:text-[56px] md:text-[72px]">
                {hh}
                <span className="mx-2 opacity-80">:</span>
                {mm}
                <span className="mx-2 opacity-50">:</span>
                <span className="text-[22px] sm:text-[28px] md:text-[34px] align-super">
                  {ss}
                </span>
              </div>

              {/* Country label */}
              <div className="mt-3 flex items-center justify-center gap-2 text-orange-200/80 text-xs sm:text-sm">
                <span style={{ fontSize: 20 }}>🇮🇳</span>
                <span>India</span>
              </div>
            </div>
          </div>

          {/* SVG seconds ring */}
          <svg className="absolute" width="420" height="420">
            <g transform="translate(210,210)">
              <circle
                r="190"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="6"
                fill="none"
              />
              <circle
                r="190"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                stroke="url(#grad)"
                strokeDasharray={2 * Math.PI * 190}
                strokeDashoffset={
                  2 * Math.PI * 190 * (1 - parseInt(ss, 10) / 60)
                }
                style={{ transition: "stroke-dashoffset 0.35s linear" }}
              />
            </g>
            <defs>
              <linearGradient id="grad" x1="0%" x2="100%">
                <stop offset="0%" stopColor="#ff8a3d" />
                <stop offset="100%" stopColor="#ff4c2f" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ============= DESKTOP LAYOUT (>= md) ============= */}
        {/* Stopwatch center under clock */}
        <div className="hidden md:flex justify-center mt-4">
          <StopWatch />
        </div>

        {/* TaskPanel bottom-left near sidebar (with gap) */}
        <div className="hidden md:block fixed bottom-8 left-24 z-30">
          <TasksPanel />
        </div>

         <div className="hidden md:block fixed bottom-6 right-24 z-20">
          <OfflineAssistant />
        </div>

        {/* NOTE: OfflineAssistant desktop position already fixed via CSS .assistant-compact */}

        {/* ============= MOBILE LAYOUT (SWIPER) ============= */}
        <div className="w-full mt-12 md:hidden">
          <div className="flex overflow-x-auto space-x-4 mobile-panels pb-3">
            {/* Slide 1: Tasks */}
            <div className="min-w-full snap-center flex justify-center">
              <TasksPanel />
            </div>

            {/* Slide 2: Stopwatch */}
            <div className="min-w-full snap-center flex justify-center">
              <StopWatch />
            </div>

            {/* Slide 3: AI Assistant */}
            <div className="min-w-full snap-center flex justify-center">
              <OfflineAssistant />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
