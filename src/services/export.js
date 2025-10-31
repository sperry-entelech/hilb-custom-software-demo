export function exportToCSV(candidates, filename = 'candidates.csv') {
	if (!candidates || candidates.length === 0) {
		alert('No candidates to export');
		return;
	}

	// Define CSV headers
	const headers = [
		'Name', 'Email', 'Phone', 'Position Type', 'Overall Score', 'Position Score',
		'Education Score', 'Experience Score', 'Traits Score', 'Industry Fit Score',
		'Degree Field', 'GPA', 'University', 'Status', 'Created At'
	];

	// Convert candidates to CSV rows
	const rows = candidates.map(c => [
		c.name || '',
		c.email || '',
		c.phone || '',
		c.position_type || '',
		c.overall_score || '',
		c.position_specific_score || '',
		c.education_score || '',
		c.experience_score || '',
		c.traits_score || '',
		c.industry_fit_score || '',
		c.degree_field || '',
		c.gpa || '',
		c.university || '',
		c.status || '',
		c.created_at ? new Date(c.created_at).toLocaleDateString() : ''
	]);

	// Combine headers and rows
	const csvContent = [
		headers.join(','),
		...rows.map(row => row.map(cell => {
			// Escape commas and quotes in cells
			const cellStr = String(cell || '');
			if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
				return `"${cellStr.replace(/"/g, '""')}"`;
			}
			return cellStr;
		}).join(','))
	].join('\n');

	// Create blob and download
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	const link = document.createElement('a');
	const url = URL.createObjectURL(blob);
	link.setAttribute('href', url);
	link.setAttribute('download', filename);
	link.style.visibility = 'hidden';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

export function exportCandidatePDF(candidate) {
	// Simple PDF generation using browser print functionality
	// For full PDF generation, you'd use a library like jsPDF or pdfkit
	const printWindow = window.open('', '_blank');
	const html = `
		<html>
			<head>
				<title>Candidate Report - ${candidate.name}</title>
				<style>
					body { font-family: Arial, sans-serif; padding: 20px; }
					h1 { color: #333; }
					.info { margin: 20px 0; }
					.scores { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 20px 0; }
					.score-card { border: 1px solid #ddd; padding: 10px; }
				</style>
			</head>
			<body>
				<h1>Candidate Report: ${candidate.name}</h1>
				<div class="info">
					<p><strong>Email:</strong> ${candidate.email || 'N/A'}</p>
					<p><strong>Phone:</strong> ${candidate.phone || 'N/A'}</p>
					<p><strong>Position:</strong> ${candidate.position_type === 'early_career' ? 'Early Career' : 'General'}</p>
					<p><strong>Status:</strong> ${candidate.status || 'pending'}</p>
				</div>
				<div class="scores">
					<div class="score-card"><strong>Overall:</strong> ${candidate.overall_score || 0}</div>
					<div class="score-card"><strong>Position:</strong> ${candidate.position_specific_score || 0}</div>
					<div class="score-card"><strong>Education:</strong> ${candidate.education_score || 0}</div>
					<div class="score-card"><strong>Experience:</strong> ${candidate.experience_score || 0}</div>
					<div class="score-card"><strong>Traits:</strong> ${candidate.traits_score || 0}</div>
					<div class="score-card"><strong>Industry Fit:</strong> ${candidate.industry_fit_score || 0}</div>
				</div>
				<h2>Strengths</h2>
				<ul>${Array.isArray(candidate.strengths) ? candidate.strengths.map(s => `<li>${s}</li>`).join('') : '<li>None</li>'}</ul>
				<h2>Concerns</h2>
				<ul>${Array.isArray(candidate.concerns) ? candidate.concerns.map(c => `<li>${c}</li>`).join('') : '<li>None</li>'}</ul>
			</body>
		</html>
	`;
	printWindow.document.write(html);
	printWindow.document.close();
	printWindow.print();
}

