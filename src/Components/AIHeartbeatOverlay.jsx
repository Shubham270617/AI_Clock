import React from "react";

export default function AIHeartbeatOverlay() {
  return (
    <>
      {/* Global AI pulse glow */}
      <div className="ai-heartbeat-pulse" />

      {/* Neural Mesh (center AI brain) */}
      <div className="ai-neural-mesh" />

      <style>{`
        /* =====================================================
             1. AI HEARTBEAT CORE PULSE (GLOBAL BACKLIGHT)
        ===================================================== */
        .ai-heartbeat-pulse {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 5;

          background: radial-gradient(
            circle at center,
            rgba(255,120,40,0.10),
            transparent 70%
          );

          opacity: 0;
          animation: aiPulse 3s infinite ease-in-out;
        }

        @keyframes aiPulse {
          0%   { opacity: 0; transform: scale(1); }
          15%  { opacity: 0.35; transform: scale(1.03); }
          30%  { opacity: 0.18; transform: scale(1.06); }
          100% { opacity: 0; transform: scale(1); }
        }


        /* =====================================================
             2. AI NEURAL MESH (Glow Brain Layer)
        ===================================================== */
        .ai-neural-mesh {
          position: fixed;
          top: 50%;
          left: 50%;
          pointer-events: none;
          z-index: 4;

          /* RESPONSIVE SIZE */
          width: clamp(320px, 55vw, 900px);
          height: clamp(320px, 55vw, 900px);

          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.16;
          mix-blend-mode: screen;

          transform: translate(-50%, -50%);
          animation: neuralFlow 12s infinite ease-in-out alternate;
        }

        @keyframes neuralFlow {
          0% {
            transform: translate(-50%, -50%) scale(1);
            filter: blur(0px);
            opacity: 0.14;
          }
          50% {
            transform: translate(-50%, -52%) scale(1.08);
            filter: blur(1px);
            opacity: 0.25;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.05);
            filter: blur(2px);
            opacity: 0.18;
          }
        }

        /* =====================================================
             3. ULTRA-SMALL DEVICES SAFETY FIX (portrait phones)
        ===================================================== */
        @media (max-width: 480px) {
          .ai-neural-mesh {
            opacity: 0.12;
            filter: blur(1px);
          }
          .ai-heartbeat-pulse {
            background: radial-gradient(
              circle at center,
              rgba(255,120,40,0.14),
              transparent 80%
            );
          }
        }

        /* =====================================================
             4. TABLET FIX
        ===================================================== */
        @media (max-width: 820px) {
          .ai-neural-mesh {
            width: clamp(260px, 70vw, 600px);
            height: clamp(260px, 70vw, 600px);
          }
        }

      `}</style>
    </>
  );
}
