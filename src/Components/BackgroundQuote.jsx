import React, { useEffect, useState } from "react";

const QUOTES = [
  "Be the energy you want to attract.",
  "Small steps every day lead to big changes.",
  "Consistency compounds.",
  "Your future is created by today, not tomorrow.",
  "Push yourself, because no one else will do it for you.",
  "Dreams don't work unless you do.",
  "Focus on progress, not perfection.",
  "Stay patient. Trust the journey.",
  "One day or day one — you decide.",
  "Your only limit is your mind.",
];

export default function BackgroundQuote() {
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setI((i) => (i + 1) % QUOTES.length);
        setFade(true);
      }, 1500);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        pointer-events-none 
        fixed left-1/2 top-4 
        -translate-x-1/2 
        z-30 
        w-full 
        text-center
      "
    >
      <h2
        style={{
          fontSize: "clamp(16px, 3vw, 30px)", // responsive font size
          fontWeight: 600,
          color: "var(--theme-text)", // theme-adaptive
          opacity: fade ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
          textShadow: `
            0 0 12px var(--theme-accent),
            0 0 24px var(--theme-accent-glow)
          `,
        }}
      >
        “{QUOTES[i]}”
      </h2>
    </div>
  );
}
