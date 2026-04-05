import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import causticVert from '../shaders/caustics.vert.glsl'
import auroraFrag from '../shaders/aurora.frag.glsl'

export default function AuroraPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null!)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  )

  useFrame((_, delta) => {
    matRef.current.uniforms.uTime.value += delta
  })

  return (
    <mesh position={[0, 2, -4]}>
      <planeGeometry args={[25, 12]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={causticVert}
        fragmentShader={auroraFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
