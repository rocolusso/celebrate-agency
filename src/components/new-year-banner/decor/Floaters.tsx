import type { ThemeName } from "../engine";
import styles from "./decor.module.css";

function Star({ fill, edge }: { fill: string; edge: string }) {
  const d = "M50 6 L62 38 L96 40 L69 61 L79 94 L50 75 L21 94 L31 61 L4 40 L38 38 Z";
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <path d={d} fill={edge} transform="translate(4 5)" />
      <path
        d={d}
        fill={fill}
        stroke="#fff"
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M50 14 L58 38 L50 42 L42 38 Z" fill="#fff" opacity="0.45" />
    </svg>
  );
}

function Flake() {
  const arm =
    "M50 8 L50 92 M50 22 L40 12 M50 22 L60 12 M50 40 L38 30 M50 40 L62 30 M50 78 L40 88 M50 78 L60 88 M50 60 L38 70 M50 60 L62 70";
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <g stroke="#e9f6ff" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d={arm} />
        <path d={arm} transform="rotate(60 50 50)" />
        <path d={arm} transform="rotate(120 50 50)" />
      </g>
      <circle cx="50" cy="50" r="6" fill="#fff" />
    </svg>
  );
}

const STARS: [string, string][] = [
  ["#ffd93f", "#b86a00"],
  ["#ff6fb5", "#a3135f"],
  ["#5be4ff", "#0b78a8"],
  ["#ffd93f", "#b86a00"],
  ["#9dff6a", "#2f8f1b"],
];

/** Парящие объёмные звёзды (brand) или ледяные снежинки (winter). */
export default function Floaters({ theme }: { theme: ThemeName }) {
  return (
    <div className={styles.floaters} aria-hidden="true">
      {STARS.map(([fill, edge], i) => (
        <span key={i} className={`${styles.floater} ${styles[`fl${i}`]}`}>
          {theme === "brand" ? <Star fill={fill} edge={edge} /> : <Flake />}
        </span>
      ))}
    </div>
  );
}
