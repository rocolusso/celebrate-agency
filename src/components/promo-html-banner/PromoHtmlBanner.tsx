import type { CSSProperties } from "react";
import "@fontsource-variable/unbounded";
import "@fontsource-variable/manrope";
import { BANNER_LINKS } from "../new-year-banner/config";
import type { Locale } from "../new-year-banner/copy";
import BannerRuntime from "./BannerRuntime";
import { COPY, ICONS } from "./copy";
import { Icon } from "./Icons";
import { desktopRoGlints, desktopRoGlows, desktopRuGlints, desktopRuGlows, mobileGlints, mobileGlows } from "./data";
import styles from "./html-banner.module.css";

type V = CSSProperties & Record<`--${string}`, string | number>;

const DESK = { w: 1280, h: 720 };
const MOB = { w: 1066, h: 1530, top: 250 };

// Зоны десктопа, которые «оживляем» вручную (пиксели исходной картинки 1280×720)
const ZONES = {
  ru: { cta: [982, 548, 280, 140, 34], icons: [[123, 582], [325, 582], [520, 580], [700, 578], [868, 578]] },
  ro: { cta: [890, 532, 362, 168, 30], icons: [[110, 560], [283, 562], [458, 562], [623, 560], [793, 560]] },
} as const;

const LABEL: Record<Locale, string> = {
  ru: "Новогодние герои: аниматоры в Бельцах. Пригласите сказку на ваш праздник",
  ro: "Personajele de Anul Nou: animatori în Bălți. Invitați magia sărbătorilor la evenimentul vostru",
};

const pct = (v: number, base: number) => `${((v / base) * 100).toFixed(3)}%`;

function Glints({ items, w, h, offsetY = 0, fg }: { items: number[][]; w: number; h: number; offsetY?: number; fg?: 0 | 1 }) {
  return (
    <>
      {items.map(([x, y, size, warm, isFg], i) => {
        if (fg !== undefined && isFg !== fg) return null;
        const style: V = {
          "--x": pct(x, w),
          "--y": pct(y + offsetY, h),
          "--n": Math.round(size * 1.9),
          "--dur": `${(3.2 + (i % 4) * 0.7).toFixed(1)}s`,
          "--dl": `${((x / w) * 2.6 + (i % 5) * 0.37).toFixed(2)}s`,
        };
        return <i key={i} className={`${styles.glint} ${warm ? styles.warm : styles.cool}`} style={style} />;
      })}
    </>
  );
}

function Glows({ items, w, h, offsetY = 0 }: { items: number[][]; w: number; h: number; offsetY?: number }) {
  return (
    <>
      {items.map(([x, y, r, warm], i) => {
        const style: V = {
          "--x": pct(x, w),
          "--y": pct(y + offsetY, h),
          "--n": Math.round(r * 4.4),
          "--dur": `${(3.6 + (i % 3) * 0.9).toFixed(1)}s`,
          "--dl": `${(i * 0.6).toFixed(1)}s`,
        };
        return <i key={i} className={`${styles.glow} ${warm ? styles.warm : styles.cool}`} style={style} />;
      })}
    </>
  );
}

function Word({ text, cls, delay = 0 }: { text: string; cls: string; delay?: number }) {
  return (
    <span className={`${styles.word} ${cls}`} style={{ "--d": `${delay}ms` } as V}>
      {Array.from(text).map((ch, i) =>
        ch === " " ? (
          <span key={i} className={styles.sp} />
        ) : (
          <span key={i} className={styles.ch} data-c={ch} style={{ "--i": i } as V}>
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

// Боке-огоньки: детерминированно, чтобы сервер и клиент совпали
const BOKEH = Array.from({ length: 12 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return { x: r(1) * 100, n: 14 + r(2) * 30, dur: 16 + r(3) * 14, dl: -r(4) * 20, warm: r(5) > 0.28 };
});

/**
 * HTML-версия новогоднего баннера: те же картинки (лёгкие WebP) и те же эффекты, что в видео,
 * но без видеофайла. Анимации на CSS, снег на canvas. Мобильная версия собрана из слоёв
 * (герои и фон) с живым текстом, десктопная использует картинку с запечённым текстом.
 */
export default function PromoHtmlBanner({ locale, href }: { locale: Locale; href?: string }) {
  const c = COPY[locale];
  const z = ZONES[locale];
  const dGlints = locale === "ru" ? desktopRuGlints : desktopRoGlints;
  const dGlows = locale === "ru" ? desktopRuGlows : desktopRoGlows;
  const ru = locale === "ru";

  return (
    <section className={styles.wrap}>
      <a className={`${styles.root} ${styles[locale]}`} href={href ?? BANNER_LINKS[locale]} aria-label={LABEL[locale]} data-promo data-paused="false">
        {/* ───────── ДЕСКТОП ───────── */}
        <div className={styles.desk}>
          <div className={styles.camX}>
            <div className={styles.camY}>
              <div className={styles.cam}>
                <div className={styles.deskBg} />
                <Glows items={dGlows} w={DESK.w} h={DESK.h} />
                <div className={`${styles.gold} ${styles.goldDesk}`} />
                <Glints items={dGlints} w={DESK.w} h={DESK.h} />
                <i
                  className={styles.ctaGlow}
                  style={{ "--x": z.cta[0], "--y": z.cta[1], "--w": z.cta[2], "--h": z.cta[3], "--r": z.cta[4] } as V}
                />
                <i
                  className={styles.ctaShine}
                  style={{ "--x": z.cta[0], "--y": z.cta[1], "--w": z.cta[2], "--h": z.cta[3], "--r": z.cta[4] } as V}
                />
                {z.icons.map(([x, y], i) => (
                  <i key={i} className={styles.ring} style={{ "--x": pct(x, DESK.w), "--y": pct(y, DESK.h), "--dl": `${(i * 0.5).toFixed(1)}s` } as V} />
                ))}
              </div>
            </div>
          </div>
          <span className={styles.sr}>{c.sr}</span>
        </div>

        {/* ───────── МОБАЙЛ: слои ───────── */}
        <div className={styles.mob}>
          <div className={styles.bgX}>
            <div className={styles.bgY}>
              <div className={styles.bgL}>
                <div className={styles.mobBg} />
                <Glows items={mobileGlows} w={MOB.w} h={MOB.h} offsetY={MOB.top} />
                <div className={`${styles.gold} ${styles.goldMobBg}`} />
                <Glints items={mobileGlints} w={MOB.w} h={MOB.h} offsetY={MOB.top} fg={0} />
              </div>
            </div>
          </div>
          <div className={styles.fgX}>
            <div className={styles.fgY}>
              <div className={styles.fgL}>
                <div className={styles.mobFg} />
                <div className={`${styles.gold} ${styles.goldMobFg}`} />
                <Glints items={mobileGlints} w={MOB.w} h={MOB.h} offsetY={MOB.top} fg={1} />
              </div>
            </div>
          </div>
        </div>

        {/* общие слои */}
        <div className={styles.bokeh} aria-hidden="true">
          {BOKEH.map((b, i) => (
            <i
              key={i}
              className={`${styles.bk} ${b.warm ? styles.warm : styles.cool}`}
              style={{ "--x": `${b.x.toFixed(1)}%`, "--n": b.n.toFixed(0), "--dur": `${b.dur.toFixed(1)}s`, "--dl": `${b.dl.toFixed(1)}s` } as V}
            />
          ))}
        </div>
        <BannerRuntime className={styles.snow} />

        {/* ───────── МОБАЙЛ: живой текст ───────── */}
        <div className={styles.mobText}>
          <span className={styles.tag}>{c.tag}</span>
          <h2 className={styles.title}>
            <Word text={c.l1} cls={ru ? styles.l1ru : styles.l1ro} />
            <Word text={c.l2} cls={ru ? styles.l2ru : styles.l2ro} delay={120} />
          </h2>
          <span className={styles.ribbonWrap}>
            <span className={styles.ribbon}>
              <i className={styles.ribbonLine} />
              <span className={styles.ribbonText}>
                {c.ribbon.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </span>
            </span>
          </span>
          <span className={styles.badges}>
            {c.badges.map((t, i) => (
              <span key={t} className={styles.badge} style={{ "--k": i } as V}>
                <span className={styles.badgeIn}>
                  <span className={styles.badgePanel}>{t}</span>
                  <span className={styles.badgeIcon}>
                    <Icon name={ICONS[i % ICONS.length]} />
                  </span>
                </span>
              </span>
            ))}
          </span>
          <span className={styles.cta}>
            <span className={styles.ctaWrap}>
              <i className={styles.ctaHalo} />
              <span className={styles.ctaBox}>
                <span className={styles.ctaText}>
                  <span>{c.cta[0]}</span>
                  <span className={styles.ctaGold}>{c.cta[1]}</span>
                </span>
                <span className={styles.ctaArrow}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
                <i className={styles.ctaSweep} />
              </span>
            </span>
          </span>
        </div>

        <div className={styles.vig} />
      </a>
    </section>
  );
}
