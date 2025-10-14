# GameCode Lab - 游戏化HTML5编程教育平台

> 基于 Next.js 14 + Supabase + DeepSeek AI 的智能化编程学习系统

## 📚 项目概述

**GameCode Lab** 是一个创新的游戏化在线编程教育平台，通过任务闯关、AI实时反馈、积分成就机制，让零基础用户系统掌握 HTML5、CSS、JavaScript 等 Web 基础开发技能。

### 核心特色

- 🎮 **游戏化学习** - 等级系统、经验值、成就徽章、排行榜
- 🤖 **AI 智能助教** - DeepSeek 驱动的代码讲解、纠错、个性化建议
- 💻 **在线代码沙盒** - 浏览器内实时编写和运行 HTML/CSS/JS
- 🚀 **渐进式课程** - 从零基础到独立项目的完整学习路径
- 🎁 **免费试用** - 游客可免费体验全部功能 1 个月
- 🌐 **现代化技术栈** - Next.js 14、TypeScript、Supabase、Tailwind CSS

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 14 (App Router) + TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **状态管理**: Zustand
- **动画**: Framer Motion
- **代码编辑器**: Monaco Editor / CodeMirror

### 后端
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **存储**: Supabase Storage
- **Edge Functions**: Supabase Edge Functions

### AI 服务
- **主引擎**: DeepSeek API
- **备用引擎**: 智谱清言、MoonShot、通义千问、豆包等

### 部署
- **托管平台**: Netlify
- **CI/CD**: GitHub Actions

## 📂 项目结构

```
aicodegamecursor/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/          # 认证相关页面
│   │   ├── (main)/          # 主要应用页面
│   │   ├── api/             # API 路由
│   │   └── layout.tsx       # 根布局
│   ├── components/          # React 组件
│   │   ├── ui/              # shadcn/ui 组件
│   │   ├── editor/          # 代码编辑器组件
│   │   ├── game/            # 游戏化元素组件
│   │   └── ai/              # AI 助教组件
│   ├── lib/                 # 工具函数
│   │   ├── supabase/        # Supabase 客户端
│   │   ├── ai/              # AI 服务集成
│   │   └── utils/           # 通用工具
│   ├── hooks/               # React Hooks
│   ├── store/               # Zustand 状态管理
│   ├── types/               # TypeScript 类型定义
│   └── config/              # 配置文件
├── supabase/
│   ├── migrations/          # 数据库迁移
│   └── functions/           # Edge Functions
├── public/                  # 静态资源
├── tests/                   # 测试文件
├── docs/                    # 项目文档
│   ├── PRD.md               # 产品需求文档
│   ├── ARCHITECTURE.md      # 架构设计文档
│   ├── API.md               # API 文档
│   └── DATABASE.md          # 数据库设计文档
├── .env.local               # 环境变量（本地）
├── .env.example             # 环境变量模板
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── netlify.toml             # Netlify 配置

```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.x
- pnpm >= 8.x
- Supabase 账号
- DeepSeek API Key

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd aicodegamecursor
```

2. **安装依赖**
```bash
pnpm install
```

3. **配置环境变量**

复制 `.env.example` 到 `.env.local` 并填写配置：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# DeepSeek AI
DEEPSEEK_API_KEY=your_deepseek_api_key

# 其他 AI API（备用）
ZHIPU_API_KEY=your_zhipu_key
MOONSHOT_API_KEY=your_moonshot_key
# ... 其他 API Keys
```

4. **初始化数据库**

```bash
# 运行 Supabase 迁移
pnpm supabase:migrate

# 填充示例数据（可选）
pnpm supabase:seed
```

5. **启动开发服务器**

```bash
pnpm dev
```

访问 http://localhost:3000

## 📖 功能模块

### 1. 用户系统
- ✅ 游客试用（1个月免费）
- ✅ 邮箱注册/登录
- ✅ OAuth 第三方登录
- ✅ 用户等级与经验值
- ✅ 个人资料管理

### 2. 课程体系
- ✅ Level 1: HTML5 基础
- ✅ Level 2: CSS 样式
- ✅ Level 3: JavaScript 基础
- ✅ Level 4: DOM 操作
- ✅ Level 5: 综合实战

### 3. 游戏化机制
- ✅ 等级系统（Lv1-Lv10）
- ✅ 经验值与金币
- ✅ 成就徽章
- ✅ 排行榜
- ✅ AI Boss 挑战

### 4. AI 助教
- ✅ 实时代码讲解
- ✅ 错误诊断与建议
- ✅ 个性化学习路径
- ✅ 自动出题与评分
- ✅ 聊天式编程指导

### 5. 代码编辑器
- ✅ HTML/CSS/JS 三栏编辑
- ✅ 实时预览
- ✅ 代码高亮与提示
- ✅ 作品保存与导出

### 6. 社区功能
- ✅ 作品展示墙
- ✅ 点赞/评论/收藏
- ✅ 每日挑战
- ✅ AI 作品点评

## 🗄️ 数据库设计

### 核心数据表

- `users` - 用户信息
- `profiles` - 用户资料扩展
- `courses` - 课程
- `lessons` - 课时
- `tasks` - 任务关卡
- `submissions` - 用户提交
- `achievements` - 成就系统
- `user_achievements` - 用户成就
- `leaderboard` - 排行榜
- `projects` - 用户作品
- `comments` - 评论
- `likes` - 点赞

详见 [DATABASE.md](./docs/DATABASE.md)

## 🔒 安全策略

- ✅ Supabase Row Level Security (RLS)
- ✅ JWT 身份验证
- ✅ API 速率限制
- ✅ 代码沙盒隔离
- ✅ XSS/CSRF 防护
- ✅ 敏感数据加密

## 📊 性能优化

- ✅ Next.js SSR/ISR
- ✅ 图片懒加载
- ✅ 代码分割
- ✅ CDN 缓存
- ✅ 数据库索引优化
- ✅ Edge Functions 就近部署

## 🧪 测试

```bash
# 单元测试
pnpm test

# E2E 测试
pnpm test:e2e

# 测试覆盖率
pnpm test:coverage
```

## 📦 部署

### Netlify 部署

```bash
# 构建项目
pnpm build

# 部署到 Netlify（无构建）
pnpm deploy:netlify
```

或通过 Git 连接自动部署。

## 📝 开发规范

### 代码风格
- ESLint + Prettier
- TypeScript 严格模式
- 函数式编程优先
- 组件化设计

### 命名约定
- 组件: PascalCase
- 函数/变量: camelCase
- 常量: UPPER_SNAKE_CASE
- 文件: kebab-case

### Git 提交规范
```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建/工具
```

## 🗓️ 任务清单

### 开发阶段
- [x] 创建项目文档（README.md、PRD.md、架构设计文档） - 2025-10-14
- [ ] 初始化Next.js 14项目结构（TypeScript + Tailwind CSS + shadcn/ui）
- [ ] 配置Supabase数据库schema（用户、课程、任务、积分、作品、成就等表）
- [ ] 实现用户认证系统（游客试用、注册登录、权限管理）
- [ ] 开发课程与任务系统（5个Level的闯关体系）
- [ ] 实现在线代码编辑器与沙盒环境（HTML/CSS/JS三栏编辑器）
- [ ] 集成DeepSeek AI助教功能（代码讲解、纠错、对话指导）
- [ ] 开发游戏化机制（等级、经验、成就、排行榜、任务奖励）
- [ ] 实现社区与作品展示模块（作品墙、点赞评论、AI点评）
- [ ] 配置安全策略与性能优化（API限流、数据加密、SSR优化）

### 测试阶段
- [ ] 创建测试用例并执行完整测试

### 部署阶段
- [ ] 配置Netlify部署并上线

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证

## 📧 联系方式

- 项目主页: [GameCode Lab](https://gamecodelab.com)
- 问题反馈: [GitHub Issues](https://github.com/yourusername/aicodegamecursor/issues)
- 邮箱: support@gamecodelab.com

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Supabase](https://supabase.com/) - 后端服务
- [DeepSeek](https://www.deepseek.com/) - AI 引擎
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库

---

**版本**: V1.0  
**更新时间**: 2025-10-14  
**开发状态**: 🚧 开发中

