import React, { useEffect, useState } from "react";

const LANGS = [
  { text: "Jarvis 2.0" }, { text: "ジャービス 2.0" }, { text: "贾维斯 2.0" },
  { text: "賈維斯 2.0" }, { text: "Джарвис 2.0" }, { text: "جارفيس ٢٫٠" },
  { text: "자비스 2.0" }, { text: "जर्विस 2.0" }, { text: "জারভিস ২.০" },
  { text: "जार्विस 2.0" }, { text: "ஜார்விஸ் 2.0" }, { text: "జార్విస్ 2.0" },
  { text: "ജാർവിസ് 2.0" }, { text: "ಜಾರ್ವಿಸ್ 2.0" }, { text: "જાર્વિસ 2.0" },
  { text: "ଜାରଭିସ 2.0" }, { text: "زراڤس ٢.٠" }, { text: "Χάρβις 2.0" },
  { text: "Ջարվիս 2.0" }, { text: "ჯარვის 2.0" }, { text: "ז'ארוויס 2.0" },
  { text: "Жарвис 2.0" }, { text: "جارفس 2.0" }, { text: "จาร์วิส 2.0" },
  { text: "ဂျာဗစ် 2.0" }, { text: "ជាវីស 2.0" }, { text: "ຈາວິສ 2.0" }
];

export default function JarvisSidebar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % LANGS.length);
    }, 30000);
    return () => clearInterval(id);
  }, []);

  const current = LANGS[index];

  return (
    <div
      className="
        fixed left-0 top-0 
        h-screen 
        pointer-events-none 
        flex flex-col items-center justify-between 
        py-4
      "
      style={{
        width: "clamp(40px, 4vw, 70px)",
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.4))",
        borderRight: "1px solid var(--theme-accent-glow)",
        boxShadow: "0 0 30px var(--theme-accent-shadow)",
        zIndex: 40,
        paddingTop: "clamp(10px, 1.5vh, 25px)",
        paddingBottom: "clamp(10px, 1.5vh, 25px)",
      }}
    >
      {/* Hologram Ring Scanning */}
      <div className="hologram-scan-ring" />

      {/* Top glowing dot */}
      <div
        className="rounded-full"
        style={{
          width: "clamp(6px, 0.6vw, 12px)",
          height: "clamp(6px, 0.6vw, 12px)",
          background: "var(--theme-accent)",
          boxShadow: "0 0 12px var(--theme-accent-glow)",
        }}
      />

      {/* Main text section */}
      <div
        className="flex flex-col items-center gap-3 transition-opacity duration-600"
        key={current.text}
      >
        <span
          className="jarvis-text"
          style={{
            color: "var(--theme-text)",
            writingMode: "vertical-rl",
            textOrientation: "upright",
            letterSpacing: "0.25em",
            fontWeight: 800,
            fontSize: "clamp(10px, 1vw, 18px)",
            textShadow: `
              0 0 10px var(--theme-accent-glow),
              0 0 18px var(--theme-accent),
              0 0 30px var(--theme-accent-shadow)
            `,
          }}
        >
          {current.text}
        </span>

        {/* Heartbeat Line */}
        <div
          className="relative flex justify-center"
          style={{
            height: "clamp(45px, 6vh, 90px)",
            width: "clamp(6px, 0.6vw, 12px)",
          }}
        >
          <div
            className="absolute"
            style={{
              width: "2px",
              height: "100%",
              background: "rgba(255,255,255,0.06)",
            }}
          />
          <div
            className="heartbeat-line"
            style={{
              width: "2px",
              background: "var(--theme-accent)",
              boxShadow: "0 0 10px var(--theme-accent-glow)",
            }}
          />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex flex-col items-center gap-1 pb-1">
        <div
          style={{
            width: "clamp(18px, 2vw, 38px)",
            height: "2px",
            background: "var(--theme-accent)",
            boxShadow: "0 0 10px var(--theme-accent-glow)",
          }}
        />
        <span
          className="uppercase tracking-[0.2em]"
          style={{
            fontSize: "clamp(6px, 0.6vw, 10px)",
            color: "var(--theme-text-dim)",
          }}
        >
          Online
        </span>
      </div>

      {/* Animations */}
      <style>{`
        .jarvis-text {
          animation: jarvisFade 0.8s ease-out;
        }
        @keyframes jarvisFade {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .heartbeat-line {
          position: absolute;
          top: 8px;
          height: 14px;
          animation: beatMove 1.2s ease-in-out infinite alternate;
        }
        @keyframes beatMove {
          from { transform: translateY(0px); height: 12px; }
          to   { transform: translateY(40px); height: 26px; }
        }

        .hologram-scan-ring {
          position: absolute;
          top: 20%;
          width: 100%;
          height: 3px;
          background: linear-gradient(
            to right,
            transparent,
            var(--theme-accent),
            transparent
          );
          animation: scanMove 4s linear infinite;
          opacity: 0.7;
          filter: drop-shadow(0 0 6px var(--theme-accent));
        }

        @keyframes scanMove {
          0% { transform: translateY(-180px); }
          100% { transform: translateY(300px); }
        }
      `}</style>
    </div>
  );
}
