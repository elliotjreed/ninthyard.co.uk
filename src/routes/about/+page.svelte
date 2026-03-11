<script lang="ts">
	import SEO from '$lib/components/seo/SEO.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const values = [
		{
			title: 'Honesty over hype',
			description:
				"AI is genuinely transformative — but it's not a silver bullet. We'll always tell you what's realistic for your business, even if that's not what you want to hear."
		},
		{
			title: 'Practical before theoretical',
			description:
				"We focus on implementations that deliver measurable results, not frameworks that look good in presentations. If it doesn't work in practice, it doesn't belong in the plan."
		},
		{
			title: 'Build capability, not dependency',
			description:
				'Our goal is to leave you better equipped to continue without us. Every engagement includes training and knowledge transfer as a core deliverable.'
		},
		{
			title: 'Right-sized for SMEs',
			description:
				'Enterprise AI solutions rarely make sense for businesses with fewer than 250 employees. Everything we recommend is scaled to match your team, budget, and pace.'
		}
	];

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'AboutPage',
		'@id': `${data.site.url}/about#page`,
		url: `${data.site.url}/about`,
		name: `About | ${data.site.name}`,
		description:
			'Learn about Ninthyard — a Nottingham-based AI and digital consultancy for East Midlands SMEs.',
		mainEntity: {
			'@type': 'Organization',
			name: data.site.name,
			url: data.site.url,
			email: data.site.email,
			description: data.site.description,
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Nottingham',
				addressRegion: 'Nottinghamshire',
				addressCountry: 'GB'
			}
		}
	});
</script>

<SEO
	title="About"
	description="Ninthyard is a Nottingham-based AI and digital consultancy helping East Midlands SMEs implement AI with confidence. Learn about our approach and values."
	canonical="{data.site.url}/about"
	{jsonLd}
/>

<!-- Hero -->
<section class="border-b border-gray-100 py-16 sm:py-24 dark:border-gray-800">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="max-w-3xl">
			<p
				class="mb-4 text-sm font-semibold tracking-widest text-brand-green uppercase dark:text-brand-green-light"
			>
				About us
			</p>
			<h1
				class="mb-6 font-display text-4xl leading-tight font-bold text-gray-900 sm:text-5xl dark:text-white"
			>
				AI consultancy with its feet on the ground
			</h1>
			<p class="mb-5 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
				Ninthyard was founded with a simple belief: that small and medium-sized businesses deserve
				the same quality of AI guidance as large enterprises — just without the enterprise price
				tag, the jargon, or the one-size-fits-all approach.
			</p>
			<p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
				We're based in Nottingham and work primarily with businesses across the East Midlands. We
				think being local matters — it means we understand the business landscape you operate in,
				and we can meet face-to-face when that makes a difference.
			</p>
		</div>
	</div>
</section>

<!-- Story -->
<section class="py-16 sm:py-24">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="grid items-center gap-12 lg:grid-cols-2">
			<div>
				<h2 class="mb-5 font-display text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
					Why we started
				</h2>
				<div class="space-y-4 text-gray-600 dark:text-gray-300">
					<p>
						We'd watched too many SME owners come away from AI consultancy engagements with glossy
						strategy decks and no idea how to act on them. Or worse, they'd invested in tools that
						their teams couldn't use effectively because nobody had thought about the people side of
						change.
					</p>
					<p>
						The AI space moves fast, and the gap between what's possible and what's practical for a
						50-person business in Nottingham can feel enormous. We started Ninthyard to bridge that
						gap.
					</p>
					<p>
						Our approach combines technical knowledge with genuine business pragmatism. We ask "what
						does success look like for you?" before we recommend anything — and we measure
						everything against that answer.
					</p>
				</div>
			</div>

			<!-- Stats block -->
			<div class="grid grid-cols-2 gap-5">
				{#each [{ number: '100%', label: 'SME focus' }, { number: 'EM', label: 'East Midlands based' }, { number: '0', label: 'Lock-in contracts' }, { number: '1st', label: 'Call always free' }] as stat}
					<div
						class="rounded-2xl border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-900"
					>
						<div
							class="mb-1 font-display text-4xl font-bold text-brand-green dark:text-brand-green-light"
						>
							{stat.number}
						</div>
						<div class="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Values -->
<section class="bg-gray-50 py-16 sm:py-24 dark:bg-gray-900/50">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="mb-12">
			<p
				class="mb-3 text-sm font-semibold tracking-widest text-brand-green uppercase dark:text-brand-green-light"
			>
				What we stand for
			</p>
			<h2 class="font-display text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
				Our values
			</h2>
		</div>

		<div class="grid gap-6 sm:grid-cols-2">
			{#each values as value}
				<div class="rounded-2xl bg-white p-7 dark:bg-gray-900">
					<h3 class="mb-3 font-display text-xl font-semibold text-gray-900 dark:text-white">
						{value.title}
					</h3>
					<p class="leading-relaxed text-gray-500 dark:text-gray-400">{value.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Location -->
<section class="py-16 sm:py-24">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="mx-auto max-w-3xl text-center">
			<div class="mb-5 text-5xl" aria-hidden="true">📍</div>
			<h2 class="mb-4 font-display text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
				Proud to be Nottingham-based
			</h2>
			<p class="mb-5 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
				We work with businesses across Nottingham, Derby, Leicester, Lincoln, and the wider East
				Midlands region. Remote engagements are available too, but we'll always prioritise a
				conversation in person when it makes sense.
			</p>
			<p class="mb-8 text-gray-500 dark:text-gray-400">
				The East Midlands is home to a thriving community of ambitious SMEs. We're committed to
				helping those businesses lead, rather than follow, on AI adoption.
			</p>
			<Button href="/contact" size="lg">Talk to us</Button>
		</div>
	</div>
</section>
