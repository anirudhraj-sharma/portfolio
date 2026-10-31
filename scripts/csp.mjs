// Post-build step: write a Content-Security-Policy <meta> and a referrer
// policy into every exported HTML page.
//
// GitHub Pages cannot send response headers, so the policy has to live in the
// document. Next.js inlines a few scripts whose text changes on every build, so
// this script hashes them after the build and allows exactly those hashes.
//
// Usage (runs as part of `npm run build`):
//   node scripts/csp.mjs [outDir]
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.argv[2] ?? "out";

// More distinct style="" values than this fails the build rather than quietly
// loosening the policy.
const MAX_STYLE_ATTR_HASHES = 60;

const sha256 = (text) =>
  `'sha256-${createHash("sha256").update(text, "utf8").digest("base64")}'`;

const decodeAttr = (value) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* htmlFiles(path);
    else if (name.endsWith(".html")) yield path;
  }
}

// Inline blocks with these types are data and never run. Every other inline
// script is hashed, and a type neither list knows fails the build.
const DATA_SCRIPT_TYPES = new Set(["application/json", "application/ld+json"]);
const RUNNABLE_SCRIPT_TYPES =
  /^(|module|importmap|speculationrules|(text|application)\/(x-)?(javascript|ecmascript)|text\/(jscript|livescript))$/;

/** Hashes of every inline script that the browser would execute. */
function inlineScriptHashes(html, file) {
  const hashes = new Set();
  const opened = html.match(/<script\b/gi)?.length ?? 0;
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  if (scripts.length !== opened) {
    throw new Error(`csp: could not parse every <script> in ${file}`);
  }
  for (const [, attrs, body] of scripts) {
    if (/\ssrc\s*=/i.test(attrs)) continue; // external, covered by 'self'
    const m = /\stype\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(attrs);
    const type = (m ? (m[1] ?? m[2] ?? m[3]) : "").trim().toLowerCase();
    if (DATA_SCRIPT_TYPES.has(type)) continue;
    if (!RUNNABLE_SCRIPT_TYPES.test(type)) {
      throw new Error(`csp: unknown inline <script type="${type}"> in ${file}`);
    }
    hashes.add(sha256(body));
  }
  return hashes;
}

function buildPolicy(html, file) {
  const scriptHashes = inlineScriptHashes(html, file);

  const styleHashes = new Set();
  for (const match of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
    if (match[1].trim()) styleHashes.add(sha256(match[1]));
  }

  const styleAttrHashes = new Set();
  for (const match of html.matchAll(/\sstyle="([^"]*)"/gi)) {
    styleAttrHashes.add(sha256(decodeAttr(match[1])));
  }

  if (styleAttrHashes.size > MAX_STYLE_ATTR_HASHES) {
    throw new Error(
      `csp: ${styleAttrHashes.size} distinct style="" values in ${file}; move them to CSS or raise MAX_STYLE_ATTR_HASHES`,
    );
  }
  const styleAttr =
    styleAttrHashes.size > 0
      ? `style-src-attr 'unsafe-hashes' ${[...styleAttrHashes].join(" ")}`
      : "style-src-attr 'none'";

  return [
    "default-src 'none'",
    `script-src 'self' ${[...scriptHashes].join(" ")}`.trim(),
    "style-src 'self'",
    `style-src-elem 'self' ${[...styleHashes].join(" ")}`.trim(),
    styleAttr,
    "img-src 'self'",
    "font-src 'self'",
    "connect-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
    "frame-src 'none'",
    "worker-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

let count = 0;
for (const file of htmlFiles(OUT_DIR)) {
  let html = readFileSync(file, "utf8");

  // Strip earlier output so running the script twice gives the same result.
  html = html
    .replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/i, "")
    .replace(/<meta name="referrer"[^>]*>/i, "");

  const meta =
    `<meta http-equiv="Content-Security-Policy" content="${buildPolicy(html, file)}"/>` +
    `<meta name="referrer" content="strict-origin-when-cross-origin"/>`;

  // Insert right after the charset declaration: the policy then comes before
  // every <link> and <script>, and the charset stays within the first 1024 bytes.
  const next = html.replace(/<meta\s+charset="utf-8"\s*\/?>/i, (charset) => charset + meta);
  if (next === html) {
    throw new Error(`csp: no charset <meta> found in ${file}`);
  }

  // Self-check: every executable inline script must be allowed by the policy.
  const written = /http-equiv="Content-Security-Policy" content="([^"]*)"/.exec(next)?.[1] ?? "";
  for (const hash of inlineScriptHashes(next, file)) {
    if (!written.includes(hash)) throw new Error(`csp: missing script hash in ${file}`);
  }

  // A meta policy only applies to what comes after it.
  const policyAt = next.indexOf('http-equiv="Content-Security-Policy"');
  const firstLoad = next.search(/<(script|link|style)\b/i);
  if (firstLoad !== -1 && firstLoad < policyAt) {
    throw new Error(`csp: a <script>, <link> or <style> comes before the policy in ${file}`);
  }

  writeFileSync(file, next);
  count++;
}

if (count === 0) {
  throw new Error(`csp: no HTML files found in ${OUT_DIR}/ (did the build run?)`);
}
console.log(`csp: wrote policy to ${count} HTML file(s) in ${OUT_DIR}/`);
