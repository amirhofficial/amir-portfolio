'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type Language = 'en' | 'fa';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  isPersian: boolean;
};

const STORAGE_KEY = 'amir-language';

const LanguageContext =
  createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>('en');

  useEffect(() => {
    const saved =
      window.localStorage.getItem(STORAGE_KEY);

    if (saved === 'en' || saved === 'fa') {
      setLanguageState(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      language,
    );

    document.documentElement.dataset.language =
      language;

    document.documentElement.lang =
      language;

    document.documentElement.dir =
      language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);

  const value = useMemo(
    () => ({
      language,

      setLanguage: (
        nextLanguage: Language,
      ) => {
        setLanguageState(nextLanguage);
      },

      toggleLanguage: () => {
        setLanguageState(
          (current) =>
            current === 'en' ? 'fa' : 'en',
        );
      },

      isPersian: language === 'fa',
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      'useLanguage must be used inside LanguageProvider',
    );
  }

  return context;
}