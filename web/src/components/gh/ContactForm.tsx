// Final: native HTML form elements with Gevelhelden brand styling.
// coss Field/Input/Select/Checkbox triggered Base UI error #28 when
// mounted alongside the coss Nav. Native inputs avoid the issue and
// match the rest of the site's existing styling.
const ONDERWERP = [
  "Offerte aanvragen",
  "Vraag over dienst",
  "VvE-aanvraag",
  "Samenwerking",
  "Vacature / sollicitatie",
  "Anders",
];

const INPUT_CLS =
  "h-9 w-full rounded-lg border border-[var(--brand-ink)]/15 bg-white px-3 text-sm text-[var(--brand-ink)] outline-none transition-colors focus:border-[var(--brand-ink)]/40";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-[var(--brand-ink)]">{label}</span>
      {children}
    </label>
  );
}

export function ContactForm() {
  return (
    <form
      action="mailto:hallo@gevelhelden.nl"
      method="post"
      encType="text/plain"
      className="flex max-w-2xl flex-col gap-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Naam">
          <input required name="naam" type="text" className={INPUT_CLS} />
        </Field>
        <Field label="Telefoon">
          <input required name="tel" type="tel" className={INPUT_CLS} />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="E-mail">
          <input required name="email" type="email" className={INPUT_CLS} />
        </Field>
        <Field label="Onderwerp">
          <select
            required
            name="onderwerp"
            defaultValue=""
            className={INPUT_CLS}
          >
            <option value="" disabled>Kies onderwerp</option>
            {ONDERWERP.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Bericht">
        <textarea
          required
          name="bericht"
          rows={6}
          placeholder="Vertel ons over uw vraag of project..."
          className="w-full rounded-lg border border-[var(--brand-ink)]/15 bg-white px-3 py-2 text-sm text-[var(--brand-ink)] outline-none transition-colors focus:border-[var(--brand-ink)]/40"
        />
      </Field>
      <p className="-mt-2 text-xs text-[var(--brand-ink)]/60">
        We reageren dezelfde dag op werkdagen.
      </p>
      <label className="flex items-start gap-2 text-sm text-[var(--brand-ink)]">
        <input
          type="checkbox"
          name="akkoord"
          value="ja"
          required
          className="mt-0.5 size-4 accent-[var(--brand-yellow)]"
        />
        <span>
          Ik ga akkoord met de <a className="underline" href="blog.html">privacyvoorwaarden</a>.
        </span>
      </label>
      <div>
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--brand-ink)] bg-[var(--brand-ink)] px-5 py-2.5 text-sm font-semibold text-white shadow-[3px_3px_0_var(--brand-yellow)] transition-transform hover:-translate-y-0.5"
        >
          Verstuur bericht
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
}
