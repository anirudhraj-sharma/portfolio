import { featuredProjects, sections } from "@/data/profile";
import { CaseStudy } from "./case-study";
import { BenchmarkFigure, CriticGateFigure, LatencyFigure, NegativeFindings, WatchdogFigure } from "./figures";
import { SectionHead } from "./section-head";
import { SignalPath } from "./signal-path";

/** Where each project's figures sit: before or after its bullets. */
const slots: Record<string, { before?: React.ReactNode; after?: React.ReactNode }> = {
  opensteer: {
    before: <SignalPath />,
    after: (
      <>
        <LatencyFigure />
        <WatchdogFigure />
      </>
    ),
  },
  "agent-reliability": {
    before: (
      <>
        <BenchmarkFigure />
        <NegativeFindings />
      </>
    ),
  },
  "socratic-ot": {
    before: <CriticGateFigure />,
  },
};

export function Work() {
  const section = sections.projects;
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="sec">
      <div className="wrap">
        <SectionHead section={section} />
        {featuredProjects.map((project) => (
          <CaseStudy
            key={project.slug}
            project={project}
            before={slots[project.slug]?.before}
            after={slots[project.slug]?.after}
          />
        ))}
      </div>
    </section>
  );
}
