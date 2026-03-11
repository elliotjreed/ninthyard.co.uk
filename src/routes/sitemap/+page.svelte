<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import { prompts } from '$lib/data/prompts';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const sections = [
		{
			heading: 'Main pages',
			links: [
				{ label: 'Home', href: '/', description: 'AI consultancy services for East Midlands SMEs' },
				{ label: 'About', href: '/about', description: 'Our story, values, and approach' },
				{ label: 'Contact', href: '/contact', description: 'Get in touch or book a free call' }
			]
		},
		{
			heading: 'Resources',
			links: [
				{
					label: 'Prompt Library',
					href: '/prompts',
					description: 'Ready-made AI prompts for common business tasks'
				},
				{
					label: 'Prompting Guide',
					href: '/prompting-guide',
					description: "A beginner's guide to writing effective AI prompts"
				}
			]
		},
		{
			heading: 'Prompts',
			links: prompts.map((p) => ({
				label: p.title,
				href: `/prompts/${p.slug}`,
				description: p.description
			}))
		}
	];
</script>

<SEO
	title="Sitemap"
	description="A full list of all pages on the Ninthyard website."
	canonical="{data.site.url}/sitemap"
	noindex={true}
/>

<section class="py-16 sm:py-20">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<h1 class="mb-10 font-display text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
			Sitemap
		</h1>

		<div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
			{#each sections as section}
				<div>
					<h2
						class="mb-4 border-b border-gray-200 pb-2 font-display text-lg font-semibold text-gray-900 dark:border-gray-800 dark:text-white"
					>
						{section.heading}
					</h2>
					<ul class="space-y-3">
						{#each section.links as link}
							<li>
								<a
									href={link.href}
									class="group block text-brand-green hover:underline dark:text-brand-green-light"
								>
									{link.label}
								</a>
								<p class="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{link.description}</p>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="mt-12 border-t border-gray-100 pt-8 dark:border-gray-800">
			<p class="text-sm text-gray-400 dark:text-gray-500">
				Looking for the XML sitemap?
				<a
					href="/sitemap.xml"
					class="ml-1 text-brand-green hover:underline dark:text-brand-green-light"
				>
					sitemap.xml
				</a>
			</p>
		</div>
	</div>
</section>
