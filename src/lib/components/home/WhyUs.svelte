<script lang="ts">
	const reasons = [
		{
			icon: '📍',
			title: 'Local to Nottingham',
			description:
				"We're based in Nottingham and serve businesses across the East Midlands. Face-to-face when it matters, remote when it's more practical."
		},
		{
			icon: '🤝',
			title: 'SME specialists',
			description:
				'We work exclusively with small and medium-sized businesses. No generic advice copied from enterprise playbooks — everything is sized for you.'
		},
		{
			icon: '💬',
			title: 'Plain-English guidance',
			description:
				'AI can feel overwhelming. We translate the technical into the practical, so your team understands not just what to do, but why.'
		},
		{
			icon: '🎯',
			title: 'Outcomes first',
			description:
				'We measure success by the results you see — time saved, revenue gained, costs reduced. Slides and strategy documents are a means to an end, not the end itself.'
		},
		{
			icon: '🔓',
			title: 'No lock-in',
			description:
				"We believe in building your capability, not your dependency on us. You'll leave every engagement better equipped to continue without us."
		},
		{
			icon: '📊',
			title: 'Honest about limitations',
			description:
				"AI isn't magic. We'll tell you clearly what it can and cannot do for your business, so you make decisions based on reality, not hype."
		}
	];

	const steps = [
		{
			number: '01',
			title: 'Discovery call',
			description:
				"A free 30-minute conversation to understand your business, your challenges, and whether we're a good fit."
		},
		{
			number: '02',
			title: 'Strategy & plan',
			description:
				'We produce a clear, prioritised plan with costs and expected outcomes — no jargon, no commitment required.'
		},
		{
			number: '03',
			title: 'Implement & support',
			description:
				'We implement the agreed work alongside your team, with training and handover built in from day one.'
		}
	];
</script>

<!-- Why us -->
<section class="bg-gray-50 py-20 sm:py-28 dark:bg-gray-900/50">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="mx-auto mb-14 max-w-2xl text-center">
			<p
				class="mb-3 text-sm font-semibold tracking-widest text-brand-green uppercase dark:text-brand-green-light"
			>
				Why Ninthyard
			</p>
			<h2 class="mb-4 font-display text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
				A different kind of consultancy
			</h2>
			<p class="text-lg text-gray-500 dark:text-gray-400">
				We started Ninthyard because too many SMEs were getting burnt by generic advice that didn't
				fit their size, budget, or goals.
			</p>
		</div>

		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each reasons as reason}
				<div class="rounded-2xl bg-white p-6 dark:bg-gray-900">
					<div class="mb-3 text-2xl" aria-hidden="true">{reason.icon}</div>
					<h3 class="mb-2 font-display text-lg font-semibold text-gray-900 dark:text-white">
						{reason.title}
					</h3>
					<p class="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
						{reason.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Process -->
<section class="py-20 sm:py-28">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="mx-auto mb-14 max-w-2xl text-center">
			<p
				class="mb-3 text-sm font-semibold tracking-widest text-brand-green uppercase dark:text-brand-green-light"
			>
				How it works
			</p>
			<h2 class="mb-4 font-display text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
				Getting started is simple
			</h2>
		</div>

		<div class="relative mx-auto max-w-3xl">
			<!-- Connector line (desktop) -->
			<div
				class="absolute top-8 left-0 hidden h-0.5 w-full bg-gradient-to-r from-brand-green/30 via-brand-purple/30 to-brand-green/10 sm:block"
				aria-hidden="true"
			></div>

			<div class="relative grid gap-8 sm:grid-cols-3">
				{#each steps as step}
					<div class="flex flex-col items-center text-center sm:items-start sm:text-left">
						<div
							class="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green text-xl font-bold text-white shadow-md"
						>
							{step.number}
						</div>
						<h3 class="mb-2 font-display text-lg font-semibold text-gray-900 dark:text-white">
							{step.title}
						</h3>
						<p class="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
							{step.description}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
