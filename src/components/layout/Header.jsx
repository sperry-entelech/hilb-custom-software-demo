export const Header = ({ currentView, onViewChange, onRefresh }) => {
	return (
		<header className="bg-[#2d2d2d] border-b border-[#3d3d3d] shadow-corp">
			<div className="mx-auto max-w-7xl px-8 py-6 flex items-center justify-between">
				<div className="flex items-center gap-4">
					{/* Placeholder Logo - Green and Blue geometric shape */}
					<div className="flex items-center gap-1">
						<div className="w-10 h-10 bg-corp-green rounded flex items-center justify-center">
							<div className="w-6 h-6 bg-[#1e1e1e] rounded-sm"></div>
						</div>
						<div className="w-10 h-10 bg-corp-blue rounded flex items-center justify-center">
							<div className="w-6 h-6 bg-[#1e1e1e] rounded-sm"></div>
						</div>
					</div>
					<h1 className="text-2xl font-bold text-white">Hilb Group Candidate Screening</h1>
					{/* Demo Badge */}
					<span className="px-3 py-1 bg-[#3d3d3d] text-corp-green text-xs font-semibold rounded border border-[#4d4d4d]">
						DEMO v1.0
					</span>
				</div>
				<nav className="flex gap-3">
					<button
						className={`px-6 py-2 font-medium text-sm transition-colors ${
							currentView === 'upload'
								? 'bg-corp-blue text-white'
								: 'bg-[#3d3d3d] text-[#cccccc] border border-[#4d4d4d] hover:bg-[#4d4d4d]'
						}`}
						onClick={() => onViewChange('upload')}
					>
						Upload
					</button>
					<button
						className={`px-6 py-2 font-medium text-sm transition-colors ${
							currentView === 'dashboard'
								? 'bg-corp-blue text-white'
								: 'bg-[#3d3d3d] text-[#cccccc] border border-[#4d4d4d] hover:bg-[#4d4d4d]'
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
								: 'bg-[#3d3d3d] text-[#cccccc] border border-[#4d4d4d] hover:bg-[#4d4d4d]'
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

