<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import { prompts, promptCategories } from '$lib/data/prompts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedCategory = $state('');

	const filteredPrompts = $derived(
		selectedCategory ? prompts.filter((p) => p.category === selectedCategory) : prompts
	);

	const difficultyColour = {
		beginner: 'green',
		intermediate: 'warm',
		advanced: 'purple'
	} as const;

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		'@id': `${data.site.url}/prompts#page`,
		url: `${data.site.url}/prompts`,
		name: `Prompt Library | ${data.site.name}`,
		description:
			'Ready-made AI prompts for common business tasks — sales, operations, HR, customer service, and more.',
		hasPart: prompts.map((p) => ({
			'@type': 'HowTo',
			name: p.title,
			url: `${data.site.url}/prompts/${p.slug}`,
			description: p.description
		}))
	});
</script>

<SEO
	title="Prompt Library"
	description="Ready-made AI prompts for common business tasks. Sales emails, meeting summaries, job descriptions, social media posts and more — free to use and customise."
	canonical="{data.site.url}/prompts"
	{jsonLd}
/>

<!-- Header -->
<section
	class="border-b border-gray-100 bg-gradient-to-br from-brand-purple-pale via-white to-brand-green-pale py-16 sm:py-20 dark:border-gray-800 dark:from-brand-purple-dark/20 dark:via-warm-950 dark:to-brand-green-dark/20"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="max-w-2xl">
			<p
				class="mb-4 text-sm font-semibold tracking-widest text-brand-purple uppercase dark:text-brand-purple-light"
			>
				Resources
			</p>
			<h1
				class="mb-4 font-display text-4xl leading-tight font-bold text-gray-900 sm:text-5xl dark:text-white"
			>
				Prompt Library
			</h1>
			<p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
				Ready-made prompts for common business tasks. Copy, customise, and use with any AI tool.
				Each prompt includes tips on how to get the best results.
			</p>
		</div>

		<div class="mt-6">
			<a
				href="/prompting-guide"
				class="text-sm font-medium text-brand-purple hover:underline dark:text-brand-purple-light"
			>
				New to AI prompting? Read the guide →
			</a>
		</div>
	</div>
</section>

<!-- Filter + Grid -->
<section class="py-12 sm:py-16">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<!-- Category filter -->
		<div class="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
			<button
				onclick={() => (selectedCategory = '')}
				class="rounded-full px-4 py-1.5 text-sm font-medium transition-colors {selectedCategory ===
				''
					? 'bg-brand-green text-white'
					: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}"
				aria-pressed={selectedCategory === ''}
			>
				All ({prompts.length})
			</button>
			{#each promptCategories as category}
				<button
					onclick={() => (selectedCategory = category)}
					class="rounded-full px-4 py-1.5 text-sm font-medium transition-colors {selectedCategory ===
					category
						? 'bg-brand-green text-white'
						: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}"
					aria-pressed={selectedCategory === category}
				>
					{category}
				</button>
			{/each}
		</div>

		<!-- Prompt grid -->
		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each filteredPrompts as prompt (prompt.slug)}
				<Card href="/prompts/{prompt.slug}">
					<div class="mb-3 flex items-start justify-between gap-2">
						<Badge variant="gray" size="sm">{prompt.category}</Badge>
						<Badge variant={difficultyColour[prompt.difficulty]} size="sm">
							{prompt.difficulty}
						</Badge>
					</div>
					<h2 class="mb-2 font-display text-lg font-semibold text-gray-900 dark:text-white">
						{prompt.title}
					</h2>
					<p class="mb-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
						{prompt.description}
					</p>
					<div class="flex flex-wrap gap-1.5">
						{#each prompt.tags.slice(0, 3) as tag}
							<span
								class="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400"
							>
								#{tag}
							</span>
						{/each}
					</div>
				</Card>
			{/each}
		</div>

		{#if filteredPrompts.length === 0}
			<p class="py-12 text-center text-gray-400 dark:text-gray-500">
				No prompts found in this category.
			</p>
		{/if}
	</div>
</section>
