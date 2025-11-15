# GameCode Lab - 测试指导文档

## 📋 测试概述

本文档提供完整的测试指导，帮助您验证GameCode Lab平台的各项功能。

---

## 🚀 快速测试指南

### 1. 基础功能测试

#### 步骤1: 测试首页
```bash
# 打开浏览器访问
https://aicodegamecursor.vercel.app

# 预期结果:
✅ 页面正常加载
✅ 显示营销内容
✅ 所有链接可点击
```

#### 步骤2: 测试API健康检查
```bash
# 使用curl或浏览器访问
https://aicodegamecursor.vercel.app/api/health

# 预期返回:
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2025-11-07T...",
  "message": "GameCode Lab API is running"
}
```

#### 步骤3: 测试所有页面
访问以下页面，确保都返回200 OK：
- ✅ https://aicodegamecursor.vercel.app/
- ✅ https://aicodegamecursor.vercel.app/login
- ✅ https://aicodegamecursor.vercel.app/register
- ✅ https://aicodegamecursor.vercel.app/dashboard
- ✅ https://aicodegamecursor.vercel.app/courses
- ✅ https://aicodegamecursor.vercel.app/playground
- ✅ https://aicodegamecursor.vercel.app/projects
- ✅ https://aicodegamecursor.vercel.app/leaderboard
- ✅ https://aicodegamecursor.vercel.app/terms
- ✅ https://aicodegamecursor.vercel.app/privacy

---

## 🧪 详细测试步骤

### 测试1: 前端页面

#### 1.1 首页测试
```
1. 访问首页
2. 检查标题和描述
3. 点击"立即开始学习"按钮
4. 点击"浏览课程"按钮
5. 滚动查看所有内容
6. 点击底部的服务条款和隐私政策链接

预期: 所有元素正常显示，链接正常跳转
```

#### 1.2 主题切换测试
```
1. 点击右上角主题切换按钮
2. 切换到暗色模式
3. 切换到亮色模式
4. 切换到系统模式

预期: 主题顺利切换，无样式错误
```

#### 1.3 响应式测试
```
1. 在桌面端（1920x1080）查看
2. 调整窗口到平板尺寸（768x1024）
3. 调整窗口到手机尺寸（375x667）

预期: 布局自适应，内容可读
```

### 测试2: API端点

#### 2.1 健康检查API
```bash
# PowerShell
curl https://aicodegamecursor.vercel.app/api/health -UseBasicParsing

# 预期HTTP 200
# 预期返回JSON数据
```

#### 2.2 课程列表API
```bash
curl https://aicodegamecursor.vercel.app/api/courses -UseBasicParsing

# 预期HTTP 200
# 预期返回 { success: true, data: [], message: "..." }
```

#### 2.3 项目列表API
```bash
curl https://aicodegamecursor.vercel.app/api/projects -UseBasicParsing

# 预期HTTP 200
# 预期返回 { success: true, data: [], pagination: {...} }
```

---

## 🐛 常见问题排查

### 问题1: API返回500错误
**症状**: API请求返回500内部服务器错误

**原因**: 数据库未初始化或查询失败

**解决方案**:
- ✅ 已修复: API现在返回友好提示而非500错误
- 检查Vercel日志: `vercel logs https://aicodegamecursor.vercel.app`
- 确认数据库连接: 访问 `/api/health`

### 问题2: 页面加载慢
**症状**: 页面需要很长时间才能加载

**原因**: 网络延迟或资源未优化

**解决方案**:
- 检查网络连接
- 清除浏览器缓存
- 使用浏览器开发者工具查看网络请求

### 问题3: 数据为空
**症状**: API返回空数组

**原因**: 数据库未初始化

**解决方案**:
```bash
# 这是正常的！数据库需要手动初始化
# 参见 docs/VERCEL_DEPLOYMENT.md
```

---

## ✅ 测试检查清单

### 前端测试
- [ ] 首页加载正常
- [ ] 所有页面可访问（10个页面）
- [ ] 主题切换工作
- [ ] 响应式设计正常
- [ ] 导航链接正常
- [ ] 无控制台错误

### API测试
- [ ] `/api/health` 返回200
- [ ] `/api/courses` 返回200
- [ ] `/api/projects` 返回200
- [ ] `/api/leaderboard` 返回200
- [ ] 所有API返回JSON格式
- [ ] 错误处理友好

### 安全测试
- [ ] HTTPS启用
- [ ] SSL证书有效
- [ ] 无敏感信息泄露

### 性能测试
- [ ] 首页加载 < 3秒
- [ ] API响应 < 1秒
- [ ] 无明显卡顿

---

## 🔧 自动化测试脚本

### 使用Node.js脚本
```bash
# 运行自动化测试
node scripts/test-system.js

# 预期: 显示所有测试结果
```

### 使用PowerShell脚本
```powershell
# 测试所有页面
$pages = @('/', '/login', '/register', '/dashboard', '/courses', 
           '/playground', '/projects', '/leaderboard', '/terms', '/privacy')
           
foreach($page in $pages) {
  $url = "https://aicodegamecursor.vercel.app$page"
  try {
    $response = curl $url -UseBasicParsing -TimeoutSec 10
    Write-Host "✓ $page - $($response.StatusCode)" -ForegroundColor Green
  } catch {
    Write-Host "✗ $page - Error" -ForegroundColor Red
  }
}
```

---

## 📊 测试报告模板

### 基础信息
- 测试日期: _______
- 测试人员: _______
- 环境: Production
- URL: https://aicodegamecursor.vercel.app

### 测试结果
| 测试项 | 通过 | 失败 | 备注 |
|--------|------|------|------|
| 前端页面 | __/10 | __ | |
| API端点 | __/5 | __ | |
| 响应式设计 | __/3 | __ | |
| 主题切换 | __/1 | __ | |

### 发现的问题
1. 问题描述: _______
   - 严重程度: _______
   - 复现步骤: _______
   - 截图: _______

---

## 🎯 下一步行动

### 测试通过后
1. ✅ 标记测试为完成
2. ✅ 更新测试报告
3. ✅ 通知团队测试结果

### 测试失败后
1. ❌ 记录失败详情
2. ❌ 创建问题单
3. ❌ 修复后重新测试

---

## 📞 获取帮助

如遇测试问题：
- 查看完整测试报告: `FINAL_TEST_REPORT.md`
- 查看部署文档: `docs/VERCEL_DEPLOYMENT.md`
- 查看Vercel日志: https://vercel.com/dashboard

---

**祝测试顺利！** 🎉

