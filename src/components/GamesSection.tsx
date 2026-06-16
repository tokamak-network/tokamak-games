const GAMES = [
  {
    name: "blockball",
    logo: "/assets/img/blockball-mark.png",
    status: "Live · Browser",
    description:
      "Top-down puck soccer with short rooms, server physics, and clean result receipts.",
    tags: ["2D sport", "Server physics", "Result ledger"],
    href: "https://blockball.fly.dev/",
    cta: "Play blockball",
    featured: false,
    downloads: undefined,
  },
  {
    name: "RIVAI",
    logo: "/assets/img/rivai-r-logo.svg",
    status: "Live · Browser",
    description:
      "A fast arena duel where movement, aim, and match results become permanent records.",
    tags: ["Arena duel", "Match record", "On-chain ready"],
    href: "https://rivai-launcher.pages.dev/",
    cta: "Play RIVAI",
    featured: true,
  },
];

export default function GamesSection() {
  return (
    <section className="games section" id="core-games" data-section-theme="light">
      <div className="container">
        <header className="games__head games__head--simple">
          <div>
            <p className="kicker kicker--accent">
              <span className="kicker__no">02</span> Live games
            </p>
            <h2 className="section__title">
              Two games.
              <br />
              One record layer.
            </h2>
          </div>
          <p className="games__summary">
            Simple browser games where every match can become a durable record.
          </p>
        </header>

        <div className="games-simple">
          {GAMES.map((game) => (
            <article
              className={`game-card${game.featured ? " game-card--featured" : ""}`}
              key={game.name}
            >
              <div className="game-card__logo-wrap">
                <img
                  className="game-card__logo"
                  src={game.logo}
                  alt={`${game.name} logo`}
                  width="160"
                  height="160"
                />
              </div>

              <div className="game-card__body">
                <div className="game-card__meta">
                  <span className="badge badge--live">{game.status}</span>
                  <span className="game-card__record">Record-ready</span>
                </div>

                <h3 className="game-card__name">{game.name}</h3>
                <p className="game-card__desc">{game.description}</p>

                <ul className="game-card__tags">
                  {game.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>

                <a
                  className={`btn btn--block ${
                    game.featured ? "btn--solid" : "btn--ghost-ink"
                  }`}
                  href={game.href}
                  target="_blank"
                  rel="noopener"
                >
                  {game.cta}{" "}
                  <span className="btn__arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
