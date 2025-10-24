// @ts-check
const { devices } = require('@playwright/test');

/**
 * Playwright configuration
 * - Builds the Hugo site
 * - Serves from ./public on port 4173
 * - Runs tests against Chromium at 1200px width
 */

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  timeout: 30 * 1000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    browserName: 'chromium',
    viewport: { width: 1200, height: 900 },
    ignoreHTTPSErrors: true,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'bash -lc "chmod +x ./hugo && npm run build:hugo && npx http-server ./public -p 4173 --silent"',
    url: 'http://localhost:4173',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};

module.exports = config;
