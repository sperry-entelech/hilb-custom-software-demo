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
				<span className="mb-1 font-medium text-hilb-navy-dark">Candidate name</span>
				<input className="rounded border px-3 py-2" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
			</label>
			<label className="flex flex-col text-sm">
				<span className="mb-1 font-medium text-hilb-navy-dark">Email (optional)</span>
				<input className="rounded border px-3 py-2" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
			</label>
			<label className="flex flex-col text-sm">
				<span className="mb-1 font-medium text-hilb-navy-dark">Phone (optional)</span>
				<input className="rounded border px-3 py-2" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
			</label>
			<label className="flex flex-col text-sm">
				<span className="mb-1 font-medium text-hilb-navy-dark">Position type</span>
				<select className="rounded border px-3 py-2" value={form.positionType} onChange={(e) => setForm({ ...form, positionType: e.target.value })}>
					<option value="early_career">Early Career Development Program</option>
					<option value="general">General Position</option>
				</select>
			</label>
			<div className="md:col-span-2 mt-2">
				<button type="submit" className="rounded bg-hilb-lime px-4 py-2 font-semibold text-white hover:bg-hilb-lime-dark">Continue</button>
			</div>
		</form>
	);
};
