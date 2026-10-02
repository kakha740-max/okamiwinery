"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";

import GalleryArrow from "./GalleryArrow";
import LightboxViewer from "./Lightbox";
import { galleryImages } from "./images";

const images = galleryImages;

const AUTOPLAY_MS = 3500;
const SLIDE_MS = 900;

// The first few images are repeated at the end of the track so the slide
// from the last photo back to the first looks continuous; once that slide
// finishes, the track jumps back to the real first photo without animating.
const MAX_PER_VIEW = 3;
const track = [...images, ...images.slice(0, MAX_PER_VIEW)];

export default function Gallery() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [perView, setPerView] = useState(1);
  const [paused, setPaused] = useState(false);
  const pendingIndex = useRef<number | null>(null);

  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setPerView(query.matches ? 3 : 1);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const next = useCallback(() => {
    setIndex((prev) => Math.min(prev + 1, images.length));
  }, []);

  const previous = () => {
    if (index === 0) {
      // Jump (unanimated) to the clone of the first photo, then slide back one.
      pendingIndex.current = images.length - 1;
      setAnimate(false);
      setIndex(images.length);
      return;
    }
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  // Re-enable the transition a couple of frames after an unanimated jump.
  useEffect(() => {
    if (animate) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        setAnimate(true);
        if (pendingIndex.current !== null) {
          setIndex(pendingIndex.current);
          pendingIndex.current = null;
        }
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  useEffect(() => {
    if (paused || open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, open, next]);

  const handleTransitionEnd = (event: React.TransitionEvent) => {
    if (event.target !== event.currentTarget) return;
    if (index >= images.length) {
      setAnimate(false);
      setIndex(index - images.length);
    }
  };

  return (
    <>
      <div className="flex items-center gap-8">

        {/* Left Arrow */}

        <GalleryArrow
          direction="left"
          onClick={previous}
        />

        {/* Gallery */}

        <div
          className="flex-1 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >

          <div
            onTransitionEnd={handleTransitionEnd}
            className="-mx-3 flex"
            style={{
              transform: `translateX(-${(index * 100) / perView}%)`,
              transition: animate
                ? `transform ${SLIDE_MS}ms cubic-bezier(0.45, 0, 0.2, 1)`
                : "none",
            }}
          >

            {track.map((image, trackIndex) => (

              <div
                key={`${image}-${trackIndex}`}
                className="shrink-0 px-3"
                style={{ width: `${100 / perView}%` }}
              >

              <div
                onClick={() => {
                  setPhotoIndex(trackIndex % images.length);
                  setOpen(true);
                }}
                className="
                  group
                  relative
                  cursor-pointer
                  overflow-hidden
                  border
                  border-[#C8A15A]/30
                  transition-all
                  duration-500
                  hover:border-[#C8A15A]
                  hover:shadow-[0_0_40px_rgba(200,161,90,0.25)]
                "
              >

                <Image
                  src={`/images/${image}`}
                  alt={image}
                  width={700}
                  height={500}
                  className="
                    aspect-square
                    w-full
                    object-cover
                    transition-all
                    duration-700
                    group-hover:scale-110
                  "
                />

                {/* Overlay */}

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-500 group-hover:bg-black/40">

                  <div className="translate-y-6 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">

                    <div
                      className="
                        rounded-full
                        border
                        border-yellow-500
                        px-6
                        py-3
                        uppercase
                        tracking-[0.25em]
                        text-sm
                        text-yellow-400
                      "
                    >
                      {t.discover.viewPhoto}
                    </div>

                  </div>

                </div>

              </div>

              </div>

            ))}

          </div>

        </div>

        {/* Right Arrow */}

        <GalleryArrow
          direction="right"
          onClick={next}
        />

      </div>

      <LightboxViewer
        open={open}
        index={photoIndex}
        images={images}
        onClose={() => setOpen(false)}
      />
    </>
  );
}