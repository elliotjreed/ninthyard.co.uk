import type { Prompt } from '$lib/types';

export const prompts: Prompt[] = [
	{
		slug: 'cold-email-outreach',
		title: 'Cold Email Outreach',
		category: 'Sales & Marketing',
		description:
			'Generate a professional, personalised cold email to a potential business prospect that feels human and gets replies.',
		difficulty: 'beginner',
		tags: ['email', 'sales', 'outreach', 'prospecting'],
		prompt: `You are an experienced B2B sales professional writing on behalf of [YOUR COMPANY NAME].

Write a cold email to [PROSPECT NAME] at [PROSPECT COMPANY], a [DESCRIBE THEIR BUSINESS TYPE] based in [LOCATION].

The email should:
- Have a subject line under 50 characters that hints at value without being clickbait
- Open with one sentence that references something specific about their business (use: [SPECIFIC OBSERVATION, e.g. "I noticed you recently expanded your team" or "I saw your post about X"])
- State clearly what we do and how it specifically helps companies like theirs in 2–3 sentences
- Include one concrete result or outcome (e.g. "We helped a similar [industry] business reduce X by Y%")
- End with a single, low-commitment call to action (e.g. a 15-minute call)
- Be no longer than 150 words in total

Our company does: [DESCRIBE YOUR PRODUCT/SERVICE IN ONE SENTENCE]
Their likely pain point: [DESCRIBE WHAT PROBLEM THEY PROBABLY HAVE]
Tone: warm and professional, not salesy`,
		useCases: [
			'Prospecting new B2B clients',
			'Introducing a new product or service to the market',
			'Reconnecting with lapsed customers',
			'Partnership outreach'
		],
		tips: [
			'Replace all bracketed placeholders before sending — generic emails get ignored.',
			'Research the prospect for 5 minutes first: check LinkedIn, their website, and recent news.',
			'Run the email through a readability checker — aim for Grade 8 or below.',
			'Test different subject lines by generating 5 variants and picking the most intriguing.',
			'Follow up 3–5 days later with a shorter version if you get no response.'
		]
	},
	{
		slug: 'meeting-summary',
		title: 'Meeting Summary & Action Items',
		category: 'Operations',
		description:
			'Turn rough meeting notes or a transcript into a clean summary with clear owners and deadlines.',
		difficulty: 'beginner',
		tags: ['meetings', 'productivity', 'notes', 'actions'],
		prompt: `You are a highly organised executive assistant.

Below are my rough notes from a meeting. Please produce a clean meeting summary in this exact format:

## Meeting Summary
**Date:** [extract from notes or leave blank]
**Attendees:** [extract from notes]
**Purpose:** [one sentence]

## Key Decisions
- [bullet list of decisions made]

## Action Items
| Action | Owner | Deadline |
|--------|-------|----------|
| [action] | [person] | [date or "TBD"] |

## Discussion Points
[2–4 sentence summary of what was discussed, without repetition]

## Next Meeting
[date/topic if mentioned, otherwise "Not scheduled"]

---
MEETING NOTES:
[PASTE YOUR NOTES HERE]

Rules:
- Do not invent information not present in the notes
- If something is unclear, mark it with [UNCLEAR]
- Keep action items specific and actionable, not vague`,
		useCases: [
			'Client calls and project kickoffs',
			'Internal team stand-ups',
			'Board and leadership meetings',
			'Sales discovery calls'
		],
		tips: [
			'Paste the full transcript or your notes — more input means a better summary.',
			'If using an AI transcription tool (Otter, Fireflies), paste that transcript directly.',
			'Review action items carefully: AI can misattribute owners.',
			'Add the formatted output directly to your project management tool or email to attendees.'
		]
	},
	{
		slug: 'job-description',
		title: 'Job Description Writer',
		category: 'HR & Hiring',
		description:
			'Create a compelling, inclusive job description that attracts the right candidates without unnecessary jargon.',
		difficulty: 'beginner',
		tags: ['HR', 'hiring', 'recruitment', 'job posting'],
		prompt: `You are an experienced HR professional and copywriter who specialises in inclusive, compelling job descriptions.

Write a job description for the following role:

**Role:** [JOB TITLE]
**Company:** [COMPANY NAME] — [ONE SENTENCE ABOUT WHAT YOU DO AND YOUR CULTURE]
**Location:** [LOCATION / Remote / Hybrid]
**Salary:** [RANGE OR "Competitive, discussed at interview"]
**Type:** [Full-time / Part-time / Contract]

**Must-have skills and experience:**
[LIST 3–5 ESSENTIAL REQUIREMENTS]

**Nice-to-have:**
[LIST 2–3 DESIRABLE BUT NOT ESSENTIAL]

**Key responsibilities:**
[LIST 4–6 MAIN DUTIES]

**What we offer:**
[LIST BENEFITS, e.g. flexible hours, training budget, pension]

Format the description with:
1. An engaging 2–3 sentence intro about the company and why this role exists
2. A "What you'll do" section (bullet points)
3. A "What we're looking for" section (split must-have vs nice-to-have)
4. A "What we offer" section
5. A brief inclusive closing paragraph encouraging applications from underrepresented groups
6. Application instructions: [HOW TO APPLY]

Tone: [professional and friendly / formal / startup energy — choose one]
Keep the total length under 500 words.`,
		useCases: [
			'Posting on job boards (LinkedIn, Indeed, Reed)',
			'Internal promotions and role changes',
			'Agency briefs',
			'Career pages on your website'
		],
		tips: [
			'Remove unnecessary requirements — studies show women apply only when they meet ~100% of criteria.',
			'Avoid corporate buzzwords like "rockstar", "ninja", or "passionate".',
			'Include a salary range — it increases quality applications significantly.',
			'Run the output through a gender bias checker tool before publishing.',
			'Ask an employee in the role to review it for accuracy before posting.'
		]
	},
	{
		slug: 'linkedin-post',
		title: 'LinkedIn Post Generator',
		category: 'Content & Comms',
		description:
			'Write an engaging LinkedIn post that builds your professional brand and generates genuine engagement.',
		difficulty: 'beginner',
		tags: ['LinkedIn', 'social media', 'content', 'marketing'],
		prompt: `You are a B2B content strategist who writes LinkedIn posts that get genuine engagement — not empty likes.

Write a LinkedIn post about the following topic:

**Topic/Idea:** [DESCRIBE WHAT YOU WANT TO SHARE — e.g. a lesson learned, a client win, an industry observation, a contrarian take]

**My role/company:** [YOUR JOB TITLE AND COMPANY OR INDUSTRY]

**Target audience:** [WHO SHOULD FIND THIS VALUABLE — e.g. "SME owners in the UK", "HR managers", "tech founders"]

**Key message in one sentence:** [WHAT IS THE ONE THING YOU WANT THEM TO TAKE AWAY]

Write the post following this structure:
1. Hook (first line only — must stop the scroll, under 12 words, no emojis)
2. The insight or story (3–5 short paragraphs, 1–3 sentences each)
3. Practical takeaway or question to the reader
4. 3–5 relevant hashtags at the end (not in the body)

Rules:
- No "I'm excited to share" or "Thrilled to announce" openers
- Use white space generously — short paragraphs
- Conversational British English
- No more than 300 words
- Do NOT include emojis unless I say otherwise`,
		useCases: [
			'Thought leadership content',
			'Announcing wins, hires, or launches',
			'Sharing lessons and observations',
			'Repurposing blog posts or talks'
		],
		tips: [
			'The first line is everything — generate 5 hooks and pick the strongest.',
			'Post consistently (2–3 times per week) rather than occasionally for best results.',
			'Engage with comments within the first hour of posting.',
			'Posts with images or carousels typically get 3× more impressions.',
			'Avoid external links in the post body — put them in the first comment instead.'
		]
	},
	{
		slug: 'customer-complaint-response',
		title: 'Customer Complaint Response',
		category: 'Customer Service',
		description:
			'Draft a professional, empathetic response to a customer complaint that resolves the issue and rebuilds trust.',
		difficulty: 'beginner',
		tags: ['customer service', 'complaints', 'email', 'communication'],
		prompt: `You are a senior customer service manager known for turning difficult situations into positive customer experiences.

Draft a response to the following customer complaint:

**Channel:** [Email / Letter / Online Review / Social Media — choose one]
**Customer name:** [NAME or "Customer" if unknown]
**Nature of complaint:** [DESCRIBE THE COMPLAINT IN DETAIL]
**What actually happened (our side):** [EXPLAIN THE SITUATION FROM YOUR PERSPECTIVE — be honest]
**Resolution we can offer:** [DESCRIBE WHAT YOU CAN DO — refund, replacement, discount, explanation, apology]
**Can we fully resolve it?** [Yes / Partially / No — and why if no]

Write a response that:
1. Acknowledges the issue and thanks them for raising it (do not use "I'm sorry you feel that way")
2. Takes responsibility where appropriate (without admitting legal liability)
3. Explains what happened briefly and honestly
4. States clearly what we will do to resolve it and by when
5. Closes warmly with an invitation to contact us directly

Tone: [formal and professional / warm and conversational — choose one]
Length: under 200 words
Do not use: hollow corporate language, passive voice, or vague promises`,
		useCases: [
			'Email responses to formal complaints',
			'Replies to negative online reviews (Google, Trustpilot)',
			'Social media complaint responses',
			'Letter responses for regulated industries'
		],
		tips: [
			'Always respond within 24 hours — speed signals you care.',
			'Move the conversation to a private channel (email/phone) if it starts publicly.',
			'Have a human review the response before sending — never send AI output unreviewed.',
			'Track complaint patterns: recurring issues are product/process signals worth acting on.',
			'Follow up 3–5 days later to check satisfaction — it builds exceptional loyalty.'
		]
	},
	{
		slug: 'weekly-progress-report',
		title: 'Weekly Progress Report',
		category: 'Operations',
		description:
			'Transform your messy week notes into a structured progress report for your team, manager, or stakeholders.',
		difficulty: 'beginner',
		tags: ['reporting', 'productivity', 'management', 'communication'],
		prompt: `You are a project manager who writes clear, concise weekly progress reports.

Create a weekly progress report from these notes:

**Project/Team:** [NAME]
**Reporting period:** [DATE RANGE]
**Audience:** [Manager / Board / Client / Team — choose who will read this]

**My rough notes for the week:**
[PASTE YOUR NOTES, BULLET POINTS, OR STREAM OF CONSCIOUSNESS HERE]

Format the report with:

## Week [NUMBER] Summary
One paragraph (3 sentences max) summarising the week's headline.

## Completed This Week
- [bullet list of what was done, with impact where relevant]

## In Progress
| Task | Status | % Complete | Blocker |
|------|--------|------------|---------|

## Upcoming (Next Week)
- [3–5 priorities for the coming week]

## Risks & Issues
- [any blockers, risks, or items needing decisions — or "None this week"]

## Metrics (if applicable)
[Include any numbers/KPIs from notes]

Rules:
- Use active voice ("We completed X" not "X was completed")
- Be specific: numbers and percentages over vague statements
- Flag blockers clearly — don't bury them
- Keep total length under 400 words`,
		useCases: [
			'Client project updates',
			'Internal team reporting',
			'Board pack contributions',
			'Personal productivity tracking'
		],
		tips: [
			'Make note-taking during the week part of your routine — even rough bullets work.',
			'Include at least one metric every week to demonstrate measurable progress.',
			'Send reports at a consistent time (e.g. Friday 4pm) so stakeholders can rely on them.',
			'Use the "Risks & Issues" section proactively — surfacing problems early builds trust.'
		]
	}
];

export function getPromptBySlug(slug: string): Prompt | undefined {
	return prompts.find((p) => p.slug === slug);
}

export function getPromptsByCategory(category: string): Prompt[] {
	return prompts.filter((p) => p.category === category);
}

export const promptCategories = [...new Set(prompts.map((p) => p.category))];
