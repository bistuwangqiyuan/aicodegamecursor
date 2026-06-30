import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';

export interface SessionUser {
  id: number;
  email: string;
  username: string;
  displayName: string;
  role: string;
  isGuest: boolean;
}

export const COOKIE_NAME = 'gamecode-session';

function getSecret() {
  const secret = process.env.AUTH_SECRET || 'dev-secret-change-in-production-min-32-chars';
  return new TextEncoder().encode(secret);
}

export async function getSessionFromRequest(request: NextRequest): Promise<SessionUser | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    return {
      id: payload.id as number,
      email: payload.email as string,
      username: payload.username as string,
      displayName: payload.displayName as string,
      role: payload.role as string,
      isGuest: payload.isGuest as boolean,
    };
  } catch {
    return null;
  }
}
