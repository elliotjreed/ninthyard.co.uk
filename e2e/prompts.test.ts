import { expect, test } from '@playwright/test';

test('prompt library page loads with prompt cards', async ({ page }) => {
	await page.goto('/prompts');
	await expect(page.locator('h1')).toContainText('Prompt Library');
	await expect(page.getByRole('link', { name: /Cold Email Outreach/i })).toBeVisible();
});

test('category filter button marks itself as active', async ({ page }) => {
	await page.goto('/prompts');

	const filterButton = page.getByRole('button', { name: /Sales & Marketing/i });
	await expect(filterButton).toHaveAttribute('aria-pressed', 'false');

	await filterButton.click();
	await expect(filterButton).toHaveAttribute('aria-pressed', 'true');
});

test('clicking "All" resets the category filter', async ({ page }) => {
	await page.goto('/prompts');

	await page.getByRole('button', { name: /Sales & Marketing/i }).click();
	await page.getByRole('button', { name: /^All/i }).click();
	await expect(page.getByRole('button', { name: /^All/i })).toHaveAttribute('aria-pressed', 'true');
});

test('prompt detail page renders title and copy button', async ({ page }) => {
	await page.goto('/prompts/cold-email-outreach');
	await expect(page.locator('h1')).toContainText('Cold Email Outreach');
	await expect(page.getByRole('button', { name: 'Copy prompt to clipboard' })).toBeVisible();
});

test('breadcrumb on detail page links back to library', async ({ page }) => {
	await page.goto('/prompts/cold-email-outreach');
	await page.getByRole('navigation', { name: 'Breadcrumb' }).getByRole('link', { name: 'Prompt Library' }).click();
	await expect(page).toHaveURL('/prompts');
});

test('unknown prompt slug returns 404', async ({ page }) => {
	const response = await page.goto('/prompts/this-slug-does-not-exist');
	expect(response?.status()).toBe(404);
});
