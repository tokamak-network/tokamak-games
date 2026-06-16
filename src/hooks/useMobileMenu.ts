import { useEffect } from "react";

/**
 * Mobile menu controller — ported verbatim from the original main.js so the
 * open/close transition, body scroll-lock, background `inert`, focus trap and
 * Escape handling all behave identically. Operates imperatively on the rendered
 * DOM (by id / class) and wires every listener with a matching teardown.
 */
export function useMobileMenu() {
  useEffect(() => {
    const nav = document.getElementById("nav");
    const navToggle = document.getElementById("navToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const main = document.getElementById("top");
    const footer = document.querySelector(".footer");
    if (!nav || !navToggle || !mobileMenu) return;

    function setBackgroundInert(on: boolean) {
      [main, footer].forEach((el) => {
        if (!el) return;
        if (on) {
          el.setAttribute("inert", "");
          el.setAttribute("aria-hidden", "true");
        } else {
          el.removeAttribute("inert");
          el.removeAttribute("aria-hidden");
        }
      });
    }
    function menuFocusables(): HTMLElement[] {
      return mobileMenu
        ? (Array.prototype.slice.call(
            mobileMenu.querySelectorAll("a[href], button")
          ) as HTMLElement[])
        : [];
    }
    function openMenu() {
      if (!mobileMenu || !nav || !navToggle) return;
      mobileMenu.hidden = false;
      void mobileMenu.offsetWidth; // reflow so the transition runs
      nav.classList.add("is-open");
      mobileMenu.classList.add("is-visible");
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Close menu");
      document.body.style.overflow = "hidden";
      setBackgroundInert(true);
      const f = menuFocusables();
      if (f.length) f[0].focus();
    }
    function closeMenu() {
      if (!mobileMenu || !nav || !navToggle) return;
      nav.classList.remove("is-open");
      mobileMenu.classList.remove("is-visible");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
      document.body.style.overflow = "";
      setBackgroundInert(false);
      navToggle.focus();
      window.setTimeout(() => {
        if (!nav.classList.contains("is-open")) mobileMenu.hidden = true;
      }, 300);
    }

    function onToggleClick() {
      if (nav!.classList.contains("is-open")) closeMenu();
      else openMenu();
    }
    function onMenuClick(e: MouseEvent) {
      if ((e.target as HTMLElement).closest("a")) closeMenu();
    }
    function onMenuKeydown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const f = menuFocusables();
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    function onDocKeydown(e: KeyboardEvent) {
      if (e.key === "Escape" && nav!.classList.contains("is-open")) closeMenu();
    }

    navToggle.addEventListener("click", onToggleClick);
    mobileMenu.addEventListener("click", onMenuClick as EventListener);
    mobileMenu.addEventListener("keydown", onMenuKeydown as EventListener);
    document.addEventListener("keydown", onDocKeydown);

    return () => {
      navToggle.removeEventListener("click", onToggleClick);
      mobileMenu.removeEventListener("click", onMenuClick as EventListener);
      mobileMenu.removeEventListener("keydown", onMenuKeydown as EventListener);
      document.removeEventListener("keydown", onDocKeydown);
      document.body.style.overflow = "";
      setBackgroundInert(false);
    };
  }, []);
}
