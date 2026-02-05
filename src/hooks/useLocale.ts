'use client';

import { useState, useEffect, useCallback } from 'react';
import { Locale, Translation } from '@/types';
import { getTranslation, locales } from '@/i18n';

const LOCALE_KEY = 'nguyen-vo-locale';

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [translation, setTranslation] = useState<Translation>(getTranslation('en'));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get stored locale or detect from browser
    const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
    if (stored && locales.includes(stored)) {
      setLocaleState(stored);
      setTranslation(getTranslation(stored));
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0] as Locale;
      if (locales.includes(browserLang)) {
        setLocaleState(browserLang);
        setTranslation(getTranslation(browserLang));
      }
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setTranslation(getTranslation(newLocale));
    localStorage.setItem(LOCALE_KEY, newLocale);
    // Update html lang attribute
    document.documentElement.lang = newLocale;
  }, []);

  return {
    locale,
    setLocale,
    translation,
    mounted,
  };
}
