import type { ComponentProps } from "react";

/** Every link that leaves the site opens with noopener and no referrer. */
export function ExternalLink({ children, ...props }: Omit<ComponentProps<"a">, "target" | "rel">) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
