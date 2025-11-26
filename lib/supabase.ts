import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_API_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please add SUPABASE_URL and SUPABASE_API_KEY to your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

