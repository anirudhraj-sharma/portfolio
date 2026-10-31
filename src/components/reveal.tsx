"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  as?: "div" | "article" | "figure" | "aside";
  id?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Fades and lifts an element in once, the first time it scrolls into view.
 * The animation is a CSS transition; this component only marks the element
 * with data-shown when it enters the viewport. Without JavaScript, with
 * reduced motion, and when printing, CSS shows the element as is.
 */
export function Reveal({ as = "div", id, className, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  // All tags share the same props; the cast keeps the ref type simple.
  const Tag = as as "div";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Any part in view counts: a long article on a phone may never be 20% visible at once.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -64px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      data-shown={shown ? "" : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
