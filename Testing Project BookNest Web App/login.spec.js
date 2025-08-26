import { test, expect } from '@playwright/test';

const BASE_URL = 'https://booknest-dango.netlify.app/';
const VALID_EMAIL = 'user@demo.com';
const VALID_PASSWORD = 'Password123';
const INVALID_PASSWORD = 'wrongpass';

test.describe('Login Page Tests', () => {

  test('TC-05: Successful login with valid credentials', async ({ page }) => {
    await page.goto(`${BASE_URL}login`);

    await page.fill('input[name="email"]', VALID_EMAIL);
    await page.fill('input[name="password"]', VALID_PASSWORD);
    await page.click('button[type="submit"]');

    // ตรวจสอบว่าล็อกอินสำเร็จ เช่น มีข้อความต้อนรับ
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('TC-06: Failed login with invalid password', async ({ page }) => {
    await page.goto(`${BASE_URL}login`);

    await page.fill('input[name="email"]', VALID_EMAIL);
    await page.fill('input[name="password"]', INVALID_PASSWORD);
    await page.click('button[type="submit"]');

    // ตรวจสอบข้อความ error
    await expect(page.locator('text=Invalid username or password')).toBeVisible();
  });

  test('TC-07: Attempt login with empty fields', async ({ page }) => {
    await page.goto(`${BASE_URL}login`);
    await page.click('button[type="submit"]');

    // ตรวจสอบข้อความแจ้งเตือน
    await expect(page.locator('text=Please fill in all fields')).toBeVisible();
  });
});