export const BulkActions = ({ selectedIds, candidates, onBulkStatusUpdate, onBulkDelete, onClearSelection }) => {
	if (selectedIds.length === 0) return null;

	const handleStatusChange = async (newStatus) => {
		await onBulkStatusUpdate?.(selectedIds, newStatus);
		onClearSelection?.();
	};

	const handleDelete = async () => {
		if (confirm(`Delete ${selectedIds.length} candidate(s)?`)) {
			await onBulkDelete?.(selectedIds);
			onClearSelection?.();
		}
	};

	return (
		<div className="mb-4 rounded border border-[#3d3d3d] bg-[#3d3d3d] p-4 shadow-corp">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium text-white">{selectedIds.length} selected</span>
				<div className="flex gap-2">
					<select
						onChange={(e) => handleStatusChange(e.target.value)}
						className="rounded border border-[#3d3d3d] bg-[#2d2d2d] px-3 py-1 text-sm text-white focus:border-corp-green focus:outline-none"
					>
						<option value="">Update Status...</option>
						<option value="pending">Pending</option>
						<option value="qualified">Qualified</option>
						<option value="rejected">Rejected</option>
						<option value="interviewed">Interviewed</option>
						<option value="hired">Hired</option>
					</select>
					<button
						onClick={handleDelete}
						className="rounded border border-red-600 bg-[#2d2d2d] px-3 py-1 text-sm text-red-400 hover:bg-red-900/30 transition-colors"
					>
						Delete
					</button>
					<button
						onClick={onClearSelection}
						className="rounded border border-[#3d3d3d] bg-[#2d2d2d] px-3 py-1 text-sm text-white hover:bg-[#4d4d4d] transition-colors"
					>
						Clear
					</button>
				</div>
			</div>
		</div>
	);
};

