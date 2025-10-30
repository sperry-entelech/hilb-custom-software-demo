import { useState } from 'react';
import { UploadZone } from './UploadZone.jsx';
import { UploadForm } from './UploadForm.jsx';
import { extractPdfText } from '../../services/resume.js';

export const UploadPage = () => {
	const [files, setFiles] = useState([]);
	const [form, setForm] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	async function handleProcess() {
		if (!form || files.length === 0) return;
		setLoading(true);
		setError('');
		try {
			const first = files[0];
			const text = await extractPdfText(first);
			console.log('Extracted text length:', text.length);
			alert(`Extracted ${text.length} characters from PDF. Ready for analysis.`);
		} catch (e) {
			setError(e.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="space-y-6">
			<UploadZone onFilesSelected={(f) => setFiles(f.slice(0, 10))} />
			<UploadForm onSubmit={(data) => setForm(data)} />
			<div className="flex items-center gap-3">
				<button
					onClick={handleProcess}
					disabled={loading || !form || files.length === 0}
					className="rounded bg-hilb-navy px-4 py-2 font-semibold text-white hover:bg-hilb-navy-light disabled:opacity-50"
				>
					{loading ? 'Processing…' : 'Extract Text'}
				</button>
				<span className="text-sm text-gray-500">Selected: {files.length} file(s)</span>
			</div>
			{error && <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
		</div>
	);
};
