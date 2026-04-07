import { useMemo } from 'react'
import { Float } from '@react-three/drei'

interface BubbleData {
  position: [number, number, number]
  scale: number
  speed: number
  floatIntensity: number
}

function Bubble({ position, scale, speed, floatIntensity }: BubbleData) {
  return (
    <Float speed={speed} floatIntensity={floatIntensity} rotationIntensity={0.2}>
      <mesh position={position}>
        <sphereGeometry args={[scale, 24, 24]} />
        <meshPhysicalMaterial
          transmission={0.85}
          roughness={0.08}
          thickness={0.8}
          ior={1.5}
          envMapIntensity={2}
          color="#80dfff"
          transparent
          opacity={0.7}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
    </Float>
  )
}

export default function Bubbles({ count = 18 }: { count?: number }) {
  const bubbles = useMemo<BubbleData[]>(() => {
    const arr: BubbleData[] = []
    for (let i = 0; i < count; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6 - 2,
        ],
        scale: 0.15 + Math.random() * 0.8,
        speed: 0.5 + Math.random() * 1.5,
        floatIntensity: 0.5 + Math.random() * 2,
      })
    }
    return arr
  }, [count])

  return (
    <group>
      {bubbles.map((b, i) => (
        <Bubble key={i} {...b} />
      ))}
    </group>
  )
}
