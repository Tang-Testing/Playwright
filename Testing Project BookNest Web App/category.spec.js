import { test, expect } from '@playwright/test';

test.describe('Category Filter Tests', () => {

  test('TC-03: Filter by Fiction category', async ({ page }) => {
    await page.goto('https://booknest-dango.netlify.app/');
    await page.click('button:has-text("Fiction")');
    const books = page.locator('.book-card');
    await expect(books.first()).toBeVisible();
  });

  test('TC-04: Filter by Non-Fiction category', async ({ page }) => {
    await page.goto('https://booknest-dango.netlify.app/');
    await page.click('button:has-text("Non-Fiction")');
    const books = page.locator('.book-card');
    await expect(books.first()).toBeVisible();
  });
});