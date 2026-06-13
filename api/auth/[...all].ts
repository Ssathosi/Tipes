import { toNextJsHandler } from 'better-auth/next-js';
import { betterAuth } from 'better-auth';
import { supabaseAdapter } from 'better-auth/adapters/supabase';

export const auth = betterAuth({
  database: supabaseAdapter({
    url: process.env.VITE_SUPABASE_URL!,
    key: process.env.VITE_SUPABASE_ANON_KEY!,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
});

export default toNextJsHandler(auth);
