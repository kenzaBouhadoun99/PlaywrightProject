import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const environment = process.env.TEST_ENV || 'test';

dotenv.config({
  path: `config/.env.${environment}`,
});

console.log(`Environnement : ${environment}`);
console.log(`BASE_URL : ${process.env.BASE_URL}`);

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});