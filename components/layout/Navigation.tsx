'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';

import Image from 'next/image';

import {
  DURATION,
  EASE_CINEMATIC,
} from '@/lib/utils';

import { useLanguage } from '@/lib/language';
import { translations } from '@/lib/translations';

export default function Navigation() {
  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    isPlaying,
    setIsPlaying,
  ] = useState(false);

  const [
    isMuted,
    setIsMuted,
  ] = useState(false);

  const {
    language,
  } = useLanguage();

  const t =
    translations[language];

  const navLinks = [
    {
      label: t.nav.about,
      href: '#about',
    },
    {
      label:
        t.nav.capabilities,
      href: '#capabilities',
    },
    {
      label: t.nav.work,
      href: '#work',
    },
    {
      label:
        t.nav.process,
      href: '#process',
    },
    {
      label:
        t.nav.contact,
      href: '#contact',
    },
  ];

  const { scrollY } =
    useScroll();

  const background =
    useTransform(
      scrollY,
      [0, 140],
      [
        'rgba(5,5,5,0)',
        'rgba(5,5,5,0.78)',
      ],
    );

  const borderOpacity =
    useTransform(
      scrollY,
      [0, 140],
      [0, 1],
    );

  /*
   * ---------------------------------------------------------
   * RECEIVE MUSIC STATE
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const handleStateChange =
      (event: Event) => {
        const customEvent =
          event as CustomEvent<{
            isPlaying: boolean;
            isMuted: boolean;
          }>;

        setIsPlaying(
          customEvent.detail
            ?.isPlaying ??
            false,
        );

        setIsMuted(
          customEvent.detail
            ?.isMuted ??
            false,
        );
      };

    window.addEventListener(
      'music-state-change',
      handleStateChange,
    );

    return () => {
      window.removeEventListener(
        'music-state-change',
        handleStateChange,
      );
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * SOUND TOGGLE
   * ---------------------------------------------------------
   */

  const toggleMute = () => {
    window.dispatchEvent(
      new CustomEvent(
        'music-toggle-mute',
      ),
    );
  };

  return (
    <>
      <motion.header
        style={{
          backgroundColor:
            background,
        }}
        className="fixed inset-x-0 top-0 z-nav backdrop-blur-md"
      >
        <motion.div
          aria-hidden="true"
          style={{
            opacity:
              borderOpacity,
          }}
          className="absolute inset-x-0 bottom-0 h-px bg-hairline"
        />

        <nav
          aria-label={
            language === 'fa'
              ? 'منوی اصلی'
              : 'Primary'
          }
          className="section-inner flex items-center justify-between px-6 py-5 md:px-10"
        >
          {/* =================================================
              BRAND
          ================================================= */}

          <a
            href="#hero"
            data-cursor="OPEN"
            aria-label="Amir Heidari"
            className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-hairline-accent md:h-25 md:w-25"
          >
            <Image
              src="/amir.jpg"
              alt="Amir Heidari"
              fill
              priority
              sizes="80px"
              className="object-cover"
            />
          </a>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div className="hidden items-center gap-6 md:flex">
            <ul className="flex items-center gap-8 lg:gap-10">
              {navLinks.map(
                (link) => (
                  <li
                    key={
                      link.href
                    }
                  >
                    <a
                      href={
                        link.href
                      }
                      data-cursor="OPEN"
                      className="text-meta uppercase tracking-widest2 text-ink-secondary transition-colors duration-hover hover:text-ink-primary"
                    >
                      {
                        link.label
                      }
                    </a>
                  </li>
                ),
              )}
            </ul>

            {/* =================================================
                SOUND CONTROL
            ================================================= */}

            <button
              type="button"
              onClick={
                toggleMute
              }
              aria-label={
                isMuted
                  ? 'Turn sound on'
                  : 'Mute sound'
              }
              aria-pressed={
                isMuted
              }
              data-cursor="OPEN"
              className={[
                'nav-sound-toggle',
                isPlaying
                  ? 'nav-sound-playing'
                  : '',
                isMuted
                  ? 'nav-sound-muted'
                  : '',
              ].join(' ')}
            >
              <span
                className="nav-sound-icon"
                aria-hidden="true"
              >
                {isMuted
                  ? '×'
                  : '◖'}
              </span>

              <span className="nav-sound-label">
                {isMuted
                  ? 'MUTE'
                  : isPlaying
                    ? 'SOUND'
                    : 'OFF'}
              </span>

              <span
                className="nav-sound-bars"
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
              </span>
            </button>
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() =>
              setOpen(
                (prev) =>
                  !prev,
              )
            }
            aria-expanded={
              open
            }
            aria-controls="mobile-menu"
            aria-label={
              open
                ? language ===
                  'fa'
                  ? 'بستن منو'
                  : 'Close menu'
                : language ===
                    'fa'
                  ? 'باز کردن منو'
                  : 'Open menu'
            }
            className="relative z-nav flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={[
                'block h-px w-5 bg-ink-primary transition-transform duration-hover ease-cinematic',
                open
                  ? 'translate-y-[3px] rotate-45'
                  : '',
              ].join(' ')}
            />

            <span
              className={[
                'block h-px w-5 bg-ink-primary transition-transform duration-hover ease-cinematic',
                open
                  ? '-translate-y-[3px] -rotate-45'
                  : '',
              ].join(' ')}
            />
          </button>
        </nav>
      </motion.header>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration:
                DURATION.hover,
              ease:
                EASE_CINEMATIC,
            }}
            className="fixed inset-0 z-[140] flex flex-col items-center justify-center gap-7 bg-bg-primary md:hidden"
          >
            {navLinks.map(
              (
                link,
                i,
              ) => (
                <motion.a
                  key={
                    link.href
                  }
                  href={
                    link.href
                  }
                  onClick={() =>
                    setOpen(
                      false,
                    )
                  }
                  initial={{
                    opacity: 0,
                    y: 16,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay:
                      i *
                      0.05,
                    duration:
                      DURATION.hover,
                    ease:
                      EASE_CINEMATIC,
                  }}
                  className="font-display text-[32px] uppercase text-ink-primary"
                >
                  {
                    link.label
                  }
                </motion.a>
              ),
            )}

            {/* =================================================
                MOBILE SOUND
            ================================================= */}

            <motion.button
              type="button"
              onClick={
                toggleMute
              }
              aria-label={
                isMuted
                  ? 'Turn sound on'
                  : 'Mute sound'
              }
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  navLinks.length *
                    0.05 +
                  0.08,
                duration:
                  DURATION.hover,
                ease:
                  EASE_CINEMATIC,
              }}
              className={[
                'nav-sound-mobile',
                isPlaying
                  ? 'nav-sound-playing'
                  : '',
                isMuted
                  ? 'nav-sound-muted'
                  : '',
              ].join(' ')}
            >
              <span>
                {isMuted
                  ? '×'
                  : '◖'}
              </span>

              <span>
                {isMuted
                  ? 'SOUND OFF'
                  : isPlaying
                    ? 'SOUND ON'
                    : 'SOUND OFF'}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}