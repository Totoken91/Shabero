import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FishProps {
  color: string
  path: { radius: number; yCenter: number; speed: number; zOffset: number }
}

function Fish({ color, path }: FishProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const bodyRef = useRef<THREE.Mesh>(null!)
  const tailRef = useRef<THREE.Mesh>(null!)

  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * path.speed + offset
    const x = Math.cos(t) * path.radius
    const z = Math.sin(t) * path.radius * 0.5 + path.zOffset
    const y = path.yCenter + Math.sin(t * 2) * 0.3

    groupRef.current.position.set(x, y, z)

    // Face direction of movement
    const dx = -Math.sin(t) * path.radius
    const dz = Math.cos(t) * path.radius * 0.5
    groupRef.current.rotation.y = Math.atan2(dx, dz)

    // Body wiggle
    const wiggle = Math.sin(t * 8) * 0.1
    if (bodyRef.current) bodyRef.current.rotation.y = wiggle

    // Tail flap
    if (tailRef.current) tailRef.current.rotation.y = Math.sin(t * 12) * 0.4
  })

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh ref={bodyRef} scale={[1, 0.6, 0.4]}>
        <sphereGeometry args={[0.25, 12, 8]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.3}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      {/* Tail */}
      <mesh ref={tailRef} position={[-0.25, 0, 0]} scale={[0.6, 0.4, 0.15]}>
        <coneGeometry args={[0.2, 0.3, 4]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.4}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Eye */}
      <mesh position={[0.15, 0.05, 0.08]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#111" />
      </mesh>
    </group>
  )
}

export default function TropicalFish() {
  return (
    <group>
      <Fish
        color="#FF6B35"
        path={{ radius: 5, yCenter: 0.5, speed: 0.3, zOffset: -2 }}
      />
      <Fish
        color="#00B4D8"
        path={{ radius: 4, yCenter: -1, speed: 0.25, zOffset: -1.5 }}
      />
      <Fish
        color="#FFD700"
        path={{ radius: 6, yCenter: 1.5, speed: 0.2, zOffset: -3 }}
      />
    </group>
  )
}
