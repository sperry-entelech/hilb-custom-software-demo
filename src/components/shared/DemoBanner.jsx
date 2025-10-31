export const DemoBanner = ({ onRoadmapClick }) => {
	return (
		<div className="mb-6 rounded-lg border-2 border-corp-blue bg-corp-blue/5 p-4">
			<div className="flex items-center gap-3">
				<span className="text-2xl">🚀</span>
				<div className="flex-1">
					<p className="text-sm font-semibold text-corp-text">
						<strong>Demo Version (Alpha v1.0)</strong> - You're viewing core screening features. 
						{onRoadmapClick && (
							<button 
								onClick={onRoadmapClick}
								className="text-corp-blue hover:underline ml-1"
							>
								See Roadmap
							</button>
						)}
						{' for planned enhancements.'}
					</p>
				</div>
			</div>
		</div>
	);
};

