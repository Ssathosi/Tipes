import { createAuthClient } from 'better-auth/react';

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_APP_URL || 'https://sth-tipes.vercel.app',
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;

// Export for backward compatibility with existing code
export const auth = authClient;

