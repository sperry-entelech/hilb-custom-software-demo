import React from 'react';

export const FeatureRoadmap = ({ onBack }) => {
	const currentFeatures = [
		{ name: 'AI Resume Analysis & Scoring', status: 'active', description: 'Role-based analysis with detailed scoring against Hilb Group criteria' },
		{ name: 'Candidate Dashboard', status: 'active', description: 'Filterable, searchable table with bulk actions' },
		{ name: 'Candidate Detail View', status: 'active', description: 'Complete analysis breakdown, scores, strengths/concerns' },
		{ name: 'Bulk Actions', status: 'active', description: 'Update status, delete multiple candidates' },
		{ name: 'Search & Filters', status: 'active', description: 'Filter by position, score, status, degree field' },
		{ name: 'Export to CSV/PDF', status: 'active', description: 'Download candidate data and reports' },
		{ name: 'Candidate Comparison', status: 'active', description: 'Side-by-side comparison of 2-3 candidates' },
		{ name: 'Statistics Dashboard', status: 'active', description: 'Key metrics and score distribution' },
		{ name: 'Notes System', status: 'active', description: 'Internal notes on candidates' },
	];

	const plannedFeatures = [
		{
			category: 'Applicant Onboarding Portal',
			features: [
				{
					name: 'Public Application Portal',
					value: 'High',
					description: 'Candidates apply directly through web portal - no manual uploads needed',
					impact: 'Reduces HR workload by 50%, improves candidate experience'
				},
				{
					name: 'Application Status Tracking',
					value: 'High',
					description: 'Applicants track their application status with real-time updates',
					impact: 'Reduces "where is my application?" inquiries by 80%'
				},
				{
					name: 'Auto-Processing Workflow',
					value: 'High',
					description: 'Applications automatically trigger AI analysis upon submission',
					impact: 'Zero-touch processing for 70% of applications'
				},
				{
					name: 'Application Questionnaire',
					value: 'Medium',
					description: 'Custom questions per position type gather targeted information',
					impact: 'Better candidate qualification before interview stage'
				},
				{
					name: 'Email Notifications',
					value: 'Medium',
					description: 'Automated emails to candidates at each status change',
					impact: 'Professional candidate experience, reduced manual communication'
				}
			]
		},
		{
			category: 'Advanced HR Management',
			features: [
				{
					name: 'Hiring Pipeline/Kanban View',
					value: 'High',
					description: 'Visual drag-and-drop pipeline: Submitted → Review → Qualified → Interview → Offer → Hired',
					impact: 'Intuitive workflow management, 40% faster status updates'
				},
				{
					name: 'Interview Scheduler',
					value: 'High',
					description: 'Schedule interviews with calendar integration, send invites automatically',
					impact: 'Eliminates back-and-forth scheduling, saves 2+ hours/week'
				},
				{
					name: 'Advanced Analytics Dashboard',
					value: 'High',
					description: 'Hiring funnel visualization, time-to-hire metrics, source effectiveness, trends',
					impact: 'Data-driven hiring decisions, identify bottlenecks, optimize process'
				},
				{
					name: 'Team Collaboration',
					value: 'High',
					description: 'Comments, @mentions, threaded discussions on candidates, activity feed',
					impact: 'Improved team coordination, reduced email chains, centralized communication'
				},
				{
					name: 'Activity Timeline',
					value: 'Medium',
					description: 'Complete history of all actions on each candidate',
					impact: 'Full audit trail, accountability, process transparency'
				},
				{
					name: 'Workflow Automation',
					value: 'Medium',
					description: 'Auto-qualify high scorers, auto-reject low scorers, trigger notifications',
					impact: 'Handles 60% of routine decisions automatically, focuses HR on high-value work'
				},
				{
					name: 'Custom Reports Builder',
					value: 'Medium',
					description: 'Build custom reports by metrics, date ranges, filters - export to PDF/Excel',
					impact: 'Flexible reporting for stakeholders, executive summaries, compliance'
				},
				{
					name: 'Notification Center',
					value: 'Medium',
					description: 'In-app notifications for new applications, high-scorers, interview reminders',
					impact: 'Real-time awareness, never miss important candidates, team alignment'
				},
				{
					name: 'Source Tracking',
					value: 'Low',
					description: 'Track which job boards/sources produce best candidates',
					impact: 'Optimize recruiting spend, focus on high-performing channels'
				}
			]
		}
	];

	const totalValue = plannedFeatures.flatMap(c => c.features).reduce((sum, f) => {
		if (f.value === 'High') return sum + 3;
		if (f.value === 'Medium') return sum + 2;
		return sum + 1;
	}, 0);

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h2 className="text-3xl font-bold text-corp-text">Feature Roadmap</h2>
					<p className="text-corp-text-light mt-2">Current capabilities and planned enhancements</p>
				</div>
				{onBack && (
					<button
						onClick={onBack}
						className="rounded border border-corp-gray px-4 py-2 text-corp-text hover:bg-corp-gray-light transition-colors"
					>
						Back to Dashboard
					</button>
				)}
			</div>

			{/* Demo Banner */}
			<div className="rounded-lg border-2 border-corp-blue bg-corp-blue/5 p-6">
				<div className="flex items-start gap-4">
					<div className="text-3xl">🚀</div>
					<div>
						<h3 className="text-xl font-bold text-corp-text mb-2">Demo Version</h3>
						<p className="text-corp-text-light mb-4">
							You're viewing the <strong>Alpha v1.0 Demo</strong> with core screening features. 
							The roadmap below shows <strong>planned enhancements</strong> that would significantly 
							improve the value and ROI of this platform.
						</p>
						<div className="rounded bg-white border border-corp-blue p-4">
							<p className="text-sm font-semibold text-corp-text mb-2">Estimated Additional Value:</p>
							<ul className="text-sm text-corp-text-light space-y-1">
								<li>• <strong>Applicant Portal:</strong> 50% reduction in HR manual work</li>
								<li>• <strong>HR Management Tools:</strong> 40% faster hiring process, data-driven decisions</li>
								<li>• <strong>Automation:</strong> 60% of routine tasks handled automatically</li>
								<li>• <strong>ROI:</strong> 10+ hours/week saved per HR team member</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Current Features */}
			<div className="rounded border border-corp-gray bg-white p-6 shadow-corp">
				<h3 className="text-xl font-semibold text-corp-text mb-4">✅ Currently Available (Alpha v1.0)</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{currentFeatures.map((feature, idx) => (
						<div key={idx} className="rounded border border-corp-green bg-corp-green/5 p-4">
							<div className="flex items-center gap-2 mb-2">
								<span className="text-corp-green font-bold">✓</span>
								<h4 className="font-semibold text-corp-text">{feature.name}</h4>
							</div>
							<p className="text-sm text-corp-text-light">{feature.description}</p>
						</div>
					))}
				</div>
			</div>

			{/* Planned Features */}
			{plannedFeatures.map((category, catIdx) => (
				<div key={catIdx} className="rounded border border-corp-gray bg-white p-6 shadow-corp">
					<div className="flex items-center gap-3 mb-6">
						<div className="w-12 h-12 rounded-full bg-corp-blue/10 flex items-center justify-center">
							<span className="text-2xl">🔒</span>
						</div>
						<div>
							<h3 className="text-2xl font-semibold text-corp-text">{category.category}</h3>
							<p className="text-corp-text-light text-sm">Planned features - part of development roadmap</p>
						</div>
					</div>
					
					<div className="space-y-4">
						{category.features.map((feature, featIdx) => (
							<div 
								key={featIdx}
								className="rounded border-2 border-dashed border-corp-gray bg-corp-gray-light/30 p-5 hover:border-corp-blue transition-colors"
							>
								<div className="flex items-start justify-between gap-4 mb-3">
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<h4 className="font-semibold text-corp-text">{feature.name}</h4>
											<span className={`text-xs px-2 py-1 rounded font-medium ${
												feature.value === 'High' 
													? 'bg-corp-green/20 text-corp-green-dark border border-corp-green'
													: feature.value === 'Medium'
													? 'bg-amber-100 text-amber-800 border border-amber-300'
													: 'bg-gray-200 text-gray-700 border border-gray-300'
											}`}>
												{feature.value} Value
											</span>
										</div>
										<p className="text-sm text-corp-text-light mb-3">{feature.description}</p>
									</div>
								</div>
								<div className="rounded bg-white border border-corp-gray p-3">
									<p className="text-xs font-semibold text-corp-text mb-1">Business Impact:</p>
									<p className="text-sm text-corp-text-light">{feature.impact}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			))}

			{/* Summary Stats */}
			<div className="rounded border border-corp-gray bg-corp-blue/5 p-6">
				<h3 className="text-xl font-semibold text-corp-text mb-4">Roadmap Summary</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					<div className="text-center">
						<div className="text-3xl font-bold text-corp-blue">{plannedFeatures.flatMap(c => c.features).length}</div>
						<div className="text-sm text-corp-text-light mt-1">Planned Features</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-corp-green">{plannedFeatures.flatMap(c => c.features).filter(f => f.value === 'High').length}</div>
						<div className="text-sm text-corp-text-light mt-1">High Value</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-corp-blue">{currentFeatures.length}</div>
						<div className="text-sm text-corp-text-light mt-1">Current Features</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-amber-600">{totalValue}</div>
						<div className="text-sm text-corp-text-light mt-1">Total Value Score</div>
					</div>
				</div>
			</div>
		</div>
	);
};

