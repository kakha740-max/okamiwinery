"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

export type LightboxSlide = {
  src: string;
  alt?: string;
};

type LightboxProps = {
  open: boolean;
  index: number;
  slides: LightboxSlide[];
  onClose: () => void;
};

// The viewer (and its stylesheet) is only downloaded the first time a
// visitor opens an image, keeping it out of every page's initial bundle.
const Viewer = dynamic(() => import("./LightboxViewer"), { ssr: false });

export default function Lightbox({ open, ...props }: LightboxProps) {
  // Stay mounted after the first open so the closing fade can play.
  const [used, setUsed] = useState(false);
  if (open && !used) setUsed(true);
  if (!used) return null;

  return <Viewer open={open} {...props} />;
}
