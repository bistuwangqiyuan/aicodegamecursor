import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Code2, Zap, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: '学习面板 - GameCode Lab',
  description: '查看你的学习进度和成就',
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">
            GameCode Lab
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/courses" className="hover:text-primary">
              课程
            </Link>
            <Link href="/playground" className="hover:text-primary">
              实验场
            </Link>
            <Link href="/projects" className="hover:text-primary">
              作品
            </Link>
            <Link href="/leaderboard" className="hover:text-primary">
              排行榜
            </Link>
            <Button asChild>
              <Link href="/login">登录</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">欢迎回来！</h1>
          <p className="text-muted-foreground">继续你的编程学习之旅</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">当前等级</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Level 1</div>
              <p className="text-xs text-muted-foreground">新手程序员</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总经验值</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0 XP</div>
              <p className="text-xs text-muted-foreground">距离下一级还需 100 XP</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">完成任务</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">开始你的第一个任务</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">金币</CardTitle>
              <Code2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">完成任务获得金币</p>
            </CardContent>
          </Card>
        </div>

        {/* Learning Path */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">学习路径</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                level: 1,
                title: 'HTML5 基础',
                description: '学习网页结构和语义化标签',
                progress: 0,
              },
              {
                level: 2,
                title: 'CSS 样式',
                description: '掌握页面布局和视觉设计',
                progress: 0,
                locked: true,
              },
              {
                level: 3,
                title: 'JavaScript 基础',
                description: '学习编程逻辑和语法',
                progress: 0,
                locked: true,
              },
            ].map((course) => (
              <Card key={course.level} className={course.locked ? 'opacity-60' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Level {course.level}</CardTitle>
                    {course.locked && (
                      <span className="text-xs text-muted-foreground">🔒 已锁定</span>
                    )}
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{course.progress}% 完成</span>
                    {!course.locked && (
                      <Button size="sm" asChild>
                        <Link href={`/courses/${course.level}`}>开始学习</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">成就系统</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <Trophy className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>完成任务解锁成就徽章</p>
                <Button className="mt-4" asChild>
                  <Link href="/courses/1">开始第一个课程</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

