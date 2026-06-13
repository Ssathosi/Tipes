import { betterAuth } from 'better-auth';
import { toNodeHandler } from 'better-auth/integrations/node';
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
    process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  ],
});

export default async function handler(req: any, res: any) {
  return toNodeHandler(auth)(req, res);
}
