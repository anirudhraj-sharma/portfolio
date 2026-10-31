import { figures, type Axis, type BarPanel, type BarRow, type Figures, type Mark } from "@/data/profile";
import { keepUnits } from "@/lib/typography";
import { Reveal } from "./reveal";

/* ------------------------------------------------------------------ */
/* Build-time checks. A failure stops `next build`.                    */
/* ------------------------------------------------------------------ */

function fail(message: string): never {
  throw new Error(`figures: ${message}`);
}

function checkPanel(name: string, panel: BarPanel) {
  const { max, ticks, labels } = panel.axis;
  if (ticks.length < 2 || ticks[0] !== 0 || ticks[ticks.length - 1] !== max) {
    fail(`${name}: ticks must run from 0 to ${max}`);
  }
  const step = ticks[1] - ticks[0];
  ticks.forEach((tick, i) => {
    if (Math.abs(tick - i * step) > 1e-9) fail(`${name}: ticks must be evenly spaced`);
  });
  if (labels.length !== ticks.length) fail(`${name}: one label per tick`);
  for (const row of panel.rows) {
    const shown = Number.parseFloat(row.display.replace(/[^0-9.]/g, ""));
    if (Math.abs(shown - row.value) > 1e-9) fail(`${name}: "${row.display}" does not match ${row.value}`);
    if (row.value < 0 || row.value > max) fail(`${name}: ${row.value} is outside 0 to ${max}`);
  }
}

function checkFigures(f: Figures) {
  checkPanel("latency", f.latency.panel);
  checkPanel("success", f.benchmark.success);
  checkPanel("cost", f.benchmark.cost);
  checkPanel("faithfulness", f.criticGate.offline.result.panel);
  // globals.css hard-codes these proportions (.wd-axis and .fa-target).
  const edges = f.watchdog.segments.flatMap((s) => [s.from, s.to]).join(",");
  if (edges !== "0,100,100,250,250,350" || f.watchdog.axisMax !== 350) {
    fail("watchdog segments changed: update .wd-axis in globals.css");
  }
  if (f.criticGate.offline.result.target !== 0.85) {
    fail("faithfulness target changed: update .fa-target in globals.css");
  }
}

checkFigures(figures);

/* ------------------------------------------------------------------ */
/* Parts                                                               */
/* ------------------------------------------------------------------ */

const pct = (value: number, max: number) => Number(((value / max) * 100).toFixed(4));

const markClass: Record<Mark, string> = {
  result: "t-result",
  "result-soft": "t-soft",
  reference: "t-ref",
  frame: "t-frame",
};

/** Figure frame: caption first, then the content, then one or more notes. */
export function Figure({
  id,
  caption,
  notes = [],
  className,
  children,
}: {
  id: string;
  caption: string;
  notes?: string[];
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="figure" className={className ? `fig ${className}` : "fig"}>
      <figcaption className="fig-cap">
        <span className="fig-id">{id}</span> {keepUnits(caption)}
      </figcaption>
      {children}
      {notes.map((note) => (
        <p key={note} className="fig-note">
          {keepUnits(note)}
        </p>
      ))}
    </Reveal>
  );
}

/** One bar, drawn to scale. Geometry is SVG attributes, never a style attribute. */
function Track({ row, max, target }: { row: BarRow; max: number; target?: number }) {
  const x = target === undefined ? undefined : pct(target, max);
  return (
    <svg
      className="track"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      width="100%"
      height="10"
      aria-hidden="true"
      focusable="false"
    >
      {row.mark === "frame" ? null : <rect className="t-rail" x="0" y="0" width="100" height="10" />}
      <rect className={markClass[row.mark]} x="0" y="0" width={pct(row.value, max)} height="10" />
      {x === undefined ? null : <line className="t-target" x1={x} x2={x} y1="-3" y2="13" />}
    </svg>
  );
}

function AxisRow({ axis }: { axis: Axis }) {
  const cells = axis.ticks.length - 1;
  return (
    <div className="scale-axis" aria-hidden="true">
      <div className="axis">
        <svg
          className="axis-ticks"
          viewBox="0 0 100 4"
          preserveAspectRatio="none"
          width="100%"
          height="4"
          focusable="false"
        >
          {axis.ticks.map((tick) => {
            const x = pct(tick, axis.max);
            return <line key={tick} className="t-tick" x1={x} x2={x} y1="0" y2="4" />;
          })}
        </svg>
        <div className="axis-labels">
          {Array.from({ length: cells }, (_, i) => (
            <span key={axis.ticks[i]} className="axis-cell">
              <span className="tl">{axis.labels[i]}</span>
              {i === cells - 1 ? <span className="tl tl-end">{axis.labels[cells]}</span> : null}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Labelled bars on one shared scale. Names and values are real text; bars are decoration. */
export function ScalePanel({
  panel,
  compact = false,
  target,
  targetLabel,
}: {
  panel: BarPanel;
  compact?: boolean;
  target?: number;
  targetLabel?: string;
}) {
  return (
    <div className={compact ? "scale scale--compact" : "scale"}>
      {panel.label ? <p className="panel-label">{panel.label}</p> : null}
      {target !== undefined && targetLabel ? (
        <div className="scale-axis">
          <div className="axis fa-target">
            <span className="tl tl-target">{targetLabel}</span>
          </div>
        </div>
      ) : null}
      <ul className="scale-rows">
        {panel.rows.map((row) => (
          <li key={row.name} className="scale-row">
            <span className="name">{row.name}</span>
            <span className="value">
              {row.display}
              {row.detail ? <span className="value-detail">{row.detail}</span> : null}
            </span>
            <Track row={row} max={panel.axis.max} target={target} />
          </li>
        ))}
      </ul>
      <AxisRow axis={panel.axis} />
    </div>
  );
}
