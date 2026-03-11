<script lang="ts">
	const currentYear = new Date().getFullYear();

	const sections = [
		{
			heading: 'Services',
			links: [
				{ label: 'AI Strategy', href: '/#services' },
				{ label: 'AI Implementation', href: '/#services' },
				{ label: 'Prompting & Training', href: '/#services' },
				{ label: 'Digital Transformation', href: '/#services' }
			]
		},
		{
			heading: 'Resources',
			links: [
				{ label: 'Prompt Library', href: '/prompts' },
				{ label: 'Prompting Guide', href: '/prompting-guide' },
				{ label: 'Sitemap', href: '/sitemap' }
			]
		},
		{
			heading: 'Company',
			links: [
				{ label: 'About', href: '/about' },
				{ label: 'Contact', href: '/contact' }
			]
		}
	];
</script>

<footer class="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
	<div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
		<!-- Top: brand + nav columns -->
		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Brand -->
			<div class="sm:col-span-2 lg:col-span-1">
				<a
					href="/"
					class="flex items-center gap-2.5 text-gray-900 transition-opacity hover:opacity-80 dark:text-white"
					aria-label="Ninthyard — home"
				>
					<span
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green text-sm font-bold text-white"
						aria-hidden="true"
					>
						N
					</span>
					<span class="font-display text-xl font-semibold">Ninthyard</span>
				</a>
				<p class="mt-3 max-w-xs text-sm leading-relaxed text-gray-500 dark:text-gray-400">
					AI & digital consultancy for Nottingham and East Midlands SMEs. Plain English, real
					results.
				</p>
				<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
					<svg
						class="mr-1 inline h-3.5 w-3.5"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
							clip-rule="evenodd"
						/>
					</svg>
					Nottingham, UK
				</p>
			</div>

			<!-- Nav columns -->
			{#each sections as section}
				<div>
					<h3 class="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
						{section.heading}
					</h3>
					<ul class="space-y-2.5">
						{#each section.links as link}
							<li>
								<a
									href={link.href}
									class="text-sm text-gray-500 transition-colors hover:text-brand-green dark:text-gray-400 dark:hover:text-brand-green-light"
								>
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<!-- Bottom bar -->
		<div
			class="mt-10 flex flex-col items-start justify-between gap-3 border-t border-gray-200 pt-8 sm:flex-row sm:items-center dark:border-gray-800"
		>
			<p class="text-xs text-gray-400 dark:text-gray-500">
				&copy; {currentYear} Ninthyard. All rights reserved.
			</p>
			<a
				href="mailto:hello@ninthyard.co.uk"
				class="text-xs text-gray-400 transition-colors hover:text-brand-green dark:text-gray-500 dark:hover:text-brand-green-light"
			>
				hello@ninthyard.co.uk
			</a>
		</div>
	</div>
</footer>
