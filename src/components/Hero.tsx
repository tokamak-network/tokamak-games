import type { CSSProperties } from "react";
import Seal from "./Seal";

const THESIS_NOTION_URL =
  "https://shingonu.notion.site/Play-to-Glory-e574e8afde054c32be807b3d714e11a1";

export default function Hero() {
  return (
    <section
      className="hero"
      id="hero"
      data-section-theme="light"
      aria-label="Tokamak Games — Play for Glory"
    >
      <div className="hero__content container">
        <div className="hero__text">
          <h1 className="hero__title">
            <span className="hero__line">Play</span>
            <span className="hero__line hero__line--nowrap">
              For&nbsp;<span className="hero__glory">Glory</span>
            </span>
          </h1>

          <p className="hero__lede">
            A Layer&nbsp;2 for blockchain games where <strong>victory</strong>,{" "}
            <strong>defeat</strong>, and <strong>contribution</strong> are made{" "}
            <em>permanent</em>.
          </p>

          <div className="hero__actions">
            <a className="btn btn--solid btn--lg" href="#core-games">
              Enter the Arena{" "}
              <span className="btn__arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a
              className="btn btn--ghost-ink btn--lg"
              href={THESIS_NOTION_URL}
              target="_blank"
              rel="noopener"
            >
              Read the Thesis{" "}
              <span className="btn__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>

        <aside
          className="arch arch--map"
          aria-label="One on-chain record at the center of an ecosystem: ladder rankings, odds markets, fan tokens, a lore archive, replay theater, guild scores and tournaments — every meta game is built on the same match record."
        >
          <svg
            className="arch__links"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="lk lk--ladder" d="M50 50 C43 39 58 27 50 13" />
            <path className="lk lk--odds" d="M50 50 C37 49 34 31 18 25" />
            <path className="lk lk--fan" d="M50 50 C64 36 70 33 82 21" />
            <path className="lk lk--lore" d="M50 50 C66 42 74 55 88 47" />
            <path className="lk lk--replay" d="M50 50 C61 66 70 64 82 76" />
            <path className="lk lk--guild" d="M50 50 C42 66 59 77 50 89" />
            <path
              className="lk lk--tournament"
              d="M50 50 C34 58 34 77 19 80"
            />
            <path
              className="lk lk--community"
              d="M50 50 C36 45 24 61 11 55"
            />
          </svg>

          <span className="node node--rec" style={{ left: "50%", top: "50%" }}>
            <em>Record</em>
            <b>#1,287</b>
          </span>

          <span
            className="node"
            style={{ left: "50%", top: "10%", "--c": "#16b8c9" } as CSSProperties}
          >
            <b>Ladder</b>
            <small>ranks computed from records</small>
          </span>
          <span
            className="node"
            style={{ left: "17%", top: "23%", "--c": "#f0851f" } as CSSProperties}
          >
            <b>Odds Market</b>
            <small>predictions priced on records</small>
          </span>
          <span
            className="node"
            style={{ left: "83%", top: "19%", "--c": "#ec5a8c" } as CSSProperties}
          >
            <b>Fan Tokens</b>
            <small>holders earn on player wins</small>
          </span>
          <span
            className="node"
            style={{ left: "90%", top: "47%", "--c": "#9b6cf0" } as CSSProperties}
          >
            <b>Lore Archive</b>
            <small>legendary matches, minted</small>
          </span>
          <span
            className="node"
            style={{ left: "82%", top: "77%", "--c": "#13b07a" } as CSSProperties}
          >
            <b>Replay Theater</b>
            <small>every record, replayable</small>
          </span>
          <span
            className="node"
            style={{ left: "50%", top: "91%", "--c": "#e0a020" } as CSSProperties}
          >
            <b>Guild Score</b>
            <small>team's aggregate record</small>
          </span>
          <span
            className="node"
            style={{ left: "18%", top: "80%", "--c": "#46b84a" } as CSSProperties}
          >
            <b>Tournament</b>
            <small>brackets seeded by records</small>
          </span>
          <span
            className="node node--community"
            style={{ left: "9%", top: "55%", "--c": "#8a8a86" } as CSSProperties}
          >
            <b>+</b>
            <small>community-built</small>
          </span>
        </aside>
      </div>
      <Seal />
    </section>
  );
}
