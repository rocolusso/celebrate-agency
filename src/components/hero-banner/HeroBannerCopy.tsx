"use client";

import Button from "@/components/ui/Button";
import styles from "./hero-banner.module.css";

export interface HeroBannerCopyProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

/**
 * Текст героя (заголовок, подзаголовок, кнопка). Показывается только на клиенте
 * (см. HeroBannerCopyLoader), в серверный HTML он не попадает. Это не теги h1-h6:
 * единственный h1 страницы находится в SEO-блоке.
 */
export default function HeroBannerCopy({ title, subtitle, ctaText, ctaHref }: HeroBannerCopyProps) {
  return (
    <div className={styles.copy}>
      <div className={styles.title}>{title}</div>
      <p className={styles.subtitle}>{subtitle}</p>
      <Button href={ctaHref} size="lg" className={styles.cta}>
        {ctaText}
      </Button>
    </div>
  );
}
