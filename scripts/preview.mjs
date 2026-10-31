// Serves the static export from out/ under /portfolio, the same path GitHub
// Pages uses, so links and assets behave as they will in production.
// Usage: npm run build && npm run preview   (default port 4173)
import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";

const BASE = "/portfolio";
const root = resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? process.env.PORT ?? 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

function resolveFile(pathname) {
  const target = normalize(join(root, pathname.slice(BASE.length) || "/"));
  if (target !== root && !target.startsWith(root + sep)) return null; // stay inside out/
  if (existsSync(target) && statSync(target).isDirectory()) return join(target, "index.html");
  if (!existsSync(target) && existsSync(`${target}.html`)) return `${target}.html`;
  return target;
}

createServer((req, res) => {
  const { pathname } = new URL(req.url ?? "/", "http://localhost");
  let path;
  try {
    path = decodeURIComponent(pathname);
  } catch {
    res.writeHead(400).end();
    return;
  }

  if (path !== BASE && !path.startsWith(`${BASE}/`)) {
    res.writeHead(302, { Location: `${BASE}/` }).end();
    return;
  }

  const file = resolveFile(path);
  if (file && existsSync(file) && statSync(file).isFile()) {
    res.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
    return;
  }

  const notFound = join(root, "404.html");
  res.writeHead(404, { "Content-Type": types[".html"] });
  res.end(existsSync(notFound) ? readFileSync(notFound) : "Not found");
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}${BASE}/`);
});
