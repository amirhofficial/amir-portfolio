'use client';

import { useEffect } from 'react';
import LunoRunGame from '@/components/lunorun/LunoRunGame';

export default function LunoRunPage() {
  useEffect(() => {
    /*
     * Keep the original portfolio cursor system intact,
     * but disable it only while /game is mounted.
     */
    document.documentElement.classList.add(
      'lunorun-page',
    );

    return () => {
      document.documentElement.classList.remove(
        'lunorun-page',
      );
    };
  }, []);

  return <LunoRunGame />;
}