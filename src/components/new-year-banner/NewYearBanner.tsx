import Link from "next/link";
import "@fontsource-variable/unbounded";
import "@fontsource-variable/manrope";
import BannerScene from "./BannerScene";
import BrandScene from "./scenes/BrandScene";
import WinterScene from "./scenes/WinterScene";
import { HillsBack, HillsFront } from "./scenes/Hills";
import DedMoroz from "./characters/DedMoroz";
import Snegurochka from "./characters/Snegurochka";
import Garland from "./decor/Garland";
import Ribbons from "./decor/Ribbons";
import Floaters from "./decor/Floaters";
import Gifts from "./decor/Gifts";
import Gem from "./decor/Gem";
import decor from "./decor/decor.module.css";
import { COPY, type Locale } from "./copy";
import { BANNER_LINKS } from "./config";
import type { ThemeName } from "./engine";
import styles from "./NewYearBanner.module.css";

export interface NewYearBannerProps {
  locale: Locale;
  /** brand: фирменный праздничный, winter: зимняя сказка */
  theme?: ThemeName;
  /** Переопределить ссылку кнопки (по умолчанию из config.ts) */
  href?: string;
}

export default function NewYearBanner({ locale, theme = "brand", href }: NewYearBannerProps) {
  const copy = COPY[locale];

  return (
    <section
      className={styles.banner}
      data-theme={theme}
      lang={locale}
      aria-labelledby="ny-banner-title"
    >
      {theme === "brand" ? <BrandScene /> : <WinterScene />}
      <HillsBack />
      <Garland />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.kicker}>
            <span className={styles.kickerDot} aria-hidden="true" />
            {copy.kicker}
          </p>
          <h2 id="ny-banner-title" className={styles.title}>
            {copy.title}
          </h2>
          <p className={styles.subtitle}>{copy.subtitle}</p>
          <Link
            href={href ?? BANNER_LINKS[locale]}
            className={styles.cta}
            aria-label={copy.ctaLabel}
            data-banner-cta="new-year-2027"
          >
            {copy.cta}
          </Link>
        </div>

        <div className={styles.stage} role="img" aria-label={copy.sceneLabel}>
          <Floaters theme={theme} />
          <Ribbons />
          <div className={styles.year} aria-hidden="true">
            {"2027".split("").map((d, i) => (
              <span key={i} data-d={d} style={{ "--i": i } as React.CSSProperties}>
                {d}
              </span>
            ))}
          </div>
          <div className={styles.chars} aria-hidden="true">
            <Snegurochka className={styles.charSneg} />
            <DedMoroz className={styles.charDed} />
          </div>
          <Gifts />
          <Gem className={decor.gemA} />
          <Gem className={decor.gemB} />
        </div>
      </div>

      <HillsFront />
      <BannerScene theme={theme} />
    </section>
  );
}
