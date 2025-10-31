export const FilterBar = ({ onChange }) => {
	function emit(partial) {
		onChange?.(partial);
	}
	return (
		<div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-4">
			<select
				className="rounded border border-[#3d3d3d] bg-[#2d2d2d] px-3 py-2 text-white focus:border-corp-green focus:outline-none shadow-corp"
				onChange={(e) => emit({ positionType: e.target.value })}
			>
				<option value="all">All Positions</option>
				<option value="early_career">Early Career</option>
				<option value="general">General</option>
			</select>
			<select
				className="rounded border border-[#3d3d3d] bg-[#2d2d2d] px-3 py-2 text-white focus:border-corp-green focus:outline-none shadow-corp"
				onChange={(e) => emit({ scoreRange: e.target.value })}
			>
				<option value="all">All Scores</option>
				<option value="high">High (76-100)</option>
				<option value="medium">Medium (51-75)</option>
				<option value="low">Low (0-50)</option>
			</select>
			<select
				className="rounded border border-[#3d3d3d] bg-[#2d2d2d] px-3 py-2 text-white focus:border-corp-green focus:outline-none shadow-corp"
				onChange={(e) => emit({ status: e.target.value })}
			>
				<option value="all">All Statuses</option>
				<option value="pending">Pending</option>
				<option value="qualified">Qualified</option>
				<option value="rejected">Rejected</option>
				<option value="interviewed">Interviewed</option>
				<option value="hired">Hired</option>
			</select>
			<select
				className="rounded border border-[#3d3d3d] bg-[#2d2d2d] px-3 py-2 text-white focus:border-corp-green focus:outline-none shadow-corp"
				onChange={(e) => emit({ degree: e.target.value })}
			>
				<option value="all">All Degrees</option>
				<option value="business">Business</option>
				<option value="finance">Finance</option>
				<option value="risk">Risk Management</option>
				<option value="insurance">Insurance</option>
				<option value="economics">Economics</option>
				<option value="other">Other</option>
			</select>
		</div>
	);
};
