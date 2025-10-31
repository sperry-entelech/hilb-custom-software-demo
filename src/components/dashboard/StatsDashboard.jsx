export const StatsDashboard = ({ candidates = [] }) => {
	if (candidates.length === 0) {
		return (
			<div className="mb-6 rounded border border-corp-gray bg-white p-6 shadow-corp">
				<p className="text-corp-text-light">No data available yet</p>
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

	return (
		<div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			<div className="rounded border border-corp-gray bg-white p-6 shadow-corp">
				<div className="text-sm text-corp-text-light mb-1">Total Candidates</div>
				<div className="text-3xl font-bold text-corp-text">{total}</div>
			</div>
			<div className="rounded border border-corp-gray bg-white p-6 shadow-corp">
				<div className="text-sm text-corp-text-light mb-1">Average Score</div>
				<div className="text-3xl font-bold text-corp-text">{avgScore}</div>
			</div>
			<div className="rounded border border-corp-gray bg-white p-6 shadow-corp">
				<div className="text-sm text-corp-text-light mb-2">Status Distribution</div>
				<div className="space-y-1 text-xs">
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
			<div className="rounded border border-corp-gray bg-white p-6 shadow-corp">
				<div className="text-sm text-corp-text-light mb-2">Score Distribution</div>
				<div className="space-y-1 text-xs">
					{Object.entries(scoreRanges).map(([range, count]) => {
						const percentage = maxScoreCount > 0 ? (count / maxScoreCount) * 100 : 0;
						return (
							<div key={range}>
								<div className="flex justify-between mb-1">
									<span>{range}:</span>
									<span className="font-medium">{count}</span>
								</div>
								<div className="h-2 bg-corp-gray-light rounded overflow-hidden">
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
	);
};

