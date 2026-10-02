"use client";

import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main id="main" className="flex min-h-[80svh] items-center bg-paper pt-24">
      <Container size="narrow" className="py-24 text-center">
        <p className="font-display text-[clamp(6rem,18vw,12rem)] leading-none font-light text-ink/15">404</p>
        <h1 className="display-md mt-4 text-ink">{t.ui.notFoundTitle}</h1>
        <p className="body-copy mx-auto mt-6 max-w-md text-umber">{t.ui.notFoundText}</p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" variant="solid" arrow>
            {t.navbar.home}
          </ButtonLink>
          <ButtonLink href="/wines" variant="outline">
            {t.ui.allWines}
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
