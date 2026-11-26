import { test, expect } from '@playwright/test';
import { routes, routesProtegees } from '../routes';

/**
 * Scénarios 1 à 3 et 9 — authentification et protection des routes.
 * LECTURE SEULE : aucune donnée créée, modifiée ou supprimée.
 */

const USER = process.env.PW_USER;
const PASS = process.env.PW_PASS;

test.describe('Authentification', () => {
  test.skip(!USER || !PASS, 'PW_USER / PW_PASS absents de .env.local');

  test('1 — connexion valide : arrivée sur le tableau de bord', async ({ page }) => {
    await page.goto(routes.login);
    await page.getByPlaceholder('Username').fill(USER!);
    await page.getByPlaceholder('Password').fill(PASS!);
    await page.getByRole('button', { name: /sign in|connexion|login/i }).click();

    await expect(page).toHaveURL(new RegExp(`${routes.dashboard}$`));
    await expect(page.getByText('Clients').first()).toBeVisible();
    // le cookie de session doit être posé
    const cookies = await page.context().cookies();
    expect(cookies.find((c) => c.name === 'token')?.value).toBeTruthy();
  });

  test('2 — connexion refusée : reste sur /login, aucun cookie posé', async ({ page }) => {
    await page.goto(routes.login);
    await page.getByPlaceholder('Username').fill('utilisateur-inexistant-e2e');
    await page.getByPlaceholder('Password').fill('mot-de-passe-invalide');
    await page.getByRole('button', { name: /sign in|connexion|login/i }).click();

    // COMPORTEMENT ACTUEL : aucun message d'erreur n'est affiché à l'utilisateur.
    // app/login/page.js:33 appelle setError() mais la variable `error` n'est jamais rendue.
    // Bug signalé dans ../../TODO-POST-RECUPERATION.md (lot 6), NON corrigé pendant la migration.
    // Quand il sera corrigé, remplacer l'assertion ci-dessous par un contrôle du message visible.
    await expect(page).toHaveURL(new RegExp(`${routes.login}$`));
    const cookies = await page.context().cookies();
    expect(cookies.find((c) => c.name === 'token')).toBeUndefined();
  });

  test('9 — déconnexion : redirige vers /login (la session N’EST PAS invalidée — bug connu)', async ({
    page,
  }) => {
    await page.goto(routes.login);
    await page.getByPlaceholder('Username').fill(USER!);
    await page.getByPlaceholder('Password').fill(PASS!);
    await page.getByRole('button', { name: /sign in|connexion|login/i }).click();
    await expect(page).toHaveURL(new RegExp(`${routes.dashboard}$`));

    await page.getByText('Logout').click();
    await expect(page).toHaveURL(new RegExp(`${routes.login}$`));

    // COMPORTEMENT ACTUEL : app/api/logout/route.ts supprime un cookie nommé `auth_token`
    // alors que le cookie de session s'appelle `token` (app/login/page.js:29).
    // La session survit donc à la déconnexion. Bug signalé dans
    // ../../TODO-POST-RECUPERATION.md (lot 6), NON corrigé pendant la migration.
    // Ce test verrouille le comportement actuel pour détecter toute dérive liée au déplacement.
    // À inverser le jour où le bug sera corrigé.
    const cookies = await page.context().cookies();
    expect(cookies.find((c) => c.name === 'token')?.value).toBeTruthy();
    await page.goto(routes.clients);
    await expect(page).toHaveURL(new RegExp(`${routes.clients}$`));
  });
});

test.describe('Protection des routes (middleware)', () => {
  for (const route of routesProtegees) {
    test(`3 — ${route} sans cookie renvoie vers ${routes.login}`, async ({ page }) => {
      await page.goto(route);
      await expect(page).toHaveURL(new RegExp(`${routes.login}$`));
    });
  }
});
