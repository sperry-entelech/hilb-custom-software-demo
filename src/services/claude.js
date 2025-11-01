export async function analyzeResume({ candidate, positionType, resumeText }) {
	try {
		const response = await fetch('/api/analyze', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ candidate, positionType, resumeText }),
		});
		
		if (!response.ok) {
			let errorData;
			try {
				errorData = await response.json();
			} catch {
				errorData = { error: `HTTP ${response.status}`, details: response.statusText };
			}
			
			const errorMsg = errorData.error || `Analyze API failed: ${response.status}`;
			const errorDetails = errorData.details || response.statusText;
			const fullError = errorDetails && errorDetails !== errorMsg
				? `${errorMsg} - ${errorDetails}`
				: errorMsg;
			
			const error = new Error(fullError);
			error.error = errorData.error;
			error.details = errorDetails;
			throw error;
		}
		
		const data = await response.json();
		
		if (!data || typeof data !== 'object') {
			throw new Error('Invalid response from analyze API. Expected JSON object.');
		}
		
		return data;
	} catch (error) {
		// Re-throw as-is if it already has error.details
		if (error.details || error.error) {
			throw error;
		}
		
		// Otherwise wrap with context
		const wrappedError = new Error(`Failed to analyze resume: ${error.message || 'Unknown error'}`);
		wrappedError.cause = error;
		wrappedError.originalError = error;
		throw wrappedError;
	}
}
