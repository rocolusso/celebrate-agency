import styles from "./decor.module.css";

/** Огранённый золотой кристалл. В зимней теме перекрашивается в ледяной через CSS. */
export default function Gem({ className }: { className?: string }) {
  return (
    <svg className={`${styles.gem} ${className ?? ""}`} viewBox="0 0 120 100" aria-hidden="true">
      <polygon points="30,8 90,8 116,38 60,94 4,38" fill="#b86a00" />
      <polygon points="30,8 60,38 4,38" fill="#ffe27a" />
      <polygon points="30,8 90,8 60,38" fill="#fff6c2" />
      <polygon points="90,8 116,38 60,38" fill="#ffc61f" />
      <polygon points="4,38 60,38 60,94" fill="#f09a00" />
      <polygon points="60,38 116,38 60,94" fill="#c97800" />
      <polygon
        points="30,8 90,8 116,38 60,94 4,38"
        fill="none"
        stroke="#fff6c2"
        strokeOpacity="0.8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <g className={styles.gemGlint}>
        <path d="M34 20 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" fill="#fff" />
      </g>
    </svg>
  );
}
