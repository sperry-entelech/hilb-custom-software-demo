import { useState } from 'react';

export const UploadForm = ({ onSubmit }) => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		phone: '',
		positionType: 'early_career',
	});

	return (
		<form
			className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit?.(form);
			}}
		>
			<label className="flex flex-col text-sm">
				<span className="mb-1 font-medium text-hilb-lime">Candidate name</span>
				<input
					className="rounded border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 focus:border-hilb-lime focus:outline-none"
					required
					value={form.name}
					onChange={(e) => setForm({ ...form, name: e.target.value })}
				/>
			</label>
			<label className="flex flex-col text-sm">
				<span className="mb-1 font-medium text-hilb-lime">Email (optional)</span>
				<input
					className="rounded border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 focus:border-hilb-lime focus:outline-none"
					type="email"
					value={form.email}
					onChange={(e) => setForm({ ...form, email: e.target.value })}
				/>
			</label>
			<label className="flex flex-col text-sm">
				<span className="mb-1 font-medium text-hilb-lime">Phone (optional)</span>
				<input
					className="rounded border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 focus:border-hilb-lime focus:outline-none"
					value={form.phone}
					onChange={(e) => setForm({ ...form, phone: e.target.value })}
				/>
			</label>
			<label className="flex flex-col text-sm">
				<span className="mb-1 font-medium text-hilb-lime">Position type</span>
				<select
					className="rounded border border-gray-700 bg-gray-800 px-3 py-2 text-gray-100 focus:border-hilb-lime focus:outline-none"
					value={form.positionType}
					onChange={(e) => setForm({ ...form, positionType: e.target.value })}
				>
					<option value="early_career">Early Career Development Program</option>
					<option value="general">General Position</option>
				</select>
			</label>
			<div className="md:col-span-2 mt-2">
				<button type="submit" className="rounded bg-hilb-lime px-4 py-2 font-semibold text-gray-900 hover:bg-hilb-lime-dark transition-colors">
					Continue
				</button>
			</div>
		</form>
	);
};
