export const CandidateCompare = ({ candidates = [], onBack, onSelectCandidate }) => {
	if (candidates.length === 0) {
		return (
			<div className="rounded border border-corp-gray bg-white p-6 shadow-corp">
				<p className="text-corp-text-light">No candidates selected for comparison</p>
				<button onClick={onBack} className="mt-4 rounded border border-corp-gray px-4 py-2 text-corp-text hover:bg-corp-gray-light transition-colors">
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
				<h2 className="text-xl font-bold text-corp-text">Compare Candidates</h2>
				<button
					onClick={onBack}
					className="rounded border border-corp-gray px-4 py-2 text-corp-text hover:bg-corp-gray-light transition-colors"
				>
					Back to Dashboard
				</button>
			</div>
			
			<div className="overflow-x-auto">
				<div className="min-w-full inline-block">
					<table className="min-w-full border-collapse border border-corp-gray bg-white shadow-corp">
						<thead className="bg-corp-gray-light">
							<tr>
								<th className="border border-corp-gray px-4 py-3 text-left text-corp-text font-semibold">Metric</th>
								{displayCandidates.map((c) => (
									<th key={c.id} className="border border-corp-gray px-4 py-3 text-left text-corp-text font-semibold">
										<button onClick={() => onSelectCandidate?.(c)} className="hover:text-corp-blue">
											{c.name}
										</button>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border border-corp-gray px-4 py-3 font-medium bg-corp-gray-light">Overall Score</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-corp-gray px-4 py-3">
										<span className={`inline-block rounded px-2 py-1 text-xs font-medium ${
											(c.overall_score || 0) >= 76 ? 'bg-corp-green/20 text-corp-green-dark' :
											(c.overall_score || 0) >= 51 ? 'bg-amber-100 text-amber-800' :
											'bg-red-100 text-red-800'
										}`}>
											{c.overall_score || 0}
										</span>
									</td>
								))}
							</tr>
							<tr>
								<td className="border border-corp-gray px-4 py-3 font-medium bg-corp-gray-light">Position Score</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-corp-gray px-4 py-3">{c.position_specific_score || 0}</td>
								))}
							</tr>
							<tr>
								<td className="border border-corp-gray px-4 py-3 font-medium bg-corp-gray-light">Education Score</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-corp-gray px-4 py-3">{c.education_score || 0}</td>
								))}
							</tr>
							<tr>
								<td className="border border-corp-gray px-4 py-3 font-medium bg-corp-gray-light">Experience Score</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-corp-gray px-4 py-3">{c.experience_score || 0}</td>
								))}
							</tr>
							<tr>
								<td className="border border-corp-gray px-4 py-3 font-medium bg-corp-gray-light">Traits Score</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-corp-gray px-4 py-3">{c.traits_score || 0}</td>
								))}
							</tr>
							<tr>
								<td className="border border-corp-gray px-4 py-3 font-medium bg-corp-gray-light">Industry Fit</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-corp-gray px-4 py-3">{c.industry_fit_score || 0}</td>
								))}
							</tr>
							<tr>
								<td className="border border-corp-gray px-4 py-3 font-medium bg-corp-gray-light">Degree Field</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-corp-gray px-4 py-3">{c.degree_field || '-'}</td>
								))}
							</tr>
							<tr>
								<td className="border border-corp-gray px-4 py-3 font-medium bg-corp-gray-light">GPA</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-corp-gray px-4 py-3">{c.gpa || '-'}</td>
								))}
							</tr>
							<tr>
								<td className="border border-corp-gray px-4 py-3 font-medium bg-corp-gray-light">University</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-corp-gray px-4 py-3">{c.university || '-'}</td>
								))}
							</tr>
							<tr>
								<td className="border border-corp-gray px-4 py-3 font-medium bg-corp-gray-light">Status</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-corp-gray px-4 py-3">
										<span className={`rounded px-2 py-1 text-xs ${
											c.status === 'qualified' ? 'bg-corp-green/20 text-corp-green-dark' :
											c.status === 'rejected' ? 'bg-red-100 text-red-800' :
											c.status === 'interviewed' ? 'bg-blue-100 text-blue-800' :
											c.status === 'hired' ? 'bg-corp-green/20 text-corp-green-dark' :
											'bg-gray-200 text-gray-700'
										}`}>
											{c.status || 'pending'}
										</span>
									</td>
								))}
							</tr>
							<tr>
								<td className="border border-corp-gray px-4 py-3 font-medium bg-corp-gray-light">Top Strength</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-corp-gray px-4 py-3 text-sm">
										{Array.isArray(c.strengths) && c.strengths.length > 0 ? c.strengths[0] : '-'}
									</td>
								))}
							</tr>
							<tr>
								<td className="border border-corp-gray px-4 py-3 font-medium bg-corp-gray-light">Top Concern</td>
								{displayCandidates.map((c) => (
									<td key={c.id} className="border border-corp-gray px-4 py-3 text-sm">
										{Array.isArray(c.concerns) && c.concerns.length > 0 ? c.concerns[0] : '-'}
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			{candidates.length > maxCandidates && (
				<div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800">
					Only showing first {maxCandidates} candidates. Select fewer candidates for comparison.
				</div>
			)}
		</div>
	);
};

