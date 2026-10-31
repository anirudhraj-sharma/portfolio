"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { themeColors } from "@/lib/theme-script";

type Theme = "light" | "dark";

const darkQuery = "(prefers-color-scheme: dark)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(darkQuery);
  mql.addEventListener("change", onChange);
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => {
    mql.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

function currentTheme(): Theme {
  const saved = document.documentElement.getAttribute("data-theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia(darkQuery).matches ? "dark" : "light";
}

export function ThemeToggle() {
  // Unknown on the server, so the button renders without a pressed state until hydration.
  const theme = useSyncExternalStore<Theme | null>(subscribe, currentTheme, () => null);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    // Keep the browser bar in step with the page, not with the system setting.
    for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
      meta.setAttribute("content", themeColors[next]);
    }
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked. The choice still applies until the page is closed.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === null ? undefined : theme === "dark"}
      aria-label="Dark theme"
      title="Toggle dark theme"
      className="icon-btn"
    >
      <Moon size={16} strokeWidth={1.5} aria-hidden="true" className="theme-icon-moon" />
      <Sun size={16} strokeWidth={1.5} aria-hidden="true" className="theme-icon-sun" />
    </button>
  );
}
