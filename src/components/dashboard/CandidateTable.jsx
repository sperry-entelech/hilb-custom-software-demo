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
		if (score >= 51) return 'bg-amber-100 text-amber-800 border-amber-300';
		return 'bg-red-100 text-red-800 border-red-300';
	}
	function statusBadge(status) {
		const map = {
			pending: 'bg-gray-200 text-gray-700',
			qualified: 'bg-corp-green/20 text-corp-green-dark',
			rejected: 'bg-red-100 text-red-800',
			interviewed: 'bg-blue-100 text-blue-800',
			hired: 'bg-corp-green/20 text-corp-green-dark',
		};
		return map[status] || 'bg-gray-200 text-gray-700';
	}
	return (
		<div className="overflow-x-auto rounded border border-corp-gray bg-white shadow-corp">
			<table className="min-w-full divide-y divide-corp-gray">
				<thead className="bg-corp-gray-light">
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
						<th className="px-6 py-4 text-corp-text font-semibold">Candidate</th>
						<th className="px-6 py-4 text-corp-text font-semibold">Position</th>
						<th className="px-6 py-4 text-corp-text font-semibold">Overall</th>
						<th className="px-6 py-4 text-corp-text font-semibold">Degree</th>
						<th className="px-6 py-4 text-corp-text font-semibold">Top Strength</th>
						<th className="px-6 py-4 text-corp-text font-semibold">Status</th>
						<th className="px-6 py-4 text-corp-text font-semibold">Actions</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-corp-gray bg-white">
					{candidates.map((c) => (
						<tr key={c.id} className="text-sm text-corp-text hover:bg-corp-gray-light transition-colors">
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
								<button className="hover:text-corp-blue transition-colors" onClick={() => onSelect?.(c)}>{c.name}</button>
							</td>
							<td className="px-6 py-4">
								<span className={`rounded px-2 py-1 text-xs ${c.position_type === 'early_career' ? 'bg-corp-green text-white' : 'bg-corp-blue text-white'}`}>
									{c.position_type === 'early_career' ? 'Early Career' : 'General'}
								</span>
							</td>
							<td className="px-6 py-4">
								<span className={`inline-block rounded border px-2 py-1 text-xs font-medium ${badgeForScore(c.overall_score ?? 0)}`}>{c.overall_score ?? 0}</span>
							</td>
							<td className="px-6 py-4 text-corp-text-light">{c.degree_field || '-'}</td>
							<td className="px-6 py-4 text-corp-text-light">{Array.isArray(c.strengths) ? c.strengths[0] : '-'}</td>
							<td className="px-6 py-4">
								<span className={`rounded px-2 py-1 text-xs ${statusBadge(c.status || 'pending')}`}>{c.status || 'pending'}</span>
							</td>
							<td className="px-6 py-4">
								<button className="rounded border border-corp-blue px-3 py-1 text-xs text-corp-blue hover:bg-corp-blue hover:text-white transition-colors" onClick={() => onSelect?.(c)}>View</button>
							</td>
						</tr>
					))}
					{candidates.length === 0 && (
						<tr>
							<td colSpan={onSelectionChange ? 8 : 7} className="px-6 py-10 text-center text-sm text-corp-text-light">
								No candidates yet. Upload resumes to get started.
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};
