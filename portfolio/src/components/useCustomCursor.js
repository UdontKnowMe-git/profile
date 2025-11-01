// src/components/useCustomCursor.js
import { useEffect } from "react";

export default function useCustomCursor() {
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y; // ring lags behind dot
    const lag = 0.1;

    const move = (e) => {
      x = e.clientX; y = e.clientY;
      dot.style.left = x + "px";
      dot.style.top = y + "px";
    };

    const raf = () => {
      rx += (x - rx) * lag;
      ry += (y - ry) * lag;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const hoverables = "a, button, [role='button'], input, textarea, .cursorable";
    const onOver = () => document.documentElement.classList.add("cursor-hover");
    const onOut = () => document.documentElement.classList.remove("cursor-hover");

    document.addEventListener("mousemove", move);
    document.querySelectorAll(hoverables).forEach((el) => {
      el.addEventListener("mouseenter", onOver);
      el.addEventListener("mouseleave", onOut);
    });

    // Respect reduced motion users
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) ring.style.transition = "none";

    return () => {
      document.removeEventListener("mousemove", move);
      document.querySelectorAll(hoverables).forEach((el) => {
        el.removeEventListener("mouseenter", onOver);
        el.removeEventListener("mouseleave", onOut);
      });
    };
  }, []);
}
