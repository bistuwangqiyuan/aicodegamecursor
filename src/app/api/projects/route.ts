import { NextResponse } from 'next/server';
import { getPublicProjects } from '@/lib/db/queries';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const projects = await getPublicProjects(limit, offset);

    return NextResponse.json({
      success: true,
      data: projects || [],
      pagination: {
        limit,
        offset,
        hasMore: (projects?.length || 0) === limit
      }
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    // 如果数据库未初始化，返回空数组
    return NextResponse.json(
      {
        success: true,
        data: [],
        pagination: {
          limit: 20,
          offset: 0,
          hasMore: false
        },
        message: 'Database not initialized. Please run migrations.'
      },
      { status: 200 }
    );
  }
}

