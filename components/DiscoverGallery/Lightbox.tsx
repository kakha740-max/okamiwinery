"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type LightboxViewerProps = {
  open: boolean;
  index: number;
  images: string[];
  onClose: () => void;
};

export default function LightboxViewer({
  open,
  index,
  images,
  onClose,
}: LightboxViewerProps) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={images.map((image) => ({
        src: `/images/${image}`,
      }))}
    />
  );
}