import { betterAuth } from 'better-auth';
import { toNodeHandler } from 'better-call/node';
import { dash } from '@better-auth/infra';

export const auth = betterAuth({
  database: {
    url: process.env.DATABASE_URL,
  },
  plugins: [dash()],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
  },
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || 'https://sth-tipes.vercel.app',
  ],
});

export default toNodeHandler(auth.handler);
