'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function ScrollIndicator() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div aria-hidden="true" className="flex flex-col items-center gap-3">
      <span className="text-meta uppercase tracking-widest2 [writing-mode:vertical-lr]">Scroll</span>
      <motion.span
        className="block h-10 w-px bg-gradient-to-b from-ink-faint to-transparent"
        animate={prefersReducedMotion ? undefined : { y: [0, 10, 0], opacity: [0.9, 0.3, 0.9] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
