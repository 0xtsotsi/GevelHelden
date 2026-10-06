#!/usr/bin/env node
// Fetch coss component source via the shadcn registry and write to src/.
// Usage: node fetch-coss.mjs
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const COMPONENTS = [
  "utils", // lib, written to src/lib/utils.ts
  "spinner", "button",
  "input", "textarea", "select", "checkbox", "radio-group", "field", "label",
  "menu", "sheet", "dialog", "toast", "scroll-area",
];

const ROOT = resolve(import.meta.dirname);
const SRC = join(ROOT, "src");

function fetch(name) {
  const out = execSync(`npx shadcn@latest view @coss/${name}`, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  return JSON.parse(out);
}

let total = 0;
for (const name of COMPONENTS) {
  console.log(`→ ${name}`);
  const items = fetch(name);
  for (const item of items) {
    for (const f of item.files ?? []) {
      // paths look like "registry/default/ui/button.tsx" or "registry/default/lib/utils.ts"
      const rel = f.path.replace(/^registry\/default\//, "");
      const abs = join(SRC, rel);
      mkdirSync(dirname(abs), { recursive: true });
      // Rewrite @/registry/default/lib/utils -> @/lib/utils
      const content = f.content.replaceAll(
        '@/registry/default/',
        '@/'
      );
      writeFileSync(abs, content);
      total += 1;
    }
  }
}
console.log(`\nWrote ${total} files under ${SRC}`);
