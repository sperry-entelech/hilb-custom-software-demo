export const CandidateTable = ({ candidates = [], onSelect }) => {
	function badgeForScore(score) {
		if (score >= 76) return 'bg-hilb-lime/20 text-hilb-lime border-hilb-lime/40';
		if (score >= 51) return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
		return 'bg-red-500/20 text-red-400 border-red-500/40';
	}
	function statusBadge(status) {
		const map = {
			pending: 'bg-gray-700 text-gray-300',
			qualified: 'bg-hilb-lime/20 text-hilb-lime',
			rejected: 'bg-red-500/20 text-red-400',
			interviewed: 'bg-blue-500/20 text-blue-400',
			hired: 'bg-hilb-lime/20 text-hilb-lime',
		};
		return map[status] || 'bg-gray-700 text-gray-300';
	}
	return (
		<div className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-800/50">
			<table className="min-w-full divide-y divide-gray-700">
				<thead className="bg-gray-800">
					<tr className="text-left text-sm">
						<th className="px-4 py-3 text-hilb-lime font-semibold">Candidate</th>
						<th className="px-4 py-3 text-hilb-lime font-semibold">Position</th>
						<th className="px-4 py-3 text-hilb-lime font-semibold">Overall</th>
						<th className="px-4 py-3 text-hilb-lime font-semibold">Degree</th>
						<th className="px-4 py-3 text-hilb-lime font-semibold">Top Strength</th>
						<th className="px-4 py-3 text-hilb-lime font-semibold">Status</th>
						<th className="px-4 py-3 text-hilb-lime font-semibold">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-800">
					{candidates.map((c) => (
						<tr key={c.id} className="text-sm text-gray-300 hover:bg-gray-800/70 transition-colors">
							<td className="px-4 py-3 font-medium">
								<button className="hover:text-hilb-lime transition-colors" onClick={() => onSelect?.(c)}>{c.name}</button>
							</td>
							<td className="px-4 py-3">
								<span className={`rounded px-2 py-1 text-xs ${c.position_type === 'early_career' ? 'bg-hilb-lime text-gray-900' : 'bg-gray-700 text-gray-300'}`}>
									{c.position_type === 'early_career' ? 'Early Career' : 'General'}
								</span>
							</td>
							<td className="px-4 py-3">
								<span className={`inline-block rounded border px-2 py-1 text-xs font-medium ${badgeForScore(c.overall_score ?? 0)}`}>{c.overall_score ?? 0}</span>
							</td>
							<td className="px-4 py-3 text-gray-400">{c.degree_field || '-'}</td>
							<td className="px-4 py-3 text-gray-400">{Array.isArray(c.strengths) ? c.strengths[0] : '-'}</td>
							<td className="px-4 py-3">
								<span className={`rounded px-2 py-1 text-xs ${statusBadge(c.status || 'pending')}`}>{c.status || 'pending'}</span>
							</td>
							<td className="px-4 py-3">
								<button className="rounded border border-hilb-lime px-3 py-1 text-xs text-hilb-lime hover:bg-hilb-lime hover:text-gray-900 transition-colors" onClick={() => onSelect?.(c)}>View</button>
							</td>
						</tr>
					))}
					{candidates.length === 0 && (
						<tr>
							<td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-400">
								No candidates yet. Upload resumes to get started.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};
