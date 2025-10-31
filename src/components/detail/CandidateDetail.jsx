export const CandidateDetail = ({ candidate, onBack }) => {
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
			<div className="lg:col-span-3 space-y-4">
				<div className="rounded-lg border border-gray-800 bg-gray-800/50 p-4">
					<h2 className="mb-2 text-lg font-semibold text-hilb-lime">Resume Preview</h2>
					<div className="h-64 rounded border border-gray-700 bg-gray-900 p-3 text-sm text-gray-400">Embedded PDF viewer placeholder</div>
				</div>
			</div>
			<div className="lg:col-span-2 space-y-4">
				<div className="rounded-lg border border-gray-800 bg-gray-800/50 p-4">
					<h3 className="mb-2 text-hilb-lime font-semibold">Candidate Info</h3>
					<div className="space-y-1 text-sm text-gray-300">
						<div><span className="font-medium text-gray-200">Name:</span> {candidate.name}</div>
						<div><span className="font-medium text-gray-200">Email:</span> {candidate.email || '-'}</div>
						<div><span className="font-medium text-gray-200">Phone:</span> {candidate.phone || '-'}</div>
						<div><span className="font-medium text-gray-200">Position:</span> {candidate.position_type === 'early_career' ? 'Early Career' : 'General'}</div>
					</div>
				</div>
				<div className="rounded-lg border border-gray-800 bg-gray-800/50 p-4">
					<h3 className="mb-2 text-hilb-lime font-semibold">Score Dashboard</h3>
					<div className="grid grid-cols-2 gap-3 text-sm">
						<div className="rounded bg-hilb-lime/20 border border-hilb-lime/40 p-3">
							<div className="text-xs text-gray-400">Overall</div>
							<div className="text-2xl font-bold text-hilb-lime">{candidate.overall_score ?? 0}</div>
						</div>
						<div className="rounded bg-gray-700/50 border border-gray-600 p-3">
							<div className="text-xs text-gray-400">Position</div>
							<div className="text-2xl font-bold text-gray-200">{candidate.position_specific_score ?? 0}</div>
						</div>
						<div className="rounded bg-gray-700/50 border border-gray-600 p-3">
							<div className="text-xs text-gray-400">Education</div>
							<div className="text-xl font-semibold text-gray-200">{scores.education}</div>
						</div>
						<div className="rounded bg-gray-700/50 border border-gray-600 p-3">
							<div className="text-xs text-gray-400">Experience</div>
							<div className="text-xl font-semibold text-gray-200">{scores.experience}</div>
						</div>
						<div className="rounded bg-gray-700/50 border border-gray-600 p-3">
							<div className="text-xs text-gray-400">Traits</div>
							<div className="text-xl font-semibold text-gray-200">{scores.traits}</div>
						</div>
						<div className="rounded bg-gray-700/50 border border-gray-600 p-3">
							<div className="text-xs text-gray-400">Industry Fit</div>
							<div className="text-xl font-semibold text-gray-200">{scores.industry_fit}</div>
						</div>
					</div>
				</div>
				<div className="rounded-lg border border-gray-800 bg-gray-800/50 p-4">
					<h3 className="mb-2 text-hilb-lime font-semibold">Strengths</h3>
					<div className="flex flex-wrap gap-2">
						{strengths.map((s, i) => (
							<span key={i} className="rounded bg-hilb-lime/20 border border-hilb-lime/40 px-2 py-1 text-xs text-hilb-lime">{s}</span>
						))}
						{strengths.length === 0 && <div className="text-sm text-gray-400">None</div>}
					</div>
				</div>
				<div className="rounded-lg border border-gray-800 bg-gray-800/50 p-4">
					<h3 className="mb-2 text-hilb-lime font-semibold">Concerns</h3>
					<div className="flex flex-wrap gap-2">
						{concerns.map((s, i) => (
							<span key={i} className="rounded bg-amber-500/20 border border-amber-500/40 px-2 py-1 text-xs text-amber-400">{s}</span>
						))}
						{concerns.length === 0 && <div className="text-sm text-gray-400">None</div>}
					</div>
				</div>
				<div className="flex gap-3">
					<button className="rounded border border-gray-700 px-3 py-2 text-gray-300 hover:bg-gray-700 transition-colors" onClick={onBack}>Back to Dashboard</button>
					<button className="rounded bg-hilb-lime px-3 py-2 text-gray-900 font-semibold hover:bg-hilb-lime-dark transition-colors">Save All Changes</button>
				</div>
			</div>
		</div>
	);
};
