'use client';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          隐私政策
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            最后更新日期：2025年11月7日
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              1. 引言
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              GameCode Lab（&ldquo;我们&rdquo;）重视您的隐私。本隐私政策说明我们如何收集、使用、存储和保护您的个人信息。
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              使用我们的服务即表示您同意本政策中描述的数据实践。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              2. 我们收集的信息
            </h2>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              2.1 您主动提供的信息
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>账户信息：用户名、邮箱、密码（加密存储）</li>
              <li>个人资料：头像、简介、社交媒体链接（可选）</li>
              <li>学习内容：您编写的代码、项目、评论</li>
              <li>反馈：您提交的问题反馈和建议</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              2.2 自动收集的信息
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>使用数据：访问时间、浏览页面、使用功能</li>
              <li>设备信息：浏览器类型、操作系统、IP地址</li>
              <li>学习进度：完成的任务、获得的成就、学习时长</li>
              <li>性能数据：页面加载时间、错误日志</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              3. 信息使用方式
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              我们使用收集的信息用于：
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>提供和改进我们的服务</li>
              <li>个性化您的学习体验</li>
              <li>追踪学习进度和成就</li>
              <li>提供AI助教服务</li>
              <li>发送重要通知和更新</li>
              <li>分析平台使用情况以优化功能</li>
              <li>防止欺诈和滥用行为</li>
              <li>遵守法律要求</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              4. 信息共享
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              我们不会出售您的个人信息。我们可能在以下情况共享信息：
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              4.1 公开信息
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              您选择公开的项目、评论和个人资料信息将对其他用户可见。
            </p>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              4.2 服务提供商
            </h3>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>Vercel - 网站托管和数据库服务</li>
              <li>DeepSeek - AI代码分析服务</li>
              <li>分析工具 - 使用情况统计</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
              4.3 法律要求
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              在法律要求或保护我们权利时，我们可能披露信息。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              5. 数据安全
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              我们采取合理的安全措施保护您的信息：
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>密码使用安全哈希算法加密</li>
              <li>数据传输使用HTTPS加密</li>
              <li>数据库访问权限严格控制</li>
              <li>定期安全审计和更新</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              但请注意，没有任何方法可以100%保证安全。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              6. Cookie和追踪技术
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              我们使用Cookie和类似技术来：
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>保持登录状态</li>
              <li>记住用户偏好设置</li>
              <li>分析网站使用情况</li>
              <li>改善用户体验</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              您可以通过浏览器设置控制Cookie，但这可能影响某些功能。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              7. 您的权利
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              您拥有以下权利：
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>访问和下载您的个人数据</li>
              <li>更正不准确的信息</li>
              <li>删除您的账户和数据</li>
              <li>限制某些数据处理</li>
              <li>导出您的学习数据</li>
              <li>反对特定数据使用</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              要行使这些权利，请通过support@gamecodelab.com联系我们。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              8. 儿童隐私
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              我们的服务面向13岁以上用户。我们不会故意收集13岁以下儿童的个人信息。如果您发现儿童提供了信息，请联系我们删除。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              9. 数据保留
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              我们保留您的数据直到：
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>您删除账户</li>
              <li>您请求删除特定数据</li>
              <li>法律要求的保留期限到期</li>
              <li>不再需要用于服务目的</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              10. 国际数据传输
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              您的数据可能存储在您所在国家/地区以外的服务器上。我们确保采取适当的保护措施。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              11. 政策更新
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              我们可能不时更新此隐私政策。重大变更将通过邮件或网站通知您。继续使用服务即表示接受更新后的政策。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              12. 联系我们
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              如对本隐私政策有任何疑问或请求，请联系：
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Email: privacy@gamecodelab.com
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Support: support@gamecodelab.com
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <a 
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← 返回首页
          </a>
        </div>
      </div>
    </div>
  );
}

