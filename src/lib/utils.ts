import { clsx, type ClassValue } from 'clsx';
import type { Locale } from './i18n';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number | string): string {
  return `${price} lei`;
}

export function formatDate(dateString: string, locale: Locale = 'ro'): string {
  const date = new Date(dateString);
  const localeCode = locale === 'ru' ? 'ru-RU' : 'ro-RO';
  return date.toLocaleDateString(localeCode, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
