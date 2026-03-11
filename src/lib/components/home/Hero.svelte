<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
</script>

<section
	class="relative overflow-hidden bg-gradient-to-br from-brand-green-pale via-white to-brand-purple-pale py-20 sm:py-28 dark:from-brand-green-dark/20 dark:via-warm-950 dark:to-brand-purple-dark/20"
	aria-label="Hero"
>
	<!-- Decorative orbs -->
	<div
		class="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl dark:bg-brand-green/5"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-brand-purple/10 blur-3xl dark:bg-brand-purple/5"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto max-w-6xl px-4 sm:px-6">
		<div class="mx-auto max-w-3xl text-center">
			<!-- Eyebrow -->
			<p
				class="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green-pale px-4 py-1.5 text-sm font-medium text-brand-green dark:border-brand-green-light/20 dark:bg-brand-green-dark/30 dark:text-brand-green-light"
			>
				<span
					class="h-1.5 w-1.5 rounded-full bg-brand-green dark:bg-brand-green-light"
					aria-hidden="true"
				></span>
				Nottingham-based AI consultancy
			</p>

			<!-- Heading -->
			<h1
				class="mb-6 font-display text-4xl leading-tight font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white"
			>
				AI that works for
				<span class="relative whitespace-nowrap text-brand-green dark:text-brand-green-light">
					your business
				</span>
			</h1>

			<!-- Subheading -->
			<p class="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
				We help East Midlands SMEs cut through the AI hype and implement tools and strategies that
				actually make a difference — in plain English, without the jargon.
			</p>

			<!-- CTAs -->
			<div class="flex flex-col items-center justify-center gap-3 sm:flex-row">
				<Button href="/contact" size="lg">
					Start the conversation
					<svg class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
							clip-rule="evenodd"
						/>
					</svg>
				</Button>
				<Button href="#services" variant="secondary" size="lg">What we do</Button>
			</div>
		</div>

		<!-- Trust indicators -->
		<div
			class="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-500 dark:text-gray-400"
		>
			{#each ['Local to Nottingham', 'SME specialists', 'Plain-English guidance', 'No lock-in contracts'] as point}
				<span class="flex items-center gap-1.5">
					<svg
						class="h-4 w-4 shrink-0 text-brand-green dark:text-brand-green-light"
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
					{point}
				</span>
			{/each}
		</div>
	</div>
</section>
