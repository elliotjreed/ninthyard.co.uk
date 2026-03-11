# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands use `bun` as the package manager.

```sh
bun run dev          # Start dev server
bun run build        # Production build (Cloudflare Workers target)
bun run preview      # Preview production build via wrangler
bun run check        # svelte-check TypeScript/Svelte diagnostics
bun run lint         # Prettier check
bun run format       # Prettier write
bun run test:unit    # Vitest (watch mode)
bun run test         # All tests (unit + e2e), no watch
bun run test:e2e     # Playwright e2e only
```

Run a single test file:
```sh
bun run test:unit -- src/lib/data/prompts.spec.ts --run
```

Run tests by project (client vs server):
```sh
bun run test:unit -- --project=client --run
bun run test:unit -- --project=server --run
```

## Architecture

**Stack:** SvelteKit 2 + Svelte 5 + Tailwind v4 + mdsvex + Cloudflare Workers (via `@sveltejs/adapter-cloudflare`).

### Svelte 5 runes
All components use Svelte 5 runes: `$props()`, `$state()`, `$derived()`, `{@render children()}`. Never use legacy Svelte 4 syntax (`export let`, `$:`, `<slot />`).

### Tailwind v4
No `tailwind.config.*` file. All design tokens live in `src/routes/layout.css` under `@theme {}`. Dark mode uses `@custom-variant dark (&:where(.dark, .dark *))` — avoid Tailwind's `darkMode` config approach.

Dark mode state is a plain Svelte 5 rune module at `src/lib/stores/theme.svelte.ts`. The `<html>` class is toggled directly; initialisation runs from a script in `src/app.html` (before hydration) to prevent flash.

### Testing
Two Vitest projects defined in `vite.config.ts`:
- **server** — Node environment, matches `src/**/*.{test,spec}.{js,ts}` (excludes `.svelte.spec` files)
- **client** — Browser (Playwright/Chromium headless), matches `src/**/*.svelte.{test,spec}.{js,ts}`

Test files in `src/routes/` must **not** use a `+` prefix (reserved by SvelteKit).

### Content
- Prompt data is a TypeScript array in `src/lib/data/prompts.ts` — not markdown files. Each `Prompt` object shape is defined in `src/lib/types/index.ts`.
- Long-form article content (`/prompting-guide`) is written as an `.svx` file (`src/lib/content/prompting-guide.svx`) imported as a Svelte component into the route page.
- Types for `.svx` imports are declared in `src/svx.d.ts`.

### SEO
`src/lib/components/seo/SEO.svelte` handles all meta tags, Open Graph, Twitter cards, and JSON-LD. Every route page should include it.

### Environment variables
EmailJS uses `$env/dynamic/public` (not `$env/static/public`) so the build doesn't require vars at build time. See `.env.example` for required keys.
