import styles from "./characters.module.css";

/** Дед Мороз / Moș Crăciun: оригинальная упрощённая SVG-иллюстрация. */
export default function DedMoroz({ className }: { className?: string }) {
  return (
    <svg className={`${styles.svg} ${className ?? ""}`} viewBox="0 0 250 400" aria-hidden="true">
      <defs>
        <linearGradient id="dm-coat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0344a" />
          <stop offset="1" stopColor="#b3122b" />
        </linearGradient>
        <linearGradient id="dm-beard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dfe6fb" />
        </linearGradient>
        <linearGradient id="dm-staff" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#bfe9ff" />
          <stop offset="1" stopColor="#6fb6f2" />
        </linearGradient>
      </defs>

      <ellipse cx="125" cy="392" rx="95" ry="7" fill="#1a1450" opacity="0.28" />

      <g className={styles.bob}>
        {/* посох (держит рука слева) */}
        <rect x="30" y="118" width="7" height="268" rx="3.5" fill="url(#dm-staff)" />
        <g className={styles.twinkle}>
          <path
            d="M33.5 76 L46 100 L33.5 124 L21 100 Z"
            fill="#dff6ff"
            stroke="#9edcff"
            strokeWidth="2"
          />
          <path d="M33.5 84 L40 100 L33.5 116 L27 100 Z" fill="#ffffff" opacity="0.9" />
        </g>

        {/* сапоги */}
        <rect x="68" y="366" width="52" height="26" rx="12" fill="#2a2147" />
        <rect x="130" y="366" width="52" height="26" rx="12" fill="#2a2147" />

        {/* шуба */}
        <path
          d="M88 150 C66 160 58 230 46 372 L204 372 C192 230 184 160 162 150 Z"
          fill="url(#dm-coat)"
        />
        <path
          d="M88 150 C70 170 66 210 62 262 C80 214 96 182 112 160 Z"
          fill="#ff6a7a"
          opacity="0.28"
        />
        <rect x="116" y="164" width="18" height="200" rx="9" fill="#fff" />
        <rect x="38" y="350" width="174" height="30" rx="15" fill="#fff" />
        <rect x="38" y="368" width="174" height="12" rx="6" fill="#dfe6fb" opacity="0.6" />
        {/* пояс */}
        <rect x="66" y="252" width="118" height="19" rx="4" fill="#2a2147" />
        <rect x="109" y="248" width="32" height="27" rx="6" fill="#ffc93c" />
        <rect x="116" y="255" width="18" height="13" rx="3" fill="#2a2147" />

        {/* рука со посохом */}
        <path
          d="M86 168 C60 182 44 214 38 248"
          stroke="#d11f37"
          strokeWidth="32"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="21" y="236" width="34" height="14" rx="7" fill="#fff" />
        <circle cx="34" cy="258" r="14" fill="#2f6bff" />

        {/* машущая рука */}
        <g className={styles.wave} style={{ transformOrigin: "164px 170px" }}>
          <path
            d="M164 170 C194 176 214 150 220 116"
            stroke="#d11f37"
            strokeWidth="32"
            strokeLinecap="round"
            fill="none"
          />
          <rect
            x="203"
            y="116"
            width="34"
            height="14"
            rx="7"
            fill="#fff"
            transform="rotate(12 220 123)"
          />
          <circle cx="224" cy="98" r="15" fill="#2f6bff" />
          <circle cx="231" cy="86" r="6.5" fill="#2f6bff" />
        </g>

        {/* голова */}
        <circle cx="125" cy="110" r="35" fill="#f9c9a5" />
        <circle cx="105" cy="122" r="8" fill="#ff8c8c" opacity="0.45" />
        <circle cx="145" cy="122" r="8" fill="#ff8c8c" opacity="0.45" />

        {/* борода */}
        <g className={styles.sway} style={{ transformOrigin: "125px 130px" }}>
          <path
            d="M88 112 C76 156 90 214 125 232 C160 214 174 156 162 112 C154 130 140 138 125 138 C110 138 96 130 88 112 Z"
            fill="url(#dm-beard)"
            stroke="#cfd8f5"
            strokeWidth="1.5"
          />
          <path
            d="M104 176 C108 190 114 198 120 200"
            stroke="#cfd8f5"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M146 176 C142 190 136 198 130 200"
            stroke="#cfd8f5"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* усы, рот, нос */}
        <ellipse cx="125" cy="140" rx="6.5" ry="5" fill="#c23a4a" />
        <path
          d="M125 128 C112 120 96 124 94 134 C108 140 120 138 125 130 Z"
          fill="#fff"
          stroke="#cfd8f5"
          strokeWidth="1.2"
        />
        <path
          d="M125 128 C138 120 154 124 156 134 C142 140 130 138 125 130 Z"
          fill="#fff"
          stroke="#cfd8f5"
          strokeWidth="1.2"
        />
        <circle cx="125" cy="120" r="9" fill="#f5a085" />
        <circle cx="122" cy="117" r="2.6" fill="#fff" opacity="0.55" />

        {/* глаза и брови */}
        <ellipse className={styles.blink} cx="110" cy="102" rx="3.4" ry="4.4" fill="#2a2147" />
        <ellipse className={styles.blink} cx="140" cy="102" rx="3.4" ry="4.4" fill="#2a2147" />
        <rect
          x="100"
          y="90"
          width="20"
          height="7"
          rx="3.5"
          fill="#fff"
          transform="rotate(-8 110 93)"
        />
        <rect
          x="130"
          y="90"
          width="20"
          height="7"
          rx="3.5"
          fill="#fff"
          transform="rotate(8 140 93)"
        />

        {/* шапка */}
        <path d="M88 76 C82 22 168 22 162 76 Z" fill="url(#dm-coat)" />
        <path
          d="M96 66 C98 40 112 30 126 29 C110 40 104 52 104 70 Z"
          fill="#ff6a7a"
          opacity="0.3"
        />
        <rect x="80" y="66" width="90" height="26" rx="13" fill="#fff" />
        <circle cx="83" cy="96" r="10" fill="#fff" />
        <circle cx="167" cy="96" r="10" fill="#fff" />
        <g className={styles.twinkle}>
          <path
            d="M125 38 l3.4 7.6 8.2 .9 -6.1 5.6 1.7 8.1 -7.2 -4.1 -7.2 4.1 1.7 -8.1 -6.1 -5.6 8.2 -.9 Z"
            fill="#ffd23f"
          />
        </g>
      </g>
    </svg>
  );
}
