import { createClient } from '@supabase/supabase-js';

// Try multiple common env names (Vite, Vercel integrations)
const supabaseUrl =
	import.meta.env.VITE_SUPABASE_URL ||
	import.meta.env.SUPABASE_URL ||
	import.meta.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseAnonKey =
	import.meta.env.VITE_SUPABASE_ANON_KEY ||
	import.meta.env.SUPABASE_ANON_KEY ||
	import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	console.warn('Supabase env vars missing. Set one of: VITE_SUPABASE_URL/SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL and VITE_SUPABASE_ANON_KEY/SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
