'use client';

import { useLanguage } from '@/lib/language';
import { translations } from '@/lib/translations';

export default function Footer() {
  const { language } = useLanguage();

  const t = translations[language];

  return (
    <footer className="relative border-t border-hairline">
      <div
        className={[
          'section-inner flex flex-col',
          'items-center gap-4',
          'px-6 py-14 text-center',
          'md:flex-row md:justify-between',
          'md:px-10 md:text-left',
          language === 'fa'
            ? 'md:flex-row-reverse md:text-right'
            : '',
        ].join(' ')}
      >
        <span className="text-meta uppercase tracking-widest2 text-ink-secondary">
          Amir Heidari
        </span>

        <span className="text-meta uppercase tracking-widest2 text-ink-faint">
          {t.footer.signature}
        </span>

        <span
          className="text-meta text-ink-faint"
          dir="ltr"
        >
          {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
}