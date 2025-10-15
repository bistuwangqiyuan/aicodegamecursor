import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '课程列表 - GameCode Lab',
  description: '浏览所有编程课程',
};

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: 'HTML5 基础',
      level: 1,
      description: '学习 HTML5 的基础标签和结构，掌握网页构建的基本技能',
      lessons: 10,
      difficulty: 'beginner',
      xp: 200,
      locked: false,
    },
    {
      id: 2,
      title: 'CSS 样式入门',
      level: 2,
      description: '掌握 CSS 的基本样式和布局技巧，让网页更加美观',
      lessons: 12,
      difficulty: 'beginner',
      xp: 240,
      locked: true,
    },
    {
      id: 3,
      title: 'JavaScript 基础',
      level: 3,
      description: '学习 JavaScript 的核心语法和编程概念',
      lessons: 15,
      difficulty: 'intermediate',
      xp: 300,
      locked: true,
    },
    {
      id: 4,
      title: 'DOM 操作与交互',
      level: 4,
      description: '学习操作网页元素，实现动态交互效果',
      lessons: 10,
      difficulty: 'intermediate',
      xp: 200,
      locked: true,
    },
    {
      id: 5,
      title: '综合项目实战',
      level: 5,
      description: '通过完整项目，综合运用所学技能',
      lessons: 8,
      difficulty: 'advanced',
      xp: 400,
      locked: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">
            GameCode Lab
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:text-primary">
              面板
            </Link>
            <Link href="/playground" className="hover:text-primary">
              实验场
            </Link>
            <Link href="/projects" className="hover:text-primary">
              作品
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
          <h1 className="mb-2 text-3xl font-bold">课程列表</h1>
          <p className="text-muted-foreground">选择一个课程开始学习编程</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className={course.locked ? 'opacity-60' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Level {course.level}
                  </span>
                  {course.locked && <span className="text-xs text-muted-foreground">🔒</span>}
                </div>
                <CardTitle className="text-xl">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>课时数量</span>
                    <span className="font-medium text-foreground">{course.lessons} 课</span>
                  </div>
                  <div className="flex justify-between">
                    <span>难度</span>
                    <span className="font-medium text-foreground">
                      {course.difficulty === 'beginner'
                        ? '初级'
                        : course.difficulty === 'intermediate'
                          ? '中级'
                          : '高级'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>总奖励</span>
                    <span className="font-medium text-foreground">{course.xp} XP</span>
                  </div>
                </div>
                {!course.locked ? (
                  <Button className="w-full" asChild>
                    <Link href={`/courses/${course.id}`}>开始学习</Link>
                  </Button>
                ) : (
                  <Button className="w-full" disabled>
                    需要 Level {course.level}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

