import { Menu, MenuPopup, MenuTrigger, MenuItem } from "@/components/ui/menu";
import { Sheet, SheetBackdrop, SheetClose, SheetPopup, SheetTrigger, SheetPortal, SheetViewport } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const DISCIPLINES = [
  { href: "diensten/gevelrenovatie.html", n: "01", title: "Gevelrenovatie", sub: "Herstel · Verduurzaming" },
  { href: "diensten/metselwerk.html",      n: "02", title: "Metselwerk",      sub: "Vervangen · Herstellen" },
  { href: "diensten/voegwerk.html",        n: "03", title: "Voegwerk",        sub: "Platvol · Verdiept" },
  { href: "diensten/betonreparatie.html",  n: "04", title: "Betonreparatie",  sub: "Scheuren · Corrosie" },
  { href: "diensten/gevelreiniging.html",  n: "05", title: "Gevelreiniging",  sub: "Stralen · Stoom" },
];

const LINKS: Array<[string, string]> = [
  ["projecten.html", "Projecten"],
  ["werkgebied.html", "Werkgebied"],
  ["blog.html", "Blog"],
  ["reviews.html", "Reviews"],
  ["over-ons.html", "Over ons"],
  ["contact.html", "Contact"],
];

function Arrow() {
  return (
    <span className="arrow ml-1 inline-flex" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-4">
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </span>
  );
}

function Brand() {
  return (
    <a className="flex items-center gap-2" href="index.html" aria-label="Gevelhelden — home">
      <img src="public/images/logo.svg" alt="Gevelhelden" className="h-8" />
      <span className="whitespace-nowrap rounded border border-[var(--brand-ink)]/20 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--brand-ink)]/70">
        NL · ZH
      </span>
    </a>
  );
}

function PhoneDot() {
  return <span className="mr-2 inline-block size-2 rounded-full bg-emerald-500 align-middle" />;
}

function DesktopNav() {
  return (
    <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
      <ul className="flex items-center gap-1">
        <li>
          <Menu>
            <MenuTrigger className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-[var(--brand-ink)] outline-none hover:text-[var(--brand-brown)] data-[popup-open]:text-[var(--brand-brown)]">
              Diensten
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3 w-3 opacity-70" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </MenuTrigger>
            <MenuPopup
              sideOffset={8}
              className="min-w-[320px] rounded-lg border border-[var(--brand-ink)]/12 bg-white p-1 shadow-[6px_6px_0_var(--brand-ink)]"
            >
              <MenuItem
                render={
                  <a
                    href="diensten.html"
                    className="block rounded-md px-3 py-2 outline-none data-[highlighted]:bg-[var(--brand-yellow)]/15"
                  />
                }
              >
                <span className="text-sm font-semibold text-[var(--brand-ink)]">Alle disciplines →</span>
                <span className="block text-xs text-[var(--brand-ink)]/60">Overzichtspagina</span>
              </MenuItem>
              <div className="my-1 h-px bg-[var(--brand-ink)]/10" />
              {DISCIPLINES.map((d) => (
                <MenuItem
                  key={d.href}
                  render={
                    <a
                      href={d.href}
                      className="flex flex-col gap-0.5 rounded-md px-3 py-2 outline-none data-[highlighted]:bg-[var(--brand-yellow)]/15"
                    />
                  }
                >
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--brand-brown)]">
                    {d.n} / Discipline
                  </span>
                  <span className="text-sm font-semibold text-[var(--brand-ink)]">{d.title}</span>
                  <span className="text-xs text-[var(--brand-ink)]/60">{d.sub}</span>
                </MenuItem>
              ))}
            </MenuPopup>
          </Menu>
        </li>
        {LINKS.map(([href, label]) => (
          <li key={href}>
            <a
              href={href}
              className="px-3 py-2 text-sm font-medium text-[var(--brand-ink)] hover:text-[var(--brand-brown)]"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label="Open menu"
            className="lg:hidden inline-flex size-10 items-center justify-center rounded border border-[var(--brand-ink)]/20"
          />
        }
      >
        <span className="relative block size-4 before:absolute before:left-0 before:top-0 before:h-0.5 before:w-full before:bg-[var(--brand-ink)] before:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[var(--brand-ink)] after:content-['']">
          <span className="absolute left-0 top-1/2 block h-0.5 w-full -translate-y-1/2 bg-[var(--brand-ink)]" />
        </span>
      </SheetTrigger>
      <SheetBackdrop className="fixed inset-0 z-40 bg-black/40 data-[open]:animate-in data-[open]:fade-in-0" />
      <SheetPortal>
        <SheetViewport>
      <SheetPopup
        side="right"
        className="fixed inset-y-0 right-0 z-50 flex w-[min(360px,90vw)] flex-col gap-2 border-l border-[var(--brand-ink)]/12 bg-white p-5 shadow-[-6px_0_0_var(--brand-ink)]"
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--brand-brown)]">
            Menu
          </span>
          <SheetClose
            render={
              <button
                type="button"
                aria-label="Sluit menu"
                className="inline-flex size-8 items-center justify-center rounded border border-[var(--brand-ink)]/20 text-sm"
              >
                ×
              </button>
            }
          />
        </div>
        <ul className="flex flex-col">
          <li>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded px-2 py-2.5 text-sm font-medium hover:bg-[var(--brand-yellow)]/15">
                Diensten
                <span className="text-xs text-[var(--brand-brown)] group-open:rotate-90 transition-transform">▶</span>
              </summary>
              <ul className="ml-2 mt-1 flex flex-col border-l border-[var(--brand-ink)]/10 pl-2">
                <li>
                  <a href="diensten.html" className="block rounded px-2 py-1.5 text-sm font-semibold">
                    Alle disciplines
                  </a>
                </li>
                {DISCIPLINES.map((d) => (
                  <li key={d.href}>
                    <a
                      href={d.href}
                      className="block rounded px-2 py-1.5 text-sm hover:bg-[var(--brand-yellow)]/15"
                    >
                      {d.title}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </li>
          {LINKS.map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="block rounded px-2 py-2.5 text-sm font-medium hover:bg-[var(--brand-yellow)]/15"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-2 border-t border-[var(--brand-ink)]/10 pt-4">
          <a
            href="tel:+31621180071"
            className="inline-flex items-center text-sm font-medium text-[var(--brand-ink)]"
          >
            <PhoneDot />
            06-21180071
          </a>
          <a
            href="offerte.html"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[var(--brand-ink)] bg-[var(--brand-yellow)] px-4 py-2.5 text-sm font-semibold text-[var(--brand-ink)] shadow-[3px_3px_0_var(--brand-ink)]"
          >
            Offerte aanvragen
            <Arrow />
          </a>
        </div>
      </SheetPopup>
        </SheetViewport>
      </SheetPortal>
    </Sheet>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--brand-ink)]/8 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:py-4">
        <Brand />
        <DesktopNav />
        <div className="flex items-center gap-2">
          <a
            href="tel:+31621180071"
            className="hidden md:inline-flex items-center text-sm font-medium text-[var(--brand-ink)]"
          >
            <PhoneDot />
            06-21180071
          </a>
          <a
            href="offerte.html"
            className={cn(
              "hidden md:inline-flex items-center gap-1.5 rounded-lg border border-[var(--brand-ink)]",
              "bg-[var(--brand-yellow)] px-4 py-2 text-sm font-semibold text-[var(--brand-ink)]",
              "shadow-[3px_3px_0_var(--brand-ink)] transition-transform hover:-translate-y-0.5"
            )}
          >
            Offerte aanvragen
            <Arrow />
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
