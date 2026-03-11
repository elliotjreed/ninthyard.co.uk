import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { vi } from 'vitest';

vi.mock('@emailjs/browser', () => ({
	default: { send: vi.fn().mockResolvedValue({ status: 200 }) }
}));

vi.mock('$env/dynamic/public', () => ({
	env: {
		PUBLIC_EMAILJS_PUBLIC_KEY: 'test-key',
		PUBLIC_EMAILJS_SERVICE_ID: 'test-service',
		PUBLIC_EMAILJS_TEMPLATE_ID: 'test-template'
	}
}));

vi.mock('$app/state', () => ({
	page: { url: { pathname: '/contact' } }
}));

vi.mock('$app/navigation', () => ({
	onNavigate: vi.fn()
}));

vi.mock('$lib/stores/theme.svelte', () => ({
	theme: { dark: false, toggle: vi.fn(), init: vi.fn() }
}));

vi.mock('$lib/assets/favicon.svg', () => ({ default: '/favicon.svg' }));

import ContactPage from './+page.svelte';

const mockData = {
	site: {
		name: 'Ninthyard',
		tagline: 'AI & Digital Consultancy for Nottingham SMEs',
		url: 'https://ninthyard.co.uk',
		description: 'Test description',
		email: 'hello@ninthyard.co.uk',
		location: 'Nottingham, UK'
	}
};

describe('/contact/+page.svelte', () => {
	it('renders the page heading', async () => {
		render(ContactPage, { props: { data: mockData } });
		const heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toBeInTheDocument();
	});

	it('renders the contact form', async () => {
		render(ContactPage, { props: { data: mockData } });
		const form = page.getByRole('form', { name: /contact form/i });
		await expect.element(form).toBeInTheDocument();
	});

	it('shows a validation error when submitting an empty name', async () => {
		render(ContactPage, { props: { data: mockData } });

		const emailInput = page.getByRole('textbox', { name: /email/i });
		const messageInput = page.getByRole('textbox', { name: /message/i });
		const submitButton = page.getByRole('button', { name: /send message/i });

		await emailInput.fill('test@example.com');
		await messageInput.fill('This is a test message that is long enough.');
		await submitButton.click();

		const nameError = page.getByRole('alert');
		await expect.element(nameError).toBeInTheDocument();
	});

	it('shows an email validation error for an invalid email', async () => {
		render(ContactPage, { props: { data: mockData } });

		const nameInput = page.getByRole('textbox', { name: /your name/i });
		const emailInput = page.getByRole('textbox', { name: /email/i });
		const messageInput = page.getByRole('textbox', { name: /message/i });
		const submitButton = page.getByRole('button', { name: /send message/i });

		await nameInput.fill('Jane Smith');
		await emailInput.fill('not-an-email');
		await messageInput.fill('This is a test message that is long enough.');
		await submitButton.click();

		const emailError = page.getByText(/valid email/i);
		await expect.element(emailError).toBeInTheDocument();
	});
});
