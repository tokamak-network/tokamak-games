/**
 * Mobile menu markup. Visibility, focus trap, inert background and Escape
 * handling are driven imperatively by the useMobileMenu hook (by id), so this
 * component only renders the static structure and starts `hidden`.
 */
export default function MobileMenu() {
  return (
    <div
      className="mobile-menu"
      id="mobileMenu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      hidden
    >
      <nav className="mobile-menu__links" aria-label="Mobile">
        <a href="#thesis">
          <span className="idx">01</span> Thesis
        </a>
        <a href="#core-games">
          <span className="idx">02</span> Games
        </a>
      </nav>
      <div className="mobile-menu__cta">
        <a
          className="btn btn--solid btn--block"
          href="https://rivai-launcher.pages.dev/"
          target="_blank"
          rel="noopener"
        >
          Play RIVAI <span className="btn__arrow" aria-hidden="true">↗</span>
        </a>
        <a
          className="btn btn--ghost btn--block"
          href="https://blockball.fly.dev/"
          target="_blank"
          rel="noopener"
        >
          Play blockball ↗
        </a>
      </div>
    </div>
  );
}
