'use client';

import { useLanguage } from '@/lib/language';

export default function LanguageToggle() {
  const {
    language,
    toggleLanguage,
  } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={
        language === 'en'
          ? 'Switch to Persian'
          : 'Switch to English'
      }
      aria-pressed={language === 'fa'}
      className="language-toggle"
      data-cursor="OPEN"
    >
      <span
        className={`language-option ${
          language === 'en'
            ? 'is-active'
            : ''
        }`}
      >
        EN
      </span>

      <span
        className="language-track"
        aria-hidden="true"
      >
        <span className="language-thumb" />
      </span>

      <span
        className={`language-option ${
          language === 'fa'
            ? 'is-active'
            : ''
        }`}
      >
        FA
      </span>
    </button>
  );
}