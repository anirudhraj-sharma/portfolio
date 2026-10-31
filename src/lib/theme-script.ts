/** Page background per theme, also used for the browser bar (theme-color). */
export const themeColors = { light: "#f7f8f2", dark: "#101310" } as const;

/**
 * Runs in <head> before first paint so a saved theme choice is applied without
 * a flash. With no saved choice, the page follows the system setting in CSS.
 * A saved choice also sets the browser bar color to match.
 *
 * It also starts a 3 s fallback timer: if the page has not hydrated by then
 * (a script failed to load, or the network is very slow), it sets
 * data-motion="off" and CSS shows every scroll-reveal block without animation.
 * MotionReady sets data-motion="on" after hydration, which cancels the fallback.
 *
 * The text is fixed at build time. The build step hashes it into the Content
 * Security Policy, so it must stay free of anything computed at runtime.
 */
export const themeInitScript = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){d.setAttribute("data-theme",t);var c=t==="dark"?"${themeColors.dark}":"${themeColors.light}";document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.setAttribute("content",c)})}}catch(e){}setTimeout(function(){if(!d.hasAttribute("data-motion"))d.setAttribute("data-motion","off")},3000)})()`;
