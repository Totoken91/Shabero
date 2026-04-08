import { motion } from 'framer-motion'

export default function ShineLogo() {
  return (
    <motion.header
      className="pt-8 pb-4 text-center relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <h1
        className="text-[48px] font-[900] m-0 inline-block"
        style={{
          color: '#fff',
          textShadow: `
            0 0 30px rgba(0, 229, 255, 0.6),
            0 0 60px rgba(0, 180, 216, 0.3),
            0 4px 12px rgba(0, 0, 0, 0.3)
          `,
        }}
      >
        Shabero
      </h1>

      <p
        className="font-jp text-[14px] mt-2 tracking-wider"
        style={{
          color: 'rgba(255,255,255,0.85)',
          textShadow: '0 0 20px rgba(0, 180, 216, 0.4), 0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        しゃべろう — Parle comme un vrai Japonais
      </p>
    </motion.header>
  )
}
