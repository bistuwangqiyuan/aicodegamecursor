import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Eye } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `作品展示 - ${siteConfig.name}`,
  description: '浏览信科学子的优秀编程作品',
};

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: '北信科课表查询',
      author: '张信科',
      description: '为信科大学生打造的简易课表查询页面，使用 HTML/CSS/JS 实现',
      likes: 42,
      views: 156,
      tag: '校园工具',
    },
    {
      id: 2,
      title: '社团招新海报',
      author: '张信科',
      description: '计算机协会招新宣传页，采用信科蓝主题色设计',
      likes: 28,
      views: 89,
      tag: '社团活动',
    },
    {
      id: 3,
      title: '信科蓝导航组件',
      author: '李老师',
      description: '符合北信科 VI 规范的导航栏组件，可用于校园网站',
      likes: 65,
      views: 230,
      tag: 'UI组件',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">信科作品墙</h1>
          <p className="text-muted-foreground">
            {siteConfig.project.internship} · {siteConfig.project.aiProgramming} · {siteConfig.university.shortName} 学子优秀作品
          </p>
        </div>
        <Button asChild>
          <Link href="/playground">创建作品</Link>
        </Button>
      </div>

      <div className="mb-6 flex gap-2">
        <Button variant="default" size="sm">最新</Button>
        <Button variant="outline" size="sm">最热</Button>
        <Button variant="outline" size="sm">精选</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-bistu-orange/20">
              <div className="flex h-full flex-col items-center justify-center text-primary">
                <span className="text-4xl">💻</span>
                <span className="mt-2 text-xs">{project.tag}</span>
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
    </div>
  );
}
