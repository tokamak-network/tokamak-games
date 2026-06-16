export default function Nav() {
  return (
    <header className="nav" id="nav" data-theme="light">
      <div className="nav__inner">
        <a className="brand" href="#top" aria-label="Tokamak Games home">
          <img
            className="brand__mark"
            src="/assets/img/tokamak-eyes-trim.png"
            alt=""
            aria-hidden="true"
            width="300"
            height="112"
            decoding="async"
          />
          <span className="brand__word">
            <span className="brand__name">Tokamak Games</span>
            <span className="brand__sub">Play&nbsp;for&nbsp;Glory</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          <a href="#thesis">Thesis</a>
          <a href="#core-games">Games</a>
        </nav>

        <div className="nav__cta">
          <a
            className="btn btn--solid btn--sm"
            href="https://rivai-launcher.pages.dev/"
            target="_blank"
            rel="noopener"
          >
            Play RIVAI <span className="btn__arrow" aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          className="nav__toggle"
          id="navToggle"
          aria-label="Open menu"
          aria-expanded="false"
          aria-controls="mobileMenu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
