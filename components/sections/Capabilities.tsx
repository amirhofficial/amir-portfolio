'use client';

import { motion } from 'framer-motion';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import { capabilities } from '@/data/capabilities';
import {
  DURATION,
  EASE_CINEMATIC,
} from '@/lib/utils';
import { useLanguage } from '@/lib/language';
import { translations } from '@/lib/translations';

export default function Capabilities() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section
      id="capabilities"
      className="section relative overflow-hidden"
    >
      <div className="section-inner">
        <SectionEyebrow
          index="02"
          label={t.capabilities.eyebrow}
        />

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mt-14 grid gap-8 md:mt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="text-section-heading max-w-4xl text-ink-primary">
              {t.capabilities.heading[0]}
              <br />
              {t.capabilities.heading[1]}
            </h2>
          </div>

          <motion.p
            className="max-w-xs text-body text-ink-secondary lg:col-span-4 lg:justify-self-end"
            initial={{
              opacity: 0,
              y: 16,
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
            {t.capabilities.intro}
          </motion.p>
        </div>

        {/* =====================================================
            CAPABILITY LIST
        ===================================================== */}

        <div className="mt-16 border-t border-hairline md:mt-20">
          {capabilities.map(
            (cap, i) => (
              <motion.article
                key={cap.index}
                className="group relative overflow-hidden border-b border-hairline"
                initial={{
                  opacity: 0,
                  y: 24,
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
                  duration:
                    DURATION.cinematic,
                  delay:
                    i * 0.07,
                  ease:
                    EASE_CINEMATIC,
                }}
              >
                {/* Hover wash */}

                <span
                  aria-hidden="true"
                  className="absolute inset-0 origin-left scale-x-0 bg-accent/[0.035] transition-transform duration-700 ease-cinematic group-hover:scale-x-100"
                />

                {/* Animated accent line */}

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 bg-accent/60 transition-all duration-700 ease-cinematic group-hover:w-full"
                />

                <div className="relative grid min-h-[180px] grid-cols-1 gap-6 py-9 md:min-h-[190px] md:grid-cols-12 md:items-center md:gap-8 md:py-10">
                  {/* =================================================
                      INDEX
                  ================================================= */}

                  <div className="relative md:col-span-2">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-1 -top-8 font-display text-[5rem] leading-none tracking-[-0.08em] text-ink-primary/[0.035] transition-transform duration-700 ease-cinematic group-hover:translate-x-2 md:text-[6rem]"
                    >
                      {cap.index}
                    </span>

                    <span className="relative font-mono text-[9px] tracking-[0.2em] text-ink-faint transition-colors duration-500 group-hover:text-accent">
                      {cap.index}
                    </span>
                  </div>

                  {/* =================================================
                      TITLE
                  ================================================= */}

                  <div className="relative md:col-span-4">
                    <div className="flex items-center gap-4">
                      <h3 className="font-display text-3xl tracking-[-0.03em] text-ink-primary transition-transform duration-500 ease-cinematic group-hover:translate-x-2 md:text-4xl">
                        {cap.title[language]}
                      </h3>

                      <span
                        aria-hidden="true"
                        className="translate-x-0 text-lg text-accent/0 transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent"
                      >
                        →
                      </span>
                    </div>
                  </div>

                  {/* =================================================
                      DESCRIPTION
                  ================================================= */}

                  <div className="relative md:col-span-5">
                    <p className="max-w-lg text-body text-ink-secondary transition-colors duration-500 group-hover:text-ink-primary/80">
                      {cap.description[language]}
                    </p>
                  </div>

                  {/* =================================================
                      SIDE STATUS
                  ================================================= */}

                  <div className="relative hidden justify-end md:col-span-1 md:flex">
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-ink-faint transition-all duration-500 group-hover:scale-150 group-hover:bg-accent group-hover:shadow-[0_0_16px_rgba(96,165,250,0.4)]"
                    />
                  </div>
                </div>
              </motion.article>
            ),
          )}
        </div>

        {/* =====================================================
            FOOTER SIGNAL
        ===================================================== */}

        <motion.div
          className="mt-8 flex items-center justify-between"
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
            delay: 0.25,
            ease: EASE_CINEMATIC,
          }}
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-faint">
            CAPABILITY / SYSTEM / OUTPUT
          </span>

          <span className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-ink-faint sm:block">
            04 AREAS
          </span>
        </motion.div>
      </div>
    </section>
  );
}