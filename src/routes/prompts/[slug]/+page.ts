import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getPromptBySlug } from '$lib/data/prompts';

export const load: PageLoad = ({ params }) => {
	const prompt = getPromptBySlug(params.slug);
	if (!prompt) throw error(404, 'Prompt not found');
	return { prompt };
};
