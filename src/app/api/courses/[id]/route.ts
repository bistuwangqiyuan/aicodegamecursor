import { NextResponse } from 'next/server';
import { getCourseById, getLessonsByCourseId } from '@/lib/db/queries';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = parseInt(params.id);
    
    if (isNaN(courseId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid course ID' },
        { status: 400 }
      );
    }

    const [course, lessons] = await Promise.all([
      getCourseById(courseId),
      getLessonsByCourseId(courseId)
    ]);

    if (!course) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Course not found',
          message: 'Database may not be initialized. Please run migrations.'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...course,
        lessons: lessons || []
      }
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    
    // 如果数据库未初始化，返回友好错误
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database not initialized',
        message: 'Please run database migrations first.'
      },
      { status: 200 }
    );
  }
}

