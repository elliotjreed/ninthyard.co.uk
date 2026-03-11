<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'ghost' | 'cta';
		size?: 'sm' | 'md' | 'lg';
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		class?: string;
		children: Snippet;
		onclick?: () => void;
	}

	let {
		variant = 'primary',
		size = 'md',
		href,
		type = 'button',
		disabled = false,
		class: extraClass = '',
		children,
		onclick
	}: Props = $props();

	const base =
		'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

	const variantMap = {
		primary:
			'bg-brand-green text-white hover:bg-brand-green-dark focus-visible:outline-brand-green shadow-sm',
		secondary:
			'border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white focus-visible:outline-brand-green dark:border-brand-green-light dark:text-brand-green-light dark:hover:bg-brand-green-light dark:hover:text-gray-950',
		ghost:
			'text-brand-green hover:bg-brand-green-pale focus-visible:outline-brand-green dark:text-brand-green-light dark:hover:bg-gray-800',
		cta: 'bg-brand-purple text-white hover:bg-brand-purple-dark focus-visible:outline-brand-purple shadow-sm dark:bg-brand-purple-light dark:text-gray-950 dark:hover:bg-brand-purple'
	};

	const sizeMap = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-5 py-2.5 text-sm',
		lg: 'px-7 py-3.5 text-base'
	};

	const classes = $derived(`${base} ${variantMap[variant]} ${sizeMap[size]} ${extraClass}`);
</script>

{#if href}
	<a {href} class={classes}>{@render children()}</a>
{:else}
	<button class={classes} {type} {disabled} {onclick}>{@render children()}</button>
{/if}
