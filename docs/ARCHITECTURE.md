# GameCode Lab 系统架构设计文档

**版本**: V1.0  
**创建日期**: 2025-10-14  
**架构师**: AI Development Team

---

## 一、架构概览

### 1.1 整体架构图

```
┌─────────────────────────────────────────────────────────────┐
│                         用户层                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Web 浏览器│  │ 移动浏览器│  │  平板   │  │  桌面端  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS
┌────────────────────────┼────────────────────────────────────┐
│                    CDN / Edge Network                        │
│                  (Netlify Edge Functions)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                      前端应用层                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │           Next.js 14 (App Router + RSC)               │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │  │
│  │  │ 页面路由 │  │ API路由  │  │  中间件  │           │  │
│  │  └──────────┘  └──────────┘  └──────────┘           │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │  │
│  │  │  组件库  │  │ 状态管理 │  │  Hooks   │           │  │
│  │  └──────────┘  └──────────┘  └──────────┘           │  │
│  └───────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
┌───────┴──────┐  ┌──────┴──────┐  ┌─────┴──────┐
│              │  │             │  │            │
│  Supabase    │  │  AI 服务层  │  │ 第三方服务 │
│              │  │             │  │            │
│ ┌──────────┐ │  │ ┌─────────┐ │  │ ┌────────┐ │
│ │PostgreSQL│ │  │ │DeepSeek │ │  │ │ GitHub │ │
│ └──────────┘ │  │ └─────────┘ │  │ └────────┘ │
│ ┌──────────┐ │  │ ┌─────────┐ │  │ ┌────────┐ │
│ │   Auth   │ │  │ │智谱清言 │ │  │ │ Google │ │
│ └──────────┘ │  │ └─────────┘ │  │ └────────┘ │
│ ┌──────────┐ │  │ ┌─────────┐ │  │            │
│ │ Storage  │ │  │ │MoonShot │ │  │            │
│ └──────────┘ │  │ └─────────┘ │  │            │
│ ┌──────────┐ │  │             │  │            │
│ │Edge Func │ │  │  (多AI冗余) │  │            │
│ └──────────┘ │  │             │  │            │
└──────────────┘  └─────────────┘  └────────────┘
```

### 1.2 技术栈

#### 前端技术栈
- **核心框架**: Next.js 14.2+ (App Router)
- **开发语言**: TypeScript 5.x
- **样式方案**: Tailwind CSS 3.x
- **UI 组件**: shadcn/ui + Radix UI
- **状态管理**: Zustand 4.x
- **动画库**: Framer Motion 11.x
- **代码编辑器**: Monaco Editor / CodeMirror 6
- **表单处理**: React Hook Form + Zod
- **数据请求**: TanStack Query (React Query)

#### 后端技术栈
- **数据库**: Supabase (PostgreSQL 15)
- **认证服务**: Supabase Auth
- **文件存储**: Supabase Storage
- **实时功能**: Supabase Realtime
- **Edge Functions**: Deno + Supabase Functions

#### AI 服务
- **主 AI**: DeepSeek API
- **备用 AI**: 智谱清言、MoonShot、通义千问、豆包等

#### 开发工具
- **包管理**: pnpm 8.x
- **代码质量**: ESLint + Prettier
- **类型检查**: TypeScript strict mode
- **测试框架**: Vitest + Playwright
- **版本管理**: Git + GitHub

#### 部署运维
- **托管平台**: Netlify
- **CI/CD**: GitHub Actions
- **监控**: Sentry + Vercel Analytics
- **日志**: Supabase Logs

---

## 二、架构设计原则

### 2.1 设计原则

1. **关注点分离** (Separation of Concerns)
   - UI 层、业务逻辑层、数据层清晰分离
   - 组件职责单一，易于维护

2. **渐进式增强** (Progressive Enhancement)
   - 基础功能优先，高级功能渐进
   - 支持优雅降级

3. **安全第一** (Security First)
   - 所有用户输入必须验证
   - 使用 Supabase RLS 保护数据
   - API 速率限制

4. **性能优化** (Performance Optimization)
   - SSR/ISR 优化首屏加载
   - 代码分割与懒加载
   - 图片优化与 CDN 加速

5. **可扩展性** (Scalability)
   - 模块化设计
   - 微服务架构（Edge Functions）
   - 数据库索引优化

### 2.2 架构模式

采用 **分层架构 + 微服务** 混合模式：

```
┌──────────────────────────────────┐
│      表示层 (Presentation)        │  ← React 组件
├──────────────────────────────────┤
│      应用层 (Application)         │  ← Hooks + Store
├──────────────────────────────────┤
│      领域层 (Domain)              │  ← 业务逻辑
├──────────────────────────────────┤
│      基础设施层 (Infrastructure)  │  ← API 调用
└──────────────────────────────────┘
```

---

## 三、前端架构

### 3.1 目录结构

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 认证路由组
│   │   ├── login/                # 登录页
│   │   ├── register/             # 注册页
│   │   └── layout.tsx            # 认证布局
│   ├── (main)/                   # 主应用路由组
│   │   ├── dashboard/            # 仪表盘
│   │   ├── courses/              # 课程列表
│   │   ├── learn/                # 学习页面
│   │   │   └── [courseId]/       # 课程详情
│   │   │       └── [lessonId]/   # 课时学习
│   │   ├── playground/           # 代码实验场
│   │   ├── projects/             # 作品展示
│   │   ├── leaderboard/          # 排行榜
│   │   ├── achievements/         # 成就页面
│   │   ├── profile/              # 个人中心
│   │   └── layout.tsx            # 主布局
│   ├── (admin)/                  # 管理后台
│   │   ├── courses/              # 课程管理
│   │   ├── users/                # 用户管理
│   │   ├── analytics/            # 数据分析
│   │   └── layout.tsx            # 管理布局
│   ├── api/                      # API 路由
│   │   ├── auth/                 # 认证 API
│   │   ├── courses/              # 课程 API
│   │   ├── ai/                   # AI 服务 API
│   │   ├── submissions/          # 提交 API
│   │   └── webhooks/             # Webhook
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 首页
│   ├── error.tsx                 # 错误页面
│   ├── loading.tsx               # 加载页面
│   └── not-found.tsx             # 404 页面
│
├── components/                   # 组件库
│   ├── ui/                       # shadcn/ui 基础组件
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── layout/                   # 布局组件
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── sidebar.tsx
│   │   └── navigation.tsx
│   ├── editor/                   # 代码编辑器
│   │   ├── code-editor.tsx       # 主编辑器
│   │   ├── html-panel.tsx        # HTML 面板
│   │   ├── css-panel.tsx         # CSS 面板
│   │   ├── js-panel.tsx          # JS 面板
│   │   ├── preview-panel.tsx     # 预览面板
│   │   └── console-panel.tsx     # 控制台
│   ├── game/                     # 游戏化组件
│   │   ├── level-badge.tsx       # 等级徽章
│   │   ├── xp-bar.tsx            # 经验条
│   │   ├── achievement-card.tsx  # 成就卡片
│   │   └── leaderboard-list.tsx  # 排行榜列表
│   ├── ai/                       # AI 助教组件
│   │   ├── ai-mentor.tsx         # AI 助教主界面
│   │   ├── chat-interface.tsx    # 聊天界面
│   │   ├── code-explanation.tsx  # 代码讲解
│   │   └── error-diagnosis.tsx   # 错误诊断
│   ├── course/                   # 课程组件
│   │   ├── course-card.tsx       # 课程卡片
│   │   ├── lesson-list.tsx       # 课时列表
│   │   ├── task-card.tsx         # 任务卡片
│   │   └── progress-tracker.tsx  # 进度跟踪
│   ├── project/                  # 作品组件
│   │   ├── project-card.tsx      # 作品卡片
│   │   ├── project-gallery.tsx   # 作品画廊
│   │   └── comment-section.tsx   # 评论区
│   └── shared/                   # 共享组件
│       ├── loading-spinner.tsx
│       ├── error-boundary.tsx
│       └── toast-provider.tsx
│
├── lib/                          # 工具库
│   ├── supabase/                 # Supabase 客户端
│   │   ├── client.ts             # 浏览器客户端
│   │   ├── server.ts             # 服务端客户端
│   │   ├── middleware.ts         # 中间件
│   │   └── types.ts              # 类型定义
│   ├── ai/                       # AI 服务
│   │   ├── deepseek.ts           # DeepSeek 客户端
│   │   ├── ai-router.ts          # AI 路由（多服务切换）
│   │   ├── prompts.ts            # 提示词模板
│   │   └── types.ts              # 类型定义
│   ├── utils/                    # 工具函数
│   │   ├── cn.ts                 # 类名合并
│   │   ├── format.ts             # 格式化
│   │   ├── validation.ts         # 验证
│   │   └── constants.ts          # 常量
│   └── hooks/                    # 全局 Hooks (备用)
│
├── hooks/                        # React Hooks
│   ├── use-auth.ts               # 认证
│   ├── use-user.ts               # 用户信息
│   ├── use-course.ts             # 课程数据
│   ├── use-editor.ts             # 编辑器状态
│   ├── use-ai-mentor.ts          # AI 助教
│   ├── use-gamification.ts       # 游戏化
│   └── use-toast.ts              # 提示信息
│
├── store/                        # Zustand 状态管理
│   ├── auth-store.ts             # 认证状态
│   ├── editor-store.ts           # 编辑器状态
│   ├── game-store.ts             # 游戏化状态
│   └── ui-store.ts               # UI 状态
│
├── types/                        # TypeScript 类型
│   ├── database.ts               # 数据库类型（Supabase 生成）
│   ├── api.ts                    # API 类型
│   ├── course.ts                 # 课程类型
│   ├── user.ts                   # 用户类型
│   └── game.ts                   # 游戏化类型
│
├── config/                       # 配置文件
│   ├── site.ts                   # 站点配置
│   ├── ai.ts                     # AI 配置
│   └── game.ts                   # 游戏化配置
│
└── styles/                       # 样式文件
    ├── globals.css               # 全局样式
    └── themes/                   # 主题
        ├── default.css
        └── dark.css
```

### 3.2 组件设计模式

#### 原子设计 (Atomic Design)

```
Atoms (原子)
  ↓
Molecules (分子)
  ↓
Organisms (组织)
  ↓
Templates (模板)
  ↓
Pages (页面)
```

**示例**:
```tsx
// Atom: Button
<Button />

// Molecule: 带图标的按钮
<IconButton icon={<Star />} />

// Organism: 课程卡片
<CourseCard 
  title="HTML 基础"
  progress={60}
  xp={100}
/>

// Template: 课程列表布局
<CourseListTemplate 
  courses={courses}
  sidebar={<Sidebar />}
/>

// Page: 课程页面
<CoursesPage />
```

### 3.3 状态管理策略

#### 状态分类

1. **服务端状态** - TanStack Query
   - 课程数据、用户信息、作品列表
   - 自动缓存、重新验证

2. **客户端状态** - Zustand
   - 编辑器状态、UI 状态、临时数据

3. **表单状态** - React Hook Form
   - 表单输入、验证、提交

4. **URL 状态** - Next.js Router
   - 路由参数、查询参数

**示例**:
```tsx
// 服务端状态 (React Query)
const { data: courses } = useQuery({
  queryKey: ['courses'],
  queryFn: fetchCourses
});

// 客户端状态 (Zustand)
const { code, updateCode } = useEditorStore();

// 表单状态 (React Hook Form)
const { register, handleSubmit } = useForm();
```

---

## 四、后端架构

### 4.1 Supabase 架构

```
Supabase
├── Database (PostgreSQL)
│   ├── Tables (数据表)
│   ├── Views (视图)
│   ├── Functions (存储过程)
│   └── Triggers (触发器)
├── Auth (认证服务)
│   ├── Email/Password
│   ├── OAuth (Google, GitHub)
│   └── Magic Link
├── Storage (文件存储)
│   ├── Avatars (头像)
│   ├── Projects (作品截图)
│   └── Assets (资源文件)
├── Edge Functions (无服务器函数)
│   ├── ai-proxy (AI 服务代理)
│   ├── code-runner (代码执行)
│   └── webhook-handler (Webhook 处理)
└── Realtime (实时订阅)
    ├── Presence (在线状态)
    └── Broadcast (消息广播)
```

### 4.2 数据库设计

详见 [DATABASE.md](./DATABASE.md)

核心表结构：

```sql
-- 用户表
users (Supabase Auth)
  ├── profiles (用户资料扩展)
  ├── user_stats (用户统计)
  └── user_achievements (用户成就)

-- 课程体系
courses (课程)
  ├── levels (等级)
  ├── lessons (课时)
  └── tasks (任务)

-- 学习数据
submissions (提交记录)
learning_progress (学习进度)

-- 社区功能
projects (作品)
  ├── comments (评论)
  └── likes (点赞)

-- 游戏化
achievements (成就定义)
leaderboard (排行榜)
```

### 4.3 API 设计

#### RESTful API 规范

```
GET    /api/courses              # 获取课程列表
GET    /api/courses/:id          # 获取课程详情
POST   /api/courses              # 创建课程 (教师)
PUT    /api/courses/:id          # 更新课程 (教师)
DELETE /api/courses/:id          # 删除课程 (管理员)

GET    /api/lessons/:id          # 获取课时详情
POST   /api/submissions          # 提交代码
GET    /api/submissions/:id      # 获取提交详情

POST   /api/ai/explain           # AI 代码讲解
POST   /api/ai/diagnose          # AI 错误诊断
POST   /api/ai/chat              # AI 聊天

GET    /api/projects             # 获取作品列表
POST   /api/projects             # 创建作品
POST   /api/projects/:id/like    # 点赞作品

GET    /api/leaderboard          # 获取排行榜
GET    /api/achievements         # 获取成就列表
```

#### API 响应格式

```typescript
// 成功响应
{
  "success": true,
  "data": { /* 数据 */ },
  "meta": {
    "page": 1,
    "total": 100
  }
}

// 错误响应
{
  "success": false,
  "error": {
    "code": "INVALID_INPUT",
    "message": "课程 ID 无效"
  }
}
```

---

## 五、AI 服务架构

### 5.1 AI 服务路由

```typescript
// AI 服务优先级队列
const AI_PROVIDERS = [
  { name: 'DeepSeek', weight: 10, timeout: 5000 },
  { name: 'ZhipuAI', weight: 8, timeout: 5000 },
  { name: 'MoonShot', weight: 6, timeout: 5000 },
  { name: 'TongyiAI', weight: 4, timeout: 5000 },
  { name: 'DoubaoAI', weight: 2, timeout: 5000 }
];

// 自动切换逻辑
async function callAI(prompt: string): Promise<string> {
  for (const provider of AI_PROVIDERS) {
    try {
      const response = await provider.call(prompt, {
        timeout: provider.timeout
      });
      return response;
    } catch (error) {
      console.warn(`${provider.name} 失败，尝试下一个...`);
      continue;
    }
  }
  throw new AIServiceUnavailableError();
}
```

### 5.2 AI 功能模块

```
AI 服务层
├── 代码讲解 (Code Explanation)
│   └── 逐行注释生成
├── 错误诊断 (Error Diagnosis)
│   ├── 语法错误检测
│   └── 逻辑错误分析
├── 代码优化 (Code Optimization)
│   ├── 性能建议
│   └── 最佳实践提示
├── 自动出题 (Auto Question Generation)
│   ├── 根据知识点生成题目
│   └── 难度自适应
├── 个性化建议 (Personalized Recommendations)
│   ├── 学习路径规划
│   └── 薄弱环节识别
└── 聊天指导 (Chat Guidance)
    ├── 自然语言理解
    └── 上下文保持
```

### 5.3 AI 提示词工程

```typescript
// 代码讲解提示词模板
const EXPLAIN_CODE_PROMPT = `
你是一位耐心的编程导师。请为以下代码提供逐行讲解：

代码:
\`\`\`${language}
${code}
\`\`\`

要求:
1. 用简单易懂的语言解释每行代码的作用
2. 指出关键概念和技术要点
3. 如果有更好的写法，请给出建议
4. 用中文回答，适合初学者理解

请以 JSON 格式返回:
{
  "explanation": "整体说明",
  "lineByLine": [
    { "line": 1, "code": "...", "explanation": "..." }
  ],
  "keyPoints": ["要点1", "要点2"],
  "suggestions": ["建议1", "建议2"]
}
`;
```

---

## 六、安全架构

### 6.1 认证与授权

```
用户请求
  ↓
JWT Token 验证
  ↓
Supabase RLS 策略
  ↓
API 权限检查
  ↓
业务逻辑执行
```

### 6.2 数据安全

#### Row Level Security (RLS) 策略示例

```sql
-- 用户只能查看自己的提交
CREATE POLICY "Users can view own submissions"
ON submissions
FOR SELECT
USING (auth.uid() = user_id);

-- 用户只能编辑自己的作品
CREATE POLICY "Users can update own projects"
ON projects
FOR UPDATE
USING (auth.uid() = user_id);
```

### 6.3 API 安全

```typescript
// API 速率限制 (每分钟 60 次)
const rateLimiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500
});

// 请求验证
async function validateRequest(req: Request) {
  // 1. 验证 JWT Token
  const token = req.headers.get('Authorization');
  if (!token) throw new UnauthorizedError();
  
  // 2. 验证请求签名（防重放攻击）
  const signature = req.headers.get('X-Signature');
  if (!verifySignature(signature)) throw new ForbiddenError();
  
  // 3. 速率限制
  await rateLimiter.check(req);
  
  // 4. 输入验证
  const body = await req.json();
  const validated = schema.parse(body);
  
  return validated;
}
```

### 6.4 代码沙盒安全

```typescript
// Iframe 沙盒配置
const SANDBOX_CONFIG = {
  sandbox: [
    'allow-scripts',          // 允许脚本
    'allow-same-origin'       // 允许同源
  ].join(' '),
  csp: `
    default-src 'none';
    script-src 'unsafe-inline' 'unsafe-eval';
    style-src 'unsafe-inline';
  `,
  timeout: 5000,              // 5 秒超时
  memoryLimit: 50 * 1024 * 1024  // 50MB 内存限制
};
```

---

## 七、性能优化

### 7.1 前端性能优化

#### Next.js 优化策略

```typescript
// 1. 静态生成 (SSG)
export const dynamic = 'force-static';

// 2. 增量静态再生成 (ISR)
export const revalidate = 3600; // 1 小时

// 3. 服务端渲染 (SSR)
export const dynamic = 'force-dynamic';

// 4. 客户端渲染 (CSR)
'use client';
```

#### 代码分割

```typescript
// 动态导入
const CodeEditor = dynamic(
  () => import('@/components/editor/code-editor'),
  { 
    loading: () => <LoadingSpinner />,
    ssr: false  // 禁用 SSR
  }
);
```

#### 图片优化

```tsx
import Image from 'next/image';

<Image
  src="/avatar.png"
  alt="用户头像"
  width={100}
  height={100}
  loading="lazy"
  placeholder="blur"
/>
```

### 7.2 数据库优化

```sql
-- 索引优化
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- 复合索引
CREATE INDEX idx_learning_progress 
ON learning_progress(user_id, course_id, lesson_id);

-- 全文搜索索引
CREATE INDEX idx_courses_search 
ON courses 
USING gin(to_tsvector('chinese', title || ' ' || description));
```

### 7.3 缓存策略

```
┌─────────────────────────────────┐
│ CDN 缓存 (静态资源)              │
│ - 图片、CSS、JS                  │
│ - Cache-Control: max-age=31536000│
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│ Next.js 缓存 (页面)              │
│ - 静态页面 (永久缓存)             │
│ - ISR 页面 (定时重新验证)         │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│ React Query 缓存 (数据)          │
│ - 5 分钟自动重新请求              │
│ - staleTime: 5 * 60 * 1000       │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│ Supabase 缓存 (数据库)           │
│ - Connection Pooling             │
│ - Query Result Cache             │
└─────────────────────────────────┘
```

---

## 八、部署架构

### 8.1 Netlify 部署

```
GitHub Repository
      ↓
  Git Push
      ↓
Netlify Build
      ↓
  ┌──────────────┐
  │  Build Process│
  │  pnpm build  │
  └──────────────┘
      ↓
  ┌──────────────┐
  │  Static Files│
  │  + Functions │
  └──────────────┘
      ↓
   Deploy
      ↓
┌────────────────────┐
│  Production Site   │
│  https://xxx.app   │
└────────────────────┘
```

### 8.2 环境配置

```
Development (本地)
  ├── .env.local
  ├── localhost:3000
  └── Supabase Local

Staging (预发布)
  ├── .env.staging
  ├── staging.xxx.app
  └── Supabase Staging

Production (生产)
  ├── .env.production
  ├── gamecodelab.com
  └── Supabase Production
```

### 8.3 CI/CD 流程

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm test
      - run: pnpm build
      - uses: netlify/actions/deploy@master
```

---

## 九、监控与日志

### 9.1 监控指标

| 指标 | 工具 | 目标 |
|------|------|------|
| 应用性能 | Vercel Analytics | < 2s FCP |
| 错误追踪 | Sentry | < 0.1% 错误率 |
| API 监控 | Supabase Logs | < 100ms 响应 |
| 用户行为 | Google Analytics | DAU/MAU |

### 9.2 日志系统

```typescript
// 结构化日志
logger.info('User login', {
  userId: user.id,
  method: 'email',
  timestamp: new Date().toISOString()
});

// 错误日志
logger.error('AI service failed', {
  provider: 'DeepSeek',
  error: error.message,
  stack: error.stack
});
```

---

## 十、扩展性设计

### 10.1 水平扩展

```
Load Balancer
      ↓
┌─────┴─────┐
│           │
Next.js 1   Next.js 2  ...  Next.js N
│           │
└─────┬─────┘
      ↓
  Supabase (共享数据层)
```

### 10.2 功能扩展

```
当前功能
├── HTML/CSS/JS 课程
└── Web 前端方向

未来扩展
├── Python 课程
├── C/C++ 课程
├── 移动开发课程
├── AI 编程课程
└── 多语言支持
```

---

**文档维护**: 随架构演进持续更新  
**最后更新**: 2025-10-14  
**架构负责人**: AI Development Team

