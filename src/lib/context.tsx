'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLocale } from '@/hooks/useLocale';
import { Locale, Translation } from '@/types';

interface AppContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
  mounted: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { locale, setLocale, translation, mounted } = useLocale();

  return (
    <AppContext.Provider value={{ locale, setLocale, t: translation, mounted }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
