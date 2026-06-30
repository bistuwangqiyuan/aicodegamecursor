import { NextResponse } from 'next/server';
import { sql } from '@/lib/db/client';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 测试数据库连接
    const result = await sql`SELECT NOW() as time`;
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      timestamp: result.rows[0].time,
      message: `${siteConfig.project.internship} · ${siteConfig.project.aiProgramming} · ${siteConfig.name} API is running`,
      project: siteConfig.project.fullTitle,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

