import { NextRequest, NextResponse } from 'next/server';

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1';

export async function POST(request: NextRequest) {
  try {
    const { code, error, language = 'html' } = await request.json();

    if (!code || !error) {
      return NextResponse.json(
        { success: false, error: 'Code and error message are required' },
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
            content: 'You are a helpful programming tutor. Diagnose code errors and provide clear, actionable solutions.'
          },
          {
            role: 'user',
            content: `I'm getting this error in my ${language} code:\n\nError: ${error}\n\nCode:\n${code}\n\nPlease explain what's wrong and how to fix it.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    const diagnosis = data.choices[0]?.message?.content || 'No diagnosis available';

    return NextResponse.json({
      success: true,
      data: {
        diagnosis,
        language
      }
    });
  } catch (error) {
    console.error('Error diagnosing code:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to diagnose code'
      },
      { status: 500 }
    );
  }
}
