# Shabero — Checklist Play Store Release

## 🚨 Bloquants (Google rejectera sans ça)

- [x] **Suppression de compte**
  - Edge function `delete-account` déployée sur Supabase (projet svtkoecdcazighskgqgb)
  - `deleteAccount()` ajouté dans `src/lib/auth.tsx`
  - Menu gear dans `src/components/ShineLogo.tsx` : Se déconnecter + Supprimer (avec confirmation)

- [x] **Politique de confidentialité**
  - Fichier créé : `public/privacy.html` (déployé automatiquement avec Vercel)
  - URL finale : `https://shabero-coral.vercel.app/privacy.html`
  - À déclarer dans le Play Console : App content → Privacy policy
  - Contact : kennydsf91@gmail.com

---

## ⚠️ Importants (rétention et UX)

- [ ] **Fix Math.random() dans Passport** (`src/components/Passport.tsx:70`)
  - Problème : rotation recalculée à chaque render → tampons qui "bougent"
  - Fix : dériver la rotation depuis le `s.id` (hash stable) plutôt que Math.random()
  ```ts
  // Avant
  transform: `rotate(${(Math.random() * 10 - 5).toFixed(1)}deg)`
  // Après — ex: hash du id pour une rotation stable
  const rot = (s.id.charCodeAt(0) % 11) - 5
  transform: `rotate(${rot}deg)`
  ```

- [ ] **Notifications locales pour le streak**
  - Package : `@capacitor/local-notifications`
  - Programmer une notif quotidienne au moment de l'onboarding
  - Exemple : "Ton streak t'attend 🔥 — 5 min suffisent aujourd'hui"
  - Annuler / reprogrammer quand l'user est actif ce jour-là

- [ ] **Prompt de review in-app**
  - Package : `@capacitor-community/in-app-review`
  - Déclencheur idéal : premier tampon gagné
  - Fichier concerné : `src/lib/store.ts` → `completeStep3()` quand `stampEarned` passe à true

---

## ℹ️ Mineur (pas urgent)

- [ ] **Streak storage inconsistency**
  - `getStreak()` retourne `current: 0` si streak cassé, mais la valeur stockée reste à l'ancienne
  - Pas visible pour l'user, mais à nettoyer si on ajoute un "streak repair" plus tard
  - Fix : dans `recordActivity()`, reset `d.streak.current = 0` si la date n'est pas hier

---

## ✅ Déjà bon

- Boucle Écoute → Comprends → Parle → Tampon complète et fonctionnelle
- Streak logique correcte (vérifie hier vs aujourd'hui)
- Passport avec tampons datés et message de completion
- Quiz : daily review, marathon, tracking des erreurs
- 13 catégories × ~10 phrases (contenu V1 suffisant)
- Cloud sync auth + Supabase opérationnel
- Google OAuth natif Android fonctionnel
- Safe area Android OK
- UI Aero cohérente et léchée
