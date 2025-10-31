export const Header = ({ currentView, onViewChange, onRefresh }) => {
	return (
		<header className="bg-white border-b border-corp-gray shadow-corp">
			<div className="mx-auto max-w-7xl px-8 py-6 flex items-center justify-between">
				<div className="flex items-center gap-4">
					{/* Placeholder Logo - Green and Blue geometric shape */}
					<div className="flex items-center gap-1">
						<div className="w-10 h-10 bg-corp-green rounded flex items-center justify-center">
							<div className="w-6 h-6 bg-white rounded-sm"></div>
						</div>
						<div className="w-10 h-10 bg-corp-blue rounded flex items-center justify-center">
							<div className="w-6 h-6 bg-white rounded-sm"></div>
						</div>
					</div>
					<h1 className="text-2xl font-bold text-corp-text">Hilb Group Candidate Screening</h1>
					{/* Demo Badge */}
					<span className="px-3 py-1 bg-corp-blue/10 text-corp-blue text-xs font-semibold rounded border border-corp-blue">
						DEMO v1.0
					</span>
				</div>
				<nav className="flex gap-3">
					<button
						className={`px-6 py-2 font-medium text-sm transition-colors ${
							currentView === 'upload'
								? 'bg-corp-blue text-white'
								: 'bg-white text-corp-text border border-corp-gray hover:bg-corp-gray-light'
						}`}
						onClick={() => onViewChange('upload')}
					>
						Upload
					</button>
					<button
						className={`px-6 py-2 font-medium text-sm transition-colors ${
							currentView === 'dashboard'
								? 'bg-corp-blue text-white'
								: 'bg-white text-corp-text border border-corp-gray hover:bg-corp-gray-light'
						}`}
						onClick={() => {
							onViewChange('dashboard');
							onRefresh?.();
						}}
					>
						Dashboard
					</button>
					<button
						className={`px-6 py-2 font-medium text-sm transition-colors ${
							currentView === 'roadmap'
								? 'bg-corp-blue text-white'
								: 'bg-white text-corp-text border border-corp-gray hover:bg-corp-gray-light'
						}`}
						onClick={() => onViewChange('roadmap')}
					>
						🔒 Roadmap
					</button>
				</nav>
			</div>
		</header>
	);
};

