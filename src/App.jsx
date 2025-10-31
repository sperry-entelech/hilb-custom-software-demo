import { useEffect, useState } from 'react';
import { UploadPage } from './components/upload/UploadPage.jsx';
import { FilterBar } from './components/dashboard/FilterBar.jsx';
import { CandidateTable } from './components/dashboard/CandidateTable.jsx';
import { CandidateDetail } from './components/detail/CandidateDetail.jsx';
import { loadCandidates } from './services/candidates.js';

export const App = () => {
	const [view, setView] = useState('dashboard');
	const [selected, setSelected] = useState(null);
	const [candidates, setCandidates] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState({ positionType: 'all', scoreRange: 'all', status: 'all', degree: 'all' });

	useEffect(() => {
		loadCandidatesData();
	}, [filters]);

	async function loadCandidatesData() {
		setLoading(true);
		try {
			const data = await loadCandidates(filters);
			setCandidates(data);
		} catch (error) {
			console.error('Failed to load candidates:', error);
		} finally {
			setLoading(false);
		}
	}

	function handleFilterChange(newFilters) {
		setFilters((prev) => ({ ...prev, ...newFilters }));
	}

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100">
			<header className="border-b border-gray-800 bg-gray-900">
				<div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
					<h1 className="text-2xl font-bold text-hilb-lime">Hilb Group Candidate Screening</h1>
					<nav className="flex gap-2">
						<button
							className={`rounded px-4 py-2 font-medium transition-colors ${
								view === 'upload'
									? 'bg-hilb-lime text-gray-900'
									: 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
							}`}
							onClick={() => setView('upload')}
						>
							Upload
						</button>
						<button
							className={`rounded px-4 py-2 font-medium transition-colors ${
								view === 'dashboard'
									? 'bg-hilb-lime text-gray-900'
									: 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
							}`}
							onClick={() => {
								setView('dashboard');
								setSelected(null);
								loadCandidatesData();
							}}
						>
							Dashboard
						</button>
					</nav>
				</div>
			</header>
			<main className="mx-auto max-w-6xl px-4 py-8">
				{view === 'upload' && (
					<div className="rounded-lg border border-gray-800 bg-gray-800/50 p-6 shadow-lg">
						<UploadPage onUploadComplete={() => { setView('dashboard'); loadCandidatesData(); }} />
					</div>
				)}
				{view === 'dashboard' && !selected && (
					<div className="space-y-4">
						<FilterBar onChange={handleFilterChange} />
						{loading ? (
							<div className="rounded-lg border border-gray-800 bg-gray-800/50 p-8 text-center text-gray-400">Loading candidates...</div>
						) : (
							<CandidateTable candidates={candidates} onSelect={(c) => { setSelected(c); setView('detail'); }} />
						)}
					</div>
				)}
				{view === 'detail' && selected && (
					<div className="space-y-4">
						<CandidateDetail
							candidate={selected}
							onBack={() => {
								setSelected(null);
								setView('dashboard');
								loadCandidatesData();
							}}
						/>
					</div>
				)}
			</main>
		</div>
	);
};
