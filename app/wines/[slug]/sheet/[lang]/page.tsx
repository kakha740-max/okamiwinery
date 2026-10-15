import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { localizeWine, wines } from "@/components/data/wines";
import KeepWords from "@/components/ui/KeepWords";
import { allAwards, wineSlugForAward } from "@/components/data/awards";
import { getTranslations, type Language } from "@/lib/translations";
import { PHONE, SITE_URL } from "@/lib/site";

// The printable technical sheet of one wine, in one language: an A4 page in
// the site's own type and colours, without animation, so the browser prints
// it exactly. scripts/generate-wine-sheets.mjs saves each one as the PDF
// linked from the wine's page (public/sheets/<slug>-<lang>.pdf).

type Props = {
  params: Promise<{ slug: string; lang: string }>;
};

const languages: Language[] = ["en", "ka", "ru"];

// Every wine in every language. The wine page's own params live in its
// page file, which doesn't pass them down, so the slug is listed here too.
export function generateStaticParams() {
  return wines.flatMap((wine) => languages.map((lang) => ({ slug: wine.slug, lang })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wine = wines.find((wine) => wine.slug === slug);
  return {
    title: wine ? `${wine.name} ${wine.year} — Technical sheet` : "Technical sheet",
    robots: { index: false, follow: false },
  };
}

const medalColour = {
  gold: "bg-medal-gold",
  silver: "bg-medal-silver",
  bronze: "bg-medal-bronze",
  rosso: "bg-medal-rosso",
} as const;

export default async function WineSheetPage({ params }: Props) {
  const { slug, lang } = await params;
  const original = wines.find((wine) => wine.slug === slug);
  if (!original || !languages.includes(lang as Language)) notFound();

  const language = lang as Language;
  const t = getTranslations(language);
  const s = t.winePage;
  const wine = localizeWine(original, language);

  const sweetness: Record<string, string> = {
    Dry: t.wineList.sweetnessDry,
    "Semi-Sweet": t.wineList.sweetnessSemiSweet,
  };
  const specs = [
    { label: s.region, value: wine.region },
    { label: s.type, value: wine.subtitle },
    { label: s.variety, value: wine.variety },
    { label: s.vintage, value: wine.year },
    { label: s.alcohol, value: wine.alcohol },
    { label: s.volume, value: wine.volume },
    { label: s.winemaking, value: wine.method },
    { label: s.style, value: sweetness[wine.sweetness] ?? wine.sweetness },
  ].filter((spec) => spec.value && spec.value !== "—");

  const medals = { gold: t.awards.medalGold, silver: t.awards.medalSilver, bronze: t.awards.medalBronze, rosso: t.awards.medalRosso };
  const awards = allAwards
    .filter((award) => wineSlugForAward(award) === slug)
    .sort((a, b) => (b.competition.year ?? 0) - (a.competition.year ?? 0));

  const site = SITE_URL.replace(/^https?:\/\//, "");

  return (
    <main
      id="main"
      lang={language}
      className="min-h-screen bg-bone pt-28 pb-16 print:bg-white print:p-0 [&:lang(ka)]:[font-feature-settings:'case'_1]"
    >
      {/* One A4 page; on screen it sits on the page like a printed sheet */}
      <article className="wine-sheet mx-auto flex h-[297mm] w-[210mm] flex-col overflow-hidden bg-paper text-ink shadow-[0_30px_80px_-40px_rgb(23_19_15/0.45)] print:shadow-none">
        {/* Masthead */}
        <header className="flex items-center justify-between px-[14mm] pt-[11mm]">
          <Image src="/images/brand/etno-okami-logo.png" alt="Etno Okami Winery" width={1000} height={528} loading="eager" className="h-[13mm] w-auto" />
          <div className="text-right">
            <p className="eyebrow text-bronze">{s.sheetTitle}</p>
            <p className="mt-1 text-[8pt] tracking-[0.08em] text-stone">{site}</p>
          </div>
        </header>

        {/* The wine: bottle beside name, vintage and tasting note */}
        <section className="mt-[8mm] grid grid-cols-[66mm_1fr] gap-[10mm] px-[14mm]">
          <div className="relative flex h-[128mm] items-end justify-center bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,rgb(236_229_216),rgb(236_229_216/0.55)_80%)]">
            <span aria-hidden="true" className="absolute bottom-[7%] left-1/2 h-[3mm] w-[30%] -translate-x-1/2 rounded-[50%] bg-ink/25 blur-[4px]" />
            <Image
              src={wine.image}
              alt={`${wine.name} — ${wine.subtitle}`}
              width={300}
              height={1140}
              loading="eager"
              quality={95}
              className="relative mb-[8%] h-[86%] w-auto object-contain"
            />
          </div>

          <div className="flex flex-col pt-[2mm]">
            <p className="eyebrow text-bronze">{wine.subtitle}</p>
            <h1 className="display-md caps mt-[4mm] font-normal text-[30pt] leading-[1.02] [&:lang(ka)]:text-[22pt] [&:lang(ka)]:leading-[1.2]">
              <KeepWords text={wine.name} />
            </h1>
            <p className="mt-[2mm] font-display text-[22pt] font-light text-bronze italic lining-nums">{wine.year}</p>
            <span aria-hidden="true" className="mt-[6mm] block h-px w-[14mm] bg-gold" />
            <div className="mt-[6mm] space-y-[3mm]">
              {wine.description.split("\n\n").map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-display text-[11.5pt] leading-[1.55] font-light text-ink lining-nums [&:lang(ka)]:text-[9.5pt] [&:lang(ka)]:leading-[1.8]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Technical details, four to a row */}
        <section className="mt-[9mm] px-[14mm]">
          <dl className="grid grid-cols-4 gap-x-[6mm]">
            {specs.map((spec) => (
              <div key={spec.label} className="border-t border-ink/15 pt-[2.5mm] pb-[4mm]">
                <dt className="eyebrow text-[6.5pt] text-stone">{spec.label}</dt>
                <dd className="mt-[1.5mm] text-[9pt] leading-snug text-ink">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Food pairing and awards */}
        <section className={`mt-[3mm] grid gap-[10mm] px-[14mm] ${awards.length ? "grid-cols-2" : "grid-cols-1"}`}>
          {wine.pairing.length > 0 && (
            <div>
              <h2 className="eyebrow text-bronze">{s.pairingTitle}</h2>
              <ol className="mt-[3mm]">
                {wine.pairing.map((dish, index) => (
                  <li key={dish} className="flex items-baseline gap-[3mm] border-b border-ink/10 py-[1.6mm] font-display text-[11pt] [&:lang(ka)]:text-[9.5pt]">
                    <span className="font-sans text-[6.5pt] tracking-[0.2em] text-bronze">{String(index + 1).padStart(2, "0")}</span>
                    {dish}
                  </li>
                ))}
              </ol>
            </div>
          )}
          {awards.length > 0 && (
            <div>
              <h2 className="eyebrow text-bronze">{s.awardsTitle}</h2>
              <ul className="mt-[3mm]">
                {awards.map((award) => (
                  <li key={`${award.competition.id}-${award.vintage}`} className="flex items-baseline gap-[3mm] border-b border-ink/10 py-[1.6mm] text-[8.5pt] leading-snug">
                    <span aria-hidden="true" className={`size-[2.2mm] shrink-0 translate-y-[0.2mm] rounded-full ${medalColour[award.medal]}`} />
                    <span>
                      <span className="font-semibold">{medals[award.medal]}</span>
                      <span className="text-umber"> · {award.competition.title[language]}{award.competition.year ? ` ${award.competition.year}` : ""} · {s.vintage.toLowerCase()} {award.vintage}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Contact band */}
        <footer className="mt-auto flex items-end justify-between gap-[8mm] bg-night px-[14mm] py-[7mm] text-paper">
          <div>
            <p className="font-display text-[12pt] leading-snug text-paper/90 [&:lang(ka)]:text-[10pt]">{t.footer.eyebrow}</p>
            <p className="mt-[2mm] max-w-[80mm] text-[7pt] leading-relaxed text-paper/50">{t.footer.responsible}</p>
          </div>
          <dl className="grid grid-cols-[auto_auto] gap-x-[5mm] gap-y-[1.2mm] text-[7.5pt]">
            <dt className="text-paper/45">{t.footer.emailLabel}</dt>
            <dd>{t.footer.email}</dd>
            <dt className="text-paper/45">{t.footer.phoneLabel}</dt>
            <dd className="tabular-nums">{PHONE}</dd>
            <dt className="text-paper/45">{t.footer.addressLabel}</dt>
            <dd>{t.footer.address}</dd>
            <dt className="text-paper/45">{s.sheetWeb}</dt>
            <dd>{site}</dd>
          </dl>
        </footer>
      </article>
    </main>
  );
}
