'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { TestAccountBanner } from '@/components/layout/test-account-banner';
import { BistuHeroBanner } from '@/components/layout/bistu-hero-banner';
import { siteConfig } from '@/config/site';
import { BrandTags } from '@/components/layout/brand-tags';
import {
  Code2,
  Gamepad2,
  Bot,
  Trophy,
  Users,
  ArrowRight,
  CheckCircle,
  GraduationCap,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="relative overflow-hidden py-20 md:py-32">
        <BistuHeroBanner className="absolute inset-0 -z-10 h-full" />
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <Image
                src={siteConfig.brand.logo}
                alt={siteConfig.university.fullName}
                width={80}
                height={80}
                unoptimized
              />
            </div>
            <div className="mb-6 flex flex-col items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <GraduationCap className="h-4 w-4" />
                {siteConfig.subtitle}
              </div>
              <BrandTags size="md" />
            </div>

            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              {siteConfig.project.internship} · {siteConfig.project.aiProgramming}
              <span className="gradient-bistu bg-clip-text text-transparent"> 编程学习平台</span>
            </h1>

            <p className="mb-2 text-lg font-medium text-bistu-red">
              「{siteConfig.university.motto}」
            </p>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              {siteConfig.name} 为 {siteConfig.university.shortName} 大学生打造 · {siteConfig.project.slogan}
              <br />
              通过{siteConfig.project.aiProgramming}智能助教与游戏化机制，系统掌握 HTML5、CSS、JavaScript
            </p>

            <div className="mb-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="rounded-full border px-3 py-1">{siteConfig.university.colleges} 个学院（部）</span>
              <span className="rounded-full border px-3 py-1">办学始于 {siteConfig.university.foundedYear} 年</span>
              <span className="rounded-full border border-bistu-orange/40 bg-bistu-orange/10 px-3 py-1 text-bistu-orange">{siteConfig.project.internship}</span>
              <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-primary">{siteConfig.project.aiProgramming}</span>
            </div>

            <div className="mx-auto mb-8 max-w-2xl">
              <TestAccountBanner />
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="group" asChild>
                <Link href="/login">
                  测试账号立即体验
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/courses">浏览课程</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            为什么选择 {siteConfig.name}？
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            专为 {siteConfig.university.shortName} 大学生设计的四大核心优势
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="card-hover rounded-lg border bg-card p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Gamepad2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">游戏化学习</h3>
              <p className="text-sm text-muted-foreground">
                等级系统、经验值、成就徽章、信科编程达人榜，让学习充满乐趣
              </p>
            </div>
            <div className="card-hover rounded-lg border bg-card p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">AI 智能助教</h3>
              <p className="text-sm text-muted-foreground">
                DeepSeek 驱动，实时讲解代码、诊断错误，助力信科学子编程入门
              </p>
            </div>
            <div className="card-hover rounded-lg border bg-card p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">在线代码沙盒</h3>
              <p className="text-sm text-muted-foreground">
                浏览器内实时编写运行代码，完成校园主题 mini 项目
              </p>
            </div>
            <div className="card-hover rounded-lg border bg-card p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">渐进式课程</h3>
              <p className="text-sm text-muted-foreground">
                从零基础到独立项目，贴合计算机/软件工程专业培养方案
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">完整的学习路径</h2>
          <p className="mb-12 text-center text-muted-foreground">
            从信科新生到 Web 开发能手，循序渐进掌握核心技能
          </p>
          <div className="mx-auto max-w-4xl space-y-4">
            {[
              { level: 1, title: 'HTML5 基础', desc: '创建北信科校园介绍页，学习网页结构', lessons: 10 },
              { level: 2, title: 'CSS 样式', desc: '用信科蓝主题美化页面，掌握布局设计', lessons: 12 },
              { level: 3, title: 'JavaScript 基础', desc: '为课表、社团页面添加交互功能', lessons: 15 },
              { level: 4, title: 'DOM 操作', desc: '实现动态交互效果', lessons: 10 },
              { level: 5, title: '综合实战', desc: '完成校园主题真实项目作品', lessons: 8 },
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

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">信科学子将获得</h2>
            <div className="space-y-4">
              {[
                '系统掌握 HTML5、CSS、JavaScript 核心技能',
                '独立完成校园主题响应式网页和交互应用',
                'AI 助教 24/7 在线指导，随时解答编程疑问',
                '作品展示平台，建立个人技术作品集',
                '游戏化学习体验，登上信科编程达人榜',
                '测试账号免费体验全部功能，无需注册等待',
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

      <section className="gradient-bistu py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <Users className="mx-auto mb-6 h-16 w-16" />
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            准备开始你的编程之旅了吗？
          </h2>
          <p className="mb-8 text-lg opacity-90">
            加入 {siteConfig.university.shortName} {siteConfig.name}，让 AI 助教陪你一起学习编程
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/login">
              使用测试账号开始学习
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-4 text-sm opacity-75">
            统一密码
            <code className="mx-1 rounded bg-white/20 px-1.5 py-0.5">{siteConfig.testPassword}</code>
            ·
            <Link href="/login" className="ml-1 underline hover:opacity-100">
              查看全部测试账号
            </Link>
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
