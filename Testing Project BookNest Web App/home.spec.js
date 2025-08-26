import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {

  test('TC-01: Homepage should load with correct title', async ({ page }) => {
    await page.goto('https://booknest-dango.netlify.app/');
    await expect(page).toHaveTitle(/BookNest/);
    await expect(page.locator('header')).toBeVisible();
  });

  test('TC-02: Navigation menu should be visible', async ({ page }) => {
    await page.goto('https://booknest-dango.netlify.app/');
    const navMenu = page.locator('nav');
    await expect(navMenu).toBeVisible();
    const menuItems = await navMenu.locator('a').count();
    expect(menuItems).toBeGreaterThan(0); // ตรวจสอบว่ามีลิงก์ในเมนู
  });
});