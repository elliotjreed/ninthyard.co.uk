export interface SiteConfig {
	name: string;
	tagline: string;
	url: string;
	description: string;
	email: string;
	location: string;
}

export interface NavLink {
	label: string;
	href: string;
}

export interface Prompt {
	slug: string;
	title: string;
	category: string;
	description: string;
	difficulty: 'beginner' | 'intermediate' | 'advanced';
	tags: string[];
	prompt: string;
	useCases: string[];
	tips: string[];
}

export type PromptCategory =
	| 'Sales & Marketing'
	| 'Operations'
	| 'HR & Hiring'
	| 'Customer Service'
	| 'Content & Comms';

export interface SEOProps {
	title: string;
	description: string;
	canonical?: string;
	ogImage?: string;
	ogType?: 'website' | 'article';
	jsonLd?: Record<string, unknown>;
	noindex?: boolean;
}
