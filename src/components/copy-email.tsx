"use client";

import { useEffect, useRef, useState } from "react";

type CopyState = "idle" | "copied" | "failed";

const announcements: Record<CopyState, string> = {
  idle: "",
  copied: "Email address copied to the clipboard.",
  failed: "Could not copy. Select the address and copy it by hand.",
};

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    timer.current = setTimeout(() => setState("idle"), 3000);
  }

  return (
    <>
      <button type="button" onClick={copy} className="copy-btn">
        {state === "copied" ? "Copied" : state === "failed" ? "Copy failed, select the address" : "Copy email"}
      </button>
      <span role="status" className="sr-only">
        {announcements[state]}
      </span>
    </>
  );
}
