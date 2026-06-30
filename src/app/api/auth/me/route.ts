import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { getUserById } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ user: null });
  }

  try {
    const dbUser = await getUserById(session.id);
    const user = {
      id: session.id,
      email: session.email,
      username: session.username,
      displayName: session.displayName,
      role: session.role,
      isGuest: session.isGuest,
      level: dbUser?.level ?? 1,
      xp: dbUser?.xp ?? 0,
      coins: dbUser?.coins ?? 0,
      totalTasksCompleted: dbUser?.total_tasks_completed ?? 0,
      streakDays: dbUser?.streak_days ?? 0,
    };
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({
      user: {
        id: session.id,
        email: session.email,
        username: session.username,
        displayName: session.displayName,
        role: session.role,
        isGuest: session.isGuest,
        level: 1,
        xp: 0,
        coins: 0,
        totalTasksCompleted: 0,
        streakDays: 0,
      },
    });
  }
}
