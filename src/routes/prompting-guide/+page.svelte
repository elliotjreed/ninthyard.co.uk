<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import Guide from '$lib/content/prompting-guide.svx';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Article',
		'@id': `${data.site.url}/prompting-guide#article`,
		url: `${data.site.url}/prompting-guide`,
		headline: "The Beginner's Guide to AI Prompting",
		description:
			'Learn how to write prompts that get consistently great results from AI tools like ChatGPT, Claude, and Copilot.',
		author: {
			'@type': 'Organization',
			name: data.site.name,
			url: data.site.url
		},
		publisher: {
			'@type': 'Organization',
			name: data.site.name,
			url: data.site.url
		},
		inLanguage: 'en-GB',
		about: {
			'@type': 'Thing',
			name: 'AI Prompting',
			description: 'The practice of writing effective instructions for AI language models'
		}
	});
</script>

<SEO
	title="AI Prompting Guide"
	description="Learn how to write prompts that get consistently great results from AI tools like ChatGPT, Claude, and Copilot. A practical guide for business owners and teams."
	canonical="{data.site.url}/prompting-guide"
	ogType="article"
	{jsonLd}
/>

<!-- Header -->
<section class="border-b border-gray-100 py-12 sm:py-16 dark:border-gray-800">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<nav class="flex items-center gap-2 text-sm font-medium" aria-label="Breadcrumb">
			<a
				href="/"
				class="text-gray-500 hover:text-brand-green dark:text-gray-400 dark:hover:text-brand-green-light"
				>Home</a
			>
			<span class="text-gray-300 dark:text-gray-600" aria-hidden="true">/</span>
			<span class="text-gray-900 dark:text-white">Prompting Guide</span>
		</nav>
	</div>
</section>

<!-- Content -->
<section class="py-12 sm:py-16">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="lg:grid lg:grid-cols-4 lg:gap-12">
			<!-- Sidebar CTA -->
			<aside class="mb-10 lg:order-last lg:mb-0">
				<div class="sticky top-24 space-y-5">
					<div
						class="rounded-2xl border border-brand-green/20 bg-brand-green-pale p-5 dark:border-brand-green-light/20 dark:bg-brand-green-dark/20"
					>
						<h2 class="mb-2 font-display text-base font-semibold text-gray-900 dark:text-white">
							Put it into practice
						</h2>
						<p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
							Browse our library of ready-made prompts for common business tasks.
						</p>
						<Button href="/prompts" size="sm">Browse prompts</Button>
					</div>

					<div
						class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
					>
						<h2 class="mb-2 font-display text-base font-semibold text-gray-900 dark:text-white">
							Need training?
						</h2>
						<p class="mb-4 text-sm text-gray-600 dark:text-gray-300">
							We run practical AI prompting workshops for SME teams across the East Midlands.
						</p>
						<Button href="/contact" variant="secondary" size="sm">Get in touch</Button>
					</div>
				</div>
			</aside>

			<!-- Article -->
			<article class="lg:col-span-3">
				<div class="prose max-w-none prose-gray dark:prose-invert">
					<Guide />
				</div>
			</article>
		</div>
	</div>
</section>
