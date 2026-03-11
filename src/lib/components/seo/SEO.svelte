<script lang="ts">
	import type { SEOProps } from '$lib/types';

	let {
		title,
		description,
		canonical,
		ogImage = 'https://ninthyard.co.uk/og-image.png',
		ogType = 'website',
		jsonLd,
		noindex = false
	}: SEOProps = $props();

	const siteName = 'Ninthyard';
	const fullTitle = $derived(title === siteName ? title : `${title} | ${siteName}`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}
	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}

	<!-- Open Graph -->
	<meta property="og:site_name" content={siteName} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={ogType} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:locale" content="en_GB" />
	{#if canonical}
		<meta property="og:url" content={canonical} />
	{/if}

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	<!-- JSON-LD -->
	{#if jsonLd}
		{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
	{/if}
</svelte:head>
