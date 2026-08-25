'use client';

import type {
  SkinId,
  PlayerState,
} from './types';

import styles from '../../components/lunorun/LunoRunGame.module.css';

export default function LunoRunCharacter({
  state,
  skin,
}: {
  state: PlayerState;
  skin: SkinId;
}) {
  const accent =
    skin === 'hacker'
      ? '#66F39D'
      : skin === 'meme'
        ? '#F7B2FF'
        : skin === 'ice'
          ? '#BFE7FF'
          : '#60A5FA';

  const hoodie =
    skin === 'meme'
      ? '#1B1720'
      : skin === 'ice'
        ? '#12202B'
        : '#080A0E';

  const pants = '#141820';
  const hair = '#14171d';

  return (
    <svg
      className={`${styles.character} ${styles[`state-${state}`]}`}
      viewBox="0 0 100 130"
      role="img"
      aria-label="LunoRun player character"
    >
      <ellipse
        className={styles.characterShadow}
        cx="50"
        cy="125"
        rx="20"
        ry="3.5"
      />

      <g className="lr-leg-left">
        <path
          d="M38 82 C37 95 35 104 32 116"
          stroke={pants}
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d="M29 115 C23 118 20 120 18 122 C17 125 25 126 34 124 C39 122 39 118 37 115 Z"
          fill="#E9EEF7"
        />
      </g>

      <g className="lr-leg-right">
        <path
          d="M62 82 C64 94 68 104 70 116"
          stroke={pants}
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d="M68 115 C73 117 79 119 82 121 C83 124 76 126 68 125 C63 124 61 120 64 116 Z"
          fill="#E9EEF7"
        />
      </g>

      <g className="lr-body">
        <path
          d="M30 51 C34 45 40 42 50 42 C60 42 67 45 70 52 L69 85 C64 92 56 96 50 96 C43 96 35 92 30 85 Z"
          fill={hoodie}
        />

        <path
          d="M37 52 C38 46 44 42 50 42 C56 42 62 46 63 52"
          fill="none"
          stroke="#232A33"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M48 58 L52 58"
          stroke={accent}
          strokeWidth="2"
          strokeLinecap="round"
          opacity=".75"
        />
      </g>

      <g className="lr-arm-left">
        <path
          d="M32 55 C26 65 24 74 25 83"
          stroke={hoodie}
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />

        <circle
          cx="25"
          cy="84"
          r="4.2"
          fill="#C8CFD9"
        />
      </g>

      <g className="lr-arm-right">
        <path
          d="M68 55 C74 65 77 74 74 82"
          stroke={hoodie}
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />

        <circle
          cx="74"
          cy="83"
          r="4.2"
          fill="#C8CFD9"
        />
      </g>

      <g className="lr-head">
        <circle
          cx="50"
          cy="29"
          r="20"
          fill="#C8CFD9"
        />

        <path
          d="M31 28 C30 13 40 7 51 9 C63 8 70 17 69 28 C63 24 59 22 52 23 C43 22 37 24 31 28 Z"
          fill={hair}
        />

        <path
          d="M42 31 C44 29 47 29 49 31"
          stroke="#20242B"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M54 31 C56 29 59 29 61 31"
          stroke="#20242B"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M48 38 C50 39 52 39 54 38"
          stroke="#5C6673"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {skin === 'hacker' && (
          <rect
            x="34"
            y="28"
            width="32"
            height="6"
            rx="3"
            fill="#0D1117"
            stroke={accent}
            strokeWidth="1"
            opacity=".9"
          />
        )}

        {skin === 'meme' && (
          <path
            d="M39 40 Q50 44 61 40"
            stroke={accent}
            strokeWidth="2.3"
            fill="none"
            strokeLinecap="round"
          />
        )}

        {skin === 'ice' && (
          <path
            d="M35 22 Q50 12 65 22"
            stroke={accent}
            strokeWidth="1.5"
            fill="none"
            opacity=".65"
          />
        )}
      </g>
    </svg>
  );
}