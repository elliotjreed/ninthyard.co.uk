<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';

	const services = [
		{
			icon: '🗺️',
			title: 'AI Strategy & Roadmapping',
			description:
				'We assess where your business is today and map out a practical, prioritised path to AI adoption — so you invest in the right things, in the right order.',
			points: ['AI readiness assessment', 'Opportunity mapping', 'ROI-focused roadmap']
		},
		{
			icon: '⚙️',
			title: 'AI Implementation',
			description:
				'From choosing the right tools to integrating them into your workflows, we handle the technical side so your team can focus on results.',
			points: ['Tool selection & setup', 'Workflow integration', 'Ongoing optimisation']
		},
		{
			icon: '🎓',
			title: 'Prompting & Training',
			description:
				'Your team is your biggest asset. We run practical workshops that teach staff how to use AI tools effectively — including writing prompts that actually work.',
			points: ['Team workshops', 'Prompt writing skills', 'Hands-on practice']
		},
		{
			icon: '🚀',
			title: 'Digital Transformation',
			description:
				'Sometimes AI is one piece of a bigger puzzle. We look at your whole digital landscape and help you modernise the processes that will have the biggest impact.',
			points: ['Process review & redesign', 'System integration', 'Change management support']
		}
	];
</script>

<section id="services" class="py-20 sm:py-28">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<!-- Section header -->
		<div class="mx-auto mb-14 max-w-2xl text-center">
			<p
				class="mb-3 text-sm font-semibold tracking-widest text-brand-green uppercase dark:text-brand-green-light"
			>
				What we do
			</p>
			<h2 class="mb-4 font-display text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
				Services built for SMEs
			</h2>
			<p class="text-lg text-gray-500 dark:text-gray-400">
				No bloated enterprise packages. Just the support your business actually needs.
			</p>
		</div>

		<!-- Service cards -->
		<div class="grid gap-6 sm:grid-cols-2">
			{#each services as service}
				<Card>
					<div class="mb-4 text-3xl" aria-hidden="true">{service.icon}</div>
					<h3 class="mb-2 font-display text-xl font-semibold text-gray-900 dark:text-white">
						{service.title}
					</h3>
					<p class="mb-5 text-gray-500 dark:text-gray-400">{service.description}</p>
					<ul class="space-y-1.5">
						{#each service.points as point}
							<li class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
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
							</li>
						{/each}
					</ul>
				</Card>
			{/each}
		</div>
	</div>
</section>
