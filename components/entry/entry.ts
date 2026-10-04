// The entry experience — the 18+ gate, then the qvevri preloader — is driven
// by attributes on <html>, so the right screen is already in place on the very
// first paint, before React hydrates:
//
//   data-age-ok       age confirmed (localStorage, persists)  → gate hidden
//   data-intro-play   preloader running                        → CSS animations start
//   data-intro-reveal preloader fading out                     → page scroll unlocked
//   data-intro-done   preloader finished                       → preloader hidden
//   data-entry-lang   language for the gate's copy before hydration
//
// The preloader plays on every full page load (including a browser refresh).
// Internal navigation keeps the layout mounted, so link clicks never replay it.

export const AGE_STORAGE_KEY = "age-verified";

// Runs inline at the top of <body>. Mirrors LanguageProvider's language choice:
// the visitor's saved language, otherwise English.
export const entryScript = `try{var d=document.documentElement;if(localStorage.getItem("${AGE_STORAGE_KEY}")==="1"){d.setAttribute("data-age-ok","");d.setAttribute("data-intro-play","")}var l=localStorage.getItem("language");d.setAttribute("data-entry-lang",l==="ka"||l==="ru"?l:"en")}catch(e){}`;

const root = () => document.documentElement;

let fallback: ReturnType<typeof setTimeout> | undefined;

/** Marks the preloader as finished: hidden, page scrollable. */
export function finishIntro() {
  clearTimeout(fallback);
  root().setAttribute("data-intro-reveal", "");
  root().setAttribute("data-intro-done", "");
}

/** Starts (or acknowledges) the preloader; safe to call more than once. */
export function startIntro() {
  root().setAttribute("data-intro-play", "");
  // The animationend events normally finish it; this only covers a hidden tab
  // or a browser that skipped them.
  clearTimeout(fallback);
  fallback = setTimeout(finishIntro, 5500);
}
