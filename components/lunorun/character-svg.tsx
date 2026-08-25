'use client';

import styles from './character-svg.module.css';
import type { PlayerState, SkinId } from '@/lib/lunorun/types';
import { SKINS } from '@/lib/lunorun/types';

interface Props {
  state: PlayerState;
  skin: SkinId;
}

export default function LunoRunCharacter({ state, skin }: Props) {
  const palette = SKINS[skin];
  const rootClass = [styles.character, styles[`state-${state}`]].join(' ');

  return (
    <svg
      className={rootClass}
      viewBox="0 0 120 160"
      width="120"
      height="160"
      role="img"
      aria-label="LunoRun runner"
    >
      <ellipse className={styles.shadow} cx="60" cy="151" rx="27" ry="5" />

      <g className={styles.legs}>
        <g className={styles.leftLeg}>
          <path d="M48 106 C44 121 42 132 37 145" className={styles.pants} />
          <path d="M31 145 C39 142 47 143 51 148 L48 153 L28 153 C26 150 27 147 31 145Z" fill={palette.shoe} />
        </g>
        <g className={styles.rightLeg}>
          <path d="M70 106 C73 121 78 132 84 145" className={styles.pants} />
          <path d="M78 145 C86 142 96 145 98 150 L95 154 L76 154 C74 151 75 147 78 145Z" fill={palette.shoe} />
        </g>
      </g>

      <g className={styles.body}>
        <path
          d="M38 65 C40 57 49 52 60 52 C71 52 80 57 83 66 L78 113 C71 119 50 119 42 113Z"
          fill={palette.body}
        />
        <path d="M48 58 C49 49 53 46 60 46 C67 46 72 50 73 58" className={styles.hoodie} />
        <path d="M59 62 L60 103" stroke={palette.accent} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      </g>

      <g className={styles.arms}>
        <path className={styles.leftArm} d="M41 68 C31 76 28 91 24 103" stroke={palette.body} strokeWidth="13" strokeLinecap="round" />
        <path className={styles.rightArm} d="M79 68 C88 77 92 89 95 102" stroke={palette.body} strokeWidth="13" strokeLinecap="round" />
      </g>

      <g className={styles.headGroup}>
        <path d="M42 26 C47 10 74 7 82 25 L78 51 C71 61 50 60 43 50Z" fill="#c88f70" />
        <path d="M42 29 C42 13 51 7 63 7 C76 7 83 15 81 29 C73 24 68 20 60 20 C53 20 48 24 42 29Z" fill="#111318" />
        <circle cx="54" cy="36" r="2.2" fill="#101216" />
        <circle cx="70" cy="36" r="2.2" fill="#101216" />
        <path d="M57 46 C61 48 65 48 68 46" fill="none" stroke="#663f32" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M79 28 L88 31" stroke={palette.accent} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      </g>
    </svg>
  );
}
