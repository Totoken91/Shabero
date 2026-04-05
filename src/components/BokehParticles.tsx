import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function BokehParticles({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const geoRef = useRef<THREE.BufferGeometry>(null!)

  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sp = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
      sp[i] = 0.02 + Math.random() * 0.06
    }
    return { positions: pos, speeds: sp }
  }, [count])

  useEffect(() => {
    if (geoRef.current) {
      geoRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    }
  }, [positions])

  useFrame(({ clock }) => {
    if (!geoRef.current) return
    const posAttr = geoRef.current.attributes.position as THREE.BufferAttribute
    if (!posAttr) return
    const arr = posAttr.array as Float32Array
    const t = clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i]
      if (arr[i * 3 + 1] > 7) arr[i * 3 + 1] = -7
      arr[i * 3] += Math.sin(t + i) * 0.002
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef} />
      <pointsMaterial
        size={0.08}
        color="#c0f8ff"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
