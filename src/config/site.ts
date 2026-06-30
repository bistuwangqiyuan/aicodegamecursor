/**
 * 网站全局配置 - 北京信息科技大学 GameCode Lab
 */

export const siteConfig = {
  name: 'GameCode Lab',
  subtitle: '信工实习 · AI编程 · 北京信息科技大学 · 大学生编程平台',
  description:
    '信工实习 · AI编程 — 面向北京信息科技大学大学生的游戏化 HTML5 编程教育平台，通过 AI 助教和游戏化机制让编程学习更有趣',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  project: {
    internship: '信工实习',
    aiProgramming: 'AI编程',
    fullTitle: '信工实习 · AI编程 · 北京信息科技大学大学生 Web 编程平台',
    slogan: '信工实习练技能，AI编程助成长',
  },

  university: {
    fullName: '北京信息科技大学',
    shortName: '北信科',
    motto: '勤以为学，信以立身',
    foundedYear: 1937,
    officialUrl: 'https://www.bistu.edu.cn/',
    viUrl: 'https://vi.bistu.edu.cn/',
    colleges: 17,
    tagline: '信息特色 · 军工特色 · 行业特色',
  },

  brand: {
    colors: {
      techBlue: '#0066B3',
      chinaRed: '#C8102E',
      vitalityOrange: '#F47920',
    },
    logo: '/bistu/logo.svg',
    logoWhite: '/bistu/logo-white.svg',
    mascot: '/bistu/mascot.svg',
  },

  testAccounts: [
    {
      role: 'student',
      roleLabel: '大学生',
      email: 'student@bistu.edu.cn',
      password: 'Bistu@2026',
      displayName: '张信科',
      description: '体验完整学习路径、课程、成就与排行榜',
    },
    {
      role: 'teacher',
      roleLabel: '教师',
      email: 'teacher@bistu.edu.cn',
      password: 'Bistu@2026',
      displayName: '李老师',
      description: '教师角色，可查看课程管理入口',
    },
    {
      role: 'admin',
      roleLabel: '管理员',
      email: 'admin@bistu.edu.cn',
      password: 'Bistu@2026',
      displayName: '系统管理员',
      description: '系统管理员角色标识',
    },
    {
      role: 'guest',
      roleLabel: '游客',
      email: 'guest@bistu.edu.cn',
      password: 'Bistu@2026',
      displayName: '游客体验',
      description: '30 天免费试用体验',
    },
  ],

  testPassword: 'Bistu@2026',

  links: {
    github: 'https://github.com/bistu-gamecodelab',
    bistuOfficial: 'https://www.bistu.edu.cn/',
    bistuVi: 'https://vi.bistu.edu.cn/',
  },

  contact: {
    email: 'support@bistu.edu.cn',
    feedback: '/feedback',
  },

  features: {
    guestTrial: true,
    socialLogin: false,
    aiMentor: true,
    community: true,
    leaderboard: true,
  },

  guestTrial: {
    durationDays: 30,
    warningDays: 7,
    gracePeriodDays: 7,
  },

  gamification: {
    maxLevel: 10,
    levelUpXp: [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 5000],
    dailyLoginCoins: 5,
    streakBonusCoins: {
      7: 50,
      30: 200,
    },
  },

  ai: {
    maxRetries: 3,
    timeout: 10000,
    providers: [
      { name: 'DeepSeek', priority: 1 },
      { name: 'ZhipuAI', priority: 2 },
      { name: 'MoonShot', priority: 3 },
      { name: 'TongyiAI', priority: 4 },
      { name: 'DoubaoAI', priority: 5 },
    ],
  },

  limits: {
    maxProjectsPerUser: 50,
    maxCommentLength: 1000,
    maxBioLength: 500,
    maxUsernameLength: 50,
  },

  pagination: {
    courses: 12,
    projects: 20,
    comments: 50,
    leaderboard: 100,
  },
};

export type SiteConfig = typeof siteConfig;

export const roleLabels: Record<string, string> = {
  student: '大学生',
  teacher: '教师',
  admin: '管理员',
  guest: '游客',
};
