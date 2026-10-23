import styles from "./decor.module.css";

const SWAGS = 5;
const BULBS = 7;
const SAG = 22;
const COLORS = ["#ffd86b", "#ff6fae", "#7fe3ff", "#ffffff", "#9dff8a", "#ffb04a"];

const swags = Array.from({ length: SWAGS }, (_, k) =>
  Array.from({ length: BULBS }, (_, j) => {
    const f = (j + 1) / (BULBS + 1);
    return {
      key: `${k}-${j}`,
      left: ((k + f) / SWAGS) * 100,
      top: 2 + SAG * 4 * f * (1 - f),
      color: COLORS[(k * BULBS + j) % COLORS.length],
      delay: ((k * BULBS + j) % 4) * -0.5,
    };
  }),
);

const wire = Array.from({ length: SWAGS }, (_, k) => {
  const x0 = (k / SWAGS) * 1000;
  const x1 = ((k + 1) / SWAGS) * 1000;
  return `M${x0} 2 Q${(x0 + x1) / 2} ${2 + SAG * 2} ${x1} 2`;
}).join(" ");

const BAUBLES = [
  { cls: "baubleA", color: "#ff4d5e", hang: 64 },
  { cls: "baubleB", color: "#ffc93c", hang: 48 },
  { cls: "baubleC", color: "#35d0ff", hang: 58 },
] as const;

/** Гирлянда с лампочками и подвесные шары вдоль верхней кромки баннера. */
export default function Garland() {
  return (
    <div className={styles.garland} aria-hidden="true">
      <svg className={styles.wire} viewBox="0 0 1000 40" preserveAspectRatio="none">
        <path
          d={wire}
          fill="none"
          stroke="rgba(10,6,50,.55)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {swags.flat().map((b) => (
        <span
          key={b.key}
          className={styles.bulb}
          style={
            {
              left: `${b.left}%`,
              top: `${b.top}px`,
              color: b.color,
              animationDelay: `${b.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
      {BAUBLES.map((b) => (
        <span
          key={b.cls}
          className={`${styles.bauble} ${styles[b.cls]}`}
          style={{ "--hang": `${b.hang}px`, color: b.color } as React.CSSProperties}
        >
          <span className={styles.baubleString} />
          <span className={styles.baubleBall}>
            <span className={styles.baubleCap} />
          </span>
        </span>
      ))}
    </div>
  );
}
