import { expect, test } from '@playwright/test';

const routes = ['/', '/about', '/prompts', '/prompting-guide', '/contact'];

for (const route of routes) {
	test(`header renders on ${route}`, async ({ page }) => {
		await page.goto(route);
		await expect(page.locator('header')).toBeVisible();
		await expect(page.getByRole('link', { name: 'Ninthyard — home' })).toBeVisible();
	});
}

test('desktop nav links navigate to their respective pages', async ({ page }) => {
	const nav = page.getByRole('navigation', { name: 'Main navigation' });

	await page.goto('/');
	await nav.getByRole('link', { name: 'About' }).click();
	await expect(page).toHaveURL('/about');

	await nav.getByRole('link', { name: 'Prompt Library' }).click();
	await expect(page).toHaveURL('/prompts');

	await nav.getByRole('link', { name: 'Prompting Guide' }).click();
	await expect(page).toHaveURL('/prompting-guide');
});

test('dark mode toggle adds and removes the dark class on <html>', async ({ page }) => {
	await page.goto('/');
	const html = page.locator('html');

	await expect(html).not.toHaveClass(/\bdark\b/);

	await page.getByRole('button', { name: 'Switch to dark mode' }).click();
	await expect(html).toHaveClass(/\bdark\b/);

	await page.getByRole('button', { name: 'Switch to light mode' }).click();
	await expect(html).not.toHaveClass(/\bdark\b/);
});
