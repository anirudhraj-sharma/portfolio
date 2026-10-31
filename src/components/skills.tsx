import { sections, skills } from "@/data/profile";
import { SectionHead } from "./section-head";

/** Four rows: a group name, then its items as a dot-separated run. */
export function Skills() {
  const section = sections.skills;
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="sec">
      <div className="wrap">
        <SectionHead section={section} />
        <dl className="spec-list">
          {skills.map((group) => (
            <div key={group.name} className="skill-row">
              <dt>{group.name}</dt>
              <dd>
                <ul aria-label={group.name}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
