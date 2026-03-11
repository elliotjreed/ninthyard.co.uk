import { expect, test } from '@playwright/test';

test('h1 is visible', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
});

test('services section is present', async ({ page }) => {
	await page.goto('/');
	const services = page.locator('section').filter({ hasText: /AI Strategy|AI Implementation|Prompting/i });
	await expect(services).toBeVisible();
});

test('"Get in touch" header CTA navigates to /contact', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Get in touch' }).first().click();
	await expect(page).toHaveURL('/contact');
});
