import { NextResponse } from 'next/server';
import { getAllCourses } from '@/lib/db/queries';

export async function GET() {
  try {
    const courses = await getAllCourses();
    
    return NextResponse.json({
      success: true,
      data: courses || [],
      total: courses?.length || 0
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    
    // 如果数据库未初始化，返回空数组而不是错误
    return NextResponse.json(
      {
        success: true,
        data: [],
        total: 0,
        message: 'Database not initialized. Please run migrations.'
      },
      { status: 200 }
    );
  }
}

