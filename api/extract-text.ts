import type { VercelRequest, VercelResponse } from '@vercel/node';
// @ts-ignore pdf-parse has no bundled types
import pdfParse from 'pdf-parse';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method Not Allowed' });
	}

	try {
		const contentType = req.headers['content-type'] || '';
		if (!contentType.startsWith('application/pdf')) {
			return res.status(400).json({ 
				error: 'Invalid content type', 
				details: `Expected application/pdf, got ${contentType || 'unknown'}` 
			});
		}

		// Collect request body chunks
		const chunks: Buffer[] = [];
		await new Promise<void>((resolve, reject) => {
			req.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
			req.on('end', () => resolve());
			req.on('error', (e) => reject(e));
		});
		
		const buffer = Buffer.concat(chunks);
		
		// Validate buffer is not empty
		if (buffer.length === 0) {
			return res.status(400).json({ 
				error: 'Empty file', 
				details: 'The uploaded file is empty or could not be read' 
			});
		}
		
		// Validate PDF header (PDF files start with %PDF)
		const header = buffer.toString('ascii', 0, Math.min(4, buffer.length));
		if (!header.startsWith('%PDF')) {
			return res.status(400).json({ 
				error: 'Invalid PDF format', 
				details: 'File does not appear to be a valid PDF. PDF files must start with %PDF header.' 
			});
		}
		
		// Parse PDF
		const result = await pdfParse(buffer);
		
		// Return extracted text
		return res.status(200).json({ text: result.text || '' });
		
	} catch (err: any) {
		// Provide detailed error information
		const errorMessage = err?.message || 'Unknown error occurred';
		const errorDetails = err?.stack ? 
			`${errorMessage}. Stack: ${err.stack.substring(0, 200)}` : 
			errorMessage;
		
		console.error('PDF extraction error:', errorDetails);
		
		return res.status(500).json({ 
			error: 'Failed to extract text from PDF', 
			details: errorMessage 
		});
	}
}
