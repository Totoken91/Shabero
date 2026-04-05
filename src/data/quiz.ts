import type { QuizQuestion } from '../types'

export const quizQuestions: QuizQuestion[] = [
  {
    jp: 'ポイントカードはありますか？',
    ctx: 'Le caissier au konbini',
    correct: 'Vous avez une carte de fidélité ?',
    options: ['Vous payez en espèces ?', 'Vous avez une carte de fidélité ?', 'Vous voulez un sac ?', 'C\'est tout pour vous ?'],
    expl: 'ポイント = points/fidélité, カード = carte. On te pose ça SYSTÉMATIQUEMENT dans chaque konbini.',
  },
  {
    jp: 'やばい！',
    ctx: 'Ton pote japonais goûte un ramen',
    correct: 'C\'est trop ouf / incroyable !',
    options: ['C\'est terrible !', 'J\'ai faim !', 'C\'est trop ouf / incroyable !', 'On y va ?'],
    expl: 'やばい peut être positif ou négatif selon le contexte et le ton. Dans un contexte bouffe = c\'est dingue (positivement).',
  },
  {
    jp: 'とりあえずビール！',
    ctx: 'À l\'izakaya, le serveur arrive',
    correct: 'Pour commencer, une bière !',
    options: ['Je veux du saké !', 'Deux bières s\'il vous plaît !', 'Pour commencer, une bière !', 'On peut voir la carte ?'],
    expl: 'とりあえず = pour l\'instant / pour commencer. Phrase culte dans les izakaya — tout le monde la connaît !',
  },
  {
    jp: '終電は何時ですか？',
    ctx: 'Minuit à Tokyo après une soirée',
    correct: 'C\'est quoi le dernier train ?',
    options: ['C\'est quoi le premier train ?', 'Le train part dans combien de temps ?', 'C\'est quoi le dernier train ?', 'Y a-t-il un taxi ?'],
    expl: '終電 (shūden) = dernier train. ESSENTIEL — les trains s\'arrêtent autour de minuit à Tokyo. Après c\'est taxi ou attendre 5h du mat.',
  },
  {
    jp: '見てるだけです',
    ctx: 'Dans une boutique, le vendeur s\'approche',
    correct: 'Je regarde juste',
    options: ['Ça m\'intéresse', 'Je cherche un cadeau', 'Je regarde juste', 'C\'est trop cher'],
    expl: 'Littéralement "je suis juste en train de regarder". Poli, clair, évite la pression vendeur sans être impoli.',
  },
  {
    jp: 'めっちゃ楽しかった！',
    ctx: 'Après une soirée avec des Japonais',
    correct: 'C\'était trop bien !',
    options: ['C\'était nul !', 'Je suis fatigué !', 'On revient quand ?', 'C\'était trop bien !'],
    expl: 'めっちゃ = vachement/trop (registre oral, jeune). 楽しかった = c\'était amusant. Combo parfait post-soirée.',
  },
  {
    jp: 'なるほど',
    ctx: 'Quelqu\'un t\'explique comment acheter un ticket',
    correct: 'Ah je vois / Je comprends',
    options: ['Je suis d\'accord', 'Ah je vois / Je comprends', 'C\'est intéressant', 'Vraiment ?'],
    expl: 'なるほど signale que tu suis et comprends. Très apprécié culturellement — ça dit "je t\'écoute vraiment".',
  },
  {
    jp: 'いただきます',
    ctx: 'Le plat arrive à table',
    correct: 'Bon appétit (avant de manger)',
    options: ['Merci pour le repas', 'Bon appétit (avant de manger)', 'C\'est délicieux !', 'J\'ai faim'],
    expl: 'Dit AVANT chaque repas, toujours. Montre du respect envers la nourriture et ceux qui l\'ont préparée. Très remarqué si un étranger le dit.',
  },
]
