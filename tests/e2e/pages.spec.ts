import { test, expect } from '@playwright/test';
import { routes } from '../routes';

/**
 * Scénarios 4 à 8 — affichage des écrans du back-office.
 * LECTURE SEULE : aucun formulaire n'est soumis, aucune donnée n'est créée,
 * modifiée ou supprimée. Le scénario Octopush s'arrête AVANT toute soumission.
 */

const USER = process.env.PW_USER;
const PASS = process.env.PW_PASS;

test.describe('Écrans du back-office', () => {
  test.skip(!USER || !PASS, 'PW_USER / PW_PASS absents de .env.local');

  // une seule connexion réutilisée par tous les tests du bloc
  test.beforeEach(async ({ page }) => {
    await page.goto(routes.login);
    await page.getByPlaceholder('Username').fill(USER!);
    await page.getByPlaceholder('Password').fill(PASS!);
    await page.getByRole('button', { name: /sign in|connexion|login/i }).click();
    await expect(page).toHaveURL(new RegExp(`${routes.dashboard}$`));
  });

  test('4 — tableau de bord : cartes et tableau des clients', async ({ page }) => {
    await expect(page.getByText('Clients').first()).toBeVisible();
    await expect(page.locator('table')).toBeVisible();
    // au moins une ligne de données : la base en contient 306
    expect(await page.locator('table tbody tr').count()).toBeGreaterThan(0);
  });

  test('5 — clients : liste, recherche et champs du formulaire', async ({ page }) => {
    await page.goto(routes.clients);
    await expect(page).toHaveURL(new RegExp(`${routes.clients}$`));
    await expect(page.locator('table')).toBeVisible();
    expect(await page.locator('table tbody tr').count()).toBeGreaterThan(0);

    // la recherche filtre sans rien modifier en base
    const recherche = page.getByPlaceholder('Rechercher un client ...');
    await expect(recherche).toBeVisible();
    const avant = await page.locator('table tbody tr').count();
    await recherche.fill('zzz-aucun-resultat-attendu');
    // une recherche infructueuse laisse une seule ligne (message « aucun résultat »)
    await expect(page.locator('table tbody tr')).toHaveCount(1, { timeout: 5000 });
    await recherche.fill('');
    await expect(page.locator('table tbody tr')).toHaveCount(avant, { timeout: 5000 });
  });

  test('6 — modèles de messages : liste affichée', async ({ page }) => {
    await page.goto(routes.messages);
    await expect(page).toHaveURL(new RegExp(`${routes.messages}$`));
    await expect(page.getByText('Message Templates')).toBeVisible();
    // la base contient 8 modèles — chargés en asynchrone, on attend la première ligne
    await expect(page.locator('table tbody tr').first()).toBeVisible({ timeout: 15_000 });
  });

  test('7 — historique : tableau des SMS envoyés', async ({ page }) => {
    await page.goto(routes.historique);
    await expect(page).toHaveURL(new RegExp(`${routes.historique}$`));
    await expect(page.locator('table')).toBeVisible();
  });

  test('8 — octopush : recherche client et formulaire — SANS AUCUN ENVOI', async ({ page }) => {
    await page.goto(routes.octopush);
    await expect(page).toHaveURL(new RegExp(`${routes.octopush}$`));
    // présence des deux blocs : sélection des clients et choix du modèle
    await expect(page.locator('form, select, input').first()).toBeVisible();
    // GARDE-FOU : on vérifie qu'aucune requête d'envoi n'a été émise
    const envois: string[] = [];
    page.on('request', (r) => {
      if (r.url().includes('/api/octopush/send-message')) envois.push(r.url());
    });
    await page.waitForTimeout(1000);
    expect(envois).toHaveLength(0);
  });

  test('bonus — mon compte et paramètres s’affichent', async ({ page }) => {
    // « Mon Compte » et « Paramètres » apparaissent 2 fois : lien de la Sidebar + titre de page.
    // On cible le titre, pas le lien.
    await page.goto(routes.monCompte);
    await expect(page.getByRole('heading', { name: 'Mon Compte' })).toBeVisible();

    await page.goto(routes.settings);
    await expect(page.getByRole('heading', { name: 'Paramètres' })).toBeVisible();
  });
});
