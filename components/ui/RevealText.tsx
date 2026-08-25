'use client';

import {
  motion,
  type HTMLMotionProps,
} from 'framer-motion';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

import {
  DURATION,
  EASE_CINEMATIC,
} from '@/lib/utils';

type Tag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'p'
  | 'span';

interface RevealTextProps {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;

  /**
   * 'reveal' for section headings.
   * 'cinematic' for hero-scale statements.
   */
  speed?: 'reveal' | 'cinematic';

  /**
   * 'view': reveal when the component
   * enters the viewport.
   * 'mount': reveal immediately.
   */
  trigger?: 'view' | 'mount';
}

const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} satisfies Record<
  Tag,
  React.ComponentType<HTMLMotionProps<any>>
>;

/*
 * Detect Persian / Arabic text.
 *
 * Arabic block:
 * U+0600–U+06FF
 * Persian supplementary:
 * U+FB50–U+FDFF
 * Arabic presentation:
 * U+FE70–U+FEFF
 */
function isPersianText(text: string) {
  return /[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(
    text,
  );
}

export default function RevealText({
  text,
  as = 'span',
  className,
  delay = 0,
  stagger = 0.045,
  speed = 'reveal',
  trigger = 'view',
}: RevealTextProps) {
  const prefersReducedMotion =
    usePrefersReducedMotion();

  const words = text.split(' ');

  const MotionTag =
    MOTION_TAGS[as];

  const duration =
    speed === 'cinematic'
      ? DURATION.cinematic
      : DURATION.reveal;

  const isPersian =
    isPersianText(text);

  /*
   * Persian glyphs often extend outside
   * the normal Latin line box.
   *
   * We give the clipping area a little
   * extra vertical room without changing
   * the actual layout.
   */
  const wordWrapperStyle: React.CSSProperties =
    isPersian
      ? {
          display: 'inline-block',
          overflow: 'hidden',
          verticalAlign: 'top',
          paddingTop: '0.16em',
          paddingBottom: '0.16em',
          marginTop: '-0.16em',
          marginBottom: '-0.16em',
        }
      : {
          display: 'inline-block',
          overflow: 'hidden',
          verticalAlign: 'top',
        };

  const wordMotionStyle: React.CSSProperties =
    isPersian
      ? {
          display: 'inline-block',
          willChange:
            'transform, opacity',
          lineHeight: 1.2,
        }
      : {
          display: 'inline-block',
          willChange:
            'transform, opacity',
        };

  const containerVariants = {
    hidden: {},
    visible: {},
  };

  const wordVariants = {
    hidden: {
      y: isPersian
        ? '115%'
        : '110%',
      opacity: 0,
    },

    visible: (index: number) => ({
      y: '0%',
      opacity: 1,

      transition: {
        duration,
        delay:
          delay +
          index * stagger,
        ease: EASE_CINEMATIC,
      },
    }),
  };

  /*
   * REDUCED MOTION
   */

  if (prefersReducedMotion) {
    return (
      <MotionTag
        className={className}
        aria-label={text}
        dir={
          isPersian
            ? 'rtl'
            : 'ltr'
        }
      >
        <span aria-hidden="true">
          {words.map(
            (word, i) => (
              <span
                key={`${word}-${i}`}
                style={{
                  display:
                    'inline-block',
                  lineHeight:
                    isPersian
                      ? 1.2
                      : undefined,
                }}
              >
                {word}

                {i <
                words.length - 1
                  ? '\u00A0'
                  : ''}
              </span>
            ),
          )}
        </span>
      </MotionTag>
    );
  }

  /*
   * MOUNT
   */

  if (trigger === 'mount') {
    return (
      <MotionTag
        className={className}
        aria-label={text}
        dir={
          isPersian
            ? 'rtl'
            : 'ltr'
        }
        initial="hidden"
        animate="visible"
        variants={
          containerVariants
        }
      >
        <span aria-hidden="true">
          {words.map(
            (word, i) => (
              <span
                key={`${word}-${i}`}
                style={
                  wordWrapperStyle
                }
              >
                <motion.span
                  custom={i}
                  variants={
                    wordVariants
                  }
                  style={
                    wordMotionStyle
                  }
                >
                  {word}

                  {i <
                  words.length - 1
                    ? '\u00A0'
                    : ''}
                </motion.span>
              </span>
            ),
          )}
        </span>
      </MotionTag>
    );
  }

  /*
   * VIEW
   */

  return (
    <MotionTag
      className={className}
      aria-label={text}
      dir={
        isPersian
          ? 'rtl'
          : 'ltr'
      }
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin:
          '-10% 0px -10% 0px',
      }}
      variants={
        containerVariants
      }
    >
      <span aria-hidden="true">
        {words.map(
          (word, i) => (
            <span
              key={`${word}-${i}`}
              style={
                wordWrapperStyle
              }
            >
              <motion.span
                custom={i}
                variants={
                  wordVariants
                }
                style={
                  wordMotionStyle
                }
              >
                {word}

                {i <
                words.length - 1
                  ? '\u00A0'
                  : ''}
              </motion.span>
            </span>
          ),
        )}
      </span>
    </MotionTag>
  );
}