import { supabase } from './supabase.js';

export async function saveCandidate({ candidateInfo, resumeFile, resumeText, analysis }) {
	// Upload resume to Supabase Storage
	const fileExt = resumeFile.name.split('.').pop();
	const fileName = `${Date.now()}_${candidateInfo.name.replace(/\s+/g, '_')}.${fileExt}`;
	const { data: uploadData, error: uploadError } = await supabase.storage
		.from('resumes')
		.upload(fileName, resumeFile, { contentType: 'application/pdf' });

	if (uploadError) throw new Error(`Failed to upload resume: ${uploadError.message}`);

	const { data: { publicUrl } } = supabase.storage.from('resumes').getPublicUrl(fileName);

	// Save candidate to database
	const candidateData = {
		name: candidateInfo.name,
		email: candidateInfo.email || null,
		phone: candidateInfo.phone || null,
		position_type: candidateInfo.positionType,
		resume_url: publicUrl,
		resume_text: resumeText,
		resume_filename: resumeFile.name,
		overall_score: analysis.overall_score,
		position_specific_score: analysis.position_specific_score,
		education_score: analysis.category_scores?.education || null,
		experience_score: analysis.category_scores?.experience || null,
		traits_score: analysis.category_scores?.traits || null,
		industry_fit_score: analysis.category_scores?.industry_fit || null,
		strengths: analysis.strengths || [],
		concerns: analysis.concerns || [],
		key_qualifications: analysis.key_qualifications || [],
		ai_reasoning: analysis.reasoning || null,
		trait_assessment: analysis.trait_assessment || {},
		campus_involvement: analysis.campus_involvement || [],
		potential_roles: analysis.potential_roles || [],
		degree_field: analysis.degree_field || null,
		gpa: analysis.gpa || null,
		university: analysis.university || null,
		status: 'pending',
		processed: true,
	};

	const { data, error } = await supabase.from('candidates').insert([candidateData]).select().single();

	if (error) throw new Error(`Failed to save candidate: ${error.message}`);
	return data;
}

export async function loadCandidates(filters = {}) {
	let query = supabase.from('candidates').select('*').order('created_at', { ascending: false });

	if (filters.positionType && filters.positionType !== 'all') {
		query = query.eq('position_type', filters.positionType);
	}

	if (filters.status && filters.status !== 'all') {
		query = query.eq('status', filters.status);
	}

	if (filters.degree && filters.degree !== 'all') {
		query = query.eq('degree_field', filters.degree);
	}

	if (filters.scoreRange && filters.scoreRange !== 'all') {
		if (filters.scoreRange === 'high') query = query.gte('overall_score', 76).lte('overall_score', 100);
		else if (filters.scoreRange === 'medium') query = query.gte('overall_score', 51).lte('overall_score', 75);
		else if (filters.scoreRange === 'low') query = query.gte('overall_score', 0).lte('overall_score', 50);
	}

	const { data, error } = await query;

	if (error) throw new Error(`Failed to load candidates: ${error.message}`);
	
	// Client-side search filtering (Supabase text search is limited)
	let filtered = data || [];
	if (filters.search && filters.search.trim()) {
		const searchLower = filters.search.toLowerCase().trim();
		filtered = filtered.filter(c => 
			(c.name?.toLowerCase().includes(searchLower)) ||
			(c.email?.toLowerCase().includes(searchLower)) ||
			(c.university?.toLowerCase().includes(searchLower))
		);
	}
	
	return filtered;
}

export async function updateCandidate(id, updates) {
	const { data, error } = await supabase
		.from('candidates')
		.update({ ...updates, updated_at: new Date().toISOString() })
		.eq('id', id)
		.select()
		.single();

	if (error) throw new Error(`Failed to update candidate: ${error.message}`);
	return data;
}

export async function deleteCandidate(id) {
	const { error } = await supabase.from('candidates').delete().eq('id', id);
	if (error) throw new Error(`Failed to delete candidate: ${error.message}`);
}

export async function bulkUpdateStatus(ids, status) {
	const { error } = await supabase
		.from('candidates')
		.update({ status, updated_at: new Date().toISOString() })
		.in('id', ids);

	if (error) throw new Error(`Failed to update candidates: ${error.message}`);
}

export async function bulkDelete(ids) {
	const { error } = await supabase
		.from('candidates')
		.delete()
		.in('id', ids);

	if (error) throw new Error(`Failed to delete candidates: ${error.message}`);
}

