import styles from "../NewYearBanner.module.css";

const BALLOONS = [
  { x: 3, size: 62, color: "#ff4fa3", dur: 17, delay: -4 },
  { x: 12, size: 84, color: "#ffc93c", dur: 21, delay: -13 },
  { x: 24, size: 58, color: "#35d0ff", dur: 15, delay: -9 },
  { x: 36, size: 92, color: "#9a5bff", dur: 23, delay: -18 },
  { x: 48, size: 66, color: "#ff5468", dur: 18, delay: -2 },
  { x: 58, size: 78, color: "#36d27a", dur: 20, delay: -15 },
  { x: 68, size: 60, color: "#ffc93c", dur: 16, delay: -7 },
  { x: 78, size: 72, color: "#ff4fa3", dur: 22, delay: -20 },
  { x: 88, size: 88, color: "#35d0ff", dur: 19, delay: -11 },
  { x: 95, size: 60, color: "#9a5bff", dur: 14, delay: -1 },
] as const;

function Balloon({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size * 1.55} viewBox="0 0 60 93" aria-hidden="true">
      <path
        d="M30 78 C30 84 26 86 28 91 C30 88 32 88 30 78"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1.2"
        fill="none"
      />
      <ellipse cx="30" cy="31" rx="26" ry="30" fill={color} />
      <path d="M26 59 L30 66 L34 59 Z" fill={color} />
      <ellipse cx="30" cy="31" rx="26" ry="30" fill="url(#bal-shade)" />
      <ellipse
        cx="20"
        cy="18"
        rx="6"
        ry="10"
        fill="#fff"
        opacity="0.5"
        transform="rotate(24 20 18)"
      />
    </svg>
  );
}

const DOTS = Array.from({ length: 5 }, (_, r) =>
  Array.from({ length: 8 }, (_, c) => ({ r, c })).flat(),
).flat();

export default function BrandScene() {
  return (
    <>
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="bal-shade" cx="0.35" cy="0.3" r="0.9">
            <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
            <stop offset="0.55" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.28" />
          </radialGradient>
        </defs>
      </svg>

      <div className={styles.brandBg} aria-hidden="true">
        <span className={`${styles.blob} ${styles.blobA}`} />
        <span className={`${styles.blob} ${styles.blobB}`} />
        <span className={`${styles.blob} ${styles.blobC}`} />
        <svg className={styles.dotsA} viewBox="0 0 160 100" aria-hidden="true">
          {DOTS.map(({ r, c }) => (
            <circle
              key={`${r}-${c}`}
              cx={10 + c * 20}
              cy={10 + r * 20}
              r="2.2"
              fill="#fff"
              opacity="0.35"
            />
          ))}
        </svg>
      </div>

      <div className={styles.balloons} aria-hidden="true">
        {BALLOONS.map((b, i) => (
          <span
            key={i}
            className={styles.balloon}
            style={{
              left: `${b.x}%`,
              animationDuration: `${b.dur}s`,
              animationDelay: `${b.delay}s`,
            }}
          >
            <span className={styles.balloonSway} style={{ animationDelay: `${i * -0.7}s` }}>
              <Balloon color={b.color} size={b.size} />
            </span>
          </span>
        ))}
      </div>
    </>
  );
}
