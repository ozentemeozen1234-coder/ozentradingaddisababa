
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)
export async function testSupabaseConnection() {
  const { error } = await supabase
    .from('business_partner_inquiries')
    .select('id')
    .limit(1)

  if (error) {
    console.error('Supabase connection test failed:', error.message)
    return false
  }

  console.log('Supabase connection successful!')
  return true
}