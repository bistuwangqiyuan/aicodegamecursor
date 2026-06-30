'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Code2, Zap, Target, Settings, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { siteConfig, roleLabels } from '@/config/site';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  const level = user?.level ?? 1;
  const xp = user?.xp ?? 0;
  const coins = user?.coins ?? 0;
  const tasksCompleted = user?.totalTasksCompleted ?? 0;
  const nextLevelXp = siteConfig.gamification.levelUpXp[level] ?? 5000;
  const xpNeeded = Math.max(0, nextLevelXp - xp);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">
          {loading ? '加载中...' : `欢迎回来，${user?.displayName || '同学'}！`}
        </h1>
        <p className="text-muted-foreground">
          {siteConfig.project.internship} · {siteConfig.project.aiProgramming} · 继续你的 {siteConfig.university.shortName} 编程学习之旅
        </p>
        {user && (
          <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {roleLabels[user.role] || user.role}
            {user.isGuest && ' · 30天试用'}
          </span>
        )}
      </div>

      {(user?.role === 'teacher' || user?.role === 'admin') && (
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Settings className="h-5 w-5" />
              {user.role === 'admin' ? '系统管理' : '课程管理'}
            </CardTitle>
            <CardDescription>
              {user.role === 'admin'
                ? '管理员功能：用户管理、系统配置（演示占位）'
                : '教师功能：课程发布、学生进度查看（演示占位）'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" disabled>
              <BookOpen className="mr-2 h-4 w-4" />
              {user.role === 'admin' ? '进入管理后台' : '管理我的课程'}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">当前等级</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Level {level}</div>
            <p className="text-xs text-muted-foreground">
              {level >= 3 ? '信科编程新星' : '新手程序员'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总经验值</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{xp} XP</div>
            <p className="text-xs text-muted-foreground">距离下一级还需 {xpNeeded} XP</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">完成任务</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasksCompleted}</div>
            <p className="text-xs text-muted-foreground">
              {tasksCompleted === 0 ? '开始你的第一个任务' : '继续加油！'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">金币</CardTitle>
            <Code2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coins}</div>
            <p className="text-xs text-muted-foreground">完成任务获得金币</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">学习路径</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { level: 1, title: 'HTML5 基础', description: '创建北信科校园介绍页', progress: level >= 2 ? 100 : level === 1 ? 30 : 0 },
            { level: 2, title: 'CSS 样式', description: '信科蓝主题页面设计', progress: level >= 3 ? 100 : 0, locked: level < 2 },
            { level: 3, title: 'JavaScript 基础', description: '校园应用交互开发', progress: 0, locked: level < 3 },
          ].map((course) => (
            <Card key={course.level} className={course.locked ? 'opacity-60' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Level {course.level}</CardTitle>
                  {course.locked && <span className="text-xs text-muted-foreground">🔒 已锁定</span>}
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2 h-2 w-full rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${course.progress}%` }} />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{course.progress}% 完成</span>
                  {!course.locked && (
                    <Button size="sm" asChild>
                      <Link href="/courses">开始学习</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-bold">成就系统</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-muted-foreground">
              <Trophy className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>完成任务解锁「信科新星」「勤学标兵」等成就徽章</p>
              <Button className="mt-4" asChild>
                <Link href="/courses">开始第一个课程</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
