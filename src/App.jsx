import { useEffect, useState } from 'react';
import { Header } from './components/layout/Header.jsx';
import { UploadPage } from './components/upload/UploadPage.jsx';
import { SearchBar } from './components/dashboard/SearchBar.jsx';
import { FilterBar } from './components/dashboard/FilterBar.jsx';
import { BulkActions } from './components/dashboard/BulkActions.jsx';
import { StatsDashboard } from './components/dashboard/StatsDashboard.jsx';
import { CandidateTable } from './components/dashboard/CandidateTable.jsx';
import { CandidateDetail } from './components/detail/CandidateDetail.jsx';
import { CandidateCompare } from './components/compare/CandidateCompare.jsx';
import { FeatureRoadmap } from './components/roadmap/FeatureRoadmap.jsx';
import { loadCandidates, bulkUpdateStatus, bulkDelete } from './services/candidates.js';
import { exportToCSV, exportCandidatePDF } from './services/export.js';

export const App = () => {
	const [view, setView] = useState('dashboard');
	const [selected, setSelected] = useState(null);
	const [compareCandidates, setCompareCandidates] = useState([]);
	const [candidates, setCandidates] = useState([]);
	const [loading, setLoading] = useState(true);
	const [configError, setConfigError] = useState('');
	const [selectedIds, setSelectedIds] = useState([]);
	const [filters, setFilters] = useState({ positionType: 'all', scoreRange: 'all', status: 'all', degree: 'all', search: '' });

	useEffect(() => {
		loadCandidatesData();
	}, [filters]);

	async function loadCandidatesData() {
		setLoading(true);
		setConfigError('');
		try {
			const data = await loadCandidates(filters);
			setCandidates(data || []);
		} catch (error) {
			console.error('Failed to load candidates:', error);
			setCandidates([]);
			if (error.message?.includes('Supabase') || error.message?.includes('env') || error.message?.includes('Failed to load')) {
				setConfigError('Supabase not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel environment variables.');
			}
		} finally {
			setLoading(false);
		}
	}

	function handleFilterChange(newFilters) {
		setFilters((prev) => ({ ...prev, ...newFilters }));
	}

	async function handleBulkStatusUpdate(ids, status) {
		try {
			await bulkUpdateStatus(ids, status);
			loadCandidatesData();
		} catch (error) {
			console.error('Bulk update failed:', error);
		}
	}

	async function handleBulkDelete(ids) {
		try {
			await bulkDelete(ids);
			loadCandidatesData();
		} catch (error) {
			console.error('Bulk delete failed:', error);
		}
	}

	function handleCompare() {
		if (selectedIds.length < 2) {
			alert('Please select at least 2 candidates to compare');
			return;
		}
		if (selectedIds.length > 3) {
			alert('Please select maximum 3 candidates to compare');
			return;
		}
		const toCompare = candidates.filter(c => selectedIds.includes(c.id));
		setCompareCandidates(toCompare);
		setView('compare');
	}

	return (
		<div className="min-h-screen bg-white text-corp-text">
			<Header
				currentView={view}
				onViewChange={setView}
				onRefresh={loadCandidatesData}
			/>
			<main className="mx-auto max-w-7xl px-8 py-8">
				{configError && (
					<div className="mb-6 rounded border border-amber-300 bg-amber-50 p-4 text-amber-800">
						<p className="font-semibold">⚠️ Configuration Required</p>
						<p className="text-sm mt-1">{configError}</p>
					</div>
				)}
				{view === 'upload' && (
					<div className="rounded border border-corp-gray bg-white p-8 shadow-corp">
						<UploadPage onUploadComplete={() => { setView('dashboard'); loadCandidatesData(); }} />
					</div>
				)}
				{view === 'dashboard' && !selected && (
					<div className="space-y-6">
						<StatsDashboard candidates={candidates} onRoadmapClick={() => setView('roadmap')} />
						<div className="flex items-center justify-between mb-4">
							<SearchBar onSearch={(query) => handleFilterChange({ search: query })} />
							<div className="flex gap-2 ml-4">
								<button
									onClick={() => exportToCSV(candidates)}
									className="rounded border border-corp-gray bg-white px-4 py-2 text-sm text-corp-text hover:bg-corp-gray-light transition-colors shadow-corp"
								>
									Export CSV
								</button>
							</div>
						</div>
						<FilterBar onChange={handleFilterChange} />
						<BulkActions
							selectedIds={selectedIds}
							candidates={candidates}
							onBulkStatusUpdate={handleBulkStatusUpdate}
							onBulkDelete={handleBulkDelete}
							onClearSelection={() => setSelectedIds([])}
						/>
						{selectedIds.length >= 2 && selectedIds.length <= 3 && (
							<div className="mb-4">
								<button
									onClick={handleCompare}
									className="rounded bg-corp-green px-4 py-2 text-white font-semibold hover:bg-corp-green-dark transition-colors shadow-corp"
								>
									Compare Selected ({selectedIds.length})
								</button>
							</div>
						)}
						{loading ? (
							<div className="rounded border border-corp-gray bg-white p-8 text-center text-corp-text-light shadow-corp">Loading candidates...</div>
						) : (
							<CandidateTable
								candidates={candidates}
								selectedIds={selectedIds}
								onSelectionChange={setSelectedIds}
								onSelect={(c) => { setSelected(c); setView('detail'); }}
							/>
						)}
					</div>
				)}
				{view === 'detail' && selected && (
					<div className="space-y-6">
						<CandidateDetail
							candidate={selected}
							onUpdate={() => {
								loadCandidatesData();
								// Refresh selected candidate
								const updated = candidates.find(c => c.id === selected.id);
								if (updated) setSelected(updated);
							}}
							onBack={() => {
								setSelected(null);
								setView('dashboard');
								loadCandidatesData();
							}}
						/>
					</div>
				)}
				{view === 'compare' && (
					<div className="space-y-6">
						<CandidateCompare
							candidates={compareCandidates}
							onBack={() => {
								setCompareCandidates([]);
								setView('dashboard');
								setSelectedIds([]);
							}}
							onSelectCandidate={(c) => {
								setSelected(c);
								setView('detail');
								setCompareCandidates([]);
								setSelectedIds([]);
							}}
						/>
					</div>
				)}
				{view === 'roadmap' && (
					<div className="space-y-6">
						<FeatureRoadmap onBack={() => setView('dashboard')} />
					</div>
				)}
			</main>
		</div>
	);
};
