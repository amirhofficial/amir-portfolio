'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  GAME,
  SKINS,
  type GameStatus,
  type PlayerState,
  type SkinId,
} from '@/lib/lunorun/types';

import { LunoRunEngine } from '@/lib/lunorun/game-engine';

import LunoRunCharacter from './character-svg';

import styles from './LunoRunGame.module.css';

import {
  playLunoRunSound,
} from '@/lib/lunorun/audio';


/* =========================================================
   STORAGE
========================================================= */

const BEST_KEY =
  'lunorun:v2:best';

const SKIN_KEY =
  'lunorun:v2:skin';


/* =========================================================
   HELPERS
========================================================= */

const readBest = () => {
  if (
    typeof window ===
    'undefined'
  ) {
    return 0;
  }

  const n = Number(
    localStorage.getItem(
      BEST_KEY,
    ),
  );

  return Number.isFinite(n)
    ? n
    : 0;
};


const readSkin =
  (): SkinId => {
    if (
      typeof window ===
      'undefined'
    ) {
      return 'default';
    }

    const value =
      localStorage.getItem(
        SKIN_KEY,
      ) as SkinId | null;

    return value &&
      value in SKINS
      ? value
      : 'default';
  };


const formatDistance = (
  value: number,
) =>
  Math.floor(value)
    .toString()
    .padStart(4, '0');


/* =========================================================
   COMPONENT
========================================================= */

export default function LunoRunGame() {

  /* =======================================================
     DOM / ENGINE REFS
  ======================================================= */

  const canvasRef =
    useRef<HTMLCanvasElement>(
      null,
    );

  const stageRef =
    useRef<HTMLDivElement>(
      null,
    );

  const characterRef =
    useRef<HTMLDivElement>(
      null,
    );

  const engineRef =
    useRef<LunoRunEngine | null>(
      null,
    );

  const rafRef =
    useRef<number | null>(
      null,
    );

  const statusRef =
    useRef<GameStatus>(
      'menu',
    );

  const lastTimeRef =
    useRef(0);

  /*
   * Remembers how many jumps
   * the player had before the
   * current jump input.
   *
   * 0 → first jump
   * 1 → double jump
   */
  const previousJumpCountRef =
    useRef(0);

  /*
   * Used for the small landing
   * animation window.
   */
  const landUntilRef =
    useRef(0);

  /*
   * Prevent multiple HIT
   * sounds from firing.
   */
  const hitSoundPlayedRef =
    useRef(false);


  /* =======================================================
     STATE
  ======================================================= */

  const [status, setStatus] =
    useState<GameStatus>(
      'menu',
    );

  const [distance, setDistance] =
    useState(0);

  const [best, setBest] =
    useState(readBest);

  const [skin, setSkin] =
    useState<SkinId>(
      readSkin,
    );

  const [showSkins, setShowSkins] =
    useState(false);

  const [newBest, setNewBest] =
    useState(false);


  /* =======================================================
     LOCK PAGE SCROLL WHILE
     GAME IS OPEN
  ======================================================= */

  useEffect(() => {
    const html =
      document.documentElement;

    const body =
      document.body;

    const oldHtmlOverflow =
      html.style.overflow;

    const oldBodyOverflow =
      body.style.overflow;

    html.style.overflow =
      'hidden';

    body.style.overflow =
      'hidden';

    return () => {
      html.style.overflow =
        oldHtmlOverflow;

      body.style.overflow =
        oldBodyOverflow;
    };
  }, []);


  /* =======================================================
     GAME ENGINE
  ======================================================= */

  useEffect(() => {

    const canvas =
      canvasRef.current;

    const stage =
      stageRef.current;

    const character =
      characterRef.current;

    if (
      !canvas ||
      !stage ||
      !character
    ) {
      return;
    }

    const engine =
      new LunoRunEngine();

    engineRef.current =
      engine;

    const ctx =
      canvas.getContext(
        '2d',
        {
          alpha: false,
        },
      );

    if (!ctx) {
      return;
    }

    let disposed = false;

    let dpr = Math.min(
      window.devicePixelRatio ||
        1,
      2,
    );


    /* =====================================================
       CHARACTER POSITION
    ===================================================== */

    const syncCharacter =
      () => {

        const player =
          engine.player;

        const isMobile =
          window.innerWidth <=
          560;

        const x =
          player.x - 17;

        const y =
          engine.groundY() -
          GAME.playerHeight -
          player.y -
          (isMobile
            ? 24
            : 41);

        character.style.transform =
          `translate3d(${x}px, ${y}px, 0)`;
      };


    /* =====================================================
       RESIZE
    ===================================================== */

    const resize = () => {

      const rect =
        stage.getBoundingClientRect();

      dpr = Math.min(
        window.devicePixelRatio ||
          1,
        2,
      );

      canvas.width =
        Math.max(
          1,
          Math.floor(
            rect.width * dpr,
          ),
        );

      canvas.height =
        Math.max(
          1,
          Math.floor(
            rect.height * dpr,
          ),
        );

      canvas.style.width =
        `${rect.width}px`;

      canvas.style.height =
        `${rect.height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0,
      );

      engine.resize(
        rect.width,
        rect.height,
      );

      syncCharacter();
    };


    /* =====================================================
       DRAW
    ===================================================== */

    const draw = () => {

      const w =
        stage.clientWidth;

      const h =
        stage.clientHeight;

      const ground =
        engine.groundY();


      /* ---------------------------------------------------
         SKY
      --------------------------------------------------- */

      const sky =
        ctx.createLinearGradient(
          0,
          0,
          0,
          h,
        );

      sky.addColorStop(
        0,
        '#15283a',
      );

      sky.addColorStop(
        0.48,
        '#0b1724',
      );

      sky.addColorStop(
        1,
        '#050a10',
      );

      ctx.fillStyle =
        sky;

      ctx.fillRect(
        0,
        0,
        w,
        h,
      );


      /* ---------------------------------------------------
         BLUE ATMOSPHERE
      --------------------------------------------------- */

      const glow =
        ctx.createRadialGradient(
          w * 0.78,
          h * 0.15,
          5,
          w * 0.78,
          h * 0.15,
          Math.min(w, h) *
            0.65,
        );

      glow.addColorStop(
        0,
        'rgba(96,165,250,.18)',
      );

      glow.addColorStop(
        0.48,
        'rgba(96,165,250,.035)',
      );

      glow.addColorStop(
        1,
        'rgba(96,165,250,0)',
      );

      ctx.fillStyle =
        glow;

      ctx.fillRect(
        0,
        0,
        w,
        h,
      );


      /* ---------------------------------------------------
         CITY
      --------------------------------------------------- */

      const cityOffset =
        (engine.distance *
          0.22) %
        150;

      for (
        let x =
          -180 -
          cityOffset;

        x <
          w + 220;

        x += 150
      ) {

        const seed =
          Math.abs(
            Math.sin(
              x * 0.13,
            ),
          );

        const buildingHeight =
          48 +
          seed * 110;

        const buildingWidth =
          48 +
          seed * 30;

        ctx.fillStyle =
          'rgba(255,255,255,.035)';

        ctx.fillRect(
          x,
          ground -
            buildingHeight,
          buildingWidth,
          buildingHeight,
        );

        ctx.fillStyle =
          'rgba(96,165,250,.035)';

        for (
          let wy =
            ground -
            buildingHeight +
            16;

          wy <
            ground - 10;

          wy += 20
        ) {

          const lightSeed =
            Math.abs(
              Math.sin(
                x * 0.37 +
                wy * 0.11,
              ),
            );

          if (
            lightSeed >
            0.72
          ) {
            ctx.fillRect(
              x + 10,
              wy,
              5,
              2,
            );
          }
        }
      }


      /* ---------------------------------------------------
         PERSPECTIVE LINES
      --------------------------------------------------- */

      ctx.strokeStyle =
        'rgba(255,255,255,.025)';

      const perspectiveOffset =
        (engine.distance *
          0.16) %
        96;

      for (
        let x =
          -120 -
          perspectiveOffset;

        x <
          w + 160;

        x += 96
      ) {

        ctx.beginPath();

        ctx.moveTo(
          x,
          0,
        );

        ctx.lineTo(
          x - 48,
          h,
        );

        ctx.stroke();
      }


      /* ---------------------------------------------------
         GROUND
      --------------------------------------------------- */

      ctx.strokeStyle =
        'rgba(150,190,225,.24)';

      ctx.beginPath();

      ctx.moveTo(
        0,
        ground + 0.5,
      );

      ctx.lineTo(
        w,
        ground + 0.5,
      );

      ctx.stroke();


      /* ---------------------------------------------------
         ROAD MARKS
      --------------------------------------------------- */

      ctx.strokeStyle =
        'rgba(96,165,250,.18)';

      const roadOffset =
        -(
          engine.distance *
          5
        ) % 72;

      for (
        let x =
          roadOffset;

        x <
          w;

        x += 72
      ) {

        ctx.beginPath();

        ctx.moveTo(
          x,
          ground + 16,
        );

        ctx.lineTo(
          x + 32,
          ground + 16,
        );

        ctx.stroke();
      }


      /* ---------------------------------------------------
         OBSTACLES
      --------------------------------------------------- */

      for (
        const obstacle of
        engine.obstacles
      ) {

        const y =
          ground -
          obstacle.height;


        /* Spike */

        if (
          obstacle.type === 1
        ) {

          ctx.fillStyle =
            '#b7c8da';

          ctx.beginPath();

          ctx.moveTo(
            obstacle.x,
            ground,
          );

          ctx.lineTo(
            obstacle.x +
              obstacle.width /
                2,
            y,
          );

          ctx.lineTo(
            obstacle.x +
              obstacle.width,
            ground,
          );

          ctx.closePath();

          ctx.fill();

          continue;
        }


        /* Block / Barrier */

        ctx.fillStyle =
          obstacle.type === 2
            ? '#8da6c0'
            : '#a9bbcf';

        ctx.fillRect(
          obstacle.x,
          y,
          obstacle.width,
          obstacle.height,
        );

        ctx.fillStyle =
          'rgba(96,165,250,.22)';

        ctx.fillRect(
          obstacle.x + 6,
          y + 6,
          Math.max(
            4,
            obstacle.width -
              12,
          ),
          3,
        );
      }
    };


    /* =====================================================
       GAME LOOP
    ===================================================== */

    const loop = (
      time: number,
    ) => {

      if (disposed) {
        return;
      }


      const dt =
        lastTimeRef.current
          ? Math.min(
              (
                time -
                lastTimeRef.current
              ) / 1000,
              0.032,
            )
          : 0;

      lastTimeRef.current =
        time;


      /* ---------------------------------------------------
         ACTIVE GAME
      --------------------------------------------------- */

      if (
        statusRef.current ===
        'playing'
      ) {

        const wasGrounded =
          engine.player
            .grounded;


        engine.update(dt);


        const isGrounded =
          engine.player
            .grounded;


        /* -------------------------------------------------
           LAND DETECTION
        ------------------------------------------------- */

        if (
          !wasGrounded &&
          isGrounded
        ) {

          landUntilRef.current =
            time + 130;

          /*
           * Reset jump tracking
           * after a successful landing.
           */

          previousJumpCountRef.current =
            0;

          /*
           * Landing sound + haptic.
           */

          void playLunoRunSound(
            'land',
          );
        }


        /* -------------------------------------------------
           COLLISION
        ------------------------------------------------- */

        if (
          engine.collides()
        ) {

          statusRef.current =
            'gameover';

          setStatus(
            'gameover',
          );


          /*
           * Prevent HIT from being
           * triggered repeatedly.
           */

          if (
            !hitSoundPlayedRef.current
          ) {

            hitSoundPlayedRef.current =
              true;

            void playLunoRunSound(
              'hit',
            );
          }


          const score =
            Math.floor(
              engine.distance,
            );


          setDistance(
            score,
          );


          const currentBest =
            readBest();


          /* -----------------------------------------------
             NEW BEST
          ------------------------------------------------ */

          if (
            score >
            currentBest
          ) {

            localStorage.setItem(
              BEST_KEY,
              String(score),
            );

            setBest(
              score,
            );

            setNewBest(
              true,
            );


            /*
             * New record sound +
             * haptic pattern.
             */

            void playLunoRunSound(
              'newBest',
            );
          }

        } else {

          setDistance(
            Math.floor(
              engine.distance,
            ),
          );
        }
      }


      /* ---------------------------------------------------
         VISUAL SYNC
      --------------------------------------------------- */

      syncCharacter();

      draw();


      /* ---------------------------------------------------
         CONTINUE
      --------------------------------------------------- */

      rafRef.current =
        requestAnimationFrame(
          loop,
        );
    };


    /* =====================================================
       START ENGINE
    ===================================================== */

    resize();

    window.addEventListener(
      'resize',
      resize,
    );

    rafRef.current =
      requestAnimationFrame(
        loop,
      );


    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {

      disposed = true;

      if (
        rafRef.current !==
        null
      ) {
        cancelAnimationFrame(
          rafRef.current,
        );
      }

      window.removeEventListener(
        'resize',
        resize,
      );

      engineRef.current =
        null;
    };

  }, []);


  /* =========================================================
     START / JUMP
  ========================================================= */

  const startOrJump =
    useCallback(() => {

      const engine =
        engineRef.current;

      if (!engine) {
        return;
      }


      /* ---------------------------------------------------
         START / RESTART
      --------------------------------------------------- */

      if (
        statusRef.current ===
          'menu' ||
        statusRef.current ===
          'gameover'
      ) {

        engine.reset();

        statusRef.current =
          'playing';

        setStatus(
          'playing',
        );

        setDistance(
          0,
        );

        setNewBest(
          false,
        );


        /*
         * Reset per-run sound state.
         */

        previousJumpCountRef.current =
          0;

        hitSoundPlayedRef.current =
          false;

        return;
      }


      /* ---------------------------------------------------
         JUMP / DOUBLE JUMP
      --------------------------------------------------- */

      if (
        statusRef.current ===
        'playing'
      ) {

        const jumpsBefore =
          engine.player.jumps;


        engine.jump();


        const jumpsAfter =
          engine.player.jumps;


        /*
         * Only play sound if the engine
         * actually accepted the jump.
         */

        if (
          jumpsAfter >
          jumpsBefore
        ) {

          if (
            jumpsAfter === 1
          ) {

            void playLunoRunSound(
              'jump',
            );
          }


          if (
            jumpsAfter === 2
          ) {

            void playLunoRunSound(
              'doubleJump',
            );
          }
        }


        previousJumpCountRef.current =
          jumpsAfter;
      }

    }, []);


  /* =========================================================
     KEYBOARD
  ========================================================= */

  useEffect(() => {

    const onKeyDown = (
      event: KeyboardEvent,
    ) => {

      if (
        event.code !==
          'Space' &&
        event.code !==
          'ArrowUp'
      ) {
        return;
      }

      event.preventDefault();

      startOrJump();
    };


    window.addEventListener(
      'keydown',
      onKeyDown,
      {
        passive: false,
      },
    );


    return () => {

      window.removeEventListener(
        'keydown',
        onKeyDown,
      );

    };

  }, [startOrJump]);


  /* =========================================================
     SKINS
  ========================================================= */

  const unlocked =
    (id: SkinId) =>
      best >=
      SKINS[id].unlock;


  const selectSkin =
    (id: SkinId) => {

      if (
        !unlocked(id)
      ) {
        return;
      }

      setSkin(
        id,
      );

      localStorage.setItem(
        SKIN_KEY,
        id,
      );

      setShowSkins(
        false,
      );
    };


  /* =========================================================
     CHARACTER STATE
  ========================================================= */

  const characterState:
    PlayerState =
    (() => {

      if (
        status ===
        'gameover'
      ) {
        return 'hit';
      }


      const engine =
        engineRef.current;


      if (
        status !==
          'playing' ||
        !engine
      ) {
        return 'idle';
      }


      if (
        landUntilRef.current >
        performance.now()
      ) {
        return 'land';
      }


      if (
        !engine.player
          .grounded
      ) {

        /*
         * NOTE:
         * Keep this aligned with
         * your current engine's
         * velocity convention.
         */

        return engine.player.vy <
          0
          ? 'jump'
          : 'fall';
      }


      return 'run';

    })();


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main
      className={
        styles.shell
      }
    >

      {/* ===================================================
          TOP BAR
      =================================================== */}

      <header
        className={
          styles.topbar
        }
      >

        <a
          className={
            styles.back
          }
          href="/"
        >
          ← BACK TO
          PORTFOLIO
        </a>


        <div
          className={
            styles.brand
          }
        >
          LUNORUN
        </div>


        <button
          className={
            styles.skinButton
          }
          onClick={() =>
            setShowSkins(
              true,
            )
          }
        >
          SKINS
        </button>

      </header>


      {/* ===================================================
          GAME STAGE
      =================================================== */}

      <section
        ref={stageRef}
        className={
          styles.stage
        }
        aria-label="LunoRun game area"
        onPointerDown={(
          event,
        ) => {

          const target =
            event.target as HTMLElement;


          /*
           * Clicking UI should NOT
           * cause a jump.
           */

          if (
            target.closest(
              'button, a, input',
            )
          ) {
            return;
          }


          startOrJump();
        }}
      >

        <canvas
          ref={canvasRef}
          className={
            styles.canvas
          }
        />


        {/* ===============================================
            PLAYER
        =============================================== */}

        <div
          ref={characterRef}
          className={
            styles.characterWrap
          }
        >
          <LunoRunCharacter
            state={
              characterState
            }
            skin={skin}
          />
        </div>


        {/* ===============================================
            HUD
        =============================================== */}

        <div
          className={
            styles.hud
          }
        >

          <div>
            <span>
              DISTANCE
            </span>

            <strong>
              {
                formatDistance(
                  distance,
                )
              }{' '}
              m
            </strong>
          </div>


          <div>
            <span>
              BEST
            </span>

            <strong>
              {
                formatDistance(
                  best,
                )
              }{' '}
              m
            </strong>
          </div>


          <div
            className={
              styles.record
            }
          >
            <span>
              AMIR&apos;S
              RECORD
            </span>

            <strong>
              {
                formatDistance(
                  GAME.amirRecord,
                )
              }{' '}
              m
            </strong>
          </div>

        </div>


        {/* ===============================================
            START MENU
        =============================================== */}

        {status ===
          'menu' && (
          <div
            className={
              styles.overlay
            }
          >

            <div
              className={
                styles.panel
              }
            >

              <span
                className={
                  styles.kicker
                }
              >
                02 /
                INTERACTION
              </span>


              <h1>
                ENJOY IT!
              </h1>


              <p>
                RUN · JUMP ·
                SURVIVE
              </p>


              <button
                className={
                  styles.primary
                }
                onClick={() =>
                  startOrJump()
                }
              >
                PLAY
              </button>


              <button
                className={
                  styles.secondary
                }
                onClick={() =>
                  setShowSkins(
                    true,
                  )
                }
              >
                SKINS
              </button>


              <small>
                SPACE / TAP
                TO JUMP ·
                DOUBLE JUMP
                ENABLED
              </small>

            </div>

          </div>
        )}


        {/* ===============================================
            GAME OVER
        =============================================== */}

        {status ===
          'gameover' && (
          <div
            className={
              styles.overlay
            }
          >

            <div
              className={
                styles.panel
              }
            >

              <span
                className={
                  styles.kicker
                }
              >
                RUN COMPLETE
              </span>


              <h2>
                GAME OVER
              </h2>


              <p>
                {newBest
                  ? 'NEW BEST.'
                  : 'ONE MORE?'}
              </p>


              <div
                className={
                  styles.statsRow
                }
              >

                <div>
                  <span>
                    DISTANCE
                  </span>

                  <strong>
                    {
                      formatDistance(
                        distance,
                      )
                    }{' '}
                    m
                  </strong>
                </div>


                <div>
                  <span>
                    BEST
                  </span>

                  <strong>
                    {
                      formatDistance(
                        best,
                      )
                    }{' '}
                    m
                  </strong>
                </div>

              </div>


              <button
                className={
                  styles.primary
                }
                onClick={
                  startOrJump
                }
              >
                TRY AGAIN
              </button>


              <a
                className={
                  styles.secondaryLink
                }
                href="/"
              >
                BACK TO
                PORTFOLIO
              </a>

            </div>

          </div>
        )}


        {/* ===============================================
            TOUCH HINT
        =============================================== */}

        <div
          className={
            styles.touchHint
          }
        >
          SPACE / TAP TO
          JUMP
        </div>

      </section>


      {/* ===================================================
          SKIN MODAL
      =================================================== */}

      {showSkins && (
        <div
          className={
            styles.modal
          }
          role="dialog"
          aria-modal="true"
          aria-label="Skin selector"
        >

          <div
            className={
              styles.modalCard
            }
          >

            <button
              className={
                styles.close
              }
              onClick={() =>
                setShowSkins(
                  false,
                )
              }
              aria-label="Close"
            >
              ×
            </button>


            <span
              className={
                styles.kicker
              }
            >
              CHARACTER LAB
            </span>


            <h2>
              SELECT SKIN
            </h2>


            <div
              className={
                styles.skinGrid
              }
            >

              {(
                Object.keys(
                  SKINS,
                ) as SkinId[]
              ).map(
                (id) => (

                  <button
                    key={id}
                    className={`
                      ${styles.skinCard}
                      ${
                        skin === id
                          ? styles.activeSkin
                          : ''
                      }
                    `}
                    onClick={() =>
                      selectSkin(
                        id,
                      )
                    }
                    disabled={
                      !unlocked(
                        id,
                      )
                    }
                  >

                    <span
                      className={
                        styles.skinPreview
                      }
                    >
                      <LunoRunCharacter
                        state="idle"
                        skin={id}
                      />
                    </span>


                    <strong>
                      {
                        SKINS[id]
                          .label
                      }
                    </strong>


                    <small>
                      {unlocked(
                        id,
                      )
                        ? 'UNLOCKED'
                        : `REACH ${SKINS[id].unlock}m`}
                    </small>

                  </button>

                ),
              )}

            </div>

          </div>

        </div>
      )}

    </main>
  );
}