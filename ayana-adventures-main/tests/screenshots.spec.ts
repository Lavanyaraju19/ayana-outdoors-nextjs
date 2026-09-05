import { test } from '@playwright/test';

const pages = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/adventures', name: 'adventures' },
  { path: '/resources', name: 'resources' },
  { path: '/resources/faqs', name: 'resources-faqs' },
  { path: '/who-we-journey-with', name: 'who-we-journey-with' },
  { path: '/founder', name: 'founder' },
  { path: '/safety-care', name: 'safety-care' },
  { path: '/sankalpa', name: 'sankalpa' },
  { path: '/contact', name: 'contact' },
];

test.describe('Screenshot Capture', () => {
  pages.forEach(({ path, name }) => {
    test(`capture screenshots for ${name}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(3000); // Wait for animations
      
      const deviceName = test.info().project.name;
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const isMobile = deviceName.includes('mobile') || deviceName.includes('iphone') || deviceName.includes('android') || deviceName.includes('pixel') || deviceName.includes('galaxy');
      
      // Only capture full page screenshots on desktop to avoid size limits on mobile
      if (!isMobile) {
        await page.screenshot({
          path: `screenshots/before/${deviceName}-${name}-full-${timestamp}.png`,
          fullPage: true,
        });
      }
      
      // Viewport screenshot (always capture)
      await page.screenshot({
        path: `screenshots/before/${deviceName}-${name}-viewport-${timestamp}.png`,
        fullPage: false,
      });
    });
  });
});
