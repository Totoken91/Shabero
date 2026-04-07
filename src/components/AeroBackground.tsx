import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import CausticPlane from './CausticPlane'
import AuroraPlane from './AuroraPlane'
import Bubbles from './Bubbles'
import BokehParticles from './BokehParticles'
import LensFlare from './LensFlare'

function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 3]} intensity={1} color="#FFF8E7" />
      <pointLight position={[-3, 2, 2]} intensity={0.5} color="#00E5FF" />

      <CausticPlane />
      <AuroraPlane />
      <Bubbles count={isMobile ? 12 : 22} />
      <BokehParticles count={isMobile ? 35 : 60} />
      <LensFlare />

      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette darkness={0.2} offset={0.4} />
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
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 70% 20%, rgba(0,229,255,0.25), transparent 50%)',
        }}
      />
    </div>
  )
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

  if (!webGLSupported) return <CSSFallback />

  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      <Suspense fallback={<CSSFallback />}>
        <Canvas
          dpr={Math.min(window.devicePixelRatio, 2)}
          camera={{ position: [0, 0, 6], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'linear-gradient(160deg, #87CEEB 0%, #00B4D8 60%, #0077B6 100%)' }}
        >
          <Scene isMobile={isMobile} />
        </Canvas>
      </Suspense>
    </div>
  )
}
