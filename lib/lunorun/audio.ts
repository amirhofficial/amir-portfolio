export type LunoRunSound =
  | 'jump'
  | 'doubleJump'
  | 'land'
  | 'hit'
  | 'newBest'
  | 'unlock';

const SOUND_KEY = 'lunorun:sound';
const HAPTICS_KEY = 'lunorun:haptics';

type Settings = {
  sound: boolean;
  haptics: boolean;
};

const defaultSettings: Settings = {
  sound: true,
  haptics: true,
};

function readBoolean(
  key: string,
  fallback: boolean,
) {
  if (
    typeof window === 'undefined'
  ) {
    return fallback;
  }

  const value =
    window.localStorage.getItem(key);

  if (value === null) {
    return fallback;
  }

  return value === 'true';
}

export function getLunoRunSettings(): Settings {
  return {
    sound: readBoolean(
      SOUND_KEY,
      defaultSettings.sound,
    ),
    haptics: readBoolean(
      HAPTICS_KEY,
      defaultSettings.haptics,
    ),
  };
}

export function setSoundEnabled(
  enabled: boolean,
) {
  if (
    typeof window === 'undefined'
  ) {
    return;
  }

  window.localStorage.setItem(
    SOUND_KEY,
    String(enabled),
  );
}

export function setHapticsEnabled(
  enabled: boolean,
) {
  if (
    typeof window === 'undefined'
  ) {
    return;
  }

  window.localStorage.setItem(
    HAPTICS_KEY,
    String(enabled),
  );
}

/* =========================================================
   HAPTICS
========================================================= */

function vibrate(
  pattern: number | number[],
) {
  if (
    typeof navigator === 'undefined'
  ) {
    return;
  }

  if (
    !('vibrate' in navigator)
  ) {
    return;
  }

  const settings =
    getLunoRunSettings();

  if (!settings.haptics) {
    return;
  }

  try {
    navigator.vibrate(pattern);
  } catch {
    // Haptics are optional.
  }
}

export function playHaptic(
  sound: LunoRunSound,
) {
  switch (sound) {
    case 'jump':
      vibrate(8);
      break;

    case 'doubleJump':
      vibrate(12);
      break;

    case 'land':
      vibrate(16);
      break;

    case 'hit':
      vibrate(40);
      break;

    case 'newBest':
      vibrate([18, 40, 18]);
      break;

    case 'unlock':
      vibrate([12, 30, 12]);
      break;
  }
}

/* =========================================================
   LIGHTWEIGHT SYNTH AUDIO
========================================================= */

let audioContext:
  | AudioContext
  | null = null;

function getAudioContext() {
  if (
    typeof window === 'undefined'
  ) {
    return null;
  }

  const AudioContextClass =
    window.AudioContext ||
    (
      window as typeof window & {
        webkitAudioContext?: typeof AudioContext;
      }
    ).webkitAudioContext;

  if (!AudioContextClass) {
    return null;
  }

  if (!audioContext) {
    audioContext =
      new AudioContextClass();
  }

  return audioContext;
}

async function unlockAudio() {
  const context =
    getAudioContext();

  if (!context) {
    return;
  }

  if (
    context.state ===
    'suspended'
  ) {
    try {
      await context.resume();
    } catch {
      // Ignore browser audio restrictions.
    }
  }
}

function tone(
  frequency: number,
  duration: number,
  volume: number,
  type: OscillatorType = 'sine',
  endFrequency?: number,
) {
  const context =
    getAudioContext();

  if (!context) {
    return;
  }

  const settings =
    getLunoRunSettings();

  if (!settings.sound) {
    return;
  }

  const now =
    context.currentTime;

  const oscillator =
    context.createOscillator();

  const gain =
    context.createGain();

  oscillator.type = type;

  oscillator.frequency.setValueAtTime(
    frequency,
    now,
  );

  if (
    endFrequency !== undefined
  ) {
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(
        20,
        endFrequency,
      ),
      now + duration,
    );
  }

  gain.gain.setValueAtTime(
    0.0001,
    now,
  );

  gain.gain.exponentialRampToValueAtTime(
  Math.min(volume * 1.7, 0.95),
  now + 0.008,
);

  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    now + duration,
  );

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(now);
  oscillator.stop(
    now + duration + 0.02,
  );
}

/* =========================================================
   PUBLIC SOUND API
========================================================= */

export async function playLunoRunSound(
  sound: LunoRunSound,
) {
  await unlockAudio();

  switch (sound) {
    case 'jump':
      tone(
        280,
        0.11,
        0.08,
        'sine',
        520,
      );
      break;

    case 'doubleJump':
      tone(
        430,
        0.13,
        0.04,
        'triangle',
        760,
      );
      break;

    case 'land':
      tone(
        95,
        0.075,
        0.025,
        'sine',
        65,
      );
      break;

    case 'hit':
      tone(
        120,
        0.16,
        0.05,
        'sawtooth',
        52,
      );
      break;

    case 'newBest':
      tone(
        520,
        0.12,
        0.035,
        'sine',
        760,
      );

      window.setTimeout(
        () => {
          tone(
            760,
            0.16,
            0.04,
            'sine',
            1040,
          );
        },
        90,
      );

      break;

    case 'unlock':
      tone(
        440,
        0.11,
        0.03,
        'triangle',
        660,
      );

      window.setTimeout(
        () => {
          tone(
            660,
            0.14,
            0.035,
            'triangle',
            880,
          );
        },
        100,
      );

      break;
  }

  playHaptic(sound);
}