'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

import SectionEyebrow from '@/components/ui/SectionEyebrow';
import { projects } from '@/data/projects';

import {
  DURATION,
  EASE_CINEMATIC,
} from '@/lib/utils';

import { useLanguage } from '@/lib/language';
import { translations } from '@/lib/translations';

export default function FeaturedProject() {
  const { language } = useLanguage();

  const t = translations[language];

  return (
    <section
      id="work"
      className="section relative overflow-hidden"
    >
      <div className="section-inner">
        <SectionEyebrow
          index="04"
          label={t.work.eyebrow}
        />

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="mt-14 md:mt-16">
          <motion.div
            className="flex items-end justify-between gap-8 border-b border-hairline pb-5"
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
              ease: EASE_CINEMATIC,
            }}
          >
            <p className="text-meta uppercase tracking-widest2 text-ink-faint">
              {t.work.selected}
            </p>

            <p className="hidden max-w-xs text-right text-meta leading-5 text-ink-muted md:block">
              {t.work.intro}
            </p>
          </motion.div>
        </div>

        {/* =====================================================
            PROJECTS
        ===================================================== */}

        <div className="mt-14 space-y-32 md:mt-20 md:space-y-40">
          {projects.map((project, i) => {
            const projectContent = (
              <>
                {/* =================================================
                    PROJECT VISUAL
                ================================================= */}

                <div className="relative mx-auto max-w-[980px]">
                  {/* Ambient glow */}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[65%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.08] blur-[90px]"
                  />

                  {/* Back depth layer */}

                  <div
                    aria-hidden="true"
                    className="absolute inset-x-[8%] top-[7%] h-[86%] rounded-[18px] border border-accent/[0.10] bg-accent/[0.025] blur-[0.2px] transition-transform duration-[900ms] ease-cinematic group-hover:translate-y-2 group-hover:scale-[0.98]"
                  />

                  {/* Perspective frame */}

                  <div
                    className={[
                      'project-visual relative mx-auto',
                      'w-[92%] sm:w-[86%] md:w-[82%]',
                      'transition-transform duration-[900ms]',
                      'ease-cinematic',
                      'group-hover:-translate-y-2',
                    ].join(' ')}
                  >
                    {/* Outer frame */}

                    <div className="relative rounded-[18px] border border-white/[0.11] bg-[#080c12]/90 p-[5px] shadow-[0_35px_100px_rgba(0,0,0,0.48)]">
                      {/* Inner frame */}

                      <div className="relative overflow-hidden rounded-[13px] border border-white/[0.06] bg-bg-secondary">
                        {/* Image */}

                        <div className="relative aspect-[16/8.5]">
                          {project.image ? (
                            <Image
                              src={project.image}
                              alt={`${project.name} preview`}
                              fill
                              priority={i === 0}
                              sizes="(max-width: 768px) 92vw, 820px"
                              className="object-cover object-top transition-transform duration-[900ms] ease-cinematic group-hover:scale-[1.035]"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-bg-secondary" />
                          )}

                          {/* Dark premium overlay */}

                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-b from-black/[0.06] via-transparent to-black/[0.22]"
                          />

                          {/* Fine grid */}

                          <div
                            aria-hidden="true"
                            className="absolute inset-0 opacity-[0.16]"
                            style={{
                              backgroundImage:
                                'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                              backgroundSize:
                                '48px 48px',
                            }}
                          />

                          {/* Scan line */}

                          <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
                            animate={{
                              y: [
                                '0%',
                                '850%',
                              ],
                              opacity: [
                                0,
                                0.8,
                                0,
                              ],
                            }}
                            transition={{
                              duration: 5.5,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }}
                          />

                          {/* Top HUD */}

                          <div className="absolute left-4 right-4 top-4 flex items-center justify-between md:left-5 md:right-5 md:top-5">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-black/[0.30] px-3 py-1.5 font-mono text-[7px] uppercase tracking-[0.18em] text-white/65 backdrop-blur-md">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(96,165,250,0.65)]" />

                              {t.work.featuredProject}
                            </span>

                            <span
                              dir="ltr"
                              className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/45"
                            >
                              01 / LIVE
                            </span>
                          </div>

                          {/* Corner markers */}

                          <span
                            aria-hidden="true"
                            className="absolute left-4 top-16 h-5 w-5 border-l border-t border-white/[0.18] md:left-5 md:top-20"
                          />

                          <span
                            aria-hidden="true"
                            className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-white/[0.18] md:bottom-5 md:right-5"
                          />

                          {/* Project index */}

                          <span
                            aria-hidden="true"
                            className="absolute bottom-[-0.05em] right-3 font-display text-[20vw] leading-none tracking-[-0.08em] text-white/[0.055] md:right-6 md:text-[11vw]"
                          >
                            {project.index}
                          </span>

                          {/* Center spatial marker */}

                          <div
                            aria-hidden="true"
                            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_30px_rgba(96,165,250,0.65)] transition-transform duration-[700ms] group-hover:scale-[1.6]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Floating depth line */}

                    <div
                      aria-hidden="true"
                      className="absolute -bottom-3 left-[9%] right-[9%] h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"
                    />

                    {/* Side depth marker */}

                    <div
                      aria-hidden="true"
                      className="absolute -right-3 top-[18%] hidden h-[64%] w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent md:block"
                    />
                  </div>
                </div>

                {/* =================================================
                    PROJECT META
                ================================================= */}

                <div className="mx-auto mt-10 max-w-[1120px] md:mt-12">
                  <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                    {/* Identity */}

                    <div className="lg:col-span-7">
                      <div className="flex items-start gap-5">
                        <span
                          dir="ltr"
                          className="pt-2 font-mono text-[9px] tracking-[0.18em] text-ink-faint"
                        >
                          {project.index}
                        </span>

                        <div>
                          <h3
                            dir="ltr"
                            className="font-display text-5xl leading-[0.9] tracking-[-0.055em] text-ink-primary transition-transform duration-700 ease-cinematic group-hover:translate-x-2 md:text-7xl"
                          >
                            {project.name}
                          </h3>

                          {/* LOCALIZED PROJECT DESCRIPTION */}

                          <p
                            className={[
                              'mt-5 max-w-xl text-body-lg text-ink-secondary',
                              language === 'fa'
                                ? 'text-right'
                                : '',
                            ]
                              .filter(Boolean)
                              .join(' ')}
                          >
                            {project.description[language]}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Details */}

                    <div className="lg:col-span-5">
                      <div
                        className={[
                          'border-t border-hairline pt-5',
                          'lg:border-t-0 lg:border-l lg:pl-8',
                          language === 'fa'
                            ? 'lg:border-l-0 lg:border-r lg:pl-0 lg:pr-8'
                            : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        <p className="text-meta uppercase tracking-widest2 text-ink-faint">
                          {t.work.technologies}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2.5">
                          {project.tags.map(
                            (tag) => (
                              <span
                                key={tag}
                                dir="ltr"
                                className="rounded-full border border-hairline px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-ink-secondary transition-all duration-300 group-hover:border-hairline-accent group-hover:text-ink-primary"
                              >
                                {tag}
                              </span>
                            ),
                          )}
                        </div>

                        <div className="mt-8 flex items-center justify-between gap-6 border-t border-hairline pt-5">
                          <span
                            dir="ltr"
                            className="text-meta uppercase tracking-widest2 text-ink-faint"
                          >
                            {project.href
                              ? 'CASE STUDY'
                              : t.work.status}
                          </span>

                          <span
                            dir="ltr"
                            className="text-meta uppercase tracking-widest2 text-ink-secondary transition-colors duration-300 group-hover:text-ink-primary"
                          >
                            {project.href
                              ? 'EXPLORE ↗'
                              : t.work.comingSoon}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );

            return (
              <motion.article
                key={project.index}
                className="group"
                initial={{
                  opacity: 0,
                  y: 34,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: '-12% 0px',
                }}
                transition={{
                  duration: DURATION.cinematic,
                  delay: i * 0.08,
                  ease: EASE_CINEMATIC,
                }}
              >
                {project.href ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor="EXPLORE"
                    className="block outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    {projectContent}
                  </a>
                ) : (
                  <div className="block">
                    {projectContent}
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}