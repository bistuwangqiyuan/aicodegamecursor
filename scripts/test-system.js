#!/usr/bin/env node

/**
 * GameCode Lab - 自动化测试脚本
 * 测试所有前端页面和API端点
 */

const https = require('https');

const BASE_URL = 'https://aicodegamecursor.vercel.app';
const TIMEOUT = 10000; // 10秒超时

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// HTTP GET请求
function httpGet(url) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Request timeout'));
    }, TIMEOUT);

    https.get(url, { timeout: TIMEOUT }, (res) => {
      clearTimeout(timeoutId);
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', (err) => {
      clearTimeout(timeoutId);
      reject(err);
    });
  });
}

// HTTP POST请求
function httpPost(url, postData) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const data = JSON.stringify(postData);
    
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      },
      timeout: TIMEOUT
    };

    const timeoutId = setTimeout(() => {
      reject(new Error('Request timeout'));
    }, TIMEOUT);

    const req = https.request(options, (res) => {
      clearTimeout(timeoutId);
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: responseData
        });
      });
    });

    req.on('error', (err) => {
      clearTimeout(timeoutId);
      reject(err);
    });

    req.write(data);
    req.end();
  });
}

// 测试结果统计
const results = {
  passed: 0,
  failed: 0,
  errors: []
};

// 测试单个页面
async function testPage(path, name) {
  try {
    log(`\n测试页面: ${name}`, 'cyan');
    log(`URL: ${BASE_URL}${path}`, 'blue');
    
    const startTime = Date.now();
    const response = await httpGet(`${BASE_URL}${path}`);
    const duration = Date.now() - startTime;
    
    if (response.statusCode === 200) {
      log(`✓ 通过 (${duration}ms)`, 'green');
      results.passed++;
      return true;
    } else {
      log(`✗ 失败 - 状态码: ${response.statusCode}`, 'red');
      results.failed++;
      results.errors.push(`${name}: HTTP ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    log(`✗ 错误: ${error.message}`, 'red');
    results.failed++;
    results.errors.push(`${name}: ${error.message}`);
    return false;
  }
}

// 测试API端点
async function testAPI(path, method, name, postData = null) {
  try {
    log(`\n测试API: ${name}`, 'cyan');
    log(`${method} ${BASE_URL}${path}`, 'blue');
    
    const startTime = Date.now();
    const response = method === 'POST' 
      ? await httpPost(`${BASE_URL}${path}`, postData)
      : await httpGet(`${BASE_URL}${path}`);
    const duration = Date.now() - startTime;
    
    if (response.statusCode === 200 || response.statusCode === 201) {
      log(`✓ 通过 (${duration}ms)`, 'green');
      
      // 尝试解析JSON
      try {
        const json = JSON.parse(response.body);
        log(`响应数据: ${JSON.stringify(json).substring(0, 100)}...`, 'blue');
      } catch (e) {
        // 非JSON响应
      }
      
      results.passed++;
      return true;
    } else {
      log(`✗ 失败 - 状态码: ${response.statusCode}`, 'red');
      results.failed++;
      results.errors.push(`${name}: HTTP ${response.statusCode}`);
      return false;
    }
  } catch (error) {
    log(`✗ 错误: ${error.message}`, 'red');
    results.failed++;
    results.errors.push(`${name}: ${error.message}`);
    return false;
  }
}

// 主测试函数
async function runTests() {
  log('╔════════════════════════════════════════════════════════╗', 'magenta');
  log('║     GameCode Lab - 自动化测试套件                      ║', 'magenta');
  log('╚════════════════════════════════════════════════════════╝', 'magenta');
  log(`\n测试环境: ${BASE_URL}\n`, 'yellow');

  // ========== 前端页面测试 ==========
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'magenta');
  log('  1. 前端页面可访问性测试', 'magenta');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'magenta');

  await testPage('/', '首页');
  await testPage('/login', '登录页');
  await testPage('/register', '注册页');
  await testPage('/dashboard', '用户仪表板');
  await testPage('/courses', '课程列表');
  await testPage('/playground', '在线编辑器');
  await testPage('/projects', '项目展示');
  await testPage('/leaderboard', '排行榜');
  await testPage('/terms', '服务条款');
  await testPage('/privacy', '隐私政策');

  // ========== API端点测试 ==========
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'magenta');
  log('  2. API端点测试', 'magenta');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'magenta');

  await testAPI('/api/health', 'GET', '健康检查');
  await testAPI('/api/courses', 'GET', '课程列表');
  await testAPI('/api/courses/1', 'GET', '课程详情');
  await testAPI('/api/projects', 'GET', '公开项目');
  await testAPI('/api/leaderboard', 'GET', '排行榜');

  // AI API测试（可能需要API key）
  log('\n注意: AI API需要配置DeepSeek API密钥才能正常工作', 'yellow');
  await testAPI('/api/ai/explain', 'POST', 'AI代码讲解', {
    code: '<h1>Hello World</h1>',
    language: 'html'
  });

  // ========== 测试结果汇总 ==========
  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'magenta');
  log('  测试结果汇总', 'magenta');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'magenta');

  const total = results.passed + results.failed;
  const passRate = total > 0 ? ((results.passed / total) * 100).toFixed(2) : 0;

  log(`\n总测试数: ${total}`, 'cyan');
  log(`通过: ${results.passed}`, 'green');
  log(`失败: ${results.failed}`, 'red');
  log(`通过率: ${passRate}%`, passRate >= 80 ? 'green' : 'yellow');

  if (results.errors.length > 0) {
    log('\n失败的测试:', 'red');
    results.errors.forEach((error, index) => {
      log(`  ${index + 1}. ${error}`, 'red');
    });
  }

  log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n', 'magenta');

  // 返回退出代码
  process.exit(results.failed > 0 ? 1 : 0);
}

// 运行测试
runTests().catch(error => {
  log(`\n致命错误: ${error.message}`, 'red');
  process.exit(1);
});

