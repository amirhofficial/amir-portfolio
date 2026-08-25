'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionEyebrow from '@/components/ui/SectionEyebrow';
import {
  skillNodes,
  skillConnections,
} from '@/data/skills';
import { cn } from '@/lib/utils';
import {
  DURATION,
  EASE_CINEMATIC,
} from '@/lib/utils';
import { useLanguage } from '@/lib/language';
import { translations } from '@/lib/translations';

function nodeById(id: string) {
  return skillNodes.find(
    (node) => node.id === id,
  )!;
}

export default function Skills() {
  const [activeId, setActiveId] =
    useState<string | null>(null);

  const { language } = useLanguage();
  const t = translations[language];

  const active = activeId
    ? nodeById(activeId)
    : null;

  function clearIfSelf(id: string) {
    setActiveId((current) =>
      current === id ? null : current,
    );
  }

  return (
    <section
      id="skills"
      className="section relative overflow-hidden"
    >
      <div className="section-inner">
        <SectionEyebrow
          index="03"
          label={t.skills.eyebrow}
        />

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mt-14 grid gap-8 md:mt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="text-section-heading max-w-4xl text-ink-primary">
              {t.skills.heading[0]}
              <br />
              {t.skills.heading[1]}
            </h2>
          </div>

          <motion.p
            className="max-w-xs text-body text-ink-secondary lg:col-span-4 lg:justify-self-end"
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
            {t.skills.intro}
          </motion.p>
        </div>

        {/* =====================================================
            DESKTOP / TABLET SKILL MAP
        ===================================================== */}

        <div
          role="group"
          aria-label={
            language === 'fa'
              ? 'مهارت‌ها و ابزارها'
              : 'Skills and tools'
          }
          className="relative mt-16 hidden min-h-[560px] w-full sm:block md:mt-20"
        >
          {/* Subtle editorial grid */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:88px_88px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_85%)]"
          />

          {/* Vertical guide */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-hairline to-transparent opacity-70"
          />

          {/* Connection system */}

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="skillLine"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(255,255,255,0.025)"
                />

                <stop
                  offset="50%"
                  stopColor="rgba(96,165,250,0.12)"
                />

                <stop
                  offset="100%"
                  stopColor="rgba(255,255,255,0.025)"
                />
              </linearGradient>
            </defs>

            {skillConnections.map(
              ([a, b]) => {
                const nodeA =
                  nodeById(a);

                const nodeB =
                  nodeById(b);

                const isActive =
                  activeId === a ||
                  activeId === b;

                return (
                  <motion.line
                    key={`${a}-${b}`}
                    x1={nodeA.x}
                    y1={nodeA.y}
                    x2={nodeB.x}
                    y2={nodeB.y}
                    stroke={
                      isActive
                        ? 'rgba(96,165,250,0.48)'
                        : 'url(#skillLine)'
                    }
                    strokeWidth={
                      isActive
                        ? 0.28
                        : 0.11
                    }
                    animate={{
                      opacity:
                        isActive
                          ? 1
                          : 0.8,
                    }}
                    initial={{
                      opacity: 0.8,
                    }}
                    transition={{
                      duration: 0.3,
                      ease:
                        EASE_CINEMATIC,
                    }}
                  />
                );
              },
            )}
          </svg>

          {/* Nodes */}

          {skillNodes.map(
            (node) => {
              const isActive =
                activeId ===
                node.id;

              return (
                <button
                  key={node.id}
                  type="button"
                  data-cursor="VIEW"
                  aria-pressed={
                    isActive
                  }
                  onMouseEnter={() =>
                    setActiveId(
                      node.id,
                    )
                  }
                  onMouseLeave={() =>
                    clearIfSelf(
                      node.id,
                    )
                  }
                  onFocus={() =>
                    setActiveId(
                      node.id,
                    )
                  }
                  onBlur={() =>
                    clearIfSelf(
                      node.id,
                    )
                  }
                  style={{
                    left:
                      `${node.x}%`,
                    top:
                      `${node.y}%`,
                  }}
                  className={cn(
                    'group absolute -translate-x-1/2 -translate-y-1/2',
                    'text-left outline-none',
                  )}
                >
                  {/* Node point */}

                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500',
                      isActive
                        ? 'scale-[1.8] bg-accent shadow-[0_0_18px_rgba(96,165,250,0.45)]'
                        : 'bg-ink-secondary/40',
                    )}
                  />

                  {/* Label plate */}

                  <span
                    className={cn(
                      'relative block translate-y-6 border px-4 py-2 transition-all duration-500 ease-cinematic',
                      isActive
                        ? 'scale-[1.04] border-accent/50 bg-bg-secondary text-ink-primary shadow-[0_18px_40px_rgba(0,0,0,0.18)]'
                        : 'border-hairline bg-bg-primary/70 text-ink-secondary group-hover:border-hairline-accent',
                    )}
                  >
                    <span className="block font-mono text-[8px] tracking-[0.18em] text-ink-faint">
                      {node.group ===
                      'tool'
                        ? t.skills.tool
                        : t.skills.skill}
                    </span>

                    <span className="mt-1 block text-meta uppercase tracking-widest2">
                      {node.label}
                    </span>
                  </span>
                </button>
              );
            },
          )}

          {/* Bottom status */}

          <div className="absolute bottom-0 left-0 right-0 border-t border-hairline pt-4">
            <div className="flex items-center justify-between gap-6">
              <p className="text-meta text-ink-faint">
                {active
                  ? `${active.label} — ${active.detail[language]}`
                  : t.skills.hover}
              </p>

              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-faint">
                {t.skills.interactiveMap}
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            MOBILE
        ===================================================== */}

        <div className="mt-14 space-y-10 sm:hidden">
          {[
            {
              title:
                t.skills.technical,
              group:
                'technical' as const,
            },
            {
              title:
                t.skills.tools,
              group:
                'tool' as const,
            },
          ].map(
            (
              section,
              sectionIndex,
            ) => (
              <div
                key={
                  section.group
                }
                className="border-t border-hairline pt-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-meta uppercase tracking-widest2 text-ink-faint">
                    {
                      section.title
                    }
                  </p>

                  <span className="font-mono text-[8px] text-ink-faint">
                    {String(
                      sectionIndex +
                        1,
                    ).padStart(
                      2,
                      '0',
                    )}
                  </span>
                </div>

                <div className="mt-5 divide-y divide-hairline">
                  {skillNodes
                    .filter(
                      (node) =>
                        node.group ===
                        section.group,
                    )
                    .map(
                      (
                        node,
                        index,
                      ) => (
                        <button
                          key={
                            node.id
                          }
                          type="button"
                          className="group flex w-full items-center justify-between py-4 text-left"
                          onClick={() =>
                            setActiveId(
                              node.id,
                            )
                          }
                        >
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-[8px] text-ink-faint">
                              {String(
                                index +
                                  1,
                              ).padStart(
                                2,
                                '0',
                              )}
                            </span>

                            <span
                              className={cn(
                                'font-display text-xl transition-colors duration-300',
                                activeId ===
                                  node.id
                                  ? 'text-accent'
                                  : 'text-ink-primary',
                              )}
                            >
                              {
                                node.label
                              }
                            </span>
                          </div>

                          <span
                            className={cn(
                              'text-lg transition-transform duration-300',
                              activeId ===
                                node.id
                                ? 'translate-x-1 text-accent'
                                : 'text-ink-faint',
                            )}
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        </button>
                      ),
                    )}
                </div>

                {active &&
                  active.group ===
                    section.group && (
                    <motion.p
                      key={
                        active.id
                      }
                      className="border-l border-hairline-accent py-2 pl-4 text-sm leading-6 text-ink-secondary"
                      initial={{
                        opacity: 0,
                        x: 8,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                    >
                      {
                        active
                          .detail[
                          language
                        ]
                      }
                    </motion.p>
                  )}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}