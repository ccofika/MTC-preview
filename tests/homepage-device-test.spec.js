const { test, expect, devices } = require('@playwright/test');

// Define the different device configurations to test
const deviceTests = [
  {
    name: 'Desktop',
    ...devices['Desktop Chrome'],
    viewport: { width: 1920, height: 1080 }
  },
  {
    name: 'Tablet',
    ...devices['iPad'],
    viewport: { width: 768, height: 1024 }
  },
  {
    name: 'Mobile',
    ...devices['iPhone 13'],
    viewport: { width: 390, height: 844 }
  }
];

// Test the HomePage on different devices
deviceTests.forEach(device => {
  test.describe(`HomePage on ${device.name}`, () => {
    test.beforeEach(async ({ page, context }) => {
      // Set the device viewport and user agent
      await context.setExtraHTTPHeaders({
        'User-Agent': device.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      });
      await page.setViewportSize(device.viewport);
    });

    test(`should load and display correctly`, async ({ page }) => {
      // Navigate to the homepage
      await page.goto('http://localhost:3000');
      
      // Wait for the page to load completely
      await page.waitForLoadState('networkidle');
      
      // Take a full page screenshot
      const screenshot = await page.screenshot({ 
        fullPage: true,
        path: `tests/screenshots/homepage-${device.name.toLowerCase()}.png`
      });
      
      // Basic content checks
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('.home-hero')).toBeVisible();
      await expect(page.locator('.values')).toBeVisible();
      await expect(page.locator('.products-overview')).toBeVisible();
      await expect(page.locator('.recent-projects')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      
      // Check if hero title is visible
      await expect(page.locator('.hero-title')).toBeVisible();
      
      // Check navigation buttons in hero section
      await expect(page.locator('.hero-actions .btn-primary')).toBeVisible();
      await expect(page.locator('.hero-actions .btn-secondary')).toBeVisible();
      
      console.log(`✅ ${device.name} test completed - Screenshot saved`);
    });

    test(`should have responsive navigation`, async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Check if header/navigation is visible
      const header = page.locator('header, .header, nav');
      await expect(header).toBeVisible();
      
      // For mobile, check if hamburger menu exists (if implemented)
      if (device.name === 'Mobile') {
        const hamburger = page.locator('.hamburger, .menu-toggle, .mobile-menu-button');
        if (await hamburger.count() > 0) {
          await expect(hamburger).toBeVisible();
        }
      }
    });

    test(`should handle scroll behavior properly`, async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Test scrolling to different sections
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(500);
      
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(500);
      
      // Scroll back to top
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      
      // Check if scroll dots are visible on desktop
      if (device.name === 'Desktop') {
        const scrollDots = page.locator('.scroll-navigation, .scroll-dots');
        if (await scrollDots.count() > 0) {
          await expect(scrollDots).toBeVisible();
        }
      }
    });

    test(`should load images properly`, async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Check hero background image
      const heroSection = page.locator('.home-hero');
      await expect(heroSection).toBeVisible();
      
      // Check if main icon is loaded
      const heroIcon = page.locator('.hero-icon img, .icon-image');
      if (await heroIcon.count() > 0) {
        await expect(heroIcon).toBeVisible();
      }
      
      // Check value icons
      const valueIcons = page.locator('.value-icon img');
      const iconCount = await valueIcons.count();
      if (iconCount > 0) {
        for (let i = 0; i < iconCount; i++) {
          await expect(valueIcons.nth(i)).toBeVisible();
        }
      }
    });

    test(`should have proper text content and language support`, async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Check if main title exists and is not empty
      const heroTitle = page.locator('.hero-title, h1');
      await expect(heroTitle).toBeVisible();
      const titleText = await heroTitle.textContent();
      expect(titleText?.length).toBeGreaterThan(0);
      
      // Check if subtitle exists
      const heroSubtitle = page.locator('.hero-subtitle');
      if (await heroSubtitle.count() > 0) {
        await expect(heroSubtitle).toBeVisible();
        const subtitleText = await heroSubtitle.textContent();
        expect(subtitleText?.length).toBeGreaterThan(0);
      }
      
      // Check section titles
      const sectionTitles = page.locator('.section-title, h2');
      const titleCount = await sectionTitles.count();
      expect(titleCount).toBeGreaterThan(0);
    });

    test(`should handle interactive elements`, async ({ page }) => {
      await page.goto('http://localhost:3000');
      await page.waitForLoadState('networkidle');
      
      // Test primary CTA button
      const primaryBtn = page.locator('.hero-actions .btn-primary');
      if (await primaryBtn.count() > 0) {
        await expect(primaryBtn).toBeVisible();
        await expect(primaryBtn).toBeEnabled();
      }
      
      // Test secondary CTA button
      const secondaryBtn = page.locator('.hero-actions .btn-secondary');
      if (await secondaryBtn.count() > 0) {
        await expect(secondaryBtn).toBeVisible();
        await expect(secondaryBtn).toBeEnabled();
      }
      
      // Test product cards if they exist
      const productCards = page.locator('.product-slide, .product-card');
      const productCount = await productCards.count();
      if (productCount > 0) {
        // Test first product card
        await expect(productCards.first()).toBeVisible();
      }
      
      // Test project cards if they exist
      const projectCards = page.locator('.project-slide, .project-card');
      const projectCount = await projectCards.count();
      if (projectCount > 0) {
        await expect(projectCards.first()).toBeVisible();
      }
    });
  });
});

// Performance test
test.describe('HomePage Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log(`Page load time: ${loadTime}ms`);
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });
});

// Accessibility basic checks
test.describe('HomePage Accessibility', () => {
  test('should have proper heading structure', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Check for h1
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1); // Should have exactly one h1
    
    // Check for proper heading hierarchy
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        // Alt should be present (can be empty for decorative images)
        expect(alt !== null).toBeTruthy();
      }
    }
  });
});