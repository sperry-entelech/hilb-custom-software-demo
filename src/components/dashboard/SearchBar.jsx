import { useState } from 'react';

export const SearchBar = ({ onSearch }) => {
	const [query, setQuery] = useState('');

	function handleChange(e) {
		const value = e.target.value;
		setQuery(value);
		onSearch?.(value);
	}

	return (
		<div className="mb-6">
			<input
				type="text"
				placeholder="Search by name, email, or university..."
				value={query}
				onChange={handleChange}
				className="w-full rounded border border-[#3d3d3d] bg-[#2d2d2d] px-4 py-2 text-white placeholder:text-[#666666] focus:border-corp-green focus:outline-none shadow-corp"
			/>
		</div>
	);
};

