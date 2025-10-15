-- GameCode Lab 数据库函数和触发器
-- 版本: V1.0
-- 创建日期: 2025-10-14

-- ==========================================
-- 1. 自动更新 updated_at 字段
-- ==========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 应用到相关表
CREATE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_lessons_updated_at
  BEFORE UPDATE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 2. 自动更新用户等级
-- ==========================================

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

-- ==========================================
-- 3. 更新项目点赞数
-- ==========================================

CREATE OR REPLACE FUNCTION update_project_likes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.target_type = 'project' THEN
      UPDATE projects
      SET likes_count = likes_count + 1
      WHERE id = NEW.target_id;
    ELSIF NEW.target_type = 'comment' THEN
      UPDATE comments
      SET likes_count = likes_count + 1
      WHERE id = NEW.target_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.target_type = 'project' THEN
      UPDATE projects
      SET likes_count = GREATEST(likes_count - 1, 0)
      WHERE id = OLD.target_id;
    ELSIF OLD.target_type = 'comment' THEN
      UPDATE comments
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
  EXECUTE FUNCTION update_project_likes();

-- ==========================================
-- 4. 更新关注者计数
-- ==========================================

CREATE OR REPLACE FUNCTION update_followers_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- 增加被关注者的粉丝数
    UPDATE profiles
    SET followers_count = followers_count + 1
    WHERE id = NEW.following_id;
    
    -- 增加关注者的关注数
    UPDATE profiles
    SET following_count = following_count + 1
    WHERE id = NEW.follower_id;
  ELSIF TG_OP = 'DELETE' THEN
    -- 减少被关注者的粉丝数
    UPDATE profiles
    SET followers_count = GREATEST(followers_count - 1, 0)
    WHERE id = OLD.following_id;
    
    -- 减少关注者的关注数
    UPDATE profiles
    SET following_count = GREATEST(following_count - 1, 0)
    WHERE id = OLD.follower_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_followers_count
  AFTER INSERT OR DELETE ON follows
  FOR EACH ROW
  EXECUTE FUNCTION update_followers_count();

-- ==========================================
-- 5. 更新课程统计
-- ==========================================

CREATE OR REPLACE FUNCTION update_course_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'DELETE' THEN
    -- 更新课程的课时数量
    UPDATE courses
    SET lessons_count = (
      SELECT COUNT(*)
      FROM lessons
      WHERE course_id = COALESCE(NEW.course_id, OLD.course_id)
    )
    WHERE id = COALESCE(NEW.course_id, OLD.course_id);
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_course_lessons_count
  AFTER INSERT OR DELETE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_course_stats();

-- ==========================================
-- 6. 更新课时任务数
-- ==========================================

CREATE OR REPLACE FUNCTION update_lesson_tasks_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'DELETE' THEN
    UPDATE lessons
    SET tasks_count = (
      SELECT COUNT(*)
      FROM tasks
      WHERE lesson_id = COALESCE(NEW.lesson_id, OLD.lesson_id)
    )
    WHERE id = COALESCE(NEW.lesson_id, OLD.lesson_id);
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_lesson_tasks_count
  AFTER INSERT OR DELETE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_lesson_tasks_count();

-- ==========================================
-- 7. 自动创建用户资料
-- ==========================================

CREATE OR REPLACE FUNCTION create_profile_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, display_name, user_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substring(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    'student'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_create_profile_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_profile_for_new_user();

-- ==========================================
-- 8. 检查游客试用期
-- ==========================================

CREATE OR REPLACE FUNCTION check_guest_expiry()
RETURNS TABLE (
  user_id UUID,
  username VARCHAR,
  expires_in_days INTEGER,
  is_expired BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id as user_id,
    p.username,
    EXTRACT(DAY FROM (p.guest_expires_at - NOW()))::INTEGER as expires_in_days,
    (p.guest_expires_at < NOW()) as is_expired
  FROM profiles p
  WHERE p.is_guest = TRUE;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- 9. 获取用户学习统计
-- ==========================================

CREATE OR REPLACE FUNCTION get_user_learning_stats(p_user_id UUID)
RETURNS TABLE (
  total_courses INTEGER,
  completed_courses INTEGER,
  total_lessons INTEGER,
  completed_lessons INTEGER,
  total_tasks INTEGER,
  completed_tasks INTEGER,
  total_xp INTEGER,
  current_level INTEGER,
  current_streak INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    -- 课程统计
    (SELECT COUNT(DISTINCT course_id) FROM learning_progress WHERE user_id = p_user_id)::INTEGER as total_courses,
    (SELECT COUNT(DISTINCT course_id) FROM learning_progress WHERE user_id = p_user_id AND status = 'completed')::INTEGER as completed_courses,
    
    -- 课时统计
    (SELECT COUNT(DISTINCT lesson_id) FROM learning_progress WHERE user_id = p_user_id AND lesson_id IS NOT NULL)::INTEGER as total_lessons,
    (SELECT COUNT(DISTINCT lesson_id) FROM learning_progress WHERE user_id = p_user_id AND lesson_id IS NOT NULL AND status = 'completed')::INTEGER as completed_lessons,
    
    -- 任务统计
    (SELECT COUNT(DISTINCT task_id) FROM submissions WHERE user_id = p_user_id)::INTEGER as total_tasks,
    (SELECT COUNT(DISTINCT task_id) FROM submissions WHERE user_id = p_user_id AND is_passed = TRUE)::INTEGER as completed_tasks,
    
    -- 用户属性
    p.total_xp,
    p.level,
    p.current_streak
  FROM profiles p
  WHERE p.id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- 10. 更新排行榜
-- ==========================================

CREATE OR REPLACE FUNCTION update_leaderboard_rankings()
RETURNS void AS $$
BEGIN
  -- 更新总经验值排行榜
  INSERT INTO leaderboard (user_id, board_type, period, score, rank, updated_at)
  SELECT
    id,
    'total_xp',
    'all_time',
    total_xp,
    ROW_NUMBER() OVER (ORDER BY total_xp DESC),
    NOW()
  FROM profiles
  WHERE is_guest = FALSE
  ON CONFLICT (user_id, board_type, period, period_start)
  DO UPDATE SET
    score = EXCLUDED.score,
    rank = EXCLUDED.rank,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- 11. 授予用户奖励
-- ==========================================

CREATE OR REPLACE FUNCTION grant_user_reward(
  p_user_id UUID,
  p_xp INTEGER DEFAULT 0,
  p_coins INTEGER DEFAULT 0,
  p_reason TEXT DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  -- 更新用户经验和金币
  UPDATE profiles
  SET
    total_xp = total_xp + p_xp,
    coins = coins + p_coins,
    updated_at = NOW()
  WHERE id = p_user_id;
  
  -- 记录每日统计
  INSERT INTO user_stats (user_id, stat_date, xp_gained)
  VALUES (p_user_id, CURRENT_DATE, p_xp)
  ON CONFLICT (user_id, stat_date)
  DO UPDATE SET
    xp_gained = user_stats.xp_gained + p_xp;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- 12. 检查成就解锁
-- ==========================================

CREATE OR REPLACE FUNCTION check_achievement_unlock(
  p_user_id UUID,
  p_achievement_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_criteria JSONB;
  v_criteria_type TEXT;
  v_criteria_target INTEGER;
  v_user_progress INTEGER;
BEGIN
  -- 获取成就条件
  SELECT unlock_criteria INTO v_criteria
  FROM achievements
  WHERE id = p_achievement_id;
  
  v_criteria_type := v_criteria->>'type';
  v_criteria_target := (v_criteria->>'target')::INTEGER;
  
  -- 根据不同类型检查进度
  CASE v_criteria_type
    WHEN 'tasks_completed' THEN
      SELECT tasks_completed INTO v_user_progress FROM profiles WHERE id = p_user_id;
    WHEN 'courses_completed' THEN
      SELECT courses_completed INTO v_user_progress FROM profiles WHERE id = p_user_id;
    WHEN 'projects_count' THEN
      SELECT projects_count INTO v_user_progress FROM profiles WHERE id = p_user_id;
    ELSE
      RETURN FALSE;
  END CASE;
  
  -- 如果达成条件，解锁成就
  IF v_user_progress >= v_criteria_target THEN
    INSERT INTO user_achievements (user_id, achievement_id)
    VALUES (p_user_id, p_achievement_id)
    ON CONFLICT DO NOTHING;
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- 完成
-- ==========================================

COMMENT ON FUNCTION update_updated_at_column() IS '自动更新 updated_at 字段';
COMMENT ON FUNCTION update_user_level() IS '根据经验值自动更新用户等级';
COMMENT ON FUNCTION update_project_likes() IS '更新作品和评论的点赞数';
COMMENT ON FUNCTION update_followers_count() IS '更新用户关注者和关注数';
COMMENT ON FUNCTION check_guest_expiry() IS '检查游客试用期状态';
COMMENT ON FUNCTION get_user_learning_stats(UUID) IS '获取用户学习统计数据';
COMMENT ON FUNCTION update_leaderboard_rankings() IS '更新所有排行榜排名';
COMMENT ON FUNCTION grant_user_reward(UUID, INTEGER, INTEGER, TEXT) IS '授予用户经验和金币奖励';
COMMENT ON FUNCTION check_achievement_unlock(UUID, UUID) IS '检查并解锁用户成就';

