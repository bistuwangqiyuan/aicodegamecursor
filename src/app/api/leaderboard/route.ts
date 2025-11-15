import { NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/db/queries';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'all_time';
    const limit = parseInt(searchParams.get('limit') || '100');

    const leaderboard = await getLeaderboard(period, limit);

    return NextResponse.json({
      success: true,
      data: leaderboard || [],
      period,
      total: leaderboard?.length || 0
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    
    // 如果数据库未初始化，返回空数组
    return NextResponse.json(
      {
        success: true,
        data: [],
        period: 'all_time',
        total: 0,
        message: 'Database not initialized. Please run migrations.'
      },
      { status: 200 }
    );
  }
}

