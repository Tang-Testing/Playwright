import { test, expect } from '@playwright/test';

const BASE_URL = 'https://booknest-dango.netlify.app/';
const VALID_EMAIL = 'user@demo.com';
const VALID_PASSWORD = 'password123';
const INVALID_PASSWORD = 'wrongpass';

test.describe('Login Page Tests', () => {

  test('TC-05: Successful login with valid credentials', async ({ page }) => {
    await page.goto(`${BASE_URL}login`);
    await page.fill('input[placeholder="you@example.com"]', VALID_EMAIL);
    await page.fill('input[placeholder="รหัสผ่านของคุณ"]', VALID_PASSWORD);
    await page.click('button:has-text("เข้าสู่ระบบ")');
    // ตรวจสอบว่าล็อกอินสำเร็จ (เช่น redirect ไปหน้าโปรไฟล์หรือหน้าแรก)
    await expect(page).toHaveURL(/.*\/(profile|\/)/);
  });

  test('TC-06: Failed login with invalid password', async ({ page }) => {
    await page.goto(`${BASE_URL}login`);
    await page.fill('input[placeholder="you@example.com"]', VALID_EMAIL);
    await page.fill('input[placeholder="รหัสผ่านของคุณ"]', INVALID_PASSWORD);
    await page.click('button:has-text("เข้าสู่ระบบ")');
    
    // ตรวจสอบว่ายังอยู่ที่หน้า login (เนื่องจาก login ไม่สำเร็จ)
    await expect(page).toHaveURL(/.*\/login/);
    // ตรวจสอบว่า input password ยังคงอยู่
    await expect(page.locator('input[placeholder="รหัสผ่านของคุณ"]')).toBeVisible();
  });

  test('TC-07: Attempt login with empty fields', async ({ page }) => {
    await page.goto(`${BASE_URL}login`);
    const emailInput = page.locator('input[placeholder="you@example.com"]');
    const passwordInput = page.locator('input[placeholder="รหัสผ่านของคุณ"]');
    
    // คลิกปุ่ม login โดยไม่กรอกข้อมูล
    await page.click('button:has-text("เข้าสู่ระบบ")');
    
    // ตรวจสอบว่า input fields มี validation error
    await expect(emailInput).toHaveAttribute('required', '');
    await expect(passwordInput).toHaveAttribute('required', '');
  });
});
