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
        className="text-[42px] font-[900] m-0 relative inline-block"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #87CEEB 80%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 2px 8px rgba(0, 180, 216, 0.4))',
        }}
      >
        Shabero
        {/* Shine sweep */}
        <span
          className="absolute inset-0 overflow-hidden pointer-events-none"
          aria-hidden
        >
          <span
            className="shine-sweep block w-[50%] h-full absolute top-0"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
              transform: 'skewX(-25deg)',
            }}
          />
        </span>
      </h1>

      <p
        className="font-jp text-[14px] mt-2 tracking-wider"
        style={{
          color: 'rgba(255,255,255,0.8)',
          textShadow: '0 0 20px rgba(0, 180, 216, 0.3)',
        }}
      >
        しゃべろう — Japonais parlé pour voyageurs
      </p>
    </motion.header>
  )
}
