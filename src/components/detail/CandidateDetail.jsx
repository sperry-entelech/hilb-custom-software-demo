import { useState } from 'react';
import { exportCandidatePDF } from '../../services/export.js';
import { updateCandidate } from '../../services/candidates.js';

export const CandidateDetail = ({ candidate, onBack, onUpdate }) => {
	const [notes, setNotes] = useState(candidate.notes || '');
	const [saving, setSaving] = useState(false);

	async function handleSaveNotes() {
		setSaving(true);
		try {
			await updateCandidate(candidate.id, { notes });
			onUpdate?.();
		} catch (error) {
			console.error('Failed to save notes:', error);
			alert('Failed to save notes');
		} finally {
			setSaving(false);
		}
	}

	if (!candidate) return null;
	const scores = {
		education: candidate.education_score ?? 0,
		experience: candidate.experience_score ?? 0,
		traits: candidate.traits_score ?? 0,
		industry_fit: candidate.industry_fit_score ?? 0,
	};
	const strengths = Array.isArray(candidate.strengths) ? candidate.strengths : [];
	const concerns = Array.isArray(candidate.concerns) ? candidate.concerns : [];
	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
			<div className="lg:col-span-3 space-y-6">
				<div className="rounded border border-corp-gray bg-white p-6 shadow-corp">
					<h2 className="mb-4 text-lg font-semibold text-corp-text">Resume Preview</h2>
					<div className="h-96 rounded border border-corp-gray bg-corp-gray-light p-4 text-sm text-corp-text-light">Embedded PDF viewer placeholder</div>
				</div>
			</div>
			<div className="lg:col-span-2 space-y-6">
				<div className="rounded border border-corp-gray bg-white p-6 shadow-corp">
					<h3 className="mb-4 text-corp-text font-semibold">Candidate Info</h3>
					<div className="space-y-2 text-sm text-corp-text">
						<div><span className="font-medium">Name:</span> {candidate.name}</div>
						<div><span className="font-medium">Email:</span> {candidate.email || '-'}</div>
						<div><span className="font-medium">Phone:</span> {candidate.phone || '-'}</div>
						<div><span className="font-medium">Position:</span> {candidate.position_type === 'early_career' ? 'Early Career' : 'General'}</div>
					</div>
				</div>
				<div className="rounded border border-corp-gray bg-white p-6 shadow-corp">
					<h3 className="mb-4 text-corp-text font-semibold">Score Dashboard</h3>
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div className="rounded bg-corp-green/10 border border-corp-green p-4">
							<div className="text-xs text-corp-text-light mb-1">Overall</div>
							<div className="text-2xl font-bold text-corp-green-dark">{candidate.overall_score ?? 0}</div>
						</div>
						<div className="rounded bg-corp-gray-light border border-corp-gray p-4">
							<div className="text-xs text-corp-text-light mb-1">Position</div>
							<div className="text-2xl font-bold text-corp-text">{candidate.position_specific_score ?? 0}</div>
						</div>
						<div className="rounded bg-corp-gray-light border border-corp-gray p-4">
							<div className="text-xs text-corp-text-light mb-1">Education</div>
							<div className="text-xl font-semibold text-corp-text">{scores.education}</div>
						</div>
						<div className="rounded bg-corp-gray-light border border-corp-gray p-4">
							<div className="text-xs text-corp-text-light mb-1">Experience</div>
							<div className="text-xl font-semibold text-corp-text">{scores.experience}</div>
						</div>
						<div className="rounded bg-corp-gray-light border border-corp-gray p-4">
							<div className="text-xs text-corp-text-light mb-1">Traits</div>
							<div className="text-xl font-semibold text-corp-text">{scores.traits}</div>
						</div>
						<div className="rounded bg-corp-gray-light border border-corp-gray p-4">
							<div className="text-xs text-corp-text-light mb-1">Industry Fit</div>
							<div className="text-xl font-semibold text-corp-text">{scores.industry_fit}</div>
						</div>
					</div>
				</div>
				<div className="rounded border border-corp-gray bg-white p-6 shadow-corp">
					<h3 className="mb-4 text-corp-text font-semibold">Strengths</h3>
					<div className="flex flex-wrap gap-2">
						{strengths.map((s, i) => (
							<span key={i} className="rounded bg-corp-green/10 border border-corp-green px-2 py-1 text-xs text-corp-green-dark">{s}</span>
						))}
						{strengths.length === 0 && <div className="text-sm text-corp-text-light">None</div>}
					</div>
				</div>
				<div className="rounded border border-corp-gray bg-white p-6 shadow-corp">
					<h3 className="mb-4 text-corp-text font-semibold">Concerns</h3>
					<div className="flex flex-wrap gap-2">
						{concerns.map((s, i) => (
							<span key={i} className="rounded bg-amber-100 border border-amber-300 px-2 py-1 text-xs text-amber-800">{s}</span>
						))}
						{concerns.length === 0 && <div className="text-sm text-corp-text-light">None</div>}
					</div>
				</div>
				<div className="rounded border border-corp-gray bg-white p-6 shadow-corp">
					<h3 className="mb-4 text-corp-text font-semibold">Notes</h3>
					<textarea
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						placeholder="Add internal notes about this candidate..."
						className="w-full rounded border border-corp-gray bg-white px-3 py-2 text-sm text-corp-text focus:border-corp-blue focus:outline-none resize-y min-h-24"
					/>
					<div className="mt-3 flex items-center justify-between">
						<span className="text-xs text-corp-text-light">
							{candidate.updated_at ? `Last updated: ${new Date(candidate.updated_at).toLocaleString()}` : ''}
						</span>
						<button
							onClick={handleSaveNotes}
							disabled={saving}
							className="rounded bg-corp-green px-3 py-1 text-sm text-white hover:bg-corp-green-dark transition-colors disabled:opacity-50"
						>
							{saving ? 'Saving...' : 'Save Notes'}
						</button>
					</div>
				</div>
				<div className="flex gap-3">
					<button className="rounded border border-corp-gray px-4 py-2 text-corp-text hover:bg-corp-gray-light transition-colors" onClick={onBack}>Back to Dashboard</button>
					<button
						onClick={() => exportCandidatePDF(candidate)}
						className="rounded border border-corp-gray px-4 py-2 text-corp-text hover:bg-corp-gray-light transition-colors"
					>
						Export PDF
					</button>
					<button className="rounded bg-corp-blue px-4 py-2 text-white font-semibold hover:bg-corp-blue-dark transition-colors">Save All Changes</button>
				</div>
			</div>
		</div>
	);
};
