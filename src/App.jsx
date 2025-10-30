import { useMemo, useState } from 'react';
import { UploadPage } from './components/upload/UploadPage.jsx';
import { FilterBar } from './components/dashboard/FilterBar.jsx';
import { CandidateTable } from './components/dashboard/CandidateTable.jsx';
import { CandidateDetail } from './components/detail/CandidateDetail.jsx';

export const App = () => {
	const [view, setView] = useState('upload'); // 'upload' | 'dashboard' | 'detail'
	const [selected, setSelected] = useState(null);
	const candidates = useMemo(() => [
		{
			id: '1',
			name: 'Alex Johnson',
			position_type: 'early_career',
			overall_score: 82,
			position_specific_score: 80,
			degree_field: 'Finance',
			strengths: [
				"Bachelor's degree in Finance (3.7 GPA)",
				'Leadership: VP, Business Club',
				'Experience with Salesforce CRM',
			],
			concerns: ['Limited direct insurance exposure'],
			status: 'pending',
			category_scores: { education: 88, experience: 75, traits: 90, industry_fit: 78 },
		},
	], []);

	return (
		<div className="min-h-screen bg-white text-gray-700">
			<header className="border-b bg-white">
				<div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
					<h1 className="text-2xl font-bold text-hilb-navy-dark">Hilb Group Candidate Screening</h1>
					<nav className="flex gap-2">
						<button className={`rounded px-3 py-2 ${view === 'upload' ? 'bg-hilb-navy text-white' : 'border border-hilb-navy text-hilb-navy hover:bg-hilb-navy hover:text-white'}`} onClick={() => setView('upload')}>Upload</button>
						<button className={`rounded px-3 py-2 ${view === 'dashboard' ? 'bg-hilb-navy text-white' : 'border border-hilb-navy text-hilb-navy hover:bg-hilb-navy hover:text-white'}`} onClick={() => setView('dashboard')}>Dashboard</button>
					</nav>
				</div>
			</header>
			<main className="mx-auto max-w-6xl px-4 py-8">
				{view === 'upload' && (
					<div className="rounded-lg border bg-white p-6 shadow-sm">
						<UploadPage />
					</div>
				)}
				{view === 'dashboard' && !selected && (
					<div className="space-y-4">
						<FilterBar onChange={() => {}} />
						<CandidateTable candidates={candidates} onSelect={(c) => { setSelected(c); setView('detail'); }} />
					</div>
				)}
				{view === 'detail' && selected && (
					<div className="space-y-4">
						<CandidateDetail candidate={selected} onBack={() => { setSelected(null); setView('dashboard'); }} />
					</div>
				)}
			</main>
		</div>
	);
};
