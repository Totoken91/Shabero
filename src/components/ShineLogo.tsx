import { motion } from 'framer-motion'

export default function ShineLogo() {
  return (
    <motion.header
      className="pt-8 pb-4 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h1
        className="text-[48px] font-[900] m-0 inline-block"
        style={{
          color: 'white',
          textShadow: '0 2px 12px rgba(0, 100, 180, 0.3), 0 1px 2px rgba(0,0,0,0.1)',
        }}
      >
        Shabero
      </h1>

      <p
        className="font-jp text-[14px] mt-2 tracking-wider"
        style={{
          color: 'rgba(255,255,255,0.9)',
          textShadow: '0 1px 4px rgba(0, 80, 140, 0.2)',
        }}
      >
        しゃべろう — Parle comme un vrai Japonais
      </p>
    </motion.header>
  )
}
