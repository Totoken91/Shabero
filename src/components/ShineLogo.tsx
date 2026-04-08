import { motion } from 'framer-motion'

export default function ShineLogo() {
  return (
    <motion.header
      className="pt-8 pb-4 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h1
        className="text-[48px] font-[900] m-0 inline-block relative overflow-hidden"
        style={{
          color: '#fff',
          textShadow: '0 2px 4px rgba(0,80,140,0.4), 0 0 20px rgba(0,180,216,0.15)',
        }}
      >
        Shabero
        {/* Sliding shine */}
        <span
          className="absolute top-0 h-full w-[60%] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            animation: 'shine-sweep 4s ease-in-out infinite',
          }}
          aria-hidden
        />
      </h1>

      <p
        className="font-jp text-[14px] mt-2 tracking-wider"
        style={{
          color: 'rgba(255,255,255,0.9)',
          textShadow: '0 1px 3px rgba(0,80,140,0.3)',
        }}
      >
        しゃべろう — Parle comme un vrai Japonais
      </p>
    </motion.header>
  )
}
