import { NextResponse } from 'next/server';
import { getUserByEmail } from '@/lib/db/queries';
import { verifyPassword } from '@/lib/auth/password';
import { createSessionToken, COOKIE_NAME } from '@/lib/auth/session';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: '请输入邮箱和密码' }, { status: 400 });
    }

    const user = await getUserByEmail(email);

    if (!user || !user.password_hash) {
      return NextResponse.json({ error: '邮箱或密码错误' }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: '邮箱或密码错误' }, { status: 401 });
    }

    await sql`UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ${user.id}`;

    const sessionUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      displayName: user.display_name || user.username,
      role: user.role,
      isGuest: user.is_guest,
    };

    const token = await createSessionToken(sessionUser);

    const response = NextResponse.json({ user: sessionUser });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: '登录失败，请稍后重试' }, { status: 500 });
  }
}
