import { useEffect } from "react";

const CURSOR_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M4 2 L4 18 L8 14 L11.5 21 L13.5 20 L10 13 L15 13 Z' fill='%23a855f7' stroke='%234c1d95' stroke-width='1' stroke-linejoin='round'/></svg>`;

export function NeuralCursor() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `html, html * { cursor: url("data:image/svg+xml,${CURSOR_SVG}") 4 2, auto !important; }`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return null;
}
