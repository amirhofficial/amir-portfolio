'use client';

import { useEffect, useRef } from 'react';
import { useMousePositionRef } from '@/hooks/useMousePosition';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { lerp, clamp } from '@/lib/utils';

interface Ring {
  radiusX: number;
  radiusY: number;
  rotation: number;
  speed: number;
  stroke: string;
  lineWidth: number;
}

interface Particle {
  ringIndex: number;
  angle: number;
  speed: number;
  size: number;
  twinklePhase: number;
  brightness: number;
}

type PerformanceTier = 'high' | 'medium' | 'low';

function getPerformanceTier(
  isTouch: boolean,
): PerformanceTier {
  if (typeof window === 'undefined') {
    return 'high';
  }

  if (!isTouch) {
    return 'high';
  }

  const cores =
    typeof navigator.hardwareConcurrency === 'number'
      ? navigator.hardwareConcurrency
      : 4;

  const memory =
    'deviceMemory' in navigator
      ? Number(
          (
            navigator as Navigator & {
              deviceMemory?: number;
            }
          ).deviceMemory ?? 4,
        )
      : 4;

  /*
   * Old / low-power phones:
   * usually 2–4 cores and/or <= 2GB RAM.
   */
  if (cores <= 4 || memory <= 2) {
    return 'low';
  }

  /*
   * Medium phones:
   * good enough for most effects,
   * but we reduce some continuous work.
   */
  if (cores <= 6 || memory <= 4) {
    return 'medium';
  }

  /*
   * Modern powerful phones:
   * keep the full visual experience.
   */
  return 'high';
}

export default function Orb() {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const mouseRef =
    useMousePositionRef();

  const prefersReducedMotion =
    usePrefersReducedMotion();

  const isTouch =
    useIsTouchDevice();

  useEffect(() => {
    const canvas =
      canvasRef.current;

    const container =
      containerRef.current;

    const ctx =
      canvas?.getContext('2d');

    if (
      !canvas ||
      !container ||
      !ctx
    ) {
      return;
    }

    let width = 0;
    let height = 0;

    const tier =
      getPerformanceTier(
        isTouch,
      );

    /*
     * Quality settings.
     *
     * HIGH:
     * Full visual experience.
     *
     * MEDIUM:
     * Slightly fewer particles + capped FPS.
     *
     * LOW:
     * Much lighter particle system + 30 FPS.
     */

    const settings =
      tier === 'high'
        ? {
            particleCount: 30,
            targetFps: 60,
            mouseStrength: 13,
            tiltStrengthX: 0.09,
            tiltStrengthY: 0.11,
            pulse: true,
          }
        : tier === 'medium'
          ? {
              particleCount: 20,
              targetFps: 45,
              mouseStrength: 11,
              tiltStrengthX: 0.07,
              tiltStrengthY: 0.09,
              pulse: true,
            }
          : {
              particleCount: 10,
              targetFps: 30,
              mouseStrength: 8,
              tiltStrengthX: 0.05,
              tiltStrengthY: 0.06,
              pulse: false,
            };

    const dpr =
      Math.min(
        window.devicePixelRatio || 1,
        tier === 'low' ? 1.25 : 2,
      );

    function resize() {
      const rect =
        container!.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      canvas!.width =
        Math.max(
          1,
          Math.round(
            width * dpr,
          ),
        );

      canvas!.height =
        Math.max(
          1,
          Math.round(
            height * dpr,
          ),
        );

      canvas!.style.width =
        `${width}px`;

      canvas!.style.height =
        `${height}px`;

      ctx!.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0,
      );
    }

    resize();

    const resizeObserver =
      new ResizeObserver(
        resize,
      );

    resizeObserver.observe(
      container,
    );

    const rings: Ring[] = [
      {
        radiusX: 1,
        radiusY: 0.38,
        rotation: -0.35,
        speed: 0.000018,
        stroke:
          'rgba(245,245,245,0.14)',
        lineWidth: 1,
      },
      {
        radiusX: 0.78,
        radiusY: 0.52,
        rotation: 0.5,
        speed: -0.000026,
        stroke:
          'rgba(96,165,250,0.24)',
        lineWidth: 1,
      },
      {
        radiusX: 0.58,
        radiusY: 0.6,
        rotation: 1.1,
        speed: 0.000014,
        stroke:
          'rgba(96,165,250,0.12)',
        lineWidth: 1,
      },
      {
        radiusX: 0.88,
        radiusY: 0.3,
        rotation: -1.22,
        speed: 0.000011,
        stroke:
          'rgba(147,197,253,0.07)',
        lineWidth: 0.75,
      },
    ];

    const particles: Particle[] =
      Array.from(
        {
          length:
            settings.particleCount,
        },
        (_, i) => ({
          ringIndex:
            i % rings.length,

          angle:
            Math.random() *
            Math.PI *
            2,

          speed:
            (Math.random() * 0.4 +
              0.2) *
            (Math.random() > 0.5
              ? 1
              : -1) *
            0.0007,

          size:
            Math.random() * 1.2 +
            0.45,

          twinklePhase:
            Math.random() *
            Math.PI *
            2,

          brightness:
            Math.random() * 0.5 +
            0.5,
        }),
      );

    const parallax = {
      x: 0,
      y: 0,
    };

    const tilt = {
      x: 0,
      y: 0,
    };

    const pulse = {
      value: 0,
    };

    const scroll = {
      target: 0,
      value: 0,
    };

    let raf = 0;
    let lastFrame = 0;

    const frameInterval =
      1000 /
      settings.targetFps;

    const start =
      performance.now();

    const parallaxEnabled =
      !prefersReducedMotion &&
      !isTouch;

    const pulseEnabled =
      settings.pulse &&
      !prefersReducedMotion;

    const handleScroll =
      () => {
        const maxScroll =
          Math.max(
            window.innerHeight *
              0.85,
            1,
          );

        scroll.target =
          clamp(
            window.scrollY /
              maxScroll,
            0,
            1,
          );
      };

    handleScroll();

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      },
    );

    function draw(now: number) {
      if (
        now - lastFrame <
        frameInterval
      ) {
        raf =
          requestAnimationFrame(
            draw,
          );
        return;
      }

      lastFrame = now;

      const elapsed =
        now - start;

      const cx =
        width / 2;

      const cy =
        height / 2;

      const baseRadius =
        Math.min(
          width,
          height,
        ) * 0.34;

      ctx!.clearRect(
        0,
        0,
        width,
        height,
      );

      scroll.value =
        lerp(
          scroll.value,
          scroll.target,
          0.035,
        );

      const targetX =
        parallaxEnabled
          ? mouseRef.current.nx *
            settings.mouseStrength
          : 0;

      const targetY =
        parallaxEnabled
          ? mouseRef.current.ny *
            settings.mouseStrength
          : 0;

      parallax.x =
        lerp(
          parallax.x,
          targetX,
          0.045,
        );

      parallax.y =
        lerp(
          parallax.y,
          targetY,
          0.045,
        );

      const targetTiltX =
        parallaxEnabled
          ? mouseRef.current.ny *
            settings.tiltStrengthX
          : 0;

      const targetTiltY =
        parallaxEnabled
          ? mouseRef.current.nx *
            settings.tiltStrengthY
          : 0;

      tilt.x =
        lerp(
          tilt.x,
          targetTiltX,
          0.035,
        );

      tilt.y =
        lerp(
          tilt.y,
          targetTiltY,
          0.035,
        );

      const pulseWave =
        pulseEnabled
          ? Math.sin(
              elapsed *
                0.00125,
            )
          : 0;

      pulse.value =
        lerp(
          pulse.value,
          (pulseWave + 1) / 2,
          0.06,
        );

      const scrollProgress =
        scroll.value;

      const scale =
        1 -
        scrollProgress *
          0.11;

      const opacity =
        1 -
        scrollProgress *
          0.46;

      const driftY =
        scrollProgress *
        -32;

      ctx!.save();

      ctx!.translate(
        cx +
          parallax.x +
          tilt.y * 18,
        cy +
          parallax.y +
          driftY +
          tilt.x * 14,
      );

      ctx!.rotate(
        tilt.y * 0.025,
      );

      ctx!.scale(
        scale,
        scale,
      );

      ctx!.globalAlpha =
        opacity;

      /* =======================================================
         OUTER ATMOSPHERIC GLOW
      ======================================================= */

      const glowRadius =
        baseRadius *
        (1.02 +
          pulse.value *
            0.035);

      const glow =
        ctx!.createRadialGradient(
          0,
          0,
          0,
          0,
          0,
          glowRadius,
        );

      glow.addColorStop(
        0,
        `rgba(96,165,250,${
          0.34 +
          pulse.value * 0.08
        })`,
      );

      glow.addColorStop(
        0.32,
        'rgba(96,165,250,0.12)',
      );

      glow.addColorStop(
        0.7,
        'rgba(59,130,246,0.035)',
      );

      glow.addColorStop(
        1,
        'rgba(96,165,250,0)',
      );

      ctx!.fillStyle =
        glow;

      ctx!.beginPath();

      ctx!.arc(
        0,
        0,
        glowRadius,
        0,
        Math.PI * 2,
      );

      ctx!.fill();

      /* =======================================================
         ENERGY SHELL
      ======================================================= */

      const shellRadius =
        baseRadius *
        (0.28 +
          pulse.value *
            0.012);

      const shell =
        ctx!.createRadialGradient(
          0,
          0,
          0,
          0,
          0,
          shellRadius,
        );

      shell.addColorStop(
        0,
        'rgba(245,245,245,0.2)',
      );

      shell.addColorStop(
        0.35,
        'rgba(147,197,253,0.12)',
      );

      shell.addColorStop(
        0.72,
        'rgba(96,165,250,0.035)',
      );

      shell.addColorStop(
        1,
        'rgba(96,165,250,0)',
      );

      ctx!.fillStyle =
        shell;

      ctx!.beginPath();

      ctx!.arc(
        0,
        0,
        shellRadius,
        0,
        Math.PI * 2,
      );

      ctx!.fill();

      /* =======================================================
         CORE
      ======================================================= */

      const coreRadius =
        baseRadius * 0.155;

      ctx!.strokeStyle =
        `rgba(147,197,253,${
          0.18 +
          pulse.value * 0.1
        })`;

      ctx!.lineWidth = 1;

      ctx!.beginPath();

      ctx!.arc(
        0,
        0,
        coreRadius *
          (1.55 +
            pulse.value *
              0.06),
        0,
        Math.PI * 2,
      );

      ctx!.stroke();

      const core =
        ctx!.createRadialGradient(
          0,
          0,
          0,
          0,
          0,
          coreRadius,
        );

      core.addColorStop(
        0,
        'rgba(255,255,255,0.98)',
      );

      core.addColorStop(
        0.18,
        'rgba(245,245,245,0.92)',
      );

      core.addColorStop(
        0.55,
        'rgba(147,197,253,0.68)',
      );

      core.addColorStop(
        1,
        'rgba(96,165,250,0.18)',
      );

      ctx!.fillStyle =
        core;

      ctx!.beginPath();

      ctx!.arc(
        0,
        0,
        coreRadius,
        0,
        Math.PI * 2,
      );

      ctx!.fill();

      ctx!.fillStyle =
        'rgba(255,255,255,0.92)';

      ctx!.beginPath();

      ctx!.arc(
        0,
        0,
        coreRadius *
          0.28,
        0,
        Math.PI * 2,
      );

      ctx!.fill();

      /* =======================================================
         ORBITS + PARTICLES
      ======================================================= */

      rings.forEach(
        (
          ring,
          ringIndex,
        ) => {
          const rotation =
            ring.rotation +
            (prefersReducedMotion
              ? 0
              : elapsed *
                ring.speed);

          ctx!.save();

          ctx!.rotate(
            rotation,
          );

          ctx!.strokeStyle =
            ring.stroke;

          ctx!.lineWidth =
            ring.lineWidth;

          ctx!.beginPath();

          ctx!.ellipse(
            0,
            0,
            baseRadius *
              ring.radiusX,
            baseRadius *
              ring.radiusY,
            0,
            0,
            Math.PI * 2,
          );

          ctx!.stroke();

          const energyAngle =
            prefersReducedMotion
              ? ring.rotation
              : elapsed *
                  (ring.speed *
                    3.1) +
                ring.rotation;

          const energyX =
            Math.cos(
              energyAngle,
            ) *
            baseRadius *
            ring.radiusX;

          const energyY =
            Math.sin(
              energyAngle,
            ) *
            baseRadius *
            ring.radiusY;

          const energyGlow =
            ctx!.createRadialGradient(
              energyX,
              energyY,
              0,
              energyX,
              energyY,
              13,
            );

          energyGlow.addColorStop(
            0,
            'rgba(147,197,253,0.9)',
          );

          energyGlow.addColorStop(
            0.22,
            'rgba(96,165,250,0.35)',
          );

          energyGlow.addColorStop(
            1,
            'rgba(96,165,250,0)',
          );

          ctx!.fillStyle =
            energyGlow;

          ctx!.beginPath();

          ctx!.arc(
            energyX,
            energyY,
            13,
            0,
            Math.PI * 2,
          );

          ctx!.fill();

          ctx!.fillStyle =
            'rgba(191,219,254,0.92)';

          ctx!.beginPath();

          ctx!.arc(
            energyX,
            energyY,
            ringIndex === 1
              ? 1.8
              : 1.35,
            0,
            Math.PI * 2,
          );

          ctx!.fill();

          particles
            .filter(
              (particle) =>
                particle.ringIndex ===
                ringIndex,
            )
            .forEach(
              (particle) => {
                const angle =
                  particle.angle +
                  (prefersReducedMotion
                    ? 0
                    : elapsed *
                      particle.speed);

                const x =
                  Math.cos(
                    angle,
                  ) *
                  baseRadius *
                  ring.radiusX;

                const y =
                  Math.sin(
                    angle,
                  ) *
                  baseRadius *
                  ring.radiusY;

                const twinkle =
                  prefersReducedMotion
                    ? 0.45
                    : 0.38 +
                      Math.sin(
                        elapsed *
                          0.0015 +
                          particle.twinklePhase,
                      ) *
                        0.32;

                const alpha =
                  Math.max(
                    0.1,
                    twinkle *
                      particle.brightness,
                  );

                const attraction =
                  parallaxEnabled
                    ? 1 +
                      mouseRef.current.nx *
                        0.006
                    : 1;

                ctx!.beginPath();

                ctx!.fillStyle =
                  `rgba(245,245,245,${alpha.toFixed(
                    2,
                  )})`;

                ctx!.arc(
                  x * attraction,
                  y * attraction,
                  particle.size,
                  0,
                  Math.PI * 2,
                );

                ctx!.fill();
              },
            );

          ctx!.restore();
        },
      );

      /* =======================================================
         INNER ENERGY LINE
      ======================================================= */

      ctx!.save();

      ctx!.rotate(
        elapsed *
          0.000018,
      );

      ctx!.strokeStyle =
        `rgba(147,197,253,${
          0.06 +
          pulse.value * 0.04
        })`;

      ctx!.lineWidth =
        0.75;

      ctx!.setLineDash(
        [3, 7],
      );

      ctx!.beginPath();

      ctx!.ellipse(
        0,
        0,
        baseRadius *
          0.42,
        baseRadius *
          0.42,
        0,
        0,
        Math.PI * 2,
      );

      ctx!.stroke();

      ctx!.setLineDash([]);

      ctx!.restore();

      /* =======================================================
         OUTER FADE RIM
      ======================================================= */

      const rim =
        ctx!.createRadialGradient(
          0,
          0,
          baseRadius *
            0.7,
          0,
          0,
          baseRadius *
            1.08,
        );

      rim.addColorStop(
        0,
        'rgba(0,0,0,0)',
      );

      rim.addColorStop(
        0.75,
        'rgba(96,165,250,0)',
      );

      rim.addColorStop(
        1,
        `rgba(96,165,250,${
          0.035 +
          pulse.value * 0.02
        })`,
      );

      ctx!.fillStyle =
        rim;

      ctx!.beginPath();

      ctx!.arc(
        0,
        0,
        baseRadius *
          1.08,
        0,
        Math.PI * 2,
      );

      ctx!.fill();

      ctx!.restore();

      raf =
        requestAnimationFrame(
          draw,
        );
    }

    raf =
      requestAnimationFrame(
        draw,
      );

    return () => {
      cancelAnimationFrame(
        raf,
      );

      resizeObserver.disconnect();

      window.removeEventListener(
        'scroll',
        handleScroll,
      );
    };
  }, [
    mouseRef,
    prefersReducedMotion,
    isTouch,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative aspect-square w-[240px] xs:w-[280px] sm:w-[360px] md:w-[420px] lg:w-[500px]"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}