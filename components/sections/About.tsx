'use client';

import { motion } from 'framer-motion';
import RevealText from '@/components/ui/RevealText';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import {
  DURATION,
  EASE_CINEMATIC,
} from '@/lib/utils';
import { useLanguage } from '@/lib/language';
import { translations } from '@/lib/translations';

const stats = [
  {
    index: '01',
    value: '01',
    label: 'REAL PROJECT',
    detail: 'Built from idea to execution',
  },
  {
    index: '02',
    value: 'WEB',
    label: 'DEVELOPMENT',
    detail: 'Modern digital experiences',
  },
  {
    index: '03',
    value: 'AI',
    label: 'EXPLORATION',
    detail: 'AI-assisted creative workflow',
  },
  {
    index: '04',
    value: '∞',
    label: 'LEARNING',
    detail: 'Always improving',
  },
];

export default function About() {
  const { language } = useLanguage();

  const t = translations[language];

  return (
    <section
      id="about"
      className={[
        'section relative overflow-hidden',
        language === 'fa'
          ? 'about-persian'
          : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="section-inner">
        <SectionEyebrow
          index="01"
          label={t.about.eyebrow}
        />

        {/* =====================================================
            MAIN ABOUT COMPOSITION
        ===================================================== */}

        <div className="relative mt-14 grid grid-cols-1 gap-14 md:mt-16 lg:grid-cols-12 lg:gap-8">
          {/* Decorative vertical marker */}

          <motion.div
            aria-hidden="true"
            className={[
              'pointer-events-none absolute -left-4 top-2 hidden h-full w-px',
              'bg-gradient-to-b from-hairline-accent via-hairline to-transparent',
              'lg:block',
            ].join(' ')}
            initial={{
              scaleY: 0,
              transformOrigin: 'top',
            }}
            whileInView={{
              scaleY: 1,
            }}
            viewport={{
              once: true,
              margin: '-15% 0px',
            }}
            transition={{
              duration: DURATION.cinematic,
              ease: EASE_CINEMATIC,
            }}
          />

          {/* Heading */}

          <div className="relative lg:col-span-7">
            <div className="absolute -right-4 top-1 hidden h-20 w-20 rounded-full border border-hairline md:block" />

            <h2
              className={
                language === 'fa'
                  ? 'text-right'
                  : ''
              }
            >
              <RevealText
  key={`about-heading-${language}-0`}
  text={t.about.heading[0]}
  as="span"
  className="text-section-heading block text-ink-primary"
/>

<RevealText
  key={`about-heading-${language}-1`}
  text={t.about.heading[1]}
  as="span"
  className="text-section-heading block text-ink-primary"
  delay={0.08}
/>

<RevealText
  key={`about-heading-${language}-2`}
  text={t.about.heading[2]}
  as="span"
  className="text-section-heading block text-ink-primary"
  delay={0.16}
/>
            </h2>

            <motion.div
              aria-hidden="true"
              className={[
                'mt-8 h-px w-24 bg-accent/40',
                language === 'fa'
                  ? 'mr-0'
                  : 'ml-0',
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
                margin: '-10% 0px',
              }}
              transition={{
                duration: DURATION.reveal,
                delay: 0.22,
                ease: EASE_CINEMATIC,
              }}
            />
          </div>

          {/* Copy + quote */}

          <div
            className={[
              'flex flex-col justify-between gap-12 lg:col-span-5 lg:pt-3',
              language === 'fa'
                ? 'text-right'
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
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
                ease: EASE_CINEMATIC,
              }}
            >
              <p className="text-body-lg max-w-md">
                {t.about.paragraphs[0]}
              </p>

              <p className="mt-6 text-body-lg max-w-md">
                {t.about.paragraphs[1]}
              </p>

              <p className="mt-5 max-w-md text-body text-ink-secondary">
                {t.about.closing}
              </p>
            </motion.div>

            <motion.blockquote
              className={[
                'relative max-w-sm',
                'border-l border-hairline-accent pl-6',
                language === 'fa'
                  ? 'border-l-0 border-r border-hairline-accent pl-0 pr-6'
                  : '',
              ]
                .filter(Boolean)
                .join(' ')}
              initial={{
                opacity: 0,
                x: language === 'fa' ? -12 : 12,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                margin: '-15% 0px',
              }}
              transition={{
                duration: DURATION.reveal,
                delay: 0.12,
                ease: EASE_CINEMATIC,
              }}
            >
              <span
                className={[
                  'absolute top-0 h-2 w-2 rounded-full bg-accent',
                  language === 'fa'
                    ? '-right-[4px]'
                    : '-left-[4px]',
                ].join(' ')}
              />

              <p className="text-body italic text-ink-secondary">
                {t.about.quote}
              </p>
            </motion.blockquote>
          </div>
        </div>

        {/* =====================================================
            EDITORIAL STATS
        ===================================================== */}

        <div className="relative mt-20 border-t border-hairline pt-8 md:mt-28 md:pt-10">
          <div className="mb-8 flex items-center justify-between">
            <span className="text-meta uppercase tracking-widest2 text-ink-faint">
              {t.about.currentState}
            </span>

            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
              {t.about.now}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.index}
                className="group relative border-t border-hairline py-6 md:border-t-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 lg:min-h-[150px]"
                initial={{
                  opacity: 0,
                  y: 18,
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
                  delay: i * 0.08,
                  ease: EASE_CINEMATIC,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[9px] tracking-[0.18em] text-ink-faint">
                    {stat.index}
                  </span>

                  <span className="h-px w-8 bg-hairline transition-all duration-500 group-hover:w-12 group-hover:bg-accent/50" />
                </div>

                <p className="mt-8 font-display text-4xl tracking-[-0.04em] text-ink-primary md:text-5xl">
                  {stat.value}
                </p>

                <p className="text-meta mt-3 uppercase tracking-widest2 text-ink-secondary">
                  {stat.label}
                </p>

                <p className="mt-2 max-w-[180px] text-xs leading-5 text-ink-faint transition-colors duration-500 group-hover:text-ink-secondary">
                  {stat.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}