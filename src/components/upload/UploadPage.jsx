import { useState } from 'react';
import { UploadZone } from './UploadZone.jsx';
import { UploadForm } from './UploadForm.jsx';
import { extractPdfText } from '../../services/resume.js';
import { analyzeResume } from '../../services/claude.js';
import { saveCandidate } from '../../services/candidates.js';

export const UploadPage = ({ onUploadComplete }) => {
	const [files, setFiles] = useState([]);
	const [form, setForm] = useState(null);
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState('');
	const [error, setError] = useState('');

	async function handleProcess() {
		if (!form || files.length === 0) return;
		setLoading(true);
		setError('');
		try {
			const first = files[0];
			setProgress('Extracting text from PDF...');
			const resumeText = await extractPdfText(first);
			
			setProgress('Analyzing resume with AI...');
			const analysis = await analyzeResume({
				candidate: { name: form.name },
				positionType: form.positionType,
				resumeText,
			});

			setProgress('Saving candidate data...');
			await saveCandidate({
				candidateInfo: form,
				resumeFile: first,
				resumeText,
				analysis,
			});

			setProgress('Complete!');
			setTimeout(() => {
				onUploadComplete?.();
				setFiles([]);
				setForm(null);
				setProgress('');
			}, 1000);
		} catch (e) {
			setError(e.message || 'Processing failed');
			setProgress('');
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
				className="rounded bg-corp-blue px-6 py-3 font-semibold text-white hover:bg-corp-blue-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			>
				{loading ? 'Processing…' : 'Analyze & Save'}
			</button>
			{files.length > 0 && <span className="text-sm text-corp-green">Selected: {files.length} file(s)</span>}
		</div>
		{progress && (
			<div className="rounded bg-corp-green/10 border border-corp-green p-3 text-sm text-corp-green-dark">
				{progress}
			</div>
		)}
		{error && <div className="rounded border border-red-600 bg-red-900/30 p-3 text-sm text-red-300">{error}</div>}
		</div>
	);
};
