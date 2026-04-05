import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Cloud({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const startX = position[0]

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    meshRef.current.position.x = startX + ((t % 20) - 10)
  })

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[3 * scale, 1 * scale]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.25}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function CloudLayer() {
  const clouds = useMemo(
    () => [
      { position: [-4, 3.5, -3.5] as [number, number, number], scale: 1.2, speed: 0.15 },
      { position: [3, 2.5, -4] as [number, number, number], scale: 0.9, speed: 0.1 },
      { position: [-1, 4, -4.5] as [number, number, number], scale: 1.5, speed: 0.08 },
    ],
    []
  )

  return (
    <group>
      {clouds.map((c, i) => (
        <Cloud key={i} {...c} />
      ))}
    </group>
  )
}
