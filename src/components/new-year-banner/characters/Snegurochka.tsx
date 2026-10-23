import styles from "./characters.module.css";

/** Снегурочка / Crăiasa Zăpezii: оригинальная упрощённая SVG-иллюстрация. */
export default function Snegurochka({ className }: { className?: string }) {
  return (
    <svg className={`${styles.svg} ${className ?? ""}`} viewBox="-20 0 250 390" aria-hidden="true">
      <defs>
        <linearGradient id="sn-coat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9bdcff" />
          <stop offset="1" stopColor="#4d9cf0" />
        </linearGradient>
        <linearGradient id="sn-hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd36b" />
          <stop offset="1" stopColor="#f0a63c" />
        </linearGradient>
        <linearGradient id="sn-crown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd0ff" />
          <stop offset="1" stopColor="#2f6fe0" />
        </linearGradient>
      </defs>

      <ellipse cx="105" cy="382" rx="85" ry="7" fill="#1a1450" opacity="0.28" />

      <g className={styles.bob} style={{ animationDelay: "-1.1s" }}>
        {/* сапожки */}
        <rect x="58" y="356" width="46" height="24" rx="11" fill="#fff" />
        <rect x="112" y="356" width="46" height="24" rx="11" fill="#fff" />
        <rect x="58" y="368" width="46" height="12" rx="6" fill="#bfe0ff" />
        <rect x="112" y="368" width="46" height="12" rx="6" fill="#bfe0ff" />

        {/* волосы сзади */}
        <ellipse cx="108" cy="112" rx="46" ry="48" fill="url(#sn-hair)" />

        {/* шубка */}
        <path
          d="M82 152 C62 164 54 230 44 362 L172 362 C162 230 154 164 134 152 Z"
          fill="url(#sn-coat)"
        />
        <path
          d="M82 152 C66 172 62 214 58 262 C74 216 90 184 104 162 Z"
          fill="#ffffff"
          opacity="0.25"
        />
        <rect x="99" y="164" width="18" height="190" rx="9" fill="#fff" />
        <rect x="38" y="340" width="140" height="28" rx="14" fill="#fff" />
        <circle cx="108" cy="204" r="4.5" fill="#ffc93c" />
        <circle cx="108" cy="232" r="4.5" fill="#ffc93c" />
        <circle cx="108" cy="260" r="4.5" fill="#ffc93c" />
        {/* снежинки на подоле */}
        <g stroke="#fff" strokeWidth="2.2" strokeLinecap="round" opacity="0.9">
          <path d="M70 300 l0 14 M63 307 l14 0 M65 302 l10 10 M75 302 l-10 10" />
          <path d="M146 288 l0 12 M140 294 l12 0 M142 290 l8 8 M150 290 l-8 8" />
        </g>
        <rect x="70" y="248" width="76" height="12" rx="6" fill="#2f6fe0" opacity="0.55" />

        {/* спокойная рука */}
        <path
          d="M134 166 C152 186 156 216 150 246"
          stroke="#6bb5f5"
          strokeWidth="28"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="133" y="234" width="32" height="12" rx="6" fill="#fff" />
        <circle cx="149" cy="254" r="13" fill="#fff" />

        {/* машущая рука (наружу, влево) */}
        <g
          className={styles.wave}
          style={{ transformOrigin: "86px 168px", animationDelay: "-0.5s" }}
        >
          <path
            d="M86 168 C58 176 38 150 32 118"
            stroke="#6bb5f5"
            strokeWidth="28"
            strokeLinecap="round"
            fill="none"
          />
          <rect
            x="15"
            y="116"
            width="32"
            height="12"
            rx="6"
            fill="#fff"
            transform="rotate(-12 31 122)"
          />
          <circle cx="29" cy="98" r="14" fill="#fff" />
          <circle cx="21" cy="87" r="6" fill="#fff" />
        </g>

        {/* коса */}
        <g>
          <path
            d="M146 120 C168 150 160 200 152 250"
            stroke="url(#sn-hair)"
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />
          <g stroke="#e0932c" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8">
            <path d="M152 140 l12 8" />
            <path d="M158 168 l-12 8" />
            <path d="M158 194 l12 8" />
            <path d="M154 222 l-12 8" />
          </g>
          <path
            d="M142 250 l10 -6 l10 6 l-10 6 Z M152 250 l-14 -10 l0 22 Z M152 250 l14 -10 l0 22 Z"
            fill="#2f6fe0"
            transform="translate(0 6)"
          />
        </g>

        {/* лицо */}
        <circle cx="108" cy="114" r="33" fill="#fbd3b4" />
        <circle cx="90" cy="126" r="8" fill="#ff8c8c" opacity="0.45" />
        <circle cx="126" cy="126" r="8" fill="#ff8c8c" opacity="0.45" />
        <ellipse className={styles.blink} cx="95" cy="112" rx="3.6" ry="5" fill="#2a2147" />
        <ellipse className={styles.blink} cx="121" cy="112" rx="3.6" ry="5" fill="#2a2147" />
        <circle cx="96.2" cy="110" r="1.3" fill="#fff" />
        <circle cx="122.2" cy="110" r="1.3" fill="#fff" />
        <path
          d="M89 103 l-4 -3 M93 100 l-1 -4 M127 103 l4 -3 M123 100 l1 -4"
          stroke="#2a2147"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M98 130 C104 138 112 138 118 130"
          stroke="#c23a4a"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* чёлка */}
        <path d="M74 100 C78 80 98 74 108 76 C100 86 92 96 76 112 Z" fill="url(#sn-hair)" />
        <path d="M142 100 C138 80 118 74 108 76 C116 86 124 96 140 112 Z" fill="url(#sn-hair)" />

        {/* кокошник */}
        <path
          d="M72 86 L72 70 Q78 40 92 62 Q108 22 124 62 Q138 40 144 70 L144 86 Z"
          fill="url(#sn-crown)"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <rect x="70" y="80" width="76" height="14" rx="7" fill="#fff" />
        <g fill="#8fd0ff">
          <circle cx="84" cy="87" r="2.8" />
          <circle cx="96" cy="87" r="2.8" />
          <circle cx="108" cy="87" r="2.8" />
          <circle cx="120" cy="87" r="2.8" />
          <circle cx="132" cy="87" r="2.8" />
        </g>
        <g className={styles.twinkle} style={{ animationDelay: "-0.7s" }}>
          <path
            d="M108 52 l3 7 7.5 .8 -5.6 5 1.6 7.4 -6.5 -3.8 -6.5 3.8 1.6 -7.4 -5.6 -5 7.5 -.8 Z"
            fill="#fff"
          />
        </g>
      </g>
    </svg>
  );
}
