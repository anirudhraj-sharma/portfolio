import type { Section } from "@/data/profile";

/** The section's h2: a mono label under the section's full-width top rule. */
export function SectionHead({ section }: { section: Section }) {
  return (
    <header className="sec-head">
      <h2 id={`${section.id}-title`} className="section-label">
        {section.label}
      </h2>
    </header>
  );
}
