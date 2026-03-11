import type { RequestHandler } from './$types';
import { prompts } from '$lib/data/prompts';

const siteUrl = 'https://ninthyard.co.uk';

interface SitemapEntry {
	url: string;
	lastmod?: string;
	changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority: number;
}

function buildSitemap(entries: SitemapEntry[]): string {
	const urls = entries
		.map(
			({ url, lastmod, changefreq, priority }) =>
				`  <url>
    <loc>${url}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`
		)
		.join('\n');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const GET: RequestHandler = () => {
	const today = new Date().toISOString().split('T')[0];

	const entries: SitemapEntry[] = [
		{ url: siteUrl, lastmod: today, changefreq: 'weekly', priority: 1.0 },
		{ url: `${siteUrl}/about`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
		{ url: `${siteUrl}/contact`, lastmod: today, changefreq: 'monthly', priority: 0.9 },
		{ url: `${siteUrl}/prompts`, lastmod: today, changefreq: 'weekly', priority: 0.9 },
		{ url: `${siteUrl}/prompting-guide`, lastmod: today, changefreq: 'monthly', priority: 0.8 },
		...prompts.map((p) => ({
			url: `${siteUrl}/prompts/${p.slug}`,
			lastmod: today,
			changefreq: 'monthly' as const,
			priority: 0.7
		}))
	];

	return new Response(buildSitemap(entries), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
