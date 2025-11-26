// src/components/OfflineAssistant.jsx
// Smart offline JS/React interview coach

import React, { useEffect, useRef, useState } from "react";
import QUESTIONS from "./InterviewQuestions";

// Helper: shuffle array
function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Helper: simple similarity score
function scoreAnswer(userText, idealText) {
  const norm = (s) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean);

  const userWords = norm(userText);
  const idealWords = Array.from(new Set(norm(idealText)));

  if (!userWords.length || !idealWords.length) return 0;

  let overlap = 0;
  for (const w of idealWords) {
    if (userWords.includes(w)) overlap++;
  }
  return overlap / idealWords.length;
}

export default function OfflineAssistant() {
  const [state, setState] = useState("idle"); // idle | confirm | answer | postAnswer
  const [input, setInput] = useState("");
  const [lastReply, setLastReply] = useState(
    "Say 'hello' to start your JavaScript interview practice."
  );
  const [isTyping, setIsTyping] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [order, setOrder] = useState(() =>
    shuffle([...Array(QUESTIONS.length).keys()])
  );
  const [orderPos, setOrderPos] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(null);

  const cardRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const mouthRef = useRef(null);

  // Eyes follow mouse
  useEffect(() => {
    function onMove(e) {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const fx = Math.max(-0.5, Math.min(0.5, dx));
      const fy = Math.max(-0.3, Math.min(0.3, dy));
      if (leftEyeRef.current)
        leftEyeRef.current.style.transform = `translate(${fx * 6}px, ${fy * 6}px)`;
      if (rightEyeRef.current)
        rightEyeRef.current.style.transform = `translate(${fx * 6}px, ${fy * 6}px)`;
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Mouth animation
  useEffect(() => {
    if (!mouthRef.current) return;
    mouthRef.current.style.transform = isTyping ? "scaleY(1)" : "scaleY(0.16)";
    mouthRef.current.style.opacity = isTyping ? "1" : "0.85";
  }, [isTyping]);

  // Typing simulation
  function simulateTyping(reply, cb) {
    setIsTyping(true);
    const delay = 550 + Math.random() * 500;

    setTimeout(() => {
      setIsTyping(false);
      setLastReply(reply);

      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.scrollTop = cardRef.current.scrollHeight;
        }
      }, 30);

      if (cb) cb();
    }, delay);
  }

  // Get next question index
  function getNextIndex() {
    let nextPos = orderPos;
    let nextOrder = order;

    if (nextPos >= nextOrder.length) {
      nextOrder = shuffle([...Array(QUESTIONS.length).keys()]);
      setOrder(nextOrder);
      nextPos = 0;
    }

    const idx = nextOrder[nextPos];
    setOrderPos(nextPos + 1);
    setCurrentIndex(idx);
    return idx;
  }

  function askNewQuestion() {
    setExpanded(true);
    const idx = getNextIndex();
    const qObj = QUESTIONS[idx];
    const number = idx + 1;

    simulateTyping(
      `Question #${number}:\n${qObj.question}\n\nDo you know the answer? Type "yes" or "no".`
    );

    setState("confirm");
  }

  // STOP HANDLER USED IN ALL STATES
  function stopSession() {
    simulateTyping(
      "Session ended. Say 'hello' anytime when you want to practice again. ✨"
    );
    setState("idle");
    setExpanded(false);
  }

  // ==========================
  // STATE: IDLE
  // ==========================
  function handleIdleState(text) {
    if (text === "stop") return stopSession();

    if (text.includes("hello") || text.includes("start")) {
      askNewQuestion();
    } else {
      simulateTyping('Say "hello" to start your JS interview practice.');
    }
  }

  // ==========================
  // STATE: CONFIRM
  // ==========================
  function handleConfirmState(text) {
    if (text === "stop") return stopSession();

    if (["yes", "y"].includes(text)) {
      simulateTyping(
        "Nice! Type your answer in your own words. I’ll compare it with an ideal answer."
      );
      setState("answer");
      return;
    }

    if (["no", "n"].includes(text)) {
      const a = QUESTIONS[currentIndex].answer;

      simulateTyping(
        `No worries. Here's a solid answer:\n\n${a}\n\nType "next" for another question or "stop" to end.`
      );

      setState("postAnswer");
      return;
    }

    simulateTyping('Reply "yes" if you know it or "no" if you don’t.');
  }

  // ==========================
  // STATE: ANSWER
  // ==========================
  function handleAnswerState(text) {
    if (text === "stop") return stopSession();

    const ideal = QUESTIONS[currentIndex].answer;
    const score = scoreAnswer(text, ideal);

    if (score >= 0.35) {
      simulateTyping(
        `Pretty good! Here's a refined version you can memorize:\n\n${ideal}\n\nType "next" or "stop".`
      );
    } else {
      simulateTyping(
        `Thanks! Here's the ideal interview answer:\n\n${ideal}\n\nType "next" or "stop".`
      );
    }

    setState("postAnswer");
  }

  // ==========================
  // STATE: POST-ANSWER
  // ==========================
  function handlePostAnswerState(text) {
    if (text === "stop") return stopSession();

    if (text.includes("next")) {
      askNewQuestion();
      return;
    }

    simulateTyping('Type "next" for another question or "stop" to end.');
  }

  // ==========================
  // MAIN INPUT HANDLER
  // ==========================
  function handleSend(rawVal) {
    const text = rawVal.toLowerCase().trim();
    setInput("");
    if (!text) return;

    if (!expanded) setExpanded(true);

    if (text === "stop") return stopSession();

    if (state === "idle") handleIdleState(text);
    else if (state === "confirm") handleConfirmState(text);
    else if (state === "answer") handleAnswerState(text);
    else if (state === "postAnswer") handlePostAnswerState(text);
  }

  return (
    <>
      <div className="assistant-compact mb-20" style={{ right: 48, bottom: 48 }}>
        <div
          ref={cardRef}
          className={
            "assistant-card robot-3d hologram" +
            (expanded ? " assistant-expanded" : "")
          }
        >
          {/* Avatar top */}
          <div className="robot-top">
            <div className="robot-head">
              <div className="robot-eyes-2">
                <div ref={leftEyeRef} className="eye-2 left" />
                <div ref={rightEyeRef} className="eye-2 right" />
              </div>
              <div className="robot-core" />
              <div ref={mouthRef} className="robot-mouth" />
            </div>
            <div className="robot-meta">
              <div className="robot-name">Jarvis 2.0</div>
              <div className="robot-role">YOUR AI</div>
            </div>
          </div>

          {/* Message */}
          <div className="assistant-message">
            {isTyping ? "..." : lastReply}
          </div>

          <div className={`typing ${isTyping ? "show" : ""}`}>
            <span />
            <span />
            <span />
          </div>

          {/* INPUT BAR */}
          <div className="assistant-input-row">
            <input
              className="assistant-input"
              value={input}
              placeholder="Type here..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
            />
            <button className="assistant-send" onClick={() => handleSend(input)}>
              ➤
            </button>
          </div>

          {/* Quick Buttons */}
          <div className="assistant-quick">
            <button className="mini" onClick={() => handleSend("hello")}>
              Start
            </button>
            <button className="mini" onClick={() => handleSend("next")}>
              Next
            </button>
            <button className="mini" onClick={() => handleSend("stop")}>
              Stop
            </button>
          </div>
        </div>
      </div>

      {/* Extra styles */}
      <style>{`
        .assistant-card {
          max-height: 190px;
          overflow-y: auto;
          transition: max-height 0.45s ease, transform 0.4s ease;
          padding-bottom: 110px;
        }
        .assistant-card.assistant-expanded {
          max-height: 540px;
          transform: translateY(-10px);
        }
        .assistant-input-row {
          position: sticky;
          bottom: 20px;
          display: flex;
          gap: 10px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(18px);
          padding: 12px 16px;
          margin: 0 12px;
          border-radius: 18px;
        }
        .assistant-input {
          flex: 1;
          border: none;
          padding: 12px;
          background: rgba(255,255,255,0.15);
          color: white;
          border-radius: 12px;
        }
        .assistant-send {
          width: 48px;
          height: 48px;
          background: #00c8ff;
          border-radius: 14px;
          font-size: 22px;
          border: none;
        }
      `}</style>
    </>
  );
}
