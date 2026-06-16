/** Explorer strip shown at the end of the hero. */
export default function Seal() {
  return (
    <div className="seal" aria-hidden="true">
      <div className="container seal__inner">
        <span className="seal__dot" />
        <span className="seal__text">
          Tokamak Explorer · #1,283 → #1,287 · live
        </span>
        <span className="seal__scan" />
      </div>
    </div>
  );
}
