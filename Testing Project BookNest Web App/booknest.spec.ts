import { test, expect } from '@playwright/test';

test('Booknest homepage loads and displays key elements', async ({ page }) => {
  await page.goto('https://booknest-dango.netlify.app/');
  await expect(page).toHaveTitle(/Booknest|booknest/i);
  // ตรวจสอบ header ว่ามีข้อความ Booknest
  await expect(page.locator('header')).toContainText(/Booknest/i);
  // ตรวจสอบ nav ตัวแรกว่ามีเมนูหลัก เช่น หน้าแรก
  await expect(page.locator('nav').first()).toContainText(/หน้าแรก/);
  // ตรวจสอบว่ามีลิงก์ "ดูรายการหนังสือ" ซึ่งเป็นฟีเจอร์สำคัญของเว็บ
  await expect(page.getByRole('link', { name: /ดูรายการหนังสือ/ })).toBeVisible();
});
