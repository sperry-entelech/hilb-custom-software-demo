export async function analyzeResume({ candidate, positionType, resumeText }) {
	const response = await fetch('/api/analyze', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ candidate, positionType, resumeText }),
	});
	if (!response.ok) {
		throw new Error(`Analyze API failed: ${response.status}`);
	}
	return await response.json();
}
