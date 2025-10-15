import { NextRequest, NextResponse } from 'next/server';
import { reviewCode } from '@/lib/ai/deepseek';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_PARAMS', message: '缺少代码参数' } },
        { status: 400 }
      );
    }

    const review = await reviewCode(code);

    return NextResponse.json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error('AI review error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AI_ERROR',
          message: error instanceof Error ? error.message : 'AI 服务暂时不可用',
        },
      },
      { status: 500 }
    );
  }
}

