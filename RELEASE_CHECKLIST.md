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

- [x] **Fix Math.random() dans Passport** (`src/components/Passport.tsx:70`)
  - Rotation dérivée des charCodes du `s.id` → stable entre les renders

- [x] **Notifications locales pour le streak**
  - `@capacitor/local-notifications` installé et synced
  - `src/lib/notifications.ts` : permission + schedule/cancel
  - Demande de permission au dernier écran de l'onboarding
  - Replanifie pour demain 19h à chaque `recordActivity()` dans le store

- [x] **Prompt de review in-app**
  - `@capacitor-community/in-app-review` installé et synced
  - Déclenché dans `completeStep3()` lors du tout premier tampon gagné (dynamic import)

---

## ℹ️ Mineur (pas urgent)

- [x] **Streak storage inconsistency**
  - `getStreak()` reset maintenant `d.streak.current = 0` en storage si le streak est cassé

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
