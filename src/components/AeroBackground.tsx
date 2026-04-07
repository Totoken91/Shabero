import { Suspense, useState, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import CausticPlane from './CausticPlane'
import AuroraPlane from './AuroraPlane'
import BokehParticles from './BokehParticles'

function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 3]} intensity={1} color="#FFF8E7" />
      <pointLight position={[-3, 2, 2]} intensity={0.5} color="#00E5FF" />

      <CausticPlane />
      <AuroraPlane />
      <BokehParticles count={isMobile ? 35 : 60} />

      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

function CSSFallback() {
  return (
    <div
      className="fixed inset-0"
      style={{
        background: 'linear-gradient(160deg, #87CEEB 0%, #00B4D8 60%, #0077B6 100%)',
        zIndex: -1,
      }}
    />
  )
}

interface BubbleData {
  size: number
  left: number
  delay: number
  duration: number
  opacity: number
  drift: number
}

export default function AeroBackground() {
  const [isMobile, setIsMobile] = useState(false)
  const [webGLSupported, setWebGLSupported] = useState(true)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) setWebGLSupported(false)
    } catch {
      setWebGLSupported(false)
    }
  }, [])

  const bubbles = useMemo<BubbleData[]>(() => {
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

  if (!webGLSupported) return <CSSFallback />

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ zIndex: 0, width: '100vw', height: '100vh' }}
    >
      <Suspense fallback={<CSSFallback />}>
        <Canvas
          dpr={Math.min(window.devicePixelRatio, 2)}
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(160deg, #87CEEB 0%, #00B4D8 60%, #0077B6 100%)',
          }}
        >
          <Scene isMobile={isMobile} />
        </Canvas>
      </Suspense>

      {/* CSS bubbles on top of Three.js canvas */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="aero-bubble"
          style={{
            '--size': `${b.size}px`,
            '--left': `${b.left}%`,
            '--delay': `${b.delay}s`,
            '--duration': `${b.duration}s`,
            '--opacity': b.opacity,
            '--drift': `${b.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
