import { NextRequest, NextResponse } from 'next/server';
import { explainCode } from '@/lib/ai/deepseek';

export async function POST(request: NextRequest) {
  try {
    const { code, language } = await request.json();

    if (!code || !language) {
      return NextResponse.json(
        { success: false, error: { code: 'MISSING_PARAMS', message: '缺少必要参数' } },
        { status: 400 }
      );
    }

    const explanation = await explainCode(code, language);

    return NextResponse.json({
      success: true,
      data: { explanation },
    });
  } catch (error) {
    console.error('AI explain error:', error);
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

