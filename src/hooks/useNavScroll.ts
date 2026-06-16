import { useEffect } from "react";

/**
 * Coalesced, rAF-throttled scroll work:
 *  - toggles `.is-stuck` on the nav once the page scrolls past the top
 *  - swaps the nav `data-theme` to match the section currently under it
 */
export function useNavScroll() {
  useEffect(() => {
    const nav = document.getElementById("nav");
    if (!nav) return;

    const themedSections = Array.prototype.slice.call(
      document.querySelectorAll("[data-section-theme]")
    ) as HTMLElement[];

    let navProbe = nav.offsetHeight / 2 + 4;

    function updateNavTheme() {
      if (!nav) return;
      let current = "dark";
      for (let i = 0; i < themedSections.length; i++) {
        const r = themedSections[i].getBoundingClientRect();
        if (r.top <= navProbe && r.bottom > navProbe) {
          current = themedSections[i].getAttribute("data-section-theme") || "dark";
          break;
        }
      }
      nav.setAttribute("data-theme", current);
    }

    let ticking = false;
    function onScrollFrame() {
      if (nav) nav.classList.toggle("is-stuck", window.scrollY > 24);
      updateNavTheme();
      ticking = false;
    }
    function requestScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScrollFrame);
      }
    }
    function onResize() {
      navProbe = nav ? nav.offsetHeight / 2 + 4 : 36;
      requestScroll();
    }

    window.addEventListener("scroll", requestScroll, { passive: true });
    window.addEventListener("resize", onResize);
    requestScroll(); // set initial stuck/theme state

    return () => {
      window.removeEventListener("scroll", requestScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}
