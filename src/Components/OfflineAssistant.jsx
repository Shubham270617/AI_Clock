// src/components/OfflineAssistant.jsx  (UPGRADED)
import React, { useEffect, useRef, useState } from "react";
import QUESTIONS from "./InterviewQuestions";

export default function OfflineAssistant() {
  const AVATAR = "/mnt/data/818392ef-7073-4141-889a-59c2d33a6c4e.png";
  const [state, setState] = useState("idle"); // idle, offered, asking
  const [input, setInput] = useState("");
  const [lastReply, setLastReply] = useState("Say 'hello' to start JS interview questions.");
  const [isTyping, setIsTyping] = useState(false);
  const [qIndex, setQIndex] = useState(0);

  const cardRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const mouthRef = useRef(null);

  // eyes follow mouse within card bounds
  useEffect(() => {
    function onMove(e) {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      // limit movement
      const fx = Math.max(-0.5, Math.min(0.5, dx));
      const fy = Math.max(-0.3, Math.min(0.3, dy));
      if (leftEyeRef.current) leftEyeRef.current.style.transform = `translate(${fx * 6}px, ${fy * 6}px)`;
      if (rightEyeRef.current) rightEyeRef.current.style.transform = `translate(${fx * 6}px, ${fy * 6}px)`;
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // mouth animation when typing
  useEffect(() => {
    if (!mouthRef.current) return;
    if (isTyping) {
      mouthRef.current.style.transform = "scaleY(1.0)";
      mouthRef.current.style.opacity = "1";
    } else {
      mouthRef.current.style.transform = "scaleY(0.16)";
      mouthRef.current.style.opacity = "0.85";
    }
  }, [isTyping]);

  function simulateTyping(reply, cb) {
    setIsTyping(true);
    const delay = 600 + Math.random() * 700;
    setTimeout(() => {
      setIsTyping(false);
      setLastReply(reply);
      if (cb) cb();
      // small card pulse
      if (cardRef.current) {
        cardRef.current.classList.remove("robot-pulse");
        void cardRef.current.offsetWidth;
        cardRef.current.classList.add("robot-pulse");
      }
    }, delay);
  }

  function handleSend(val) {
    const text = val.toLowerCase().trim();
    setInput("");
    if (!text) return;

    if (state === "idle") {
      if (text.includes("hello")) {
        simulateTyping("Hello! I can give you JavaScript interview questions. Type 'sure' or press Next.", () => setState("offered"));
        return;
      }
      simulateTyping("Say 'hello' to start.");
      return;
    }

    if (state === "offered") {
      if (text === "sure" || text === "yes" || text === "ok") {
        showQuestion(0);
        return;
      }
      simulateTyping("Say 'sure' when you are ready.");
      return;
    }

    if (state === "asking") {
      if (text.includes("next")) {
        showQuestion((qIndex + 1) % QUESTIONS.length);
        return;
      }
      if (text.includes("repeat")) {
        showQuestion(qIndex);
        return;
      }
      if (text.includes("stop")) {
        simulateTyping("Session ended. Say 'hello' to start again.", () => setState("idle"));
        return;
      }
      simulateTyping("Commands: next / repeat / stop");
      return;
    }
  }

  function showQuestion(index) {
    setIsTyping(true);
    setState("asking");
    setTimeout(() => {
      setIsTyping(false);
      const q = QUESTIONS[index];
      setLastReply(`Question #${index + 1}: ${q}`);
      setQIndex(index);
    }, 600 + Math.random() * 500);
  }

  return (
    <div className="assistant-compact" style={{ right: 48, bottom: 48 }}>
      <div ref={cardRef} className="assistant-card robot-3d hologram">
        <div className="robot-top">
          <div className="robot-head">
            
            {/* eyes are simple divs on top of the avatar */}
            <div className="robot-eyes-2">
              <div ref={leftEyeRef} className="eye-2 left"></div>
              <div ref={rightEyeRef} className="eye-2 right"></div>
            </div>

            {/* tiny energy core */}
            <div className="robot-core" />
            {/* mouth */}
            <div ref={mouthRef} className="robot-mouth" />
          </div>

          <div className="robot-meta">
            <div className="robot-name">Jarvis 2.0</div>
            <div className="robot-role">YOUR AI</div>
          </div>
        </div>

        <div className="assistant-message">
          {isTyping ? "..." : lastReply}
        </div>

        <div className={`typing ${isTyping ? "show" : ""}`}>
          <span></span><span></span><span></span>
        </div>

        <div className="assistant-input-row">
          <input
            className="assistant-input"
            value={input}
            placeholder="Type here..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          />
          <button className="assistant-send" onClick={() => handleSend(input)}>➤</button>
        </div>

        <div className="assistant-quick">
          <button className="mini" onClick={() => handleSend("hello")}>Start</button>
          <button className="mini" onClick={() => handleSend("next")}>Next</button>
          <button className="mini" onClick={() => handleSend("stop")}>Stop</button>
        </div>
      </div>
    </div>
  );
}
