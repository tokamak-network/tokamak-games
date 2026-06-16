import { useEffect } from "react";

/**
 * Video playback gating:
 *  - honors prefers-reduced-motion (WCAG 2.2.2): no autoplay, show poster
 *  - pauses each game video while offscreen, resumes on re-entry
 */
export function useVideoPlayback() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const allVideos = Array.prototype.slice.call(
      document.querySelectorAll("video")
    ) as HTMLVideoElement[];

    function safePlay(v: HTMLVideoElement) {
      if (prefersReduced) return;
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    }

    if (prefersReduced) {
      allVideos.forEach((v) => {
        v.removeAttribute("autoplay");
        try {
          v.pause();
          v.currentTime = 0;
        } catch {
          /* noop */
        }
      });
    }

    let vio: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      vio = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const v = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) {
              safePlay(v);
            } else {
              try {
                v.pause();
              } catch {
                /* noop */
              }
            }
          });
        },
        { threshold: 0.05 }
      );
      allVideos.forEach((v) => vio!.observe(v));
    }

    return () => {
      if (vio) vio.disconnect();
    };
  }, []);
}
