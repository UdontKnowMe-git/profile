// src/components/EasterEggButton.jsx
import { useEffect, useState } from "react";

export default function EasterEggButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onSecret = () => setShow(true);
    window.addEventListener("trigger-easter-egg", onSecret);
    return () => window.removeEventListener("trigger-easter-egg", onSecret);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        className="bg-violet-600 hover:bg-fuchsia-600 text-white px-6 py-3 rounded-full shadow-xl"
        onClick={() => setShow((s) => !s)}
        title="Easter Egg"
      >
        🕹️
      </button>
      {show && (
        <div className="mt-4 bg-neutral-900/90 rounded-lg p-4 shadow-2xl text-cyan-200 border border-white/10">
          <p>Retro Mode Unlocked! Type theme again to toggle visuals.</p>
        </div>
      )}
    </div>
  );
}
