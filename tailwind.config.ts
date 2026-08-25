import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '480px', // small mobile → mobile
      sm: '650px', // mobile → tablet
      md: '900px', // tablet → small desktop
      lg: '1200px', // small desktop → desktop
    },
    extend: {
      colors: {
        bg: {
          primary: '#050505',
          secondary: '#0A0A0C',
        },
        ink: {
          primary: '#F5F5F5',
          secondary: 'rgba(255,255,255,0.55)',
          muted: 'rgba(255,255,255,0.30)',
          faint: 'rgba(255,255,255,0.16)',
        },
        accent: {
          DEFAULT: '#60A5FA',
          strong: '#3B82F6',
          glow: 'rgba(96,165,250,0.20)',
        },
        hairline: 'rgba(255,255,255,0.06)',
        'hairline-accent': 'rgba(96,165,250,0.30)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        micro: '220ms',
        hover: '380ms',
        reveal: '850ms',
        cinematic: '1200ms',
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      zIndex: {
        cursor: '200',
        nav: '150',
        grain: '90',
      },
    },
  },
  plugins: [],
};

export default config;
