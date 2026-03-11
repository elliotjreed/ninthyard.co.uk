<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { theme } from '$lib/stores/theme.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	onMount(() => {
		theme.init();
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
