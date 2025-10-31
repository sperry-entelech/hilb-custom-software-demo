export const LockedFeatureBadge = ({ featureName, tooltip }) => {
	return (
		<div className="relative inline-block group">
			<div className="flex items-center gap-2 px-3 py-1.5 rounded border-2 border-dashed border-corp-gray bg-corp-gray-light/30 text-corp-text-light cursor-not-allowed">
				<span className="text-xs">🔒</span>
				<span className="text-sm font-medium">{featureName}</span>
			</div>
			{tooltip && (
				<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
					<div className="bg-corp-text text-white text-xs rounded px-3 py-2 whitespace-nowrap shadow-lg">
						{tooltip}
						<div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-corp-text"></div>
					</div>
				</div>
			)}
		</div>
	);
};

export const LockedFeatureCard = ({ title, description, value = 'High' }) => {
	return (
		<div className="rounded border-2 border-dashed border-corp-gray bg-corp-gray-light/20 p-6 relative overflow-hidden">
			{/* Overlay */}
			<div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
				<div className="text-center">
					<div className="text-4xl mb-2">🔒</div>
					<div className="text-sm font-semibold text-corp-text">Coming Soon</div>
					<div className="text-xs text-corp-text-light mt-1">Part of Roadmap</div>
				</div>
			</div>
			
			{/* Content (slightly faded) */}
			<div className="relative opacity-50">
				<div className="flex items-center gap-2 mb-2">
					<h4 className="font-semibold text-corp-text">{title}</h4>
					<span className={`text-xs px-2 py-1 rounded font-medium ${
						value === 'High' 
							? 'bg-corp-green/20 text-corp-green-dark border border-corp-green'
							: 'bg-amber-100 text-amber-800 border border-amber-300'
					}`}>
						{value} Value
					</span>
				</div>
				<p className="text-sm text-corp-text-light">{description}</p>
			</div>
		</div>
	);
};

