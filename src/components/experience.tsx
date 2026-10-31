import { ArrowDown } from "lucide-react";
import { experience, getProject, sections } from "@/data/profile";
import { keepUnits } from "@/lib/typography";
import { SectionHead } from "./section-head";

export function Experience() {
  const section = sections.experience;
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="sec">
      <div className="wrap">
        <SectionHead section={section} />
        <ol className="rows">
          {experience.map((job) => {
            const project = job.project ? getProject(job.project) : undefined;
            return (
              <li key={`${job.org}-${job.start}`}>
                <div className="row-side">
                  <p>{job.dates}</p>
                  <p>{job.location}</p>
                </div>
                <div className="row-main">
                  <h3 className="row-title">
                    {job.role}
                    <span className="at"> at </span>
                    {job.org}
                  </h3>

                  {job.bullets.length > 0 ? (
                    <ul className="bullets">
                      {job.bullets.map((bullet) => (
                        <li key={bullet}>{keepUnits(bullet)}</li>
                      ))}
                    </ul>
                  ) : null}

                  {job.tech.length > 0 ? (
                    <ul className="run" aria-label="Technology">
                      {job.tech.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}

                  {project ? (
                    <a href={`#project-${project.slug}`} className="link row-link">
                      See the {project.title} project
                      <ArrowDown size={14} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
