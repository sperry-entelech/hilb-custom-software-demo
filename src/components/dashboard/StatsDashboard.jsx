export const StatsDashboard = ({ candidates = [], onRoadmapClick }) => {
	if (candidates.length === 0) {
		return (
			<div className="mb-6 rounded border border-[#3d3d3d] bg-[#2d2d2d] p-6 shadow-corp">
				<p className="text-corp-green">No data available yet</p>
			</div>
		);
	}

	const total = candidates.length;
	const avgScore = total > 0
		? Math.round(candidates.reduce((sum, c) => sum + (c.overall_score || 0), 0) / total)
		: 0;

	// Status distribution
	const statusCounts = candidates.reduce((acc, c) => {
		const status = c.status || 'pending';
		acc[status] = (acc[status] || 0) + 1;
		return acc;
	}, {});

	// Score distribution (0-25, 26-50, 51-75, 76-100)
	const scoreRanges = {
		'0-25': 0,
		'26-50': 0,
		'51-75': 0,
		'76-100': 0,
	};
	candidates.forEach(c => {
		const score = c.overall_score || 0;
		if (score <= 25) scoreRanges['0-25']++;
		else if (score <= 50) scoreRanges['26-50']++;
		else if (score <= 75) scoreRanges['51-75']++;
		else scoreRanges['76-100']++;
	});

	const maxScoreCount = Math.max(...Object.values(scoreRanges));

	const LockedFeatureCard = ({ title, description, value = 'High' }) => {
		return (
			<div className="rounded border-2 border-dashed border-[#3d3d3d] bg-[#3d3d3d]/20 p-6 relative overflow-hidden">
				{/* Overlay */}
				<div className="absolute inset-0 bg-[#1e1e1e]/60 flex items-center justify-center z-10">
					<div className="text-center">
						<div className="text-4xl mb-2">🔒</div>
						<div className="text-sm font-semibold text-white">Coming Soon</div>
						<div className="text-xs text-corp-green mt-1">Part of Roadmap</div>
					</div>
				</div>
				
				{/* Content (slightly faded) */}
				<div className="relative opacity-50">
					<div className="flex items-center gap-2 mb-2">
						<h4 className="font-semibold text-white">{title}</h4>
						<span className={`text-xs px-2 py-1 rounded font-medium ${
							value === 'High' 
								? 'bg-corp-green/20 text-corp-green-dark border border-corp-green'
								: 'bg-amber-100 text-amber-800 border border-amber-300'
						}`}>
							{value} Value
						</span>
					</div>
					<p className="text-sm text-corp-green">{description}</p>
				</div>
			</div>
		);
	};

	return (
		<>
			<div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				<div className="rounded border border-[#3d3d3d] bg-[#2d2d2d] p-6 shadow-corp">
					<div className="text-sm text-corp-green mb-1">Total Candidates</div>
					<div className="text-3xl font-bold text-white">{total}</div>
				</div>
				<div className="rounded border border-[#3d3d3d] bg-[#2d2d2d] p-6 shadow-corp">
					<div className="text-sm text-corp-green mb-1">Average Score</div>
					<div className="text-3xl font-bold text-white">{avgScore}</div>
				</div>
				<div className="rounded border border-[#3d3d3d] bg-[#2d2d2d] p-6 shadow-corp">
					<div className="text-sm text-corp-green mb-2">Status Distribution</div>
					<div className="space-y-1 text-xs text-corp-green">
						<div className="flex justify-between">
							<span>Qualified:</span>
							<span className="font-medium">{statusCounts.qualified || 0}</span>
						</div>
						<div className="flex justify-between">
							<span>Pending:</span>
							<span className="font-medium">{statusCounts.pending || 0}</span>
						</div>
						<div className="flex justify-between">
							<span>Interviewed:</span>
							<span className="font-medium">{statusCounts.interviewed || 0}</span>
						</div>
						<div className="flex justify-between">
							<span>Hired:</span>
							<span className="font-medium">{statusCounts.hired || 0}</span>
						</div>
					</div>
				</div>
				<div className="rounded border border-[#3d3d3d] bg-[#2d2d2d] p-6 shadow-corp">
					<div className="text-sm text-corp-green mb-2">Score Distribution</div>
					<div className="space-y-1 text-xs text-corp-green">
						{Object.entries(scoreRanges).map(([range, count]) => {
							const percentage = maxScoreCount > 0 ? (count / maxScoreCount) * 100 : 0;
							return (
								<div key={range}>
									<div className="flex justify-between mb-1">
										<span>{range}:</span>
										<span className="font-medium">{count}</span>
									</div>
									<div className="h-2 bg-[#3d3d3d] rounded overflow-hidden">
										<div
											className={`h-full ${
												range === '76-100' ? 'bg-corp-green' :
												range === '51-75' ? 'bg-amber-400' :
												range === '26-50' ? 'bg-orange-400' : 'bg-red-400'
											}`}
											style={{ width: `${percentage}%` }}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			
			{/* Locked Features Section */}
			<div className="mb-6 rounded border border-[#3d3d3d] bg-[#2d2d2d] p-6 shadow-corp">
				<h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
					<span>🔒</span>
					<span>Planned Enhancements</span>
					{onRoadmapClick && (
						<button
							onClick={onRoadmapClick}
							className="ml-auto text-sm text-corp-green hover:underline"
						>
							View Full Roadmap →
						</button>
					)}
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<LockedFeatureCard
						title="Hiring Pipeline View"
						description="Visual Kanban board for drag-and-drop workflow management"
						value="High"
					/>
					<LockedFeatureCard
						title="Interview Scheduler"
						description="Schedule interviews with calendar integration and auto-invites"
						value="High"
					/>
					<LockedFeatureCard
						title="Advanced Analytics"
						description="Hiring funnel, time-to-hire metrics, source effectiveness tracking"
						value="High"
					/>
				</div>
			</div>
		</>
	);
};

