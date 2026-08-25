'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useMousePositionRef } from '@/hooks/useMousePosition';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn, lerp } from '@/lib/utils';

type CursorMode =
  | 'VIEW'
  | 'EXPLORE'
  | 'OPEN'
  | 'DRAG';

interface HoverTarget {
  element: HTMLElement;
  mode: CursorMode;
}

export default function CustomCursor() {
  const isTouch =
    useIsTouchDevice();

  const prefersReducedMotion =
    usePrefersReducedMotion();

  const mouseRef =
    useMousePositionRef();

  const dotRef =
    useRef<HTMLDivElement>(null);

  const ringRef =
    useRef<HTMLDivElement>(null);

  const followerRef =
    useRef<HTMLDivElement>(null);

  const [label, setLabel] =
    useState<CursorMode | null>(
      null,
    );

  const [mounted, setMounted] =
    useState(false);

  const [active, setActive] =
    useState<HTMLElement | null>(
      null,
    );

  const eased =
    useRef({
      x: 0,
      y: 0,
    });

  const targetPosition =
    useRef({
      x: 0,
      y: 0,
    });

  const rafId =
    useRef<number | null>(
      null,
    );

  useEffect(() => {
    setMounted(true);
  }, []);

  /*
   * Hide the native cursor only on fine pointers.
   */
  useEffect(() => {
    if (isTouch) return;

    document.body.classList.add(
      'cursor-ready',
    );

    return () => {
      document.body.classList.remove(
        'cursor-ready',
      );
    };
  }, [isTouch]);

  /*
   * ---------------------------------------------------------
   * Find the nearest interactive cursor target.
   *
   * Using pointerover/pointerout instead of mouseover/mouseout
   * avoids most label flickering when entering child elements.
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (isTouch) return;

    const getTarget = (
      event: Event,
    ): HoverTarget | null => {
      const target =
        event.target;

      if (
        !(target instanceof
          HTMLElement)
      ) {
        return null;
      }

      const element =
        target.closest(
          '[data-cursor]',
        );

      if (
        !(element instanceof
          HTMLElement)
      ) {
        return null;
      }

      const rawMode =
        element.getAttribute(
          'data-cursor',
        );

      if (
        rawMode !== 'VIEW' &&
        rawMode !== 'EXPLORE' &&
        rawMode !== 'OPEN' &&
        rawMode !== 'DRAG'
      ) {
        return null;
      }

      return {
        element,
        mode: rawMode,
      };
    };

    const handleOver =
      (event: PointerEvent) => {
        const target =
          getTarget(event);

        if (!target) return;

        setActive(
          target.element,
        );

        setLabel(
          target.mode,
        );
      };

    const handleOut =
      (event: PointerEvent) => {
        const current =
          getTarget(event);

        if (!current) return;

        const related =
          event.relatedTarget;

        if (
          related instanceof
          Node &&
          current.element.contains(
            related,
          )
        ) {
          return;
        }

        setActive(null);
        setLabel(null);
      };

    document.addEventListener(
      'pointerover',
      handleOver,
    );

    document.addEventListener(
      'pointerout',
      handleOut,
    );

    return () => {
      document.removeEventListener(
        'pointerover',
        handleOver,
      );

      document.removeEventListener(
        'pointerout',
        handleOut,
      );
    };
  }, [isTouch]);

  /*
   * ---------------------------------------------------------
   * Main cursor animation loop.
   *
   * Direct style writes keep this out of React's render cycle.
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (isTouch) return;

    const loop = () => {
      const target =
        mouseRef.current;

      targetPosition.current.x =
        target.x;

      targetPosition.current.y =
        target.y;

      const factor =
        prefersReducedMotion
          ? 1
          : label
            ? 0.34
            : 0.42;

      eased.current.x =
        lerp(
          eased.current.x,
          targetPosition.current.x,
          factor,
        );

      eased.current.y =
        lerp(
          eased.current.y,
          targetPosition.current.y,
          factor,
        );

      /*
       * Small attraction toward the active element.
       *
       * This does NOT move the real mouse cursor.
       * It only shifts the visual follower slightly.
       */
      let attractionX = 0;
      let attractionY = 0;

      if (
        active &&
        !prefersReducedMotion
      ) {
        const rect =
          active.getBoundingClientRect();

        const centerX =
          rect.left +
          rect.width / 2;

        const centerY =
          rect.top +
          rect.height / 2;

        const dx =
          centerX -
          targetPosition.current.x;

        const dy =
          centerY -
          targetPosition.current.y;

        attractionX =
          clampDistance(
            dx * 0.035,
            18,
          );

        attractionY =
          clampDistance(
            dy * 0.035,
            18,
          );
      }

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate3d(${targetPosition.current.x}px, ${targetPosition.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${eased.current.x + attractionX}px, ${eased.current.y + attractionY}px, 0) translate(-50%, -50%)`;
      }

      if (followerRef.current) {
        followerRef.current.style.transform =
          `translate3d(${eased.current.x}px, ${eased.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current =
        requestAnimationFrame(
          loop,
        );
    };

    rafId.current =
      requestAnimationFrame(
        loop,
      );

    return () => {
      if (
        rafId.current !== null
      ) {
        cancelAnimationFrame(
          rafId.current,
        );
      }
    };
  }, [
    active,
    isTouch,
    label,
    mouseRef,
    prefersReducedMotion,
  ]);

  if (
    !mounted ||
    isTouch
  ) {
    return null;
  }

  const isExpanded =
    Boolean(label);

  const isExplore =
    label === 'EXPLORE';

  const isDrag =
    label === 'DRAG';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-cursor"
    >
      {/* =================================================
          PRECISION DOT
      ================================================= */}

      <div
        ref={dotRef}
        className={cn(
          'fixed left-0 top-0 rounded-full bg-ink-primary',
          'will-change-transform',
          'transition-all duration-[220ms] ease-cinematic',
          isExpanded
            ? 'h-1.5 w-1.5 scale-75 opacity-0'
            : 'h-1.5 w-1.5 opacity-100',
        )}
      />

      {/* =================================================
          SOFT FOLLOWER
      ================================================= */}

      <div
        ref={followerRef}
        className={cn(
          'fixed left-0 top-0 rounded-full',
          'border border-white/[0.08]',
          'will-change-transform',
          'transition-all duration-[450ms] ease-cinematic',
          isExpanded
            ? 'h-24 w-24 opacity-30'
            : 'h-10 w-10 opacity-0',
        )}
      />

      {/* =================================================
          MAIN RING
      ================================================= */}

      <div
        ref={ringRef}
        className={cn(
          'fixed left-0 top-0 flex items-center justify-center rounded-full',
          'border will-change-transform',
          'transition-[width,height,background-color,border-color,box-shadow,transform] duration-[360ms] ease-cinematic',
          !label &&
            'h-8 w-8 border-ink-primary/35 bg-transparent',

          label === 'VIEW' &&
            'h-[68px] w-[68px] border-accent/55 bg-bg-primary/65 backdrop-blur-sm',

          label === 'OPEN' &&
            'h-[64px] w-[64px] border-white/40 bg-bg-primary/60 backdrop-blur-sm',

          label === 'EXPLORE' &&
            'h-[82px] w-[82px] border-accent/70 bg-bg-primary/70 backdrop-blur-sm shadow-[0_0_30px_rgba(96,165,250,0.12)]',

          label === 'DRAG' &&
            'h-[72px] w-[72px] border-white/40 bg-bg-primary/65 backdrop-blur-sm',
        )}
      >
        {label && (
          <div className="flex flex-col items-center justify-center">
            <span
              className={cn(
                'font-mono text-[8px] uppercase tracking-[0.18em]',
                isExplore
                  ? 'text-accent'
                  : 'text-ink-primary',
              )}
            >
              {label}
            </span>

            {isExplore && (
              <span
                className="mt-0.5 text-[11px] leading-none text-accent"
                aria-hidden="true"
              >
                ↗
              </span>
            )}

            {isDrag && (
              <span
                className="mt-0.5 text-[10px] leading-none text-ink-secondary"
                aria-hidden="true"
              >
                ← →
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function clampDistance(
  value: number,
  max: number,
) {
  return Math.max(
    -max,
    Math.min(max, value),
  );
}