import { test, expect } from '@playwright/test';

/**
 * Correctif « accès non authentifié » — 26/11/2026.
 *
 * Avant correction, ces routes répondaient 200 à un visiteur anonyme, en local
 * ET en production : la liste des 306 clients avec leurs numéros de téléphone
 * était publiquement lisible, et l'envoi de SMS accessible sans compte.
 *
 * Ces tests échouent si la faille réapparaît. Ils ne doivent jamais être
 * supprimés ni assouplis.
 */

const pagesProtegees = ['/octopush', '/historique', '/settings', '/register'];

const apiProtegees = [
  '/api/clients/get-client',
  '/api/octopush/check-balance',
  '/api/user',
];

test.describe('Accès anonyme refusé', () => {
  for (const route of pagesProtegees) {
    test(`page ${route} renvoie un visiteur anonyme vers /login`, async ({ page }) => {
      await page.goto(route);
      await expect(page).toHaveURL(/\/login$/);
    });
  }

  for (const route of apiProtegees) {
    test(`API ${route} ne renvoie aucune donnée à un visiteur anonyme`, async ({ request }) => {
      const reponse = await request.get(route, { maxRedirects: 0 });
      // le middleware répond par une redirection vers /login (3xx) : jamais 200
      expect(reponse.status(), `${route} doit refuser l'accès anonyme`).not.toBe(200);
      expect(reponse.status()).toBeGreaterThanOrEqual(300);
    });
  }
});

test.describe('Points d’entrée toujours ouverts', () => {
  test('/login reste accessible sans être connecté', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  });

  test('/api/login reste joignable sans être connecté', async ({ request }) => {
    const reponse = await request.post('/api/login', {
      data: { username: 'utilisateur-inexistant-e2e', password: 'invalide' },
      failOnStatusCode: false,
    });
    // 401 = la route fonctionne et rejette les identifiants : elle n'est pas bloquée
    expect(reponse.status()).toBe(401);
  });
});
