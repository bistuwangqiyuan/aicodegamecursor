-- GameCode Lab 数据库初始化脚本
-- 版本: V1.0
-- 创建日期: 2025-10-14

-- 启用必要的扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- 用于全文搜索

-- ==========================================
-- 1. 用户相关表
-- ==========================================

-- 1.1 用户资料表 (profiles)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 基础信息
  username VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  avatar_url TEXT,
  bio TEXT,
  
  -- 用户类型
  user_type VARCHAR(20) NOT NULL DEFAULT 'student' 
    CHECK (user_type IN ('guest', 'student', 'teacher', 'admin')),
  
  -- 游客试用
  is_guest BOOLEAN DEFAULT FALSE,
  guest_expires_at TIMESTAMPTZ,
  
  -- 游戏化属性
  level INTEGER DEFAULT 1,
  total_xp INTEGER DEFAULT 0,
  coins INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  
  -- 学习统计
  total_learning_time INTEGER DEFAULT 0,  -- 秒
  courses_completed INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  projects_count INTEGER DEFAULT 0,
  
  -- 社交统计
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  likes_received INTEGER DEFAULT 0,
  
  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ,
  
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- 索引
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_user_type ON profiles(user_type);
CREATE INDEX idx_profiles_level ON profiles(level DESC);
CREATE INDEX idx_profiles_guest_expires ON profiles(guest_expires_at) WHERE is_guest = TRUE;

-- RLS 策略
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (TRUE);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- 1.2 用户详细统计表 (user_stats)
CREATE TABLE user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- 学习统计（按日期）
  stat_date DATE NOT NULL,
  xp_gained INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  learning_minutes INTEGER DEFAULT 0,
  
  UNIQUE(user_id, stat_date)
);

CREATE INDEX idx_user_stats_user_date ON user_stats(user_id, stat_date DESC);

ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own stats"
  ON user_stats FOR SELECT
  USING (auth.uid() = user_id);

-- ==========================================
-- 2. 课程体系表
-- ==========================================

-- 2.1 课程表 (courses)
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 基础信息
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  cover_image TEXT,
  
  -- 课程属性
  level_number INTEGER NOT NULL,
  difficulty VARCHAR(20) DEFAULT 'beginner'
    CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  
  -- 学习数据
  estimated_hours DECIMAL(4,1),
  lessons_count INTEGER DEFAULT 0,
  tasks_count INTEGER DEFAULT 0,
  
  -- 奖励
  completion_xp INTEGER DEFAULT 100,
  completion_coins INTEGER DEFAULT 50,
  
  -- 顺序与状态
  display_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  unlock_level INTEGER DEFAULT 1,
  
  -- 创建者
  created_by UUID REFERENCES profiles(id),
  
  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_courses_level ON courses(level_number, display_order);
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_published ON courses(is_published, display_order);

-- 全文搜索索引
CREATE INDEX idx_courses_search ON courses 
  USING gin(to_tsvector('chinese', title || ' ' || COALESCE(description, '')));

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published courses are viewable by everyone"
  ON courses FOR SELECT
  USING (is_published = TRUE OR auth.uid() = created_by);

-- 2.2 课时表 (lessons)
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  
  -- 基础信息
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL,
  description TEXT,
  
  -- 内容
  content_type VARCHAR(20) DEFAULT 'text'
    CHECK (content_type IN ('text', 'video', 'interactive')),
  content JSONB,
  video_url TEXT,
  
  -- 学习数据
  estimated_minutes INTEGER DEFAULT 10,
  tasks_count INTEGER DEFAULT 0,
  
  -- 奖励
  completion_xp INTEGER DEFAULT 20,
  
  -- 顺序
  display_order INTEGER DEFAULT 0,
  
  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(course_id, slug)
);

CREATE INDEX idx_lessons_course ON lessons(course_id, display_order);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lessons are viewable by everyone"
  ON lessons FOR SELECT
  USING (TRUE);

-- 2.3 任务表 (tasks)
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  
  -- 基础信息
  title VARCHAR(200) NOT NULL,
  description TEXT,
  
  -- 任务类型
  task_type VARCHAR(20) NOT NULL
    CHECK (task_type IN ('choice', 'fill', 'practice', 'challenge', 'project')),
  
  -- 任务内容
  question TEXT,
  initial_code JSONB,
  solution_code JSONB,
  hints JSONB,
  
  -- 评分标准
  test_cases JSONB,
  passing_score INTEGER DEFAULT 60,
  max_score INTEGER DEFAULT 100,
  
  -- 奖励
  xp_reward INTEGER DEFAULT 10,
  coin_reward INTEGER DEFAULT 5,
  
  -- 难度
  difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
  
  -- 顺序
  display_order INTEGER DEFAULT 0,
  
  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_tasks_lesson ON tasks(lesson_id, display_order);
CREATE INDEX idx_tasks_type ON tasks(task_type);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tasks are viewable by everyone"
  ON tasks FOR SELECT
  USING (TRUE);

-- ==========================================
-- 3. 学习数据表
-- ==========================================

-- 3.1 提交记录表 (submissions)
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  
  -- 提交内容
  submitted_code JSONB NOT NULL,
  
  -- 评分结果
  score INTEGER,
  max_score INTEGER,
  is_passed BOOLEAN DEFAULT FALSE,
  
  -- 执行结果
  test_results JSONB,
  execution_time INTEGER,
  error_message TEXT,
  
  -- AI 评价
  ai_feedback TEXT,
  ai_score INTEGER,
  code_quality_score INTEGER,
  
  -- 时间
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_submissions_user ON submissions(user_id, submitted_at DESC);
CREATE INDEX idx_submissions_task ON submissions(task_id);
CREATE INDEX idx_submissions_passed ON submissions(user_id, task_id, is_passed);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own submissions"
  ON submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own submissions"
  ON submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 3.2 学习进度表 (learning_progress)
CREATE TABLE learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  
  -- 进度状态
  status VARCHAR(20) DEFAULT 'not_started'
    CHECK (status IN ('not_started', 'in_progress', 'completed')),
  
  -- 完成数据
  tasks_completed INTEGER DEFAULT 0,
  tasks_total INTEGER,
  completion_percentage DECIMAL(5,2) DEFAULT 0.00,
  
  -- 时间记录
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, course_id, lesson_id)
);

CREATE INDEX idx_learning_progress_user ON learning_progress(user_id);
CREATE INDEX idx_learning_progress_course ON learning_progress(user_id, course_id);
CREATE INDEX idx_learning_progress_status ON learning_progress(status);

ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON learning_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON learning_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON learning_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ==========================================
-- 4. 游戏化表
-- ==========================================

-- 4.1 成就定义表 (achievements)
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 基础信息
  title VARCHAR(100) NOT NULL,
  description TEXT,
  icon_url TEXT,
  
  -- 类别
  category VARCHAR(50) NOT NULL
    CHECK (category IN ('learning', 'completion', 'quality', 'time', 'social')),
  
  -- 解锁条件
  unlock_criteria JSONB NOT NULL,
  
  -- 奖励
  xp_reward INTEGER DEFAULT 50,
  coin_reward INTEGER DEFAULT 20,
  badge_tier VARCHAR(20) DEFAULT 'bronze'
    CHECK (badge_tier IN ('bronze', 'silver', 'gold', 'platinum')),
  
  -- 稀有度
  rarity VARCHAR(20) DEFAULT 'common'
    CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  
  -- 显示
  display_order INTEGER DEFAULT 0,
  is_hidden BOOLEAN DEFAULT FALSE,
  
  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_achievements_category ON achievements(category, display_order);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Achievements are viewable by everyone"
  ON achievements FOR SELECT
  USING (TRUE);

-- 4.2 用户成就关联表 (user_achievements)
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  
  -- 完成信息
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  progress INTEGER DEFAULT 0,
  
  UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_unlocked ON user_achievements(unlocked_at DESC);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  USING (auth.uid() = user_id);

-- 4.3 排行榜表 (leaderboard)
CREATE TABLE leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- 排行榜类型
  board_type VARCHAR(50) NOT NULL
    CHECK (board_type IN ('total_xp', 'weekly_active', 'monthly_growth', 'project_likes', 'speed_challenge')),
  
  -- 时间周期
  period VARCHAR(20) DEFAULT 'all_time'
    CHECK (period IN ('daily', 'weekly', 'monthly', 'all_time')),
  period_start DATE,
  period_end DATE,
  
  -- 分数
  score INTEGER NOT NULL,
  rank INTEGER,
  
  -- 时间戳
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, board_type, period, period_start)
);

CREATE INDEX idx_leaderboard_rank ON leaderboard(board_type, period, rank);
CREATE INDEX idx_leaderboard_user ON leaderboard(user_id);

ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leaderboard is viewable by everyone"
  ON leaderboard FOR SELECT
  USING (TRUE);

-- ==========================================
-- 5. 社区功能表
-- ==========================================

-- 5.1 作品表 (projects)
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- 基础信息
  title VARCHAR(200) NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  
  -- 代码内容
  html_code TEXT,
  css_code TEXT,
  js_code TEXT,
  
  -- 标签
  tags TEXT[],
  
  -- 统计
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  forks_count INTEGER DEFAULT 0,
  
  -- Fork 信息
  forked_from UUID REFERENCES projects(id),
  
  -- 可见性
  is_public BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  
  -- AI 评分
  ai_rating DECIMAL(3,1),
  ai_review TEXT,
  
  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

CREATE INDEX idx_projects_user ON projects(user_id, created_at DESC);
CREATE INDEX idx_projects_public ON projects(is_public, published_at DESC);
CREATE INDEX idx_projects_featured ON projects(is_featured, published_at DESC);
CREATE INDEX idx_projects_likes ON projects(likes_count DESC);

-- 全文搜索
CREATE INDEX idx_projects_search ON projects
  USING gin(to_tsvector('chinese', title || ' ' || COALESCE(description, '')));

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public projects are viewable by everyone"
  ON projects FOR SELECT
  USING (is_public = TRUE OR auth.uid() = user_id);

CREATE POLICY "Users can create own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);

-- 5.2 评论表 (comments)
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- 评论内容
  content TEXT NOT NULL,
  
  -- 回复
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  
  -- 统计
  likes_count INTEGER DEFAULT 0,
  
  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT content_length CHECK (char_length(content) >= 1 AND char_length(content) <= 1000)
);

CREATE INDEX idx_comments_project ON comments(project_id, created_at DESC);
CREATE INDEX idx_comments_user ON comments(user_id);
CREATE INDEX idx_comments_parent ON comments(parent_id);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT
  USING (TRUE);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);

-- 5.3 点赞表 (likes)
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- 点赞目标（多态）
  target_type VARCHAR(20) NOT NULL
    CHECK (target_type IN ('project', 'comment')),
  target_id UUID NOT NULL,
  
  -- 时间
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, target_type, target_id)
);

CREATE INDEX idx_likes_user ON likes(user_id);
CREATE INDEX idx_likes_target ON likes(target_type, target_id);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Likes are viewable by everyone"
  ON likes FOR SELECT
  USING (TRUE);

CREATE POLICY "Authenticated users can create likes"
  ON likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
  ON likes FOR DELETE
  USING (auth.uid() = user_id);

-- 5.4 关注表 (follows)
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);

ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Follows are viewable by everyone"
  ON follows FOR SELECT
  USING (TRUE);

CREATE POLICY "Authenticated users can create follows"
  ON follows FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete own follows"
  ON follows FOR DELETE
  USING (auth.uid() = follower_id);

-- ==========================================
-- 完成初始化
-- ==========================================

COMMENT ON SCHEMA public IS 'GameCode Lab Database Schema V1.0';

