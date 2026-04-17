export interface Kana {
  character: string
  romaji: string
  type: 'hiragana' | 'katakana'
  group: number
  mnemonic?: string
  mnemonic_en?: string
}

export interface KanaGroup {
  id: number
  name: string
  name_en?: string
  kana: Kana[]
}

const H = (character: string, romaji: string, group: number, mnemonic?: string, mnemonic_en?: string): Kana => ({
  character, romaji, type: 'hiragana', group, mnemonic, mnemonic_en,
})

const K = (character: string, romaji: string, group: number): Kana => ({
  character, romaji, type: 'katakana', group,
})

export const hiraganaGroups: KanaGroup[] = [
  { id: 1, name: 'Voyelles', name_en: 'Vowels', kana: [
    H('あ', 'a', 1, 'Un "a" stylisé avec une barre', 'A stylized "a" with a bar'),
    H('い', 'i', 1, 'Deux traits comme deux baguettes', 'Two strokes like two chopsticks'),
    H('う', 'u', 1, 'Un chapeau arrondi', 'A rounded hat'),
    H('え', 'e', 1, 'Un "e" avec une queue', 'An "e" with a tail'),
    H('お', 'o', 1, 'Un bonhomme qui fait "oh!"', 'A person going "oh!"'),
  ]},
  { id: 2, name: 'Groupe K', name_en: 'K group', kana: [
    H('か', 'ka', 2, 'Un couteau (ka-tana)', 'A knife (ka-tana)'),
    H('き', 'ki', 2, 'Une clé (key)', 'A key'),
    H('く', 'ku', 2, 'Un bec d\'oiseau qui fait "cou"', 'A bird\'s beak going "coo"'),
    H('け', 'ke', 2, 'Une porte (gate → ke)', 'A gate (ke)'),
    H('こ', 'ko', 2, 'Deux vers qui se font face', 'Two worms facing each other'),
  ]},
  { id: 3, name: 'Groupe S', name_en: 'S group', kana: [
    H('さ', 'sa', 3, 'Un samouraï qui salue', 'A samurai bowing'),
    H('し', 'shi', 3, 'Un hameçon (fishing → shi)', 'A fishing hook (fishing → shi)'),
    H('す', 'su', 3, 'Un fil qui pend d\'un crochet', 'A string hanging from a hook'),
    H('せ', 'se', 3, 'Une main qui dit "say!"', 'A hand saying "say!"'),
    H('そ', 'so', 3, 'Un zigzag comme "so so"', 'A zigzag like "so so"'),
  ]},
  { id: 4, name: 'Groupe T', name_en: 'T group', kana: [
    H('た', 'ta', 4, 'Les lettres "ta" empilées', 'The letters "ta" stacked'),
    H('ち', 'chi', 4, 'Un visage de profil (cheek)', 'A profile face (cheek)'),
    H('つ', 'tsu', 4, 'Un sourire — tsu!', 'A smile — tsu!'),
    H('て', 'te', 4, 'La lettre T couchée', 'The letter T lying down'),
    H('と', 'to', 4, 'Un orteil (toe)', 'A toe'),
  ]},
  { id: 5, name: 'Groupe N', name_en: 'N group', kana: [
    H('な', 'na', 5, 'Un noeud avec une croix', 'A knot with a cross'),
    H('に', 'ni', 5, 'Le mot "ni" = 2 — deux traits', '"ni" = 2 — two strokes'),
    H('ぬ', 'nu', 5, 'Des nouilles (noodles)', 'Noodles'),
    H('ね', 'ne', 5, 'Un escargot (snail → ne)', 'A snail (ne)'),
    H('の', 'no', 5, 'Le signe "no" barré', 'A "no" slash'),
  ]},
  { id: 6, name: 'Groupe H', name_en: 'H group', kana: [
    H('は', 'ha', 6, 'Un "ha!" avec la bouche ouverte', 'A "ha!" with mouth open'),
    H('ひ', 'hi', 6, 'Un sourire "hee hee"', 'A "hee hee" smile'),
    H('ふ', 'fu', 6, 'Le mont Fuji', 'Mount Fuji'),
    H('へ', 'he', 6, 'Une montagne simple', 'A simple mountain'),
    H('ほ', 'ho', 6, 'Un bonhomme de neige "ho ho"', 'A snowman going "ho ho"'),
  ]},
  { id: 7, name: 'Groupe M', name_en: 'M group', kana: [
    H('ま', 'ma', 7, 'Maman avec un chapeau', 'Mama with a hat'),
    H('み', 'mi', 7, 'Le chiffre 21 (mi = voir)', 'The number 21 (mi = to see)'),
    H('む', 'mu', 7, 'Une vache qui fait "moo"', 'A cow going "moo"'),
    H('め', 'me', 7, 'Un oeil (me = oeil en JP)', 'An eye (me = eye in Japanese)'),
    H('も', 'mo', 7, 'Un hameçon (more fish!)', 'A fishing hook (more fish!)'),
  ]},
  { id: 8, name: 'Groupe Y', name_en: 'Y group', kana: [
    H('や', 'ya', 8, 'Un yak', 'A yak'),
    H('ゆ', 'yu', 8, 'Un poisson qui nage', 'A swimming fish'),
    H('よ', 'yo', 8, 'Un yoyo', 'A yo-yo'),
  ]},
  { id: 9, name: 'Groupe R', name_en: 'R group', kana: [
    H('ら', 'ra', 9, 'Un "r" qui glisse', 'A sliding "r"'),
    H('り', 'ri', 9, 'Deux lignes de rivière', 'Two river lines'),
    H('る', 'ru', 9, 'Un "r" avec une boucle', 'An "r" with a loop'),
    H('れ', 're', 9, 'Un renne de profil', 'A reindeer in profile'),
    H('ろ', 'ro', 9, 'La route (road)', 'The road'),
  ]},
  { id: 10, name: 'Groupe W + N', name_en: 'W + N group', kana: [
    H('わ', 'wa', 10, 'Un "wa!" surpris', 'A surprised "wa!"'),
    H('を', 'wo', 10, 'Particule — tu verras partout', 'A particle — you\'ll see it everywhere'),
    H('ん', 'n', 10, 'Le seul son sans voyelle', 'The only sound without a vowel'),
  ]},
]

export const katakanaGroups: KanaGroup[] = [
  { id: 1, name: 'Voyelles', name_en: 'Vowels', kana: [
    K('ア', 'a', 1), K('イ', 'i', 1), K('ウ', 'u', 1), K('エ', 'e', 1), K('オ', 'o', 1),
  ]},
  { id: 2, name: 'Groupe K', name_en: 'K group', kana: [
    K('カ', 'ka', 2), K('キ', 'ki', 2), K('ク', 'ku', 2), K('ケ', 'ke', 2), K('コ', 'ko', 2),
  ]},
  { id: 3, name: 'Groupe S', name_en: 'S group', kana: [
    K('サ', 'sa', 3), K('シ', 'shi', 3), K('ス', 'su', 3), K('セ', 'se', 3), K('ソ', 'so', 3),
  ]},
  { id: 4, name: 'Groupe T', name_en: 'T group', kana: [
    K('タ', 'ta', 4), K('チ', 'chi', 4), K('ツ', 'tsu', 4), K('テ', 'te', 4), K('ト', 'to', 4),
  ]},
  { id: 5, name: 'Groupe N', name_en: 'N group', kana: [
    K('ナ', 'na', 5), K('ニ', 'ni', 5), K('ヌ', 'nu', 5), K('ネ', 'ne', 5), K('ノ', 'no', 5),
  ]},
  { id: 6, name: 'Groupe H', name_en: 'H group', kana: [
    K('ハ', 'ha', 6), K('ヒ', 'hi', 6), K('フ', 'fu', 6), K('ヘ', 'he', 6), K('ホ', 'ho', 6),
  ]},
  { id: 7, name: 'Groupe M', name_en: 'M group', kana: [
    K('マ', 'ma', 7), K('ミ', 'mi', 7), K('ム', 'mu', 7), K('メ', 'me', 7), K('モ', 'mo', 7),
  ]},
  { id: 8, name: 'Groupe Y', name_en: 'Y group', kana: [
    K('ヤ', 'ya', 8), K('ユ', 'yu', 8), K('ヨ', 'yo', 8),
  ]},
  { id: 9, name: 'Groupe R', name_en: 'R group', kana: [
    K('ラ', 'ra', 9), K('リ', 'ri', 9), K('ル', 'ru', 9), K('レ', 're', 9), K('ロ', 'ro', 9),
  ]},
  { id: 10, name: 'Groupe W + N', name_en: 'W + N group', kana: [
    K('ワ', 'wa', 10), K('ヲ', 'wo', 10), K('ン', 'n', 10),
  ]},
]

// === Essential Kanji for travelers ===
export interface KanjiEntry {
  kanji: string
  reading: string
  meaning: string
  meaning_en?: string
  context: string
  context_en?: string
}

export interface KanjiCategory {
  id: string
  name: string
  name_en?: string
  description: string
  description_en?: string
  entries: KanjiEntry[]
}

export const kanjiCategories: KanjiCategory[] = [
  {
    id: 'nombres',
    name: 'Nombres',
    name_en: 'Numbers',
    description: 'Compter, lire les prix, les horaires',
    description_en: 'Counting, reading prices, schedules',
    entries: [
      { kanji: '一', reading: 'ichi', meaning: '1', meaning_en: '1', context: 'Compteurs, menus, étages', context_en: 'Counters, menus, floors' },
      { kanji: '二', reading: 'ni', meaning: '2', meaning_en: '2', context: '二人 (futari) = 2 personnes', context_en: '二人 (futari) = 2 people' },
      { kanji: '三', reading: 'san', meaning: '3', meaning_en: '3', context: '三階 (sangai) = 3e étage', context_en: '三階 (sangai) = 3rd floor' },
      { kanji: '四', reading: 'yon / shi', meaning: '4', meaning_en: '4', context: 'Évite shi (= mort). Dis yon.', context_en: 'Avoid shi (= death). Say yon.' },
      { kanji: '五', reading: 'go', meaning: '5', meaning_en: '5', context: '五百円 (gohyaku-en) = 500¥', context_en: '五百円 (gohyaku-en) = 500¥' },
      { kanji: '六', reading: 'roku', meaning: '6', meaning_en: '6', context: '六本木 (Roppongi) = quartier de Tokyo', context_en: '六本木 (Roppongi) = Tokyo district' },
      { kanji: '七', reading: 'nana / shichi', meaning: '7', meaning_en: '7', context: 'nana est plus courant', context_en: 'nana is more common' },
      { kanji: '八', reading: 'hachi', meaning: '8', meaning_en: '8', context: '八百屋 (yaoya) = épicerie', context_en: '八百屋 (yaoya) = greengrocer' },
      { kanji: '九', reading: 'kyū / ku', meaning: '9', meaning_en: '9', context: 'kyū plus courant', context_en: 'kyū is more common' },
      { kanji: '十', reading: 'jū', meaning: '10', meaning_en: '10', context: '十分 (juppun) = 10 minutes', context_en: '十分 (juppun) = 10 minutes' },
      { kanji: '百', reading: 'hyaku', meaning: '100', meaning_en: '100', context: '百円 (hyaku-en) = 100¥', context_en: '百円 (hyaku-en) = 100¥' },
      { kanji: '千', reading: 'sen', meaning: '1000', meaning_en: '1000', context: '千円 (sen-en) = 1000¥', context_en: '千円 (sen-en) = 1000¥' },
      { kanji: '万', reading: 'man', meaning: '10 000', meaning_en: '10,000', context: '一万円 (ichiman-en) = 10 000¥', context_en: '一万円 (ichiman-en) = 10,000¥' },
      { kanji: '円', reading: 'en', meaning: 'Yen (¥)', meaning_en: 'Yen (¥)', context: 'Le kanji que tu verras le PLUS', context_en: 'The kanji you\'ll see THE MOST' },
    ],
  },
  {
    id: 'directions',
    name: 'Directions',
    name_en: 'Directions',
    description: 'Se repérer dans les gares et les rues',
    description_en: 'Navigating stations and streets',
    entries: [
      { kanji: '右', reading: 'migi', meaning: 'Droite', meaning_en: 'Right', context: '右折 (usetsu) = tournez à droite', context_en: '右折 (usetsu) = turn right' },
      { kanji: '左', reading: 'hidari', meaning: 'Gauche', meaning_en: 'Left', context: '左折 (sasetsu) = tournez à gauche', context_en: '左折 (sasetsu) = turn left' },
      { kanji: '上', reading: 'ue', meaning: 'Haut / dessus', meaning_en: 'Up / above', context: '上り (nobori) = montée, direction Tokyo', context_en: '上り (nobori) = going up, toward Tokyo' },
      { kanji: '下', reading: 'shita', meaning: 'Bas / dessous', meaning_en: 'Down / below', context: '下り (kudari) = descente, depuis Tokyo', context_en: '下り (kudari) = going down, from Tokyo' },
      { kanji: '北', reading: 'kita', meaning: 'Nord', meaning_en: 'North', context: '北口 (kitaguchi) = sortie nord', context_en: '北口 (kitaguchi) = north exit' },
      { kanji: '南', reading: 'minami', meaning: 'Sud', meaning_en: 'South', context: '南口 (minamiguchi) = sortie sud', context_en: '南口 (minamiguchi) = south exit' },
      { kanji: '東', reading: 'higashi', meaning: 'Est', meaning_en: 'East', context: '東京 (Tōkyō) = capitale de l\'est', context_en: '東京 (Tōkyō) = eastern capital' },
      { kanji: '西', reading: 'nishi', meaning: 'Ouest', meaning_en: 'West', context: '西口 (nishiguchi) = sortie ouest', context_en: '西口 (nishiguchi) = west exit' },
      { kanji: '中', reading: 'naka', meaning: 'Milieu / intérieur', meaning_en: 'Middle / inside', context: '中央 (chūō) = central', context_en: '中央 (chūō) = central' },
      { kanji: '外', reading: 'soto', meaning: 'Extérieur', meaning_en: 'Outside', context: '外国人 (gaikokujin) = étranger', context_en: '外国人 (gaikokujin) = foreigner' },
      { kanji: '前', reading: 'mae', meaning: 'Devant / avant', meaning_en: 'Front / before', context: '駅前 (ekimae) = devant la gare', context_en: '駅前 (ekimae) = in front of the station' },
      { kanji: '後', reading: 'ushiro', meaning: 'Derrière / après', meaning_en: 'Behind / after', context: '午後 (gogo) = après-midi', context_en: '午後 (gogo) = afternoon' },
    ],
  },
  {
    id: 'panneaux',
    name: 'Panneaux courants',
    name_en: 'Common Signs',
    description: 'Les kanji que tu verras partout au Japon',
    description_en: 'Kanji you\'ll see everywhere in Japan',
    entries: [
      { kanji: '入', reading: 'iri / nyū', meaning: 'Entrée', meaning_en: 'Entrance', context: '入口 (iriguchi) = entrée', context_en: '入口 (iriguchi) = entrance' },
      { kanji: '出', reading: 'de / shutsu', meaning: 'Sortie', meaning_en: 'Exit', context: '出口 (deguchi) = sortie', context_en: '出口 (deguchi) = exit' },
      { kanji: '口', reading: 'guchi / kuchi', meaning: 'Bouche / ouverture', meaning_en: 'Mouth / opening', context: 'Dans toutes les gares', context_en: 'In every station' },
      { kanji: '駅', reading: 'eki', meaning: 'Gare', meaning_en: 'Station', context: '東京駅 (Tōkyō-eki) = gare de Tokyo', context_en: '東京駅 (Tōkyō-eki) = Tokyo Station' },
      { kanji: '大', reading: 'ō / dai', meaning: 'Grand', meaning_en: 'Big', context: '大阪 (Ōsaka), 大人 (otona) = adulte', context_en: '大阪 (Ōsaka), 大人 (otona) = adult' },
      { kanji: '小', reading: 'ko / shō', meaning: 'Petit', meaning_en: 'Small', context: '小学校 (shōgakkō) = école primaire', context_en: '小学校 (shōgakkō) = elementary school' },
      { kanji: '人', reading: 'hito / jin', meaning: 'Personne', meaning_en: 'Person', context: '日本人 (nihonjin) = Japonais', context_en: '日本人 (nihonjin) = Japanese person' },
      { kanji: '日', reading: 'hi / nichi', meaning: 'Jour / soleil', meaning_en: 'Day / sun', context: '日本 (Nihon) = Japon', context_en: '日本 (Nihon) = Japan' },
      { kanji: '本', reading: 'hon', meaning: 'Livre / origine', meaning_en: 'Book / origin', context: '日本 (Nihon) = origine du soleil', context_en: '日本 (Nihon) = origin of the sun' },
      { kanji: '禁', reading: 'kin', meaning: 'Interdit', meaning_en: 'Forbidden', context: '禁煙 (kin\'en) = non-fumeur', context_en: '禁煙 (kin\'en) = no smoking' },
      { kanji: '止', reading: 'tome / shi', meaning: 'Arrêt / stop', meaning_en: 'Stop', context: '禁止 (kinshi) = interdit', context_en: '禁止 (kinshi) = prohibited' },
      { kanji: '男', reading: 'otoko', meaning: 'Homme', meaning_en: 'Man', context: 'Sur la porte des toilettes', context_en: 'On toilet doors' },
      { kanji: '女', reading: 'onna', meaning: 'Femme', meaning_en: 'Woman', context: 'Sur la porte des toilettes', context_en: 'On toilet doors' },
      { kanji: '食', reading: 'shoku / ta', meaning: 'Manger', meaning_en: 'To eat', context: '食べ放題 (tabehōdai) = à volonté', context_en: '食べ放題 (tabehōdai) = all-you-can-eat' },
    ],
  },
]
