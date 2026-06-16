import FxOverlays from "./components/FxOverlays";
import Nav from "./components/Nav";
import MobileMenu from "./components/MobileMenu";
import Hero from "./components/Hero";
import GamesSection from "./components/GamesSection";
import Footer from "./components/Footer";

import { useNavScroll } from "./hooks/useNavScroll";
import { useMobileMenu } from "./hooks/useMobileMenu";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { useVideoPlayback } from "./hooks/useVideoPlayback";

export default function App() {
  // All interactions ported from the original main.js, each as a self-cleaning hook.
  useNavScroll();
  useMobileMenu();
  useScrollReveal();
  useVideoPlayback();

  return (
    <>
      <FxOverlays />

      <a className="skip-link" href="#top">
        Skip to content
      </a>

      <Nav />
      <MobileMenu />

      <main id="top" tabIndex={-1}>
        <Hero />
        <GamesSection />
      </main>

      <Footer />
    </>
  );
}
