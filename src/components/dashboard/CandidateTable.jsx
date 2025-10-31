export const CandidateTable = ({ candidates = [], onSelect, selectedIds = [], onSelectionChange }) => {
	const toggleSelection = (id) => {
		if (onSelectionChange) {
			if (selectedIds.includes(id)) {
				onSelectionChange(selectedIds.filter(i => i !== id));
			} else {
				onSelectionChange([...selectedIds, id]);
			}
		}
	};

	const toggleAll = () => {
		if (onSelectionChange) {
			if (selectedIds.length === candidates.length) {
				onSelectionChange([]);
			} else {
				onSelectionChange(candidates.map(c => c.id));
			}
		}
	};
	function badgeForScore(score) {
		if (score >= 76) return 'bg-corp-green/20 text-corp-green-dark border-corp-green';
		if (score >= 51) return 'bg-amber-900/30 text-amber-200 border-amber-600';
		return 'bg-red-900/30 text-red-300 border-red-600';
	}
	function statusBadge(status) {
		const map = {
			pending: 'bg-[#3d3d3d] text-[#cccccc]',
			qualified: 'bg-corp-green/20 text-corp-green-dark',
			rejected: 'bg-red-900/30 text-red-300',
			interviewed: 'bg-blue-900/30 text-blue-300',
			hired: 'bg-corp-green/20 text-corp-green-dark',
		};
		return map[status] || 'bg-[#3d3d3d] text-[#cccccc]';
	}
	return (
		<div className="overflow-x-auto rounded border border-[#3d3d3d] bg-[#2d2d2d] shadow-corp">
			<table className="min-w-full divide-y divide-[#3d3d3d]">
				<thead className="bg-[#3d3d3d]">
					<tr className="text-left text-sm">
						{onSelectionChange && (
							<th className="px-6 py-4">
								<input
									type="checkbox"
									checked={selectedIds.length === candidates.length && candidates.length > 0}
									onChange={toggleAll}
									className="cursor-pointer"
								/>
							</th>
						)}
						<th className="px-6 py-4 text-white font-semibold">Candidate</th>
						<th className="px-6 py-4 text-white font-semibold">Position</th>
						<th className="px-6 py-4 text-white font-semibold">Overall</th>
						<th className="px-6 py-4 text-white font-semibold">Degree</th>
						<th className="px-6 py-4 text-white font-semibold">Top Strength</th>
						<th className="px-6 py-4 text-white font-semibold">Status</th>
						<th className="px-6 py-4 text-white font-semibold">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-[#3d3d3d] bg-[#2d2d2d]">
					{candidates.map((c) => (
						<tr key={c.id} className="text-sm text-[#cccccc] hover:bg-[#3d3d3d] transition-colors">
							{onSelectionChange && (
								<td className="px-6 py-4">
									<input
										type="checkbox"
										checked={selectedIds.includes(c.id)}
										onChange={() => toggleSelection(c.id)}
										className="cursor-pointer"
									/>
								</td>
							)}
							<td className="px-6 py-4 font-medium">
								<button className="text-white hover:text-corp-green transition-colors" onClick={() => onSelect?.(c)}>{c.name}</button>
							</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap ${c.position_type === 'early_career' ? 'bg-theme-dark text-theme-tan border border-theme-gray' : 'bg-theme-gray text-theme-tan-light border border-theme-dark'}`}>
									{c.position_type === 'early_career' ? 'Early Career' : 'General'}
								</span>
							</td>
							<td className="px-6 py-4">
								<span className={`inline-block rounded border px-2 py-1 text-xs font-medium ${badgeForScore(c.overall_score ?? 0)}`}>{c.overall_score ?? 0}</span>
							</td>
							<td className="px-6 py-4 text-corp-green">{c.degree_field || '-'}</td>
							<td className="px-6 py-4 text-corp-green">{Array.isArray(c.strengths) ? c.strengths[0] : '-'}</td>
							<td className="px-6 py-4">
								<span className={`rounded px-2 py-1 text-xs ${statusBadge(c.status || 'pending')}`}>{c.status || 'pending'}</span>
							</td>
							<td className="px-6 py-4">
								<button className="rounded border border-corp-green px-3 py-1 text-xs text-corp-green hover:bg-corp-green hover:text-[#1e1e1e] transition-colors" onClick={() => onSelect?.(c)}>View</button>
							</td>
						</tr>
					))}
					{candidates.length === 0 && (
						<tr>
							<td colSpan={onSelectionChange ? 8 : 7} className="px-6 py-10 text-center text-sm text-corp-green">
								No candidates yet. Upload resumes to get started.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};
