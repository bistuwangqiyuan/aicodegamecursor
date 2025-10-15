import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, MessageSquare, Eye } from 'lucide-react';

export const metadata: Metadata = {
  title: '作品展示 - GameCode Lab',
  description: '浏览社区成员的优秀编程作品',
};

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: '我的第一个网页',
      author: 'Student A',
      description: '使用 HTML 和 CSS 创建的简单个人主页',
      likes: 42,
      comments: 8,
      views: 156,
      thumbnail: '/placeholder-project.jpg',
    },
    {
      id: 2,
      title: '交互式计算器',
      author: 'Student B',
      description: '使用 JavaScript 实现的功能完整的计算器',
      likes: 89,
      comments: 15,
      views: 324,
      thumbnail: '/placeholder-project.jpg',
    },
    {
      id: 3,
      title: '待办事项应用',
      author: 'Student C',
      description: '可以添加、删除和标记完成的待办事项列表',
      likes: 67,
      comments: 12,
      views: 289,
      thumbnail: '/placeholder-project.jpg',
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
            <Link href="/courses" className="hover:text-primary">
              课程
            </Link>
            <Link href="/playground" className="hover:text-primary">
              实验场
            </Link>
            <Button asChild>
              <Link href="/login">登录</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">作品展示</h1>
            <p className="text-muted-foreground">浏览社区成员的优秀编程作品</p>
          </div>
          <Button asChild>
            <Link href="/playground">创建作品</Link>
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-2">
          <Button variant="outline" size="sm">
            最新
          </Button>
          <Button variant="outline" size="sm">
            最热
          </Button>
          <Button variant="outline" size="sm">
            精选
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="aspect-video bg-muted">
                {/* Placeholder for project thumbnail */}
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  项目预览
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription>
                  作者：<span className="text-foreground">{project.author}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{project.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{project.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{project.views}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" asChild>
                    <Link href={`/projects/${project.id}`}>查看</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

