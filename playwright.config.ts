import { defineConfig, devices } from '@playwright/test';
import { readFileSync } from 'node:fs';

/**
 * Charge .env.local (non lu automatiquement par Playwright, contrairement à Next).
 * Aucun secret n'est écrit dans ce fichier : tout vient de .env.local, hors Git.
 */
try {
  for (const ligne of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = ligne.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
} catch {
  // .env.local absent : les tests qui ont besoin d'identifiants seront ignorés.
}

export default defineConfig({
  testDir: './tests/e2e',
  outputDir: './test-results',
  fullyParallel: false, // base de production : on reste séquentiel et sans charge
  forbidOnly: true,
  retries: 1,
  workers: 1,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  timeout: 30_000,
  expect: { timeout: 10_000 },
  use: {
    baseURL: process.env.PW_BASE_URL ?? 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    locale: 'fr-FR',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev',
    url: process.env.PW_BASE_URL ?? 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
