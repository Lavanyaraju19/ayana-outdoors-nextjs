import { test, expect } from '@playwright/test';

const ADMIN_EMAIL = process.env.DEV_ADMIN_EMAIL ?? 'admin@ayanaoutdoors.local';
const ADMIN_PASSWORD = process.env.DEV_ADMIN_PASSWORD ?? 'AyanaLocalDev123!';

async function loginAsAdmin(page: import('@playwright/test').Page) {
  await page.goto('/admin/login');
  await page.getByLabel('Email').fill(ADMIN_EMAIL);
  await page.getByLabel('Password').fill(ADMIN_PASSWORD);
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/admin$/);
}

// These tests share one local Supabase auth/database instance rather than isolated fixtures,
// so they run one at a time to avoid racing writes/sessions against each other.
test.describe.configure({ mode: 'serial' });

test.describe('Admin authentication', () => {
  test('unauthenticated visitor is redirected away from /admin', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('logging in with wrong credentials shows an error, not a crash', async ({ page }) => {
    await page.goto('/admin/login');
    await page.getByLabel('Email').fill('nobody@example.com');
    await page.getByLabel('Password').fill('wrong-password');
    await page.getByRole('button', { name: /sign in/i }).click();
    await expect(page.getByText('Incorrect email or password.')).toBeVisible();
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('logging in with valid credentials reaches the dashboard', async ({ page }) => {
    await loginAsAdmin(page);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });
});

test.describe('Admin content edit reaches the public site', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('editing an FAQ answer updates the public FAQ page without a rebuild', async ({ page }) => {
    const marker = `E2E marker ${Date.now()}`;

    await page.goto('/admin/faqs');
    await page.getByRole('button', { name: /^Edit / }).first().click();

    const answerField = page.getByLabel('Answer');
    const originalAnswer = await answerField.inputValue();
    await answerField.fill(`${originalAnswer} ${marker}`);
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();

    await page.goto('/resources/faqs');
    // FAQ answers live inside a collapsed accordion — expand the question to reveal the answer.
    await page.getByRole('button', { name: /what is the minimum age/i }).click();
    await expect(page.getByText(marker)).toBeVisible();

    // Revert so repeated test runs stay idempotent.
    await page.goto('/admin/faqs');
    await page.getByRole('button', { name: /^Edit / }).first().click();
    await page.getByLabel('Answer').fill(originalAnswer);
    await page.getByRole('button', { name: 'Save' }).click();
  });

  test('sign out actually ends the session', async ({ page }) => {
    await page.getByRole('button', { name: /sign out/i }).click();
    await expect(page).toHaveURL(/\/admin\/login/);
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});

test.describe('Enquiry form', () => {
  test('submitting the contact form saves it and it appears in the admin enquiries list', async ({ page }) => {
    const uniqueName = `Playwright Test ${Date.now()}`;

    await page.goto('/contact');
    await page.getByLabel('Parent / Guardian Name').fill(uniqueName);
    await page.getByRole('textbox', { name: 'Email' }).fill('e2e-test@example.com');
    await page.getByLabel('WhatsApp Number').fill('9999999999');
    await page.getByRole('textbox', { name: 'Message' }).fill('Automated end-to-end test submission.');
    await page.getByRole('button', { name: /join the community/i }).click();

    await expect(page.getByRole('status')).toContainText(/thanks/i, { timeout: 10000 });

    await loginAsAdmin(page);
    await page.goto('/admin/enquiries');
    await expect(page.getByText(uniqueName)).toBeVisible();
  });

  test('invalid input is rejected client-side without hitting the server', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('textbox', { name: 'Email' }).fill('not-an-email');
    await page.getByRole('button', { name: /join the community/i }).click();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });
});
