import Image from "next/image";

import Container from "./Container";

type PageHeroProps = {
  image: string;
  /** Decorative by default — the h1 carries the meaning. */
  imageAlt?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  /** CSS object-position for the photograph. */
  focus?: string;
};

// Full-bleed photographic opening used by every inner page: the page title
// sits on the image, bottom-left, like a magazine opener.
export default function PageHero({ image, imageAlt = "", eyebrow, title, intro, focus = "50% 50%" }: PageHeroProps) {
  return (
    <section className="on-dark relative flex h-[78svh] min-h-[34rem] max-h-[56rem] items-end overflow-hidden bg-night text-paper">
      <Image
        src={image}
        alt={imageAlt}
        fill
        preload
        sizes="100vw"
        className="slow-zoom object-cover"
        style={{ objectPosition: focus }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/30 to-night/40" />

      <Container size="wide" className="relative pb-14 md:pb-20">
        <p className="eyebrow text-gold">{eyebrow}</p>
        <h1 className="display-lg mt-5 max-w-4xl">{title}</h1>
        {intro && <p className="body-copy mt-6 max-w-xl text-paper/75">{intro}</p>}
      </Container>
    </section>
  );
}
