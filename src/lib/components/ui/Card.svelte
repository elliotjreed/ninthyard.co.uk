<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		href?: string;
		children: Snippet;
	}

	let { class: extraClass = '', href, children }: Props = $props();

	const base =
		'rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900';
	const interactiveClass =
		'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-brand-green/40 dark:hover:border-brand-green-light/30';

	const classes = $derived(`${base} ${href ? interactiveClass : ''} ${extraClass}`);
</script>

{#if href}
	<a {href} class={classes}>{@render children()}</a>
{:else}
	<div class={classes}>{@render children()}</div>
{/if}
