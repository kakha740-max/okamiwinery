"use client";

import { useEffect } from "react";
import Image from "next/image";

import { finishIntro, startIntro } from "./entry";

// The vessel: a wide mouth under a thick rim, broad high shoulders and a long
// egg-shaped taper to the narrow base of a qvevri (viewBox 0 0 240 300).
// Closed straight across the mouth so it can also clip the wine.
const VESSEL =
  "M88 48C80 70 34 82 30 122C26 176 82 244 110 280Q120 291 130 280C158 244 214 176 210 122C206 82 160 70 152 48Z";

// The wine's surface: a gentle wave, 120 units per crest-and-trough, wide
// enough to slide sideways by one wavelength and loop seamlessly.
const SURFACE = `M-240 57q30 -3.5 60 0${" t60 0".repeat(11)}`;
const WINE = `${SURFACE}L480 300L-240 300Z`;

// Cinematic entry, played once per session after the age gate: the qvevri
// appears, fills with wine, warms in copper light with the logo, then fades
// into the page. Pure SVG + CSS (see "Entry experience" in globals.css); the
// page underneath keeps loading the whole time.
export default function QvevriPreloader() {
  // A returning visitor's preloader is started by the inline script before
  // hydration; acknowledge it (session cookie + safety timer).
  useEffect(() => {
    const root = document.documentElement;
    if (root.hasAttribute("data-intro-play") && !root.hasAttribute("data-intro-done")) startIntro();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="entry-intro"
      onAnimationStart={(event) => {
        if (event.target === event.currentTarget && event.animationName === "entry-out") {
          document.documentElement.setAttribute("data-intro-reveal", "");
        }
      }}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && event.animationName === "entry-out") finishIntro();
      }}
    >
      <div className="entry-intro__stage">
        <div className="relative">
          <div className="entry-intro__glow" />
          <svg viewBox="0 0 240 300" className="entry-intro__vessel" role="presentation">
            <defs>
              <linearGradient id="qv-copper" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#D6A06A" />
                <stop offset="0.45" stopColor="#B87333" />
                <stop offset="1" stopColor="#7A4528" />
              </linearGradient>
              <linearGradient id="qv-clay" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#100c0a" />
                <stop offset="0.45" stopColor="#211913" />
                <stop offset="1" stopColor="#0d0a08" />
              </linearGradient>
              <linearGradient id="qv-wine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#6e1526" />
                <stop offset="0.3" stopColor="#4c0d19" />
                <stop offset="1" stopColor="#22050b" />
              </linearGradient>
              <radialGradient id="qv-sheen" cx="0.33" cy="0.36" r="0.6">
                <stop offset="0" stopColor="#D6A06A" stopOpacity="0.16" />
                <stop offset="1" stopColor="#D6A06A" stopOpacity="0" />
              </radialGradient>
              <clipPath id="qv-inside">
                <path d={VESSEL} />
              </clipPath>
            </defs>

            <g className="qv-vessel">
              {/* Clay body */}
              <path d={VESSEL} fill="url(#qv-clay)" />

              {/* Wine, rising from the base */}
              <g clipPath="url(#qv-inside)">
                <g className="qv-wine">
                  <g className="qv-wave">
                    <path d={WINE} fill="url(#qv-wine)" />
                    <path d={SURFACE} fill="none" stroke="#9c3446" strokeOpacity="0.55" strokeWidth="1" />
                  </g>
                </g>
                {/* Rounded sheen on the clay, and a rope band at the shoulder */}
                <path d={VESSEL} fill="url(#qv-sheen)" />
                <path d="M40 97Q120 117 200 97M37 104Q120 124 203 104" fill="none" stroke="#B87333" strokeOpacity="0.35" strokeWidth="0.8" />
              </g>

              {/* Copper outline, drawn on; a warm second line lights up when full */}
              <path d={VESSEL} pathLength={1} className="qv-line" fill="none" stroke="url(#qv-copper)" strokeWidth="1.5" />
              <ellipse cx="120" cy="45" rx="37" ry="7" pathLength={1} className="qv-line" fill="#15110F" stroke="url(#qv-copper)" strokeWidth="2.4" />
              <path d={VESSEL} className="qv-warm" fill="none" stroke="#D6A06A" strokeWidth="1.5" />
              <ellipse cx="120" cy="45" rx="37" ry="7" className="qv-warm" fill="none" stroke="#D6A06A" strokeWidth="2.4" />
            </g>
          </svg>
        </div>

        <Image
          src="/images/brand/etno-okami-logo.png"
          alt=""
          width={1000}
          height={528}
          sizes="160px"
          preload
          className="entry-intro__logo"
        />
      </div>
    </div>
  );
}
