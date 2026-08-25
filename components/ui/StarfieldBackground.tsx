'use client';

import { useEffect, useRef } from 'react';

export default function StarfieldBackground() {
  const rootRef =
    useRef<HTMLDivElement>(null);

  const scrollRef =
    useRef(0);

  useEffect(() => {
    const root =
      rootRef.current;

    if (!root) {
      return;
    }

    let ticking = false;

    const update = () => {
      const scroll =
        scrollRef.current;

      root.style.setProperty(
        '--star-scroll',
        `${Math.min(
          scroll * 0.018,
          220,
        )}px`,
      );

      root.style.setProperty(
        '--star-depth',
        `${Math.min(
          scroll * 0.006,
          70,
        )}px`,
      );

      ticking = false;
    };

    const handleScroll = () => {
      scrollRef.current =
        window.scrollY;

      /*
       * Only update once per
       * browser paint instead of
       * running a permanent RAF loop.
       */
      if (!ticking) {
        ticking = true;

        requestAnimationFrame(
          update,
        );
      }
    };

    /*
     * Initial state.
     */
    scrollRef.current =
      window.scrollY;

    update();

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      );
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="starfield"
    >
      <div className="starfield-nebula" />

      <div className="starfield-layer starfield-layer-back" />

      <div className="starfield-layer starfield-layer-mid" />

      <div className="starfield-layer starfield-layer-front" />

      <div className="starfield-vignette" />
    </div>
  );
}