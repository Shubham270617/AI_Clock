import React, { useEffect, useState } from "react";

export default function TasksPanel({ theme }) {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("tasks")) || [];
    } catch {
      return [];
    }
  });

  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!text.trim()) return;
    setTasks([...tasks, { text, done: false }]);
    setText("");
  }

  function toggleTask(i) {
    const updated = [...tasks];
    updated[i].done = !updated[i].done;
    setTasks(updated);
  }

  function deleteTask(i) {
    if (!tasks[i].done) return; // only delete if DONE
    setTasks(tasks.filter((_, idx) => idx !== i));
  }

  // ========== PROGRESS SYSTEM ==========
  const total = tasks.length;
  const doneCount = tasks.filter((t) => t.done).length;
  const percentage = total === 0 ? 0 : Math.round((doneCount / total) * 100);

  // PANEL AUTO HEIGHT
  const BASE_HEIGHT = 170;
  const ROW_HEIGHT = 40;
  const MAX_HEIGHT = 300;

  const panelHeight = Math.min(
    BASE_HEIGHT + tasks.length * ROW_HEIGHT,
    MAX_HEIGHT
  );

  return (
    <div
      className="panel-box w-72 p-5 rounded-3xl backdrop-blur-xl relative overflow-hidden select-none transition-all duration-300"
      style={{
        height: `${panelHeight}px`,
        background: "var(--theme-bg)",
        border: "1px solid var(--theme-accent-glow)",
        boxShadow: "0 0 24px var(--theme-accent-shadow)",
        transform: "perspective(900px) rotateX(6deg)",
      }}
    >
      {/* Top Glow */}
      <div
        className="absolute top-0 left-0 w-full h-1.5"
        style={{
          background: "var(--theme-accent)",
          boxShadow: "0 0 20px var(--theme-accent-glow)",
        }}
      />

      {/* ===== Progress Bar Section ===== */}
      <h2
        className="text-lg font-semibold tracking-wide mb-2"
        style={{ color: "var(--theme-text)" }}
      >
        ✨ Task Console
      </h2>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span style={{ color: "var(--theme-text-dim)" }}>
            {doneCount}/{total} tasks
          </span>
          <span style={{ color: "var(--theme-text)" }}>{percentage}%</span>
        </div>

        {/* Progress bar */}
        <div
          className="w-full h-2 rounded-full overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              background: "var(--theme-accent)",
              boxShadow: "0 0 10px var(--theme-accent-glow)",
            }}
          />
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add new task..."
          className="flex-1 p-2 rounded-xl text-sm"
          style={{
            background: "var(--theme-input-bg)",
            color: "var(--theme-text)",
            border: "1px solid var(--theme-accent-border)",
          }}
        />

        <button
          onClick={addTask}
          className="px-4 py-2 rounded-xl text-sm font-semibold"
          style={{
            background: "var(--theme-button-bg)",
            color: "var(--theme-button-text)",
            boxShadow: "0 0 16px var(--theme-accent-glow)",
          }}
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <div
        className="space-y-3 overflow-auto pr-1"
        style={{
          maxHeight: `${MAX_HEIGHT - BASE_HEIGHT}px`,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`div::-webkit-scrollbar{display:none;}`}</style>

        {tasks.map((task, i) => (
          <div
            key={i}
            className="flex justify-between items-center px-3 py-2 rounded-xl shadow-inner transition-all"
            style={{
              background: "var(--theme-card-bg)",
              border: "1px solid var(--theme-accent-border)",
              boxShadow: task.done
                ? "inset 0 0 15px var(--theme-accent-glow)"
                : "inset 0 0 8px var(--theme-accent-shadow)",
            }}
          >
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => toggleTask(i)}
                className="w-5 h-5 rounded-md transition-all"
                style={{
                  border: `1px solid var(--theme-accent)`,
                  background: task.done
                    ? "var(--theme-accent)"
                    : "var(--theme-input-bg)",
                  boxShadow: "0 0 10px var(--theme-accent-shadow)",
                }}
              ></div>

              <span
                className="text-sm tracking-wide"
                style={{
                  color: task.done
                    ? "var(--theme-text-dim)"
                    : "var(--theme-text)",
                  textDecoration: task.done ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
            </label>

            <button
              onClick={() => deleteTask(i)}
              className="text-md font-bold transition-transform"
              style={{
                color: task.done
                  ? "var(--theme-delete)"
                  : "rgba(255, 90, 90, 0.25)",
                cursor: task.done ? "pointer" : "not-allowed",
                transform: task.done ? "scale(1)" : "scale(0.9)",
              }}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
