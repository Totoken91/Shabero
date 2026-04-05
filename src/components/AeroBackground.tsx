import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import CausticPlane from './CausticPlane'
import AuroraPlane from './AuroraPlane'
import Bubbles from './Bubbles'
import TropicalFish from './TropicalFish'
import BokehParticles from './BokehParticles'
import LensFlare from './LensFlare'
import CloudLayer from './CloudLayer'

function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 3]} intensity={0.8} color="#FFF8E7" />

      <CausticPlane />
      <AuroraPlane />
      <CloudLayer />
      <Bubbles count={isMobile ? 10 : 20} />
      {!isMobile && <TropicalFish />}
      <BokehParticles count={isMobile ? 30 : 60} />
      <LensFlare />

      <EffectComposer>
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0004, 0.0004]}
        />
        <Vignette darkness={0.3} offset={0.3} />
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
          background: 'radial-gradient(circle at 70% 20%, rgba(255,248,231,0.3), transparent 50%)',
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
