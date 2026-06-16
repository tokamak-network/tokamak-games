const THESIS_URL =
  "https://shingonu.notion.site/Play-to-Glory-e574e8afde054c32be807b3d714e11a1";

export default function CtaSection() {
  return (
    <section
      className="cta cta--stamp"
      data-section-theme="light"
      aria-label="Get started"
    >
      <div className="container cta__inner">
        <span className="cta__arrival" aria-hidden="true" />
        <img
          className="cta__eyes"
          src="/assets/img/tokamak-eyes-trim.png"
          alt=""
          aria-hidden="true"
          width="300"
          height="112"
          decoding="async"
        />
        <h2 className="cta__title">
          Glory is permanent.
          <br />
          Start writing <span className="cta__hi">yours</span>.
        </h2>

        <div className="cta__slot" aria-hidden="true">
          <span className="cta__slot-id">#1,288</span>
          <span className="cta__slot-text">
            unwritten · awaiting your first match
          </span>
        </div>

        <div className="cta__actions">
          <div className="download-choice download-choice--cta" aria-label="Download RIVAI">
            <span>RIVAI</span>
            <a href="/downloads/rivai-launcher-mac.dmg" download>
              Mac
            </a>
            <a href="/downloads/rivai-launcher-windows.zip" download>
              Windows
            </a>
          </div>
          <a
            className="btn btn--ghost-ink btn--lg"
            href="https://blockball.fly.dev/"
            target="_blank"
            rel="noopener"
          >
            Play blockball ↗
          </a>
        </div>
        <a className="cta__thesis" href={THESIS_URL} target="_blank" rel="noopener">
          Read the Thesis ↗
        </a>
      </div>
    </section>
  );
}
