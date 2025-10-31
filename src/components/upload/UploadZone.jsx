import { useRef, useState } from 'react';

export const UploadZone = ({ onFilesSelected }) => {
	const inputRef = useRef(null);
	const [drag, setDrag] = useState(false);

	return (
		<div
			className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors ${
				drag ? 'border-hilb-lime bg-hilb-lime/10' : 'border-gray-700 bg-gray-800/50'
			}`}
			onDragOver={(e) => {
				e.preventDefault();
				setDrag(true);
			}}
			onDragLeave={() => setDrag(false)}
			onDrop={(e) => {
				e.preventDefault();
				setDrag(false);
				const files = Array.from(e.dataTransfer.files || []);
				onFilesSelected?.(files);
			}}
			onClick={() => inputRef.current?.click()}
		>
			<p className="text-hilb-lime font-semibold">Drag & drop PDF resumes</p>
			<p className="mt-1 text-sm text-gray-400">or click to select (up to 10 files)</p>
			<input
				ref={inputRef}
				type="file"
				accept="application/pdf"
				multiple
				className="hidden"
				onChange={(e) => onFilesSelected?.(Array.from(e.target.files || []))}
			/>
		</div>
	);
};
