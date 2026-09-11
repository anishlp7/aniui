/**
 * Blocking theme-init script, injected as an inline <script> in <head> before
 * the page paints. Without this, the page always paints light first (the SSR
 * default) and only flips to dark after ThemeProvider's mount effect runs —
 * a visible flash for anyone whose system is set to dark. Running this
 * synchronously ahead of paint means the very first frame already matches
 * the visitor's stored choice, or their OS preference if they haven't picked
 * one yet.
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("aniui-theme");var t=s==="light"||s==="dark"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");if(t==="dark")document.documentElement.classList.add("dark");}catch(e){}})();`;
