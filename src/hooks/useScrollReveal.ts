import { useEffect } from "react";

const REVEAL_TARGETS = [
  ".games__head",
  ".audit__statement",
  ".audit__lede",
  ".arow",
  ".game",
  ".games__foot",
  ".receipt",
  ".cta__inner",
];

/**
 * Adds `data-reveal` to the configured targets and reveals them with
 * `.is-in` as they scroll into view. Skips entirely when the user prefers
 * reduced motion or IntersectionObserver is unavailable.
 */
export function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!("IntersectionObserver" in window) || prefersReduced) return;

    const revealEls: Element[] = [];
    REVEAL_TARGETS.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => revealEls.push(el));
    });

    revealEls.forEach((el) => el.setAttribute("data-reveal", ""));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);
}
