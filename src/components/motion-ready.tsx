"use client";

import { useEffect } from "react";

/**
 * Marks the page as hydrated, so the fallback timer in the head script leaves
 * the scroll reveals animated. If the timer has already fired, nothing changes.
 */
export function MotionReady() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-motion")) root.setAttribute("data-motion", "on");
  }, []);
  return null;
}
