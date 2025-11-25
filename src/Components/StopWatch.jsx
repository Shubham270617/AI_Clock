import React, { useEffect, useState, useRef } from "react";

export default function StopWatch() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const lastTick = useRef(null);

  // Smooth AI timing
  useEffect(() => {
    let raf;

    function tick(now) {
      if (lastTick.current != null) {
        const delta = now - lastTick.current;
        setTime((t) => t + delta);
      }
      lastTick.current = now;
      raf = requestAnimationFrame(tick);
    }

    if (running) {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      lastTick.current = null;
    };
  }, [running]);

  // Format time
  const ms = Math.floor(time % 1000).toString().padStart(3, "0");
  const sec = Math.floor(time / 1000) % 60;
  const min = Math.floor(time / 60000) % 60;
  const hr = Math.floor(time / 3600000);

  const formatted = {
    hr: hr.toString().padStart(2, "0"),
    min: min.toString().padStart(2, "0"),
    sec: sec.toString().padStart(2, "0"),
    ms
  };

  function reset() {
    setRunning(false);
    setTime(0);
  }

  return (
    <div
      className="panel-box w-72 p-4 rounded-3xl backdrop-blur-xl relative overflow-hidden select-none transition-all duration-300"
      style={{
        height: "250px",           // FIXED COMPACT HEIGHT
        background: "var(--theme-bg)",
        border: "1px solid var(--theme-accent-glow)",
        boxShadow: "0 0 20px var(--theme-accent-shadow)",
        transform: "perspective(900px) rotateX(5deg)"
      }}
    >
      {/* Top holo-glow */}
      <div
        className="absolute top-0 left-0 w-full h-1"
        style={{
          background: "var(--theme-accent)",
          boxShadow: "0 0 12px var(--theme-accent-glow)"
        }}
      />

      {/* Title */}
      <h2
        className="text-md font-semibold mb-3 tracking-wide"
        style={{ color: "var(--theme-text)" }}
      >
        AI Stopwatch
      </h2>

      {/* Display (more compact now) */}
      <div
        className="p-3 rounded-xl mb-4 flex flex-col items-center justify-center"
        style={{
          background: "var(--theme-card-bg)",
          border: "1px solid var(--theme-accent-border)",
          boxShadow: "inset 0 0 18px var(--theme-accent-shadow)"
        }}
      >
        <div
          className="text-3xl font-bold tracking-widest"
          style={{
            color: "var(--theme-text)",
            textShadow: "0 0 6px var(--theme-accent-glow)"
          }}
        >
          {formatted.hr}:{formatted.min}:{formatted.sec}
        </div>
        <div
          className="text-xs mt-1 opacity-80"
          style={{ color: "var(--theme-text-dim)" }}
        >
          {formatted.ms} ms
        </div>
      </div>

      {/* Controls (compact) */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setRunning(!running)}
          className="px-3 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: running
              ? "var(--theme-delete)"
              : "var(--theme-button-bg)",
            color: running ? "#fff" : "var(--theme-button-text)",
            boxShadow: "0 0 12px var(--theme-accent-glow)"
          }}
        >
          {running ? "Pause" : "Start"}
        </button>

        <button
          onClick={reset}
          className="px-3 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "var(--theme-text)",
            border: "1px solid var(--theme-accent-border)"
          }}
        >
          Reset
        </button>
      </div>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-0 w-full h-1"
        style={{
          background: "var(--theme-accent)",
          opacity: 0.4,
          boxShadow: "0 0 14px var(--theme-accent-glow)"
        }}
      />
    </div>
  );
}
