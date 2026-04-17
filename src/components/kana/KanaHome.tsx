import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLocale } from '../../lib/locale'

export default function KanaHome() {
  const navigate = useNavigate()
  const lang = useLocale((s) => s.lang)

  return (
    <div className="max-w-[500px] mx-auto">
      <div className="phrase-card p-5 mb-4 text-center">
        <h2 className="relative z-10 text-[20px] font-[800] text-[var(--text)] m-0">Kana</h2>
        <p className="relative z-10 text-[12px] text-[var(--text-light)] mt-1">{lang === 'en' ? 'Learn to read Japanese characters' : 'Apprends à lire les caractères japonais'}</p>
      </div>

      <div className="flex flex-col gap-3">
        <motion.button
          onClick={() => navigate('/kana/hiragana')}
          className="aero-card cursor-pointer p-5 flex items-center gap-4 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="icon-aqua shrink-0"
            style={{ background: 'linear-gradient(to bottom, #EF5350 0%, #F44336 40%, #D32F2F 40%, #C62828 100%)', borderColor: '#A01010' }}>
            <span className="text-white font-jp text-[20px] font-bold relative z-10">あ</span>
          </div>
          <div className="relative z-10">
            <span className="font-bold text-[16px] text-[var(--text)] block">Hiragana</span>
            <span className="text-[12px] text-[var(--text-light)]">{lang === 'en' ? 'Basic characters — 46 kana in 10 groups' : 'Les caractères de base — 46 kana en 10 groupes'}</span>
          </div>
        </motion.button>

        <motion.button
          onClick={() => navigate('/kana/katakana')}
          className="aero-card cursor-pointer p-5 flex items-center gap-4 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="icon-aqua shrink-0"
            style={{ background: 'linear-gradient(to bottom, #5DADE2 0%, #2196F3 40%, #1976D2 40%, #1565C0 100%)', borderColor: '#0D47A1' }}>
            <span className="text-white font-jp text-[20px] font-bold relative z-10">ア</span>
          </div>
          <div className="relative z-10">
            <span className="font-bold text-[16px] text-[var(--text)] block">Katakana</span>
            <span className="text-[12px] text-[var(--text-light)]">{lang === 'en' ? 'For foreign words — 46 kana in 10 groups' : 'Pour les mots étrangers — 46 kana en 10 groupes'}</span>
          </div>
        </motion.button>

        <motion.button
          onClick={() => navigate('/kana/kanji')}
          className="aero-card cursor-pointer p-5 flex items-center gap-4 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          whileHover={{ y: -2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="icon-aqua shrink-0"
            style={{ background: 'linear-gradient(to bottom, #81C784 0%, #4CAF50 40%, #388E3C 40%, #2E7D32 100%)', borderColor: '#1B5E20' }}>
            <span className="text-white font-jp text-[20px] font-bold relative z-10">漢</span>
          </div>
          <div className="relative z-10">
            <span className="font-bold text-[16px] text-[var(--text)] block">{lang === 'en' ? 'Essential Kanji' : 'Kanji essentiels'}</span>
            <span className="text-[12px] text-[var(--text-light)]">{lang === 'en' ? 'Numbers, directions, signs — travel essentials' : 'Nombres, directions, panneaux — le minimum pour voyager'}</span>
          </div>
        </motion.button>
      </div>
    </div>
  )
}
