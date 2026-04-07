import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import causticVert from '../shaders/caustics.vert.glsl'
import causticFrag from '../shaders/caustics.frag.glsl'

export default function CausticPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null!)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#00E5FF') },
    }),
    []
  )

  useFrame((_, delta) => {
    matRef.current.uniforms.uTime.value += delta
  })

  return (
    <mesh position={[0, 0, -5]} rotation={[0, 0, 0]}>
      <planeGeometry args={[30, 30]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={causticVert}
        fragmentShader={causticFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
