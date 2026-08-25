'use client';

import {
  useEffect,
  useState,
} from 'react';

import { motion } from 'framer-motion';

import Orb from '@/components/ui/Orb';
import Button from '@/components/ui/Button';
import RevealText from '@/components/ui/RevealText';
import ScrollIndicator from '@/components/ui/ScrollIndicator';
import LanguageToggle from '@/components/ui/LanguageToggle';

import {
  DURATION,
  EASE_CINEMATIC,
} from '@/lib/utils';

import { useLanguage } from '@/lib/language';
import { translations } from '@/lib/translations';

function FadeUp({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: DURATION.reveal,
        delay,
        ease: EASE_CINEMATIC,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const { language } = useLanguage();

  const t = translations[language];

  const [
    showLanguageToggle,
    setShowLanguageToggle,
  ] = useState(true);

  useEffect(() => {
    const hero =
      document.getElementById('hero');

    if (!hero) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          setShowLanguageToggle(
            entry.isIntersecting,
          );
        },
        {
          threshold: 0.15,
        },
      );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* =====================================================
          FLOATING LANGUAGE TOGGLE
          Independent from Hero stacking context
      ===================================================== */}

      {showLanguageToggle && (
        <div className="hero-language-toggle">
          <LanguageToggle />
        </div>
      )}

      <section
        id="hero"
        className={[
          'relative flex min-h-[100dvh]',
          'flex-col justify-center',
          'overflow-hidden',
          'px-6 pb-20 pt-36',
          'md:px-10',
          'lg:px-16',
          language === 'fa'
            ? 'hero-persian'
            : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="section-inner grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-8">
          {/* =================================================
              TEXT COLUMN
          ================================================= */}

          <div className="relative z-10 lg:col-span-7">
            <FadeUp delay={0.5}>
              <span
                className={[
                  'text-eyebrow inline-flex items-center gap-3',
                  language === 'fa'
                    ? 'flex-row-reverse'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                />

                {t.hero.eyebrow}
              </span>
            </FadeUp>

            <h1 className="mt-6 lg:mt-8">
              <RevealText
                text="AMIR"
                as="span"
                speed="cinematic"
                trigger="mount"
                delay={0.62}
                className="text-hero block text-ink-primary"
              />

              <RevealText
                text="HEIDARI"
                as="span"
                speed="cinematic"
                trigger="mount"
                delay={0.74}
                className="text-hero block text-ink-primary/[0.12] [-webkit-text-stroke:1px_rgba(245,245,245,0.4)]"
              />
            </h1>

            <FadeUp
              delay={1.05}
              className={[
                'mt-8 max-w-md md:mt-10',
                language === 'fa'
                  ? 'text-right'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <p className="text-body-lg">
                {t.hero.description}
              </p>
            </FadeUp>

            <FadeUp
              delay={1.2}
              className="mt-10 flex flex-wrap items-center gap-5 md:mt-12"
            >
              <Button
                href="#work"
                cursorLabel="VIEW"
              >
                {t.hero.viewWork}
              </Button>

              <Button
                href="#contact"
                variant="secondary"
                cursorLabel="OPEN"
              >
                {t.hero.letsTalk}
              </Button>
            </FadeUp>

            <FadeUp
              delay={1.35}
              className={[
                'mt-14 flex gap-10 md:mt-16',
                language === 'fa'
                  ? 'text-right'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div>
                <p className="text-meta text-ink-faint">
                  {t.hero.basedLabel}
                </p>

                <p className="text-meta mt-1 text-ink-secondary">
                  {t.hero.basedValue}
                </p>
              </div>

              <div>
                <p className="text-meta text-ink-faint">
                  {t.hero.focusLabel}
                </p>

                <p className="text-meta mt-1 text-ink-secondary">
                  {t.hero.focusValue}
                </p>
              </div>
            </FadeUp>
          </div>

          {/* =================================================
              ORB
          ================================================= */}

          <motion.div
            className="relative z-0 flex justify-center lg:col-span-5 lg:justify-end"
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration:
                DURATION.cinematic,
              delay: 0.25,
              ease:
                EASE_CINEMATIC,
            }}
          >
            <Orb />
          </motion.div>
        </div>

        {/* =================================================
            SCROLL INDICATOR
        ================================================= */}

        <motion.div
          className="absolute inset-x-0 bottom-8 hidden justify-center md:flex"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration:
              DURATION.reveal,
            delay: 1.6,
            ease:
              EASE_CINEMATIC,
          }}
        >
          <ScrollIndicator />
        </motion.div>
      </section>
    </>
  );
}