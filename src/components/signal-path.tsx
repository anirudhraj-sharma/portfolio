import { figures } from "@/data/profile";
import { Figure } from "./figure-parts";

// Drawn for a 288 px column at scale 1, so 12 px labels stay 12 px on a 320 px phone.
// Strokes sit on half pixels to stay 1 px sharp.
const NODE_Y = [0.5, 92.5, 184.5, 276.5];

const UPLINK = [
  { d: "M24.5 49V92M20 87.5L24.5 92L29 87.5", y: 75 },
  { d: "M24.5 141V184M20 179.5L24.5 184L29 179.5", y: 167 },
  { d: "M24.5 233V276M20 271.5L24.5 276L29 271.5", y: 259 },
];

/** Fig. 1: the OpenSteer signal path. Static SVG, no draw-in animation. */
export function SignalPath() {
  const f = figures.signalPath;
  return (
    <Figure id={f.id} caption={f.caption} notes={[f.note]} className="sp">
      <svg
        className="sp-svg"
        viewBox="0 0 288 328"
        width="288"
        height="328"
        role="img"
        aria-labelledby="signal-path-title"
        aria-describedby="signal-path-desc"
      >
        <title id="signal-path-title">{f.title}</title>
        <desc id="signal-path-desc">{f.desc}</desc>

        {f.stages.map((stage, i) => (
          <g key={stage.title}>
            <rect className="dg-node" x="0.5" y={NODE_Y[i]} width="232" height="48" />
            <text className="dg-title" x="12" y={NODE_Y[i] + 19.5}>
              {stage.title}
            </text>
            <text className="dg-sub" x="12" y={NODE_Y[i] + 36.5}>
              {stage.sub}
            </text>
          </g>
        ))}

        {UPLINK.map((line, i) => (
          <g key={line.d}>
            <path className="dg-up" d={line.d} />
            <text className="dg-label" x="36" y={line.y}>
              {f.uplink[i]}
            </text>
          </g>
        ))}

        <path className="dg-down" d="M233 300.5H256.5V24.5H234" />
        <path className="dg-head-down" d="M237.5 20L233 24.5L237.5 29" />
        <text className="dg-label" textAnchor="middle" transform="translate(274 162.5) rotate(-90)">
          {f.downlink}
        </text>
      </svg>
    </Figure>
  );
}
