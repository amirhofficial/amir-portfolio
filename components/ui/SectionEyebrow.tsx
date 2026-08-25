'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionEyebrowProps {
  index: string;
  label: string;
  className?: string;
}

export default function SectionEyebrow({
  index,
  label,
  className,
}: SectionEyebrowProps) {
  return (
    <motion.div
      className={cn(
        'group inline-flex items-center gap-3',
        className,
      )}
      initial={{
        opacity: 0,
        y: 8,
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
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Index */}

      <span
        className="
          font-mono
          text-[9px]
          font-medium
          tracking-[0.18em]
          text-ink-faint
          transition-colors
          duration-300
          group-hover:text-accent
        "
      >
        {index.padStart(2, '0')}
      </span>

      {/* Accent marker */}

      <span
        aria-hidden="true"
        className="
          relative
          block
          h-px
          w-8
          overflow-hidden
          bg-hairline
          transition-all
          duration-500
          ease-cinematic
          group-hover:w-12
        "
      >
        <span
          className="
            absolute
            inset-y-0
            left-0
            w-0
            bg-accent
            transition-[width]
            duration-500
            ease-cinematic
            group-hover:w-full
          "
        />
      </span>

      {/* Label */}

      <span
        className="
          text-eyebrow
          uppercase
          tracking-[0.18em]
          text-ink-secondary
          transition-colors
          duration-300
          group-hover:text-ink-primary
        "
      >
        {label}
      </span>

      {/* Tiny status dot */}

      <span
        aria-hidden="true"
        className="
          ml-1
          h-1.5
          w-1.5
          rounded-full
          bg-ink-faint/40
          transition-all
          duration-500
          group-hover:scale-125
          group-hover:bg-accent
          group-hover:shadow-[0_0_10px_rgba(96,165,250,0.35)]
        "
      />
    </motion.div>
  );
}