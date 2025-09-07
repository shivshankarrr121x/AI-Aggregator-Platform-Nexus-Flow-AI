import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  console.error('VITE_SUPABASE_URL is not set. Please add it in your project secrets.')
}

if (!supabaseAnonKey) {
  console.error('VITE_SUPABASE_ANON_KEY is not set. Please add it in your project secrets.')
}

// Create a fallback client that will work but won't connect to a real Supabase instance
const fallbackUrl = 'https://placeholder.supabase.co'
const fallbackKey = 'placeholder-key'

export const supabase = createClient(
  supabaseUrl || fallbackUrl, 
  supabaseAnonKey || fallbackKey
)