import { motion } from 'framer-motion'
import { Airplane } from '@phosphor-icons/react'

export default function ShineLogo() {
  return (
    <motion.header
      className="header-aero"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="relative z-10 flex items-center justify-center gap-3">
        <div className="icon-airplane">
          <Airplane size={20} weight="bold" className="text-white relative z-10" />
        </div>

        <h1
          className="text-[44px] font-[900] m-0"
          style={{
            color: '#fff',
            textShadow: '0 1px 0 rgba(255,255,255,0.4), 0 2px 4px rgba(0,50,100,0.4)',
          }}
        >
          Shabero
        </h1>
      </div>

      <p
        className="relative z-10 font-jp text-[14px] mt-2 tracking-wider"
        style={{
          color: 'rgba(255,255,255,0.9)',
          textShadow: '0 1px 2px rgba(0,60,120,0.25)',
        }}
      >
        しゃべろう — Parle comme un vrai Japonais
      </p>

      <div className="header-ornament relative z-10" />
    </motion.header>
  )
}
