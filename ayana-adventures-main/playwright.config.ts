import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // Functional/CMS/enquiry tests: run once, on a single desktop profile — these hit a
    // shared local database, so running them across all 9 viewport projects in parallel
    // would just race writes against itself for no responsive-coverage benefit.
    {
      name: 'functional',
      testMatch: /admin-cms\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },

    // Desktop viewports
    {
      name: 'desktop-1366x768',
      testMatch: /responsiveness\.spec\.ts|screenshots\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 },
      },
    },
    {
      name: 'desktop-1440x900',
      testMatch: /responsiveness\.spec\.ts|screenshots\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'desktop-1536x864',
      testMatch: /responsiveness\.spec\.ts|screenshots\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1536, height: 864 },
      },
    },
    {
      name: 'desktop-1920x1080',
      testMatch: /responsiveness\.spec\.ts|screenshots\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    // Mobile devices
    {
      name: 'mobile-iphone-se',
      testMatch: /responsiveness\.spec\.ts|screenshots\.spec\.ts/,
      use: {
        ...devices['iPhone SE'],
      },
    },
    {
      name: 'mobile-iphone-14',
      testMatch: /responsiveness\.spec\.ts|screenshots\.spec\.ts/,
      use: {
        ...devices['iPhone 14'],
      },
    },
    {
      name: 'mobile-pixel-7',
      testMatch: /responsiveness\.spec\.ts|screenshots\.spec\.ts/,
      use: {
        ...devices['Pixel 7'],
      },
    },
    {
      name: 'mobile-galaxy-s23',
      testMatch: /responsiveness\.spec\.ts|screenshots\.spec\.ts/,
      use: {
        ...devices['Galaxy S23'],
      },
    },
    {
      name: 'mobile-ipad',
      testMatch: /responsiveness\.spec\.ts|screenshots\.spec\.ts/,
      use: {
        ...devices['iPad Pro 11'],
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
