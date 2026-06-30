import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `代码实验场 - ${siteConfig.name}`,
  description: '在线编写和运行 HTML、CSS、JavaScript 代码',
};

export default function PlaygroundPage() {
  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 4rem)' }}>
      <div className="flex h-12 items-center justify-between border-b bg-card px-4">
        <span className="text-sm font-medium">
          {siteConfig.project.internship} · {siteConfig.project.aiProgramming} · {siteConfig.name} 代码实验场
        </span>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">保存</Button>
          <Button size="sm">运行</Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-1/2 flex-col border-r">
          <div className="flex-1 border-b">
            <div className="flex h-10 items-center border-b bg-muted px-4 text-sm font-medium">HTML</div>
            <textarea
              className="h-[calc(100%-2.5rem)] w-full resize-none bg-card p-4 font-mono text-sm"
              placeholder="在这里编写 HTML 代码..."
              defaultValue={`<!DOCTYPE html>
<html>
<head>
  <title>北京信息科技大学</title>
</head>
<body>
  <header style="background:#0066B3;color:white;padding:20px;text-align:center;">
    <h1>北京信息科技大学</h1>
    <p>勤以为学，信以立身</p>
  </header>
  <main style="padding:20px;">
    <h2>欢迎来到 GameCode Lab</h2>
    <p>信科大学生的 Web 编程学习平台</p>
  </main>
</body>
</html>`}
            />
          </div>
          <div className="flex-1 border-b">
            <div className="flex h-10 items-center border-b bg-muted px-4 text-sm font-medium">CSS</div>
            <textarea
              className="h-[calc(100%-2.5rem)] w-full resize-none bg-card p-4 font-mono text-sm"
              placeholder="在这里编写 CSS 代码..."
              defaultValue={`body {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  margin: 0;
  background: #f5f7fa;
}

h2 {
  color: #0066B3;
}

p {
  color: #666;
  line-height: 1.6;
}`}
            />
          </div>
          <div className="flex-1">
            <div className="flex h-10 items-center border-b bg-muted px-4 text-sm font-medium">JavaScript</div>
            <textarea
              className="h-[calc(100%-2.5rem)] w-full resize-none bg-card p-4 font-mono text-sm"
              placeholder="在这里编写 JavaScript 代码..."
              defaultValue={`console.log('Hello, ${siteConfig.university.shortName}!');
console.log('${siteConfig.university.motto}');

// 在这里编写你的 JavaScript 代码`}
            />
          </div>
        </div>

        <div className="flex w-1/2 flex-col">
          <div className="flex h-10 items-center border-b bg-muted px-4 text-sm font-medium">预览</div>
          <iframe className="h-[calc(100%-2.5rem)] w-full bg-white" title="preview" sandbox="allow-scripts" />
        </div>
      </div>

      <div className="h-24 border-t bg-card">
        <div className="flex h-8 items-center border-b bg-muted px-4 text-sm font-medium">控制台</div>
        <div className="overflow-auto p-3 font-mono text-xs">
          <div className="text-muted-foreground">控制台输出将显示在这里...</div>
        </div>
      </div>
    </div>
  );
}
