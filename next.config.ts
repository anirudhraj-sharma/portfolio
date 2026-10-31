import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages, served from /portfolio.
  output: "export",
  basePath: "/portfolio",
  images: {
    unoptimized: true,
  },
  // Keep `next dev` from adding generated files to the repo.
  agentRules: false,
};

export default nextConfig;
