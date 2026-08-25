export type GameStatus = 'menu' | 'playing' | 'gameover';
export type PlayerState = 'idle' | 'run' | 'jump' | 'fall' | 'land' | 'hit';
export type SkinId = 'default' | 'hacker' | 'meme' | 'ice';

export interface Player {
  x: number;
  y: number;
  vy: number;
  grounded: boolean;
  jumps: number;
}

export interface Obstacle {
  id: number;
  type: 1 | 2 | 3;
  x: number;
  width: number;
  height: number;
}

export interface LeaderboardEntry {
  rank: number;
  nickname: string;
  distance: number;
}

export const GAME = {
  playerWidth: 46,
  playerHeight: 72,
  initialSpeed: 310,
  maxSpeed: 620,
  speedPerMeter: 0.045,
  gravity: 1900,
  jumpVelocity: 690,
  doubleJumpVelocity: 640,
  minSpawn: 1.05,
  maxSpawn: 1.55,
  groundHeight: 92,
  amirRecord: 8421,
} as const;

export const SKINS: Record<SkinId, { label: string; unlock: number; body: string; accent: string; shoe: string }> = {
  default: {
    label: 'DEFAULT',
    unlock: 0,
    body: '#111318',
    accent: '#60a5fa',
    shoe: '#dce6f2',
  },
  hacker: {
    label: 'HACKER',
    unlock: 1000,
    body: '#0d1110',
    accent: '#66f39d',
    shoe: '#d9ffe9',
  },
  meme: {
    label: 'MØDE',
    unlock: 2500,
    body: '#1b1720',
    accent: '#f7b2ff',
    shoe: '#f7ecff',
  },
  ice: {
    label: 'ICE',
    unlock: 5000,
    body: '#12202b',
    accent: '#bfe7ff',
    shoe: '#f0f9ff',
  },
};
