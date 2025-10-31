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
				className="w-full rounded border border-corp-gray bg-white px-4 py-2 text-corp-text focus:border-corp-blue focus:outline-none shadow-corp"
			/>
		</div>
	);
};

