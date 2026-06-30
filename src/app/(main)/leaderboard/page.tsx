import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Crown } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `信科编程达人榜 · ${siteConfig.project.internship} · ${siteConfig.project.aiProgramming}`,
  description: `${siteConfig.project.internship} · ${siteConfig.project.aiProgramming} — 信科编程学习排行榜`,
};

export default function LeaderboardPage() {
  const leaderboard = [
    { rank: 1, username: '李老师', level: 5, xp: 1200, avatar: '🥇', role: '教师' },
    { rank: 2, username: '张信科', level: 3, xp: 350, avatar: '🥈', role: '大学生' },
    { rank: 3, username: '游客体验', level: 1, xp: 50, avatar: '🥉', role: '游客' },
    { rank: 4, username: '系统管理员', level: 1, xp: 0, avatar: '👑', role: '管理员' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Trophy className="mx-auto mb-4 h-16 w-16 text-primary" />
        <h1 className="mb-2 text-3xl font-bold">信科编程达人榜</h1>
        <p className="text-muted-foreground">
          {siteConfig.project.internship} · {siteConfig.project.aiProgramming} · {siteConfig.university.fullName} 信科编程达人榜
        </p>
      </div>

      <div className="mb-6 flex justify-center gap-2">
        <Button variant="default" size="sm">总经验值</Button>
        <Button variant="outline" size="sm">本周活跃</Button>
        <Button variant="outline" size="sm">本月进步</Button>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {leaderboard.slice(0, 3).map((user, index) => (
          <Card
            key={user.rank}
            className={`relative overflow-hidden ${index === 0 ? 'border-2 border-primary' : ''}`}
          >
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 text-6xl">{user.avatar}</div>
              <CardTitle className="text-xl">{user.username}</CardTitle>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                {index === 0 && <Crown className="h-4 w-4 text-primary" />}
                <span>排名 #{user.rank}</span>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                  {user.role}
                </span>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-2 text-2xl font-bold text-primary">{user.xp.toLocaleString()} XP</div>
              <div className="text-sm text-muted-foreground">Level {user.level}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {leaderboard.length > 3 && (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {leaderboard.slice(3).map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-4 hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-center font-bold text-muted-foreground">#{user.rank}</div>
                    <div className="text-2xl">{user.avatar}</div>
                    <div>
                      <div className="font-medium">{user.username}</div>
                      <div className="text-sm text-muted-foreground">Level {user.level} · {user.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{user.xp.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">XP</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 text-center">
        <p className="mb-4 text-muted-foreground">想要登上信科编程达人榜？</p>
        <Button asChild>
          <Link href="/courses">开始学习</Link>
        </Button>
      </div>
    </div>
  );
}
