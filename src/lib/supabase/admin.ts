import { createClient } from '@supabase/supabase-js';

// Server-only client using service role key (bypasses RLS)
// Used in API routes / Server Actions / Webhook handlers / Admin writes
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
