"use client";

import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("mtb-theme");
    const initial = stored === "dark" ? "dark" : "light";
    setMode(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("mtb-theme", next);
  };

  return (
    <button type="button" className="button secondary" onClick={toggle} aria-label="Toggle color theme">
      {mode === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
