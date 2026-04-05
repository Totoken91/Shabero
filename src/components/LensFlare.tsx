import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function LensFlare() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    // Subtle pulsing
    const scale = 1 + Math.sin(t * 0.5) * 0.08
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <group ref={groupRef} position={[5, 4, -3]}>
      {/* Core bright spot */}
      <mesh>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial
          color="#FFF8E7"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Inner halo */}
      <mesh>
        <circleGeometry args={[0.8, 32]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Outer halo */}
      <mesh>
        <circleGeometry args={[1.5, 32]} />
        <meshBasicMaterial
          color="#87CEEB"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
