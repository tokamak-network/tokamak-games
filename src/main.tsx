import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// NOTE: rendered without <StrictMode> on purpose. The hero conveyor / spine
// effects do heavy imperative DOM work (timers, IntersectionObservers, custom
// events); StrictMode's double-invoke in dev would briefly run them twice.
// Each effect cleans up after itself, so production (single mount) is unaffected.
createRoot(document.getElementById("root")!).render(<App />);
