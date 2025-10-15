# GameCode Lab - 快速上手指南

**欢迎来到 GameCode Lab！** 🎮

这份指南将帮助你快速启动和运行项目。

---

## 📋 前置要求

在开始之前，请确保你的开发环境满足以下要求：

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0
- **Git**: 最新版本
- **Supabase 账号**: [注册链接](https://supabase.com)
- **DeepSeek API Key**: [获取链接](https://www.deepseek.com)

---

## 🚀 快速开始

### 1. 安装依赖

```bash
# 使用 pnpm 安装所有依赖
pnpm install
```

### 2. 配置环境变量

项目根目录已经包含 `.env.local` 文件，其中已配置了你提供的 AI API Keys。

**需要配置的 Supabase 变量**：

打开 `.env.local` 文件，找到以下变量并填入你的 Supabase 项目信息：

```env
# Supabase 配置 - 请替换为你的实际值
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**如何获取 Supabase 配置**：

1. 登录 [Supabase Dashboard](https://app.supabase.com)
2. 选择你的项目（或创建新项目）
3. 进入 `Settings` → `API`
4. 复制以下信息：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. 初始化数据库

使用 Supabase MCP 工具或手动执行迁移脚本：

**方式一：使用 Supabase CLI（推荐）**

```bash
# 1. 安装 Supabase CLI（如果还没安装）
npm install -g supabase

# 2. 登录 Supabase
supabase login

# 3. 链接到你的项目
supabase link --project-ref your-project-ref

# 4. 运行迁移
supabase db push

# 5. 填充初始数据
supabase db seed
```

**方式二：手动执行 SQL**

1. 打开 Supabase Dashboard → SQL Editor
2. 依次执行以下文件中的 SQL：
   - `supabase/migrations/20250114000001_initial_schema.sql`
   - `supabase/migrations/20250114000002_functions_and_triggers.sql`
   - `supabase/seed.sql`

### 4. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000，你应该能看到 GameCode Lab 的首页！

---

## 📂 项目结构说明

```
aicodegamecursor/
├── docs/                    # 📚 项目文档
│   ├── PRD.md               # 产品需求文档
│   ├── ARCHITECTURE.md      # 架构设计文档
│   └── DATABASE.md          # 数据库设计文档
│
├── src/                     # 💻 源代码
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # 根布局
│   │   ├── page.tsx         # 首页
│   │   └── globals.css      # 全局样式
│   ├── components/          # React 组件
│   │   ├── ui/              # UI 基础组件
│   │   └── providers.tsx    # 全局 Provider
│   ├── lib/                 # 工具函数库
│   │   ├── supabase/        # Supabase 客户端
│   │   └── utils.ts         # 通用工具函数
│   ├── types/               # TypeScript 类型
│   └── config/              # 配置文件
│
├── supabase/                # 🗄️ Supabase 配置
│   ├── migrations/          # 数据库迁移
│   └── seed.sql             # 初始数据
│
├── public/                  # 🖼️ 静态资源
├── tests/                   # 🧪 测试文件（待创建）
│
├── package.json             # 📦 依赖管理
├── tsconfig.json            # ⚙️ TypeScript 配置
├── tailwind.config.ts       # 🎨 Tailwind CSS 配置
├── next.config.js           # ⚙️ Next.js 配置
├── netlify.toml             # 🚀 Netlify 部署配置
├── README.md                # 📖 项目说明
├── PROJECT_STATUS.md        # 📊 项目状态报告
└── GETTING_STARTED.md       # 🚀 本文件
```

---

## 🧪 验证安装

### 检查 Next.js

访问 http://localhost:3000，应该能看到：
- ✅ GameCode Lab 首页
- ✅ 完整的导航和布局
- ✅ 无控制台错误

### 检查 Supabase 连接

1. 打开浏览器开发者工具（F12）
2. 在 Console 中执行：

```javascript
// 测试 Supabase 连接
const { createClient } = await import('@supabase/supabase-js');
const supabase = createClient(
  'your_supabase_url',
  'your_anon_key'
);
const { data, error } = await supabase.from('courses').select('*').limit(1);
console.log('Supabase 连接测试:', data ? '✅ 成功' : '❌ 失败', error);
```

如果返回课程数据，说明连接成功！

---

## 🎯 下一步

### 新手开发者

1. **阅读文档**: 
   - 📖 [README.md](./README.md) - 项目概览
   - 📋 [PRD.md](./docs/PRD.md) - 产品需求
   - 🏗️ [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - 架构设计

2. **探索代码**:
   - 查看 `src/app/page.tsx` - 首页实现
   - 查看 `src/components/ui/` - UI 组件库
   - 查看 `src/lib/utils.ts` - 工具函数

3. **开始开发**:
   - 按照 README.md 中的任务清单逐步开发
   - 当前进度：30% 完成
   - 下一个任务：用户认证系统

### 高级开发者

**当前开发重点**：

1. ✅ **已完成** (30%)
   - 项目文档
   - Next.js 项目结构
   - Supabase 数据库设计

2. 🚧 **进行中** (10%)
   - 用户认证系统

3. ⏳ **待开始** (0%)
   - 课程与任务系统
   - 代码编辑器
   - AI 助教
   - 游戏化机制
   - 社区功能

**贡献方式**：

- 查看 [PROJECT_STATUS.md](./PROJECT_STATUS.md) 了解详细进度
- 选择一个待开发模块
- 创建新分支开始开发
- 提交 Pull Request

---

## 🐛 常见问题

### Q1: pnpm install 报错

**解决方案**：
```bash
# 清除缓存后重试
pnpm store prune
pnpm install --force
```

### Q2: Supabase 连接失败

**检查清单**：
- ✅ `.env.local` 文件中的 URL 和 Key 是否正确
- ✅ Supabase 项目是否已启动
- ✅ 是否已运行数据库迁移
- ✅ 网络连接是否正常

### Q3: TypeScript 类型错误

**解决方案**：
```bash
# 重新生成类型定义
pnpm supabase:generate-types
```

### Q4: 页面样式不显示

**解决方案**：
```bash
# 重启开发服务器
pnpm dev
```

---

## 📚 学习资源

### 核心技术栈文档

- [Next.js 14 文档](https://nextjs.org/docs)
- [Supabase 文档](https://supabase.com/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs)
- [React Query 文档](https://tanstack.com/query/latest/docs)

### AI API 文档

- [DeepSeek API](https://www.deepseek.com/docs)
- [智谱清言 API](https://open.bigmodel.cn/dev/api)
- [MoonShot API](https://platform.moonshot.cn/docs)

---

## 🤝 获取帮助

如果遇到问题：

1. **查看文档**: 先查看项目文档和官方文档
2. **搜索 Issues**: 在 GitHub Issues 中搜索类似问题
3. **提问**: 如果找不到答案，创建新的 Issue

---

## ✅ 准备就绪检查清单

在开始开发前，请确认：

- [ ] Node.js 和 pnpm 已安装
- [ ] 依赖包已成功安装（`pnpm install`）
- [ ] Supabase 项目已创建并配置
- [ ] 环境变量已正确设置
- [ ] 数据库迁移已执行
- [ ] 开发服务器能够成功启动
- [ ] 首页能够正常访问
- [ ] 阅读了 README.md 和 PRD.md

---

**准备好了吗？** 🚀

让我们开始构建这个令人兴奋的游戏化编程教育平台吧！

如有任何问题，随时查看 [README.md](./README.md) 或 [PROJECT_STATUS.md](./PROJECT_STATUS.md)。

**祝开发愉快！** 💻✨

