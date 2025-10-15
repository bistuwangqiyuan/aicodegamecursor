/**
 * 网站全局配置
 */

export const siteConfig = {
  name: 'GameCode Lab',
  description: '游戏化HTML5编程教育平台 - 通过AI助教和游戏化机制让编程学习更有趣',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  
  // 社交链接
  links: {
    github: 'https://github.com/gamecodelab',
    twitter: 'https://twitter.com/gamecodelab',
    discord: 'https://discord.gg/gamecodelab',
  },
  
  // 联系方式
  contact: {
    email: 'support@gamecodelab.com',
    feedback: '/feedback',
  },
  
  // 功能开关
  features: {
    guestTrial: true, // 游客试用
    socialLogin: true, // 第三方登录
    aiMentor: true, // AI 助教
    community: true, // 社区功能
    leaderboard: true, // 排行榜
  },
  
  // 游客试用配置
  guestTrial: {
    durationDays: 30, // 试用天数
    warningDays: 7, // 提前提醒天数
    gracePeriodDays: 7, // 到期后保留数据天数
  },
  
  // 游戏化配置
  gamification: {
    maxLevel: 10, // 最高等级
    levelUpXp: [
      0, // Lv 1
      100, // Lv 2
      300, // Lv 3
      600, // Lv 4
      1000, // Lv 5
      1500, // Lv 6
      2100, // Lv 7
      2800, // Lv 8
      3600, // Lv 9
      5000, // Lv 10
    ],
    dailyLoginCoins: 5,
    streakBonusCoins: {
      7: 50,
      30: 200,
    },
  },
  
  // AI 配置
  ai: {
    maxRetries: 3, // 最大重试次数
    timeout: 10000, // 超时时间（毫秒）
    providers: [
      { name: 'DeepSeek', priority: 1 },
      { name: 'ZhipuAI', priority: 2 },
      { name: 'MoonShot', priority: 3 },
      { name: 'TongyiAI', priority: 4 },
      { name: 'DoubaoAI', priority: 5 },
    ],
  },
  
  // 限制配置
  limits: {
    maxProjectsPerUser: 50,
    maxCommentLength: 1000,
    maxBioLength: 500,
    maxUsernameLength: 50,
  },
  
  // 分页配置
  pagination: {
    courses: 12,
    projects: 20,
    comments: 50,
    leaderboard: 100,
  },
};

export type SiteConfig = typeof siteConfig;

