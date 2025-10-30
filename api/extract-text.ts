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
			return res.status(400).json({ error: 'Expected application/pdf body' });
		}

		const chunks: Buffer[] = [];
		await new Promise<void>((resolve, reject) => {
			req.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
			req.on('end', () => resolve());
			req.on('error', (e) => reject(e));
		});
		const buffer = Buffer.concat(chunks);
		const result = await pdfParse(buffer);
		return res.status(200).json({ text: result.text || '' });
	} catch (err: any) {
		return res.status(500).json({ error: 'Failed to extract text', details: err?.message });
	}
}
