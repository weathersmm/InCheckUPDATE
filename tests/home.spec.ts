import { test, expect } from '@playwright/test';

// Helper to evaluate computed style property
async function getComputedStyleValue(page, selector, prop) {
  return await page.$eval(selector, (el, prop) => getComputedStyle(el).getPropertyValue(prop), prop);
}

// Helper to read numeric pixel value from a CSS property (like '88px')
function toPxNumber(value) {
  if (!value) return NaN;
  const n = parseFloat(String(value).replace('px', '').trim());
  return Number.isNaN(n) ? NaN : n;
}

test.describe('Homepage layout guardrails', () => {
  test('header height, navbar display, hero padding, no horizontal scroll', async ({ page }) => {
    await page.goto('/');

    // Ensure header rendered
    const header = page.locator('#header');
    await expect(header).toBeVisible();

    // 1) Header height <= 120px
    const headerBox = await header.boundingBox();
    expect(headerBox).not.toBeNull();
    if (headerBox) {
      expect(headerBox.height).toBeLessThanOrEqual(120);
    }

    // 2) Navbar list is display:flex at width=1200 and no mobile state
    await page.setViewportSize({ width: 1200, height: 900 });
    const navList = page.locator('#navbar .navbar-nav');
    await expect(navList).toBeVisible();
    const display = await navList.evaluate((el) => getComputedStyle(el).display);
    expect(display).toBe('flex');

    // Guard: navbar should not have mobile class at desktop width
    const hasNavbarMobile = await page.locator('#navbar.navbar-mobile').count();
    expect(hasNavbarMobile).toBe(0);

    // 3) .section.hero top padding ≥ var(--header-height)
    // Read the custom property from :root (or body)
    const headerHeightVar = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--header-height'));
    const headerHeightPx = toPxNumber(headerHeightVar);

    // Ensure at least one hero section is present
    const hero = page.locator('.section.hero');
    const heroCount = await hero.count();
    await expect(heroCount).toBeGreaterThan(0);
    const firstHero = hero.first();

    const paddingTopValue = await firstHero.evaluate((el) => getComputedStyle(el).paddingTop);
    const paddingTopPx = toPxNumber(paddingTopValue);

    expect.soft(Number.isNaN(headerHeightPx)).toBeFalsy();
    expect.soft(Number.isNaN(paddingTopPx)).toBeFalsy();
    if (!Number.isNaN(headerHeightPx) && !Number.isNaN(paddingTopPx)) {
      expect(paddingTopPx).toBeGreaterThanOrEqual(headerHeightPx);
    }

    // 4) No horizontal scroll on page
    const hasHorizontalScroll = await page.evaluate(() => {
      const docEl = document.documentElement;
      return docEl.scrollWidth > docEl.clientWidth || document.body.scrollWidth > document.body.clientWidth;
    });
    expect(hasHorizontalScroll).toBe(false);
  });
});
