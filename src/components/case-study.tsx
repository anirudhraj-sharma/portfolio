import { ArrowUpRight } from "lucide-react";
import { ui, type FeaturedProject } from "@/data/profile";
import { keepUnits } from "@/lib/typography";
import { ExternalLink } from "./external-link";
import { Reveal } from "./reveal";

function SpecBlock({ project }: { project: FeaturedProject }) {
  const titleId = `spec-${project.slug}`;
  return (
    <section className="spec">
      <h4 id={titleId} className="spec-title">
        {ui.specTitle}
      </h4>
      <dl>
        {project.verification.map((row) => (
          <div key={row.key} className="spec-row">
            <dt>{row.key}</dt>
            <dd>
              {row.href ? (
                <ExternalLink href={row.href} className="link">
                  {row.value}
                  <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden="true" />
                  <span className="sr-only"> for {project.title} (opens in a new tab)</span>
                </ExternalLink>
              ) : (
                keepUnits(row.value)
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** "Stack" key and a dot-separated run of technologies. */
export function StackLine({ label, tech }: { label: string; tech: string[] }) {
  return (
    <div className="cs-stack">
      <span className="key" aria-hidden="true">
        {ui.stack}
      </span>
      <ul className="run" aria-label={label}>
        {tech.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

/** One featured project: header, narrative and figures, bullets, then the spec block. */
export function CaseStudy({
  project,
  before,
  after,
}: {
  project: FeaturedProject;
  /** Figures placed between the narrative and the bullets. */
  before?: React.ReactNode;
  /** Figures placed after the bullets. */
  after?: React.ReactNode;
}) {
  return (
    <Reveal as="article" id={`project-${project.slug}`} className="cs">
      <header className="cs-head">
        <p className="meta cs-kicker">
          <span>{project.category}</span>
          {project.period ? <span>{project.period}</span> : null}
        </p>
        <h3 className="case-title">{project.title}</h3>
        <p className="cs-sub">{project.subtitle}</p>
        {project.role ? <p className="cs-role">{project.role}</p> : null}
      </header>

      <div className="cs-body">
        <div className="cs-main">
          <p className="lede">{keepUnits(project.tagline)}</p>
          <p className="cs-text">{keepUnits(project.narrative)}</p>
          {before}
          <ul className="bullets">
            {project.bullets.map((bullet) => (
              <li key={bullet}>{keepUnits(bullet)}</li>
            ))}
          </ul>
          {after}
        </div>
        <SpecBlock project={project} />
      </div>

      <StackLine label={`${project.title} stack`} tech={project.tech} />
    </Reveal>
  );
}
