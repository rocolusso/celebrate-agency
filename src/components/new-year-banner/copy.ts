export type Locale = "ro" | "ru";

export interface BannerCopy {
  /** Бейдж над заголовком */
  kicker: string;
  /** Заголовок (рендерится как h2) */
  title: string;
  /** Подзаголовок */
  subtitle: string;
  /** Текст кнопки */
  cta: string;
  /** aria-label для кнопки */
  ctaLabel: string;
  /** Подпись к анимации для скринридеров */
  sceneLabel: string;
}

/**
 * Тексты баннера. Правим здесь, разметка и стили не затрагиваются.
 * RO: Moș Crăciun (в Молдове так говорят чаще всего), при желании заменить на Moș Gerilă.
 */
export const COPY: Record<Locale, BannerCopy> = {
  ro: {
    kicker: "Program special de Anul Nou 2027",
    title: "Un Revelion pe care copiii îl vor povesti o săptămână",
    subtitle:
      "Cei mai buni animatori din Bălți vin cu Moș Crăciun și jocuri pentru copii. Datele de 31 decembrie se ocupă primele.",
    cta: "Detalii despre program",
    ctaLabel: "Detalii despre programul special de Anul Nou",
    sceneLabel: "Moș Crăciun și Crăiasa Zăpezii urează La mulți ani 2027",
  },
  ru: {
    kicker: "Специальная новогодняя программа 2027",
    title: "Новый год, который дети будут пересказывать неделю",
    subtitle:
      "Лучшие аниматоры в Бельцах приедут с Дедом Морозом и играми для детей. Даты на 31 декабря расходятся первыми.",
    cta: "Подробнее о программе",
    ctaLabel: "Подробнее о специальной новогодней программе",
    sceneLabel: "Дед Мороз и Снегурочка поздравляют с Новым годом 2027",
  },
};
