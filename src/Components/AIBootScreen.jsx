import React, { useEffect, useRef, useState } from "react";
import eyesImg from "../assets/Robotic_eye-removebg-preview.png";
import startupSound from "../assets/robot-sound.mp3";   // <-- your sound file

const BOOT_LINES = [
  "Initializing neural core...",
  "Calibrating sensors...",
  "Loading visual modules...",
  "Activating time engine...",
  "Syncing memory clusters...",
  "Stabilizing system...",
  "Jarvis 2.0 is online.",
];

const EYE_COLORS = [
  "#00eaff",
  "#22ff88",
  "#ffdd55",
  "#ff8844",
  "#4488ff",
  "#ff55aa",
  "#00eaff"
];

export default function AIBootScreen({ onFinish }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [phase, setPhase] = useState("boot"); 
  const [eyeColor, setEyeColor] = useState(EYE_COLORS[0]);

  const timers = useRef([]);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio instance
    audioRef.current = new Audio(startupSound);
    audioRef.current.volume = 1.0;  // set louder volume
    audioRef.current.play().catch(() => {});

    let index = 0;

    function next() {
      if (index < BOOT_LINES.length) {
        setVisibleLines((prev) => [...prev, BOOT_LINES[index]]);
        setEyeColor(EYE_COLORS[index]);
        index++;

        timers.current.push(setTimeout(next, 5000));
      } else {
        // STOP AUDIO BEFORE UI LOADS
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }, 300);

        // Boot finished → BLACKOUT → GLITCH → UI
        timers.current.push(setTimeout(() => setPhase("blackout"), 900));
        timers.current.push(setTimeout(() => setPhase("glitch"), 2400));
        timers.current.push(
          setTimeout(() => {
            setPhase("done");
            if (onFinish) onFinish();
          }, 3800)
        );
      }
    }

    next();

    return () => {
      timers.current.forEach(clearTimeout);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [onFinish]);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-99999 flex flex-col items-center justify-center"
      style={{
        background: phase === "blackout" ? "black" : "rgba(0,0,0,1)",
        transition: "background 0.6s ease",
      }}
    >

      {/* EYES BACKGROUND */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: phase === "blackout" ? 0 : 0.15,
          transition: "opacity 0.8s ease",
        }}
      >
        <img
          src={eyesImg}
          className="eyePulse"
          style={{
            width: "90%",
            maxWidth: "1050px",
            minWidth: "260px",
            objectFit: "contain",
            filter: `drop-shadow(0 0 25px ${eyeColor})`,
          }}
        />
      </div>

      {/* SPARKS */}
      <div
        className="absolute pointer-events-none flex gap-12 sm:gap-20"
        style={{
          top: "22%",
          transform: "scale(0.7)",
        }}
      >
        <div
          className="sparkCore"
          style={{
            borderColor: eyeColor,
            boxShadow: `0 0 20px ${eyeColor}`,
          }}
        />
        <div
          className="sparkCore"
          style={{
            borderColor: eyeColor,
            boxShadow: `0 0 20px ${eyeColor}`,
          }}
        />
      </div>

      {/* BOOT TEXT */}
      {phase === "boot" && (
        <div className="relative z-20 text-center px-4 w-full max-w-[420px]">
          <h1
            className="tracking-[0.28em] mb-4 text-xs sm:text-sm md:text-base"
            style={{
              color: eyeColor,
              textShadow: `0 0 15px ${eyeColor}`,
            }}
          >
            AI SYSTEM BOOTING...
          </h1>

          <div className="text-left mx-auto w-full">
            {visibleLines.map((line, i) => (
              <div
                key={i}
                className="bootLine"
                style={{
                  color: "#dffaff",
                  fontFamily: "monospace",
                  marginBottom: "3px",
                  fontSize: "0.75rem",
                }}
              >
                • {line}
              </div>
            ))}
          </div>
        </div>
      )}

      {phase === "glitch" && (
        <div className="absolute inset-0 glitchFlash pointer-events-none" />
      )}

      {/* ANIMATIONS */}
      <style>{`
        .eyePulse {
          animation: eyePulseAnim 4s ease-in-out infinite;
        }
        @keyframes eyePulseAnim {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 0.9; }
        }

        .bootLine {
          animation: bootFadeIn 0.5s ease-out;
        }
        @keyframes bootFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .glitchFlash {
          background: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0.2) 0px,
            rgba(255,255,255,0.2) 2px,
            rgba(0,0,0,1) 4px,
            rgba(0,0,0,1) 6px
          );
          animation: glitchAnim 0.12s infinite;
        }

        @keyframes glitchAnim {
          0% { opacity: 0.3; transform: translate(0,0); }
          50% { opacity: 0.7; transform: translate(3px,-2px); }
          100% { opacity: 0.3; transform: translate(-3px,2px); }
        }

        .sparkCore {
          width: 22px;
          height: 22px;
          border: 2px solid;
          border-radius: 50%;
          animation: sparkAnim 0.4s infinite alternate;
        }

        @keyframes sparkAnim {
          from { transform: scale(1); opacity: 0.8; }
          to { transform: scale(1.3); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
