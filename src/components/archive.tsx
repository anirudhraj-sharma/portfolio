import { ArrowUpRight, ChevronDown } from "lucide-react";
import { archiveProjects, sections, ui } from "@/data/profile";
import { keepUnits } from "@/lib/typography";
import { StackLine } from "./case-study";
import { ExternalLink } from "./external-link";
import { SectionHead } from "./section-head";

/**
 * The systems ledger. <details> cannot live in a table, so each row is a list item
 * whose <summary> holds a grid. The repo link is a sibling of <details>, never
 * inside <summary>, and is rendered only when the project has a public repo.
 */
export function Archive() {
  const section = sections.archive;
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="sec">
      <div className="wrap">
        <SectionHead section={section} />
        <div className="ledger">
          <div className="ledger-head" aria-hidden="true">
            <span>{ui.ledgerHead.project}</span>
            <span className="h-domain">{ui.ledgerHead.domain}</span>
            <span>{ui.ledgerHead.architecture}</span>
            <span>{ui.ledgerHead.result}</span>
          </div>
          <ul className="ledger-list" aria-label={ui.ledgerLabel}>
            {archiveProjects.map((project) => (
              <li key={project.slug} id={`project-${project.slug}`} className="ledger-row">
                <details>
                  <summary className="ledger-sum">
                    <span className="ledger-grid">
                      <span className="c-title">{project.title}</span>
                      <span className="c-domain">
                        <span className="k">{ui.ledgerKeys.domain}: </span>
                        {project.domain}
                      </span>
                      <span className="c-arch">
                        <span className="k">{ui.ledgerKeys.architecture}: </span>
                        {keepUnits(project.architecture)}
                      </span>
                      <span className="c-result">
                        <span className="k">{ui.ledgerKeys.result} </span>
                        <span className="c-value">{keepUnits(project.result)}</span>
                      </span>
                      <ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" className="c-toggle" />
                    </span>
                  </summary>
                  <div className="ledger-panel">
                    {project.period || project.role ? (
                      <p className="ledger-meta">
                        {project.period ? <span>{project.period}</span> : null}
                        {project.role ? <span>{project.role}</span> : null}
                      </p>
                    ) : null}
                    <ul className="bullets">
                      {project.details.map((detail) => (
                        <li key={detail}>{keepUnits(detail)}</li>
                      ))}
                    </ul>
                    <StackLine label={`${project.title} stack`} tech={project.tech} />
                  </div>
                </details>
                {project.repo ? (
                  <ExternalLink href={project.repo} className="link ledger-src">
                    {ui.repoLink}
                    <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden="true" />
                    <span className="sr-only"> for {project.title} (opens in a new tab)</span>
                  </ExternalLink>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
