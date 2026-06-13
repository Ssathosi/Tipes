import { betterAuth } from 'better-auth';
import { dash } from '@better-auth/infra';

export const config = {
  runtime: 'nodejs',
};

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

export default async function handler(req: any, res: any) {
  const url = new URL(req.url || '/', `https://${req.headers.host}`);
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) headers.set(key, String(value));
  }

  const request = new Request(url, {
    method: req.method,
    headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
  });

  const response = await auth.handler(request);

  const responseHeaders: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  // Handle Set-Cookie headers separately (they can have multiple values)
  const setCookies = response.headers.getSetCookie?.() || [];
  if (setCookies.length > 0) {
    res.setHeader('set-cookie', setCookies);
  }

  res.writeHead(response.status, responseHeaders);

  const body = await response.text();
  res.end(body);
}
