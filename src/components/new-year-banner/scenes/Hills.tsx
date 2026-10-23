import styles from "../NewYearBanner.module.css";

/** Дальний план: плавные холмы / волны. */
export function HillsBack() {
  return (
    <svg
      className={styles.hillsBack}
      viewBox="0 0 1440 200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 120 C160 70 320 70 480 112 C640 154 760 84 940 78 C1120 72 1260 118 1440 92 L1440 200 L0 200 Z"
        fill="var(--hill-far)"
      />
      <path
        d="M0 150 C200 112 360 132 560 150 C760 168 900 116 1100 124 C1260 130 1360 150 1440 140 L1440 200 L0 200 Z"
        fill="var(--hill-mid)"
      />
    </svg>
  );
}

/** Передний план: закрывает ноги персонажей. */
export function HillsFront() {
  return (
    <svg
      className={styles.hillsFront}
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 34 C180 8 340 14 520 30 C720 48 900 6 1100 14 C1260 20 1360 34 1440 26 L1440 80 L0 80 Z"
        fill="var(--hill-near)"
      />
      <path
        d="M0 52 C220 40 420 56 640 52 C860 48 1060 36 1240 46 C1340 52 1400 54 1440 50 L1440 80 L0 80 Z"
        fill="var(--hill-shade)"
        opacity="0.55"
      />
    </svg>
  );
}
