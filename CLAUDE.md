# CLAUDE.md - Development Reference

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run check` - Run type checking with svelte-check
- `npm run deploy` - Build and deploy to Cloudflare Pages

## Code Style Guidelines

- Use **TypeScript** with strict typing
- Use **spaces** for indentation (not tabs)
- Follow British English locale (en-GB)
- Import order: external libraries, then internal modules
- Component file naming: PascalCase for components
- Variable/function naming: camelCase
- Prefer async/await over promise chains
- Use TypeScript interfaces for complex data structures

## Project Structure

- `src/routes`: Page components and endpoints
- `src/lib`: Shared components and utilities
- `static`: Static assets (images, favicon, etc.)
