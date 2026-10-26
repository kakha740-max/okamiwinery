"use client";

import YarlLightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import type { LightboxSlide } from "./Lightbox";

type LightboxViewerProps = {
  open: boolean;
  index: number;
  slides: LightboxSlide[];
  onClose: () => void;
};

export default function LightboxViewer({ open, index, slides, onClose }: LightboxViewerProps) {
  return (
    <YarlLightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      animation={{ fade: 400, swipe: 450 }}
      controller={{ closeOnBackdropClick: true }}
      // A single image (the story page's map) has nowhere to go: no arrows, no looping.
      {...(slides.length < 2 && {
        carousel: { finite: true },
        render: { buttonPrev: () => null, buttonNext: () => null },
      })}
    />
  );
}
