/**
 * Site content in one place: copy, numbers, and the data behind the figures.
 * Components read from here. Each figure draws its bars from the same values
 * it prints, so a bar and its label cannot disagree.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type SiteMeta = {
  name: string;
  /** Full document title for the home page. */
  title: string;
  description: string;
  /** Canonical URL, no trailing slash. */
  url: string;
  locale: string;
  keywords: string[];
};

export type ProfileLink = {
  label: string;
  handle: string;
  url: string;
};

export type Contact = {
  email: string;
  mailto: string;
  location: string;
  /** One sentence above the email address in the Contact section. */
  availability: string;
  github: ProfileLink;
  linkedin: ProfileLink;
};

export type Hero = {
  /** Three short items in the bar above the name, in display order. */
  meta: [string, string, string];
  /** Two sentences under the name. */
  lead: string;
  /** Short note beside the lead. */
  note: string;
};

export type SectionId = "projects" | "archive" | "experience" | "skills" | "education" | "contact";

export type Section = {
  id: SectionId;
  /** The section's h2, set in mono capitals by CSS. */
  label: string;
  /** Text of the nav link. */
  nav: string;
};

export type Experience = {
  org: string;
  role: string;
  /** Display string, e.g. "Jan 2026 – May 2026". */
  dates: string;
  /** YYYY-MM */
  start: string;
  /** YYYY-MM, or null while ongoing. */
  end: string | null;
  location: string;
  bullets: string[];
  tech: string[];
  /** Slug of a related project on this page. */
  project?: string;
};

export type ProjectCategory = "Real-time systems" | "LLM evaluation" | "LLM application";

/** One key and value in a project's Verification & Scope block. */
export type SpecRow = {
  key: string;
  value: string;
  /** When set, the value renders as a link that opens in a new tab. */
  href?: string;
};

export type FeaturedProject = {
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  /** My part, when it was not a solo project. */
  role?: string;
  period?: string;
  /** One-sentence lede. */
  tagline: string;
  /** Two or three sentences on how the system works. */
  narrative: string;
  bullets: string[];
  verification: SpecRow[];
  tech: string[];
};

export type ArchiveProject = {
  slug: string;
  title: string;
  domain: string;
  /** One sentence for the Core architecture column. */
  architecture: string;
  /** Short result for the Key result column. */
  result: string;
  period?: string;
  role?: string;
  /** Bullets shown when the row is expanded. */
  details: string[];
  tech: string[];
  repo?: string;
};

export type Project = FeaturedProject | ArchiveProject;

export type SkillGroup = {
  name: string;
  items: string[];
};

export type Education = {
  school: string;
  degree: string;
  dates: string;
  location: string;
  coursework?: string[];
};

/* Figure data ------------------------------------------------------- */

/** result: solid accent. result-soft: lighter accent. reference: grey fill. frame: outline only. */
export type Mark = "result" | "result-soft" | "reference" | "frame";

export type BarRow = {
  name: string;
  /** Drives the bar length. Must equal the number in `display`. */
  value: number;
  /** Text shown next to the bar, decimals fixed. */
  display: string;
  mark: Mark;
  /** Optional second line under the value. */
  detail?: string;
};

export type Axis = {
  max: number;
  /** Evenly spaced, from 0 to max. */
  ticks: number[];
  /** One label per tick; "" leaves a tick unlabeled. */
  labels: string[];
};

export type BarPanel = {
  label?: string;
  axis: Axis;
  rows: BarRow[];
};

export type FlowNode = {
  title: string;
  text: string;
  /** Small mono tag beside the title. */
  tag?: string;
  /** Draws the node with the accent outline. */
  gate?: boolean;
};

export type WatchdogStateKey = "live" | "decaying" | "failsafe" | "recovering";

export type Figures = {
  signalPath: {
    id: string;
    caption: string;
    note: string;
    title: string;
    desc: string;
    stages: { title: string; sub: string }[];
    uplink: [string, string, string];
    downlink: string;
  };
  latency: {
    id: string;
    caption: string;
    note: string;
    panel: BarPanel;
  };
  watchdog: {
    id: string;
    caption: string;
    note: string;
    axisLabel: string;
    axisMax: number;
    segments: { state: Exclude<WatchdogStateKey, "recovering">; from: number; to: number }[];
    ticks: { at: number; label: string }[];
    states: { key: WatchdogStateKey; range: string; name: string; text: string }[];
  };
  benchmark: {
    id: string;
    caption: string;
    success: BarPanel;
    cost: BarPanel;
    notes: string[];
  };
  negative: {
    title: string;
    rows: { from: string; to?: string; text: string }[];
  };
  criticGate: {
    id: string;
    caption: string;
    note: string;
    live: {
      label: string;
      before: FlowNode[];
      group: { label: string; nodes: FlowNode[] };
      after: FlowNode[];
    };
    offline: {
      label: string;
      nodes: FlowNode[];
      result: { title: string; panel: BarPanel; target: number; targetLabel: string };
    };
  };
};

/* ------------------------------------------------------------------ */
/* Site, contact, sections                                             */
/* ------------------------------------------------------------------ */

export const site: SiteMeta = {
  name: "Anirudh Raj Sharma",
  title: "Anirudh Raj Sharma | Software Engineer",
  description:
    "Software engineer with an M.S. in Artificial Intelligence from the University at Buffalo, building real-time input systems in C# and Swift and execution-graded LLM evaluation in Python.",
  url: "https://anirudhraj-sharma.github.io/portfolio",
  locale: "en_US",
  keywords: [
    "Anirudh Raj Sharma",
    "software engineer",
    "AI engineer",
    "full-stack",
    "C#",
    "Swift",
    "TypeScript",
    "Python",
    "Django",
    "React",
    "LLM evaluation",
    "University at Buffalo",
  ],
};

export const contact: Contact = {
  email: "rajsharmaanirudh@gmail.com",
  mailto: "mailto:rajsharmaanirudh@gmail.com",
  location: "Buffalo, NY",
  availability: "Open to full-time Software Engineer and AI Engineer roles.",
  github: {
    label: "GitHub",
    handle: "anirudhraj-sharma",
    url: "https://github.com/anirudhraj-sharma",
  },
  linkedin: {
    label: "LinkedIn",
    handle: "anirudh-raj-sharma01",
    url: "https://www.linkedin.com/in/anirudh-raj-sharma01",
  },
};

export const sections: Record<SectionId, Section> = {
  projects: { id: "projects", label: "Selected systems", nav: "Systems" },
  archive: { id: "archive", label: "Archive", nav: "Archive" },
  experience: { id: "experience", label: "Experience", nav: "Experience" },
  skills: { id: "skills", label: "Specification", nav: "Specification" },
  education: { id: "education", label: "Education", nav: "Education" },
  contact: { id: "contact", label: "Contact", nav: "Contact" },
};

/** Page and nav order. */
export const sectionOrder: SectionId[] = ["projects", "archive", "experience", "skills", "education", "contact"];

/** Fixed labels used by more than one component. */
export const ui = {
  specTitle: "Verification & Scope",
  stack: "Stack",
  coursework: "Coursework",
  ledgerLabel: "Systems ledger",
  ledgerHead: {
    project: "Project",
    domain: "Domain",
    architecture: "Core architecture",
    result: "Key result",
  },
  ledgerKeys: {
    domain: "Domain",
    architecture: "Architecture",
    result: "Result",
  },
  repoLink: "Repo",
  contactKeys: {
    github: "GitHub",
    linkedin: "LinkedIn",
    location: "Location",
  },
};

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero: Hero = {
  meta: ["Buffalo, NY", "M.S. AI @ UB (2026)", "Open to SWE & AI engineer roles"],
  lead:
    "Software engineer building real-time input systems and execution-graded LLM evaluation. Recent work: a C# receive loop that drives a virtual Xbox 360 controller from 100 Hz iPhone steering packets, and a harness that scores a small model's tool calls by running them.",
  note:
    "I work mostly in C# and Swift for device input, Python for data pipelines and model evaluation, and TypeScript for web front ends.",
};

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export const experience: Experience[] = [
  {
    org: "University at Buffalo, SUNY",
    role: "Research Assistant (Volunteer)",
    dates: "Jan 2026 – May 2026",
    start: "2026-01",
    end: "2026-05",
    location: "Buffalo, NY",
    bullets: [
      "Co-built Socratic-OT, a multimodal tutor for UB Occupational Therapy students: a 20-node LangGraph app with FastAPI streaming and a Next.js front end, where answer reveals are gated in Python code, not just prompts.",
      "Passed 116 of 119 live multi-turn end-to-end scenarios, including 5 of 5 jailbreak attempts, and 10 of 10 after swapping in a physics textbook.",
      "A critic loop raised LLM-judged faithfulness from 0.81 to 0.91 on 50 offline prompts, past the 0.85 target.",
    ],
    tech: ["Python", "LangGraph", "FastAPI", "Next.js", "RAG"],
    project: "socratic-ot",
  },
  {
    org: "InfraKnit Technologies Pvt. Ltd.",
    role: "Network Engineering Intern",
    dates: "Aug 2023 – Oct 2023",
    start: "2023-08",
    end: "2023-10",
    location: "Remote",
    bullets: [
      "Built Python network protocol architectures for transit systems on AWS with Spark, cutting critical alert delivery time by 20%.",
      "Designed and automated a preventive maintenance schedule with Airflow, BigQuery, and Terraform, cutting critical network failures by 40% across 15+ nodes while maintaining 99.5% uptime.",
    ],
    tech: ["Python", "AWS", "Spark", "Airflow", "BigQuery", "Terraform"],
  },
  {
    org: "IBM",
    role: "Software Engineer Intern",
    dates: "Jun 2022 – Aug 2022",
    start: "2022-06",
    end: "2022-08",
    location: "Remote, India",
    bullets: [
      "Automated the path to production with Docker, Kubernetes, and a Jenkins CI/CD pipeline for repeatable, zero-downtime releases.",
      "Built an end-to-end ETL pipeline with Python, Dask, and dbt for a 52 GB dataset, speeding up the ML development cycle by 35%.",
    ],
    tech: ["Docker", "Kubernetes", "Jenkins", "Python", "Dask", "dbt"],
  },
];

/* ------------------------------------------------------------------ */
/* Selected systems                                                    */
/* ------------------------------------------------------------------ */

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "opensteer",
    title: "OpenSteer",
    subtitle: "iPhone steering wheel for PC sim racing",
    category: "Real-time systems",
    tagline:
      "Turns an iPhone into a 100 Hz steering wheel for PC sim racing, with game telemetry sent back to the phone as rumble.",
    narrative:
      "The SwiftUI client turns Core Motion data into a twist-swing steering angle and streams it as UDP packets at 100 Hz. On the PC, a C# receive loop updates a virtual Xbox 360 controller, and a watchdog decides what that controller does when Wi-Fi goes quiet mid-corner. Assetto Corsa telemetry flows back at 60 Hz and plays on the phone as rumble.",
    bullets: [
      "Allocation-free C# (.NET 8) hot loop: Span<byte> packet validation and a blocking Socket.Poll receive feed a virtual Xbox 360 controller through ViGEm.",
      "Watchdog state machine on time since the last packet: steering holds and the pedals ease off after 100 ms, the controller goes neutral at 250 ms, and control blends back in after a fail-safe.",
      "60 Hz downlink on a Win32 high-resolution waitable timer: seqlock-style reads of Assetto Corsa telemetry with a 2 s staleness guard, played on the phone through CoreHaptics.",
      "Per-second JSON stats (p99, jitter, GC counts, watchdog state) and a golden-vector fixture that pins the C# and Swift codecs and the steering math to the same bytes.",
    ],
    verification: [
      {
        key: "Tests",
        value:
          "211 in multi-OS CI: 79 xUnit, 41 Python, 85 Swift XCTest, 6 iOS Simulator. ESP32 host tests run under g++.",
      },
      {
        key: "Method",
        value:
          "p99 per one-second window, packet received to virtual controller updated, timed on the PC in 50 µs buckets. Sensor-to-game latency is not timed.",
      },
      {
        key: "Run",
        value:
          "About 19 minutes on track in Assetto Corsa from a real iPhone at about 100 packets/s. 68 Wi-Fi gaps over 100 ms, all recovered. 0 Gen-0 GCs.",
      },
      {
        key: "Games",
        value: "Assetto Corsa driven. BeamNG.drive and Forza Horizon have setup guides.",
      },
      {
        key: "Bridge",
        value: "Optional ESP32-S3 bridge builds and passes host tests in CI; not yet flashed to a board.",
      },
      {
        key: "Source",
        value: "SteeringControl",
        href: "https://github.com/anirudhraj-sharma/SteeringControl",
      },
      {
        key: "Release",
        value: "Latest release",
        href: "https://github.com/anirudhraj-sharma/SteeringControl/releases/latest",
      },
    ],
    tech: [
      "C#",
      ".NET 8",
      "Swift",
      "SwiftUI",
      "Core Motion",
      "CoreHaptics",
      "UDP",
      "ViGEm",
      "Win32",
      "C++",
      "Python",
      "GitHub Actions",
    ],
  },
  {
    slug: "agent-reliability",
    title: "Agent Reliability",
    subtitle: "Tool-calling LLM fine-tune and eval harness",
    category: "LLM evaluation",
    tagline:
      "Can a distilled 1.7B model beat an 8B model when every tool call has to run and return the right answer?",
    narrative:
      "Scoring a tool call by its text rewards calls that look right and fail when run. In this harness every calculator call runs in its own AST-checked, resource-limited worker and is graded on the value it returns. The study also measures what the fine-tune breaks outside its training task.",
    bullets: [
      "Distillation: 4,000 Qwen3-4B attempts on GSM8K, 2,572 correct when executed, one verified trace kept per task for 684 SFT rows.",
      "QLoRA SFT of Qwen3-1.7B on 3 seeds, compared with Llama-3.1-8B and the untrained models under the same one-retry scaffold.",
      "Retries fire only on a missing, malformed, or failed call; a clean call with a wrong value is scored as wrong.",
      // − is U+2212 (minus sign): Geist has the glyph and the line breaker keeps "1e−6" together.
      "GRPO from the best SFT checkpoint at learning rates 1e−6 and 1e−5, with 8 samples per group.",
      "Transfer checks: MMLU on 400 questions and an unseen 3-tool order-support agent in a 4-turn closed loop.",
    ],
    verification: [
      {
        key: "Tests",
        value: "500+ in CI on Linux and Windows, Python 3.11 and 3.12.",
      },
      {
        key: "Method",
        value:
          "Each calculator call runs in an AST-checked, resource-limited worker process with a wall-clock timeout and is scored on the value it returns.",
      },
      {
        key: "Sample",
        value: "150 GSM8K test tasks, 4 attempts each, temperature 0.7, top-p 0.95, thinking off.",
      },
      {
        key: "Task",
        value:
          "Single-expression calculator calls; scores are not comparable to chain-of-thought GSM8K results.",
      },
      {
        key: "Teacher",
        value: "The Qwen3-4B teacher scores 60.8% per try, above every distilled run.",
      },
      {
        key: "Pinning",
        value: "Result files are SHA-256 pinned; a CI test checks every README number against them.",
      },
      {
        key: "Source",
        value: "agent-reliability",
        href: "https://github.com/anirudhraj-sharma/agent-reliability",
      },
      {
        key: "Release",
        value: "Latest release",
        href: "https://github.com/anirudhraj-sharma/agent-reliability/releases/latest",
      },
    ],
    tech: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "PEFT",
      "TRL",
      "Unsloth",
      "QLoRA",
      "GRPO",
      "Qwen3",
      "Llama 3.1",
      "GitHub Actions",
    ],
  },
  {
    slug: "socratic-ot",
    title: "Socratic-OT",
    subtitle: "Multimodal tutor for Occupational Therapy students",
    category: "LLM application",
    role: "Co-built, as a volunteer Research Assistant",
    period: "Jan 2026 – May 2026",
    tagline:
      "A tutor for UB Occupational Therapy students that guides them to the answer instead of handing it over.",
    narrative:
      "A chat model asked for help usually hands over the answer, and students learn little from that. Each tutor turn runs through a LangGraph graph that retrieves from the anatomy textbook, classifies the student's reply, and leaves the decision to reveal the answer to deterministic Python rules, not to the prompt alone.",
    bullets: [
      "20-node LangGraph app with FastAPI streaming and a Next.js 14 front end; a larger hosted model writes replies and a smaller model classifies.",
      "Answer reveals gated by deterministic Python rules on turn count, attempts, don't-knows, and mastery, checked on every generation path.",
      "Corrective RAG: a 42-term synonym map, a grader that triggers query rewrites, and a small cross-encoder that reranks the top 15 of 2,246 anatomy passages down to 3.",
      "A separate 1,141-passage physics index tests a new subject; the swap changes only the index and one config entry.",
      "A critic loop that checks drafts against the retrieved text, measured offline with a custom LLM claim judge.",
    ],
    verification: [
      {
        key: "Scenarios",
        value:
          "116 of 119 live multi-turn end-to-end scenarios against the running app, including 5 of 5 jailbreak attempts.",
      },
      {
        key: "Transfer",
        value: "10 of 10 scenarios after swapping in a physics textbook.",
      },
      {
        key: "Faithfulness",
        value:
          "0.81 to 0.91 on 50 offline prompts, target 0.85. Pooled over claims and scored by a custom LLM claim judge.",
      },
      {
        key: "Index",
        value:
          "3,387 late-chunk embeddings in two collections, 2,246 anatomy and 1,141 physics; one is active at a time.",
      },
      {
        key: "Gating",
        value: "Live blocking checks are Python rules. The critic loop blocks in offline evaluation only.",
      },
    ],
    tech: ["Python", "LangGraph", "FastAPI", "Next.js", "RAG", "LLM APIs"],
  },
];

/* ------------------------------------------------------------------ */
/* Archive (the systems ledger)                                        */
/* ------------------------------------------------------------------ */

export const archiveProjects: ArchiveProject[] = [
  {
    slug: "cve-lakehouse",
    title: "CVE Security Data Lakehouse",
    domain: "Data engineering",
    architecture:
      "PySpark ETL on Databricks that turns raw CVE JSON into Bronze and Silver Delta Lake tables with a SQL layer.",
    result: "318,391 files to 40,274 CVEs (2024); 1,816 critical",
    period: "Fall 2025",
    details: [
      "PySpark ETL that handles schema variations and the 42% of records with no CVSS score.",
      "A normalized vendor-product table for cross-vendor queries.",
      "Notebook outputs in the repo show each row count.",
    ],
    tech: ["PySpark", "Databricks", "Delta Lake", "SQL"],
    repo: "https://github.com/anirudhraj-sharma/CVE-Lakehouse-on-Databricks",
  },
  {
    slug: "codeforge",
    title: "CodeForge",
    domain: "LLM infrastructure",
    architecture:
      "Rust gateway that scans streamed code-model output in a 256-token window and applies Pass, Warn, Redact, or Abort.",
    result: "Benchmark F1: 0.89 secrets, 0.94 vulnerabilities, 1.00 cross-token",
    details: [
      "The sliding window catches secrets, CWE-pattern security flaws, and license issues that straddle chunk boundaries.",
      "SSE streaming, Prometheus metrics with Grafana dashboards, Docker Compose deployment, CI, smoke tests, and benchmarks.",
      "F1 scores come from the project's own benchmark suites.",
    ],
    tech: ["Rust", "SSE streaming", "Prometheus", "Grafana", "Docker", "GitHub Actions"],
  },
  {
    slug: "sql-analytics-agent",
    title: "SQL-Grounded Analytics Agent",
    domain: "LLM application",
    architecture: "Python agent that answers business questions by writing SQL, with guardrails on every query.",
    result: "48% fewer errors; p90 latency 280 ms",
    details: [
      "Schema-aware SQL generation from plain-English business questions.",
      "Dry-run validation of every query before it runs.",
      "Query budget caps and PII-aware row limits against runaway queries and exposed personal data.",
    ],
    tech: ["Python", "LangChain", "OpenAI API", "SQLAlchemy", "Pinecone"],
  },
  {
    slug: "product-detection",
    title: "Real-Time Product Detection",
    domain: "Computer vision",
    architecture:
      "Fine-tuned YOLOv8 detector for retail shelf images, served as a REST API for inventory tracking.",
    result: "0.92 mAP across 50+ SKUs",
    details: [
      "Fine-tuned on retail shelf images for 50+ product SKUs.",
      "400% data augmentation to expand the training set.",
      "Flask REST API in Docker on GCP for real-time inventory tracking.",
    ],
    tech: ["Python", "PyTorch", "YOLOv8", "Flask", "Docker", "GCP"],
  },
  {
    slug: "echo-chamber",
    title: "Echo Chamber on Reddit",
    domain: "LLM tooling, Spark ML",
    architecture:
      "Python MCP server that lets an LLM agent query Spark MLlib models and about 2.3M Reddit records through tool calls.",
    result: "About 60% accuracy on 7 subreddits; 14% random baseline",
    period: "Sep 2025 – Dec 2025",
    role: "Team of 2; I built the MCP server and the model tuning loop",
    details: [
      "A Python MCP server with 5 tools: post and comment classification, subreddit stats, cross-subreddit keyword frequency, and GDELT news sentiment by date.",
      "Models and DataFrames load at startup, trading a slower boot for no cold start on the first tool call.",
      "Cross-validation and Optuna tuning for Logistic Regression, Linear SVM, and Naive Bayes.",
    ],
    tech: ["Python", "MCP", "PySpark", "Spark MLlib", "Optuna"],
  },
];

export function getProject(slug: string): Project | undefined {
  return [...featuredProjects, ...archiveProjects].find((p) => p.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Figures                                                             */
/* ------------------------------------------------------------------ */

export const figures: Figures = {
  signalPath: {
    id: "Fig. 1",
    caption: "Signal path, phone to game and back",
    note: "Uplink about 100 Hz over UDP, downlink 60 Hz. Latency is timed on the PC only.",
    title: "OpenSteer signal path",
    desc: "The iPhone streams steering to a receive loop on the PC at 100 Hz over UDP. The loop updates a virtual Xbox 360 controller through ViGEm, which Assetto Corsa reads as input. Game telemetry returns to the phone at 60 Hz and plays as rumble. The 0.25 ms p99 covers the PC side only.",
    stages: [
      { title: "iPhone", sub: "Core Motion, SwiftUI" },
      { title: "PC receive loop", sub: "C#, .NET 8, watchdog" },
      { title: "ViGEm", sub: "virtual Xbox 360 controller" },
      { title: "Assetto Corsa", sub: "telemetry out" },
    ],
    uplink: ["100 Hz UDP", "0.25 ms p99, PC side", "controller input"],
    downlink: "60 Hz telemetry, rumble",
  },
  latency: {
    id: "Fig. 2",
    caption: "Host-side p99 against the 10.0 ms packet interval",
    note: "Drawn to scale. p99 per one-second window, packet received to virtual controller updated, timed on the PC over about 19 minutes on track; typical is the median window. Packets are sent every 10 ms, and Wi-Fi delivers them in bunches.",
    panel: {
      axis: {
        max: 10,
        ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        labels: ["0", "", "", "", "", "", "", "", "", "", "10 ms"],
      },
      rows: [
        { name: "Typical p99", value: 0.25, display: "0.25 ms", mark: "result" },
        { name: "Worst on-track window", value: 0.8, display: "0.80 ms", mark: "result-soft" },
        { name: "Packet interval at 100 Hz", value: 10, display: "10.0 ms", mark: "frame" },
      ],
    },
  },
  watchdog: {
    id: "Fig. 3",
    caption: "Watchdog states by time since the last packet",
    note: "68 Wi-Fi gaps passed 100 ms in about 19 minutes on track: 63 returned straight to Live, 5 passed 250 ms and blended back. All recovered.",
    axisLabel: "Time since last packet",
    axisMax: 350,
    segments: [
      { state: "live", from: 0, to: 100 },
      { state: "decaying", from: 100, to: 250 },
      { state: "failsafe", from: 250, to: 350 },
    ],
    ticks: [
      { at: 0, label: "0" },
      { at: 100, label: "100 ms" },
      { at: 250, label: "250 ms" },
    ],
    states: [
      {
        key: "live",
        range: "0–100 ms",
        name: "Live",
        text: "The controller follows the last packet.",
      },
      {
        key: "decaying",
        range: "100–250 ms",
        name: "Decaying",
        text: "Steering and clutch hold, buttons release, and throttle and brake ease off with a 30 ms time constant.",
      },
      {
        key: "failsafe",
        range: "From 250 ms",
        name: "FailSafe",
        text: "Wheel centered, pedals released, brake at 0, so the car coasts instead of braking hard.",
      },
      {
        key: "recovering",
        range: "Next packet",
        name: "Recovering",
        text: "Steering blends back over 300 ms and pedals over 100 ms. A short gap whose steering returns within 4,096 counts (of ±32,767) of the held angle skips the blend.",
      },
    ],
  },
  benchmark: {
    id: "Fig. 4",
    caption: "Per-try success and decode cost, GSM8K calculator calls graded by execution",
    success: {
      label: "Per-try success",
      axis: {
        max: 100,
        ticks: [0, 25, 50, 75, 100],
        labels: ["0", "25", "50", "75", "100%"],
      },
      rows: [
        { name: "Qwen3-1.7B base", value: 33.3, display: "33.3%", mark: "reference" },
        { name: "Llama-3.1-8B", value: 41.5, display: "41.5%", mark: "reference" },
        { name: "Distilled 1.7B, run 1", value: 53.0, display: "53.0%", mark: "result" },
        { name: "Distilled 1.7B, run 2", value: 51.7, display: "51.7%", mark: "result" },
        { name: "Distilled 1.7B, run 3", value: 55.3, display: "55.3%", mark: "result" },
        { name: "Qwen3-4B teacher", value: 60.8, display: "60.8%", mark: "reference" },
      ],
    },
    cost: {
      label: "Decode cost per attempt, generated tokens × parameters (B)",
      axis: {
        max: 250,
        ticks: [0, 50, 100, 150, 200, 250],
        labels: ["0", "50", "100", "150", "200", "250"],
      },
      rows: [
        { name: "Llama-3.1-8B", value: 236.4, display: "236.4", mark: "reference" },
        { name: "Distilled 1.7B, run 1", value: 62.3, display: "62.3", mark: "result" },
        { name: "Distilled 1.7B, run 2", value: 63.8, display: "63.8", mark: "result" },
        { name: "Distilled 1.7B, run 3", value: 61.6, display: "61.6", mark: "result" },
      ],
    },
    notes: [
      "150 GSM8K test tasks, 4 attempts each (600 per row), thinking off. Every row gets the same single retry when a call is missing, malformed, or fails to run; a wrong value is not retried.",
      "Runs 1–3 are three SFT seeds. Each beats Llama-3.1-8B by 10.2–13.8 points per try, with the paired 95% interval above zero for every run, at 26–27% of its decode cost.",
    ],
  },
  negative: {
    title: "Negative & transfer findings",
    rows: [
      {
        from: "65–66%",
        text: "of 8-sample GRPO groups gave every completion the same reward, so they carried no gradient: 522 and 531 of 800 groups at the two learning rates. GRPO gave no reliable gain.",
      },
      {
        from: "100%",
        to: "0.7%",
        text: "Refusal rate on must-refuse requests in an unseen 4-turn order-support loop, untrained versus distilled run 3: 2 of 296 refused after fine-tuning.",
      },
      {
        from: "53.25%",
        to: "53.00%",
        text: "MMLU accuracy on 400 questions, zero-shot, for the same two models.",
      },
    ],
  },
  criticGate: {
    id: "Fig. 5",
    caption: "Live request path and offline faithfulness evaluation",
    note: "The critic loop blocks only in this offline evaluation. In the live path, the blocking checks are Python rules.",
    live: {
      label: "Live request path",
      before: [{ title: "Student turn", text: "Text, or an image." }],
      group: {
        label: "LangGraph, 20 nodes",
        nodes: [
          {
            title: "Concept extraction and retrieval",
            text: "Run in parallel. A 42-term synonym map expands the query; a grader rewrites it once when results are ambiguous.",
          },
          {
            title: "Rerank",
            text: "Top 15 of 2,246 anatomy passages by embedding; a small cross-encoder keeps 3.",
          },
          {
            title: "Classify",
            text: "A smaller model labels the student's reply.",
          },
          {
            title: "Reveal gate",
            tag: "Python, deterministic",
            text: "Turn count, attempts, don't-knows, and mastery decide whether the answer may be shown.",
            gate: true,
          },
          {
            title: "Draft",
            text: "A larger hosted model writes the tutor's turn.",
          },
          {
            title: "Rule checks",
            text: "Python rules block a leaked answer, a missing question before the reveal turn, or a flattering opener. Two failed rewrites fall back to a fixed scaffold.",
          },
        ],
      },
      after: [{ title: "Streamed reply", text: "FastAPI server-sent events to a Next.js client." }],
    },
    offline: {
      label: "Offline evaluation",
      nodes: [
        { title: "50 prompts", text: "Each draft is paired with the passages retrieved for it." },
        {
          title: "Critic loop",
          text: "An LLM critic checks each draft against the retrieved text and requests up to 2 rewrites.",
        },
        {
          title: "Claim judge",
          text: "A custom LLM judge lists each factual claim and marks it supported or unsupported by the retrieved text.",
        },
      ],
      result: {
        title: "Faithfulness",
        target: 0.85,
        targetLabel: "target 0.85",
        panel: {
          axis: {
            max: 1,
            ticks: [0, 0.25, 0.5, 0.75, 1],
            labels: ["0", "", "", "", "1.00"],
          },
          rows: [
            {
              name: "Without critic loop",
              value: 0.81,
              display: "0.81",
              mark: "reference",
              detail: "94 of 116 claims",
            },
            {
              name: "With critic loop",
              value: 0.91,
              display: "0.91",
              mark: "result",
              detail: "138 of 152 claims",
            },
          ],
        },
      },
    },
  },
};

/* ------------------------------------------------------------------ */
/* Skills and education                                                */
/* ------------------------------------------------------------------ */

export const skills: SkillGroup[] = [
  {
    name: "Systems & Realtime",
    items: [
      "C#",
      ".NET 8",
      "Swift",
      "SwiftUI",
      "Core Motion",
      "CoreHaptics",
      "Network.framework",
      "UDP networking",
      "Win32 P/Invoke",
      "C++",
      "Rust",
      "xUnit",
      "XCTest",
    ],
  },
  {
    name: "ML & Evaluation",
    items: [
      "Python",
      "PyTorch",
      "Hugging Face (Transformers, PEFT, TRL)",
      "QLoRA",
      "GRPO",
      "LLM evaluation",
      "LangGraph",
      "RAG",
      "MCP",
      "scikit-learn",
    ],
  },
  {
    name: "Backend & Web",
    items: [
      "TypeScript",
      "Next.js",
      "React",
      "FastAPI",
      "Django REST Framework",
      "SSE streaming",
      "SQLite",
      "nginx",
      "gunicorn",
      "Vitest",
    ],
  },
  {
    name: "Data & Infrastructure",
    items: [
      "SQL",
      "Spark",
      "PySpark",
      "Delta Lake",
      "Databricks",
      "Airflow",
      "BigQuery",
      "Dask",
      "dbt",
      "Docker",
      "Kubernetes",
      "Terraform",
      "AWS",
      "GitHub Actions",
      "Jenkins",
    ],
  },
];

export const education: Education[] = [
  {
    school: "University at Buffalo, SUNY",
    degree: "Master of Science, Artificial Intelligence",
    dates: "Jan 2025 – Jun 2026",
    location: "Buffalo, NY",
    coursework: [
      "Machine Learning",
      "Reinforcement Learning",
      "NLP and Text Mining",
      "Computer Vision and Image Processing",
    ],
  },
  {
    school: "University of Petroleum and Energy Studies",
    degree: "B.Tech, Computer Science (AI Specialization)",
    dates: "Apr 2019 – May 2023",
    location: "Dehradun, India",
  },
];
