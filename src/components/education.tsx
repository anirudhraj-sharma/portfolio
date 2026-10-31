import { education, sections, ui } from "@/data/profile";
import { SectionHead } from "./section-head";

export function Education() {
  const section = sections.education;
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="sec">
      <div className="wrap">
        <SectionHead section={section} />
        <ul className="rows">
          {education.map((entry) => (
            <li key={entry.school}>
              <div className="row-side">
                <p>{entry.dates}</p>
                <p>{entry.location}</p>
              </div>
              <div className="row-main">
                <h3 className="row-title">{entry.school}</h3>
                <p className="row-sub">{entry.degree}</p>
                {entry.coursework ? (
                  <div className="cs-stack">
                    <span className="key" aria-hidden="true">
                      {ui.coursework}
                    </span>
                    <ul className="run" aria-label={ui.coursework}>
                      {entry.coursework.map((course) => (
                        <li key={course}>{course}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
