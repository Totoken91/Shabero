import type { Scenario } from '../types'

export const scenarios: Scenario[] = [
  // ============================================
  // 1. POLITESSE DE BASE
  // ============================================
  {
    id: 'politesse',
    name: 'Politesse de base',
    description: 'Les mots magiques qui ouvrent toutes les portes',
    phrases: [
      { id: 'polite-1', situation: 'Tu veux remercier quelqu\'un :', jp: 'ありがとうございます', hiragana: 'ありがとう ございます', romaji: 'Arigatō gozaimasu', fr: 'Merci beaucoup.', audioText: 'ありがとうございます', tip: 'Casual entre potes : ありがとう suffit. Avec des inconnus, ajoute ございます.', who: 'you', difficulty: 1 },
      { id: 'polite-2', situation: 'Tu veux t\'excuser ou attirer l\'attention :', jp: 'すみません', hiragana: 'すみません', romaji: 'Sumimasen', fr: 'Excusez-moi / Pardon / Merci.', audioText: 'すみません', tip: 'LE mot magique. Ça marche pour s\'excuser ET remercier. 50 fois par jour.', who: 'you', difficulty: 1 },
      { id: 'polite-3', situation: 'Tu refuses poliment quelque chose :', jp: '大丈夫です', hiragana: 'だいじょうぶです', romaji: 'Daijōbu desu', fr: 'C\'est bon / Non merci.', audioText: '大丈夫です', tip: 'Avec un petit geste de la main = refus poli. Couteau suisse du japonais.', who: 'you', difficulty: 1 },
      { id: 'polite-4', situation: 'Avant de manger (OBLIGATOIRE) :', jp: 'いただきます', hiragana: 'いただきます', romaji: 'Itadakimasu', fr: 'Bon appétit.', audioText: 'いただきます', tip: 'Joins les mains, petite inclinaison. Super touchant quand un étranger le fait.', who: 'you', difficulty: 1 },
      { id: 'polite-5', situation: 'Après avoir mangé :', jp: 'ごちそうさまでした', hiragana: 'ごちそうさま でした', romaji: 'Gochisōsama deshita', fr: 'Merci pour le repas.', audioText: 'ごちそうさまでした', tip: 'Dis-le au staff en partant du resto. La classe absolue.', who: 'you', difficulty: 1 },
      { id: 'polite-6', situation: 'Tu déranges quelqu\'un ou tu passes devant :', jp: '失礼します', hiragana: 'しつれいします', romaji: 'Shitsurei shimasu', fr: 'Pardon pour le dérangement.', audioText: '失礼します', tip: 'Plus formel que すみません. Magasin chic, ryokan, bureau.', who: 'you', difficulty: 2 },
      { id: 'polite-7', situation: 'Tu veux dire oui / accepter :', jp: 'はい、お願いします', hiragana: 'はい、おねがいします', romaji: 'Hai, onegai shimasu', fr: 'Oui, s\'il vous plaît.', audioText: 'はい、お願いします', tip: 'Combo gagnant pour accepter quoi que ce soit.', who: 'you', difficulty: 1 },
      { id: 'polite-8', situation: 'Tu veux dire non poliment :', jp: 'ちょっと…大丈夫です', hiragana: 'ちょっと… だいじょうぶです', romaji: 'Chotto... daijōbu desu', fr: 'Hmm... ça va aller (= non merci).', audioText: 'ちょっと、大丈夫です', tip: 'Au Japon on dit rarement "non". Le ちょっと + pause = non poli.', who: 'you', difficulty: 1 },
      { id: 'polite-9', situation: 'Tu quittes un lieu avant les autres :', jp: 'お先に失礼します', hiragana: 'おさきに しつれいします', romaji: 'Osaki ni shitsurei shimasu', fr: 'Je m\'en vais, excusez-moi.', audioText: 'お先に失礼します', tip: 'Surtout au travail mais ça marche en quittant un bar. Très classe.', who: 'you', difficulty: 2 },
      { id: 'polite-10', situation: 'Tu rencontres quelqu\'un pour la première fois :', jp: '初めまして、よろしくお願いします', hiragana: 'はじめまして、よろしく おねがいします', romaji: 'Hajimemashite, yoroshiku onegai shimasu', fr: 'Enchanté, ravi de vous connaître.', audioText: '初めまして、よろしくお願いします', tip: 'Casual entre jeunes : よろしく！ suffit.', who: 'you', difficulty: 1 },
    ],
  },

  // ============================================
  // 2. PARLER DE SOI
  // ============================================
  {
    id: 'parlersoi',
    name: 'Parler de soi',
    description: 'R\u00e9pondre aux questions que TOUT Japonais te posera',
    phrases: [
      { id: 'soi-1', situation: 'Un Japonais curieux engage la conversation :', jp: '\u3069\u3053\u304b\u3089\u6765\u305f\u306e\uff1f', hiragana: '\u3069\u3053\u304b\u3089 \u304d\u305f\u306e\uff1f', romaji: 'Doko kara kita no?', fr: 'Tu viens d\'o\u00f9 ?', audioText: '\u3069\u3053\u304b\u3089\u6765\u305f\u306e\uff1f', tip: 'C\'est la question #1 que TOUT Japonais pose \u00e0 un \u00e9tranger. Pr\u00e9pare ta r\u00e9ponse, tu vas la dire 100 fois.', who: 'them', difficulty: 1 },
      { id: 'soi-2', situation: 'Tu r\u00e9ponds que tu viens de France :', jp: '\u30d5\u30e9\u30f3\u30b9\u304b\u3089\u6765\u307e\u3057\u305f', hiragana: '\u30d5\u30e9\u30f3\u30b9\u304b\u3089 \u304d\u307e\u3057\u305f', romaji: 'Furansu kara kimashita', fr: 'Je viens de France.', audioText: '\u30d5\u30e9\u30f3\u30b9\u304b\u3089\u6765\u307e\u3057\u305f', tip: 'Les Japonais ADORENT la France. Pr\u00e9pare-toi \u00e0 entendre \u30d1\u30ea\uff1f m\u00eame si tu viens de Limoges.', who: 'you', difficulty: 1 },
      { id: 'soi-3', situation: 'Ils veulent savoir si t\'es un habitu\u00e9 ou un bleu :', jp: '\u65e5\u672c\u306f\u521d\u3081\u3066\uff1f', hiragana: '\u306b\u307b\u3093\u306f \u306f\u3058\u3081\u3066\uff1f', romaji: 'Nihon wa hajimete?', fr: 'C\'est ta premi\u00e8re fois au Japon ?', audioText: '\u65e5\u672c\u306f\u521d\u3081\u3066\uff1f', tip: 'Si oui \u2192 \u306f\u3044\u3001\u521d\u3081\u3066\u3067\u3059. Si non \u2192 \u3044\u3084\u3001\u4e8c\u56de\u76ee\u3067\u3059 (c\'est la 2e fois).', who: 'them', difficulty: 1 },
      { id: 'soi-4', situation: 'Tu confirmes que c\'est ta premi\u00e8re fois avec enthousiasme :', jp: '\u521d\u3081\u3066\u3067\u3059\u3002\u3082\u3046\u6700\u9ad8\u3067\u3059\u3002', hiragana: '\u306f\u3058\u3081\u3066\u3067\u3059\u3002\u3082\u3046 \u3055\u3044\u3053\u3046\u3067\u3059\u3002', romaji: 'Hajimete desu. M\u014d saikou desu.', fr: 'C\'est ma premi\u00e8re fois. C\'est d\u00e9j\u00e0 incroyable.', audioText: '\u521d\u3081\u3066\u3067\u3059\u3002\u3082\u3046\u6700\u9ad8\u3067\u3059\u3002', tip: 'Le \u3082\u3046\u6700\u9ad8\u3067\u3059 va faire fondre ton interlocuteur.', who: 'you', difficulty: 1 },
      { id: 'soi-5', situation: 'Ils veulent savoir combien de temps tu restes :', jp: '\u3044\u3064\u307e\u3067\u3044\u308b\u306e\uff1f', hiragana: '\u3044\u3064\u307e\u3067 \u3044\u308b\u306e\uff1f', romaji: 'Itsu made iru no?', fr: 'Tu restes jusqu\'a quand ?', audioText: '\u3044\u3064\u307e\u3067\u3044\u308b\u306e\uff1f', tip: 'Variante : \u3069\u306e\u304f\u3089\u3044\u3044\u308b\u306e\uff1f (tu restes combien de temps ?).', who: 'them', difficulty: 1 },
      { id: 'soi-6', situation: 'Tu r\u00e9ponds avec la dur\u00e9e de ton s\u00e9jour :', jp: '\u4e8c\u9031\u9593\u3050\u3089\u3044\u3067\u3059', hiragana: '\u306b\u3057\u3085\u3046\u304b\u3093 \u3050\u3089\u3044\u3067\u3059', romaji: 'Ni-sh\u016bkan gurai desu', fr: 'Environ deux semaines.', audioText: '\u4e8c\u9031\u9593\u3050\u3089\u3044\u3067\u3059', tip: '\u3050\u3089\u3044 (environ) c\'est ton ami. \u4e00\u9031\u9593 (1 semaine), \u4e09\u9031\u9593 (3 semaines), \u4e00\u30f6\u6708 (1 mois).', who: 'you', difficulty: 1 },
      { id: 'soi-7', situation: 'Ils veulent savoir dans quel coin tu te poses :', jp: '\u3069\u3053\u306b\u6cca\u307e\u3063\u3066\u3044\u308b\u306e\uff1f', hiragana: '\u3069\u3053\u306b \u3068\u307e\u3063\u3066\u3044\u308b\u306e\uff1f', romaji: 'Doko ni tomatteiru no?', fr: 'Tu loges o\u00f9 ?', audioText: '\u3069\u3053\u306b\u6cca\u307e\u3063\u3066\u3044\u308b\u306e\uff1f', tip: 'Variante : \u3069\u3053\u306e\u30db\u30c6\u30eb\uff1f (quel h\u00f4tel ?).', who: 'them', difficulty: 1 },
      { id: 'soi-8', situation: 'Tu r\u00e9ponds avec ton quartier :', jp: '\u65b0\u5bbf\u306e\u30db\u30c6\u30eb\u306b\u6cca\u307e\u3063\u3066\u307e\u3059', hiragana: '\u3057\u3093\u3058\u3085\u304f\u306e \u30db\u30c6\u30eb\u306b \u3068\u307e\u3063\u3066\u307e\u3059', romaji: 'Shinjuku no hoteru ni tomattemasu', fr: 'Je loge dans un h\u00f4tel \u00e0 Shinjuku.', audioText: '\u65b0\u5bbf\u306e\u30db\u30c6\u30eb\u306b\u6cca\u307e\u3063\u3066\u307e\u3059', tip: 'Remplace par : Airbnb, \u30b2\u30b9\u30c8\u30cf\u30a6\u30b9 (guesthouse), \u53cb\u9054\u306e\u5bb6 (chez un ami).', who: 'you', difficulty: 1 },
      { id: 'soi-9', situation: 'La question sur ton boulot :', jp: '\u4ed5\u4e8b\u306f\u4f55\u3057\u3066\u308b\u306e\uff1f', hiragana: '\u3057\u3054\u3068\u306f \u306a\u306b \u3057\u3066\u308b\u306e\uff1f', romaji: 'Shigoto wa nani shiteru no?', fr: 'Tu fais quoi comme travail ?', audioText: '\u4ed5\u4e8b\u306f\u4f55\u3057\u3066\u308b\u306e\uff1f', tip: 'La question sur ton boulot arrive toujours dans les 5 premi\u00e8res minutes.', who: 'them', difficulty: 1 },
      { id: 'soi-10', situation: 'Tu r\u00e9ponds sur ton m\u00e9tier :', jp: 'IT\u95a2\u4fc2\u306e\u4ed5\u4e8b\u3057\u3066\u307e\u3059', hiragana: '\u30a2\u30a4\u30c6\u30a3\u30fc\u304b\u3093\u3051\u3044\u306e \u3057\u3054\u3068 \u3057\u3066\u307e\u3059', romaji: 'IT kankei no shigoto shitemasu', fr: 'Je travaille dans l\'informatique.', audioText: 'IT\u95a2\u4fc2\u306e\u4ed5\u4e8b\u3057\u3066\u307e\u3059', tip: 'Autres jobs : \u5b66\u751f\u3067\u3059 (\u00e9tudiant), \u5148\u751f\u3067\u3059 (prof), \u30a8\u30f3\u30b8\u30cb\u30a2\u3067\u3059 (ing\u00e9nieur).', who: 'you', difficulty: 1 },
      { id: 'soi-11', situation: 'Ils veulent savoir pourquoi le Japon :', jp: '\u306a\u3093\u3067\u65e5\u672c\u306b\u6765\u305f\u306e\uff1f', hiragana: '\u306a\u3093\u3067 \u306b\u307b\u3093\u306b \u304d\u305f\u306e\uff1f', romaji: 'Nande Nihon ni kita no?', fr: 'Pourquoi t\'es venu au Japon ?', audioText: '\u306a\u3093\u3067\u65e5\u672c\u306b\u6765\u305f\u306e\uff1f', tip: 'C\'est LA question o\u00f9 tu peux cr\u00e9er un vrai lien.', who: 'them', difficulty: 1 },
      { id: 'soi-12', situation: 'Tu expliques ta motivation :', jp: '\u305a\u3063\u3068\u6765\u3066\u307f\u305f\u304b\u3063\u305f\u3002\u65e5\u672c\u306e\u6587\u5316\u3068\u98df\u3079\u7269\u304c\u5927\u597d\u304d\u3067\u3002', hiragana: '\u305a\u3063\u3068 \u304d\u3066\u307f\u305f\u304b\u3063\u305f\u3002\u306b\u307b\u3093\u306e \u3076\u3093\u304b\u3068 \u305f\u3079\u3082\u306e\u304c \u3060\u3044\u3059\u304d\u3067\u3002', romaji: 'Zutto kitemikakatta. Nihon no bunka to tabemono ga daisuki de.', fr: 'J\'ai toujours voulu venir. J\'adore la culture et la bouffe japonaise.', audioText: '\u305a\u3063\u3068\u6765\u3066\u307f\u305f\u304b\u3063\u305f\u3002\u65e5\u672c\u306e\u6587\u5316\u3068\u98df\u3079\u7269\u304c\u5927\u597d\u304d\u3067\u3002', tip: 'Alternatives : \u30a2\u30cb\u30e1\u304c\u304d\u3063\u304b\u3051\u3067 (gr\u00e2ce aux animes), \u65e5\u672c\u8a9e\u3092\u52c9\u5f37\u3057\u3066\u3066 (j\'\u00e9tudie le japonais).', who: 'you', difficulty: 2 },
      { id: 'soi-13', situation: 'Ils te demandent ce que t\'as aim\u00e9 :', jp: '\u65e5\u672c\u3067\u4e00\u756a\u3088\u304b\u3063\u305f\u3053\u3068\u306f\uff1f', hiragana: '\u306b\u307b\u3093\u3067 \u3044\u3061\u3070\u3093 \u3088\u304b\u3063\u305f\u3053\u3068\u306f\uff1f', romaji: 'Nihon de ichiban yokatta koto wa?', fr: 'C\'est quoi le truc le mieux au Japon ?', audioText: '\u65e5\u672c\u3067\u4e00\u756a\u3088\u304b\u3063\u305f\u3053\u3068\u306f\uff1f', tip: 'Variante : \u65e5\u672c\u3069\u3046\uff1f (le Japon, c\'est comment ?).', who: 'them', difficulty: 1 },
      { id: 'soi-14', situation: 'Tu partages ton coup de coeur :', jp: '\u98df\u3079\u7269\u304c\u3084\u3070\u3044\u3002\u6628\u65e5\u98df\u3079\u305f\u30e9\u30fc\u30e1\u30f3\u304c\u4eba\u751f\u3067\u4e00\u756a\u3046\u307e\u304b\u3063\u305f\u3002', hiragana: '\u305f\u3079\u3082\u306e\u304c \u3084\u3070\u3044\u3002\u304d\u306e\u3046 \u305f\u3079\u305f \u30e9\u30fc\u30e1\u30f3\u304c \u3058\u3093\u305b\u3044\u3067 \u3044\u3061\u3070\u3093 \u3046\u307e\u304b\u3063\u305f\u3002', romaji: 'Tabemono ga yabai. Kinou tabeta r\u0101men ga jinsei de ichiban umakatta.', fr: 'La bouffe est dingue. Les ramens d\'hier c\'\u00e9tait les meilleurs de ma vie.', audioText: '\u98df\u3079\u7269\u304c\u3084\u3070\u3044\u3002\u6628\u65e5\u98df\u3079\u305f\u30e9\u30fc\u30e1\u30f3\u304c\u4eba\u751f\u3067\u4e00\u756a\u3046\u307e\u304b\u3063\u305f\u3002', tip: 'Ce genre de r\u00e9ponse sp\u00e9cifique et enthousiaste va lancer une vraie conversation.', who: 'you', difficulty: 2 },
    ],
  },

  // ============================================
  // 3. NOMBRES ESSENTIELS
  // ============================================
  {
    id: 'nombres',
    name: 'Nombres essentiels',
    description: 'Commander, compter, lire les prix',
    phrases: [
      { id: 'numbers-1', situation: 'Tu veux commander un de quelque chose :', jp: '一つください', hiragana: 'ひとつ ください', romaji: 'Hitotsu kudasai', fr: 'Un s\'il vous plaît.', audioText: '一つください', tip: 'ひとつ (1), ふたつ (2), みっつ (3) — ça marche pour TOUT.', who: 'you', difficulty: 1 },
      { id: 'numbers-2', situation: 'Tu commandes deux de quelque chose :', jp: '二つください', hiragana: 'ふたつ ください', romaji: 'Futatsu kudasai', fr: 'Deux s\'il vous plaît.', audioText: '二つください', tip: 'Montre deux doigts + ください, ça marche aussi.', who: 'you', difficulty: 1 },
      { id: 'numbers-3', situation: 'On te demande combien vous êtes, tu es seul :', jp: '一人です', hiragana: 'ひとりです', romaji: 'Hitori desu', fr: 'Une personne.', audioText: '一人です', tip: '一人 (1), 二人 (2, futari), 三人 (3, sannin), 四人 (4, yonin).', who: 'you', difficulty: 1 },
      { id: 'numbers-4', situation: 'Vous êtes deux au resto :', jp: '二人です', hiragana: 'ふたりです', romaji: 'Futari desu', fr: 'Deux personnes.', audioText: '二人です', tip: 'La question la plus fréquente au resto.', who: 'you', difficulty: 1 },
      { id: 'numbers-5', situation: 'Tu veux savoir combien ça coûte :', jp: 'いくらですか？', hiragana: 'いくらですか？', romaji: 'Ikura desu ka?', fr: 'C\'est combien ?', audioText: 'いくらですか', tip: '千円 (sen-en) = 1000¥ ≈ 6€. 万 (man) = 10 000.', who: 'you', difficulty: 1 },
      { id: 'numbers-6', situation: 'Les chiffres de base à connaître :', jp: '一、二、三、四、五、六、七、八、九、十', hiragana: 'いち、に、さん、よん、ご、ろく、なな、はち、きゅう、じゅう', romaji: 'Ichi, ni, san, yon, go, roku, nana, hachi, kyū, jū', fr: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10.', audioText: 'いち、に、さん、よん、ご、ろく、なな、はち、きゅう、じゅう', tip: '100=百 (hyaku), 1000=千 (sen), 10000=万 (man).', who: 'you', difficulty: 1 },
      { id: 'numbers-7', situation: 'Tu commandes trois de quelque chose :', jp: '三つください', hiragana: 'みっつ ください', romaji: 'Mittsu kudasai', fr: 'Trois s\'il vous plaît.', audioText: '三つください', tip: 'Au-delà de 3, montre tes doigts + ください.', who: 'you', difficulty: 2 },
      { id: 'numbers-8', situation: 'Tu veux connaître les horaires :', jp: '何時から何時までですか？', hiragana: 'なんじから なんじまでですか？', romaji: 'Nanji kara nanji made desu ka?', fr: 'C\'est de quelle heure à quelle heure ?', audioText: '何時から何時までですか', tip: 'から = de (début), まで = jusqu\'à (fin).', who: 'you', difficulty: 1 },
      { id: 'numbers-9', situation: 'On t\'annonce un prix à la caisse :', jp: '千三百円になります', hiragana: 'せんさんびゃくえんに なります', romaji: 'Sen sanbyaku en ni narimasu', fr: 'Ça fera 1300 yen.', audioText: '千三百円になります', tip: 'Tu entendras "[nombre]円になります" à CHAQUE caisse. Regarde l\'écran de la caisse si tu comprends pas le montant.', who: 'them', difficulty: 1 },
      { id: 'numbers-10', situation: 'Tu veux savoir si tu peux payer par carte :', jp: 'カードで大丈夫ですか？', hiragana: 'カードで だいじょうぶですか？', romaji: 'Kādo de daijōbu desu ka?', fr: 'Je peux payer par carte ?', audioText: 'カードで大丈夫ですか', tip: 'Le Japon est très cash. Petits restos = liquide. Aie toujours du cash.', who: 'you', difficulty: 1 },
    ],
  },

  // ============================================
  // 3. SE REPÉRER
  // ============================================
  {
    id: 'navigation',
    name: 'Se repérer',
    description: 'Trouver ton chemin, les toilettes, un taxi',
    phrases: [
      { id: 'navi-1', situation: 'Tu es complètement paumé :', jp: 'すみません、ここはどこですか？', hiragana: 'すみません、ここは どこですか？', romaji: 'Sumimasen, koko wa doko desu ka?', fr: 'Excusez-moi, je suis où là ?', audioText: 'すみません、ここはどこですか', tip: 'Montre ton tel avec Google Maps en même temps.', who: 'you', difficulty: 1 },
      { id: 'navi-2', situation: 'Tu cherches un konbini ou une gare dans le coin :', jp: 'この辺にコンビニありますか？', hiragana: 'このへんに コンビニ ありますか？', romaji: 'Kono hen ni konbini arimasu ka?', fr: 'Y\'a un konbini dans le coin ?', audioText: 'この辺にコンビニありますか', tip: 'Remplace コンビニ par 駅 (gare), トイレ, ATM, etc.', who: 'you', difficulty: 1 },
      { id: 'navi-3', situation: 'Tu veux savoir si c\'est loin à pied :', jp: '歩いて行けますか？', hiragana: 'あるいて いけますか？', romaji: 'Aruite ikemasu ka?', fr: 'On peut y aller à pied ?', audioText: '歩いて行けますか', tip: '歩いて10分 = 10 min à pied. 分 (fun) = minutes.', who: 'you', difficulty: 1 },
      { id: 'navi-4', situation: 'Quelqu\'un t\'indique une direction :', jp: 'まっすぐ行って、右に曲がってください', hiragana: 'まっすぐ いって、みぎに まがって ください', romaji: 'Massugu itte, migi ni magatte kudasai', fr: 'Tout droit, puis tournez à droite.', audioText: 'まっすぐ行って、右に曲がってください', tip: 'まっすぐ (tout droit), 右/みぎ (droite), 左/ひだり (gauche).', who: 'them', difficulty: 1 },
      { id: 'navi-5', situation: 'T\'as rien compris à ce qu\'on vient de t\'expliquer :', jp: 'ごめんなさい、もう一回お願いします', hiragana: 'ごめんなさい、もういっかい おねがいします', romaji: 'Gomen nasai, mō ikkai onegai shimasu', fr: 'Pardon, vous pouvez répéter ?', audioText: 'ごめんなさい、もう一回お願いします', tip: 'Ajoute ゆっくり (yukkuri = lentement) pour ralentir.', who: 'you', difficulty: 1 },
      { id: 'navi-6', situation: 'Tu montres un lieu sur ton tel et demandes le chemin :', jp: 'ここに行きたいんですけど', hiragana: 'ここに いきたいんですけど', romaji: 'Koko ni ikitai n desu kedo', fr: 'Je veux aller ici.', audioText: 'ここに行きたいんですけど', tip: 'LA technique ultime : Google Maps + cette phrase = 100% de réussite.', who: 'you', difficulty: 1 },
      { id: 'navi-7', situation: 'Urgence toilettes :', jp: 'トイレはどこですか？', hiragana: 'トイレは どこですか？', romaji: 'Toire wa doko desu ka?', fr: 'Où sont les toilettes ?', audioText: 'トイレはどこですか', tip: 'Konbini, gares, centres co — y\'a des toilettes partout au Japon.', who: 'you', difficulty: 1 },
      { id: 'navi-8', situation: 'Tu veux donner une adresse au taxi :', jp: 'この住所までお願いします', hiragana: 'このじゅうしょまで おねがいします', romaji: 'Kono jūsho made onegai shimasu', fr: 'À cette adresse svp.', audioText: 'この住所までお願いします', tip: 'Montre l\'adresse sur ton tel. Les portes du taxi s\'ouvrent TOUTES SEULES.', who: 'you', difficulty: 1 },
      { id: 'navi-9', situation: 'Google Maps bug :', jp: 'Googleマップが動かない', hiragana: 'グーグルマップが うごかない', romaji: 'Gūguru mappu ga ugokanai', fr: 'Google Maps marche pas.', audioText: 'グーグルマップが動かない', tip: 'Télécharge les cartes offline AVANT de partir.', who: 'you', difficulty: 3 },
      { id: 'navi-10', situation: 'Tu veux savoir combien de temps ça prend :', jp: 'どのくらいかかりますか？', hiragana: 'どのくらい かかりますか？', romaji: 'Dono kurai kakarimasu ka?', fr: 'Ça prend combien de temps ?', audioText: 'どのくらいかかりますか', tip: '分 (fun) = minutes, 時間 (jikan) = heures. 30分 = 30 min.', who: 'you', difficulty: 1 },
    ],
  },

  // ============================================
  // 4. KONBINI
  // ============================================
  {
    id: 'konbini',
    name: 'Konbini',
    description: 'Comprendre le caissier et répondre comme un local',
    phrases: [
      {
        id: 'konbini-1', situation: 'Tu poses tes articles sur le comptoir, le caissier te demande :', jp: 'ポイントカードはありますか？', hiragana: 'ポイントカードはありますか？', romaji: 'Pointo kādo wa arimasu ka?', fr: 'Vous avez une carte de fidélité ?', audioText: 'ポイントカードはありますか？', tip: 'On te pose ça À CHAQUE FOIS. Réponds juste 大丈夫です.', who: 'them', difficulty: 1,
      },
      {
        id: 'konbini-2', situation: 'Tu n\'as pas de carte de fidélité, tu réponds :', jp: 'あ、大丈夫っす', hiragana: 'あ、だいじょうぶっす', romaji: 'A, daijōbu ssu', fr: 'Ah nan c\'est bon', audioText: 'あ、大丈夫っす', tip: 'っす = version courte de です — jeune et naturel', who: 'you', difficulty: 1,
      },
      {
        id: 'konbini-3', situation: 'Tu achètes un bento, le caissier te demande :', jp: 'あたためますか？', hiragana: 'あたためますか？', romaji: 'Atatamemasu ka?', fr: 'Je vous le chauffe ?', audioText: 'あたためますか？', tip: 'Proposé pour les bento, onigiri, nikuman. C\'est gratuit.', who: 'them', difficulty: 1,
      },
      {
        id: 'konbini-4', situation: 'On te propose de chauffer ton repas, tu réponds :', jp: 'お願いします / 大丈夫です', hiragana: 'おねがいします / だいじょうぶです', romaji: 'Onegaishimasu / Daijōbu desu', fr: 'Oui svp / Non c\'est bon', audioText: 'お願いします', tip: 'Les deux seules réponses dont t\'as besoin dans un konbini', who: 'you', difficulty: 1,
      },
      {
        id: 'konbini-5', situation: 'Le caissier regarde tes articles et te demande :', jp: 'お箸はご利用ですか？', hiragana: 'おはしはごりようですか？', romaji: 'Ohashi wa goriyō desu ka?', fr: 'Vous voulez des baguettes ?', audioText: 'お箸はご利用ですか？', tip: 'Hoche la tête ou dis うん pour oui', who: 'them', difficulty: 2,
      },
      {
        id: 'konbini-6', situation: 'Tu ne veux pas de sac plastique :', jp: '袋いらないです', hiragana: 'ふくろいらないです', romaji: 'Fukuro iranai desu', fr: 'Pas besoin de sac', audioText: '袋いらないです', tip: 'Les sacs sont payants au Japon (3-5¥)', who: 'you', difficulty: 1,
      },
      {
        id: 'konbini-7', situation: 'Tu veux payer avec ta carte transport :', jp: 'Suicaで', hiragana: 'スイカで', romaji: 'Suica de', fr: 'En Suica', audioText: 'スイカで', tip: 'Juste "[moyen de paiement] + で" suffit. PayPayで, カードで...', who: 'you', difficulty: 1,
      },
      {
        id: 'konbini-8', situation: 'Tu ne veux pas de ticket de caisse :', jp: 'レシートいらないです', hiragana: 'レシートいらないです', romaji: 'Reshīto iranai desu', fr: 'Pas besoin du ticket', audioText: 'レシートいらないです', tip: 'Ils te le filent systématiquement sinon', who: 'you', difficulty: 2,
      },
    ],
  },

  // ============================================
  // 5. IZAKAYA & RESTOS
  // ============================================
  {
    id: 'izakaya',
    name: 'Izakaya & Bouffe',
    description: 'Commander, réagir et kiffer la bouffe comme un Japonais',
    phrases: [
      {
        id: 'izakaya-1', situation: 'Tu veux appeler le serveur :', jp: 'すいませーん！', hiragana: 'すいませーん！', romaji: 'Suimasēn!', fr: 'Excusez-moi !', audioText: 'すいません', tip: 'La vraie prononciation orale : すいません pas すみません', who: 'you', difficulty: 1,
      },
      {
        id: 'izakaya-2', situation: 'Tu entres dans le resto, le staff te demande :', jp: '何名様ですか？', hiragana: 'なんめいさまですか？', romaji: 'Nanmei-sama desu ka?', fr: 'Vous êtes combien ?', audioText: '何名様ですか？', tip: 'Première question systématique à l\'entrée', who: 'them', difficulty: 1,
      },
      {
        id: 'izakaya-3', situation: 'On te demande combien vous êtes, tu réponds :', jp: '二人です / 三人です', hiragana: 'ふたりです / さんにんです', romaji: 'Futari desu / Sannin desu', fr: '2 personnes / 3 personnes', audioText: '二人です', tip: 'Montre avec les doigts en même temps', who: 'you', difficulty: 1,
      },
      {
        id: 'izakaya-4', situation: 'Vous êtes installés, le serveur arrive pour la première commande :', jp: 'とりあえず生で！', hiragana: 'とりあえずなまで！', romaji: 'Toriaezu nama de!', fr: 'Pour commencer, une pression !', audioText: 'とりあえず生で', tip: '生 = bière pression. Personne dit ビール en izakaya.', who: 'you', difficulty: 1,
      },
      {
        id: 'izakaya-5', situation: 'Tu sais pas quoi commander, tu demandes :', jp: 'おすすめなんですか？', hiragana: 'おすすめなんですか？', romaji: 'Osusume nan desu ka?', fr: 'C\'est quoi le bon plan ici ?', audioText: 'おすすめなんですか', tip: 'Plus efficace que galérer avec un menu en japonais', who: 'you', difficulty: 2,
      },
      {
        id: 'izakaya-6', situation: 'La bouffe arrive et c\'est incroyable :', jp: 'これめっちゃうまっ！', hiragana: 'これめっちゃうまっ！', romaji: 'Kore meccha uma!', fr: 'C\'est trop bon ce truc !', audioText: 'これめっちゃうまい', tip: 'うまい > おいしい entre potes', who: 'you', difficulty: 1,
      },
      {
        id: 'izakaya-7', situation: 'Tu veux partager ton enthousiasme :', jp: 'めっちゃうまくない？これ', hiragana: 'めっちゃうまくない？これ', romaji: 'Meccha umaku nai? Kore', fr: 'C\'est ouf non ? ça', audioText: 'めっちゃうまくない？これ', tip: 'Question rhétorique — tu sais que c\'est bon', who: 'you', difficulty: 3,
      },
      {
        id: 'izakaya-8', situation: 'Tu proposes de reprendre un verre :', jp: 'もう一杯いっとく？', hiragana: 'もういっぱいいっとく？', romaji: 'Mō ippai ittoku?', fr: 'On s\'en refait un ?', audioText: 'もう一杯いっとく？', tip: 'いっとく = いっておく raccourci — parler entre potes', who: 'you', difficulty: 2,
      },
      {
        id: 'izakaya-9', situation: 'Fin du repas, tu veux payer :', jp: 'お会計お願いします', hiragana: 'おかいけいおねがいします', romaji: 'Okaikei onegaishimasu', fr: 'L\'addition svp', audioText: 'お会計お願いします', tip: 'Tu peux aussi faire un X avec tes index — le serveur comprend', who: 'you', difficulty: 1,
      },
      {
        id: 'izakaya-10', situation: 'En partant, tu dis au staff :', jp: 'ごちそうさまでした！', hiragana: 'ごちそうさまでした！', romaji: 'Gochisōsama deshita!', fr: 'Merci pour le repas !', audioText: 'ごちそうさまでした', tip: 'TOUJOURS dire ça en partant d\'un resto. Hyper apprécié.', who: 'you', difficulty: 1,
      },
    ],
  },

  // ============================================
  // 6. TRAINS & DÉPLACEMENTS
  // ============================================
  {
    id: 'trains',
    name: 'Trains & Métro',
    description: 'Survivre dans le labyrinthe du métro tokyoïte',
    phrases: [
      {
        id: 'trains-1', situation: 'Tu es perdu en gare, tu demandes à quelqu\'un :', jp: '〜に行きたいんですけど', hiragana: '〜にいきたいんですけど', romaji: '~ni ikitain desu kedo', fr: 'Je voudrais aller à...', audioText: '渋谷に行きたいんですけど', tip: 'けど en fin de phrase = doux, naturel. Montre ta destination sur ton tel.', who: 'you', difficulty: 1,
      },
      {
        id: 'trains-2', situation: 'Tu vois un train sur le quai, tu vérifies :', jp: 'この電車〜に止まる？', hiragana: 'このでんしゃ〜にとまる？', romaji: 'Kono densha ~ni tomaru?', fr: 'Ce train s\'arrête à... ?', audioText: 'この電車渋谷に止まりますか', tip: 'Forme courte si tu demandes à un passager', who: 'you', difficulty: 1,
      },
      {
        id: 'trains-3', situation: 'Il est minuit passé, tu réalises :', jp: 'やばい、終電なくね？', hiragana: 'やばい、しゅうでんなくね？', romaji: 'Yabai, shūden naku ne?', fr: 'Merde, y\'a plus de dernier train non ?', audioText: 'やばい、終電なくね', tip: 'なくね？ = ないよね？ abrégé. Trains s\'arrêtent vers minuit.', who: 'you', difficulty: 2,
      },
      {
        id: 'trains-4', situation: 'Tu demandes à ton pote :', jp: '終電何時？', hiragana: 'しゅうでんなんじ？', romaji: 'Shūden nanji?', fr: 'Le dernier train c\'est quand ?', audioText: '終電何時？', tip: 'Forme courte entre potes, pas besoin de ですか', who: 'you', difficulty: 1,
      },
      {
        id: 'trains-5', situation: 'Tu dois changer de ligne mais tu sais plus où :', jp: '乗り換えどこだっけ？', hiragana: 'のりかえどこだっけ？', romaji: 'Norikae doko dakke?', fr: 'C\'était où la correspondance déjà ?', audioText: '乗り換えどこだっけ', tip: 'だっけ = "c\'était... déjà ?" — très naturel', who: 'you', difficulty: 2,
      },
      {
        id: 'trains-6', situation: 'Le train est bondé, tu vois une place :', jp: 'すみません、ここ空いてますか？', hiragana: 'すみません、ここあいてますか？', romaji: 'Sumimasen, koko aitemasu ka?', fr: 'Pardon, c\'est libre ici ?', audioText: 'すみません、ここ空いてますか', tip: 'Reste poli dans le train — silence et respect, c\'est sacré', who: 'you', difficulty: 1,
      },
      {
        id: 'trains-7', situation: 'Tu dois descendre au prochain arrêt :', jp: '次の駅で降りる', hiragana: 'つぎのえきでおりる', romaji: 'Tsugi no eki de oriru', fr: 'Je descends au prochain', audioText: '次の駅で降りる', tip: 'Pour prévenir ton pote ou te frayer un chemin', who: 'you', difficulty: 2,
      },
      {
        id: 'trains-8', situation: 'Vous sprintez et chopez le train in extremis :', jp: '間に合った！', hiragana: 'まにあった！', romaji: 'Maniatta!', fr: 'On l\'a eu !', audioText: '間に合った', tip: 'Le soulagement quand tu chopes le dernier train', who: 'you', difficulty: 3,
      },
    ],
  },

  // ============================================
  // 7. SHOPPING
  // ============================================
  {
    id: 'shopping',
    name: 'Shopping',
    description: 'Shimokita, Harajuku, Don Quichotte — chiner comme un pro',
    phrases: [
      {
        id: 'shopping-1', situation: 'Tu vois un truc intéressant dans la boutique :', jp: 'これ何？', hiragana: 'これなに？', romaji: 'Kore nani?', fr: 'C\'est quoi ça ?', audioText: 'これ何？', tip: 'Court et direct — parfait en boutique', who: 'you', difficulty: 1,
      },
      {
        id: 'shopping-2', situation: 'Tu veux savoir le prix :', jp: 'これいくら？', hiragana: 'これいくら？', romaji: 'Kore ikura?', fr: 'Ça coûte combien ?', audioText: 'これいくら？', tip: 'Pas besoin de ですか — en boutique c\'est normal', who: 'you', difficulty: 1,
      },
      {
        id: 'shopping-3', situation: 'Tu trouves un truc trop stylé :', jp: 'まじかっこいい', hiragana: 'まじかっこいい', romaji: 'Maji kakkoii', fr: 'Trop stylé sérieux', audioText: 'まじかっこいい', tip: 'まじ = sérieusement — amplificateur universel', who: 'you', difficulty: 2,
      },
      {
        id: 'shopping-4', situation: 'Tu veux regarder un article de plus près :', jp: 'ちょっと見せて', hiragana: 'ちょっとみせて', romaji: 'Chotto misete', fr: 'Fais voir un peu', audioText: 'ちょっと見せて', tip: 'Casual mais poli — marche dans toute boutique', who: 'you', difficulty: 2,
      },
      {
        id: 'shopping-5', situation: 'Tu veux essayer un vêtement :', jp: '試着していいですか？', hiragana: 'しちゃくしていいですか？', romaji: 'Shichaku shite ii desu ka?', fr: 'Je peux essayer ?', audioText: '試着していいですか', tip: 'Reste poli ici — les cabines d\'essayage c\'est sérieux au Japon', who: 'you', difficulty: 2,
      },
      {
        id: 'shopping-6', situation: 'Le prix est un peu salé :', jp: 'ちょっと高いな...', hiragana: 'ちょっとたかいな...', romaji: 'Chotto takai na...', fr: 'Hmm un peu cher...', audioText: 'ちょっと高いな', tip: 'な en fin = tu réfléchis tout haut. Naturel et pas impoli.', who: 'you', difficulty: 2,
      },
      {
        id: 'shopping-7', situation: 'Tu te décides à acheter :', jp: 'これにする！', hiragana: 'これにする！', romaji: 'Kore ni suru!', fr: 'Je prends ça !', audioText: 'これにする', tip: 'にする = décider — plus naturel que ください', who: 'you', difficulty: 1,
      },
      {
        id: 'shopping-8', situation: 'Le vendeur te colle, tu veux juste regarder :', jp: '見てるだけっす', hiragana: 'みてるだけっす', romaji: 'Miteru dake ssu', fr: 'Je regarde juste', audioText: '見てるだけです', tip: 'っす = です casual — poli sans être formel', who: 'you', difficulty: 1,
      },
    ],
  },

  // ============================================
  // 8. HÔTEL
  // ============================================
  {
    id: 'hotel',
    name: 'Hôtel',
    description: 'Check-in, check-out, galères de chambre',
    phrases: [
      { id: 'hotel-1', situation: 'Tu arrives à l\'hôtel, tu veux faire le check-in :', jp: 'チェックインお願いします', hiragana: 'チェックイン おねがいします', romaji: 'Chekku-in onegai shimasu', fr: 'Check-in s\'il vous plaît.', audioText: 'チェックインお願いします', tip: 'Montre ta réservation sur ton tel en même temps, ça accélère tout.', who: 'you', difficulty: 1 },
      { id: 'hotel-2', situation: 'Tu veux laisser tes valises avant le check-in :', jp: '荷物預かってもらえますか？', hiragana: 'にもつ あずかって もらえますか？', romaji: 'Nimotsu azukatte moraemasu ka?', fr: 'Vous pouvez garder mes bagages ?', audioText: '荷物預かってもらえますか', tip: 'Quasi tous les hôtels au Japon acceptent. Même les auberges.', who: 'you', difficulty: 1 },
      { id: 'hotel-3', situation: 'Tu veux te connecter au wifi :', jp: 'Wi-Fiのパスワードは何ですか？', hiragana: 'ワイファイの パスワードは なんですか？', romaji: 'Wai-fai no pasuwādo wa nan desu ka?', fr: 'C\'est quoi le mdp du wifi ?', audioText: 'ワイファイのパスワードは何ですか？', tip: 'Souvent écrit sur une carte dans la chambre.', who: 'you', difficulty: 2 },
      { id: 'hotel-4', situation: 'La clim déconne et tu comprends pas les boutons :', jp: 'エアコンの使い方がわからないんですけど', hiragana: 'エアコンの つかいかたが わからないんですけど', romaji: 'Eakon no tsukaikata ga wakaranai n desu kedo', fr: 'Je comprends pas comment marche la clim.', audioText: 'エアコンの使い方がわからないんですけど', tip: '暖房 (danbō) = chauffage, 冷房 (reibō) = clim froide.', who: 'you', difficulty: 2 },
      { id: 'hotel-5', situation: 'Tu veux savoir l\'heure du check-out :', jp: 'チェックアウトは何時ですか？', hiragana: 'チェックアウトは なんじですか？', romaji: 'Chekku-auto wa nanji desu ka?', fr: 'Le check-out c\'est à quelle heure ?', audioText: 'チェックアウトは何時ですか', tip: 'En général 10h ou 11h. Demande un late check-out si besoin.', who: 'you', difficulty: 1 },
      { id: 'hotel-6', situation: 'La douche est cassée dans ta chambre :', jp: 'すみません、部屋のシャワーが壊れているんですけど', hiragana: 'すみません、へやの シャワー が こわれているんですけど', romaji: 'Sumimasen, heya no shawā ga kowarete iru n desu kedo', fr: 'Excusez-moi, la douche de la chambre est cassée.', audioText: 'すみません、部屋のシャワーが壊れているんですけど', tip: 'Remplace シャワー par : トイレ (toilettes), テレビ (TV), エアコン (clim).', who: 'you', difficulty: 2 },
      { id: 'hotel-7', situation: 'Tu veux une serviette en plus :', jp: 'タオルもう一枚もらえますか？', hiragana: 'タオル もういちまい もらえますか？', romaji: 'Taoru mō ichi-mai moraemasu ka?', fr: 'Je peux avoir une serviette de plus ?', audioText: 'タオルもう一枚もらえますか', tip: 'Remplace タオル par 枕 (makura = oreiller) ou 毛布 (mōfu = couverture).', who: 'you', difficulty: 2 },
      { id: 'hotel-8', situation: 'Tu veux rester une nuit de plus :', jp: 'もう一泊延長できますか？', hiragana: 'もう いっぱく えんちょう できますか？', romaji: 'Mō ip-paku enchō dekimasu ka?', fr: 'Je peux prolonger d\'une nuit ?', audioText: 'もう一泊延長できますか', tip: 'Demande tôt le matin pour plus de chances.', who: 'you', difficulty: 2 },
      { id: 'hotel-9', situation: 'Le réceptionniste te demande ton passeport :', jp: 'パスポートを見せていただけますか？', hiragana: 'パスポートを みせて いただけますか？', romaji: 'Pasupōto o misete itadakemasu ka?', fr: 'Puis-je voir votre passeport ?', audioText: 'パスポートを見せていただけますか', tip: 'C\'est la LOI au Japon. Tous les hôtels vérifient.', who: 'them', difficulty: 1 },
      { id: 'hotel-10', situation: 'Tu quittes l\'hôtel, tu veux être classe :', jp: 'お世話になりました', hiragana: 'おせわに なりました', romaji: 'Osewa ni narimashita', fr: 'Merci pour tout.', audioText: 'お世話になりました', tip: 'LA phrase classe pour partir. Le staff va adorer.', who: 'you', difficulty: 1 },
    ],
  },

  // ============================================
  // 9. URGENCES
  // ============================================
  {
    id: 'urgences',
    name: 'Urgences',
    description: 'Les phrases vitales quand ça part en vrille',
    phrases: [
      {
        id: 'urgences-1', situation: 'Tu as besoin d\'aide immédiatement :', jp: '助けてください！', hiragana: 'たすけてください！', romaji: 'Tasukete kudasai!', fr: 'Aidez-moi !', audioText: '助けてください', tip: 'À graver dans ta tête avant le voyage', who: 'you', difficulty: 1,
      },
      {
        id: 'urgences-2', situation: 'Tu as besoin de la police :', jp: '警察呼んでください', hiragana: 'けいさつよんでください', romaji: 'Keisatsu yonde kudasai', fr: 'Appelez la police svp', audioText: '警察呼んでください', tip: '110 = police / 119 = ambulance au Japon', who: 'you', difficulty: 1,
      },
      {
        id: 'urgences-3', situation: 'Tu dois aller à l\'hôpital :', jp: '病院どこですか？', hiragana: 'びょういんどこですか？', romaji: 'Byōin doko desu ka?', fr: 'L\'hôpital c\'est où ?', audioText: '病院どこですか', tip: 'Garde le poli même en panique — les gens t\'aideront', who: 'you', difficulty: 1,
      },
      {
        id: 'urgences-4', situation: 'Tu te sens mal dans un lieu public :', jp: '気分が悪いです', hiragana: 'きぶんがわるいです', romaji: 'Kibun ga warui desu', fr: 'Je me sens pas bien', audioText: '気分が悪いです', tip: 'Dis-le à n\'importe qui — konbini, train, on t\'aidera', who: 'you', difficulty: 1,
      },
      {
        id: 'urgences-5', situation: 'Tu as perdu ton portefeuille :', jp: '財布なくした...', hiragana: 'さいふなくした...', romaji: 'Saifu nakushita...', fr: 'J\'ai perdu mon portefeuille...', audioText: '財布なくしました', tip: 'Va au koban (poste de police de quartier) le plus proche', who: 'you', difficulty: 1,
      },
      {
        id: 'urgences-6', situation: 'Tu as besoin de quelqu\'un qui parle anglais :', jp: '英語できる人いますか？', hiragana: 'えいごできるひといますか？', romaji: 'Eigo dekiru hito imasu ka?', fr: 'Y\'a quelqu\'un qui parle anglais ?', audioText: '英語できる人いますか', tip: 'できる = "qui peut" — plus naturel que 話せる ici', who: 'you', difficulty: 1,
      },
      {
        id: 'urgences-7', situation: 'Tu as oublié ton téléphone quelque part :', jp: 'スマホ忘れた！', hiragana: 'スマホわすれた！', romaji: 'Sumaho wasureta!', fr: 'J\'ai oublié mon tel !', audioText: 'スマホ忘れた', tip: 'スマホ = smartphone. Va voir au dernier endroit visité.', who: 'you', difficulty: 1,
      },
    ],
  },

  // ============================================
  // 10. SOCIALISER
  // ============================================
  {
    id: 'socialiser',
    name: 'Socialiser',
    description: 'Se faire des potes, discuter, créer des liens',
    phrases: [
      {
        id: 'social-1', situation: 'Tu te présentes dans un bar :', jp: 'フランスから来た！', hiragana: 'フランスからきた！', romaji: 'Furansu kara kita!', fr: 'Je viens de France !', audioText: 'フランスから来た', tip: 'から来た > です pour se présenter entre jeunes', who: 'you', difficulty: 1,
      },
      {
        id: 'social-2', situation: 'Tu veux connaître son prénom :', jp: '名前なんていうの？', hiragana: 'なまえなんていうの？', romaji: 'Namae nan te iu no?', fr: 'Tu t\'appelles comment ?', audioText: '名前なんていうの', tip: 'Forme naturelle — pas "お名前は何ですか"', who: 'you', difficulty: 1,
      },
      {
        id: 'social-3', situation: 'Tu veux expliquer que ton japonais est limité :', jp: '日本語まだまだだけど...', hiragana: 'にほんごまだまだだけど...', romaji: 'Nihongo mada mada da kedo...', fr: 'Mon japonais est encore nul mais...', audioText: '日本語まだまだだけど', tip: 'まだまだ = encore loin du compte. Humble et honnête.', who: 'you', difficulty: 2,
      },
      {
        id: 'social-4', situation: 'La personne te complimente sur ton japonais :', jp: '日本語上手だね！', hiragana: 'にほんごじょうずだね！', romaji: 'Nihongo jōzu da ne!', fr: 'Tu parles bien japonais !', audioText: '日本語上手だね', tip: 'On te le dira TOUT LE TEMPS — même si tu connais 3 mots', who: 'them', difficulty: 1,
      },
      {
        id: 'social-5', situation: 'On te complimente, tu réponds humblement :', jp: 'いやいや、全然だよ', hiragana: 'いやいや、ぜんぜんだよ', romaji: 'Iya iya, zenzen da yo', fr: 'Mais non, pas du tout', audioText: 'いやいや、全然だよ', tip: 'Ne dis JAMAIS merci quand on te complimente. Minimise toujours.', who: 'you', difficulty: 1,
      },
      {
        id: 'social-6', situation: 'Tu veux savoir ce qu\'il/elle fait :', jp: '何してる人？/ 仕事何？', hiragana: 'なにしてるひと？/ しごとなに？', romaji: 'Nani shiteru hito? / Shigoto nani?', fr: 'Tu fais quoi dans la vie ?', audioText: '仕事何', tip: 'Deux façons — la 2e plus directe, entre jeunes', who: 'you', difficulty: 2,
      },
      {
        id: 'social-7', situation: 'Tu veux parler de hobbies :', jp: '趣味とかある？', hiragana: 'しゅみとかある？', romaji: 'Shumi toka aru?', fr: 'T\'as des hobbies ?', audioText: '趣味とかある', tip: 'とか = "genre, des trucs comme" — adoucit la question', who: 'you', difficulty: 2,
      },
      {
        id: 'social-8', situation: 'Vous vous entendez bien, tu proposes d\'échanger :', jp: 'LINE交換しよ！', hiragana: 'LINEこうかんしよ！', romaji: 'LINE kōkan shiyo!', fr: 'On s\'échange nos LINE !', audioText: 'ライン交換しよ', tip: 'LINE = le WhatsApp du Japon. Installe-le avant de partir.', who: 'you', difficulty: 1,
      },
      {
        id: 'social-9', situation: 'La soirée se termine, tu proposes de se revoir :', jp: 'また遊ぼう！', hiragana: 'またあそぼう！', romaji: 'Mata asobō!', fr: 'On se refait un truc !', audioText: 'また遊ぼう', tip: '遊ぶ = traîner ensemble, pas juste "jouer"', who: 'you', difficulty: 1,
      },
      {
        id: 'social-10', situation: 'Tu dis au revoir chaleureusement :', jp: 'めっちゃ楽しかった！ありがとね', hiragana: 'めっちゃたのしかった！ありがとね', romaji: 'Meccha tanoshikatta! Arigatone', fr: 'C\'était trop bien ! Merci hein', audioText: 'めっちゃ楽しかった。ありがとね', tip: 'ありがとね = merci doux/amical — pas ございます', who: 'you',
        noteType: 'blue',
      },
    ],
  },

  // ============================================
  // 11. RÉACTIONS & FILLERS
  // ============================================
  {
    id: 'reactions',
    name: 'Réactions & Fillers',
    description: 'Les mots qu\'un Japonais utilise 50 fois par jour',
    phrases: [
      { id: 'react-1', situation: 'Quelqu\'un te raconte un truc surprenant :', jp: 'マジで！？', hiragana: 'マジで！？', romaji: 'Maji de!?', fr: 'Sérieux !?', audioText: 'マジで', tip: 'LA réaction universelle — surprise, choc, tout', who: 'you', difficulty: 1 },
      { id: 'react-2', situation: 'On te dit un truc incroyable :', jp: 'うそ！', hiragana: 'うそ！', romaji: 'Uso!', fr: 'N\'importe quoi !', audioText: 'うそ', tip: 'Littéralement "mensonge" mais = "no way!"', who: 'you', difficulty: 1 },
      { id: 'react-3', situation: 'Tu vois/goûtes un truc incroyable (ou terrible) :', jp: 'やばっ', hiragana: 'やばっ', romaji: 'Yaba', fr: 'Ouf / Wow / Merde', audioText: 'やばい', tip: 'Positif OU négatif selon le ton — le couteau suisse', who: 'you', difficulty: 1 },
      { id: 'react-4', situation: 'Quelqu\'un te dit un truc que tu savais pas :', jp: 'へー、そうなんだ', hiragana: 'へー、そうなんだ', romaji: 'Hē, sō nan da', fr: 'Ah ouais, je savais pas', audioText: 'へー、そうなんだ', tip: 'Montre de l\'intérêt — les Japonais adorent ça', who: 'you', difficulty: 1 },
      { id: 'react-5', situation: 'Tu comprends ce qu\'on t\'explique :', jp: 'なるほどね', hiragana: 'なるほどね', romaji: 'Naruhodo ne', fr: 'Ah je vois je vois', audioText: 'なるほどね', tip: 'Le hochement de tête verbal — utilise-le souvent', who: 'you', difficulty: 1 },
      { id: 'react-6', situation: 'Tu cherches tes mots :', jp: 'えーっと...', hiragana: 'えーっと...', romaji: 'Ētto...', fr: 'Euhh...', audioText: 'えーっと', tip: 'Le "euh" japonais — mieux que le silence', who: 'you', difficulty: 1 },
      { id: 'react-7', situation: 'Tu es totalement d\'accord :', jp: 'そうそうそう', hiragana: 'そうそうそう', romaji: 'Sō sō sō', fr: 'Ouais ouais exactement', audioText: 'そうそうそう', tip: 'En rafale = tu valides fort', who: 'you', difficulty: 2 },
      { id: 'react-8', situation: 'Tu apprends un truc étonnant :', jp: 'まじかー', hiragana: 'まじかー', romaji: 'Majikā', fr: 'Sérieux... / Ah ouais...', audioText: 'まじかー', tip: 'Version douce de マジで — plus réflexif', who: 'you', difficulty: 2 },
      { id: 'react-9', situation: 'Quelqu\'un propose un bon plan :', jp: 'いいね！', hiragana: 'いいね！', romaji: 'Ii ne!', fr: 'Nice ! Trop bien !', audioText: 'いいね', tip: 'Comme le bouton like — approbation instantanée', who: 'you', difficulty: 1 },
      { id: 'react-10', situation: 'Tu as besoin d\'une seconde :', jp: 'ちょっと待って', hiragana: 'ちょっとまって', romaji: 'Chotto matte', fr: 'Attends deux sec', audioText: 'ちょっと待って', tip: 'Sans ください = entre potes', who: 'you', difficulty: 1 },
      { id: 'react-11', situation: 'Quelqu\'un s\'excuse ou s\'inquiète :', jp: '大丈夫大丈夫', hiragana: 'だいじょうぶだいじょうぶ', romaji: 'Daijōbu daijōbu', fr: 'T\'inquiète t\'inquiète', audioText: '大丈夫大丈夫', tip: 'Répété = rassurant, décontracté', who: 'you', difficulty: 1 },
      { id: 'react-12', situation: 'Tu te retrouves à 100% dans ce qu\'on te dit :', jp: 'めっちゃわかる', hiragana: 'めっちゃわかる', romaji: 'Meccha wakaru', fr: 'Tellement ça / je comprends trop', audioText: 'めっちゃわかる', tip: 'Empathie level max — les Japonais kiffent', who: 'you', difficulty: 2 },
    ],
  },

  // ============================================
  // 12. SOIRÉE & NIGHTLIFE
  // ============================================
  {
    id: 'nightlife',
    name: 'Soirée & Nightlife',
    description: 'Nomikai, bars, clubs — le Japon après minuit',
    phrases: [
      { id: 'night-1', situation: 'Les verres arrivent, tout le monde lève son verre :', jp: '乾杯！', hiragana: 'かんぱい！', romaji: 'Kanpai!', fr: 'Tchin !', audioText: '乾杯', tip: 'OBLIGATOIRE avant la première gorgée. Ne bois jamais avant.', who: 'you', difficulty: 1 },
      { id: 'night-2', situation: 'Tu proposes l\'open bar :', jp: '飲み放題にする？', hiragana: 'のみほうだいにする？', romaji: 'Nomihōdai ni suru?', fr: 'On prend l\'open bar ?', audioText: '飲み放題にする', tip: '飲み放題 = boissons à volonté — souvent 2h pour ~2000¥', who: 'you', difficulty: 2 },
      { id: 'night-3', situation: 'Premier bar terminé, tu proposes la suite :', jp: 'もう一軒行こう！', hiragana: 'もういっけんいこう！', romaji: 'Mō ikken ikō!', fr: 'On va dans un autre bar !', audioText: 'もう一軒行こう', tip: '二軒目 = le 2e bar. Enchaîner les bars c\'est la culture.', who: 'you', difficulty: 2 },
      { id: 'night-4', situation: 'L\'addition arrive, tu demandes :', jp: 'ここ割り勘？', hiragana: 'ここわりかん？', romaji: 'Koko warikan?', fr: 'On split ici ?', audioText: 'ここ割り勘', tip: '割り勘 = partager l\'addition — très courant entre amis', who: 'you', difficulty: 2 },
      { id: 'night-5', situation: 'Tu veux offrir la tournée :', jp: 'おごるよ', hiragana: 'おごるよ', romaji: 'Ogoru yo', fr: 'C\'est moi qui régale', audioText: 'おごるよ', tip: 'Les aînés/senpai offrent souvent — gros signe de respect', who: 'you', difficulty: 3 },
      { id: 'night-6', situation: 'Tu commences à sentir l\'alcool :', jp: 'ちょっと酔っちゃった', hiragana: 'ちょっとよっちゃった', romaji: 'Chotto yocchatta', fr: 'Je suis un peu pompette', audioText: 'ちょっと酔っちゃった', tip: 'ちゃった = "c\'est arrivé malgré moi" — forme casual', who: 'you', difficulty: 3 },
      { id: 'night-7', situation: 'Tu réalises que t\'as taf demain :', jp: '明日仕事あるのにやばい', hiragana: 'あしたしごとあるのにやばい', romaji: 'Ashita shigoto aru noni yabai', fr: 'J\'ai taf demain et c\'est la merde', audioText: '明日仕事あるのにやばい', tip: 'のに = "alors que" — le regret classique', who: 'you', difficulty: 3 },
      { id: 'night-8', situation: 'Il est presque minuit :', jp: '終電やばくない？', hiragana: 'しゅうでんやばくない？', romaji: 'Shūden yabaku nai?', fr: 'Le dernier train c\'est chaud non ?', audioText: '終電やばくない', tip: 'Vers minuit cette phrase sort TOUJOURS', who: 'you', difficulty: 1 },
      { id: 'night-9', situation: 'T\'as raté le dernier train :', jp: 'タクシーで帰る？', hiragana: 'タクシーでかえる？', romaji: 'Takushī de kaeru?', fr: 'On rentre en taxi ?', audioText: 'タクシーで帰る', tip: 'Plan B : taxi, manga café, ou karaoke jusqu\'au matin', who: 'you', difficulty: 2 },
      { id: 'night-10', situation: 'Fin de soirée, tu résumes :', jp: '今日めっちゃ楽しかった！', hiragana: 'きょうめっちゃたのしかった！', romaji: 'Kyō meccha tanoshikatta!', fr: 'C\'était trop bien ce soir !', audioText: '今日めっちゃ楽しかった', tip: 'La phrase de fin de soirée parfaite', who: 'you', difficulty: 1 },
    ],
  },

  // ============================================
  // 13. SLANG & GROS MOTS
  // ============================================
  {
    id: 'insultes',
    name: 'Slang & Gros mots',
    description: 'Le vocabulaire qu\'on t\'apprendra jamais en cours',
    phrases: [
      { id: 'insult-1', situation: 'Tu te cognes le pied / un truc tombe :', jp: 'くそ！', hiragana: 'くそ！', romaji: 'Kuso!', fr: 'Merde !', audioText: 'くそ', tip: 'LE juron universel — comme "shit" en anglais', who: 'you', difficulty: 1 },
      { id: 'insult-2', situation: 'Quelqu\'un te saoule :', jp: 'うざい', hiragana: 'うざい', romaji: 'Uzai', fr: 'Relou / Chiant', audioText: 'うざい', tip: 'うざったい raccourci — très courant chez les jeunes', who: 'you', difficulty: 2 },
      { id: 'insult-3', situation: 'Tu vois un truc dégueu :', jp: 'きもい', hiragana: 'きもい', romaji: 'Kimoi', fr: 'Dégueu / Glauque', audioText: 'きもい', tip: '気持ち悪い raccourci — pour tout ce qui dérange', who: 'you', difficulty: 2 },
      { id: 'insult-4', situation: 'Quelqu\'un pousse le bouchon trop loin :', jp: 'ふざけんな', hiragana: 'ふざけんな', romaji: 'Fuzakenna', fr: 'Déconne pas', audioText: 'ふざけんな', tip: 'ふざけるな contracté — assez agressif', who: 'you', difficulty: 2 },
      { id: 'insult-5', situation: 'Tu en as vraiment marre :', jp: 'まじうぜー', hiragana: 'まじうぜー', romaji: 'Maji uzē', fr: 'C\'est grave relou', audioText: 'まじうぜー', tip: 'うぜー = うざい encore plus traîné et casual', who: 'you', difficulty: 3 },
      { id: 'insult-6', situation: 'Ton pote fait un truc débile :', jp: 'ばか', hiragana: 'ばか', romaji: 'Baka', fr: 'Idiot / Con', audioText: 'ばか', tip: 'Léger entre potes, vraie insulte si dit sérieusement', who: 'you', difficulty: 1 },
      { id: 'insult-7', situation: 'Quelqu\'un fait n\'importe quoi (style Osaka) :', jp: 'あほ', hiragana: 'あほ', romaji: 'Aho', fr: 'Abruti / Débile', audioText: 'あほ', tip: 'Plus utilisé au Kansai (Osaka) — l\'inverse de baka là-bas', who: 'you', difficulty: 2 },
      { id: 'insult-8', situation: 'Tu veux que quelqu\'un se taise :', jp: 'だまれ', hiragana: 'だまれ', romaji: 'Damare', fr: 'Ta gueule', audioText: 'だまれ', tip: '黙れ — impératif de "se taire". Très direct.', who: 'you', difficulty: 2 },
      { id: 'insult-9', situation: 'Quelqu\'un te fait chier :', jp: 'やめろよ', hiragana: 'やめろよ', romaji: 'Yamero yo', fr: 'Arrête / Lâche-moi', audioText: 'やめろよ', tip: 'よ adoucit un peu mais reste sec', who: 'you', difficulty: 2 },
      { id: 'insult-10', situation: 'Tu es frustré par une situation :', jp: 'むかつく', hiragana: 'むかつく', romaji: 'Mukatsuku', fr: 'Ça me saoule', audioText: 'むかつく', tip: 'Littéralement "ça me retourne l\'estomac"', who: 'you', difficulty: 2 },
      { id: 'insult-11', situation: 'Expression de rage extrême (ATTENTION) :', jp: 'しね', hiragana: 'しね', romaji: 'Shi-ne', fr: 'Crève', audioText: 'しね', tip: 'TRÈS violent — ne dis JAMAIS ça sérieusement à quelqu\'un', who: 'you', difficulty: 3 },
      { id: 'insult-12', situation: 'Insulte classique des films/anime :', jp: 'くそやろう', hiragana: 'くそやろう', romaji: 'Kuso yarō', fr: 'Enfoiré / Connard', audioText: 'くそやろう', tip: 'やろう = mec (péjoratif) — gros mot classique', who: 'you', difficulty: 3 },
      { id: 'insult-13', situation: 'Pure frustration :', jp: 'ちくしょう', hiragana: 'ちくしょう', romaji: 'Chikushō', fr: 'Putain / Fait chier', audioText: 'ちくしょう', tip: 'Frustration pure — tu te cognes le pied, tu dis ça', who: 'you', difficulty: 2 },
      { id: 'insult-14', situation: 'Quelqu\'un te prend pour un con :', jp: 'なめんなよ', hiragana: 'なめんなよ', romaji: 'Namenna yo', fr: 'Te fous pas de ma gueule', audioText: 'なめんなよ', tip: 'なめるな = "me prends pas pour un con"', who: 'you', difficulty: 3 },
    ],
  },
]
