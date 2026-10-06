// Final: native HTML form elements with Gevelhelden brand styling.
// coss Field/Input/Select/Checkbox/RadioGroup triggered Base UI error
// #28 when mounted alongside the coss Nav. Native inputs avoid the
// issue and keep the form robust.
import { useState } from "react";
import { cn } from "@/lib/utils";

const DIENSTEN = [
  { value: "renovatie", label: "Gevelrenovatie" },
  { value: "metsel", label: "Metselwerk" },
  { value: "voeg", label: "Voegwerk" },
  { value: "beton", label: "Betonreparatie" },
  { value: "reiniging", label: "Gevelreiniging" },
  { value: "anders", label: "Anders / weet ik niet" },
];

const GEMEENTEN = [
  "Rotterdam", "Den Haag", "Dordrecht", "Leiden", "Delft", "Schiedam",
  "Vlaardingen", "Gouda", "Zoetermeer", "Anders",
];

const TYPES = ["Particulier (woning)", "VvE", "Beheerder / vastgoed", "Aannemer", "Anders"];
const START = ["Zo snel mogelijk", "Binnen 3 maanden", "Binnen 6 maanden", "Oriëntatie, geen haast"];

const CONTACT = [
  { value: "tel", label: "Telefoon" },
  { value: "mail", label: "E-mail" },
  { value: "whatsapp", label: "WhatsApp" },
];

const STEPS = [
  { title: "Welke dienst?", hint: "Kies de discipline die het beste bij uw vraag past. Bij twijfel: kies 'Anders / weet ik niet'." },
  { title: "Uw gegevens", hint: "We gebruiken deze alleen om contact op te nemen — geen spam, geen verkoop aan derden." },
  { title: "Over de gevel", hint: "Geen vakjargon nodig — beschrijf wat u ziet. Liever geen tekst? Ga door en bespreek het tijdens de inspectie." },
  { title: "Contact & afronden", hint: "Hoe wilt u dat we contact opnemen?" },
];

const INPUT_CLS =
  "h-9 w-full rounded-lg border border-[var(--brand-ink)]/15 bg-white px-3 text-sm text-[var(--brand-ink)] outline-none transition-colors focus:border-[var(--brand-ink)]/40";

function FieldShell({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-[var(--brand-ink)]">{label}</span>
      {children}
    </label>
  );
}

function Tile({
  name,
  value,
  label,
  selected,
  onSelect,
}: {
  name: string;
  value: string;
  label: string;
  selected: boolean;
  onSelect: (v: string) => void;
}) {
  return (
    <label
      className={cn(
        "block cursor-pointer rounded-lg border bg-white px-4 py-3 text-sm font-medium transition-shadow outline-none",
        selected
          ? "border-[var(--brand-ink)] bg-[var(--brand-yellow)] shadow-[3px_3px_0_var(--brand-ink)]"
          : "border-[var(--brand-ink)]/15 hover:border-[var(--brand-ink)]/40"
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={selected}
        onChange={() => onSelect(value)}
        className="sr-only"
      />
      {label}
    </label>
  );
}

function Arrow() {
  return (
    <span className="ml-1 inline-flex" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </span>
  );
}

export function OfferteStepper() {
  const [step, setStep] = useState(0);
  const [dienst, setDienst] = useState("");
  const [gemeente, setGemeente] = useState("");
  const [type, setType] = useState(TYPES[0]);
  const [start, setStart] = useState(START[0]);
  const [contact, setContact] = useState("tel");

  const last = step === STEPS.length - 1;

  return (
    <form
      action="#"
      method="post"
      className="mx-auto flex w-full max-w-3xl flex-col gap-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <ol className="flex items-center gap-2" aria-hidden="true">
        {STEPS.map((_, i) => (
          <li
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              i <= step ? "bg-[var(--brand-yellow)]" : "bg-[var(--brand-ink)]/10"
            )}
          />
        ))}
      </ol>

      <header>
        <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--brand-brown)]">
          Stap {String(step + 1).padStart(2, "0")} — {STEPS[step].title}
        </h3>
        <p className="mt-1 text-sm text-[var(--brand-ink)]/70">{STEPS[step].hint}</p>
      </header>

      {step === 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DIENSTEN.map((d) => (
            <Tile
              key={d.value}
              name="dienst"
              value={d.value}
              label={d.label}
              selected={dienst === d.value}
              onSelect={setDienst}
            />
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldShell label="Naam">
              <input required name="naam" type="text" className={INPUT_CLS} />
            </FieldShell>
            <FieldShell label="Telefoon">
              <input required name="tel" type="tel" className={INPUT_CLS} />
            </FieldShell>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldShell label="E-mail">
              <input required name="email" type="email" className={INPUT_CLS} />
            </FieldShell>
            <FieldShell label="Gemeente">
              <select
                required
                name="gemeente"
                value={gemeente}
                onChange={(e) => setGemeente(e.target.value)}
                className={INPUT_CLS}
              >
                <option value="" disabled>Kies gemeente</option>
                {GEMEENTEN.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </FieldShell>
          </div>
          <FieldShell label="Type opdrachtgever">
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={INPUT_CLS}
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </FieldShell>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-4">
          <FieldShell label="Korte omschrijving">
            <textarea
              name="omschrijving"
              rows={4}
              placeholder="Bijv. scheuren in voegwerk, vochtplekken, losse stenen..."
              className="w-full rounded-lg border border-[var(--brand-ink)]/15 bg-white px-3 py-2 text-sm text-[var(--brand-ink)] outline-none transition-colors focus:border-[var(--brand-ink)]/40"
            />
          </FieldShell>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FieldShell label="Geschat oppervlak (m²)">
              <input name="oppervlak" type="text" placeholder="bijv. 120" className={INPUT_CLS} />
            </FieldShell>
            <FieldShell label="Gewenste start">
              <select
                name="start"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className={INPUT_CLS}
              >
                {START.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </FieldShell>
          </div>
          <FieldShell label="Foto's uploaden (optioneel)">
            <input
              type="file"
              name="fotos"
              multiple
              accept="image/*"
              className="mt-1 block w-full text-sm text-[var(--brand-ink)]/70 file:mr-3 file:rounded file:border file:border-[var(--brand-ink)]/20 file:bg-white file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-[var(--brand-ink)]"
            />
            <p className="mt-1 text-xs text-[var(--brand-ink)]/60">
              Max 5 foto's, JPG/PNG, samen max 20 MB.
            </p>
          </FieldShell>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {CONTACT.map((c) => (
              <Tile
                key={c.value}
                name="contact"
                value={c.value}
                label={c.label}
                selected={contact === c.value}
                onSelect={setContact}
              />
            ))}
          </div>
          <label className="flex items-start gap-2 text-sm text-[var(--brand-ink)]">
            <input
              type="checkbox"
              name="akkoord"
              value="ja"
              required
              className="mt-0.5 size-4 accent-[var(--brand-yellow)]"
            />
            <span>
              Ik ga akkoord met de <a className="underline" href="#">privacyvoorwaarden</a> en ontvang graag binnen 24 uur een reactie.
            </span>
          </label>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-[var(--brand-ink)]/10 pt-4">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="inline-flex items-center rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-[var(--brand-ink)] hover:bg-[var(--brand-ink)]/5 disabled:opacity-40"
        >
          ← Vorige
        </button>
        {last ? (
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--brand-ink)] bg-[var(--brand-yellow)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-ink)] shadow-[3px_3px_0_var(--brand-ink)] transition-transform hover:-translate-y-0.5"
          >
            Verstuur aanvraag
            <Arrow />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--brand-ink)] bg-[var(--brand-ink)] px-4 py-2 text-sm font-semibold text-white"
          >
            Volgende
            <Arrow />
          </button>
        )}
      </div>
    </form>
  );
}
