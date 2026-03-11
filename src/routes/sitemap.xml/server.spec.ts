import { describe, it, expect } from 'vitest';
import { GET } from './+server';
import { prompts } from '$lib/data/prompts';

describe('GET /sitemap.xml', () => {
	it('returns a 200 response', async () => {
		const response = await GET({} as Parameters<typeof GET>[0]);
		expect(response.status).toBe(200);
	});

	it('sets the correct content-type header', async () => {
		const response = await GET({} as Parameters<typeof GET>[0]);
		expect(response.headers.get('Content-Type')).toContain('application/xml');
	});

	it('returns valid XML with urlset root element', async () => {
		const response = await GET({} as Parameters<typeof GET>[0]);
		const text = await response.text();
		expect(text).toContain('<?xml version="1.0"');
		expect(text).toContain('<urlset');
		expect(text).toContain('</urlset>');
	});

	it('includes all core pages', async () => {
		const response = await GET({} as Parameters<typeof GET>[0]);
		const text = await response.text();
		expect(text).toContain('<loc>https://ninthyard.co.uk</loc>');
		expect(text).toContain('<loc>https://ninthyard.co.uk/about</loc>');
		expect(text).toContain('<loc>https://ninthyard.co.uk/contact</loc>');
		expect(text).toContain('<loc>https://ninthyard.co.uk/prompts</loc>');
		expect(text).toContain('<loc>https://ninthyard.co.uk/prompting-guide</loc>');
	});

	it('includes a URL entry for every prompt', async () => {
		const response = await GET({} as Parameters<typeof GET>[0]);
		const text = await response.text();
		for (const prompt of prompts) {
			expect(text).toContain(`<loc>https://ninthyard.co.uk/prompts/${prompt.slug}</loc>`);
		}
	});

	it('includes priority and changefreq for each entry', async () => {
		const response = await GET({} as Parameters<typeof GET>[0]);
		const text = await response.text();
		expect(text).toContain('<priority>');
		expect(text).toContain('<changefreq>');
	});
});
