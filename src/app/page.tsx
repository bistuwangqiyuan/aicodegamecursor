'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Code2, 
  Gamepad2, 
  Bot, 
  Trophy, 
  Zap, 
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" />
              免费试用 30 天，开启编程之旅
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              让编程学习
              <span className="bg-gradient-primary bg-clip-text text-transparent"> 像玩游戏一样有趣</span>
            </h1>
            
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              GameCode Lab 通过游戏化机制和 AI 智能助教
              <br />
              让零基础学员系统掌握 HTML5、CSS、JavaScript 开发技能
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="group" asChild>
                <Link href="/dashboard">
                  立即开始学习
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild>
                <Link href="/courses">
                  浏览课程
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* 装饰性背景元素 */}
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            为什么选择 GameCode Lab？
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            四大核心优势，让学习更高效
          </p>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="card-hover rounded-lg border bg-card p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Gamepad2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">游戏化学习</h3>
              <p className="text-sm text-muted-foreground">
                等级系统、经验值、成就徽章、排行榜，让学习充满乐趣和动力
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="card-hover rounded-lg border bg-card p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">AI 智能助教</h3>
              <p className="text-sm text-muted-foreground">
                DeepSeek 驱动，实时讲解代码、诊断错误、提供个性化学习建议
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="card-hover rounded-lg border bg-card p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">在线代码沙盒</h3>
              <p className="text-sm text-muted-foreground">
                浏览器内实时编写和运行代码，所见即所得的学习体验
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="card-hover rounded-lg border bg-card p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">渐进式课程</h3>
              <p className="text-sm text-muted-foreground">
                从零基础到独立项目，5 个等级 55+ 课时，系统化学习路径
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            完整的学习路径
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            从零基础到独立开发，循序渐进掌握 Web 开发技能
          </p>
          
          <div className="mx-auto max-w-4xl space-y-4">
            {[
              { level: 1, title: 'HTML5 基础', desc: '学习网页结构和语义化标签', lessons: 10 },
              { level: 2, title: 'CSS 样式', desc: '掌握页面布局和视觉设计', lessons: 12 },
              { level: 3, title: 'JavaScript 基础', desc: '学习编程逻辑和语法', lessons: 15 },
              { level: 4, title: 'DOM 操作', desc: '实现动态交互效果', lessons: 10 },
              { level: 5, title: '综合实战', desc: '完成真实项目作品', lessons: 8 },
            ].map((item, index) => (
              <div
                key={index}
                className="card-hover flex items-center gap-6 rounded-lg border bg-card p-6"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  {item.level}
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 text-xl font-semibold">Level {item.level}: {item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{item.lessons}</div>
                  <div className="text-sm text-muted-foreground">课时</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              学员将获得
            </h2>
            
            <div className="space-y-4">
              {[
                '系统掌握 HTML5、CSS、JavaScript 核心技能',
                '独立完成响应式网页和交互式应用开发',
                'AI 助教 24/7 在线指导，随时解答疑问',
                '作品展示平台，建立个人技术作品集',
                '游戏化学习体验，保持持续学习动力',
                '免费试用 30 天，无需信用卡',
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Users className="mx-auto mb-6 h-16 w-16" />
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            准备开始你的编程之旅了吗？
          </h2>
          <p className="mb-8 text-lg opacity-90">
            加入 GameCode Lab，让 AI 助教陪你一起学习编程
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">
              免费注册开始学习
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-4 text-sm opacity-75">
            已有账号？
            <Link href="/login" className="ml-1 underline hover:opacity-100">
              立即登录
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

