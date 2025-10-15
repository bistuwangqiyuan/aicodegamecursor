import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Crown } from 'lucide-react';

export const metadata: Metadata = {
  title: '排行榜 - GameCode Lab',
  description: '查看学习排行榜',
};

export default function LeaderboardPage() {
  const leaderboard = [
    { rank: 1, username: 'CodeMaster', level: 10, xp: 8750, avatar: '🥇' },
    { rank: 2, username: 'WebWizard', level: 9, xp: 7200, avatar: '🥈' },
    { rank: 3, username: 'JSNinja', level: 8, xp: 6100, avatar: '🥉' },
    { rank: 4, username: 'CSSQueen', level: 7, xp: 5400, avatar: '👑' },
    { rank: 5, username: 'HTMLHero', level: 7, xp: 5100, avatar: '⭐' },
    { rank: 6, username: 'ReactRookie', level: 6, xp: 4200, avatar: '💫' },
    { rank: 7, username: 'VueViking', level: 6, xp: 3900, avatar: '⚡' },
    { rank: 8, username: 'AngularAce', level: 5, xp: 3200, avatar: '🎯' },
    { rank: 9, username: 'TypeScriptTitan', level: 5, xp: 2800, avatar: '🚀' },
    { rank: 10, username: 'NodeNovice', level: 4, xp: 2100, avatar: '🌟' },
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
        <div className="mb-8 text-center">
          <Trophy className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-2 text-3xl font-bold">学习排行榜</h1>
          <p className="text-muted-foreground">与其他学员一起竞争，攀登编程之巅</p>
        </div>

        {/* Leaderboard Type Selector */}
        <div className="mb-6 flex justify-center gap-2">
          <Button variant="default" size="sm">
            总经验值
          </Button>
          <Button variant="outline" size="sm">
            本周活跃
          </Button>
          <Button variant="outline" size="sm">
            本月进步
          </Button>
        </div>

        {/* Top 3 */}
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
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-2 text-2xl font-bold text-primary">{user.xp.toLocaleString()} XP</div>
                <div className="text-sm text-muted-foreground">Level {user.level}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rest of Leaderboard */}
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {leaderboard.slice(3).map((user) => (
                <div key={user.rank} className="flex items-center justify-between p-4 hover:bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div className="w-8 text-center font-bold text-muted-foreground">
                      #{user.rank}
                    </div>
                    <div className="text-2xl">{user.avatar}</div>
                    <div>
                      <div className="font-medium">{user.username}</div>
                      <div className="text-sm text-muted-foreground">Level {user.level}</div>
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

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <p className="mb-4 text-muted-foreground">想要登上排行榜？</p>
          <Button asChild>
            <Link href="/courses">开始学习</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

