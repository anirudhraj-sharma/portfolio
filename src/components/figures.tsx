import { ArrowRight } from "lucide-react";
import { figures, type FlowNode } from "@/data/profile";
import { keepUnits } from "@/lib/typography";
import { Figure, ScalePanel } from "./figure-parts";
import { Reveal } from "./reveal";

/** Fig. 2: host-side p99 drawn to scale against the 10.0 ms packet interval. */
export function LatencyFigure() {
  const f = figures.latency;
  return (
    <Figure id={f.id} caption={f.caption} notes={[f.note]}>
      <ScalePanel panel={f.panel} />
    </Figure>
  );
}

/** Fig. 3: watchdog states on one time axis, then the same states as a list. */
export function WatchdogFigure() {
  const f = figures.watchdog;
  return (
    <Figure id={f.id} caption={f.caption} notes={[f.note]}>
      <div className="wd-scale" aria-hidden="true">
        <p className="key">{f.axisLabel}</p>
        <svg
          className="wd-strip"
          viewBox={`0 0 ${f.axisMax} 8`}
          preserveAspectRatio="none"
          width="100%"
          height="8"
          focusable="false"
        >
          {f.segments.map((segment) => (
            <rect
              key={segment.state}
              className={`wd-${segment.state}`}
              x={segment.from}
              y="0"
              width={segment.to - segment.from}
              height="8"
            />
          ))}
        </svg>
        <div className="wd-axis">
          {f.ticks.map((tick) => (
            <span key={tick.at}>{tick.label}</span>
          ))}
        </div>
      </div>
      <ol className="wd-list">
        {f.states.map((state) => (
          <li key={state.key} className="wd-item">
            <span className="wd-range">
              <span className={`wd-swatch wd-swatch--${state.key}`} aria-hidden="true" />
              {state.range}
            </span>
            <span className="wd-name">{state.name}</span>
            <span className="wd-text">{keepUnits(state.text)}</span>
          </li>
        ))}
      </ol>
    </Figure>
  );
}

/** Fig. 4: per-try success and decode cost, two panels of bars. */
export function BenchmarkFigure() {
  const f = figures.benchmark;
  return (
    <Figure id={f.id} caption={f.caption} notes={f.notes}>
      <div className="bench">
        <ScalePanel panel={f.success} />
        <ScalePanel panel={f.cost} />
      </div>
    </Figure>
  );
}

/** Callout under Fig. 4. Its h4 sits under the project's h3. */
export function NegativeFindings() {
  const f = figures.negative;
  return (
    <Reveal as="aside" className="neg">
      <h4 id="neg-title" className="neg-title">
        {f.title}
      </h4>
      <dl className="neg-list">
        {f.rows.map((row) => (
          <div key={row.from}>
            <dt className="neg-fig">
              {row.from}
              {row.to ? (
                <>
                  <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" className="neg-arrow" />
                  <span className="sr-only"> to </span>
                  {row.to}
                </>
              ) : null}
            </dt>
            <dd>{keepUnits(row.text)}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

function FlowItem({ node }: { node: FlowNode }) {
  return (
    <li className={node.gate ? "node node--gate" : "node"}>
      <p className="node-title">
        <span>{node.title}</span>
        {node.tag ? <span className="node-tag">{node.tag}</span> : null}
      </p>
      <p className="node-text">{keepUnits(node.text)}</p>
    </li>
  );
}

/** Fig. 5: the live request path and, beside it, the offline evaluation loop. */
export function CriticGateFigure() {
  const f = figures.criticGate;
  const { result } = f.offline;
  return (
    <Figure id={f.id} caption={f.caption} notes={[f.note]}>
      <div className="flow">
        <div className="lane lane-live">
          <p className="lane-label" id="lane-live">
            {f.live.label}
          </p>
          <ol className="nodes" aria-labelledby="lane-live">
            {f.live.before.map((node) => (
              <FlowItem key={node.title} node={node} />
            ))}
            <li className="group">
              <p className="group-label">{f.live.group.label}</p>
              <ol className="nodes">
                {f.live.group.nodes.map((node) => (
                  <FlowItem key={node.title} node={node} />
                ))}
              </ol>
            </li>
            {f.live.after.map((node) => (
              <FlowItem key={node.title} node={node} />
            ))}
          </ol>
        </div>
        <div className="lane lane-offline">
          <p className="lane-label" id="lane-offline">
            {f.offline.label}
          </p>
          <ol className="nodes" aria-labelledby="lane-offline">
            {f.offline.nodes.map((node) => (
              <FlowItem key={node.title} node={node} />
            ))}
            <li className="node fa">
              <p className="node-title">
                <span>{result.title}</span>
              </p>
              <ScalePanel panel={result.panel} compact target={result.target} targetLabel={result.targetLabel} />
            </li>
          </ol>
        </div>
      </div>
    </Figure>
  );
}
