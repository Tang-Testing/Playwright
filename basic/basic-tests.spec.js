import { test, expect } from '@playwright/test';

test('Home page should load correctly', async ({ page }) => {
  await page.goto('https://booknest-dango.netlify.app/');
  await expect(page).toHaveTitle(/BookNest/);
  await expect(page.locator('header')).toBeVisible();
});