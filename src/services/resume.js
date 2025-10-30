export async function extractPdfText(file) {
	const res = await fetch('/api/extract-text', {
		method: 'POST',
		headers: { 'Content-Type': 'application/pdf' },
		body: file,
	});
	if (!res.ok) throw new Error('Failed to extract text');
	const data = await res.json();
	return data.text || '';
}
