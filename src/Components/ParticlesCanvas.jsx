import React, { useEffect, useRef } from "react";

export default function ParticlesCanvas({ theme = "fire" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    /* THEME COLORS */
    const palettes = {
      fire: ["rgba(255,120,40,0.9)", "rgba(255,80,20,0.9)", "rgba(255,170,65,0.85)"],
      ice: ["rgba(120,230,255,0.9)", "rgba(80,200,255,0.8)", "rgba(160,240,255,0.75)"],
      galaxy: ["rgba(160,120,255,0.9)", "rgba(60,220,255,0.8)"],
      aurora: ["rgba(140,245,140,0.9)", "rgba(200,255,140,0.8)"],
    };
    const colors = palettes[theme] || palettes.fire;

    /* PARTICLE GROUPS */
    let network = [];
    let falling = [];
    let stars = [];

    /* --- 1) Network particles --- */
    function initNetwork() {
      const count = 120;
      network = [];
      for (let i = 0; i < count; i++) {
        network.push({
          x: Math.random() * W,
          y: Math.random() * H,
          size: Math.random() * 2 + 1,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          c: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    /* --- 2) Falling particles (embers) --- */
    function initFalling() {
      falling = [];
      for (let i = 0; i < 60; i++) {
        falling.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vy: Math.random() * 1.8 + 0.6,
          drift: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.6 + 0.4,
          c: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    /* --- 3) Stars --- */
    function initStars() {
      stars = [];
      for (let i = 0; i < 40; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          size: Math.random() * 1.4 + 0.2,
          vy: Math.random() * 0.3 + 0.1,
          alpha: Math.random() * 0.8 + 0.2,
          tw: Math.random() * 0.03 + 0.01,
        });
      }
    }

    initNetwork();
    initFalling();
    initStars();

    /* --- DRAW --- */
    function drawParticle(p) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.c;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function connectNetwork() {
      const max = 110;
      for (let i = 0; i < network.length; i++) {
        for (let j = i + 1; j < network.length; j++) {
          const dx = network[i].x - network[j].x;
          const dy = network[i].y - network[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < max) {
            ctx.strokeStyle = `rgba(255,140,40,${1 - dist / max})`;
            ctx.beginPath();
            ctx.moveTo(network[i].x, network[i].y);
            ctx.lineTo(network[j].x, network[j].y);
            ctx.stroke();
          }
        }
      }
    }

    /* --- ANIMATION LOOP --- */
    function animate() {
      ctx.clearRect(0, 0, W, H);

      /* Network */
      network.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        drawParticle(p);
      });

      connectNetwork();

      /* Falling embers */
      falling.forEach(p => {
        p.y += p.vy;
        p.x += p.drift;

        if (p.y > H) {
          p.y = -10;
          p.x = Math.random() * W;
        }

        drawParticle(p);
      });

      /* Stars */
      stars.forEach(s => {
        s.y += s.vy;
        s.alpha += (Math.random() - 0.5) * s.tw;

        if (s.alpha < 0.1) s.alpha = 0.1;
        if (s.alpha > 1) s.alpha = 1;

        if (s.y > H) {
          s.y = -10;
          s.x = Math.random() * W;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    /* Resize */
    window.addEventListener("resize", () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initNetwork();
      initFalling();
      initStars();
    });

  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
