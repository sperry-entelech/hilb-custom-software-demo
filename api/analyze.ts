import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

const anthropicApiKey = process.env.VITE_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;

const client = anthropicApiKey ? new Anthropic({ apiKey: anthropicApiKey }) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method Not Allowed' });
	}
	if (!client) {
		return res.status(500).json({ error: 'Anthropic API key missing' });
	}

	try {
		const { candidate, positionType, resumeText } = req.body || {};
		if (!candidate?.name || !positionType || !resumeText) {
			return res.status(400).json({ error: 'Missing candidate.name, positionType, or resumeText' });
		}

		const isEarly = positionType === 'early_career';
		const systemPrompt = 'You are an assistant that evaluates resumes for Hilb Group per strict JSON output.';
		const userPrompt = buildPrompt({ candidate, positionType, resumeText });

		const completion = await client.messages.create({
			model: 'claude-3-5-sonnet-20240620',
			max_tokens: 1200,
			temperature: 0,
			system: systemPrompt,
			messages: [{ role: 'user', content: userPrompt }],
		});

		const text = completion.content?.[0]?.type === 'text' ? completion.content[0].text : '';
		// Expect raw JSON per spec
		const json = JSON.parse(text);
		return res.status(200).json(json);
	} catch (err: any) {
		return res.status(500).json({ error: 'Analysis failed', details: err?.message });
	}
}

function buildPrompt({ candidate, positionType, resumeText }: { candidate: any; positionType: string; resumeText: string }) {
	const isEarly = positionType === 'early_career';
	return `Analyze this resume for ${isEarly ? 'the Early Career Development Program at' : 'a position at'} Hilb Group, a leading insurance and employee benefits brokerage firm.

Candidate: ${candidate.name}
Position Type: ${isEarly ? 'Early Career Development Program' : 'General Position'}

Resume Text:
${resumeText}

${isEarly ? `
HILB GROUP EARLY CAREER DEVELOPMENT PROGRAM CRITERIA:

REQUIRED QUALIFICATIONS:
1. Bachelor's degree in Business, Finance, Risk Management, Insurance, Economics, or equivalent
2. Some internship or part-time experience in:
   - Sales
   - Customer service
   - Insurance
   - Brokerage services
3. Strong communication skills (verbal + written)
4. Ability to learn quickly, adapt, and handle regulatory/compliance-oriented tasks
5. Basic customer/account management exposure (assisting clients, handling inquiries)
6. Familiarity or willingness to learn insurance products (P&C, benefits, commercial lines)
7. Strong analytical mindset (ability to interpret risk, premiums, data)
8. Digital fluency (CRM tools, MS Office, interest in data/analytics)

KEY TRAITS TO EVALUATE:
- Ambitious
- Collaborative
- Adaptive
- Client-focused
- Growth-oriented
- Open to learning
- Integrity
- Ethical

POSITIVE INDICATORS:
- Campus involvement (student organizations, leadership roles)
- Professional associations
- Volunteer work
- Team sports or competitive activities

TARGET ROLES IN PROGRAM:
Account Manager, Account Executive, Sales Producer, Commercial Lines AE, Benefits AE, Stop Loss AM, Operations Specialist, Benefits Specialist, Marketing Lead, Sales Manager, Customer Service Rep, Commissions Manager, Personal Lines AE/AM, Client Care Specialist, Analyst, Account Technicians, Account Advisors, Entry Level Sales/Account Reps

SCORING BREAKDOWN (Weight each category):
- Education & Background (30%): Degree field, GPA, relevant coursework, academic honors
- Experience & Skills (40%): Internships, work experience, technical skills, communication
- Traits & Potential (20%): Leadership, collaboration, adaptability, growth mindset
- Industry Fit (10%): Insurance knowledge, analytical ability, regulatory awareness
` : `
FOR GENERAL POSITION:
Evaluate based on:
- Years and relevance of professional work experience
- Technical skills matching job requirements
- Insurance/brokerage industry experience
- Education level and certifications
- Career progression trajectory
- Role-specific qualifications
`}

Provide your analysis in this exact JSON format (no markdown, just raw JSON):
{
  "overall_score": <number 0-100>,
  "position_specific_score": <number 0-100>,
  ${isEarly ? `"category_scores": {
    "education": <number 0-100>,
    "experience": <number 0-100>,
    "traits": <number 0-100>,
    "industry_fit": <number 0-100>
  },` : ''}
  "strengths": [<array of 4-6 specific strengths as strings>],
  "concerns": [<array of 2-4 concerns or gaps as strings>],
  "key_qualifications": [<array of 4-6 key qualifications as strings>],
  ${isEarly ? `"trait_assessment": {
    "ambitious": <boolean>,
    "collaborative": <boolean>,
    "adaptive": <boolean>,
    "client_focused": <boolean>,
    "growth_oriented": <boolean>,
    "open_to_learning": <boolean>,
    "integrity": <boolean>
  },
  "campus_involvement": [<array of activities/roles>],
  "potential_roles": [<array of 2-4 suggested Hilb Group roles>],
  "degree_field": "<major/field of study>",
  "gpa": <number or null>,
  "university": "<school name or null>",` : ''}
  "reasoning": "<3-4 sentence summary explaining the scores, overall fit, and specific recommendations for Hilb Group>"
}
`;
}
