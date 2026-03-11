import { expect, test } from '@playwright/test';

test('submitting an empty form shows errors for all required fields', async ({ page }) => {
	await page.goto('/contact');
	await page.getByRole('button', { name: 'Send message' }).click();

	await expect(page.getByRole('alert').filter({ hasText: 'Please enter your name' })).toBeVisible();
	await expect(page.getByRole('alert').filter({ hasText: 'Please enter your email address' })).toBeVisible();
	await expect(page.getByRole('alert').filter({ hasText: 'Please tell us a bit about your enquiry' })).toBeVisible();
});

test('invalid email format shows an error', async ({ page }) => {
	await page.goto('/contact');
	await page.locator('#name').fill('Test User');
	await page.locator('#email').fill('not-a-valid-email');
	await page.locator('#message').fill('This is a sufficiently long test message.');
	await page.getByRole('button', { name: 'Send message' }).click();

	await expect(page.getByRole('alert').filter({ hasText: 'Please enter a valid email address' })).toBeVisible();
});

test('message below minimum length shows an error', async ({ page }) => {
	await page.goto('/contact');
	await page.locator('#name').fill('Test User');
	await page.locator('#email').fill('test@example.com');
	await page.locator('#message').fill('Too short');
	await page.getByRole('button', { name: 'Send message' }).click();

	await expect(page.getByRole('alert').filter({ hasText: 'Please give us a bit more detail' })).toBeVisible();
});

test('a fully valid form has no validation errors', async ({ page }) => {
	await page.goto('/contact');
	await page.locator('#name').fill('Jane Smith');
	await page.locator('#email').fill('jane@example.co.uk');
	await page.locator('#message').fill('I would like to discuss AI strategy for my business.');

	// No errors should be present before submit
	await expect(page.getByRole('alert')).toHaveCount(0);
});
