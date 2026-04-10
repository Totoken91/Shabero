# Prompt Claude Code — Shabero Gamification & Pédagogie

> Ce prompt restructure l'expérience d'apprentissage de Shabero.
> Le design Frutiger Aero et la structure audio/romaji restent en place.
> On ajoute une COUCHE DE PROGRESSION par-dessus.

---

```
Shabero a un problème : c'est un dictionnaire de phrases, pas une expérience d'apprentissage.
L'utilisateur ouvre l'app, voit des catégories, clique, voit des phrases, et... c'est tout.
Pas de direction, pas de progression, pas de raison de revenir demain.

On va ajouter un système de gamification complet autour de la métaphore du VOYAGE.
L'utilisateur a un "Passeport" qu'il remplit en maîtrisant les catégories.

---

## 1. ONBOARDING — PREMIÈRE OUVERTURE

Quand l'utilisateur arrive pour la PREMIÈRE fois (pas de données en localStorage),
afficher un écran d'onboarding AVANT de montrer l'app :

### Écran 1 : "Bienvenue sur Shabero 🇯🇵"
- "Apprends les phrases essentielles pour ton voyage au Japon"
- Bouton "C'est parti"

### Écran 2 : "Tu pars quand ?"
- 3 options tappables (style cards glossy Aero) :
  - ✈️ "Dans moins de 2 semaines" → mode intensif
  - 📅 "Dans 1-3 mois" → mode normal
  - 💭 "Je rêve juste du Japon" → mode zen
- Ce choix est stocké en localStorage et influence :
  - Le message de l'écran d'accueil ("Plus que X jours !")
  - Le nombre de phrases suggérées dans la révision quotidienne (10 / 5 / 3)
  - On peut le changer plus tard dans les paramètres

### Écran 3 : "Ton Passeport est prêt"
- Afficher le passeport vide avec toutes les catégories grisées
- Animation : le tampon "Konbini" clignote pour indiquer par où commencer
- Bouton "Commencer par Konbini" (ou "Explorer librement")

Stocker `onboardingDone: true` en localStorage après complétion.

---

## 2. ÉCRAN D'ACCUEIL — LE HUB

Remplacer l'écran d'accueil actuel (grille de catégories) par un HUB 
qui donne une DIRECTION claire :

### Structure du hub :

```
┌──────────────────────────────────────────┐
│  ✈️ Shabero                              │
│  しゃべろう — Parle comme un vrai Japonais │
├──────────────────────────────────────────┤
│                                          │
│  🔥 Streak : 3 jours                     │
│  Tu es prêt à 28% pour le Japon          │
│  ████████░░░░░░░░░░░░░░░░░░░░ 28%       │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  📝 Révision du jour               │  │
│  │  5 phrases à revoir • 2 min        │  │
│  │  [Commencer]                       │  │
│  └────────────────────────────────────┘  │
│                                          │
│  📖 Continuer : Izakaya & Bouffe         │
│  Étape 2/3 — Comprends                   │
│  ██████████████░░░░░░░ 60%              │
│  [Reprendre]                             │
│                                          │
│  🗺️ Voir mon Passeport                  │
│                                          │
│  ── Toutes les catégories ──             │
│  [grille 2 colonnes comme avant]         │
│                                          │
└──────────────────────────────────────────┘
```

### Les éléments du hub :

#### A. Barre de streak 🔥
- Compteur de jours consécutifs d'utilisation
- Un jour = au moins 1 session de révision ou 1 étape complétée
- Affichage : "🔥 3 jours" avec le chiffre en gros
- Si le streak est à 0 : "Commence ta série !"
- Stocker la date du dernier jour actif en localStorage
- Animation subtile de flamme CSS sur l'emoji quand le streak > 3

#### B. Jauge globale "Prêt pour le Japon"
- Pourcentage basé sur le nombre de catégories maîtrisées / total
- Chaque catégorie a 3 étapes → le pourcentage granule par étape
- Barre de progression glossy (style Aero, gradient vert avec reflet)
- Messages contextuels selon le % :
  - 0-20% : "Les premiers pas sont les plus importants !"
  - 20-50% : "Tu comprends déjà plus que la plupart des touristes"
  - 50-80% : "Les Japonais vont être impressionnés"
  - 80-100% : "Tu es presque un local 🏯"

#### C. Révision du jour
- Card mise en avant (légèrement plus grande, peut-être une bordure dorée)
- Sélection automatique de phrases :
  1. Phrases ratées dans les quiz (priorité max)
  2. Phrases vues il y a plus de 3 jours (spaced repetition basique)
  3. Phrases jamais testées dans les catégories commencées
- Format : quiz "Écoute et comprends" (audio → choix FR)
- 5 phrases en mode normal, 10 en mode intensif, 3 en mode zen
- Quand terminé : "✅ Révision faite !" et le bouton se grise pour la journée

#### D. "Continuer"
- Affiche la dernière catégorie/étape en cours
- L'utilisateur reprend exactement où il s'est arrêté
- Si rien en cours : suggérer la prochaine catégorie non commencée

#### E. Grille des catégories
- Toujours accessible en scrollant, comme avant
- Mais maintenant chaque card affiche son état de progression (voir section 3)

---

## 3. CATÉGORIES — SYSTÈME EN 3 ÉTAPES

### Chaque catégorie a maintenant 3 étapes :

#### Étape 1 — "🎧 Écoute" (découverte passive)
- L'utilisateur parcourt les phrases dans le format actuel 
  (situation FR + romaji + kana + audio)
- Il scroll à travers toutes les phrases
- Chaque phrase a un bouton "✅ Compris" discret en bas
- Quand il a marqué 100% des phrases comme "Compris" OU 
  qu'il a scrollé jusqu'en bas, l'étape est validée
- PAS de quiz, PAS de pression — c'est du browsing

#### Étape 2 — "🧠 Comprends" (quiz audio → français)
- Quiz : on joue un audio japonais, 4 choix en français
- 1 session = toutes les phrases de la catégorie (8-10 questions)
- Feedback immédiat : 
  - ✅ Bonne réponse : flash vert, la phrase s'affiche en romaji
  - ❌ Mauvaise réponse : flash rouge, la bonne réponse s'affiche, 
    l'audio se rejoue automatiquement
- Score en fin de session
- Il faut 80% de bonnes réponses pour VALIDER l'étape
- Si < 80% : "Pas mal ! Réécoute les phrases et réessaie"
- Les phrases ratées sont sauvegardées pour la révision quotidienne

#### Étape 3 — "🗣️ Parle" (quiz français → audio)
- Quiz : on affiche la situation en français, 3-4 options audio
- L'utilisateur écoute chaque option et choisit la bonne
- Même système de feedback et validation à 80%
- Plus difficile car il doit RECONNAÎTRE l'audio activement

### Affichage de la progression sur la card de catégorie :

```
┌──────────────────────────────┐
│  🏪                          │
│  Konbini                     │
│  8 phrases                   │
│                              │
│  🎧 ✅  🧠 ✅  🗣️ 🔒       │
│  ████████████████░░░░ 66%   │
│                              │
│  [Continuer → Étape 3]      │
└──────────────────────────────┘
```

- Les étapes complétées ont un check ✅
- L'étape en cours est colorée/active
- Les étapes futures sont 🔒 (mais tappables quand même — 
  on ne BLOQUE pas l'accès, on GUIDE)
- Petite barre de progression sous les étapes

### Quand les 3 étapes sont validées :

1. ANIMATION DE CÉLÉBRATION :
   - Confetti (petites particules colorées CSS qui tombent pendant 2-3s)
   - Le tampon de la catégorie s'imprime dans le passeport
   - Son de tampon (Web Audio API, un petit "thud" satisfaisant)
   - Message : "🎉 Konbini maîtrisé ! Tu as gagné ton tampon !"

2. La card de catégorie change d'apparence :
   - Badge "Maîtrisé" doré en haut à droite (pill glossy dorée)
   - Le gradient de la card devient légèrement doré/premium
   - Le tampon miniature apparaît sur la card

3. Le pourcentage global se met à jour

---

## 4. LE PASSEPORT — ÉCRAN DE COLLECTION

### Accès : bouton "🗺️ Mon Passeport" sur le hub

### Visuel :
Un passeport stylisé avec une page par catégorie. 
Chaque page a :
- Le nom de la catégorie
- Un emplacement pour le tampon (cercle en pointillés si pas encore gagné)
- Le tampon imprimé si la catégorie est maîtrisée
- Les stats : "8/8 phrases • Maîtrisé le 12 avril 2026"

### Les tampons (icônes thématiques) :
- Konbini : 🍙 Onigiri
- Izakaya : 🍶 Tokkuri (bouteille de sake)
- Trains : 🚅 Shinkansen
- Shopping : 🛍️ Sac shopping
- Urgences : 🏥 Croix médicale
- Socialiser : 🤝 Poignée de main
- Réactions : 💬 Bulle de dialogue
- Nightlife : 🌙 Lune et étoiles

### Style visuel des tampons :
- Cercle de 80px avec bordure épaisse
- Style "tampon encreur" : légèrement incliné (rotate -5deg à 5deg random)
- Couleur : rouge encre (comme les tampons japonais 判子 hanko)
- Ou alternative : chaque tampon a la couleur de sa catégorie
- Fond texturé légèrement (pas lisse, un peu "imprimé")
- Les tampons non gagnés = cercle en pointillés gris avec "?"

### Animation quand on gagne un tampon :
1. La page du passeport s'ouvre (transition slide)
2. Le tampon descend d'en haut avec un effet de "stamp" (scale de 2 à 1 + opacity)
3. Petit shake de la page (comme l'impact du tampon)
4. Son "thud" satisfaisant
5. Particules d'encre autour du tampon

---

## 5. STREAK & ENGAGEMENT

### Système de streak
```typescript
interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;  // ISO format, date seulement (pas l'heure)
}
```

### Logique :
```typescript
const updateStreak = () => {
  const today = new Date().toISOString().split('T')[0];
  const data = getStreakData();
  
  if (data.lastActiveDate === today) return; // déjà actif aujourd'hui
  
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  if (data.lastActiveDate === yesterday) {
    // Jour consécutif
    data.currentStreak += 1;
    if (data.currentStreak > data.longestStreak) {
      data.longestStreak = data.currentStreak;
    }
  } else {
    // Streak cassé
    data.currentStreak = 1;
  }
  
  data.lastActiveDate = today;
  saveStreakData(data);
};
```

### Qu'est-ce qui compte comme "actif" :
- Compléter la révision du jour
- Valider une étape dans une catégorie
- Compléter un groupe de kana
- (PAS juste ouvrir l'app — il faut une action)

### Affichage du streak :
- 1-2 jours : "🔥 1 jour" (normal)
- 3-6 jours : "🔥 3 jours" (texte orange)
- 7-13 jours : "🔥🔥 7 jours !" (deux flammes, texte rouge)
- 14+ jours : "🔥🔥🔥 14 jours !!" (trois flammes, animation)
- Record battu : "🏆 Nouveau record ! 14 jours !"

### Quand le streak est cassé :
- Message doux : "Pas grave, on recommence ! 💪"
- PAS de culpabilisation
- Afficher le record : "Ton record : 7 jours"

---

## 6. MESSAGES D'ENCOURAGEMENT CONTEXTUELS

Afficher des messages dynamiques à des moments clés.
Stocker les messages déjà vus pour ne pas les répéter.

### Après la première phrase écoutée :
"Tu viens d'apprendre ta première phrase ! 🎉"

### Après 10 phrases écoutées :
"Tu comprends déjà 10 phrases, c'est plus que la plupart des touristes !"

### Après le premier quiz réussi :
"Ton oreille s'habitue au japonais 👂"

### Après le premier tampon :
"Premier tampon dans ton passeport ! 🛂 Plus que [X] à collecter"

### Après 50% des tampons :
"À mi-chemin ! Les Japonais vont être impressionnés 🏯"

### Quand tout est maîtrisé :
"🎌 Passeport complet ! Tu es officiellement prêt pour le Japon.
Bon voyage ! いってらっしゃい！"

### Streak milestones :
- 3 jours : "3 jours d'affilée ! L'habitude se forme 🔥"
- 7 jours : "Une semaine complète ! Tu es sérieux 💪"
- 14 jours : "2 semaines ! Tu es plus régulier que la plupart des étudiants de japonais"
- 30 jours : "30 JOURS. Respect. 🏆"

### Stockage :
```typescript
interface Encouragements {
  seenMessages: string[];  // IDs des messages déjà affichés
}
```

---

## 7. ÉCRAN D'ENTRAÎNEMENT REPENSÉ

Remplacer la liste actuelle de catégories par un écran avec des MODES :

```
┌──────────────────────────────────────────┐
│           Entraînement                    │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  📝 Révision du jour               │  │
│  │  5 phrases mixées • 2 min          │  │
│  │  [Commencer]                       │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  🎯 Quiz par catégorie             │  │
│  │  Choisis une catégorie et un mode  │  │
│  │  [Choisir]                         │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │  🏆 Marathon                       │  │
│  │  Toutes les phrases • Score final  │  │
│  │  Record : 85%                      │  │
│  │  [Lancer]                          │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ── Progression par catégorie ──         │
│  Konbini      ████████████████ 100% 🏅  │
│  Izakaya      ██████████░░░░░  60%      │
│  Trains       ░░░░░░░░░░░░░░░   0%      │
│  ...                                     │
└──────────────────────────────────────────┘
```

### Mode "Marathon" :
- Toutes les phrases de toutes les catégories COMMENCÉES
- Format quiz "Écoute et comprends"
- Pas de limite de temps
- Score final en % avec feedback :
  - < 50% : "Continue l'écoute, ça va venir ! 🌱"
  - 50-79% : "Pas mal du tout ! 💪"
  - 80-94% : "Excellent ! 🔥"
  - 95-100% : "Parfait ! Tu es un pro 🏆"
- Record personnel sauvegardé en localStorage

---

## 8. KANA — PROGRESSION PAR GROUPES

### Même système d'étapes que les catégories :

Chaque groupe de kana (5 caractères) a 3 phases :
1. **Découvre** : flashcards avec le caractère, le romaji, l'audio, et un mnémonique
2. **Reconnais** : QCM kana → romaji (quel son fait ce caractère ?)
3. **Écris** : QCM romaji → kana (quel caractère fait ce son ?)

### Badge par groupe :
- Quand un groupe est maîtrisé (3 bonnes réponses consécutives par caractère), 
  il reçoit un badge ✅
- Afficher la progression : "Groupe 1 ✅ | Groupe 2 ✅ | Groupe 3 🔓 | ..."

### Connexion Kana ↔ Situations :
Quand l'utilisateur maîtrise un groupe de kana, dans les phrase-cards des Situations,
les caractères qu'il connaît s'affichent en COULEUR (bleu) au lieu de gris.
Ça crée un lien concret : "j'apprends les kana et ça m'aide à lire les phrases".

Implémenter ça avec un simple check :
```typescript
const highlightKnownKana = (text: string, knownKana: string[]): JSX.Element => {
  return (
    <>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          style={{ 
            color: knownKana.includes(char) ? '#2196F3' : '#9AB' 
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
};
```

---

## 9. CONFETTI & CÉLÉBRATIONS

### Animation confetti CSS (pas de librairie) :

```typescript
const launchConfetti = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none; z-index: 9999; overflow: hidden;
  `;
  document.body.appendChild(container);

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * 0.5;
    const rotation = Math.random() * 360;
    const size = Math.random() * 8 + 4;
    
    confetti.style.cssText = `
      position: absolute;
      top: -10px;
      left: ${left}%;
      width: ${size}px;
      height: ${size * 0.6}px;
      background: ${color};
      border-radius: 2px;
      animation: confetti-fall 2.5s ease-in ${delay}s forwards;
      transform: rotate(${rotation}deg);
    `;
    container.appendChild(confetti);
  }

  setTimeout(() => container.remove(), 3500);
};
```

```css
@keyframes confetti-fall {
  0% { 
    transform: translateY(0) rotate(0deg) scale(1); 
    opacity: 1; 
  }
  100% { 
    transform: translateY(100vh) rotate(720deg) scale(0.5); 
    opacity: 0; 
  }
}
```

### Son de tampon (Web Audio API, pas de fichier externe) :

```typescript
const playStampSound = () => {
  const ctx = new AudioContext();
  
  // "Thud" bas
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.2);
  
  // "Click" haut
  const click = ctx.createOscillator();
  const clickGain = ctx.createGain();
  click.type = 'square';
  click.frequency.setValueAtTime(800, ctx.currentTime);
  clickGain.gain.setValueAtTime(0.15, ctx.currentTime);
  clickGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
  click.connect(clickGain);
  clickGain.connect(ctx.destination);
  click.start();
  click.stop(ctx.currentTime + 0.05);
};
```

---

## 10. MODÈLE DE DONNÉES COMPLET (localStorage)

```typescript
interface ShaberoUserData {
  // Onboarding
  onboardingDone: boolean;
  travelMode: 'intensive' | 'normal' | 'zen';
  
  // Streak
  streak: {
    current: number;
    longest: number;
    lastActiveDate: string;
  };
  
  // Progression par catégorie
  categories: Record<string, {
    step1Complete: boolean;    // Écoute
    step2Complete: boolean;    // Comprends
    step2Score: number;        // Meilleur score en %
    step3Complete: boolean;    // Parle
    step3Score: number;
    stampEarned: boolean;
    stampDate?: string;
    phrasesListened: string[]; // IDs des phrases écoutées dans step1
  }>;
  
  // Quiz
  quiz: {
    wrongPhrases: string[];        // IDs des phrases ratées (pour spaced rep)
    lastReviewDate: string;
    reviewDoneToday: boolean;
    marathonRecord: number;        // Meilleur score marathon en %
  };
  
  // Kana
  kana: {
    hiragana: Record<number, {     // groupNumber -> progress
      discovered: boolean;
      recognizeScore: number;      // consécutifs corrects par char
      writeScore: number;
      mastered: boolean;
    }>;
    katakana: Record<number, {
      discovered: boolean;
      recognizeScore: number;
      writeScore: number;
      mastered: boolean;
    }>;
    knownCharacters: string[];     // tous les kana maîtrisés (pour highlight)
  };
  
  // Affichage
  displayMode: 'romaji' | 'romaji+kana' | 'all';
  
  // Encouragements
  seenMessages: string[];
  
  // Stats
  totalPhrasesListened: number;
  totalQuizCompleted: number;
  firstUseDate: string;
}
```

### Initialisation par défaut :
```typescript
const defaultUserData: ShaberoUserData = {
  onboardingDone: false,
  travelMode: 'normal',
  streak: { current: 0, longest: 0, lastActiveDate: '' },
  categories: {},
  quiz: { 
    wrongPhrases: [], 
    lastReviewDate: '', 
    reviewDoneToday: false, 
    marathonRecord: 0 
  },
  kana: { 
    hiragana: {}, 
    katakana: {}, 
    knownCharacters: [] 
  },
  displayMode: 'all',
  seenMessages: [],
  totalPhrasesListened: 0,
  totalQuizCompleted: 0,
  firstUseDate: new Date().toISOString().split('T')[0],
};
```

---

## 11. STYLE — GARDER LE FRUTIGER AERO

Tous les nouveaux éléments doivent suivre le style existant :
- Les boutons de mode (Révision, Quiz, Marathon) = cards glossy Aero
- La barre de progression = gradient avec reflet (style Aqua)
- Les badges "Maîtrisé" = pills dorées glossy avec coupure nette
- Les tampons du passeport = cercles avec bordure épaisse, léger rotate, 
  style hanko japonais (rouge encre)
- Les confetti = couleurs vives, pas de librairie externe
- Les écrans d'onboarding = même fond + cards glassmorphism Aero

### Barre de progression glossy :
```css
.progress-bar {
  height: 12px;
  border-radius: 6px;
  background: linear-gradient(to bottom, #E0E0E0 0%, #C8C8C8 100%);
  border: 1px solid #B0B0B0;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

.progress-fill {
  height: 100%;
  border-radius: 5px;
  background: linear-gradient(
    to bottom,
    #7ED56F 0%,
    #55C146 45%,
    #3AAD2B 45%,
    #2D8E22 100%
  );
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.4);
  transition: width 0.5s ease;
}
```

### Badge "Maîtrisé" doré :
```css
.mastered-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  color: #5C3A00;
  background: linear-gradient(
    to bottom,
    #FFD700 0%,
    #EABC00 40%,
    #D4A800 40%,
    #B8920A 100%
  );
  border: 1px solid #9A7B00;
  box-shadow: 
    0 1px 2px rgba(0,0,0,0.15),
    inset 0 1px 0 rgba(255,255,255,0.4);
  text-shadow: 0 1px 0 rgba(255,255,200,0.5);
}
```

---

## 12. PRIORITÉ D'IMPLÉMENTATION

### Phase A — Le squelette (faire d'abord)
1. Ajouter le modèle de données localStorage avec les defaults
2. Implémenter les 3 étapes par catégorie (Écoute / Comprends / Parle)
3. Tracker la complétion de chaque étape
4. Afficher la progression sur les cards de catégories

### Phase B — Le hub
5. Refaire l'écran d'accueil avec le hub (streak, jauge, révision, continuer)
6. Implémenter le compteur de streak
7. Implémenter la révision du jour

### Phase C — Le passeport
8. Créer l'écran Passeport avec les emplacements de tampons
9. Animation de tampon quand une catégorie est maîtrisée
10. Confetti

### Phase D — Engagement
11. Onboarding (3 écrans)
12. Messages d'encouragement
13. Mode Marathon dans Entraînement
14. Highlight des kana connus dans les phrases

Commence par la Phase A. On itère. 🛂✈️🔥
```
