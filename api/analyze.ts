import type { VercelRequest, VercelResponse } from '@vercel/node';
import Anthropic from '@anthropic-ai/sdk';

// Vercel serverless functions use ANTHROPIC_API_KEY (not VITE_ prefix)
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

if (!anthropicApiKey) {
	console.error('⚠️ ANTHROPIC_API_KEY not set in Vercel environment variables');
}

const client = anthropicApiKey ? new Anthropic({ apiKey: anthropicApiKey }) : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method Not Allowed' });
	}
	
	if (!client || !anthropicApiKey) {
		return res.status(500).json({ 
			error: 'Anthropic API key not configured', 
			details: 'Please set ANTHROPIC_API_KEY in Vercel environment variables' 
		});
	}

	try {
		const { candidate, positionType, resumeText } = req.body || {};
		
		if (!candidate?.name || !positionType || !resumeText) {
			return res.status(400).json({ 
				error: 'Missing required fields', 
				details: `Missing: ${!candidate?.name ? 'candidate.name ' : ''}${!positionType ? 'positionType ' : ''}${!resumeText ? 'resumeText' : ''}`.trim()
			});
		}

		const isEarly = positionType === 'early_career';
		const systemPrompt = 'You are an assistant that evaluates resumes for Hilb Group. Return ONLY valid JSON, no markdown formatting, no code blocks.';
		const userPrompt = buildPrompt({ candidate, positionType, resumeText });

		const completion = await client.messages.create({
			model: 'claude-3-5-sonnet',
			max_tokens: 2000,
			temperature: 0,
			system: systemPrompt,
			messages: [{ role: 'user', content: userPrompt }],
		});

		const text = completion.content?.[0]?.type === 'text' ? completion.content[0].text : '';
		
		if (!text || text.trim().length === 0) {
			return res.status(500).json({ 
				error: 'Empty response from AI', 
				details: 'Claude API returned empty content' 
			});
		}

		// Try to extract JSON from markdown code blocks if present
		let jsonText = text.trim();
		const jsonMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
		if (jsonMatch) {
			jsonText = jsonMatch[1].trim();
		}

		let json;
		try {
			json = JSON.parse(jsonText);
		} catch (parseError: any) {
			console.error('JSON parse error:', parseError.message);
			console.error('Response text (first 500 chars):', text.substring(0, 500));
			return res.status(500).json({ 
				error: 'Invalid JSON response from AI', 
				details: parseError.message || 'Could not parse AI response as JSON' 
			});
		}

		return res.status(200).json(json);
	} catch (err: any) {
		console.error('Analyze API error:', err);
		const errorMessage = err?.message || 'Unknown error';
		const errorDetails = err?.cause || err?.details || errorMessage;
		
		// Check for specific Anthropic API errors
		if (err?.status || err?.error) {
			return res.status(err.status || 500).json({ 
				error: 'Claude API error', 
				details: err.error?.message || errorDetails 
			});
		}
		
		return res.status(500).json({ 
			error: 'Analysis failed', 
			details: errorMessage 
		});
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
