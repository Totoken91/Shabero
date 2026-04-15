import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'pkce',
    detectSessionInUrl: false,
  },
})

export const OAUTH_REDIRECT_NATIVE = 'com.shabero.app://auth/callback'
export const OAUTH_REDIRECT_WEB = typeof window !== 'undefined' ? window.location.origin : ''
