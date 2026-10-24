import type { CSSProperties } from "react";
import styles from "./hero-banner.module.css";

type V = CSSProperties & Record<`--${string}`, string | number>;

const PINK = "#ff1493";
const YELLOW = "#ffd60a";
const BLUE = "#00b4d8";
const PURPLE = "#9d4edd";
const ORANGE = "#ff6b35";

/* ───────── SVG-элементы (чистая графика, без текста) ───────── */

function BalloonSvg({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 150" focusable="false" aria-hidden="true">
      <path
        d="M50 4C22 4 8 26 8 48c0 26 22 44 38 48l-4 10h16l-4-10c16-4 38-22 38-48C92 26 78 4 50 4Z"
        fill={color}
      />
      <ellipse cx="33" cy="30" rx="8" ry="15" fill="#fff" opacity=".38" transform="rotate(22 33 30)" />
      <path d="M50 106c-10 14 10 26 0 42" fill="none" stroke="#fff" strokeOpacity=".75" strokeWidth="2" />
    </svg>
  );
}

function StarSvg({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 100" focusable="false" aria-hidden="true">
      <path d="M50 4l12 33 35 1-28 22 10 34-29-20-29 20 10-34L3 38l35-1Z" fill={color} />
    </svg>
  );
}

function GiftSvg({ color, ribbon }: { color: string; ribbon: string }) {
  return (
    <svg viewBox="0 0 100 100" focusable="false" aria-hidden="true">
      <rect x="12" y="42" width="76" height="50" rx="6" fill={color} />
      <rect x="7" y="30" width="86" height="18" rx="5" fill={ribbon} />
      <rect x="44" y="30" width="12" height="62" fill="#fff" opacity=".85" />
      <path d="M50 30C36 6 12 14 26 29ZM50 30C64 6 88 14 74 29Z" fill="#fff" opacity=".92" />
    </svg>
  );
}

function HatSvg({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 112" focusable="false" aria-hidden="true">
      <path d="M50 14 90 102H10Z" fill={color} />
      <path d="M33 58h34l6 14H27Z" fill="#fff" opacity=".6" />
      <path d="M20 88h60l4 14H16Z" fill="#fff" opacity=".35" />
      <circle cx="50" cy="12" r="10" fill={YELLOW} />
    </svg>
  );
}

function LollipopSvg({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 80 140" focusable="false" aria-hidden="true">
      <rect x="37" y="66" width="6" height="72" rx="3" fill="#fff" opacity=".85" />
      <circle cx="40" cy="38" r="32" fill={color} />
      <path
        d="M40 38a6 6 0 1 1 6 6 12 12 0 1 1-12-12 18 18 0 1 1 18 18"
        fill="none"
        stroke="#fff"
        strokeWidth="5"
        strokeLinecap="round"
        opacity=".85"
      />
    </svg>
  );
}

function CakeSvg() {
  return (
    <svg viewBox="0 0 120 120" focusable="false" aria-hidden="true">
      <rect x="14" y="72" width="92" height="38" rx="8" fill={PINK} />
      <rect x="26" y="46" width="68" height="30" rx="8" fill={YELLOW} />
      <path d="M14 82c10 10 18-4 28 6s18-6 28 4 18-8 36 0" fill="none" stroke="#fff" strokeWidth="5" />
      <rect x="57" y="24" width="6" height="24" rx="3" fill={BLUE} />
      <path d="M60 6c-8 8-4 14 0 14s8-6 0-14Z" fill={ORANGE} />
    </svg>
  );
}

/* ───────── раскладка ───────── */

type Item = {
  /** левая и верхняя позиция, % контейнера (десктоп); *m: мобильные значения */
  x: number;
  y: number;
  w: number;
  xm?: number;
  ym?: number;
  wm?: number;
  /** сдвиг появления/покачивания, секунды */
  d?: number;
  /** показывать только на десктопе */
  desk?: boolean;
  rot?: number;
};

/** raw: ширина в cqw без ограничений (большие кольца и пятна); иначе от 34 до 130 px */
function pos(i: Item, raw = false): V {
  const s: V = { "--x": `${i.x}%`, "--y": `${i.y}%`, "--w": raw ? `${i.w}cqw` : `clamp(34px, ${i.w}cqw, 130px)`, "--d": `${i.d ?? 0}s` };
  if (i.xm !== undefined) s["--xm"] = `${i.xm}%`;
  if (i.ym !== undefined) s["--ym"] = `${i.ym}%`;
  if (i.wm !== undefined) s["--wm"] = `${i.wm}cqw`;
  if (i.rot !== undefined) s["--r"] = `${i.rot}deg`;
  return s;
}

/* Шары: x, xm, ширина (cqw), задержка и период подъёма (с) */
const BALLOONS: { color: string; x: number; xm: number; w: number; wm: number; dl: number; dur: number; desk?: boolean }[] = [
  { color: PINK, x: 3, xm: -4, w: 9, wm: 14, dl: -1, dur: 11 },
  { color: YELLOW, x: 11, xm: 3, w: 7, wm: 11, dl: -5, dur: 13 },
  { color: BLUE, x: 20, xm: 0, w: 6, wm: 9, dl: -8, dur: 12, desk: true },
  { color: BLUE, x: 88, xm: 90, w: 9, wm: 14, dl: -3, dur: 12 },
  { color: YELLOW, x: 80, xm: 82, w: 7, wm: 11, dl: -7, dur: 14 },
  { color: PINK, x: 70, xm: 70, w: 6, wm: 9, dl: -10, dur: 11, desk: true },
];

const GLINTS: [number, number, number, number, number][] = [
  // x, y (% контейнера), размер px, задержка, тёплый (1) или белый (0)
  [8, 24, 16, 0.2, 1], [22, 70, 12, 1.4, 0], [34, 20, 14, 2.1, 0], [47, 88, 18, 0.7, 1],
  [58, 18, 12, 2.9, 0], [66, 74, 16, 1.1, 1], [78, 26, 14, 0.4, 0], [91, 62, 18, 2.4, 1],
  [14, 48, 12, 3.1, 0], [86, 86, 14, 1.8, 0], [40, 56, 10, 0.9, 1], [72, 48, 10, 2.6, 0],
];

/* ───────── Сцены ───────── */

/** Сцена 1: шары и конфетти (конфетти рисует canvas) */
export function SceneA() {
  return (
    <>
      {BALLOONS.map((b, i) => (
        <span
          key={i}
          className={`${styles.balloon} ${b.desk ? styles.deskOnly : ""}`}
          style={{ "--x": `${b.x}%`, "--xm": `${b.xm}%`, "--w": `clamp(34px, ${b.w}cqw, 120px)`, "--wm": `${b.wm}cqw`, "--dl": `${b.dl}s`, "--dur": `${b.dur}s` } as V}
        >
          <BalloonSvg color={b.color} />
        </span>
      ))}
    </>
  );
}

const RINGS: Item[] = [
  { x: 24, y: 62, w: 34, xm: 20, ym: 66, d: 0 },
  { x: 76, y: 44, w: 30, xm: 82, ym: 40, d: 1.1 },
  { x: 50, y: 78, w: 26, xm: 50, ym: 84, d: 2.2 },
];
const BLOBS: (Item & { c: string })[] = [
  { x: 82, y: 24, w: 34, c: "rgba(255,20,147,.55)", d: 0 },
  { x: 14, y: 72, w: 38, c: "rgba(0,180,216,.6)", d: -3 },
  { x: 55, y: 96, w: 30, c: "rgba(255,214,10,.28)", d: -6 },
];
const BIGSTARS: Item[] = [
  { x: 6, y: 26, w: 7, xm: 2, ym: 24, wm: 12, d: 0 },
  { x: 92, y: 74, w: 6, xm: 90, ym: 80, wm: 10, d: -4 },
];

/** Сцена 2: салюты на фоне колец-вспышек (искры рисует canvas) */
export function SceneB() {
  return (
    <>
      {BLOBS.map((b, i) => (
        <i key={`b${i}`} className={styles.blob} style={{ ...pos(b, true), "--c": b.c } as V} />
      ))}
      {RINGS.map((r, i) => (
        <i key={`r${i}`} className={styles.ring} style={pos(r, true)} />
      ))}
      {BIGSTARS.map((s, i) => (
        <span key={`s${i}`} className={`${styles.item} ${styles.popB}`} style={pos(s)}>
          <span className={styles.spin} style={{ "--d": `${s.d}s` } as V}>
            <StarSvg color={YELLOW} />
          </span>
        </span>
      ))}
    </>
  );
}

const PROPS: { kind: "hat" | "gift" | "pop" | "cake"; color: string; ribbon?: string; item: Item }[] = [
  { kind: "hat", color: PINK, item: { x: 4, y: 58, w: 9, xm: -3, ym: 80, wm: 14, d: 0, rot: -14 } },
  { kind: "gift", color: BLUE, ribbon: YELLOW, item: { x: 14, y: 22, w: 7, xm: 80, ym: 20, wm: 13, d: 0.6, rot: 8, desk: true } },
  { kind: "pop", color: YELLOW, item: { x: 25, y: 70, w: 5, d: 1.2, rot: -10, desk: true } },
  { kind: "cake", color: PINK, item: { x: 86, y: 62, w: 10, xm: 88, ym: 79, wm: 15, d: 0.3, rot: 6 } },
  { kind: "gift", color: ORANGE, ribbon: PURPLE, item: { x: 76, y: 22, w: 7, xm: -3, ym: 15, wm: 12, d: 1, rot: -6 } },
  { kind: "pop", color: PINK, item: { x: 70, y: 66, w: 5, d: 0.5, rot: 12, desk: true } },
  { kind: "hat", color: PURPLE, item: { x: 92, y: 24, w: 8, xm: 90, ym: 30, wm: 13, d: 1.4, rot: 16 } },
];

const STREAMERS_DESK = [
  { d: "M-20 110C150 40 260 220 420 120S640 50 700 140", c: YELLOW, dl: 0 },
  { d: "M1220 120C1040 50 940 230 780 130S580 70 520 160", c: PINK, dl: 0.25 },
  { d: "M-20 540C160 480 240 600 400 530", c: BLUE, dl: 0.5 },
  { d: "M1220 540C1040 580 960 480 800 540", c: ORANGE, dl: 0.75 },
];
const STREAMERS_MOB = [
  { d: "M-10 120C80 90 120 180 210 130", c: YELLOW, dl: 0 },
  { d: "M410 140C330 100 290 200 200 160", c: PINK, dl: 0.25 },
  { d: "M-10 530C70 490 110 570 200 530", c: BLUE, dl: 0.5 },
  { d: "M410 510C330 550 300 480 220 530", c: ORANGE, dl: 0.75 },
];

/** Сцена 3: серпантин и праздничные атрибуты */
export function SceneC() {
  return (
    <>
      <svg className={`${styles.streamers} ${styles.deskOnly}`} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
        {STREAMERS_DESK.map((s, i) => (
          <path key={i} d={s.d} pathLength={1} className={styles.streamer} style={{ stroke: s.c, "--sd": `${s.dl}s` } as V} />
        ))}
      </svg>
      <svg className={`${styles.streamers} ${styles.mobOnly}`} viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" focusable="false" aria-hidden="true">
        {STREAMERS_MOB.map((s, i) => (
          <path key={i} d={s.d} pathLength={1} className={styles.streamer} style={{ stroke: s.c, "--sd": `${s.dl}s` } as V} />
        ))}
      </svg>
      {PROPS.map((p, i) => (
        <span key={i} className={`${styles.item} ${styles.popC} ${p.item.desk ? styles.deskOnly : ""}`} style={pos(p.item)}>
          <span className={styles.bob} style={{ "--d": `${p.item.d ?? 0}s` } as V}>
            {p.kind === "hat" && <HatSvg color={p.color} />}
            {p.kind === "gift" && <GiftSvg color={p.color} ribbon={p.ribbon ?? YELLOW} />}
            {p.kind === "pop" && <LollipopSvg color={p.color} />}
            {p.kind === "cake" && <CakeSvg />}
          </span>
        </span>
      ))}
    </>
  );
}

/** Мерцающие искорки поверх всех сцен */
export function Glints() {
  return (
    <>
      {GLINTS.map(([x, y, s, d, warm], i) => (
        <i
          key={i}
          className={`${styles.glint} ${warm ? styles.warm : ""}`}
          style={{ "--x": `${x}%`, "--y": `${y}%`, "--s": `${s}px`, "--d": `${d}s`, "--t": `${2.6 + (i % 4) * 0.5}s` } as V}
        />
      ))}
    </>
  );
}
