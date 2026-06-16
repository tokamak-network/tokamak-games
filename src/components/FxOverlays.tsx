/** Fixed grain + scanline texture overlays that sit above everything. */
export default function FxOverlays() {
  return (
    <>
      <div className="fx-grain" aria-hidden="true" />
      <div className="fx-scanlines" aria-hidden="true" />
    </>
  );
}
