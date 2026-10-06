// Tiny static server for the project root.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname);
const PORT = Number(process.env.PORT ?? 8765);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let path = decodeURIComponent(url.pathname);
  if (path.endsWith("/")) path += "index.html";
  const abs = join(ROOT, path);
  console.log(`[req] ${req.method} ${url.pathname} -> abs=${abs}`);
  if (!abs.startsWith(ROOT)) {
    res.writeHead(403).end("Forbidden");
    return;
  }
  const st = await stat(abs).catch((e) => {
    console.log(`[stat] error: ${e.code}`);
    return null;
  });
  if (!st || !st.isFile()) {
    res.writeHead(404, { "Content-Type": "text/plain" }).end(`Not found: ${path}`);
    return;
  }
  const body = await readFile(abs);
  res.writeHead(200, {
    "Content-Type": MIME[extname(abs).toLowerCase()] ?? "application/octet-stream",
    "Content-Length": body.length,
  });
  res.end(body);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`serving ${ROOT} at http://127.0.0.1:${PORT}/`);
});
