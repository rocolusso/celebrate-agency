import type { Locale } from "./copy";

/**
 * Сейчас это заглушки.
 */
export const BANNER_LINKS: Record<Locale, string> = {
  ro: "/new-year-2027",
  ru: "/ru/new-year-2027",
};

/** Период показа баннера. Используется хелпером isNewYearSeason() */
export const SEASON = { from: "2026-11-25", until: "2027-01-15" } as const;

export function isNewYearSeason(now: Date = new Date()): boolean {
  const t = now.getTime();
  return (
    t >= new Date(SEASON.from).getTime() && t <= new Date(`${SEASON.until}T23:59:59`).getTime()
  );
}
