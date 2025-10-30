export const CandidateTable = ({ candidates = [], onSelect }) => {
	function badgeForScore(score) {
		if (score >= 76) return 'bg-lime-100 text-lime-800 border-lime-300';
		if (score >= 51) return 'bg-amber-100 text-amber-800 border-amber-300';
		return 'bg-red-100 text-red-800 border-red-300';
	}
	function statusBadge(status) {
		const map = {
			pending: 'bg-gray-100 text-gray-700',
			qualified: 'bg-lime-100 text-lime-800',
			rejected: 'bg-red-100 text-red-800',
			interviewed: 'bg-blue-100 text-blue-800',
			hired: 'bg-lime-100 text-lime-800',
		};
		return map[status] || 'bg-gray-100 text-gray-700';
	}
	return (
		<div className="overflow-x-auto rounded border">
			<table className="min-w-full divide-y">
				<thead className="bg-gray-50">
					<tr className="text-left text-sm text-hilb-navy-dark">
						<th className="px-4 py-3">Candidate</th>
						<th className="px-4 py-3">Position</th>
						<th className="px-4 py-3">Overall</th>
						<th className="px-4 py-3">Degree</th>
						<th className="px-4 py-3">Top Strength</th>
						<th className="px-4 py-3">Status</th>
						<th className="px-4 py-3">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y">
					{candidates.map((c) => (
						<tr key={c.id} className="text-sm">
							<td className="px-4 py-3 font-medium text-hilb-navy-dark">
								<button className="hover:underline" onClick={() => onSelect?.(c)}>{c.name}</button>
							</td>
							<td className="px-4 py-3">
								<span className={`rounded px-2 py-1 text-xs ${c.position_type === 'early_career' ? 'bg-hilb-lime text-white' : 'bg-hilb-navy text-white'}`}>
									{c.position_type === 'early_career' ? 'Early Career' : 'General'}
								</span>
							</td>
							<td className="px-4 py-3">
								<span className={`inline-block rounded border px-2 py-1 text-xs ${badgeForScore(c.overall_score ?? 0)}`}>{c.overall_score ?? 0}</span>
							</td>
							<td className="px-4 py-3">{c.degree_field || '-'}</td>
							<td className="px-4 py-3">{c.strengths?.[0] || '-'}</td>
							<td className="px-4 py-3">
								<span className={`rounded px-2 py-1 text-xs ${statusBadge(c.status || 'pending')}`}>{c.status || 'pending'}</span>
							</td>
							<td className="px-4 py-3">
								<button className="rounded border border-hilb-navy px-2 py-1 text-sm text-hilb-navy hover:bg-hilb-navy hover:text-white" onClick={() => onSelect?.(c)}>View</button>
							</td>
						</tr>
					))}
					{candidates.length === 0 && (
						<tr>
							<td colSpan={7} className="px-4 py-10 text-center text-sm text-gray-500">
								No candidates yet. Upload resumes to get started.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};
