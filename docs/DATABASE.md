# GameCode Lab 数据库设计文档

**版本**: V1.0  
**创建日期**: 2025-10-14  
**数据库**: PostgreSQL 15 (Supabase)

---

## 一、数据库概览

### 1.1 设计原则

1. **规范化设计** - 满足第三范式，减少数据冗余
2. **性能优化** - 合理使用索引，优化查询效率
3. **安全第一** - Row Level Security (RLS) 保护数据
4. **可扩展性** - 预留扩展字段，支持未来功能
5. **数据完整性** - 外键约束，保证数据一致性

### 1.2 数据库表结构总览

```
用户相关
├── profiles (用户资料)
├── user_stats (用户统计)
└── user_achievements (用户成就)

课程体系
├── courses (课程)
├── levels (等级)
├── lessons (课时)
└── tasks (任务)

学习数据
├── submissions (提交记录)
├── learning_progress (学习进度)
└── code_reviews (代码评审)

游戏化
├── achievements (成就定义)
├── leaderboard (排行榜)
└── user_rewards (用户奖励)

社区功能
├── projects (作品)
├── comments (评论)
├── likes (点赞)
└── follows (关注)

系统管理
├── announcements (公告)
├── feedback (反馈)
└── audit_logs (审计日志)
```

---

## 二、详细表结构

### 2.1 用户相关表

#### 2.1.1 profiles (用户资料表)

```sql
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
  current_streak INTEGER DEFAULT 0,  -- 连续学习天数
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
  
  -- 索引
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- 索引
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_profiles_user_type ON profiles(user_type);
CREATE INDEX idx_profiles_level ON profiles(level DESC);
CREATE INDEX idx_profiles_guest_expires ON profiles(guest_expires_at) 
  WHERE is_guest = TRUE;

-- RLS 策略
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
USING (TRUE);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);
```

#### 2.1.2 user_stats (用户详细统计表)

```sql
CREATE TABLE user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- 学习统计（按日期）
  stat_date DATE NOT NULL,
  xp_gained INTEGER DEFAULT 0,
  tasks_completed INTEGER DEFAULT 0,
  learning_minutes INTEGER DEFAULT 0,
  
  -- 唯一约束
  UNIQUE(user_id, stat_date)
);

CREATE INDEX idx_user_stats_user_date ON user_stats(user_id, stat_date DESC);

ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own stats"
ON user_stats FOR SELECT
USING (auth.uid() = user_id);
```

#### 2.1.3 user_achievements (用户成就关联表)

```sql
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  
  -- 完成信息
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  progress INTEGER DEFAULT 0,  -- 进度（如果成就有多个步骤）
  
  UNIQUE(user_id, achievement_id)
);

CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_unlocked ON user_achievements(unlocked_at DESC);

ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own achievements"
ON user_achievements FOR SELECT
USING (auth.uid() = user_id);
```

---

### 2.2 课程体系表

#### 2.2.1 courses (课程表)

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 基础信息
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  cover_image TEXT,
  
  -- 课程属性
  level_number INTEGER NOT NULL,  -- Level 1, 2, 3...
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
  is_locked BOOLEAN DEFAULT FALSE,  -- 是否需要解锁
  unlock_level INTEGER DEFAULT 1,   -- 需要的用户等级
  
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
```

#### 2.2.2 lessons (课时表)

```sql
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
  content JSONB,  -- 存储 Markdown/HTML 内容
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
```

#### 2.2.3 tasks (任务表)

```sql
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
  initial_code JSONB,  -- { "html": "", "css": "", "js": "" }
  solution_code JSONB,
  hints JSONB,  -- ["提示1", "提示2"]
  
  -- 评分标准
  test_cases JSONB,  -- 测试用例
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
```

---

### 2.3 学习数据表

#### 2.3.1 submissions (提交记录表)

```sql
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
  test_results JSONB,  -- 测试用例执行结果
  execution_time INTEGER,  -- 毫秒
  error_message TEXT,
  
  -- AI 评价
  ai_feedback TEXT,
  ai_score INTEGER,
  code_quality_score INTEGER,  -- 代码质量评分
  
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
```

#### 2.3.2 learning_progress (学习进度表)

```sql
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
```

#### 2.3.3 code_reviews (代码评审表)

```sql
CREATE TABLE code_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES profiles(id),
  
  -- 评审内容
  review_type VARCHAR(20) DEFAULT 'ai'
    CHECK (review_type IN ('ai', 'peer', 'teacher')),
  
  comments TEXT,
  suggestions JSONB,
  
  -- 评分
  code_style_score INTEGER,
  performance_score INTEGER,
  best_practices_score INTEGER,
  
  -- 时间
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_code_reviews_submission ON code_reviews(submission_id);

ALTER TABLE code_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by submission owner"
ON code_reviews FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM submissions
    WHERE submissions.id = code_reviews.submission_id
    AND submissions.user_id = auth.uid()
  )
);
```

---

### 2.4 游戏化表

#### 2.4.1 achievements (成就定义表)

```sql
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
  -- 例如: { "type": "tasks_completed", "target": 10 }
  
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
  is_hidden BOOLEAN DEFAULT FALSE,  -- 隐藏成就
  
  -- 时间戳
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_achievements_category ON achievements(category, display_order);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Achievements are viewable by everyone"
ON achievements FOR SELECT
USING (TRUE);
```

#### 2.4.2 leaderboard (排行榜表)

```sql
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
```

#### 2.4.3 user_rewards (用户奖励记录表)

```sql
CREATE TABLE user_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- 奖励类型
  reward_type VARCHAR(50) NOT NULL
    CHECK (reward_type IN ('xp', 'coins', 'achievement', 'item')),
  
  -- 奖励来源
  source_type VARCHAR(50) NOT NULL,
  source_id UUID,
  
  -- 奖励内容
  xp_amount INTEGER DEFAULT 0,
  coin_amount INTEGER DEFAULT 0,
  item_id UUID,
  
  -- 描述
  description TEXT,
  
  -- 时间
  awarded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_rewards_user ON user_rewards(user_id, awarded_at DESC);

ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own rewards"
ON user_rewards FOR SELECT
USING (auth.uid() = user_id);
```

---

### 2.5 社区功能表

#### 2.5.1 projects (作品表)

```sql
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
  tags TEXT[],  -- {"HTML", "CSS", "JavaScript"}
  
  -- 统计
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  forks_count INTEGER DEFAULT 0,
  
  -- Fork 信息
  forked_from UUID REFERENCES projects(id),
  
  -- 可见性
  is_public BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,  -- 精选作品
  
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
```

#### 2.5.2 comments (评论表)

```sql
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
```

#### 2.5.3 likes (点赞表)

```sql
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
```

#### 2.5.4 follows (关注表)

```sql
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
```

---

### 2.6 系统管理表

#### 2.6.1 announcements (公告表)

```sql
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- 内容
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  
  -- 类型
  announcement_type VARCHAR(20) DEFAULT 'info'
    CHECK (announcement_type IN ('info', 'warning', 'success', 'error')),
  
  -- 目标用户
  target_audience VARCHAR(20) DEFAULT 'all'
    CHECK (target_audience IN ('all', 'guest', 'student', 'teacher')),
  
  -- 显示
  is_active BOOLEAN DEFAULT TRUE,
  priority INTEGER DEFAULT 0,
  
  -- 时间
  start_date TIMESTAMPTZ DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_announcements_active ON announcements(is_active, start_date DESC);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active announcements are viewable by everyone"
ON announcements FOR SELECT
USING (is_active = TRUE AND start_date <= NOW() AND (end_date IS NULL OR end_date >= NOW()));
```

#### 2.6.2 feedback (反馈表)

```sql
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  
  -- 反馈内容
  feedback_type VARCHAR(20) NOT NULL
    CHECK (feedback_type IN ('bug', 'feature', 'improvement', 'other')),
  title VARCHAR(200),
  content TEXT NOT NULL,
  
  -- 附件
  attachments TEXT[],
  
  -- 状态
  status VARCHAR(20) DEFAULT 'pending'
    CHECK (status IN ('pending', 'reviewing', 'resolved', 'closed')),
  
  -- 时间
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_feedback_user ON feedback(user_id);
CREATE INDEX idx_feedback_status ON feedback(status, created_at DESC);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own feedback"
ON feedback FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create feedback"
ON feedback FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
```

#### 2.6.3 audit_logs (审计日志表)

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  
  -- 操作信息
  action VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  
  -- 详情
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  
  -- 时间
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_user ON audit_logs(user_id, created_at DESC);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- 审计日志只允许插入，不允许修改删除
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view all audit logs"
ON audit_logs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.user_type = 'admin'
  )
);
```

---

## 三、视图 (Views)

### 3.1 用户排行榜视图

```sql
CREATE OR REPLACE VIEW v_user_leaderboard AS
SELECT
  p.id,
  p.username,
  p.display_name,
  p.avatar_url,
  p.level,
  p.total_xp,
  p.coins,
  p.courses_completed,
  p.tasks_completed,
  RANK() OVER (ORDER BY p.total_xp DESC) as rank
FROM profiles p
WHERE p.is_guest = FALSE
ORDER BY p.total_xp DESC;
```

### 3.2 课程完成度视图

```sql
CREATE OR REPLACE VIEW v_course_completion AS
SELECT
  lp.user_id,
  lp.course_id,
  c.title as course_title,
  COUNT(DISTINCT lp.lesson_id) as lessons_completed,
  c.lessons_count as total_lessons,
  ROUND(
    COUNT(DISTINCT lp.lesson_id)::DECIMAL / NULLIF(c.lessons_count, 0) * 100,
    2
  ) as completion_percentage
FROM learning_progress lp
JOIN courses c ON c.id = lp.course_id
WHERE lp.status = 'completed'
GROUP BY lp.user_id, lp.course_id, c.title, c.lessons_count;
```

---

## 四、存储过程 (Functions)

### 4.1 更新用户等级

```sql
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
DECLARE
  new_level INTEGER;
BEGIN
  -- 根据经验值计算等级
  new_level := CASE
    WHEN NEW.total_xp >= 5000 THEN 10
    WHEN NEW.total_xp >= 3600 THEN 9
    WHEN NEW.total_xp >= 2800 THEN 8
    WHEN NEW.total_xp >= 2100 THEN 7
    WHEN NEW.total_xp >= 1500 THEN 6
    WHEN NEW.total_xp >= 1000 THEN 5
    WHEN NEW.total_xp >= 600 THEN 4
    WHEN NEW.total_xp >= 300 THEN 3
    WHEN NEW.total_xp >= 100 THEN 2
    ELSE 1
  END;
  
  NEW.level := new_level;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_level
BEFORE UPDATE OF total_xp ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_user_level();
```

### 4.2 更新项目统计

```sql
CREATE OR REPLACE FUNCTION update_project_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.target_type = 'project' THEN
      UPDATE projects
      SET likes_count = likes_count + 1
      WHERE id = NEW.target_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.target_type = 'project' THEN
      UPDATE projects
      SET likes_count = GREATEST(likes_count - 1, 0)
      WHERE id = OLD.target_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_project_likes
AFTER INSERT OR DELETE ON likes
FOR EACH ROW
EXECUTE FUNCTION update_project_stats();
```

### 4.3 检查游客试用期

```sql
CREATE OR REPLACE FUNCTION check_guest_expiry()
RETURNS TABLE (
  user_id UUID,
  expires_in_days INTEGER,
  is_expired BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id as user_id,
    EXTRACT(DAY FROM (p.guest_expires_at - NOW()))::INTEGER as expires_in_days,
    (p.guest_expires_at < NOW()) as is_expired
  FROM profiles p
  WHERE p.is_guest = TRUE;
END;
$$ LANGUAGE plpgsql;
```

---

## 五、触发器 (Triggers)

### 5.1 自动更新 updated_at

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 应用到多个表
CREATE TRIGGER trigger_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_courses_updated_at
BEFORE UPDATE ON courses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ... 其他表类似
```

---

## 六、索引优化总结

### 6.1 关键索引

```sql
-- 用户查询
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_profiles_level_xp ON profiles(level DESC, total_xp DESC);

-- 课程查询
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_courses_published_order ON courses(is_published, display_order);
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_lessons_course_order ON lessons(course_id, display_order);

-- 学习进度
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_learning_progress_composite ON learning_progress(user_id, course_id, lesson_id);

-- 提交记录
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_submissions_user_time ON submissions(user_id, submitted_at DESC);

-- 作品查询
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_projects_public_published ON projects(is_public, published_at DESC) WHERE is_public = TRUE;
```

---

## 七、数据迁移脚本

### 7.1 初始数据填充

```sql
-- 插入示例课程
INSERT INTO courses (title, slug, level_number, difficulty, description) VALUES
('HTML5 基础', 'html5-basics', 1, 'beginner', '学习 HTML5 的基础标签和结构'),
('CSS 样式入门', 'css-basics', 2, 'beginner', '掌握 CSS 的基本样式和布局'),
('JavaScript 基础', 'javascript-basics', 3, 'intermediate', '学习 JavaScript 的核心语法');

-- 插入成就
INSERT INTO achievements (title, description, category, unlock_criteria) VALUES
('第一行代码', '完成第一个编程任务', 'learning', '{"type": "tasks_completed", "target": 1}'),
('初学乍练', '完成 10 个任务', 'learning', '{"type": "tasks_completed", "target": 10}'),
('HTML 大师', '完成所有 HTML 课程', 'completion', '{"type": "course_completed", "course_id": "html5-basics"}');
```

---

**文档维护**: 随数据库演进持续更新  
**最后更新**: 2025-10-14  
**负责人**: AI Development Team

