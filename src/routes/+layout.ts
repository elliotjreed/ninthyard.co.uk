import type { LayoutLoad } from './$types';
import type { SiteConfig } from '$lib/types';

export const load: LayoutLoad = () => {
	const site: SiteConfig = {
		name: 'Ninthyard',
		tagline: 'AI & Digital Consultancy for Nottingham SMEs',
		url: 'https://ninthyard.co.uk',
		description:
			'Ninthyard helps Nottingham and East Midlands businesses implement AI and digital strategies that actually work — in plain English, without the jargon.',
		email: 'hello@ninthyard.co.uk',
		location: 'Nottingham, UK'
	};

	return { site };
};
