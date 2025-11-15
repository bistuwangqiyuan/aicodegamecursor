import { NextRequest, NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1';

export async function POST(request: NextRequest) {
  try {
    const { code, language = 'html' } = await request.json();

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'Code is required' },
        { status: 400 }
      );
    }

    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { success: false, error: 'AI API key not configured' },
        { status: 500 }
      );
    }

    const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a code reviewer. Provide constructive feedback on code quality, best practices, and potential improvements.'
          },
          {
            role: 'user',
            content: `Please review this ${language} code and provide feedback:\n\n${code}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    const review = data.choices[0]?.message?.content || 'No review available';

    return NextResponse.json({
      success: true,
      data: {
        review,
        language
      }
    });
  } catch (error) {
    console.error('Error reviewing code:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to review code'
      },
      { status: 500 }
    );
  }
}
