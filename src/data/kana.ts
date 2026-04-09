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
