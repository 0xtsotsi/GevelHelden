#!/usr/bin/env node
// Wire the coss bundle into every static HTML page. Replaces the existing
// <header class="nav">…</header> with a mount div, and for contact/offerte
// also replaces the form blocks with mount divs.
import { readFile, writeFile } from "node:fs/promises";
import { resolve, basename } from "node:path";

const ROOT = resolve(import.meta.dirname);
const PAGES = [
  "index.html",
  "blog.html",
  "contact.html",
  "diensten.html",
  "offerte.html",
  "over-ons.html",
  "projecten.html",
  "reviews.html",
  "werkgebied.html",
];
// Subpages also have the same nav header.
import { readdirSync, statSync } from "node:fs";
const diensten = readdirSync(join(ROOT, "diensten"))
  .filter((f) => f.endsWith(".html"))
  .map((f) => `diensten/${f}`);

const ALL = [...PAGES, ...diensten];

const JS_HASH = process.env.JS_HASH ?? "";
const CSS_HASH = process.env.CSS_HASH ?? "";
if (!JS_HASH || !CSS_HASH) {
  console.error("Set JS_HASH and CSS_HASH env vars (the bundle's hashed filenames).");
  process.exit(1);
}

const BUNDLE_LINK = `<link rel="stylesheet" href="/web-assets/assets/${CSS_HASH}" />`;
const BUNDLE_SCRIPT = `<script type="module" src="/web-assets/assets/${JS_HASH}"></script>`;

// Replace the entire <header class="nav">…</header> block with a mount div.
const NAV_RE = /<header class="nav">[\s\S]*?<\/header>/i;
const NAV_REPLACEMENT = `<div id="gh-nav-root"></div>`;

// Replace the contact form block.
const CONTACT_RE = /<form class="contact-form[\s\S]*?<\/form>/i;
const CONTACT_REPLACEMENT = `<div id="gh-contact-root"></div>`;

// Replace the stepper form block on offerte.html.
const OFFERTE_RE = /<form class="stepper[\s\S]*?<\/form>/i;
const OFFERTE_REPLACEMENT = `<div id="gh-offerte-root"></div>`;

import { join } from "node:path";

let changed = 0;
for (const rel of ALL) {
  const abs = join(ROOT, rel);
  let html = await readFile(abs, "utf8");
  let before = html;

  // Inject bundle assets
  if (html.includes(BUNDLE_LINK)) {
    // already injected
  } else {
    html = html.replace(
      /<link rel="stylesheet" href="(?:\.\.\/)?public\/css\/style\.css" ?\/>/,
      (m) => `${m}\n  ${BUNDLE_LINK}`,
    );
  }
  if (!html.includes(BUNDLE_SCRIPT)) {
    html = html.replace(
      /<script src="(?:\.\.\/)?public\/js\/app\.js"><\/script>/,
      (m) => `${m}\n  ${BUNDLE_SCRIPT}`,
    );
  }

  // Replace nav header
  if (NAV_RE.test(html)) {
    html = html.replace(NAV_RE, NAV_REPLACEMENT);
  } else if (!html.includes('id="gh-nav-root"')) {
    console.warn(`[${rel}] no <header class="nav"> found, skipping nav swap`);
  }

  // Replace contact form
  if (CONTACT_RE.test(html)) {
    html = html.replace(CONTACT_RE, CONTACT_REPLACEMENT);
  }
  // Replace offerte stepper
  if (OFFERTE_RE.test(html)) {
    html = html.replace(OFFERTE_RE, OFFERTE_REPLACEMENT);
  }

  if (html !== before) {
    await writeFile(abs, html);
    changed += 1;
    console.log(`✓ ${rel}`);
  } else {
    console.log(`- ${rel} (no change)`);
  }
}
console.log(`\nUpdated ${changed} files.`);
