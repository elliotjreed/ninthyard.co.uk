<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'green' | 'purple' | 'gray' | 'warm';
		size?: 'sm' | 'md';
		class?: string;
		children: Snippet;
	}

	let { variant = 'gray', size = 'md', class: extraClass = '', children }: Props = $props();

	const base = 'inline-flex items-center rounded-full font-medium';

	const variantMap = {
		green:
			'bg-brand-green-pale text-brand-green dark:bg-brand-green-dark/40 dark:text-brand-green-light',
		purple:
			'bg-brand-purple-pale text-brand-purple dark:bg-brand-purple-dark/40 dark:text-brand-purple-light',
		gray: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
		warm: 'bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
	};

	const sizeMap = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-3 py-1 text-sm'
	};

	const classes = $derived(`${base} ${variantMap[variant]} ${sizeMap[size]} ${extraClass}`);
</script>

<span class={classes}>{@render children()}</span>
