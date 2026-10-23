import styles from "./decor.module.css";

function Gift({
  body,
  ribbon,
  className,
  delay,
}: {
  body: string;
  ribbon: string;
  className: string;
  delay: string;
}) {
  return (
    <svg
      className={`${styles.gift} ${className}`}
      viewBox="0 0 100 100"
      aria-hidden="true"
      style={{ animationDelay: delay }}
    >
      <ellipse cx="50" cy="96" rx="40" ry="4" fill="#12083a" opacity="0.25" />
      <rect x="10" y="40" width="80" height="54" rx="6" fill={body} />
      <rect x="10" y="40" width="80" height="14" rx="6" fill="#fff" opacity="0.2" />
      <rect x="4" y="30" width="92" height="20" rx="6" fill={body} />
      <rect x="4" y="30" width="92" height="7" rx="3.5" fill="#fff" opacity="0.28" />
      <rect x="43" y="30" width="14" height="64" fill={ribbon} />
      <rect x="4" y="60" width="92" height="12" fill={ribbon} opacity="0.0" />
      <path d="M50 30 C 30 6, 8 12, 20 26 C 28 34, 42 32, 50 30 Z" fill={ribbon} />
      <path d="M50 30 C 70 6, 92 12, 80 26 C 72 34, 58 32, 50 30 Z" fill={ribbon} />
      <path
        d="M50 30 C 34 16, 22 16, 24 22"
        stroke="#fff"
        strokeOpacity="0.45"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="50" cy="31" r="6" fill={ribbon} />
      <circle cx="48" cy="29" r="2" fill="#fff" opacity="0.6" />
    </svg>
  );
}

/** Подарки у ног персонажей. */
export default function Gifts() {
  return (
    <div className={styles.gifts} aria-hidden="true">
      <Gift body="#ff4fa3" ribbon="#ffd93f" className={styles.giftA} delay="0s" />
      <Gift body="#35d0ff" ribbon="#ffffff" className={styles.giftB} delay="-1.1s" />
      <Gift body="#7a4dff" ribbon="#ffd93f" className={styles.giftC} delay="-2.2s" />
    </div>
  );
}
