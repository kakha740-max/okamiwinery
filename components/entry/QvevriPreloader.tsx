"use client";

import { useEffect } from "react";
import Image from "next/image";

import { finishIntro, startIntro } from "./entry";

// The qvevri: wide mouth, broad shoulders and a long egg-shaped taper to the
// narrow base, traced from a photograph of one (viewBox 367 60 300 400).
const VESSEL =
  "M468 92C470 85 564 85 566 92L565 108C602 124 640 160 641 210C642 282 576 370 521 428Q517 433 513 428C458 370 392 282 393 210C394 160 432 124 469 108Z";

// The wine's surface when full, just under the neck: a gentle swell, 60 units
// per crest and trough, wide enough to slide one wavelength and loop.
const surface = (y: number) => `M247 ${y}q15 -3.5 30 0${" t30 0".repeat(17)}`;
const wine = (y: number) => `${surface(y)}L787 460L247 460Z`;

// Bubbles rising through the wine: x, start y, radius, delay, duration (s).
const BUBBLES = [
  [478, 410, 1.6, 0.9, 2.4], [503, 425, 1.1, 1.5, 2.1], [532, 405, 1.4, 1.1, 2.7],
  [556, 380, 1, 1.8, 2.2], [455, 350, 1.2, 2.2, 2.5], [588, 320, 1.3, 1.3, 2.6],
] as const;

// Motes of light drifting in the dark around the vessel: position (% of the
// window), size (px), delay and duration (s).
const MOTES = [
  [28, 64, 2, 0.6, 4.2], [34, 32, 1.5, 1.4, 3.6], [39, 78, 2.5, 0.9, 4.8], [44, 20, 1.5, 2.1, 3.9],
  [57, 16, 2, 1.1, 4.4], [61, 74, 1.5, 0.5, 3.7], [66, 42, 2.5, 1.8, 4.6], [70, 84, 2, 1.2, 4.1],
  [24, 46, 1.5, 2.4, 3.8], [74, 28, 1.5, 0.8, 4.3], [37, 90, 2, 1.6, 4.9], [76, 58, 2, 1, 4.7],
] as const;

// Cinematic entry after the age gate, on every full page load (≈4.8s): a gold
// outline draws the qvevri, wine rises inside it as the loading indicator
// (with its percentage climbing beside it), a glint of light crosses the full
// vessel, the logo comes into focus and the page is revealed. The timeline is
// CSS (see "Entry experience" in globals.css), so it starts before hydration;
// the page underneath keeps loading the whole time.
export default function QvevriPreloader() {
  // A returning visitor's preloader is started by the inline script before
  // hydration; acknowledge it (safety timer).
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
      <div className="entry-intro__motes">
        {MOTES.map(([x, y, size, delay, duration], index) => (
          <span
            key={index}
            style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
          />
        ))}
      </div>

      <div className="entry-intro__stage">
        <div className="entry-qvevri">
          <div className="entry-qvevri__glow" />

          <svg viewBox="367 60 300 400" className="entry-qvevri__vessel" role="presentation">
            <defs>
              <linearGradient id="qv-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#e6c98f" />
                <stop offset="0.5" stopColor="#c9a766" />
                <stop offset="1" stopColor="#9a6a3a" />
              </linearGradient>
              <linearGradient id="qv-clay" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#120d0a" />
                <stop offset="0.42" stopColor="#2a1d15" />
                <stop offset="1" stopColor="#100b09" />
              </linearGradient>
              <linearGradient id="qv-wine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#6e1627" />
                <stop offset="0.4" stopColor="#430b17" />
                <stop offset="1" stopColor="#1b0408" />
              </linearGradient>
              {/* Roundness: shaded flanks, and a soft highlight on the left shoulder */}
              <linearGradient id="qv-volume" x1="393" y1="0" x2="641" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#000" stopOpacity="0.6" />
                <stop offset="0.24" stopColor="#000" stopOpacity="0" />
                <stop offset="0.6" stopColor="#000" stopOpacity="0" />
                <stop offset="1" stopColor="#000" stopOpacity="0.65" />
              </linearGradient>
              <radialGradient id="qv-highlight" cx="468" cy="205" r="95" gradientUnits="userSpaceOnUse" gradientTransform="translate(468 205) scale(0.55 1) translate(-468 -205)">
                <stop offset="0" stopColor="#ffe9d0" stopOpacity="0.13" />
                <stop offset="1" stopColor="#ffe9d0" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="qv-glint" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fff3dc" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fff3dc" stopOpacity="0.14" />
                <stop offset="1" stopColor="#fff3dc" stopOpacity="0" />
              </linearGradient>
              <clipPath id="qv-inside">
                <path d={VESSEL} />
              </clipPath>
            </defs>

            <g className="qv-body">
              <path d={VESSEL} fill="url(#qv-clay)" />

              <g clipPath="url(#qv-inside)">
                {/* Wine, rising from the base: a paler wave behind, the deep one in front */}
                <g className="qv-wine">
                  <g className="qv-wave qv-wave--back">
                    <path d={wine(115)} fill="#8a2638" fillOpacity="0.35" />
                  </g>
                  <g className="qv-wave qv-wave--front">
                    <path d={wine(118)} fill="url(#qv-wine)" />
                    <path d={surface(118)} fill="none" stroke="#d98593" strokeOpacity="0.45" strokeWidth="0.8" />
                  </g>
                  {BUBBLES.map(([x, y, r, delay, duration], index) => (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r={r}
                      className="qv-bubble"
                      style={{ animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
                    />
                  ))}
                </g>

                {/* Shoulder bands, the vessel's roundness, and the glint when full */}
                <path d="M424 150Q517 172 610 150M418 158Q517 180 616 158" fill="none" stroke="#c9a766" strokeOpacity="0.28" strokeWidth="0.7" />
                <rect x="367" y="60" width="300" height="400" fill="url(#qv-volume)" />
                <rect x="367" y="60" width="300" height="400" fill="url(#qv-highlight)" />
                <g transform="rotate(16 517 260)">
                  <rect x="300" y="-20" width="80" height="560" fill="url(#qv-glint)" className="qv-glint" />
                </g>
              </g>
            </g>

            {/* The gold outline draws itself, then warms when the vessel is full */}
            <path d={VESSEL} pathLength={1} className="qv-line" fill="none" stroke="url(#qv-gold)" strokeWidth="1.4" />
            <ellipse cx="517" cy="92" rx="48" ry="6" pathLength={1} className="qv-line" fill="#0f0b09" stroke="url(#qv-gold)" strokeWidth="1.4" />
            <path d={VESSEL} className="qv-warm" fill="none" stroke="#f0d29a" strokeWidth="1.4" />
          </svg>

          {/* The level marker: a hairline and the percentage, rising with the wine */}
          <div className="entry-qvevri__gauge">
            <div className="entry-qvevri__level">
              <span className="entry-qvevri__tick" />
              <span className="entry-qvevri__count" />
            </div>
          </div>
        </div>

        <Image
          src="/images/brand/etno-okami-logo.png"
          alt=""
          width={1000}
          height={528}
          sizes="400px"
          preload
          className="entry-intro__logo"
        />
      </div>
    </div>
  );
}
