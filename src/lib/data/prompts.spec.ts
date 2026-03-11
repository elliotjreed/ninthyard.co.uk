import { describe, it, expect } from 'vitest';
import { prompts, getPromptBySlug, getPromptsByCategory, promptCategories } from './prompts';

describe('prompts data', () => {
	it('exports a non-empty array of prompts', () => {
		expect(prompts.length).toBeGreaterThan(0);
	});

	it('every prompt has required fields', () => {
		for (const prompt of prompts) {
			expect(prompt.slug).toBeTruthy();
			expect(prompt.title).toBeTruthy();
			expect(prompt.category).toBeTruthy();
			expect(prompt.description).toBeTruthy();
			expect(prompt.prompt).toBeTruthy();
			expect(['beginner', 'intermediate', 'advanced']).toContain(prompt.difficulty);
			expect(Array.isArray(prompt.tags)).toBe(true);
			expect(Array.isArray(prompt.useCases)).toBe(true);
			expect(Array.isArray(prompt.tips)).toBe(true);
		}
	});

	it('all slugs are unique', () => {
		const slugs = prompts.map((p) => p.slug);
		const unique = new Set(slugs);
		expect(unique.size).toBe(slugs.length);
	});

	it('all slugs are kebab-case with no special characters', () => {
		for (const prompt of prompts) {
			expect(prompt.slug).toMatch(/^[a-z0-9-]+$/);
		}
	});
});

describe('getPromptBySlug', () => {
	it('returns the correct prompt for a valid slug', () => {
		const first = prompts[0];
		const result = getPromptBySlug(first.slug);
		expect(result).toEqual(first);
	});

	it('returns undefined for an unknown slug', () => {
		expect(getPromptBySlug('does-not-exist')).toBeUndefined();
	});
});

describe('getPromptsByCategory', () => {
	it('returns only prompts matching the given category', () => {
		const category = prompts[0].category;
		const results = getPromptsByCategory(category);
		expect(results.length).toBeGreaterThan(0);
		for (const prompt of results) {
			expect(prompt.category).toBe(category);
		}
	});

	it('returns an empty array for an unknown category', () => {
		expect(getPromptsByCategory('Nonexistent Category')).toHaveLength(0);
	});
});

describe('promptCategories', () => {
	it('contains only unique values', () => {
		const unique = new Set(promptCategories);
		expect(unique.size).toBe(promptCategories.length);
	});

	it('matches the categories present in the prompts array', () => {
		const fromPrompts = new Set(prompts.map((p) => p.category));
		const fromCategories = new Set(promptCategories);
		expect(fromCategories).toEqual(fromPrompts);
	});
});
