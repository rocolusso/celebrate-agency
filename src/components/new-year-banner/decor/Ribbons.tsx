import styles from "./decor.module.css";

const PATH = "M30 0 C 54 34, 6 64, 30 98 S 54 160, 30 194 S 8 238, 30 262";

function Ribbon({
  className,
  id,
  stops,
}: {
  className: string;
  id: string;
  stops: [string, string, string];
}) {
  return (
    <svg className={`${styles.ribbon} ${className}`} viewBox="0 0 60 264" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={stops[0]} />
          <stop offset="0.5" stopColor={stops[1]} />
          <stop offset="1" stopColor={stops[2]} />
        </linearGradient>
      </defs>
      <path
        d={PATH}
        fill="none"
        stroke="rgba(0,0,0,.22)"
        strokeWidth="15"
        strokeLinecap="round"
        transform="translate(2.5 2.5)"
      />
      <path d={PATH} fill="none" stroke={`url(#${id})`} strokeWidth="13" strokeLinecap="round" />
      <path
        d={PATH}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.55"
        strokeWidth="2.6"
        strokeLinecap="round"
        transform="translate(-2 0)"
      />
    </svg>
  );
}

/** Три серпантина, свисающих сверху сцены. */
export default function Ribbons() {
  return (
    <div className={styles.ribbons} aria-hidden="true">
      <Ribbon className={styles.ribbonA} id="rb-gold-a" stops={["#fff1a8", "#ffc61f", "#c97800"]} />
      <Ribbon className={styles.ribbonB} id="rb-gold-b" stops={["#fff1a8", "#ffc61f", "#c97800"]} />
      <Ribbon className={styles.ribbonC} id="rb-accent" stops={["#ffd0ea", "#ff4fa3", "#b3126b"]} />
    </div>
  );
}
