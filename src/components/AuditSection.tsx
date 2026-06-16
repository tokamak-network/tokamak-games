type Row = {
  txMeta: string;
  no: string;
  problemTitle: string;
  problemBody: string;
  blockMeta: string;
  solutionTitle: React.ReactNode;
  solutionBody: string;
  key?: boolean;
};

const ROWS: Row[] = [
  {
    txMeta: "TX 0x4a…1c · reverted",
    no: "01",
    problemTitle: "Pay-to-win",
    problemBody: "Whoever spends the most wins. Skill stops mattering.",
    blockMeta: "Block #1,280 · final",
    solutionTitle: (
      <>
        Skill is the only <span className="swipe">currency</span>
      </>
    ),
    solutionBody:
      "Matches settle on authoritative servers. Money buys cosmetics — never power.",
  },
  {
    txMeta: "TX 0x7b…e9 · reverted",
    no: "02",
    problemTitle: "Extractive “play-to-earn”",
    problemBody:
      "Economies built to extract. When the token dumps, the game dies with it.",
    blockMeta: "Block #1,281 · final",
    solutionTitle: (
      <>
        Value stays in the <span className="swipe">circle</span>
      </>
    ),
    solutionBody:
      "Players chase glory and reputation — meaning that compounds, not yield that drains.",
  },
  {
    txMeta: "TX 0x2f…a0 · reverted",
    no: "03",
    problemTitle: "Nothing is at stake",
    problemBody:
      "Cash out anything and defeat costs nothing. Victory loses its meaning.",
    blockMeta: "Block #1,282 · final",
    solutionTitle: (
      <>
        Risk, <span className="swipe">reinstated</span>
      </>
    ),
    solutionBody:
      "Real consequence returns inside the Magic Circle — without ever breaking play.",
  },
  {
    txMeta: "TX 0x9c…d4 · reverted",
    no: "04",
    problemTitle: "Results vanish",
    problemBody:
      "Matches live on a private server — wiped, forgotten, impossible to prove.",
    blockMeta: "Block #1,283 · final",
    solutionTitle: (
      <>
        A permanent <span className="swipe">record</span>
      </>
    ),
    solutionBody:
      "Every result is immutable on-chain, traceable to its origin block forever.",
    key: true,
  },
];

export default function AuditSection() {
  return (
    <section className="audit section" id="thesis" data-section-theme="light">
      <div className="container">
        <header className="audit__head">
          <p className="kicker kicker--ink">
            <span className="kicker__no kicker__no--ink">01</span> Problem →
            Solution
          </p>
          <span className="recstub">Audit log · #1,280–#1,283 · 04 entries</span>
        </header>

        <h2 className="audit__statement">
          Most blockchain games{" "}
          <span className="strike strike--ink">chase&nbsp;money</span>.<br />
          <span className="audit__hi">We chase meaning.</span>
        </h2>
        <p className="audit__lede">
          Web3 bolted money onto games and broke them — pay-to-win, extraction,
          stakes that stop mattering. Play to Glory removes the failure modes,
          not the fun.
        </p>

        <div className="audit__rows">
          {ROWS.map((row) => (
            <article
              className={"arow" + (row.key ? " arow--key" : "")}
              key={row.no}
            >
              <div className="arow__p">
                <span className="arow__meta">{row.txMeta}</span>
                <h4 className="arow__title">
                  <span className="arow__no">{row.no}</span> {row.problemTitle}
                </h4>
                <p>{row.problemBody}</p>
              </div>
              <div className="arow__link" aria-hidden="true">
                <svg viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path className="aflow" d="M0 6 H100" />
                </svg>
                <span
                  className={"arow__dot" + (row.key ? " arow__dot--key" : "")}
                />
              </div>
              <div className="arow__s">
                <span className="arow__meta">{row.blockMeta}</span>
                <h4 className="arow__title">{row.solutionTitle}</h4>
                <p>{row.solutionBody}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
