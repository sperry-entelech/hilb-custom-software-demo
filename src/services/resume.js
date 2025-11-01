export async function extractPdfText(file) {
	try {
		// Validate file type
		if (!file || file.type !== 'application/pdf') {
			throw new Error(`Invalid file type: ${file?.type || 'unknown'}. Please upload a PDF file.`);
		}
		
		// Convert File to ArrayBuffer for proper binary transfer
		const arrayBuffer = await file.arrayBuffer();
		
		if (arrayBuffer.byteLength === 0) {
			throw new Error('File is empty. Please upload a valid PDF file.');
		}
		
		const res = await fetch('/api/extract-text', {
			method: 'POST',
			headers: { 'Content-Type': 'application/pdf' },
			body: arrayBuffer,
		});
		
		if (!res.ok) {
			let errorData;
			try {
				errorData = await res.json();
			} catch {
				errorData = { error: `HTTP ${res.status}`, details: res.statusText };
			}
			
			// Combine error message and details
			const errorMsg = errorData.error || 'Failed to extract text';
			const errorDetails = errorData.details || `HTTP ${res.status}: ${res.statusText}`;
			const fullError = errorDetails && errorDetails !== errorMsg
				? `${errorMsg} - ${errorDetails}`
				: errorMsg;
			
			const error = new Error(fullError);
			error.error = errorData.error;
			error.details = errorDetails;
			throw error;
		}
		
		const data = await res.json();
		
		if (!data || typeof data.text !== 'string') {
			throw new Error('Invalid response from server. Expected text field in response.');
		}
		
		return data.text || '';
		
	} catch (error) {
		// Re-throw as-is if it's already our formatted error
		if (error.message && error.message.includes('Invalid file') || error.message.includes('File is empty')) {
			throw error;
		}
		
		// Re-throw if it already has error.details
		if (error.details || error.error) {
			throw error;
		}
		
		// Otherwise wrap in a more informative error
		const wrappedError = new Error(`Failed to extract text from PDF: ${error.message || 'Unknown error occurred'}`);
		wrappedError.cause = error;
		wrappedError.originalError = error;
		throw wrappedError;
	}
}
