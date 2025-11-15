# GameCode Lab - 迁移到Vercel指南

## 已完成的迁移工作

### 1. 数据库层迁移 ✅
- ✅ 从Supabase迁移到Vercel Postgres
- ✅ 创建完整的数据库schema (`db/schema.sql`)
- ✅ 准备种子数据 (`db/seed.sql`)
- ✅ 实现数据访问层 (`src/lib/db/queries.ts`)
- ✅ 创建迁移脚本 (`scripts/migrate.js`, `scripts/seed.js`)

### 2. API路由 ✅
- ✅ 健康检查API (`/api/health`)
- ✅ 课程API (`/api/courses`, `/api/courses/[id]`)
- ✅ 项目API (`/api/projects`)
- ✅ 排行榜API (`/api/leaderboard`)
- ✅ AI功能API (`/api/ai/explain`, `/api/ai/diagnose`, `/api/ai/review`)

### 3. 配置文件 ✅
- ✅ `vercel.json` - Vercel配置
- ✅ `.env.example` - 环境变量模板
- ✅ `package.json` - 依赖和脚本更新
- ✅ 部署文档 (`docs/VERCEL_DEPLOYMENT.md`)

## 数据库结构

### 核心表（11个）
1. **users** - 用户账户
2. **profiles** - 用户资料（等级、经验、金币）
3. **courses** - 课程
4. **lessons** - 课程章节
5. **tasks** - 编程任务
6. **user_progress** - 学习进度
7. **achievements** - 成就定义
8. **user_achievements** - 用户成就
9. **user_projects** - 用户作品
10. **leaderboard** - 排行榜
11. **feedback** - 用户反馈

## 下一步部署流程

### 1. 在Vercel创建项目

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录
vercel login

# 在项目目录下初始化
cd C:\Users\wangqiyuan\project\cursor\aicodegamecursor
vercel
```

### 2. 创建Vercel Postgres数据库

1. 访问 Vercel Dashboard
2. 进入你的项目
3. 点击 "Storage" 标签
4. 创建 Postgres 数据库
5. Vercel会自动添加数据库环境变量

### 3. 添加其他环境变量

在Vercel Dashboard -> Settings -> Environment Variables添加：

```bash
DEEPSEEK_API_KEY=sk-your-key-here
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
NEXTAUTH_SECRET=your-secret-key
```

### 4. 初始化数据库

方式1：在本地执行（需要先配置.env.local）：
```bash
npm run db:migrate
npm run db:seed
```

方式2：在Vercel Postgres控制台直接执行SQL：
- 复制 `db/schema.sql` 内容并执行
- 复制 `db/seed.sql` 内容并执行

### 5. 部署到生产环境

```bash
# 方式1：使用CLI
vercel --prod

# 方式2：推送到GitHub自动部署
git add .
git commit -m "Migrate to Vercel with Postgres"
git push origin main
```

## API端点测试

部署后测试以下端点：

```bash
# 健康检查
curl https://your-app.vercel.app/api/health

# 获取课程列表
curl https://your-app.vercel.app/api/courses

# 获取特定课程
curl https://your-app.vercel.app/api/courses/1

# 获取公开项目
curl https://your-app.vercel.app/api/projects

# 获取排行榜
curl https://your-app.vercel.app/api/leaderboard

# 测试AI代码讲解
curl -X POST https://your-app.vercel.app/api/ai/explain \
  -H "Content-Type: application/json" \
  -d '{"code":"<h1>Hello World</h1>","language":"html"}'
```

## 技术栈总结

### 前端
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Zustand (状态管理)

### 后端
- Next.js API Routes
- Vercel Postgres (数据库)
- DeepSeek API (AI功能)

### 部署
- Vercel (托管平台)
- Vercel Postgres (数据存储)
- Vercel Edge Network (CDN)

## 主要优势

✅ **无服务器架构** - 自动扩展，按使用付费  
✅ **全球CDN** - Vercel Edge Network提供最快的访问速度  
✅ **集成数据库** - Vercel Postgres与应用紧密集成  
✅ **零配置部署** - 推送代码即部署  
✅ **实时日志** - 完整的监控和调试工具  
✅ **自动HTTPS** - 内置SSL证书  

## 成本估算

Vercel和Vercel Postgres都提供免费套餐：

- **Vercel Hobby计划**：免费
  - 100GB带宽/月
  - 6000分钟构建时间/月
  - 无限域名

- **Vercel Postgres**：
  - 免费层：256MB数据库
  - Pro层：$20/月起（1GB+）

对于学习平台，免费套餐足够起步使用。

## 监控和维护

1. **实时监控**：Vercel Dashboard -> Analytics
2. **错误追踪**：集成Sentry或其他工具
3. **性能优化**：Vercel Speed Insights
4. **数据库备份**：定期导出数据

## 支持和文档

- Vercel文档：https://vercel.com/docs
- Vercel Postgres文档：https://vercel.com/docs/storage/vercel-postgres
- Next.js文档：https://nextjs.org/docs
- 项目GitHub：https://github.com/bistuwangqiyuan/aicodegamecursor

