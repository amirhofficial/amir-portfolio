import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  cursorLabel?: string;
  className?: string;
}

export default function Button({
  href,
  children,
  variant = 'primary',
  cursorLabel = 'OPEN',
  className,
}: ButtonProps) {
  const base =
    'group relative inline-flex min-h-[52px] items-center justify-center gap-3 overflow-visible rounded-[6px] text-meta uppercase tracking-[0.2em] transition-all duration-500 ease-cinematic active:scale-[0.95]';

  if (variant === 'primary') {
    return (
      <a
        href={href}
        data-cursor={cursorLabel}
        className={cn(
          base,
          'button-bubble-primary',
          'border border-accent/65',
          'bg-[linear-gradient(135deg,#0b1830_0%,#12365f_48%,#07111f_100%)]',
          'px-7 py-4',
          'font-bold text-white',
          'shadow-[0_0_24px_rgba(59,130,246,0.22),inset_0_0_22px_rgba(96,165,250,0.08)]',
          'hover:-translate-y-[2px]',
          'hover:border-accent',
          'hover:shadow-[0_0_30px_rgba(59,130,246,0.38),0_0_70px_rgba(31,140,210,0.16),inset_0_0_28px_rgba(96,165,250,0.12)]',
          className,
        )}
      >
        {/* Bubble layers */}
        <span
          aria-hidden="true"
          className="button-bubble button-bubble-top"
        />

        <span
          aria-hidden="true"
          className="button-bubble button-bubble-bottom"
        />

        {/* Shine */}
        <span
          aria-hidden="true"
          className="button-shine"
        />

        <span className="relative z-20 whitespace-nowrap text-[11px] font-extrabold tracking-[0.22em]">
          {children}
        </span>

        <span
          aria-hidden="true"
          className="relative z-20 text-[15px] text-accent/80 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white"
        >
          ↗
        </span>
      </a>
    );
  }

  return (
    <a
      href={href}
      data-cursor={cursorLabel}
      className={cn(
        base,
        'min-h-[52px]',
        'border border-white/[0.12]',
        'bg-white/[0.025]',
        'px-7 py-4',
        'text-ink-secondary',
        'backdrop-blur-sm',
        'hover:-translate-y-[2px]',
        'hover:border-accent/40',
        'hover:bg-accent/[0.055]',
        'hover:text-ink-primary',
        'hover:shadow-[0_0_24px_rgba(96,165,250,0.08)]',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-500 ease-cinematic group-hover:w-full"
      />

      <span className="relative z-10 whitespace-nowrap font-semibold tracking-[0.18em]">
        {children}
      </span>

      <span
        aria-hidden="true"
        className="relative z-10 text-[15px] opacity-45 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
      >
        ↗
      </span>
    </a>
  );
}