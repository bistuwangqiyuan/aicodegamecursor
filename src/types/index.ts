/**
 * 通用类型定义
 */

// 用户类型
export type UserType = 'guest' | 'student' | 'teacher' | 'admin';

// 用户资料
export interface UserProfile {
  id: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  userType: UserType;
  isGuest: boolean;
  guestExpiresAt?: string;
  level: number;
  totalXp: number;
  coins: number;
  currentStreak: number;
  longestStreak: number;
  createdAt: string;
  updatedAt: string;
}

// 课程
export interface Course {
  id: string;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  levelNumber: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours?: number;
  lessonsCount: number;
  tasksCount: number;
  completionXp: number;
  completionCoins: number;
  displayOrder: number;
  isPublished: boolean;
  isLocked: boolean;
  unlockLevel: number;
  createdAt: string;
  updatedAt: string;
}

// 课时
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  slug: string;
  description?: string;
  contentType: 'text' | 'video' | 'interactive';
  content?: any;
  videoUrl?: string;
  estimatedMinutes: number;
  tasksCount: number;
  completionXp: number;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

// 任务
export interface Task {
  id: string;
  lessonId: string;
  title: string;
  description?: string;
  taskType: 'choice' | 'fill' | 'practice' | 'challenge' | 'project';
  question?: string;
  initialCode?: {
    html?: string;
    css?: string;
    js?: string;
  };
  solutionCode?: {
    html?: string;
    css?: string;
    js?: string;
  };
  hints?: string[];
  testCases?: any;
  passingScore: number;
  maxScore: number;
  xpReward: number;
  coinReward: number;
  difficulty: number;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

// 提交记录
export interface Submission {
  id: string;
  userId: string;
  taskId: string;
  submittedCode: {
    html?: string;
    css?: string;
    js?: string;
  };
  score?: number;
  maxScore?: number;
  isPassed: boolean;
  testResults?: any;
  executionTime?: number;
  errorMessage?: string;
  aiFeedback?: string;
  aiScore?: number;
  codeQualityScore?: number;
  submittedAt: string;
}

// 学习进度
export interface LearningProgress {
  id: string;
  userId: string;
  courseId: string;
  lessonId?: string;
  status: 'not_started' | 'in_progress' | 'completed';
  tasksCompleted: number;
  tasksTotal?: number;
  completionPercentage: number;
  startedAt?: string;
  completedAt?: string;
  lastAccessedAt: string;
}

// 成就
export interface Achievement {
  id: string;
  title: string;
  description?: string;
  iconUrl?: string;
  category: 'learning' | 'completion' | 'quality' | 'time' | 'social';
  unlockCriteria: any;
  xpReward: number;
  coinReward: number;
  badgeTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  displayOrder: number;
  isHidden: boolean;
  createdAt: string;
}

// 用户成就
export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  achievement?: Achievement;
  progress: number;
  unlockedAt: string;
}

// 作品
export interface Project {
  id: string;
  userId: string;
  user?: UserProfile;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  htmlCode?: string;
  cssCode?: string;
  jsCode?: string;
  tags?: string[];
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  forksCount: number;
  forkedFrom?: string;
  isPublic: boolean;
  isFeatured: boolean;
  aiRating?: number;
  aiReview?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// 评论
export interface Comment {
  id: string;
  projectId: string;
  userId: string;
  user?: UserProfile;
  content: string;
  parentId?: string;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}

// 排行榜
export interface LeaderboardEntry {
  id: string;
  userId: string;
  user?: UserProfile;
  boardType: 'total_xp' | 'weekly_active' | 'monthly_growth' | 'project_likes' | 'speed_challenge';
  period: 'daily' | 'weekly' | 'monthly' | 'all_time';
  periodStart?: string;
  periodEnd?: string;
  score: number;
  rank?: number;
  updatedAt: string;
}

// API 响应
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    page?: number;
    total?: number;
    limit?: number;
  };
}

// 分页参数
export interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
}

// AI 请求
export interface AIRequest {
  prompt: string;
  context?: any;
  maxTokens?: number;
  temperature?: number;
}

// AI 响应
export interface AIResponse {
  content: string;
  model: string;
  tokensUsed?: number;
  finishReason?: string;
}

