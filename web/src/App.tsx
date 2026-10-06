// Single bundle that exposes mount functions for the static HTML pages.
// Each page includes <div id="gh-..."></div> and a <script> that calls
// the corresponding mount() on load. Keeps the React shell out of the
// document <head> and lets non-React pages co-exist.

import { createRoot, type Root } from "react-dom/client";
import { Nav } from "@/components/gh/Nav";
import { ContactForm } from "@/components/gh/ContactForm";
import { OfferteStepper } from "@/components/gh/OfferteStepper";

// Disable Base UI's production error minification so we can read the message.
(globalThis as any).process = { env: { ...(globalThis as any).process?.env, NODE_ENV: "development" } };

const roots = new Map<HTMLElement, Root>();

function mount(id: string, el: React.ReactNode) {
  const host = document.getElementById(id);
  if (!host) return;
  // Avoid double-mount on hot reload.
  if (roots.has(host)) return;
  const root = createRoot(host);
  root.render(<>{el}</>);
  roots.set(host, root);
}

declare global {
  interface Window {
    ghMount: {
      nav: () => void;
      contact: () => void;
      offerte: () => void;
    };
  }
}

window.ghMount = {
  nav: () => mount("gh-nav-root", <Nav />),
  contact: () => mount("gh-contact-root", <ContactForm />),
  offerte: () => mount("gh-offerte-root", <OfferteStepper />),
};

// Auto-mount anything that's already in the DOM (typical case).
function runMounts() {
  for (const name of ["nav", "contact", "offerte"] as const) {
    try {
      window.ghMount[name]();
    } catch (e) {
      // Mount errors are non-fatal — log to console, keep the page working.
      console.error(`[ghMount.${name}]`, e);
    }
  }
  window.addEventListener("error", (e) => {
    console.error("[gh:window]", e.message);
  });
}
if (document.readyState !== "loading") {
  runMounts();
} else {
  document.addEventListener("DOMContentLoaded", runMounts);
}
