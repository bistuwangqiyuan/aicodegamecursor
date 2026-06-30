import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `课程列表 - ${siteConfig.name}`,
  description: `${siteConfig.university.shortName}大学生 Web 编程课程`,
};

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: 'HTML5 基础',
      level: 1,
      description: '为信科大学生打造，学习 HTML 标签，创建北信科校园介绍页',
      lessons: 10,
      difficulty: 'beginner',
      xp: 200,
      locked: false,
    },
    {
      id: 2,
      title: 'CSS 样式入门',
      level: 2,
      description: '掌握 CSS 布局，用信科蓝(#0066B3)主题美化校园网页',
      lessons: 12,
      difficulty: 'beginner',
      xp: 240,
      locked: true,
    },
    {
      id: 3,
      title: 'JavaScript 基础',
      level: 3,
      description: '学习 JS 核心语法，为课表查询、社团页面添加交互',
      lessons: 15,
      difficulty: 'intermediate',
      xp: 300,
      locked: true,
    },
    {
      id: 4,
      title: 'DOM 操作与交互',
      level: 4,
      description: '操作网页元素，实现校园应用的动态交互效果',
      lessons: 10,
      difficulty: 'intermediate',
      xp: 200,
      locked: true,
    },
    {
      id: 5,
      title: '综合项目实战',
      level: 5,
      description: '完成校园主题综合项目，展示于信科作品墙',
      lessons: 8,
      difficulty: 'advanced',
      xp: 400,
      locked: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">课程中心</h1>
        <p className="text-muted-foreground">
          {siteConfig.project.internship} · {siteConfig.project.aiProgramming} · {siteConfig.university.fullName} Web 编程课程
        </p>
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
                    {course.difficulty === 'beginner' ? '初级' : course.difficulty === 'intermediate' ? '中级' : '高级'}
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
    </div>
  );
}
