import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';
import { vi } from 'vitest';

vi.mock('$app/state', () => ({
	page: { url: { pathname: '/' } }
}));

vi.mock('$app/navigation', () => ({
	onNavigate: vi.fn()
}));

vi.mock('$lib/stores/theme.svelte', () => ({
	theme: { dark: false, toggle: vi.fn(), init: vi.fn() }
}));

vi.mock('$lib/assets/favicon.svg', () => ({ default: '/favicon.svg' }));

import Page from './+page.svelte';

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

describe('/+page.svelte (Home)', () => {
	it('renders the hero h1 heading', async () => {
		render(Page, { props: { data: mockData } });
		const heading = page.getByRole('heading', { level: 1 });
		await expect.element(heading).toBeInTheDocument();
	});

	it('renders a link to the contact page', async () => {
		render(Page, { props: { data: mockData } });
		const contactLink = page.getByRole('link', { name: /start the conversation/i });
		await expect.element(contactLink).toBeInTheDocument();
	});
});
