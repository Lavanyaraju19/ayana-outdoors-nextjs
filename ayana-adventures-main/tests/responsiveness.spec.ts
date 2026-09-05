import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'Who We Are' },
  { path: '/adventures', name: 'Upcoming Adventures' },
  { path: '/resources', name: 'Resources' },
  { path: '/resources/faqs', name: 'Resources FAQs' },
  { path: '/who-we-journey-with', name: 'Who We Journey With' },
  { path: '/founder', name: 'Founder Story' },
  { path: '/safety-care', name: 'Safety & Care' },
  { path: '/sankalpa', name: 'Sankalpa' },
  { path: '/contact', name: 'Contact' },
];

test.describe('Responsiveness and UI Validation', () => {
  pages.forEach(({ path, name }) => {
    test.describe(`${name} (${path})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000); // Wait for animations
      });

      test('should load without errors', async ({ page }) => {
        await expect(page).toHaveURL(new RegExp(path));
      });

      test('should not have horizontal overflow', async ({ page }) => {
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = page.viewportSize()?.width || 0;
        
        expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // Allow 1px tolerance
      });

      test('navigation should be visible', async ({ page }) => {
        const navbar = page.locator('nav').first();
        await expect(navbar).toBeVisible();
      });

      test('footer should be visible', async ({ page }) => {
        const footer = page.locator('footer').first();
        await expect(footer).toBeVisible();
      });

      test('hero video should work if present on homepage', async ({ page }) => {
        if (path === '/') {
          const video = page.locator('video').first();
          if (await video.isVisible()) {
            await expect(video).toHaveAttribute('autoplay');
            await expect(video).toHaveAttribute('loop');
            await expect(video).toHaveAttribute('muted');
          }
        }
      });
    });
  });

  // Hero video specific tests
  test.describe('Hero Video', () => {
    test('should play automatically on home page', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      const video = page.locator('video').first();
      if (await video.isVisible()) {
        await expect(video).toHaveAttribute('autoplay');
        await expect(video).toHaveAttribute('loop');
        await expect(video).toHaveAttribute('muted');
        
        // Check if video is playing
        const isPlaying = await video.evaluate((video: HTMLVideoElement) => {
          return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
        });

        // Wait a bit for video to start
        await page.waitForTimeout(2000);

        const isPlayingAfterWait = await video.evaluate((video: HTMLVideoElement) => {
          return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
        });
        
        expect(isPlayingAfterWait).toBeTruthy();
      }
    });

    test('sound toggle should work', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      const soundButton = page.locator('button:has-text("Sound"), button[aria-label*="sound"], button[aria-label*="mute"]').first();
      const video = page.locator('video').first();
      
      if (await soundButton.isVisible() && await video.isVisible()) {
        const initialMuted = await video.evaluate((v: HTMLVideoElement) => v.muted);

        await soundButton.click();
        await page.waitForTimeout(500);

        const afterClickMuted = await video.evaluate((v: HTMLVideoElement) => v.muted);
        
        // Sound toggle should change muted state
        expect(afterClickMuted).not.toBe(initialMuted);
      }
    });

    test('video should scale correctly', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000);
      
      const video = page.locator('video').first();
      if (await video.isVisible()) {
        const box = await video.boundingBox();
        expect(box).toBeTruthy();
        expect(box!.width).toBeGreaterThan(0);
        expect(box!.height).toBeGreaterThan(0);
      }
    });
  });

  // Accessibility tests
  test.describe('Accessibility', () => {
    pages.forEach(({ path, name }) => {
      test(`${name} should have proper heading hierarchy`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        
        const h1s = page.locator('h1');
        const h1Count = await h1s.count();
        
        // Should have exactly one h1
        expect(h1Count).toBe(1);
      });

      test(`${name} images should have alt text`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        
        const images = page.locator('img');
        const count = await images.count();
        
        if (count > 0) {
          for (let i = 0; i < Math.min(count, 10); i++) {
            const img = images.nth(i);
            const alt = await img.getAttribute('alt');
            // Decorative images can have empty alt, but should have the attribute
            expect(alt).not.toBeNull();
          }
        }
      });
    });
  });
});
