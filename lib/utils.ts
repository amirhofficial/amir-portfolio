/** Joins class names, skipping falsy values. Deliberately dependency-free. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Shared easing curve used across the motion system. */
export const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Shared duration tokens (seconds) matching the motion timing spec. */
export const DURATION = {
  micro: 0.22,
  hover: 0.38,
  reveal: 0.85,
  cinematic: 1.2,
} as const;

/** Linear interpolation, used by the cursor and Orb for smoothed motion. */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/** Clamp a value between a min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
