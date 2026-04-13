# Prompt Claude Code — Capacitor Android pour Shabero (Windows)

> Ce prompt intègre Capacitor dans le projet Next.js Shabero
> pour générer un APK Android publiable sur le Google Play Store.
> Environnement : Windows, Android Studio installé, JDK 17 installé.

---

```
On va wrapper Shabero (Next.js) dans une app Android native avec Capacitor.
Le site web continue de tourner sur Vercel normalement — on ajoute juste 
la couche Android par-dessus le même codebase.

## IMPORTANT — CONTRAINTE NEXT.JS + CAPACITOR

Capacitor a besoin d'un export STATIQUE (HTML/CSS/JS). Ça veut dire :
- Pas de Server Components avec fetch côté serveur
- Pas d'API Routes (les remplacer par des appels client-side)
- Pas de next/image avec le loader par défaut (utiliser unoptimized: true)
- Le build génère un dossier `out/` avec des fichiers statiques

Si le projet utilise des features serveur, il faudra les adapter.

---

## ÉTAPE 1 — Configurer Next.js pour l'export statique

Modifier next.config.js (ou next.config.ts) :

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Si tu as des trailing slashes
  trailingSlash: true,
};

module.exports = nextConfig;
```

Puis tester le build :
```bash
npm run build
```

Vérifier qu'un dossier `out/` est créé à la racine avec des fichiers HTML.
Si le build échoue, c'est probablement à cause de features serveur à adapter.

Erreurs courantes à fixer :
- `next/image` → ajouter `unoptimized: true` dans la config (déjà fait ci-dessus)
- Server Components qui fetch des données → les convertir en client components avec useEffect
- API Routes (`app/api/`) → les déplacer vers des appels externes ou supprimer si pas nécessaires
- `cookies()`, `headers()`, `redirect()` côté serveur → adapter en client-side

---

## ÉTAPE 2 — Installer Capacitor

```bash
# Core + CLI
npm install @capacitor/core
npm install -D @capacitor/cli

# Initialiser Capacitor
npx cap init "Shabero" "com.shabero.app" --web-dir out

# Installer le plugin Android
npm install @capacitor/android

# Plugins utiles
npm install @capacitor/app @capacitor/keyboard @capacitor/splash-screen @capacitor/status-bar

# Ajouter la plateforme Android
npx cap add android
```

---

## ÉTAPE 3 — Configurer Capacitor

Créer ou modifier `capacitor.config.ts` à la racine :

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shabero.app',
  appName: 'Shabero',
  webDir: 'out',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#4AA3DF',
      showSpinner: false,
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
    },
    StatusBar: {
      backgroundColor: '#2B7BC0',
      style: 'DARK',
    },
    Keyboard: {
      resize: 'body',
      style: 'DARK',
    },
  },
};

export default config;
```

---

## ÉTAPE 4 — Scripts npm

Ajouter dans `package.json` :

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:android": "next build && npx cap sync android",
    "open:android": "npx cap open android",
    "sync": "npx cap sync"
  }
}
```

Le workflow :
1. `npm run build:android` → build le site + sync avec Android
2. `npm run open:android` → ouvre le projet dans Android Studio

---

## ÉTAPE 5 — Build et sync

```bash
# Build Next.js + copier les fichiers dans le projet Android
npm run build:android
```

Ça va :
1. Lancer `next build` qui génère le dossier `out/`
2. Lancer `cap sync android` qui copie `out/` dans `android/app/src/main/assets/public/`

---

## ÉTAPE 6 — Gérer la status bar et le safe area

L'app doit gérer la barre de statut Android et les encoches.
Ajouter dans le layout principal (layout.tsx ou un composant racine) :

```typescript
'use client';

import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';

export function MobileSetup() {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      // Status bar transparente
      StatusBar.setBackgroundColor({ color: '#2B7BC0' });
      StatusBar.setStyle({ style: Style.Dark });
      
      // Gérer le clavier
      Keyboard.setResizeMode({ mode: 'body' as any });
    }
  }, []);

  return null;
}
```

Et dans le CSS global, ajouter le support du safe area :

```css
/* Safe area pour les encoches et barres de navigation Android */
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* Si tu as une nav bar fixe en bas */
.bottom-nav {
  padding-bottom: env(safe-area-inset-bottom);
}
```

---

## ÉTAPE 7 — Icône de l'app et splash screen

### Icône
L'icône doit être un PNG de 1024x1024 pixels minimum.
Créer le fichier `resources/icon.png` à la racine du projet.

L'icône Shabero devrait être :
- Fond : gradient bleu Aero (#4AA3DF → #2B7BC0)
- Icône : l'avion ✈ blanc stylisé (comme dans le header du site)
- Style : glossy, reflet en demi-lune, bordure arrondie
- Pas de texte (trop petit pour être lisible sur un icône d'app)

Pour générer toutes les tailles automatiquement :
```bash
npm install -D @capacitor/assets
npx capacitor-assets generate --android
```

Ça va créer toutes les résolutions nécessaires dans 
`android/app/src/main/res/mipmap-*/`

### Splash screen
Créer `resources/splash.png` (2732x2732 pixels, le contenu centré) :
- Fond : même bleu que le header (#4AA3DF)
- Logo "Shabero" centré avec l'icône avion
- Même style que le header du site

```bash
npx capacitor-assets generate --splash-only --android
```

---

## ÉTAPE 8 — Tester sur un téléphone Android

### Option A : Téléphone réel (recommandé)
1. Sur ton téléphone Android : Paramètres → À propos → Tape 7 fois sur "Numéro de build" 
   pour activer les Options développeur
2. Va dans Options développeur → Active "Débogage USB"
3. Branche ton téléphone en USB à ton PC
4. Accepte le popup de débogage sur le téléphone

### Option B : Émulateur Android Studio
1. Dans Android Studio : Tools → Device Manager → Create Virtual Device
2. Choisis un Pixel 7 ou similaire
3. Télécharge une image système (API 34+)
4. Lance l'émulateur

### Lancer l'app
```bash
npm run build:android
npm run open:android
```

Dans Android Studio :
1. Attends que le projet se synchronise (barre de progression en bas)
2. Sélectionne ton device/émulateur en haut
3. Clique sur le bouton ▶ (Run)
4. L'app s'installe et se lance

---

## ÉTAPE 9 — Live Reload pour le dev (optionnel)

Pour voir les changements en direct pendant le dev sans rebuild à chaque fois :

1. Trouve ton IP locale : ouvre un terminal et tape `ipconfig`
   Note l'adresse IPv4 (ex: 192.168.1.42)

2. Modifie temporairement `capacitor.config.ts` :
```typescript
const config: CapacitorConfig = {
  // ... reste de la config
  server: {
    url: 'http://192.168.1.42:3000', // TON IP ICI
    cleartext: true,
  },
};
```

3. Lance le dev server :
```bash
npm run dev
```

4. Sync et ouvre Android Studio :
```bash
npx cap sync android
npm run open:android
```

5. Run l'app → elle charge depuis ton PC en live

⚠️ RETIRE la section `server` de la config avant de build pour la prod !

---

## ÉTAPE 10 — Build l'APK/AAB pour le Play Store

### Créer la keystore de signature (une seule fois, GARDE-LA PRÉCIEUSEMENT)

Ouvre un terminal et lance :
```bash
keytool -genkey -v -keystore shabero-release.keystore -alias shabero -keyalg RSA -keysize 2048 -validity 10000
```

Il va te demander :
- Un mot de passe pour la keystore (note-le, tu en auras toujours besoin)
- Ton nom, organisation, etc. (mets ce que tu veux)

⚠️ SAUVEGARDE ce fichier .keystore et le mot de passe. 
Si tu les perds, tu ne pourras PLUS JAMAIS mettre à jour ton app sur le Play Store.
Ne les commit PAS dans git.

### Configurer la signature dans Android Studio
1. Ouvre le projet Android : `npm run open:android`
2. Menu : Build → Generate Signed Bundle / APK
3. Choisis "Android App Bundle" (AAB) — c'est ce que le Play Store demande
4. Sélectionne ta keystore, entre l'alias et le mot de passe
5. Choisis "release" comme build variant
6. Clique "Create"

Le fichier AAB sera dans : `android/app/release/app-release.aab`

### Alternative en ligne de commande
```bash
npx cap build android \
  --keystorepath shabero-release.keystore \
  --keystorepass TON_MOT_DE_PASSE \
  --keystorealias shabero \
  --keystorealiaspass TON_MOT_DE_PASSE \
  --androidreleasetype AAB
```

---

## ÉTAPE 11 — Publier sur le Google Play Store

1. Va sur https://play.google.com/console
2. Crée une application → "Shabero"
3. Remplis les infos :
   - Description courte : "Apprends le japonais parlé pour ton voyage"
   - Description longue : détaille les features (situations, quiz audio, kana, etc.)
   - Catégorie : Éducation
   - Screenshots : prends des captures d'écran de l'app (min 2)
   - Icône : 512x512 PNG (haute résolution)
   - Feature graphic : 1024x500 PNG (bannière promotionnelle)
4. Va dans "Production" → "Créer une release"
5. Upload le fichier .aab
6. Remplis les notes de version : "Version 1.0 — Lancement initial"
7. Soumets pour review

La review Google prend quelques heures à 2-3 jours max.

### Pour les mises à jour futures :
1. `npm run build:android`
2. Incrémente le versionCode dans `android/app/build.gradle`
3. Rebuild l'AAB signé
4. Upload la nouvelle version sur le Play Store
5. Review en quelques heures

---

## RÉSUMÉ DES COMMANDES

```bash
# Setup initial (une seule fois)
npm install @capacitor/core @capacitor/android @capacitor/app @capacitor/keyboard @capacitor/splash-screen @capacitor/status-bar
npm install -D @capacitor/cli @capacitor/assets
npx cap init "Shabero" "com.shabero.app" --web-dir out
npx cap add android

# Workflow quotidien
npm run build:android    # build + sync
npm run open:android     # ouvre Android Studio → ▶ Run

# Publication
npm run build:android
# → Android Studio → Build → Generate Signed Bundle → Upload sur Play Store
```

---

## CE QUI PEUT FOIRER

### "Le build Next.js échoue avec output: 'export'"
→ T'as probablement des Server Components ou des API Routes. 
   Convertis-les en client components. Le plus courant :
   - Remplace `import { cookies } from 'next/headers'` par du localStorage
   - Remplace les API Routes par des appels directs aux services
   - Ajoute 'use client' en haut des composants qui utilisent useEffect/useState

### "Android Studio ne trouve pas le SDK"
→ Va dans Android Studio → Settings → Languages & Frameworks → Android SDK
   Note le chemin du SDK, puis crée un fichier `android/local.properties` :
   ```
   sdk.dir=C:\\Users\\TONNOM\\AppData\\Local\\Android\\Sdk
   ```

### "L'app est toute blanche sur le téléphone"
→ Le build n'a pas été sync. Lance `npm run build:android` et re-run.

### "Les audios ne jouent pas"
→ Les fichiers audio dans `public/audio/` doivent être inclus dans le build.
   Vérifie qu'ils sont bien dans le dossier `out/audio/` après le build.

### "La nav bar du bas est cachée par la barre de navigation Android"
→ Vérifie que le CSS `padding-bottom: env(safe-area-inset-bottom)` est appliqué.
```
