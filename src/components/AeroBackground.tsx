import { useMemo, useState, useEffect } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import CausticCanvas from './CausticCanvas'

interface BubbleCSS {
  size: number
  left: number
  delay: number
  duration: number
  opacity: number
  drift: number
}

interface BokehCSS {
  size: number
  left: number
  top: number
  delay: number
  duration: number
  opacity: number
}

function CSSBubble({ size, left, delay, duration, opacity, drift }: BubbleCSS) {
  return (
    <div
      className="aero-bubble"
      style={{
        '--size': `${size}px`,
        '--left': `${left}%`,
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
        '--opacity': opacity,
        '--drift': `${drift}px`,
      } as React.CSSProperties}
    />
  )
}

function BokehDot({ size, left, top, delay, duration, opacity }: BokehCSS) {
  return (
    <div
      className="aero-bokeh"
      style={{
        '--size': `${size}px`,
        '--left': `${left}%`,
        '--top': `${top}%`,
        '--delay': `${delay}s`,
        '--duration': `${duration}s`,
        '--max-opacity': opacity,
      } as React.CSSProperties}
    />
  )
}

export default function AeroBackground() {
  const [engineReady, setEngineReady] = useState(false)

  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
    []
  )

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setEngineReady(true))
  }, [])

  const bubbles = useMemo<BubbleCSS[]>(() => {
    const count = isMobile ? 8 : 14
    return Array.from({ length: count }, () => ({
      size: 30 + Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 10 + Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.3,
      drift: (Math.random() - 0.5) * 60,
    }))
  }, [isMobile])

  const bokehs = useMemo<BokehCSS[]>(() => {
    const count = isMobile ? 10 : 20
    return Array.from({ length: count }, () => ({
      size: 3 + Math.random() * 8,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 3 + Math.random() * 5,
      opacity: 0.15 + Math.random() * 0.3,
    }))
  }, [isMobile])

  const particlesOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: {
          value: isMobile ? 15 : 30,
        },
        color: {
          value: ['#80dfff', '#a0e8ff', '#c0f0ff', '#60d0ff', '#ffffff'],
        },
        shape: {
          type: 'circle' as const,
        },
        opacity: {
          value: { min: 0.1, max: 0.4 },
          animation: {
            enable: true,
            speed: 0.5,
            startValue: 'random' as const,
            destroy: 'none' as const,
          },
        },
        size: {
          value: { min: 4, max: 30 },
          animation: {
            enable: true,
            speed: 1,
            startValue: 'random' as const,
            destroy: 'none' as const,
          },
        },
        move: {
          enable: true,
          direction: 'top' as const,
          speed: { min: 0.3, max: 1.2 },
          outModes: {
            default: 'out' as const,
          },
          straight: false,
          random: true,
        },
        wobble: {
          enable: true,
          distance: 15,
          speed: 3,
        },
      },
      detectRetina: true,
    }),
    [isMobile]
  )

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Layer 1: Ocean gradient */}
      <div className="aero-gradient" />

      {/* Layer 2: WebGL caustic shader */}
      <CausticCanvas />

      {/* Layer 3: Light rays from top-right */}
      <div className="aero-rays" />

      {/* Layer 4: Aurora bands */}
      <div className="aero-aurora" />

      {/* Layer 5: tsParticles bubbles */}
      {engineReady && (
        <Particles
          id="tsparticles"
          options={particlesOptions}
          className="absolute inset-0"
        />
      )}

      {/* Layer 6: CSS bubbles (glassy) */}
      {bubbles.map((b, i) => (
        <CSSBubble key={`b-${i}`} {...b} />
      ))}

      {/* Layer 7: Bokeh dots */}
      {bokehs.map((b, i) => (
        <BokehDot key={`k-${i}`} {...b} />
      ))}

    </div>
  )
}
