'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

import {
  DURATION,
  EASE_CINEMATIC,
} from '@/lib/utils';

export default function LunoRunTeaser() {
  return (
    <section
      id="lunorun"
      className="relative overflow-hidden px-6 py-28 md:px-10 md:py-40"
      aria-labelledby="lunorun-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(96,165,250,0.11),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.018),transparent_58%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize:
            '84px 84px',
          maskImage:
            'linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between border-b border-white/[0.06] pb-5">
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">
            05 / INTERACTION
          </span>

          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
            LUNORUN
          </span>
        </div>

        {/* =================================================
            MAIN SCENE
        ================================================= */}

        <div className="relative mt-14 overflow-hidden border border-white/[0.07] bg-[#081019] md:mt-16">
          {/* Ambient glow */}

          <motion.div
            aria-hidden="true"
            className="absolute -right-24 top-1/2 h-[340px] w-[340px] -translate-y-1/2 rounded-full bg-[#60a5fa]/10 blur-3xl"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.45, 0.7, 0.45],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* City-like horizon */}

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-28 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(to top, rgba(255,255,255,0.04), transparent), repeating-linear-gradient(to right, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 56px, transparent 56px, transparent 88px)',
              clipPath:
                'polygon(0 68%, 7% 56%, 15% 67%, 22% 44%, 30% 58%, 38% 39%, 45% 59%, 54% 46%, 62% 65%, 71% 48%, 79% 60%, 88% 41%, 100% 55%, 100% 100%, 0 100%)',
            }}
          />

          {/* Road */}

          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-16 border-t border-white/[0.05] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015),rgba(0,0,0,0.12))]"
          >
            <motion.div
              className="absolute inset-y-0 left-0 flex items-center gap-12 opacity-25"
              animate={{
                x: ['0%', '-26%'],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {Array.from({
                length: 14,
              }).map(
                (_, index) => (
                  <span
                    key={index}
                    className="block h-px w-10 bg-[#60a5fa]"
                  />
                ),
              )}
            </motion.div>
          </div>

          {/* Main layout */}

          <div className="relative grid min-h-[470px] grid-cols-1 lg:grid-cols-12">
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="relative z-10 flex flex-col justify-center px-7 py-12 md:px-12 md:py-16 lg:col-span-7 lg:px-16">
              <motion.span
                className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#60a5fa]"
                initial={{
                  opacity: 0,
                  y: 10,
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
                A SMALL INTERRUPTION
              </motion.span>

              <h2
                id="lunorun-title"
                className="mt-5 max-w-xl font-display text-5xl leading-[0.9] tracking-[-0.06em] text-white md:text-7xl"
              >
                PLAY
                <br />
                A GAME?
              </h2>

              <motion.p
                className="mt-7 max-w-md text-base leading-7 text-white/60 md:text-lg"
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
                  delay: 0.1,
                  ease:
                    EASE_CINEMATIC,
                }}
              >
                Think you can beat my record?
              </motion.p>

              <motion.div
                className="mt-9"
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
                  duration:
                    DURATION.reveal,
                  delay: 0.18,
                  ease:
                    EASE_CINEMATIC,
                }}
              >
                <Link
                  href="/game"
                  data-cursor="EXPLORE"
                  className="group inline-flex items-center gap-4 border border-white/[0.14] bg-white px-8 py-4 text-black transition-all duration-500 hover:-translate-y-1 hover:bg-white/95"
                >
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em]">
                    PLAY MY GAME
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-base transition-transform duration-500 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>

              {/* Small metadata */}

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                  ARCADE
                </span>

                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                  WEB
                </span>

                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
                  INTERACTIVE
                </span>
              </div>
            </div>

            {/* =================================================
                RIGHT GAME SCENE
            ================================================= */}

            <div className="relative min-h-[300px] overflow-hidden lg:col-span-5 lg:min-h-0">
              {/* horizon glow */}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_58%_45%,rgba(96,165,250,0.13),transparent_34%)]"
              />

              {/* giant score */}

              <motion.div
                aria-hidden="true"
                className="absolute right-6 top-8 font-mono text-[8px] uppercase tracking-[0.18em] text-white/25 md:right-10 md:top-10"
                initial={{
                  opacity: 0,
                }}
                whileInView={{
                  opacity: 1,
                }}
                viewport={{
                  once: true,
                }}
              >
                AMIR&apos;S RECORD
              </motion.div>

              <motion.div
                aria-hidden="true"
                className="absolute right-6 top-14 font-display text-5xl leading-none tracking-[-0.06em] text-white/[0.10] md:right-10 md:text-7xl"
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ∞
              </motion.div>

              {/* Player */}

              <motion.div
                aria-hidden="true"
                className="absolute bottom-12 left-[28%] h-16 w-10"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 0.52,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="absolute bottom-0 left-1/2 h-2 w-14 -translate-x-1/2 rounded-full bg-black/40 blur-sm" />

                <div className="absolute left-1/2 top-0 h-12 w-7 -translate-x-1/2 border border-white/[0.18] bg-white/[0.08]" />

                <div className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#60a5fa] shadow-[0_0_14px_rgba(96,165,250,0.5)]" />
              </motion.div>

              {/* Obstacles */}

              <motion.div
                aria-hidden="true"
                className="absolute bottom-12 left-[56%] h-8 w-10 border border-white/[0.13] bg-white/[0.05]"
                animate={{
                  x: [0, -230],
                }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              <motion.div
                aria-hidden="true"
                className="absolute bottom-12 left-[78%] h-12 w-8 border border-[#60a5fa]/20 bg-[#60a5fa]/5"
                animate={{
                  x: [0, -250],
                }}
                transition={{
                  duration: 3.1,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.5,
                }}
              />

              {/* central crosshair */}

              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]"
              />

              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#60a5fa] shadow-[0_0_18px_rgba(96,165,250,0.4)]"
              />

              {/* lower status */}

              <div className="absolute bottom-20 left-7 font-mono text-[8px] uppercase tracking-[0.18em] text-white/25 md:left-10">
                SPACE / TAP TO JUMP
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            FOOTNOTE
        ================================================= */}

        <motion.div
          className="mt-5 flex items-center justify-between"
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
            delay: 0.2,
            ease:
              EASE_CINEMATIC,
          }}
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-faint">
            OPTIONAL DETOUR
          </span>

          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-faint">
            /GAME
          </span>
        </motion.div>
      </div>
    </section>
  );
}