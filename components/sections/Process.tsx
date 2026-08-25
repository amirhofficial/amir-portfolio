'use client';

import { motion } from 'framer-motion';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import { processSteps } from '@/data/process';
import {
  DURATION,
  EASE_CINEMATIC,
} from '@/lib/utils';
import { useLanguage } from '@/lib/language';
import { translations } from '@/lib/translations';

export default function Process() {
  const { language } =
    useLanguage();

  const t =
    translations[language];

  return (
    <section
      id="process"
      className="section relative overflow-hidden"
    >
      <div className="section-inner">
        <SectionEyebrow
          index="05"
          label={t.process.eyebrow}
        />

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mt-14 grid gap-8 md:mt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="text-section-heading max-w-4xl text-ink-primary">
              {t.process.heading[0]}
            </h2>
          </div>

          <motion.p
            className={[
              'max-w-xs text-body text-ink-secondary',
              'lg:col-span-4 lg:justify-self-end',
              language === 'fa'
                ? 'text-right'
                : '',
            ]
              .filter(Boolean)
              .join(' ')}
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
              margin: '-15% 0px',
            }}
            transition={{
              duration:
                DURATION.reveal,
              ease:
                EASE_CINEMATIC,
            }}
          >
            {t.process.intro}
          </motion.p>
        </div>

        {/* =====================================================
            PROCESS TIMELINE
        ===================================================== */}

        <div className="relative mt-20 md:mt-28">
          {/* Central timeline */}

          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-[23px] top-0 w-px bg-gradient-to-b from-accent/50 via-hairline-accent to-transparent md:left-1/2 md:-translate-x-1/2"
            initial={{
              scaleY: 0,
              transformOrigin: 'top',
            }}
            whileInView={{
              scaleY: 1,
            }}
            viewport={{
              once: true,
              margin: '-10% 0px',
            }}
            transition={{
              duration:
                DURATION.cinematic,
              ease:
                EASE_CINEMATIC,
            }}
          />

          <div className="space-y-0">
            {processSteps.map(
              (step, i) => {
                const isEven =
                  i % 2 === 0;

                /*
                 * Translation keys are intentionally
                 * separated from the data structure so
                 * the timeline geometry remains unchanged.
                 */
                const processKey =
                  i === 0
                    ? 'think'
                    : i === 1
                      ? 'design'
                      : i === 2
                        ? 'build'
                        : 'evolve';

                const localizedStep =
                  t.process[
                    processKey
                  ];

                return (
                  <motion.article
                    key={step.index}
                    className="group relative"
                    initial={{
                      opacity: 0,
                      y: 42,
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
                      duration:
                        DURATION.cinematic,
                      delay:
                        i * 0.08,
                      ease:
                        EASE_CINEMATIC,
                    }}
                  >
                    <div className="relative grid min-h-[260px] grid-cols-[46px_1fr] gap-7 md:min-h-[300px] md:grid-cols-2 md:gap-20">
                      {/* =================================================
                          MOBILE NUMBER / DESKTOP CENTER NODE
                      ================================================= */}

                      <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center md:left-1/2 md:-translate-x-1/2">
                        <motion.span
                          className="absolute h-3 w-3 rounded-full border border-accent/50 bg-bg-primary transition-all duration-500 group-hover:h-4 group-hover:w-4 group-hover:bg-accent"
                        />

                        <span className="absolute h-7 w-7 rounded-full border border-hairline opacity-50 transition-all duration-700 group-hover:scale-125 group-hover:border-accent/30" />
                      </div>

                      {/* =================================================
                          LEFT / RIGHT CONTENT
                      ================================================= */}

                      <div
                        className={
                          isEven
                            ? 'col-start-2 md:col-start-1 md:pr-20 md:text-right'
                            : 'col-start-2 md:col-start-2 md:pl-20'
                        }
                      >
                        <div className="relative pt-1">
                          {/* Huge step number */}

                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-8 text-[6rem] leading-none tracking-[-0.08em] text-ink-primary/[0.035] transition-transform duration-700 ease-cinematic group-hover:translate-x-2 md:-top-10 md:text-[9rem]"
                          >
                            {step.index}
                          </span>

                          <div className="relative">
                            <div
                              className={
                                isEven
                                  ? 'flex items-center gap-4 md:justify-end'
                                  : 'flex items-center gap-4'
                              }
                            >
                              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
                                {
                                  step.index
                                }
                              </span>

                              <span className="h-px w-8 bg-accent/30 transition-all duration-500 group-hover:w-14 group-hover:bg-accent/60" />
                            </div>

                            <h3
                              className={[
                                'mt-5 font-display text-3xl',
                                'tracking-[-0.035em]',
                                'text-ink-primary',
                                'transition-transform duration-500',
                                'ease-cinematic group-hover:translate-x-1',
                                'md:text-5xl',
                                language ===
                                'fa'
                                  ? 'text-right'
                                  : '',
                              ]
                                .filter(
                                  Boolean,
                                )
                                .join(' ')}
                            >
                              {
                                localizedStep.title
                              }
                            </h3>

                            <p
                              className={
                                isEven
                                  ? [
                                      'mt-5 max-w-md',
                                      'text-body text-ink-secondary',
                                      'md:ml-auto',
                                      language ===
                                      'fa'
                                        ? 'text-right'
                                        : '',
                                    ]
                                      .filter(
                                        Boolean,
                                      )
                                      .join(
                                        ' ',
                                      )
                                  : [
                                      'mt-5 max-w-md',
                                      'text-body text-ink-secondary',
                                      language ===
                                      'fa'
                                        ? 'text-right'
                                        : '',
                                    ]
                                      .filter(
                                        Boolean,
                                      )
                                      .join(
                                        ' ',
                                      )
                              }
                            >
                              {
                                localizedStep.description
                              }
                            </p>

                            {/* Small active marker */}

                            <div
                              aria-hidden="true"
                              className={
                                isEven
                                  ? 'mt-7 flex items-center gap-3 md:justify-end'
                                  : 'mt-7 flex items-center gap-3'
                              }
                            >
                              <span className="text-meta uppercase tracking-widest2 text-ink-faint">
                                {
                                  localizedStep.label
                                }
                              </span>

                              <span className="h-px w-12 bg-hairline transition-all duration-500 group-hover:w-20 group-hover:bg-hairline-accent" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              },
            )}
          </div>
        </div>

        {/* =====================================================
            END MARKER
        ===================================================== */}

        <motion.div
          aria-hidden="true"
          className="mt-10 flex items-center justify-center gap-3 md:mt-14"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration:
              DURATION.reveal,
            delay: 0.3,
            ease:
              EASE_CINEMATIC,
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />

          <span className="h-px w-16 bg-hairline" />

          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-ink-faint">
            {t.process.footer}
          </span>

          <span className="h-px w-16 bg-hairline" />

          <span className="h-1.5 w-1.5 rounded-full bg-accent/20" />
        </motion.div>
      </div>
    </section>
  );
}