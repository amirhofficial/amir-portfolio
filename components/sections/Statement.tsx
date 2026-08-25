'use client';

import { motion } from 'framer-motion';
import RevealText from '@/components/ui/RevealText';
import {
  DURATION,
  EASE_CINEMATIC,
} from '@/lib/utils';
import { useLanguage } from '@/lib/language';
import { translations } from '@/lib/translations';

export default function Statement() {
  const { language } = useLanguage();

  const t = translations[language];

  return (
    <section
      className={[
        'section relative flex min-h-[58vh]',
        'items-center overflow-hidden',
        language === 'fa'
          ? 'text-right'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={
        language === 'fa'
          ? 'بیانیه'
          : 'Statement'
      }
    >
      <div className="section-inner w-full">
        <div className="relative mx-auto max-w-6xl">
          {/* =====================================================
              BACKGROUND INDEX
          ===================================================== */}

          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute -left-3 -top-16 font-mono text-[8px] uppercase tracking-[0.22em] text-ink-faint md:-left-6 md:-top-20"
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: '-10% 0px',
            }}
            transition={{
              duration: DURATION.reveal,
              ease: EASE_CINEMATIC,
            }}
          >
            06 / STATEMENT
          </motion.span>

          {/* =====================================================
              SIDE MARK
          ===================================================== */}

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-1/2 hidden h-28 w-28 -translate-y-1/2 rounded-full border border-hairline md:block"
            initial={{
              opacity: 0,
              scale: 0.72,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              margin: '-15% 0px',
            }}
            transition={{
              duration: DURATION.cinematic,
              ease: EASE_CINEMATIC,
            }}
          >
            <motion.span
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.55, 0.9, 0.55],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <span className="absolute left-1/2 top-1/2 h-12 w-px -translate-x-1/2 -translate-y-1/2 bg-hairline" />

            <span className="absolute left-1/2 top-1/2 h-px w-12 -translate-x-1/2 -translate-y-1/2 bg-hairline" />
          </motion.div>

          {/* =====================================================
              STATEMENT
          ===================================================== */}

          <div className="relative py-10 md:py-16">
            <motion.div
              aria-hidden="true"
              className={[
                'pointer-events-none absolute top-0 h-px w-20 bg-accent/40',
                language === 'fa'
                  ? 'right-0'
                  : 'left-0',
              ].join(' ')}
              initial={{
                scaleX: 0,
                transformOrigin:
                  language === 'fa'
                    ? 'right'
                    : 'left',
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{
                once: true,
                margin: '-15% 0px',
              }}
              transition={{
                duration: DURATION.reveal,
                ease: EASE_CINEMATIC,
              }}
            />

            <h2 className="max-w-5xl">
              <RevealText
                key={`statement-${language}-0`}
                text={t.statement.heading[0]}
                as="span"
                speed="cinematic"
                trigger="view"
                className="text-statement block text-ink-secondary"
              />

              <RevealText
                key={`statement-${language}-1`}
                text={t.statement.heading[1]}
                as="span"
                speed="cinematic"
                trigger="view"
                delay={0.14}
                className="text-statement mt-3 block text-ink-primary"
              />
            </h2>

            {/* =================================================
                SUPPORTING LINE
            ================================================= */}

            <motion.div
              className={[
                'mt-10 flex flex-col gap-5',
                'sm:flex-row sm:items-center sm:gap-8',
                'md:mt-12',
                language === 'fa'
                  ? 'sm:flex-row-reverse'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
              initial={{
                opacity: 0,
                y: 14,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: '-15% 0px',
              }}
              transition={{
                duration: DURATION.reveal,
                delay: 0.38,
                ease: EASE_CINEMATIC,
              }}
            >
              <span
                dir="ltr"
                className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink-faint"
              >
                DESIGN / CODE / INTERACTION
              </span>

              <span className="hidden h-px w-14 bg-hairline sm:block" />

              <span
                className={[
                  'max-w-md text-sm leading-6 text-ink-faint',
                  language === 'fa'
                    ? 'text-right'
                    : '',
                ].join(' ')}
              >
                {t.statement.description}
              </span>
            </motion.div>
          </div>

          {/* =====================================================
              BOTTOM SIGNATURE
          ===================================================== */}

          <motion.div
            className="flex items-center justify-between border-t border-hairline pt-5"
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
              margin: '-10% 0px',
            }}
            transition={{
              duration: DURATION.reveal,
              delay: 0.5,
              ease: EASE_CINEMATIC,
            }}
          >
            <span
              dir="ltr"
              className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-faint"
            >
              PRINCIPLE
            </span>

            <span
              dir="ltr"
              className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-secondary"
            >
              {t.statement.principle}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}