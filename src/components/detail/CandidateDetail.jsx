export const CandidateDetail = ({ candidate, onBack }) => {
	if (!candidate) return null;
	const scores = candidate.category_scores || { education: 0, experience: 0, traits: 0, industry_fit: 0 };
	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
			<div className="lg:col-span-3 space-y-4">
				<div className="rounded border p-4">
					<h2 className="mb-2 text-lg font-semibold text-hilb-navy-dark">Resume Preview</h2>
					<div className="h-64 rounded border bg-gray-50 p-3 text-sm text-gray-500">Embedded PDF viewer placeholder</div>
				</div>
			</div>
			<div className="lg:col-span-2 space-y-4">
				<div className="rounded border p-4">
					<h3 className="mb-2 text-hilb-navy-dark font-semibold">Candidate Info</h3>
					<div className="space-y-1 text-sm">
						<div><span className="font-medium">Name:</span> {candidate.name}</div>
						<div><span className="font-medium">Email:</span> {candidate.email || '-'}</div>
						<div><span className="font-medium">Phone:</span> {candidate.phone || '-'}</div>
						<div><span className="font-medium">Position:</span> {candidate.position_type === 'early_career' ? 'Early Career' : 'General'}</div>
					</div>
				</div>
				<div className="rounded border p-4">
					<h3 className="mb-2 text-hilb-navy-dark font-semibold">Score Dashboard</h3>
					<div className="grid grid-cols-2 gap-3 text-sm">
						<div className="rounded bg-lime-50 p-3"><div className="text-xs text-gray-500">Overall</div><div className="text-2xl font-bold text-hilb-navy-dark">{candidate.overall_score ?? 0}</div></div>
						<div className="rounded bg-gray-50 p-3"><div className="text-xs text-gray-500">Position</div><div className="text-2xl font-bold text-hilb-navy-dark">{candidate.position_specific_score ?? 0}</div></div>
						<div className="rounded bg-gray-50 p-3"><div className="text-xs text-gray-500">Education</div><div className="text-xl font-semibold text-hilb-navy-dark">{scores.education}</div></div>
						<div className="rounded bg-gray-50 p-3"><div className="text-xs text-gray-500">Experience</div><div className="text-xl font-semibold text-hilb-navy-dark">{scores.experience}</div></div>
						<div className="rounded bg-gray-50 p-3"><div className="text-xs text-gray-500">Traits</div><div className="text-xl font-semibold text-hilb-navy-dark">{scores.traits}</div></div>
						<div className="rounded bg-gray-50 p-3"><div className="text-xs text-gray-500">Industry Fit</div><div className="text-xl font-semibold text-hilb-navy-dark">{scores.industry_fit}</div></div>
					</div>
				</div>
				<div className="rounded border p-4">
					<h3 className="mb-2 text-hilb-navy-dark font-semibold">Strengths</h3>
					<div className="flex flex-wrap gap-2">
						{(candidate.strengths || []).map((s, i) => (
							<span key={i} className="rounded bg-lime-100 px-2 py-1 text-xs text-lime-800 border border-lime-300">{s}</span>
						))}
						{(candidate.strengths || []).length === 0 && <div className="text-sm text-gray-500">None</div>}
					</div>
				</div>
				<div className="rounded border p-4">
					<h3 className="mb-2 text-hilb-navy-dark font-semibold">Concerns</h3>
					<div className="flex flex-wrap gap-2">
						{(candidate.concerns || []).map((s, i) => (
							<span key={i} className="rounded bg-amber-100 px-2 py-1 text-xs text-amber-800 border border-amber-300">{s}</span>
						))}
						{(candidate.concerns || []).length === 0 && <div className="text-sm text-gray-500">None</div>}
					</div>
				</div>
				<div className="flex gap-3">
					<button className="rounded border border-hilb-navy px-3 py-2 text-hilb-navy hover:bg-hilb-navy hover:text-white" onClick={onBack}>Back to Dashboard</button>
					<button className="rounded bg-hilb-lime px-3 py-2 text-white hover:bg-hilb-lime-dark">Save All Changes</button>
				</div>
			</div>
		</div>
	);
};
