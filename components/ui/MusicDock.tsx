'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

type Track = {
  id: number;
  title: string;
  artist: string;
  src: string;
  gain?: number;
};

const TRACKS: Track[] = [
  {
    id: 1,
    title: 'Snowfall',
    artist: 'One Heart',
    src: '/music/snowfall.mp3',
    gain: 1.6,
  },
  {
    id: 2,
    title: 'No One Noticed',
    artist: 'Marisa',
    src: '/music/No One Noticed.mp3',
    gain: 1,
  },
  {
    id: 3,
    title: '505',
    artist: 'Arctic Monkeys',
    src: '/music/Arctic Monkeys - 505.mp3',
    gain: 1,
  },
];

export default function MusicDock() {
  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const audioContextRef =
    useRef<AudioContext | null>(null);

  const gainNodeRef =
    useRef<GainNode | null>(null);

  const scrollLockRef =
    useRef(false);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [isOpen, setIsOpen] =
    useState(false);

  const [isMuted, setIsMuted] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [volume, setVolume] =
    useState(0.65);

  const currentTrack =
    TRACKS[activeIndex];

  /* =========================================================
     AUDIO SETUP
  ========================================================= */

  const setupAudio = () => {
    const audio =
      audioRef.current;

    if (!audio) {
      return null;
    }

    if (
      audioContextRef.current &&
      gainNodeRef.current
    ) {
      return audioContextRef.current;
    }

    const AudioContextClass =
      window.AudioContext ??
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextClass) {
      return null;
    }

    const context =
      new AudioContextClass();

    const source =
      context.createMediaElementSource(
        audio,
      );

    const gain =
      context.createGain();

    source.connect(gain);
    gain.connect(
      context.destination,
    );

    audioContextRef.current =
      context;

    gainNodeRef.current =
      gain;

    return context;
  };

  const updateGain = (
    track: Track = currentTrack,
  ) => {
    if (!gainNodeRef.current) {
      return;
    }

    const trackGain =
      track.gain ?? 1;

    gainNodeRef.current.gain.value =
      isMuted
        ? 0
        : trackGain * volume;
  };

  useEffect(() => {
    updateGain();
  }, [
    activeIndex,
    volume,
    isMuted,
  ]);

  /* =========================================================
     AUTO-COLLAPSE ON SCROLL
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      if (!isPlaying) {
        return;
      }

      if (scrollLockRef.current) {
        return;
      }

      scrollLockRef.current = true;

      setIsOpen(false);

      window.setTimeout(() => {
        scrollLockRef.current = false;
      }, 180);
    };

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        'scroll',
        handleScroll,
      );
    };
  }, [isPlaying]);

  /* =========================================================
     AUDIO EVENTS
  ========================================================= */

  useEffect(() => {
    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }

    const handleTimeUpdate =
      () => {
        if (
          !audio.duration ||
          !Number.isFinite(
            audio.duration,
          )
        ) {
          setProgress(0);
          return;
        }

        setProgress(
          (audio.currentTime /
            audio.duration) *
            100,
        );
      };

    const handleEnded =
      () => {
        setActiveIndex(
          (current) =>
            (current + 1) %
            TRACKS.length,
        );
      };

    const handlePlay =
      () => {
        setIsPlaying(true);
      };

    const handlePause =
      () => {
        setIsPlaying(false);
      };

    audio.addEventListener(
      'timeupdate',
      handleTimeUpdate,
    );

    audio.addEventListener(
      'ended',
      handleEnded,
    );

    audio.addEventListener(
      'play',
      handlePlay,
    );

    audio.addEventListener(
      'pause',
      handlePause,
    );

    return () => {
      audio.removeEventListener(
        'timeupdate',
        handleTimeUpdate,
      );

      audio.removeEventListener(
        'ended',
        handleEnded,
      );

      audio.removeEventListener(
        'play',
        handlePlay,
      );

      audio.removeEventListener(
        'pause',
        handlePause,
      );
    };
  }, []);

  /* =========================================================
     TRACK CHANGE
  ========================================================= */

  useEffect(() => {
    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;

    setProgress(0);

    updateGain(
      TRACKS[activeIndex],
    );

    if (!isPlaying) {
      return;
    }

    audio.play().catch(() => {
      setIsPlaying(false);
    });
  }, [activeIndex]);

  /* =========================================================
     NAVIGATION SYNC
  ========================================================= */

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(
        'music-state-change',
        {
          detail: {
            isPlaying,
            isMuted,
          },
        },
      ),
    );
  }, [
    isPlaying,
    isMuted,
  ]);

  /* =========================================================
     NAVIGATION MUTE
  ========================================================= */

  useEffect(() => {
    const handleMuteToggle =
      () => {
        setIsMuted(
          (current) => !current,
        );
      };

    window.addEventListener(
      'music-toggle-mute',
      handleMuteToggle,
    );

    return () => {
      window.removeEventListener(
        'music-toggle-mute',
        handleMuteToggle,
      );
    };
  }, []);

  /* =========================================================
     PLAY
  ========================================================= */

  const playTrack =
    async () => {
      const audio =
        audioRef.current;

      if (!audio) {
        return;
      }

      const context =
        setupAudio();

      if (
        context &&
        context.state ===
          'suspended'
      ) {
        try {
          await context.resume();
        } catch {}
      }

      updateGain();

      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

  const togglePlay =
    async () => {
      const audio =
        audioRef.current;

      if (!audio) {
        return;
      }

      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        return;
      }

      await playTrack();
    };

  /* =========================================================
     OPEN
  ========================================================= */

  const openPlayer = () => {
    setIsOpen(true);
  };

  /* =========================================================
     MUTE
  ========================================================= */

  const toggleMute =
    () => {
      setIsMuted(
        (current) => !current,
      );
    };

  /* =========================================================
     SELECT TRACK
  ========================================================= */

  const selectTrack =
    async (
      index: number,
    ) => {
      setActiveIndex(index);
      setIsOpen(true);

      const audio =
        audioRef.current;

      if (!audio) {
        return;
      }

      const context =
        setupAudio();

      if (
        context &&
        context.state ===
          'suspended'
      ) {
        try {
          await context.resume();
        } catch {}
      }

      audio.currentTime = 0;

      updateGain(
        TRACKS[index],
      );

      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

  const nextTrack =
    async () => {
      await selectTrack(
        (activeIndex + 1) %
          TRACKS.length,
      );
    };

  const previousTrack =
    async () => {
      await selectTrack(
        (activeIndex -
          1 +
          TRACKS.length) %
          TRACKS.length,
      );
    };

  /* =========================================================
     SEEK
  ========================================================= */

  const seek =
    (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const audio =
        audioRef.current;

      if (
        !audio ||
        !audio.duration
      ) {
        return;
      }

      const value =
        Number(
          event.target.value,
        );

      audio.currentTime =
        (value / 100) *
        audio.duration;

      setProgress(value);
    };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
      />

      {/* =====================================================
          MOBILE INLINE TRIGGER
      ===================================================== */}

      <div className="music-mobile-anchor">
        <button
          type="button"
          onClick={
            isPlaying
              ? openPlayer
              : async () => {
                  setIsOpen(true);
                  await playTrack();
                }
          }
          className="music-mobile-trigger"
          aria-label={
            isPlaying
              ? 'Open music player'
              : 'Tap to play music'
          }
        >
          <span className="music-mobile-disc">
            ♪
          </span>

          <span className="music-mobile-copy">
            <small>
              {isPlaying
                ? 'NOW PLAYING'
                : 'MUSIC'}
            </small>

            <strong>
              {isPlaying
                ? currentTrack.title
                : 'TAP TO PLAY MUSIC'}
            </strong>
          </span>

          <span className="music-mobile-wave">
            <i />
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>

      {/* =====================================================
          DESKTOP COMPACT FLOATING BUTTON
      ===================================================== */}

      <div className="music-desktop-float">
        {!isOpen ? (
          <div className="music-desktop-compact">
            <button
              type="button"
              onClick={
                isPlaying
                  ? openPlayer
                  : async () => {
                      setIsOpen(true);
                      await playTrack();
                    }
              }
              className="music-compact-main"
              aria-label={
                isPlaying
                  ? 'Open music player'
                  : 'Play music'
              }
            >
              <span className="music-compact-disc">
                ♪
              </span>

              <span className="music-compact-copy">
                <small>
                  {isPlaying
                    ? 'PLAYING'
                    : 'MUSIC'}
                </small>

                <strong>
                  {isPlaying
                    ? currentTrack.title
                    : 'PLAY MUSIC'}
                </strong>
              </span>
            </button>

            <button
              type="button"
              onClick={
                toggleMute
              }
              className={[
                'music-compact-mute',
                isMuted
                  ? 'is-muted'
                  : '',
              ].join(' ')}
              aria-label={
                isMuted
                  ? 'Unmute music'
                  : 'Mute music'
              }
            >
              {isMuted
                ? '×'
                : '♫'}
            </button>
          </div>
        ) : (
          <div className="music-full-panel">

            {/* RECORD */}

            <div className="music-full-record-wrap">
              <div
                className={[
                  'music-full-record',
                  isPlaying
                    ? 'is-spinning'
                    : '',
                ].join(' ')}
              >
                <span className="music-full-record-stars" />
                <span className="music-full-record-lines" />

                <span className="music-full-record-center">
                  <span />
                </span>
              </div>
            </div>

            {/* HEADER */}

            <div className="music-full-header">
              <div>
                <small>
                  {isPlaying
                    ? 'NOW PLAYING'
                    : 'MUSIC'}
                </small>

                <strong>
                  {currentTrack.title}
                </strong>

                <span>
                  {currentTrack.artist}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setIsOpen(false)
                }
                aria-label="Close music player"
              >
                ×
              </button>
            </div>

            {/* WAVE */}

            <div className="music-full-wave">
              {Array.from({
                length: 13,
              }).map(
                (_, index) => (
                  <i
                    key={index}
                    className={
                      isPlaying &&
                      !isMuted
                        ? 'is-active'
                        : ''
                    }
                    style={
                      {
                        '--wave-h':
                          `${18 + ((index * 17) % 55)}%`,
                        '--wave-d':
                          `${(index % 6) * -0.12}s`,
                      } as React.CSSProperties
                    }
                  />
                ),
              )}
            </div>

            {/* PROGRESS */}

            <div className="music-full-progress">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={seek}
                aria-label="Track progress"
              />
            </div>

            {/* CONTROLS */}

            <div className="music-full-controls">
              <button
                type="button"
                onClick={
                  previousTrack
                }
                aria-label="Previous track"
              >
                ‹‹
              </button>

              <button
                type="button"
                onClick={
                  togglePlay
                }
                className="music-full-play"
                aria-label={
                  isPlaying
                    ? 'Pause'
                    : 'Play'
                }
              >
                {isPlaying
                  ? 'Ⅱ'
                  : '▶'}
              </button>

              <button
                type="button"
                onClick={
                  nextTrack
                }
                aria-label="Next track"
              >
                ››
              </button>

              <button
                type="button"
                onClick={
                  toggleMute
                }
                className={
                  isMuted
                    ? 'is-muted'
                    : ''
                }
                aria-label={
                  isMuted
                    ? 'Unmute'
                    : 'Mute'
                }
              >
                {isMuted
                  ? '×'
                  : '♫'}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(
                  event,
                ) =>
                  setVolume(
                    Number(
                      event.target
                        .value,
                    ),
                  )
                }
                aria-label="Volume"
              />
            </div>

            {/* PLAYLIST */}

            <div className="music-full-playlist">
              <div className="music-full-playlist-head">
                <span>
                  PLAYLIST
                </span>

                <span>
                  {String(
                    activeIndex + 1,
                  ).padStart(
                    2,
                    '0',
                  )}{' '}
                  /{' '}
                  {String(
                    TRACKS.length,
                  ).padStart(
                    2,
                    '0',
                  )}
                </span>
              </div>

              {TRACKS.map(
                (
                  track,
                  index,
                ) => (
                  <button
                    type="button"
                    key={track.id}
                    onClick={() =>
                      selectTrack(
                        index,
                      )
                    }
                    className={
                      index ===
                      activeIndex
                        ? 'is-current'
                        : ''
                    }
                  >
                    <span>
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        '0',
                      )}
                    </span>

                    <span>
                      <strong>
                        {track.title}
                      </strong>

                      <small>
                        {track.artist}
                      </small>
                    </span>

                    {index ===
                      activeIndex && (
                      <em>
                        <i />
                        <i />
                        <i />
                      </em>
                    )}
                  </button>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}