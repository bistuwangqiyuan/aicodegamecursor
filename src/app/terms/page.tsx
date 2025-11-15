'use client';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          服务条款
        </h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            最后更新日期：2025年11月7日
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              1. 接受条款
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              欢迎使用GameCode Lab！通过访问和使用本平台，您同意遵守以下服务条款。如果您不同意这些条款，请不要使用本服务。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              2. 服务描述
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              GameCode Lab是一个游戏化的编程学习平台，提供：
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>在线HTML、CSS和JavaScript编程课程</li>
              <li>AI驱动的代码讲解和纠错服务</li>
              <li>交互式编程练习和项目</li>
              <li>学习进度追踪和成就系统</li>
              <li>社区作品展示和分享功能</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              3. 用户账户
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              3.1 您需要创建账户才能使用完整功能。游客模式提供有限的试用体验。
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              3.2 您有责任保护账户安全，不得与他人共享登录凭证。
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              3.3 您必须提供真实、准确的注册信息。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              4. 用户行为规范
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              您同意不会：
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-2">
              <li>上传恶意代码或病毒</li>
              <li>侵犯他人知识产权</li>
              <li>发布不当、违法或有害内容</li>
              <li>尝试未经授权访问系统或其他用户数据</li>
              <li>滥用平台功能或进行作弊行为</li>
              <li>骚扰、诽谤或侵犯其他用户</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              5. 知识产权
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              5.1 平台上的所有内容（包括但不限于课程材料、设计、代码）均为GameCode Lab或其许可方所有。
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              5.2 您保留对自己创建的项目代码的所有权，但授予我们展示和分享的权利。
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              5.3 未经许可，不得复制、修改或分发平台内容用于商业用途。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              6. AI服务声明
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              6.1 我们的AI助教服务基于第三方AI技术提供。
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              6.2 AI生成的内容仅供参考，可能存在错误或不准确。
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              6.3 我们不对AI建议导致的任何损失负责。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              7. 免责声明
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              7.1 本服务按&ldquo;现状&rdquo;提供，不提供任何明示或暗示的保证。
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              7.2 我们不保证服务始终可用、无错误或安全。
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              7.3 在法律允许的最大范围内，我们不对任何直接、间接或后果性损害负责。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              8. 服务变更和终止
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              8.1 我们保留随时修改、暂停或终止服务的权利，恕不另行通知。
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              8.2 我们可能因违反条款而暂停或终止您的账户。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              9. 条款修改
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              我们可能随时更新这些条款。继续使用服务即表示您接受修改后的条款。
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              10. 联系我们
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              如对这些条款有任何疑问，请通过以下方式联系我们：
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Email: support@gamecodelab.com
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

