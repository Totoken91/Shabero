import type { Scenario } from '../types'

export const scenarios: Scenario[] = [
  {
    id: 'konbini',
    name: 'Konbini & Caisse',
    description: 'Les phrases que tu entendras à chaque passage en caisse',
    phrases: [
      {
        jp: 'ポイントカードはありますか？',
        romaji: 'Pointo kādo wa arimasu ka?',
        fr: 'Vous avez une carte de fidélité ?',
        note: 'On te pose ça À CHAQUE FOIS',
      },
      {
        jp: 'いいえ、大丈夫です',
        romaji: 'Iie, daijōbu desu',
        fr: 'Non merci, ça ira',
        note: 'Réponse passe-partout universelle',
        noteType: 'green',
      },
      {
        jp: 'あたためますか？',
        romaji: 'Atatamemasu ka?',
        fr: 'Je vous chauffe ça ?',
        note: 'Pour les bento/onigiri',
      },
      {
        jp: 'お箸はご利用ですか？',
        romaji: 'Ohashi wa goriyō desu ka?',
        fr: 'Vous voulez des baguettes ?',
        note: 'Réponds juste うん ou いいえ',
      },
      {
        jp: '袋はご利用ですか？',
        romaji: 'Fukuro wa goriyō desu ka?',
        fr: 'Vous voulez un sac ?',
        note: 'Payant au Japon',
      },
      {
        jp: 'Suicaで払います',
        romaji: 'Suica de haraimasu',
        fr: 'Je paye avec Suica',
        note: 'La carte transport = paiement partout',
        noteType: 'blue',
      },
    ],
  },
  {
    id: 'izakaya',
    name: 'Izakaya & Restos',
    description: 'Commander, réagir et payer au resto japonais',
    phrases: [
      {
        jp: 'すみません！',
        romaji: 'Sumimasen!',
        fr: 'Excusez-moi ! (appeler le serveur)',
        note: 'Pas besoin de crier, dit clairement',
      },
      {
        jp: 'とりあえずビール！',
        romaji: 'Toriaezu bīru!',
        fr: 'Pour commencer, une bière !',
        note: 'Phrase culte, très naturelle',
      },
      {
        jp: 'これおいしい！',
        romaji: 'Kore oishii!',
        fr: 'C\'est trop bon !',
        note: 'Simple mais essentiel',
      },
      {
        jp: 'お会計お願いします',
        romaji: 'Okaikei onegaishimasu',
        fr: 'L\'addition s\'il vous plaît',
        note: 'Essentiel dans tout resto',
      },
      {
        jp: 'おすすめは何ですか？',
        romaji: 'Osusume wa nan desu ka?',
        fr: 'Qu\'est-ce que vous recommandez ?',
        note: 'Ouvre la conversation avec le staff',
      },
      {
        jp: 'もう一杯！',
        romaji: 'Mō ippai!',
        fr: 'Encore un verre !',
        note: 'Direct et fun',
      },
    ],
  },
  {
    id: 'trains',
    name: 'Trains & Métro',
    description: 'Se repérer dans le métro et les gares japonaises',
    phrases: [
      {
        jp: '〜に行きたいんですが',
        romaji: '~ni ikitain desu ga',
        fr: 'Je voudrais aller à...',
        note: 'Le が final = plus naturel qu\'une question directe',
        noteType: 'blue',
      },
      {
        jp: 'この電車は〜に止まりますか？',
        romaji: 'Kono densha wa ~ni tomarimasu ka?',
        fr: 'Ce train s\'arrête à... ?',
        note: 'Très utile pour vérifier',
      },
      {
        jp: '終電は何時ですか？',
        romaji: 'Shūden wa nanji desu ka?',
        fr: 'C\'est quoi le dernier train ?',
        note: 'VITAL — trains s\'arrêtent ~minuit à Tokyo',
      },
      {
        jp: '乗り換えはどこですか？',
        romaji: 'Norikae wa doko desu ka?',
        fr: 'Où est la correspondance ?',
        note: 'Tokyo = labyrinthes de transferts',
      },
      {
        jp: 'すみません、ここ空いてますか？',
        romaji: 'Sumimasen, koko aitemasu ka?',
        fr: 'C\'est libre ici ?',
        note: 'Dans le train bondé',
      },
    ],
  },
  {
    id: 'shopping',
    name: 'Shopping',
    description: 'Acheter, négocier et essayer dans les boutiques',
    phrases: [
      {
        jp: 'これはいくらですか？',
        romaji: 'Kore wa ikura desu ka?',
        fr: 'C\'est combien ça ?',
        note: 'La base absolue',
      },
      {
        jp: 'ちょっと高いですね...',
        romaji: 'Chotto takai desu ne...',
        fr: 'C\'est un peu cher...',
        note: 'Ouverture douce pour négocier',
      },
      {
        jp: '試着できますか？',
        romaji: 'Shichaku dekimasu ka?',
        fr: 'Je peux essayer ça ?',
        note: 'Vêtements uniquement',
      },
      {
        jp: '別の色はありますか？',
        romaji: 'Betsu no iro wa arimasu ka?',
        fr: 'Vous avez d\'autres couleurs ?',
        note: 'Montre que t\'es impliqué',
      },
      {
        jp: 'これください',
        romaji: 'Kore kudasai',
        fr: 'Je prends ça',
        note: 'Super simple, super utile',
        noteType: 'green',
      },
      {
        jp: '見てるだけです',
        romaji: 'Miteru dake desu',
        fr: 'Je regarde juste',
        note: 'Quand le vendeur te colle',
      },
    ],
  },
  {
    id: 'urgences',
    name: 'Urgences',
    description: 'Les phrases essentielles en cas de problème',
    phrases: [
      {
        jp: '助けてください！',
        romaji: 'Tasukete kudasai!',
        fr: 'Au secours !',
        note: 'À connaître par coeur',
      },
      {
        jp: '病院はどこですか？',
        romaji: 'Byōin wa doko desu ka?',
        fr: 'Où est l\'hôpital ?',
        note: 'Essentiel',
      },
      {
        jp: '財布を失くしました',
        romaji: 'Saifu wo nakushimashita',
        fr: 'J\'ai perdu mon portefeuille',
        note: 'Ça arrive...',
      },
      {
        jp: '英語が話せる人はいますか？',
        romaji: 'Eigo ga hanaseru hito wa imasu ka?',
        fr: 'Il y a quelqu\'un qui parle anglais ?',
        note: 'Dernier recours',
      },
    ],
  },
  {
    id: 'socialiser',
    name: 'Socialiser',
    description: 'Se faire des potes et discuter au Japon',
    phrases: [
      {
        jp: 'フランス人です',
        romaji: 'Furansujin desu',
        fr: 'Je suis Français',
        note: 'Très bien reçu au Japon',
      },
      {
        jp: '日本語あんまり話せなくて...',
        romaji: 'Nihongo anmari hanasanakute...',
        fr: 'Je parle pas très bien japonais...',
        note: 'Honnête + ouvre la conversation',
      },
      {
        jp: 'LINE交換できる？',
        romaji: 'LINE kōkan dekiru?',
        fr: 'On peut s\'échanger sur LINE ?',
        note: 'L\'équivalent "t\'as WhatsApp ?"',
      },
      {
        jp: 'また会おう！',
        romaji: 'Mata aō!',
        fr: 'On se revoit bientôt !',
        note: 'Casual et sympa',
      },
      {
        jp: 'めっちゃ楽しかった！',
        romaji: 'Meccha tanoshikatta!',
        fr: 'C\'était trop bien !',
        note: 'めっちゃ = vraiment (jeune/oral)',
      },
    ],
  },
]
