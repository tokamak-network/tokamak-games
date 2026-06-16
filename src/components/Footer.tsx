const THESIS_URL =
  "https://shingonu.notion.site/Play-to-Glory-e574e8afde054c32be807b3d714e11a1";

export default function Footer() {
  return (
    <footer className="footer footer--slim" data-section-theme="dark">
      <div className="container footer__bar">
        <a className="brand" href="#top" aria-label="Tokamak Games home">
          <img
            className="brand__mark"
            src="/assets/img/tokamak-eyes-light-trim.png"
            alt=""
            aria-hidden="true"
            width="520"
            height="194"
            decoding="async"
          />
          <span className="brand__word">
            <span className="brand__name">Tokamak Games</span>
            <span className="brand__sub">Play for Glory</span>
          </span>
        </a>
        <nav className="footer__links" aria-label="Footer">
          <a href="/downloads/rivai-launcher-mac.dmg" download>
            RIVAI Mac
          </a>
          <a href="/downloads/rivai-launcher-windows.zip" download>
            RIVAI Windows
          </a>
          <a href="https://blockball.fly.dev/" target="_blank" rel="noopener">
            blockball ↗
          </a>
          <a href={THESIS_URL} target="_blank" rel="noopener">
            Thesis ↗
          </a>
        </nav>
      </div>
      <div className="container footer__copy">
        © 2026 Tokamak Games · Built on Tokamak Network
      </div>
    </footer>
  );
}
