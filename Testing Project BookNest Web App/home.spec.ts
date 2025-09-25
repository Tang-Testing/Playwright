import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {

  test('TC-01: Homepage should load with correct title', async ({ page }) => {
    await page.goto('https://booknest-dango.netlify.app/');
    await expect(page).toHaveTitle(/BookNest/);
    await expect(page.locator('header')).toBeVisible();
  });

  test('TC-02: Navigation menu should be visible', async ({ page }) => {
    await page.goto('https://booknest-dango.netlify.app/');
    const navMenu = page.locator('nav').first();
    await expect(navMenu).toBeVisible();

    // ตรวจสอบว่ามีลิงก์หรือปุ่มใน nav อย่างน้อย 1 รายการ
    const menuLinks = await navMenu.locator('a, button, li').count();
    expect(menuLinks).toBeGreaterThan(0);
  });
});
