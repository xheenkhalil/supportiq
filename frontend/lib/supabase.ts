import { createClient } from '@supabase/supabase-js';

// Strict check to ensure env vars are loaded
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('❌ Missing Supabase Environment Variables in .env.local');
}

// Export the client for use in components
export const supabase = createClient(supabaseUrl, supabaseAnonKey);