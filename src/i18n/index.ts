import { en } from './en';
import { de } from './de';
import { fr } from './fr';
import { Locale, Translation } from '@/types';

export const translations: Record<Locale, Translation> = {
  en,
  de,
  fr,
};

export const locales: Locale[] = ['en', 'de', 'fr'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
};

export function getTranslation(locale: Locale): Translation {
  return translations[locale] || translations.en;
}
