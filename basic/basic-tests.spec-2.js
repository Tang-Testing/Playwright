import { test, expect } from '@playwright/test';

test('Check all links on homepage are visible', async ({ page }) => {
  await page.goto('https://booknest-dango.netlify.app/');
  const links = page.locator('a');
  const count = await links.count();

  for (let i = 0; i < count; i++) {
    await expect(links.nth(i)).toBeVisible();
  }
});