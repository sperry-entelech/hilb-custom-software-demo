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

// Create client with fallback empty string to prevent crashes
export const supabase = supabaseUrl && supabaseAnonKey
	? createClient(supabaseUrl, supabaseAnonKey)
	: createClient('https://placeholder.supabase.co', 'placeholder-key');

// Log warning if not configured
if (!supabaseUrl || !supabaseAnonKey) {
	console.warn('⚠️ Supabase not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel environment variables.');
}
