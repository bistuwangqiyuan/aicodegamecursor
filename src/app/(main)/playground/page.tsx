import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: '代码实验场 - GameCode Lab',
  description: '在线编写和运行 HTML、CSS、JavaScript 代码',
};

export default function PlaygroundPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b bg-card px-4">
        <Link href="/dashboard" className="text-lg font-bold">
          GameCode Lab - 代码实验场
        </Link>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            保存
          </Button>
          <Button size="sm">运行</Button>
        </div>
      </header>

      {/* Editor & Preview */}
      <div className="flex flex-1 overflow-hidden">
        {/* Code Panels */}
        <div className="flex w-1/2 flex-col border-r">
          {/* HTML Panel */}
          <div className="flex-1 border-b">
            <div className="flex h-10 items-center border-b bg-muted px-4 text-sm font-medium">
              HTML
            </div>
            <textarea
              className="h-[calc(100%-2.5rem)] w-full resize-none bg-card p-4 font-mono text-sm"
              placeholder="在这里编写 HTML 代码..."
              defaultValue={`<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is my first web page.</p>
</body>
</html>`}
            />
          </div>

          {/* CSS Panel */}
          <div className="flex-1 border-b">
            <div className="flex h-10 items-center border-b bg-muted px-4 text-sm font-medium">
              CSS
            </div>
            <textarea
              className="h-[calc(100%-2.5rem)] w-full resize-none bg-card p-4 font-mono text-sm"
              placeholder="在这里编写 CSS 代码..."
              defaultValue={`body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f5f5f5;
}

h1 {
  color: #333;
}`}
            />
          </div>

          {/* JS Panel */}
          <div className="flex-1">
            <div className="flex h-10 items-center border-b bg-muted px-4 text-sm font-medium">
              JavaScript
            </div>
            <textarea
              className="h-[calc(100%-2.5rem)] w-full resize-none bg-card p-4 font-mono text-sm"
              placeholder="在这里编写 JavaScript 代码..."
              defaultValue={`console.log('Hello, GameCode Lab!');

// 在这里编写你的 JavaScript 代码`}
            />
          </div>
        </div>

        {/* Preview Panel */}
        <div className="flex w-1/2 flex-col">
          <div className="flex h-10 items-center border-b bg-muted px-4 text-sm font-medium">
            预览
          </div>
          <iframe
            className="h-[calc(100%-2.5rem)] w-full bg-white"
            title="preview"
            sandbox="allow-scripts"
          />
        </div>
      </div>

      {/* Console */}
      <div className="h-32 border-t bg-card">
        <div className="flex h-10 items-center border-b bg-muted px-4 text-sm font-medium">
          控制台
        </div>
        <div className="h-[calc(100%-2.5rem)] overflow-auto p-4 font-mono text-sm">
          <div className="text-muted-foreground">控制台输出将显示在这里...</div>
        </div>
      </div>
    </div>
  );
}

