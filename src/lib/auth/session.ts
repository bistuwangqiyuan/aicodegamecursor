import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export interface SessionUser {
  id: number;
  email: string;
  username: string;
  displayName: string;
  role: string;
  isGuest: boolean;
}

const COOKIE_NAME = 'gamecode-session';

function getSecret() {
  const secret = process.env.AUTH_SECRET || 'dev-secret-change-in-production-min-32-chars';
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({
    id: user.id,
    email: user.email,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    isGuest: user.isGuest,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
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

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export { COOKIE_NAME };
