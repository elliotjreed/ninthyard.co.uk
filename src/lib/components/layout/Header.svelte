<script lang="ts">
	import { page } from '$app/state';
	import { theme } from '$lib/stores/theme.svelte';
	import MobileMenu from './MobileMenu.svelte';
	import type { NavLink } from '$lib/types';

	const navLinks: NavLink[] = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Prompt Library', href: '/prompts' },
		{ label: 'Prompting Guide', href: '/prompting-guide' }
	];

	let mobileOpen = $state(false);
	let scrolled = $state(false);

	function handleScroll() {
		scrolled = window.scrollY > 8;
	}

	function linkClass(href: string): string {
		const isActive = page.url.pathname === href;
		const base = 'rounded-lg px-3.5 py-2 text-sm font-medium transition-colors';
		if (isActive) {
			return `${base} text-brand-green dark:text-brand-green-light`;
		}
		return `${base} text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white`;
	}
</script>

<svelte:window onscroll={handleScroll} />

<header
	class="sticky top-0 z-30 w-full transition-all duration-200 {scrolled
		? 'bg-white/95 shadow-sm backdrop-blur-md dark:bg-warm-950/95'
		: 'bg-transparent'}"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
		<!-- Logo -->
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

		<!-- Desktop nav -->
		<nav class="hidden lg:flex lg:items-center lg:gap-1" aria-label="Main navigation">
			{#each navLinks as link}
				<a
					href={link.href}
					class={linkClass(link.href)}
					aria-current={page.url.pathname === link.href ? 'page' : undefined}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- Right actions -->
		<div class="flex items-center gap-2">
			<!-- Dark mode toggle -->
			<button
				onclick={() => theme.toggle()}
				class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
				aria-label={theme.dark ? 'Switch to light mode' : 'Switch to dark mode'}
			>
				{#if theme.dark}
					<!-- Sun icon -->
					<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path
							d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06L5.403 4.343a.75.75 0 00-1.06 1.06l1.06 1.061z"
						/>
					</svg>
				{:else}
					<!-- Moon icon -->
					<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
			</button>

			<!-- CTA (desktop) -->
			<a
				href="/contact"
				class="hidden rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-green-dark lg:inline-flex"
			>
				Get in touch
			</a>

			<!-- Hamburger (mobile) -->
			<button
				onclick={() => (mobileOpen = true)}
				class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800"
				aria-label="Open menu"
				aria-expanded={mobileOpen}
			>
				<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
					<path
						fill-rule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 012 10z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
	</div>
</header>

<MobileMenu links={navLinks} open={mobileOpen} onclose={() => (mobileOpen = false)} />
