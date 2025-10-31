import { useState } from 'react';
import { exportCandidatePDF } from '../../services/export.js';
import { updateCandidate } from '../../services/candidates.js';
import { LockedFeatureBadge } from '../shared/LockedFeatureBadge.jsx';

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
				<div className="rounded border border-[#3d3d3d] bg-[#2d2d2d] p-6 shadow-corp">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="text-lg font-semibold text-white">Resume Preview</h2>
						{candidate.resume_url && (
							<a 
								href={candidate.resume_url} 
								target="_blank" 
								rel="noopener noreferrer"
								className="text-sm text-corp-green hover:underline"
							>
								Download Original PDF →
							</a>
						)}
					</div>
					<div className="h-96 rounded border border-[#3d3d3d] bg-[#2d2d2d] p-4 overflow-auto">
						{candidate.resume_text ? (
							<pre className="whitespace-pre-wrap font-sans text-xs text-white leading-relaxed">
								{candidate.resume_text}
							</pre>
						) : (
							<div className="flex h-full items-center justify-center text-corp-green">
								<div className="text-center">
									<div className="mb-2 text-4xl">📄</div>
									<div className="text-sm">Resume text not available</div>
									{candidate.resume_url && (
										<a 
											href={candidate.resume_url} 
											target="_blank" 
											rel="noopener noreferrer"
											className="mt-2 inline-block text-sm text-corp-blue hover:underline"
										>
											View PDF
										</a>
									)}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="lg:col-span-2 space-y-6">
				<div className="rounded border border-[#3d3d3d] bg-[#2d2d2d] p-6 shadow-corp">
					<h3 className="mb-4 text-white font-semibold">Candidate Info</h3>
					<div className="space-y-2 text-sm text-white">
						<div><span className="font-medium">Name:</span> {candidate.name}</div>
						<div><span className="font-medium">Email:</span> {candidate.email || '-'}</div>
						<div><span className="font-medium">Phone:</span> {candidate.phone || '-'}</div>
						<div><span className="font-medium">Position:</span> {candidate.position_type === 'early_career' ? 'Early Career' : 'General'}</div>
					</div>
				</div>
				<div className="rounded border border-[#3d3d3d] bg-[#2d2d2d] p-6 shadow-corp">
					<h3 className="mb-4 text-white font-semibold">Score Dashboard</h3>
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div className="rounded bg-corp-green/10 border border-corp-green p-4">
							<div className="text-xs text-corp-green mb-1">Overall</div>
							<div className="text-2xl font-bold text-corp-green-dark">{candidate.overall_score ?? 0}</div>
						</div>
						<div className="rounded bg-[#3d3d3d] border border-[#3d3d3d] p-4">
							<div className="text-xs text-corp-green mb-1">Position</div>
							<div className="text-2xl font-bold text-white">{candidate.position_specific_score ?? 0}</div>
						</div>
						<div className="rounded bg-[#3d3d3d] border border-[#3d3d3d] p-4">
							<div className="text-xs text-corp-green mb-1">Education</div>
							<div className="text-xl font-semibold text-white">{scores.education}</div>
						</div>
						<div className="rounded bg-[#3d3d3d] border border-[#3d3d3d] p-4">
							<div className="text-xs text-corp-green mb-1">Experience</div>
							<div className="text-xl font-semibold text-white">{scores.experience}</div>
						</div>
						<div className="rounded bg-[#3d3d3d] border border-[#3d3d3d] p-4">
							<div className="text-xs text-corp-green mb-1">Traits</div>
							<div className="text-xl font-semibold text-white">{scores.traits}</div>
						</div>
						<div className="rounded bg-[#3d3d3d] border border-[#3d3d3d] p-4">
							<div className="text-xs text-corp-green mb-1">Industry Fit</div>
							<div className="text-xl font-semibold text-white">{scores.industry_fit}</div>
						</div>
					</div>
				</div>
				<div className="rounded border border-[#3d3d3d] bg-[#2d2d2d] p-6 shadow-corp">
					<h3 className="mb-4 text-white font-semibold">Strengths</h3>
					<div className="flex flex-wrap gap-2">
						{strengths.map((s, i) => (
							<span key={i} className="rounded bg-corp-green/10 border border-corp-green px-2 py-1 text-xs text-corp-green-dark">{s}</span>
						))}
						{strengths.length === 0 && <div className="text-sm text-corp-green">None</div>}
					</div>
				</div>
				<div className="rounded border border-[#3d3d3d] bg-[#2d2d2d] p-6 shadow-corp">
					<h3 className="mb-4 text-white font-semibold">Concerns</h3>
					<div className="flex flex-wrap gap-2">
						{concerns.map((s, i) => (
							<span key={i} className="rounded bg-amber-900/30 border border-amber-600 px-2 py-1 text-xs text-amber-200">{s}</span>
						))}
						{concerns.length === 0 && <div className="text-sm text-corp-green">None</div>}
					</div>
				</div>
				<div className="rounded border border-[#3d3d3d] bg-[#2d2d2d] p-6 shadow-corp">
					<h3 className="mb-4 text-white font-semibold">Notes</h3>
					<textarea
						value={notes}
						onChange={(e) => setNotes(e.target.value)}
						placeholder="Add internal notes about this candidate..."
						className="w-full rounded border border-[#3d3d3d] bg-[#2d2d2d] px-3 py-2 text-sm text-white placeholder:text-[#666666] focus:border-corp-green focus:outline-none resize-y min-h-24"
					/>
					<div className="mt-3 flex items-center justify-between">
						<span className="text-xs text-corp-green">
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
				{/* Locked Features Section */}
				<div className="rounded border-2 border-dashed border-[#3d3d3d] bg-[#3d3d3d]/20 p-6">
					<h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
						<span>🔒</span>
						<span>Planned Features</span>
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<LockedFeatureBadge 
								featureName="Interview Scheduler" 
								tooltip="Schedule interviews with calendar integration"
							/>
							<LockedFeatureBadge 
								featureName="Activity Timeline" 
								tooltip="Complete history of all actions on this candidate"
							/>
						</div>
						<div className="space-y-2">
							<LockedFeatureBadge 
								featureName="Team Comments" 
								tooltip="Collaborative comments with @mentions and threading"
							/>
							<LockedFeatureBadge 
								featureName="Email Candidate" 
								tooltip="Send status updates and communications"
							/>
						</div>
					</div>
				</div>
				<div className="flex gap-3">
					<button className="rounded border border-[#3d3d3d] px-4 py-2 text-white hover:bg-[#3d3d3d] transition-colors" onClick={onBack}>Back to Dashboard</button>
					<button
						onClick={() => exportCandidatePDF(candidate)}
						className="rounded border border-[#3d3d3d] px-4 py-2 text-white hover:bg-[#3d3d3d] transition-colors"
					>
						Export PDF
					</button>
					<button className="rounded bg-corp-blue px-4 py-2 text-white font-semibold hover:bg-corp-blue-dark transition-colors">Save All Changes</button>
				</div>
			</div>
		</div>
	);
};
