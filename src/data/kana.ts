export interface Kana {
  character: string
  romaji: string
  type: 'hiragana' | 'katakana'
  group: number
  mnemonic?: string
}

export interface KanaGroup {
  id: number
  name: string
  kana: Kana[]
}

const H = (character: string, romaji: string, group: number, mnemonic?: string): Kana => ({
  character, romaji, type: 'hiragana', group, mnemonic,
})

const K = (character: string, romaji: string, group: number): Kana => ({
  character, romaji, type: 'katakana', group,
})

export const hiraganaGroups: KanaGroup[] = [
  { id: 1, name: 'Voyelles', kana: [
    H('あ', 'a', 1, 'Un "a" stylisé avec une barre'),
    H('い', 'i', 1, 'Deux traits comme deux baguettes'),
    H('う', 'u', 1, 'Un chapeau arrondi'),
    H('え', 'e', 1, 'Un "e" avec une queue'),
    H('お', 'o', 1, 'Un bonhomme qui fait "oh!"'),
  ]},
  { id: 2, name: 'Groupe K', kana: [
    H('か', 'ka', 2, 'Un couteau (ka-tana)'),
    H('き', 'ki', 2, 'Une clé (key)'),
    H('く', 'ku', 2, 'Un bec d\'oiseau qui fait "cou"'),
    H('け', 'ke', 2, 'Une porte (gate → ke)'),
    H('こ', 'ko', 2, 'Deux vers qui se font face'),
  ]},
  { id: 3, name: 'Groupe S', kana: [
    H('さ', 'sa', 3, 'Un samouraï qui salue'),
    H('し', 'shi', 3, 'Un hameçon (fishing → shi)'),
    H('す', 'su', 3, 'Un fil qui pend d\'un crochet'),
    H('せ', 'se', 3, 'Une main qui dit "say!"'),
    H('そ', 'so', 3, 'Un zigzag comme "so so"'),
  ]},
  { id: 4, name: 'Groupe T', kana: [
    H('た', 'ta', 4, 'Les lettres "ta" empilées'),
    H('ち', 'chi', 4, 'Un visage de profil (cheek)'),
    H('つ', 'tsu', 4, 'Un sourire — tsu!'),
    H('て', 'te', 4, 'La lettre T couchée'),
    H('と', 'to', 4, 'Un orteil (toe)'),
  ]},
  { id: 5, name: 'Groupe N', kana: [
    H('な', 'na', 5, 'Un noeud avec une croix'),
    H('に', 'ni', 5, 'Le mot "ni" = 2 — deux traits'),
    H('ぬ', 'nu', 5, 'Des nouilles (noodles)'),
    H('ね', 'ne', 5, 'Un escargot (snail → ne)'),
    H('の', 'no', 5, 'Le signe "no" barré'),
  ]},
  { id: 6, name: 'Groupe H', kana: [
    H('は', 'ha', 6, 'Un "ha!" avec la bouche ouverte'),
    H('ひ', 'hi', 6, 'Un sourire "hee hee"'),
    H('ふ', 'fu', 6, 'Le mont Fuji'),
    H('へ', 'he', 6, 'Une montagne simple'),
    H('ほ', 'ho', 6, 'Un bonhomme de neige "ho ho"'),
  ]},
  { id: 7, name: 'Groupe M', kana: [
    H('ま', 'ma', 7, 'Maman avec un chapeau'),
    H('み', 'mi', 7, 'Le chiffre 21 (mi = voir)'),
    H('む', 'mu', 7, 'Une vache qui fait "moo"'),
    H('め', 'me', 7, 'Un oeil (me = oeil en JP)'),
    H('も', 'mo', 7, 'Un hameçon (more fish!)'),
  ]},
  { id: 8, name: 'Groupe Y', kana: [
    H('や', 'ya', 8, 'Un yak'),
    H('ゆ', 'yu', 8, 'Un poisson qui nage'),
    H('よ', 'yo', 8, 'Un yoyo'),
  ]},
  { id: 9, name: 'Groupe R', kana: [
    H('ら', 'ra', 9, 'Un "r" qui glisse'),
    H('り', 'ri', 9, 'Deux lignes de rivière'),
    H('る', 'ru', 9, 'Un "r" avec une boucle'),
    H('れ', 're', 9, 'Un renne de profil'),
    H('ろ', 'ro', 9, 'La route (road)'),
  ]},
  { id: 10, name: 'Groupe W + N', kana: [
    H('わ', 'wa', 10, 'Un "wa!" surpris'),
    H('を', 'wo', 10, 'Particule — tu verras partout'),
    H('ん', 'n', 10, 'Le seul son sans voyelle'),
  ]},
]

export const katakanaGroups: KanaGroup[] = [
  { id: 1, name: 'Voyelles', kana: [
    K('ア', 'a', 1), K('イ', 'i', 1), K('ウ', 'u', 1), K('エ', 'e', 1), K('オ', 'o', 1),
  ]},
  { id: 2, name: 'Groupe K', kana: [
    K('カ', 'ka', 2), K('キ', 'ki', 2), K('ク', 'ku', 2), K('ケ', 'ke', 2), K('コ', 'ko', 2),
  ]},
  { id: 3, name: 'Groupe S', kana: [
    K('サ', 'sa', 3), K('シ', 'shi', 3), K('ス', 'su', 3), K('セ', 'se', 3), K('ソ', 'so', 3),
  ]},
  { id: 4, name: 'Groupe T', kana: [
    K('タ', 'ta', 4), K('チ', 'chi', 4), K('ツ', 'tsu', 4), K('テ', 'te', 4), K('ト', 'to', 4),
  ]},
  { id: 5, name: 'Groupe N', kana: [
    K('ナ', 'na', 5), K('ニ', 'ni', 5), K('ヌ', 'nu', 5), K('ネ', 'ne', 5), K('ノ', 'no', 5),
  ]},
  { id: 6, name: 'Groupe H', kana: [
    K('ハ', 'ha', 6), K('ヒ', 'hi', 6), K('フ', 'fu', 6), K('ヘ', 'he', 6), K('ホ', 'ho', 6),
  ]},
  { id: 7, name: 'Groupe M', kana: [
    K('マ', 'ma', 7), K('ミ', 'mi', 7), K('ム', 'mu', 7), K('メ', 'me', 7), K('モ', 'mo', 7),
  ]},
  { id: 8, name: 'Groupe Y', kana: [
    K('ヤ', 'ya', 8), K('ユ', 'yu', 8), K('ヨ', 'yo', 8),
  ]},
  { id: 9, name: 'Groupe R', kana: [
    K('ラ', 'ra', 9), K('リ', 'ri', 9), K('ル', 'ru', 9), K('レ', 're', 9), K('ロ', 'ro', 9),
  ]},
  { id: 10, name: 'Groupe W + N', kana: [
    K('ワ', 'wa', 10), K('ヲ', 'wo', 10), K('ン', 'n', 10),
  ]},
]

// === Essential Kanji for travelers ===
export interface KanjiEntry {
  kanji: string
  reading: string
  meaning: string
  context: string
}

export interface KanjiCategory {
  id: string
  name: string
  description: string
  entries: KanjiEntry[]
}

export const kanjiCategories: KanjiCategory[] = [
  {
    id: 'nombres',
    name: 'Nombres',
    description: 'Compter, lire les prix, les horaires',
    entries: [
      { kanji: '一', reading: 'ichi', meaning: '1', context: 'Compteurs, menus, étages' },
      { kanji: '二', reading: 'ni', meaning: '2', context: '二人 (futari) = 2 personnes' },
      { kanji: '三', reading: 'san', meaning: '3', context: '三階 (sangai) = 3e étage' },
      { kanji: '四', reading: 'yon / shi', meaning: '4', context: 'Évite shi (= mort). Dis yon.' },
      { kanji: '五', reading: 'go', meaning: '5', context: '五百円 (gohyaku-en) = 500¥' },
      { kanji: '六', reading: 'roku', meaning: '6', context: '六本木 (Roppongi) = quartier de Tokyo' },
      { kanji: '七', reading: 'nana / shichi', meaning: '7', context: 'nana est plus courant' },
      { kanji: '八', reading: 'hachi', meaning: '8', context: '八百屋 (yaoya) = épicerie' },
      { kanji: '九', reading: 'kyū / ku', meaning: '9', context: 'kyū plus courant' },
      { kanji: '十', reading: 'jū', meaning: '10', context: '十分 (juppun) = 10 minutes' },
      { kanji: '百', reading: 'hyaku', meaning: '100', context: '百円 (hyaku-en) = 100¥' },
      { kanji: '千', reading: 'sen', meaning: '1000', context: '千円 (sen-en) = 1000¥' },
      { kanji: '万', reading: 'man', meaning: '10 000', context: '一万円 (ichiman-en) = 10 000¥' },
      { kanji: '円', reading: 'en', meaning: 'Yen (¥)', context: 'Le kanji que tu verras le PLUS' },
    ],
  },
  {
    id: 'directions',
    name: 'Directions',
    description: 'Se repérer dans les gares et les rues',
    entries: [
      { kanji: '右', reading: 'migi', meaning: 'Droite', context: '右折 (usetsu) = tournez à droite' },
      { kanji: '左', reading: 'hidari', meaning: 'Gauche', context: '左折 (sasetsu) = tournez à gauche' },
      { kanji: '上', reading: 'ue', meaning: 'Haut / dessus', context: '上り (nobori) = montée, direction Tokyo' },
      { kanji: '下', reading: 'shita', meaning: 'Bas / dessous', context: '下り (kudari) = descente, depuis Tokyo' },
      { kanji: '北', reading: 'kita', meaning: 'Nord', context: '北口 (kitaguchi) = sortie nord' },
      { kanji: '南', reading: 'minami', meaning: 'Sud', context: '南口 (minamiguchi) = sortie sud' },
      { kanji: '東', reading: 'higashi', meaning: 'Est', context: '東京 (Tōkyō) = capitale de l\'est' },
      { kanji: '西', reading: 'nishi', meaning: 'Ouest', context: '西口 (nishiguchi) = sortie ouest' },
      { kanji: '中', reading: 'naka', meaning: 'Milieu / intérieur', context: '中央 (chūō) = central' },
      { kanji: '外', reading: 'soto', meaning: 'Extérieur', context: '外国人 (gaikokujin) = étranger' },
      { kanji: '前', reading: 'mae', meaning: 'Devant / avant', context: '駅前 (ekimae) = devant la gare' },
      { kanji: '後', reading: 'ushiro', meaning: 'Derrière / après', context: '午後 (gogo) = après-midi' },
    ],
  },
  {
    id: 'panneaux',
    name: 'Panneaux courants',
    description: 'Les kanji que tu verras partout au Japon',
    entries: [
      { kanji: '入', reading: 'iri / nyū', meaning: 'Entrée', context: '入口 (iriguchi) = entrée' },
      { kanji: '出', reading: 'de / shutsu', meaning: 'Sortie', context: '出口 (deguchi) = sortie' },
      { kanji: '口', reading: 'guchi / kuchi', meaning: 'Bouche / ouverture', context: 'Dans toutes les gares' },
      { kanji: '駅', reading: 'eki', meaning: 'Gare', context: '東京駅 (Tōkyō-eki) = gare de Tokyo' },
      { kanji: '大', reading: 'ō / dai', meaning: 'Grand', context: '大阪 (Ōsaka), 大人 (otona) = adulte' },
      { kanji: '小', reading: 'ko / shō', meaning: 'Petit', context: '小学校 (shōgakkō) = école primaire' },
      { kanji: '人', reading: 'hito / jin', meaning: 'Personne', context: '日本人 (nihonjin) = Japonais' },
      { kanji: '日', reading: 'hi / nichi', meaning: 'Jour / soleil', context: '日本 (Nihon) = Japon' },
      { kanji: '本', reading: 'hon', meaning: 'Livre / origine', context: '日本 (Nihon) = origine du soleil' },
      { kanji: '禁', reading: 'kin', meaning: 'Interdit', context: '禁煙 (kin\'en) = non-fumeur' },
      { kanji: '止', reading: 'tome / shi', meaning: 'Arrêt / stop', context: '禁止 (kinshi) = interdit' },
      { kanji: '男', reading: 'otoko', meaning: 'Homme', context: 'Sur la porte des toilettes' },
      { kanji: '女', reading: 'onna', meaning: 'Femme', context: 'Sur la porte des toilettes' },
      { kanji: '食', reading: 'shoku / ta', meaning: 'Manger', context: '食べ放題 (tabehōdai) = à volonté' },
    ],
  },
]
