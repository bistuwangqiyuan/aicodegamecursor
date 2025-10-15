/**
 * DeepSeek AI 客户端
 */

import { AIRequest, AIResponse } from '@/types';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

export async function callDeepSeek(request: AIRequest): Promise<AIResponse> {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DeepSeek API key not configured');
  }

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位耐心的编程导师，帮助初学者学习HTML、CSS和JavaScript。',
          },
          {
            role: 'user',
            content: request.prompt,
          },
        ],
        max_tokens: request.maxTokens || 2000,
        temperature: request.temperature || 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      content: data.choices[0].message.content,
      model: data.model,
      tokensUsed: data.usage?.total_tokens,
      finishReason: data.choices[0].finish_reason,
    };
  } catch (error) {
    console.error('DeepSeek API call failed:', error);
    throw error;
  }
}

export async function explainCode(code: string, language: string): Promise<string> {
  const prompt = `请为以下${language}代码提供详细的中文讲解：

\`\`\`${language}
${code}
\`\`\`

要求：
1. 用简单易懂的语言解释每个部分的作用
2. 指出关键概念和技术要点
3. 如果有更好的写法，请给出建议
4. 适合初学者理解`;

  const response = await callDeepSeek({ prompt });
  return response.content;
}

export async function diagnoseError(code: string, errorMessage: string): Promise<string> {
  const prompt = `用户的代码出现了错误，请帮助诊断并提供解决方案：

代码：
\`\`\`javascript
${code}
\`\`\`

错误信息：
${errorMessage}

请提供：
1. 错误原因分析
2. 具体的修复建议
3. 修改后的正确代码示例
4. 如何避免类似错误`;

  const response = await callDeepSeek({ prompt });
  return response.content;
}

export async function generateHint(taskDescription: string, userCode: string): Promise<string> {
  const prompt = `学生正在完成以下编程任务：

任务描述：
${taskDescription}

学生当前的代码：
\`\`\`
${userCode}
\`\`\`

请提供一个有帮助的提示（不要直接给出答案）：`;

  const response = await callDeepSeek({ prompt, maxTokens: 500 });
  return response.content;
}

export async function reviewCode(code: string): Promise<{
  score: number;
  feedback: string;
  suggestions: string[];
}> {
  const prompt = `请评审以下代码并打分（0-100）：

\`\`\`
${code}
\`\`\`

请以JSON格式返回：
{
  "score": 85,
  "feedback": "整体评价...",
  "suggestions": ["建议1", "建议2"]
}`;

  const response = await callDeepSeek({ prompt, maxTokens: 1000 });

  try {
    const result = JSON.parse(response.content);
    return result;
  } catch {
    return {
      score: 70,
      feedback: response.content,
      suggestions: [],
    };
  }
}

