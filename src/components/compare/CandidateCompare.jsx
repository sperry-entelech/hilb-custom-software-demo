export const CandidateCompare = ({ candidates = [], onBack, onSelectCandidate }) => {
	if (candidates.length === 0) {
		return (
			<div className="rounded border border-[#3d3d3d] bg-[#2d2d2d] p-6 shadow-corp">
				<p className="text-white-light">No candidates selected for comparison</p>
				<button onClick={onBack} className="mt-4 rounded border border-[#3d3d3d] px-4 py-2 text-white hover:bg-[#3d3d3d] transition-colors">
					Back to Dashboard
				</button>
			</div>
		);
	}

	const maxCandidates = 3;
	const displayCandidates = candidates.slice(0, maxCandidates);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-bold text-white">Compare Candidates</h2>
				<button
					onClick={onBack}
					className="rounded border border-[#3d3d3d] px-4 py-2 text-white hover:bg-[#3d3d3d] transition-colors"
				>
					Back to Dashboard
				</button>
			</div>
			
			<div className="overflow-x-auto">
				<div className="min-w-full inline-block">
					<table className="min-w-full border-collapse border border-[#3d3d3d] bg-[#2d2d2d] shadow-corp">
						<thead className="bg-[#3d3d3d]">
							<tr>
								<th className="border border-[#3d3d3d] px-4 py-3 text-left text-white font-semibold">Metric</th>
								{displayCandidates.map((c) => (
									<th key={c.id} className="border border-[#3d3d3d] px-4 py-3 text-left text-white font-semibold">
										<button onClick={() => onSelectCandidate?.(c)} className="hover:text-corp-green">
											{c.name}
										</button>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border border-[#3d3d3d] px-4 py-3 font-medium bg-[#3d3d3d] text-white">Overall Score</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-[#3d3d3d] px-4 py-3 text-white">
										<span className={`inline-block rounded px-2 py-1 text-xs font-medium ${
											(c.overall_score || 0) >= 76 ? 'bg-corp-green/20 text-corp-green-dark' :
											(c.overall_score || 0) >= 51 ? 'bg-amber-900/30 text-amber-200' :
											'bg-red-900/30 text-red-300'
										}`}>
											{c.overall_score || 0}
										</span>
									</td>
								))}
							</tr>
							<tr>
								<td className="border border-[#3d3d3d] px-4 py-3 font-medium bg-[#3d3d3d] text-white">Position Score</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-[#3d3d3d] px-4 py-3 text-corp-green">{c.position_specific_score || 0}</td>
								))}
							</tr>
							<tr>
								<td className="border border-[#3d3d3d] px-4 py-3 font-medium bg-[#3d3d3d] text-white">Education Score</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-[#3d3d3d] px-4 py-3 text-corp-green">{c.education_score || 0}</td>
								))}
							</tr>
							<tr>
								<td className="border border-[#3d3d3d] px-4 py-3 font-medium bg-[#3d3d3d] text-white">Experience Score</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-[#3d3d3d] px-4 py-3 text-corp-green">{c.experience_score || 0}</td>
								))}
							</tr>
							<tr>
								<td className="border border-[#3d3d3d] px-4 py-3 font-medium bg-[#3d3d3d] text-white">Traits Score</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-[#3d3d3d] px-4 py-3 text-corp-green">{c.traits_score || 0}</td>
								))}
							</tr>
							<tr>
								<td className="border border-[#3d3d3d] px-4 py-3 font-medium bg-[#3d3d3d] text-white">Industry Fit</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-[#3d3d3d] px-4 py-3 text-corp-green">{c.industry_fit_score || 0}</td>
								))}
							</tr>
							<tr>
								<td className="border border-[#3d3d3d] px-4 py-3 font-medium bg-[#3d3d3d] text-white">Degree Field</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-[#3d3d3d] px-4 py-3 text-corp-green">{c.degree_field || '-'}</td>
								))}
							</tr>
							<tr>
								<td className="border border-[#3d3d3d] px-4 py-3 font-medium bg-[#3d3d3d] text-white">GPA</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-[#3d3d3d] px-4 py-3 text-corp-green">{c.gpa || '-'}</td>
								))}
							</tr>
							<tr>
								<td className="border border-[#3d3d3d] px-4 py-3 font-medium bg-[#3d3d3d] text-white">University</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-[#3d3d3d] px-4 py-3 text-corp-green">{c.university || '-'}</td>
								))}
							</tr>
							<tr>
								<td className="border border-[#3d3d3d] px-4 py-3 font-medium bg-[#3d3d3d] text-white">Status</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-[#3d3d3d] px-4 py-3">
										<span className={`rounded px-2 py-1 text-xs ${
											c.status === 'qualified' ? 'bg-corp-green/20 text-corp-green-dark' :
											c.status === 'rejected' ? 'bg-red-900/30 text-red-300' :
											c.status === 'interviewed' ? 'bg-blue-900/30 text-blue-300' :
											c.status === 'hired' ? 'bg-corp-green/20 text-corp-green-dark' :
											'bg-[#3d3d3d] text-[#cccccc]'
										}`}>
											{c.status || 'pending'}
										</span>
									</td>
								))}
							</tr>
							<tr>
								<td className="border border-[#3d3d3d] px-4 py-3 font-medium bg-[#3d3d3d] text-white">Top Strength</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-[#3d3d3d] px-4 py-3 text-sm text-corp-green">
										{Array.isArray(c.strengths) && c.strengths.length > 0 ? c.strengths[0] : '-'}
									</td>
								))}
							</tr>
							<tr>
								<td className="border border-[#3d3d3d] px-4 py-3 font-medium bg-[#3d3d3d] text-white">Top Concern</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-[#3d3d3d] px-4 py-3 text-sm text-corp-green">
										{Array.isArray(c.concerns) && c.concerns.length > 0 ? c.concerns[0] : '-'}
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			{candidates.length > maxCandidates && (
				<div className="rounded border border-amber-600 bg-amber-900/30 p-3 text-sm text-amber-200">
					Only showing first {maxCandidates} candidates. Select fewer candidates for comparison.
				</div>
			)}
		</div>
	);
};

