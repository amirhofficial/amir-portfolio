'use client';

import { useEffect, useState } from 'react';

/** True for coarse-pointer / no-hover devices (phones, tablets). */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(pointer: coarse), (hover: none)');
    setIsTouch(query.matches);

    function handleChange(event: MediaQueryListEvent) {
      setIsTouch(event.matches);
    }

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return isTouch;
}
