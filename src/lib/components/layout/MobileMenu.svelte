<script lang="ts">
	import type { NavLink } from '$lib/types';

	interface Props {
		links: NavLink[];
		open: boolean;
		onclose: () => void;
	}

	let { links, open, onclose }: Props = $props();
</script>

{#if open}
	<!-- Backdrop -->
	<button
		class="fixed inset-0 z-40 bg-gray-950/50 backdrop-blur-sm lg:hidden"
		onclick={onclose}
		aria-label="Close menu"
	></button>
{/if}

<!-- Drawer -->
<div
	class="fixed inset-y-0 right-0 z-50 w-72 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden dark:bg-gray-950"
	class:-translate-x-0={open}
	class:translate-x-full={!open}
	aria-hidden={!open}
	role="dialog"
	aria-label="Navigation menu"
>
	<div class="flex items-center justify-between border-b border-gray-100 p-5 dark:border-gray-800">
		<span class="font-display text-lg font-semibold text-gray-900 dark:text-white">Menu</span>
		<button
			onclick={onclose}
			class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300"
			aria-label="Close menu"
		>
			<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path
					d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
				/>
			</svg>
		</button>
	</div>

	<nav class="p-5">
		<ul class="space-y-1">
			{#each links as link}
				<li>
					<a
						href={link.href}
						onclick={onclose}
						class="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-brand-green-pale hover:text-brand-green dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-brand-green-light"
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>

		<div class="mt-6 border-t border-gray-100 pt-6 dark:border-gray-800">
			<a
				href="/contact"
				onclick={onclose}
				class="block w-full rounded-lg bg-brand-green px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-brand-green-dark"
			>
				Get in touch
			</a>
		</div>
	</nav>
</div>
