// Middleware for authentication
// TODO: Implement authentication with NextAuth.js or other auth solution

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(_request: NextRequest) {
  // For now, allow all requests
  // TODO: Add authentication logic
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/courses/:path*',
    '/playground/:path*',
    '/projects/:path*',
  ],
};
