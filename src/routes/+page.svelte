<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import Services from '$lib/components/home/Services.svelte';
	import WhyUs from '$lib/components/home/WhyUs.svelte';
	import CallToAction from '$lib/components/home/CallToAction.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${data.site.url}/#website`,
				url: data.site.url,
				name: data.site.name,
				description: data.site.description,
				inLanguage: 'en-GB'
			},
			{
				'@type': ['LocalBusiness', 'ProfessionalService'],
				'@id': `${data.site.url}/#business`,
				name: data.site.name,
				description: data.site.description,
				url: data.site.url,
				email: data.site.email,
				address: {
					'@type': 'PostalAddress',
					addressLocality: 'Nottingham',
					addressRegion: 'Nottinghamshire',
					addressCountry: 'GB'
				},
				areaServed: [
					{ '@type': 'City', name: 'Nottingham' },
					{ '@type': 'AdministrativeArea', name: 'East Midlands' }
				],
				knowsAbout: [
					'Artificial Intelligence',
					'Digital Transformation',
					'AI Strategy',
					'SME Consulting'
				],
				priceRange: '££'
			}
		]
	});
</script>

<SEO
	title={data.site.name}
	description={data.site.description}
	canonical={data.site.url}
	{jsonLd}
/>

<Hero />
<Services />
<WhyUs />
<CallToAction />
