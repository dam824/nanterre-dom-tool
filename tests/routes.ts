/**
 * Table des URL du back-office — SOURCE UNIQUE pour les tests E2E.
 *
 * À chaque lot de migration, on modifie UNE SEULE ligne ici, puis on relance la suite.
 * Les tests ne contiennent aucune URL en dur : ils passent tous par cette table.
 *
 * État : avant migration (lot 0). Voir ../../EQUIPE-IA-ET-PROTOCOLE-MIGRATION.md §3.
 */
export const routes = {
  racine: '/',               // lot 9  → deviendra l'accueil du site commercial
  login: '/login',           // lot 9  → /admin/login
  register: '/register',     // lot 2  → /admin/register
  dashboard: '/dashboard',   // lot 8  → /admin/dashboard
  clients: '/clients',       // lot 6  → /admin/clients
  messages: '/messages',     // lot 5  → /admin/messages
  historique: '/historique', // lot 4  → /admin/historique
  octopush: '/octopush',     // lot 7  → /admin/octopush
  monCompte: '/mon-compte',  // lot 3  → /admin/mon-compte
  settings: '/settings',     // lot 1  → /admin/settings
} as const;

/** Pages protégées par le middleware : un accès sans cookie doit renvoyer vers login. */
export const routesProtegees = [
  routes.dashboard,
  routes.clients,
  routes.messages,
  routes.monCompte,
] as const;
