# Ninthyard

Website for [Ninthyard](https://ninthyard.co.uk) — an AI and digital consultancy serving Nottingham and East Midlands SMEs.

Built with SvelteKit 2, Svelte 5, Tailwind CSS v4, mdsvex, and deployed to Cloudflare Workers.

---

## Project overview

| Section | Description |
|---|---|
| Home | Hero, services, value proposition, and call to action |
| About | Company background and values |
| Prompt Library | Filterable grid of AI prompt templates for common business tasks |
| Prompting Guide | Long-form article on writing effective AI prompts |
| Contact | Enquiry form with client-side validation, submitted via EmailJS |
| Sitemap | HTML sitemap (noindex) and XML sitemap endpoint |

---

## Setup

### Prerequisites

- [Bun](https://bun.sh) (package manager and runtime)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) (installed as a dev dependency — no global install required)

### Install dependencies

```sh
bun install
```

### Environment variables

Copy `.env.example` to `.env` and fill in your EmailJS credentials:

```sh
cp .env.example .env
```

The contact form requires these values at runtime (not build time):

| Variable | Description |
|---|---|
| `PUBLIC_EMAILJS_PUBLIC_KEY` | Your EmailJS public key |
| `PUBLIC_EMAILJS_SERVICE_ID` | The EmailJS service ID |
| `PUBLIC_EMAILJS_TEMPLATE_ID` | The EmailJS template ID |

Sign up at [emailjs.com](https://www.emailjs.com/) to obtain these. The site builds and runs without them — the contact form will fail silently if they are absent.

---

## Development

Start a local dev server with hot module replacement:

```sh
bun run dev
```

The app is served at `http://localhost:5173`.

---

## Building and previewing

Build a production bundle for Cloudflare Workers:

```sh
bun run build
```

Preview the production build locally via Wrangler:

```sh
bun run preview
```

The preview is served at `http://localhost:4173`.

---

## Testing

### Unit and component tests

Run with [Vitest](https://vitest.dev):

```sh
bun run test:unit          # Watch mode
bun run test:unit -- --run # Single run
```

Tests are split into two projects:

- **server** — pure TypeScript tests (Node environment); file pattern `*.{test,spec}.ts`
- **client** — Svelte component tests (headless Chromium via Playwright); file pattern `*.svelte.{test,spec}.ts`

Run a single file:

```sh
bun run test:unit -- src/lib/data/prompts.spec.ts --run
```

Run one project only:

```sh
bun run test:unit -- --project=server --run
bun run test:unit -- --project=client --run
```

### End-to-end tests

Run with [Playwright](https://playwright.dev). The test suite builds the app and starts a preview server automatically before running:

```sh
bun run test:e2e
```

Tests live in `e2e/` and cover:

| File | Coverage |
|---|---|
| `navigation.test.ts` | Header present on all pages, nav link routing, dark mode toggle |
| `home.test.ts` | Page content, services section, header CTA |
| `prompts.test.ts` | Prompt library listing, category filter, detail page, 404 handling |
| `contact.test.ts` | Client-side form validation |

> The first run compiles the full production bundle before launching Playwright — this takes a minute or two. Subsequent runs reuse the existing server if one is already listening on port 4173.

### Run all tests

```sh
bun run test
```

This runs unit tests (single pass) followed by e2e tests.

---

## Code quality

```sh
bun run check    # svelte-check — TypeScript and Svelte diagnostics
bun run lint     # Prettier format check
bun run format   # Prettier auto-format
```
