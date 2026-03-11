<script lang="ts">
	import emailjs from '@emailjs/browser';
	import { env } from '$env/dynamic/public';
	import SEO from '$lib/components/seo/SEO.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type Status = 'idle' | 'sending' | 'success' | 'error';

	interface FormValues {
		name: string;
		email: string;
		company: string;
		service: string;
		message: string;
		honeypot: string;
	}

	interface FormErrors {
		name?: string;
		email?: string;
		message?: string;
	}

	let status = $state<Status>('idle');
	let errors = $state<FormErrors>({});

	let form = $state<FormValues>({
		name: '',
		email: '',
		company: '',
		service: '',
		message: '',
		honeypot: ''
	});

	const services = [
		'AI Strategy & Roadmapping',
		'AI Implementation',
		'Prompting & Training',
		'Digital Transformation',
		'Not sure yet'
	];

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function validate(): boolean {
		const newErrors: FormErrors = {};

		if (!form.name.trim()) {
			newErrors.name = 'Please enter your name.';
		}
		if (!form.email.trim()) {
			newErrors.email = 'Please enter your email address.';
		} else if (!emailRegex.test(form.email)) {
			newErrors.email = 'Please enter a valid email address.';
		}
		if (!form.message.trim()) {
			newErrors.message = 'Please tell us a bit about your enquiry.';
		} else if (form.message.trim().length < 20) {
			newErrors.message = 'Please give us a bit more detail (at least 20 characters).';
		}

		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	async function handleSubmit() {
		if (form.honeypot) return;
		if (!validate()) return;

		status = 'sending';

		try {
			await emailjs.send(
				env.PUBLIC_EMAILJS_SERVICE_ID ?? '',
				env.PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
				{
					from_name: form.name,
					from_email: form.email,
					company: form.company || 'Not provided',
					service: form.service || 'Not specified',
					message: form.message
				},
				{ publicKey: env.PUBLIC_EMAILJS_PUBLIC_KEY ?? '' }
			);
			status = 'success';
		} catch {
			status = 'error';
		}
	}

	function reset() {
		form = { name: '', email: '', company: '', service: '', message: '', honeypot: '' };
		errors = {};
		status = 'idle';
	}

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		'@id': `${data.site.url}/contact#page`,
		url: `${data.site.url}/contact`,
		name: `Contact | ${data.site.name}`,
		description:
			'Get in touch with Ninthyard to discuss your AI strategy and digital transformation needs.',
		mainEntity: {
			'@type': 'LocalBusiness',
			name: data.site.name,
			email: data.site.email,
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Nottingham',
				addressCountry: 'GB'
			}
		}
	});
</script>

<SEO
	title="Contact"
	description="Book a free discovery call or send us a message. Ninthyard helps Nottingham and East Midlands SMEs with AI strategy and implementation."
	canonical="{data.site.url}/contact"
	{jsonLd}
/>

<!-- Header -->
<section class="border-b border-gray-100 py-16 sm:py-20 dark:border-gray-800">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="max-w-2xl">
			<p
				class="mb-4 text-sm font-semibold tracking-widest text-brand-green uppercase dark:text-brand-green-light"
			>
				Get in touch
			</p>
			<h1
				class="mb-4 font-display text-4xl leading-tight font-bold text-gray-900 sm:text-5xl dark:text-white"
			>
				Let's talk about your business
			</h1>
			<p class="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
				Whether you have a specific project in mind or you're just starting to explore what AI could
				do for you, we'd love to hear from you. The first call is always free.
			</p>
		</div>
	</div>
</section>

<!-- Main -->
<section class="py-16 sm:py-20">
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="grid gap-12 lg:grid-cols-5">
			<!-- Form -->
			<div class="lg:col-span-3">
				{#if status === 'success'}
					<div
						class="rounded-2xl border border-brand-green/20 bg-brand-green-pale p-8 dark:border-brand-green-light/20 dark:bg-brand-green-dark/20"
					>
						<div class="mb-4 text-4xl" aria-hidden="true">✅</div>
						<h2 class="mb-2 font-display text-2xl font-bold text-gray-900 dark:text-white">
							Message sent!
						</h2>
						<p class="mb-6 text-gray-600 dark:text-gray-300">
							Thanks for getting in touch. We'll be in contact within one business day to arrange a
							conversation.
						</p>
						<Button onclick={reset} variant="secondary">Send another message</Button>
					</div>
				{:else}
					<form
						onsubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
						novalidate
						aria-label="Contact form"
					>
						<div class="grid gap-5">
							<!-- Honeypot (hidden from real users) -->
							<div class="hidden" aria-hidden="true">
								<label for="website">Website</label>
								<input
									id="website"
									name="website"
									type="text"
									tabindex="-1"
									autocomplete="off"
									bind:value={form.honeypot}
								/>
							</div>

							<!-- Name -->
							<div>
								<label
									for="name"
									class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									Your name <span class="text-red-500" aria-hidden="true">*</span>
								</label>
								<input
									id="name"
									type="text"
									bind:value={form.name}
									autocomplete="name"
									placeholder="Jane Smith"
									aria-required="true"
									aria-describedby={errors.name ? 'name-error' : undefined}
									aria-invalid={errors.name ? 'true' : undefined}
									class="block w-full rounded-lg border px-4 py-3 text-sm text-gray-900 transition-colors dark:bg-gray-900 dark:text-white {errors.name
										? 'border-red-400 dark:border-red-500'
										: 'border-gray-300 dark:border-gray-700'}"
								/>
								{#if errors.name}
									<p
										id="name-error"
										class="mt-1.5 text-sm text-red-600 dark:text-red-400"
										role="alert"
									>
										{errors.name}
									</p>
								{/if}
							</div>

							<!-- Email -->
							<div>
								<label
									for="email"
									class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									Email address <span class="text-red-500" aria-hidden="true">*</span>
								</label>
								<input
									id="email"
									type="email"
									bind:value={form.email}
									autocomplete="email"
									placeholder="jane@example.co.uk"
									aria-required="true"
									aria-describedby={errors.email ? 'email-error' : undefined}
									aria-invalid={errors.email ? 'true' : undefined}
									class="block w-full rounded-lg border px-4 py-3 text-sm text-gray-900 transition-colors dark:bg-gray-900 dark:text-white {errors.email
										? 'border-red-400 dark:border-red-500'
										: 'border-gray-300 dark:border-gray-700'}"
								/>
								{#if errors.email}
									<p
										id="email-error"
										class="mt-1.5 text-sm text-red-600 dark:text-red-400"
										role="alert"
									>
										{errors.email}
									</p>
								{/if}
							</div>

							<!-- Company -->
							<div>
								<label
									for="company"
									class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									Company name <span class="text-gray-400 dark:text-gray-500">(optional)</span>
								</label>
								<input
									id="company"
									type="text"
									bind:value={form.company}
									autocomplete="organization"
									placeholder="Acme Ltd"
									class="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 transition-colors dark:border-gray-700 dark:bg-gray-900 dark:text-white"
								/>
							</div>

							<!-- Service -->
							<div>
								<label
									for="service"
									class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									Area of interest <span class="text-gray-400 dark:text-gray-500">(optional)</span>
								</label>
								<select
									id="service"
									bind:value={form.service}
									class="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 transition-colors dark:border-gray-700 dark:bg-gray-900 dark:text-white"
								>
									<option value="">Select a service…</option>
									{#each services as service}
										<option value={service}>{service}</option>
									{/each}
								</select>
							</div>

							<!-- Message -->
							<div>
								<label
									for="message"
									class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
								>
									Your message <span class="text-red-500" aria-hidden="true">*</span>
								</label>
								<textarea
									id="message"
									bind:value={form.message}
									rows={5}
									placeholder="Tell us a bit about your business and what you're hoping to achieve with AI…"
									aria-required="true"
									aria-describedby={errors.message ? 'message-error' : undefined}
									aria-invalid={errors.message ? 'true' : undefined}
									class="block w-full rounded-lg border px-4 py-3 text-sm text-gray-900 transition-colors dark:bg-gray-900 dark:text-white {errors.message
										? 'border-red-400 dark:border-red-500'
										: 'border-gray-300 dark:border-gray-700'}"
								></textarea>
								{#if errors.message}
									<p
										id="message-error"
										class="mt-1.5 text-sm text-red-600 dark:text-red-400"
										role="alert"
									>
										{errors.message}
									</p>
								{/if}
							</div>

							{#if status === 'error'}
								<div
									class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-400"
									role="alert"
								>
									Something went wrong sending your message. Please try again or email us directly
									at
									<a href="mailto:{data.site.email}" class="font-medium underline"
										>{data.site.email}</a
									>.
								</div>
							{/if}

							<Button type="submit" size="lg" disabled={status === 'sending'}>
								{#if status === 'sending'}
									<svg
										class="h-4 w-4 animate-spin"
										viewBox="0 0 24 24"
										fill="none"
										aria-hidden="true"
									>
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										/>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
										/>
									</svg>
									Sending…
								{:else}
									Send message
								{/if}
							</Button>

							<p class="text-xs text-gray-400 dark:text-gray-500">
								We'll respond within one business day.
							</p>
						</div>
					</form>
				{/if}
			</div>

			<!-- Sidebar -->
			<aside class="lg:col-span-2">
				<div class="space-y-6">
					<div
						class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
					>
						<h2 class="mb-4 font-display text-lg font-semibold text-gray-900 dark:text-white">
							Contact details
						</h2>
						<ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
							<li class="flex items-start gap-2.5">
								<svg
									class="mt-0.5 h-4 w-4 shrink-0 text-brand-green dark:text-brand-green-light"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z"
									/>
									<path
										d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z"
									/>
								</svg>
								<a
									href="mailto:{data.site.email}"
									class="hover:text-brand-green dark:hover:text-brand-green-light"
								>
									{data.site.email}
								</a>
							</li>
							<li class="flex items-start gap-2.5">
								<svg
									class="mt-0.5 h-4 w-4 shrink-0 text-brand-green dark:text-brand-green-light"
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
								<span>Nottingham, UK</span>
							</li>
						</ul>
					</div>

					<div
						class="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
					>
						<h2 class="mb-3 font-display text-lg font-semibold text-gray-900 dark:text-white">
							What to expect
						</h2>
						<ul class="space-y-3">
							{#each ['A reply within one business day', 'A free 30-minute discovery call', 'No sales pressure or obligation', "Honest advice, even if that means we're not the right fit"] as item}
								<li class="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
									<svg
										class="mt-0.5 h-4 w-4 shrink-0 text-brand-green dark:text-brand-green-light"
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
									{item}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</aside>
		</div>
	</div>
</section>
