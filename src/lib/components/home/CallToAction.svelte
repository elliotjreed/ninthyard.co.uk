<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
</script>

<section
	class="bg-gradient-to-br from-brand-green to-brand-green-dark py-20 sm:py-24"
	aria-label="Call to action"
>
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6">
		<h2 class="mb-4 font-display text-3xl font-bold text-white sm:text-4xl">
			Ready to start your AI journey?
		</h2>
		<p class="mb-8 text-lg text-green-100">
			Book a free 30-minute discovery call. No pressure, no jargon — just an honest conversation
			about what AI could do for your business.
		</p>
		<div class="flex flex-col items-center justify-center gap-3 sm:flex-row">
			<Button href="/contact" variant="cta" size="lg">Book a free call</Button>
			<Button
				href="/prompts"
				variant="ghost"
				size="lg"
				class="text-white hover:bg-white/10 hover:text-white dark:hover:bg-white/10"
			>
				Browse prompt library
			</Button>
		</div>
	</div>
</section>
