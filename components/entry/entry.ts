// The entry experience — the 18+ gate, then the qvevri preloader — is driven
// by attributes on <html>, so the right screen is already in place on the very
// first paint, before React hydrates:
//
//   data-age-ok       age confirmed (localStorage, persists)  → gate hidden
//   data-intro-play   preloader running                        → CSS animations start
//   data-intro-reveal preloader fading out                     → page scroll unlocked
//   data-intro-done   preloader finished, or already seen      → preloader hidden
//   data-entry-lang   language for the gate's copy before hydration
//
// The preloader plays once per browser session (a session cookie, shared by
// tabs), so internal navigation, language changes and reloads never repeat it.

export const AGE_STORAGE_KEY = "age-verified";
export const INTRO_COOKIE = "okami-intro";

// Runs inline at the top of <body>. Mirrors LanguageProvider's language choice.
export const entryScript = `try{var d=document.documentElement,ok=localStorage.getItem("${AGE_STORAGE_KEY}")==="1",seen=document.cookie.indexOf("${INTRO_COOKIE}=1")>-1;if(ok){d.setAttribute("data-age-ok","");d.setAttribute(seen?"data-intro-done":"data-intro-play","")}var l=localStorage.getItem("language");if(l!=="ka"&&l!=="en"&&l!=="ru"){var n=(navigator.language||"").toLowerCase();l=n.indexOf("ka")===0?"ka":n.indexOf("ru")===0?"ru":"en"}d.setAttribute("data-entry-lang",l)}catch(e){}`;

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
  document.cookie = `${INTRO_COOKIE}=1; path=/; SameSite=Lax`;
  root().setAttribute("data-intro-play", "");
  // The animationend events normally finish it; this only covers a hidden tab
  // or a browser that skipped them.
  clearTimeout(fallback);
  fallback = setTimeout(finishIntro, 4800);
}
