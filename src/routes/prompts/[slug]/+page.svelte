<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const prompt = $derived(data.prompt);

	let copied = $state(false);

	async function copyPrompt() {
		try {
			await navigator.clipboard.writeText(prompt.prompt);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			// Clipboard unavailable
		}
	}

	const difficultyColour = {
		beginner: 'green',
		intermediate: 'warm',
		advanced: 'purple'
	} as const;

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: prompt.title,
		description: prompt.description,
		url: `${data.site.url}/prompts/${prompt.slug}`,
		author: {
			'@type': 'Organization',
			name: data.site.name,
			url: data.site.url
		},
		inLanguage: 'en-GB'
	});
</script>

<SEO
	title={prompt.title}
	description={prompt.description}
	canonical="{data.site.url}/prompts/{prompt.slug}"
	ogType="article"
	{jsonLd}
/>

<!-- Breadcrumb + header -->
<section class="border-b border-gray-100 py-12 sm:py-16 dark:border-gray-800">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<nav class="mb-6 flex items-center gap-2 text-sm font-medium" aria-label="Breadcrumb">
			<a
				href="/"
				class="text-gray-500 hover:text-brand-green dark:text-gray-400 dark:hover:text-brand-green-light"
				>Home</a
			>
			<span class="text-gray-300 dark:text-gray-600" aria-hidden="true">/</span>
			<a
				href="/prompts"
				class="text-gray-500 hover:text-brand-green dark:text-gray-400 dark:hover:text-brand-green-light"
				>Prompt Library</a
			>
			<span class="text-gray-300 dark:text-gray-600" aria-hidden="true">/</span>
			<span class="text-gray-900 dark:text-white">{prompt.title}</span>
		</nav>

		<div class="mb-4 flex flex-wrap gap-2">
			<Badge variant="gray">{prompt.category}</Badge>
			<Badge variant={difficultyColour[prompt.difficulty]}>{prompt.difficulty}</Badge>
		</div>

		<h1 class="mb-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
			{prompt.title}
		</h1>
		<p class="max-w-2xl text-lg text-gray-600 dark:text-gray-300">{prompt.description}</p>
	</div>
</section>

<!-- Content -->
<section class="py-12 sm:py-16">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="grid gap-10 lg:grid-cols-3">
			<!-- Main: prompt -->
			<div class="lg:col-span-2">
				<div class="mb-3 flex items-center justify-between">
					<h2 class="font-display text-lg font-semibold text-gray-900 dark:text-white">
						The prompt
					</h2>
					<button
						onclick={copyPrompt}
						class="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-brand-green hover:text-brand-green dark:border-gray-700 dark:text-gray-400 dark:hover:border-brand-green-light dark:hover:text-brand-green-light"
						aria-label={copied ? 'Copied!' : 'Copy prompt to clipboard'}
					>
						{#if copied}
							<svg
								class="h-3.5 w-3.5 text-brand-green"
								viewBox="0 0 16 16"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.455-6.683a.75.75 0 011.078-.264z"
									clip-rule="evenodd"
								/>
							</svg>
							Copied!
						{:else}
							<svg class="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
								<path
									d="M10.5 3a.75.75 0 01.75.75v1h.25A2.75 2.75 0 0114.25 7.5v5.75A2.75 2.75 0 0111.5 16h-7A2.75 2.75 0 011.75 13.25V7.5A2.75 2.75 0 014.5 4.75h.25v-1A.75.75 0 015.5 3h5z"
								/>
							</svg>
							Copy
						{/if}
					</button>
				</div>

				<pre
					class="overflow-x-auto rounded-2xl border border-gray-200 bg-gray-50 p-5 font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">{prompt.prompt}</pre>

				<p class="mt-3 text-xs text-gray-400 dark:text-gray-500">
					Replace all text in [SQUARE BRACKETS] with your own details before using.
				</p>

				<!-- Use cases -->
				<div class="mt-8">
					<h2 class="mb-4 font-display text-lg font-semibold text-gray-900 dark:text-white">
						When to use this prompt
					</h2>
					<ul class="space-y-2">
						{#each prompt.useCases as useCase}
							<li class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
								<svg
									class="mt-0.5 h-4 w-4 shrink-0 text-brand-green dark:text-brand-green-light"
									viewBox="0 0 16 16"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M12.416 3.376a.75.75 0 01.208 1.04l-5 7.5a.75.75 0 01-1.154.114l-3-3a.75.75 0 011.06-1.06l2.353 2.353 4.455-6.683a.75.75 0 011.078-.264z"
										clip-rule="evenodd"
									/>
								</svg>
								{useCase}
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<!-- Sidebar: tips + navigation -->
			<aside class="space-y-6">
				<!-- Tips -->
				<div
					class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
				>
					<h2 class="mb-4 font-display text-base font-semibold text-gray-900 dark:text-white">
						Tips for best results
					</h2>
					<ul class="space-y-3">
						{#each prompt.tips as tip}
							<li class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
								<span
									class="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple dark:bg-brand-purple-light"
									aria-hidden="true"
								></span>
								{tip}
							</li>
						{/each}
					</ul>
				</div>

				<!-- Tags -->
				<div>
					<p
						class="mb-2 text-xs font-medium tracking-wider text-gray-400 uppercase dark:text-gray-500"
					>
						Tags
					</p>
					<div class="flex flex-wrap gap-1.5">
						{#each prompt.tags as tag}
							<span
								class="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400"
							>
								#{tag}
							</span>
						{/each}
					</div>
				</div>

				<!-- Back to library -->
				<Button href="/prompts" variant="ghost">← Back to library</Button>

				<!-- CTA -->
				<div
					class="rounded-2xl border border-brand-green/20 bg-brand-green-pale p-5 dark:border-brand-green-light/20 dark:bg-brand-green-dark/20"
				>
					<p class="mb-3 text-sm text-gray-600 dark:text-gray-300">
						Want hands-on training in AI prompting for your team?
					</p>
					<Button href="/contact" size="sm">Talk to us</Button>
				</div>
			</aside>
		</div>
	</div>
</section>
