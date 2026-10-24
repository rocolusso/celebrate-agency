import { Glints, SceneA, SceneB, SceneC } from "./Decor";
import HeroBannerCopyLoader from "./HeroBannerCopyLoader";
import HeroBannerMotion from "./HeroBannerMotion";
import styles from "./hero-banner.module.css";

interface HeroBannerProps {
  /** Строка над заголовком, рендерится на сервере (p) */
  kicker: string;
  /** Строка под кнопкой, рендерится на сервере (p) */
  note: string;
  /** Тексты героя: показываются только на клиенте */
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

/**
 * Главный баннер. Анимация на CSS (цикл 12 с, три сцены) и canvas, без видеофайлов.
 * В баннере нет заголовков h1-h6: h1 страницы лежит в SEO-блоке.
 * Серверный HTML содержит рамку, декор и две строки (kicker, note); заголовок, подзаголовок
 * и кнопка появляются после гидрации (место под них зарезервировано).
 */
export default function HeroBanner({ kicker, note, title, subtitle, ctaText, ctaHref }: HeroBannerProps) {
  return (
    <section className={styles.root} data-hero-banner data-paused="false" aria-labelledby="hero-banner-kicker">
      <div className={styles.stage} aria-hidden="true">
        <i className={styles.clock} data-hero-clock />
        <div className={`${styles.scene} ${styles.sceneC}`}>
          <SceneC />
        </div>
        <div className={`${styles.scene} ${styles.sceneB}`}>
          <SceneB />
        </div>
        <div className={`${styles.scene} ${styles.sceneA}`}>
          <SceneA />
        </div>
        <Glints />
        <i className={styles.scrim} />
        <i className={styles.wipe1} />
        <i className={styles.wipe2} />
        <HeroBannerMotion />
      </div>

      <div className={styles.content}>
        <p id="hero-banner-kicker" className={styles.kicker}>
          {kicker}
        </p>
        <div className={styles.slot}>
          <HeroBannerCopyLoader title={title} subtitle={subtitle} ctaText={ctaText} ctaHref={ctaHref} />
        </div>
        <p className={styles.note}>{note}</p>
      </div>
    </section>
  );
}
