import { NextRequest, NextResponse } from 'next/server';
import { diagnoseError } from '@/lib/ai/deepseek';

export async function POST(request: NextRequest) {
  try {
    const { code, errorMessage } = await request.json();

    if (!code || !errorMessage) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_PARAMS', message: '缺少必要参数' } },
        { status: 400 }
      );
    }

    const diagnosis = await diagnoseError(code, errorMessage);

    return NextResponse.json({
      success: true,
      data: { diagnosis },
    });
  } catch (error) {
    console.error('AI diagnose error:', error);
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

