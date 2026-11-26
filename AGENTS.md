# AGENTS.md — Nanterre DOM Tool

Application **Next.js 14 (App Router) en production et fonctionnelle**. Back-office de domiciliation :
clients, modèles de messages, envoi de SMS via Octopush, historique des envois.

Stack : Next.js 14.2.4 · React 18 · Tailwind 3 · Prisma 5 → MongoDB · JWT en cookie + bcrypt.

## Consignes de référence — à lire avant toute action

Elles sont volontairement stockées **hors du dépôt**, dans le dossier parent :

| Fichier | Contenu |
|---|---|
| `../CONSIGNES-REFONTE-NANTERRE-DOM.md` | Contexte, règle absolue de préservation, périmètre des 11 pages, décision d'architecture |
| `../EQUIPE-IA-ET-PROTOCOLE-MIGRATION.md` | Rôles IA, modèles à utiliser, ordre des 12 lots, fiche de dépendances, conditions de gate |
| `../TODO-POST-RECUPERATION.md` | Ce qui sera construit après la récupération des pages |

## Les cinq règles qui ne se discutent pas

1. **Ne rien casser.** Ce projet tourne en production. Sa préservation est prioritaire sur toute
   autre considération.
2. **Ajouter, pas modifier.** Nouveaux fichiers par défaut. Toute modification d'un fichier existant
   doit être justifiée et **autorisée explicitement** par le propriétaire du projet avant d'être
   écrite.
3. **Un lot à la fois, un gate à chaque lot.** Jamais deux migrations enchaînées sans tests verts.
4. **Aucun bug corrigé en passant.** Un problème repéré est reporté dans
   `../TODO-POST-RECUPERATION.md`, pas corrigé dans le lot en cours.
5. **Jamais d'envoi de SMS réel, jamais de transaction réelle, jamais de modification du schéma
   Prisma** pendant cette phase.

## Cible de la migration en cours

```
app/
├── (site)/     → site commercial public        nanterredom.fr/
├── admin/      → ce back-office, inchangé      nanterredom.fr/admin/...
└── api/        → partagé, inchangé
```

Les 12 lots sont décrits dans le protocole. **Rien n'est commencé** : en attente du lot 0 (branche
dédiée, Playwright, capture de la référence).

## Commandes

```sh
npm install        # installe + lance prisma generate (postinstall)
npm run dev        # développement, http://localhost:3000
npm run build      # doit passer avant chaque validation de lot
npm run lint
```

`.env.local` est local et hors Git (récupérable par `vercel env pull`). Variables requises :
`MONGO_URI`, `JWT_SECRET`, `OCTOPUSH_API_KEY`, `OCTOPUSH_API_LOGIN`.

## Points connus — à ne pas « corriger » spontanément

- `lib/auth.ts` lit `process.env.JTW_SECRET` (faute de frappe) : `getUserFromCookie()` renvoie donc
  toujours `null`. Fonction non utilisée aujourd'hui, bug dormant. **Signalé, non corrigé.**
- Deux configurations PostCSS coexistent (`postcss.config.js` et `postcss.config.mjs`).
- `next.config.mjs` contient `experimental: { middleware: true }`, obsolète en Next 14.
- `credential.txt` est versionné à la racine : à sortir du dépôt, avec rotation des identifiants.
- 35 vulnérabilités npm (dont 3 critiques).
- Les dépendances `twilio` et `@vonage/server-sdk` sont installées mais aucune route ne les utilise.

Tous ces points sont listés dans `../TODO-POST-RECUPERATION.md` (lot 6). Ils ne doivent pas être
traités pendant la migration.
