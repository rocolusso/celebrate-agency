import styles from "../NewYearBanner.module.css";

// Детерминированная раскладка звёзд: одинаково на сервере и клиенте.
function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}
const rand = lcg(2027);
const STARS = Array.from({ length: 70 }, () => ({
  x: rand() * 100,
  y: rand() * 68,
  r: 0.6 + rand() * 1.7,
  d: rand() * 4,
  t: 2 + rand() * 3,
}));

const LIGHTS = ["#ffd86b", "#ff6fae", "#7fe3ff", "#ffffff", "#9dff8a"];

function Fir({ className }: { className: string }) {
  const lights = [
    [60, 70],
    [44, 92],
    [78, 98],
    [34, 128],
    [62, 124],
    [90, 132],
    [24, 164],
    [52, 160],
    [80, 166],
    [104, 168],
  ];
  return (
    <svg className={className} viewBox="0 0 128 220" aria-hidden="true">
      <rect x="57" y="184" width="14" height="30" rx="3" fill="#4b2f2a" />
      <path d="M64 6 L100 78 H28 Z" fill="#0f6b5a" />
      <path d="M64 44 L110 126 H18 Z" fill="#12806a" />
      <path d="M64 86 L120 184 H8 Z" fill="#169478" />
      <path d="M64 6 L78 34 C70 30 58 30 50 34 Z" fill="#fff" opacity="0.92" />
      <path
        d="M28 78 C44 70 54 82 64 76 C76 82 88 70 100 78 L100 78 H28 Z"
        fill="#fff"
        opacity="0.85"
      />
      <path
        d="M18 126 C40 116 52 130 64 122 C78 130 92 116 110 126 H18 Z"
        fill="#fff"
        opacity="0.85"
      />
      <path
        d="M8 184 C34 172 50 188 64 178 C80 188 96 172 120 184 H8 Z"
        fill="#fff"
        opacity="0.85"
      />
      {lights.map(([x, y], i) => (
        <circle
          key={i}
          className={styles.bulb}
          cx={x}
          cy={y}
          r="3.6"
          fill={LIGHTS[i % LIGHTS.length]}
          style={{ animationDelay: `${(i * 0.37) % 2}s` }}
        />
      ))}
    </svg>
  );
}

export default function WinterScene() {
  return (
    <>
      <div className={styles.winterBg} aria-hidden="true">
        <span className={`${styles.aurora} ${styles.auroraA}`} />
        <span className={`${styles.aurora} ${styles.auroraB}`} />
        <span className={`${styles.aurora} ${styles.auroraC}`} />
        <svg
          className={styles.stars}
          viewBox="0 0 100 70"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {STARS.map((s, i) => (
            <circle
              key={i}
              className={styles.star}
              cx={s.x}
              cy={s.y}
              r={s.r * 0.18}
              fill="#fff"
              style={{ animationDelay: `${s.d}s`, animationDuration: `${s.t}s` }}
            />
          ))}
        </svg>
      </div>
      <div className={styles.trees} aria-hidden="true">
        <Fir className={`${styles.fir} ${styles.firA}`} />
        <Fir className={`${styles.fir} ${styles.firB}`} />
        <Fir className={`${styles.fir} ${styles.firC}`} />
        <Fir className={`${styles.fir} ${styles.firD}`} />
      </div>
    </>
  );
}
