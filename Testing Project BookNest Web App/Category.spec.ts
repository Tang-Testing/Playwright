import { test, expect } from '@playwright/test';

test.describe('Category Filter Tests', () => {

  test.beforeEach(async ({ page }) => {
    // ไปที่หน้ารายการหนังสือก่อนแต่ละเทสเคส
    await page.goto('https://booknest-dango.netlify.app/books');
    // รอให้หน้ารายการหนังสือและปุ่มกรองโหลดเสร็จ
    await Promise.all([
      page.waitForSelector('main article'),
      page.waitForSelector('a[href="#novel"]'),
      page.waitForSelector('a[href="#nonfiction"]')
    ]);
  });

  test('TC-03: Filter by Fiction category', async ({ page }) => {
    // คลิกลิงก์กรองหมวดหมู่นิยาย
    await Promise.all([
      // รอการคลิกและการเปลี่ยน URL พร้อมกัน
      page.click('a[href="#novel"]'),
      page.waitForURL(/.*#novel$/)
    ]);
    
    // รอให้รายการหนังสือกรองเสร็จ
    await page.waitForSelector('main article');
    
    // ตรวจสอบว่ามีหนังสือประเภทนิยายแสดง
    const novelLink = page.getByRole('link', { name: 'นิยาย', exact: true });
    await expect(novelLink).toBeVisible();
  });

  test('TC-04: Filter by Non-Fiction category', async ({ page }) => {
    // คลิกลิงก์กรองหมวดหมู่สารคดี
    await Promise.all([
      // รอการคลิกและการเปลี่ยน URL พร้อมกัน
      page.click('a[href="#nonfiction"]'),
      page.waitForURL(/.*#nonfiction$/)
    ]);
    
    // รอให้รายการหนังสือกรองเสร็จ
    await page.waitForSelector('main article');
    
    // ตรวจสอบว่ามีหนังสือประเภทสารคดีแสดง
    const nonfictionLink = page.getByRole('link', { name: 'สารคดี', exact: true });
    await expect(nonfictionLink).toBeVisible();
  });
});
