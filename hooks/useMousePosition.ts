'use client';

import { useEffect, useRef } from 'react';

export interface MousePositionRef {
  x: number;
  y: number;
  /** -1..1 normalized against the viewport center. */
  nx: number;
  ny: number;
}

/**
 * Tracks the pointer position in a ref (not state) so consumers can read it
 * inside a requestAnimationFrame loop without triggering React re-renders
 * on every pixel of mouse movement. One listener, shared by every reader.
 */
export function useMousePositionRef(): React.MutableRefObject<MousePositionRef> {
  const positionRef = useRef<MousePositionRef>({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const { innerWidth, innerHeight } = window;
      positionRef.current = {
        x: event.clientX,
        y: event.clientY,
        nx: (event.clientX / innerWidth) * 2 - 1,
        ny: (event.clientY / innerHeight) * 2 - 1,
      };
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return positionRef;
}
