"use client";

import { useState } from "react";
import Image from "next/image";

import GalleryArrow from "./GalleryArrow";
import LightboxViewer from "./Lightbox";

const images = [
  "story1.png",
  "story2.png",
  "story3.png",
  "story4.png",
  "story5.png",
  "story6.png",
  "story7.png",
  "story8.png",
  "story9.png",
];

const IMAGES_PER_PAGE = 3;

export default function Gallery() {
  const [page, setPage] = useState(0);

  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  const next = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const previous = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const start = page * IMAGES_PER_PAGE;

  const visibleImages = images.slice(
    start,
    start + IMAGES_PER_PAGE
  );

  return (
    <>
      <div className="flex items-center gap-8">

        {/* Left Arrow */}

        <GalleryArrow
          direction="left"
          onClick={previous}
        />

        {/* Gallery */}

        <div className="flex-1">

          <div className="grid gap-6 lg:grid-cols-3">

            {visibleImages.map((image, index) => (

              <div
                key={image}
                onClick={() => {
                  setPhotoIndex(start + index);
                  setOpen(true);
                }}
                className="
                  group
                  relative
                  cursor-pointer
                  overflow-hidden
                  rounded-3xl
                  border
                  border-yellow-500/30
                  transition-all
                  duration-500
                  hover:border-yellow-500
                  hover:shadow-[0_0_40px_rgba(200,161,90,0.25)]
                "
              >

                <Image
                  src={`/images/${image}`}
                  alt={image}
                  width={700}
                  height={500}
                  className="
                    h-64
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
                      View Photo
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