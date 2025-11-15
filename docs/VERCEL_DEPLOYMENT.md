# Vercel部署指南

## 前置准备

1. 注册Vercel账号：https://vercel.com
2. 安装Vercel CLI：
```bash
npm install -g vercel
```

## 部署步骤

### 1. 连接到Vercel

```bash
# 登录Vercel
vercel login

# 在项目目录下链接项目
cd C:\Users\wangqiyuan\project\cursor\aicodegamecursor
vercel link
```

### 2. 创建Vercel Postgres数据库

在Vercel Dashboard中：

1. 进入你的项目
2. 点击 "Storage" 标签
3. 点击 "Create Database"
4. 选择 "Postgres"
5. 选择区域（推荐：us-east-1）
6. 创建数据库

### 3. 配置环境变量

Vercel会自动将Postgres连接信息添加到环境变量。你还需要添加：

```bash
# 在Vercel Dashboard -> Settings -> Environment Variables 中添加

DEEPSEEK_API_KEY=sk-your-key-here
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
NEXTAUTH_SECRET=your-secret-here
```

生成NEXTAUTH_SECRET：
```bash
openssl rand -base64 32
```

### 4. 部署到Vercel

```bash
# 部署到生产环境
vercel --prod
```

或者通过Git自动部署：

1. 将代码推送到GitHub
2. 在Vercel Dashboard中导入GitHub仓库
3. Vercel会自动检测Next.js并配置构建设置
4. 每次push都会自动部署

### 5. 初始化数据库

部署后，运行数据库迁移：

```bash
# 方式1：本地执行（需要配置环境变量）
npm run db:migrate
npm run db:seed

# 方式2：在Vercel Dashboard的Postgres面板中直接执行SQL
# 复制 db/schema.sql 和 db/seed.sql 的内容并执行
```

## 验证部署

1. 访问你的Vercel URL（例如：https://your-project.vercel.app）
2. 检查首页是否正常显示
3. 测试数据库连接：
   - 访问 `/api/health` 检查API状态
   - 尝试注册/登录功能

## 自定义域名（可选）

在Vercel Dashboard -> Settings -> Domains 中添加自定义域名。

## 环境变量说明

### 必需的环境变量

```env
POSTGRES_URL                 # Vercel自动添加
POSTGRES_PRISMA_URL          # Vercel自动添加
POSTGRES_URL_NON_POOLING     # Vercel自动添加
POSTGRES_USER                # Vercel自动添加
POSTGRES_HOST                # Vercel自动添加
POSTGRES_PASSWORD            # Vercel自动添加
POSTGRES_DATABASE            # Vercel自动添加

DEEPSEEK_API_KEY            # 手动添加
DEEPSEEK_BASE_URL           # 手动添加
NEXTAUTH_SECRET             # 手动添加
```

### 可选的环境变量

```env
NEXT_PUBLIC_APP_URL         # 应用URL（Vercel会自动设置）
NEXT_PUBLIC_APP_NAME        # 应用名称
```

## 监控和日志

- 实时日志：Vercel Dashboard -> Deployments -> 选择部署 -> View Function Logs
- 分析数据：Vercel Dashboard -> Analytics
- 错误追踪：Vercel Dashboard -> 集成 Sentry 或其他工具

## 常见问题

### 1. 数据库连接失败

检查环境变量是否正确设置。在Vercel Dashboard中验证Postgres连接字符串。

### 2. 构建失败

检查 `package.json` 中的 `vercel-build` 脚本是否正确。确保所有依赖都在 `dependencies` 中（不是 `devDependencies`）。

### 3. API路由404

确保API路由文件在 `src/app/api/` 目录下，并正确导出处理函数。

## 回滚部署

如果新部署出现问题：

1. 进入Vercel Dashboard -> Deployments
2. 找到之前正常的部署
3. 点击 "Promote to Production"

## 数据库备份

定期备份Postgres数据库：

```bash
# 使用pg_dump
pg_dump $POSTGRES_URL > backup.sql

# 恢复
psql $POSTGRES_URL < backup.sql
```

## 性能优化

1. 启用CDN缓存
2. 使用ISR（Incremental Static Regeneration）
3. 优化图片（使用next/image）
4. 启用Vercel Analytics

## 安全建议

1. 定期更新依赖包
2. 使用环境变量存储敏感信息
3. 启用HTTPS（Vercel默认启用）
4. 配置CSP头部
5. 实施速率限制

