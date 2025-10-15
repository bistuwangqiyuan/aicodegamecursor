-- GameCode Lab 初始数据
-- 版本: V1.0
-- 创建日期: 2025-10-14

-- ==========================================
-- 1. 课程数据
-- ==========================================

-- Level 1: HTML5 基础
INSERT INTO courses (title, slug, level_number, difficulty, description, display_order, is_published, unlock_level, completion_xp, completion_coins) VALUES
('HTML5 基础', 'html5-basics', 1, 'beginner', '学习 HTML5 的基础标签和结构，掌握网页构建的基本技能', 1, TRUE, 1, 200, 100);

-- Level 2: CSS 样式
INSERT INTO courses (title, slug, level_number, difficulty, description, display_order, is_published, unlock_level, completion_xp, completion_coins) VALUES
('CSS 样式入门', 'css-basics', 2, 'beginner', '掌握 CSS 的基本样式和布局技巧，让网页更加美观', 2, TRUE, 2, 240, 120);

-- Level 3: JavaScript 基础
INSERT INTO courses (title, slug, level_number, difficulty, description, display_order, is_published, unlock_level, completion_xp, completion_coins) VALUES
('JavaScript 基础', 'javascript-basics', 3, 'intermediate', '学习 JavaScript 的核心语法和编程概念', 3, TRUE, 3, 300, 150);

-- Level 4: DOM 操作
INSERT INTO courses (title, slug, level_number, difficulty, description, display_order, is_published, unlock_level, completion_xp, completion_coins) VALUES
('DOM 操作与交互', 'dom-manipulation', 4, 'intermediate', '学习操作网页元素，实现动态交互效果', 4, TRUE, 4, 200, 100);

-- Level 5: 综合实战
INSERT INTO courses (title, slug, level_number, difficulty, description, display_order, is_published, unlock_level, completion_xp, completion_coins) VALUES
('综合项目实战', 'final-projects', 5, 'advanced', '通过完整项目，综合运用所学技能', 5, TRUE, 5, 400, 200);

-- ==========================================
-- 2. 课时数据（示例：HTML5 基础课程）
-- ==========================================

-- 获取 HTML5 课程 ID
DO $$
DECLARE
  v_html_course_id UUID;
BEGIN
  SELECT id INTO v_html_course_id FROM courses WHERE slug = 'html5-basics';
  
  -- 第 1 课：认识 HTML 标签
  INSERT INTO lessons (course_id, title, slug, description, content_type, estimated_minutes, completion_xp, display_order) VALUES
  (v_html_course_id, '认识 HTML 标签', 'understanding-html-tags', '了解 HTML 的基本结构和常用标签', 'text', 15, 20, 1);
  
  -- 第 2 课：文本与段落
  INSERT INTO lessons (course_id, title, slug, description, content_type, estimated_minutes, completion_xp, display_order) VALUES
  (v_html_course_id, '文本与段落', 'text-and-paragraphs', '学习如何使用文本标签和段落标签', 'text', 15, 20, 2);
  
  -- 第 3 课：链接与图片
  INSERT INTO lessons (course_id, title, slug, description, content_type, estimated_minutes, completion_xp, display_order) VALUES
  (v_html_course_id, '链接与图片', 'links-and-images', '学习如何添加超链接和图片', 'text', 20, 20, 3);
  
  -- 第 4 课：列表
  INSERT INTO lessons (course_id, title, slug, description, content_type, estimated_minutes, completion_xp, display_order) VALUES
  (v_html_course_id, '列表', 'lists', '学习有序列表和无序列表的使用', 'text', 15, 20, 4);
  
  -- 第 5 课：表格
  INSERT INTO lessons (course_id, title, slug, description, content_type, estimated_minutes, completion_xp, display_order) VALUES
  (v_html_course_id, '表格', 'tables', '学习如何创建和美化表格', 'text', 20, 20, 5);
END $$;

-- ==========================================
-- 3. 任务数据（示例：第一课的任务）
-- ==========================================

DO $$
DECLARE
  v_lesson_id UUID;
BEGIN
  SELECT id INTO v_lesson_id FROM lessons WHERE slug = 'understanding-html-tags' LIMIT 1;
  
  -- 任务 1：创建第一个 HTML 页面
  INSERT INTO tasks (
    lesson_id,
    title,
    description,
    task_type,
    question,
    initial_code,
    solution_code,
    hints,
    passing_score,
    max_score,
    xp_reward,
    coin_reward,
    difficulty,
    display_order
  ) VALUES (
    v_lesson_id,
    '创建第一个 HTML 页面',
    '使用基本的 HTML 标签创建一个简单的网页',
    'practice',
    '请创建一个包含标题、段落和一个链接的 HTML 页面',
    '{"html": "<!DOCTYPE html>\n<html>\n<head>\n  <title>我的第一个网页</title>\n</head>\n<body>\n  <!-- 在这里编写代码 -->\n</body>\n</html>", "css": "", "js": ""}',
    '{"html": "<!DOCTYPE html>\n<html>\n<head>\n  <title>我的第一个网页</title>\n</head>\n<body>\n  <h1>欢迎来到我的网页</h1>\n  <p>这是我的第一个 HTML 页面</p>\n  <a href=\"https://www.example.com\">点击访问示例网站</a>\n</body>\n</html>", "css": "", "js": ""}',
    '["使用 <h1> 标签创建标题", "使用 <p> 标签创建段落", "使用 <a> 标签创建链接"]',
    60,
    100,
    20,
    10,
    1,
    1
  );
  
  -- 任务 2：选择题 - HTML 基础知识
  INSERT INTO tasks (
    lesson_id,
    title,
    description,
    task_type,
    question,
    test_cases,
    passing_score,
    max_score,
    xp_reward,
    coin_reward,
    difficulty,
    display_order
  ) VALUES (
    v_lesson_id,
    'HTML 基础知识测试',
    '测试你对 HTML 基础知识的理解',
    'choice',
    '以下哪个标签用于创建网页的标题？',
    '{"options": ["<title>", "<head>", "<h1>", "<header>"], "correct": 2}',
    100,
    100,
    10,
    5,
    1,
    2
  );
END $$;

-- ==========================================
-- 4. 成就数据
-- ==========================================

-- 学习里程碑成就
INSERT INTO achievements (title, description, category, unlock_criteria, xp_reward, coin_reward, badge_tier, rarity, display_order) VALUES
('第一行代码', '完成第一个编程任务', 'learning', '{"type": "tasks_completed", "target": 1}', 50, 20, 'bronze', 'common', 1),
('初学乍练', '完成 10 个任务', 'learning', '{"type": "tasks_completed", "target": 10}', 100, 50, 'bronze', 'common', 2),
('学有所成', '完成 50 个任务', 'learning', '{"type": "tasks_completed", "target": 50}', 200, 100, 'silver', 'rare', 3),
('学富五车', '完成 100 个任务', 'learning', '{"type": "tasks_completed", "target": 100}', 500, 250, 'gold', 'epic', 4);

-- 完成度成就
INSERT INTO achievements (title, description, category, unlock_criteria, xp_reward, coin_reward, badge_tier, rarity, display_order) VALUES
('HTML 大师', '完成所有 HTML 课程', 'completion', '{"type": "course_completed", "course_slug": "html5-basics"}', 300, 150, 'gold', 'epic', 10),
('CSS 专家', '完成所有 CSS 课程', 'completion', '{"type": "course_completed", "course_slug": "css-basics"}', 300, 150, 'gold', 'epic', 11),
('JS 高手', '完成所有 JavaScript 课程', 'completion', '{"type": "course_completed", "course_slug": "javascript-basics"}', 300, 150, 'gold', 'epic', 12),
('全栈新星', '完成所有课程', 'completion', '{"type": "courses_completed", "target": 5}', 1000, 500, 'platinum', 'legendary', 13);

-- 质量成就
INSERT INTO achievements (title, description, category, unlock_criteria, xp_reward, coin_reward, badge_tier, rarity, display_order) VALUES
('一次通过', '首次提交即通过任务', 'quality', '{"type": "first_try_pass", "target": 1}', 100, 50, 'silver', 'rare', 20),
('完美主义者', '连续 10 次满分通过', 'quality', '{"type": "perfect_streak", "target": 10}', 500, 250, 'gold', 'epic', 21),
('代码整洁', '获得 AI 代码质量 A 级评价', 'quality', '{"type": "code_quality", "grade": "A"}', 200, 100, 'silver', 'rare', 22);

-- 时间成就
INSERT INTO achievements (title, description, category, unlock_criteria, xp_reward, coin_reward, badge_tier, rarity, display_order) VALUES
('坚持不懈', '连续学习 7 天', 'time', '{"type": "streak_days", "target": 7}', 200, 100, 'bronze', 'common', 30),
('学习狂人', '连续学习 30 天', 'time', '{"type": "streak_days", "target": 30}', 1000, 500, 'platinum', 'legendary', 31);

-- 社交成就
INSERT INTO achievements (title, description, category, unlock_criteria, xp_reward, coin_reward, badge_tier, rarity, display_order) VALUES
('初露锋芒', '发布第一个作品', 'social', '{"type": "projects_count", "target": 1}', 100, 50, 'bronze', 'common', 40),
('人气之星', '作品获得 100 个赞', 'social', '{"type": "project_likes", "target": 100}', 500, 250, 'gold', 'epic', 41),
('导师之光', '帮助 10 个其他用户', 'social', '{"type": "help_count", "target": 10}', 300, 150, 'silver', 'rare', 42);

-- ==========================================
-- 5. 示例用户数据（测试用）
-- ==========================================

-- 注意：实际用户会通过 Supabase Auth 注册
-- 这里只是创建一些示例数据用于开发测试

-- ==========================================
-- 完成
-- ==========================================

-- 更新课程统计
UPDATE courses SET 
  lessons_count = (SELECT COUNT(*) FROM lessons WHERE lessons.course_id = courses.id),
  tasks_count = (
    SELECT COUNT(*)
    FROM tasks t
    JOIN lessons l ON t.lesson_id = l.id
    WHERE l.course_id = courses.id
  );

-- 更新课时统计
UPDATE lessons SET
  tasks_count = (SELECT COUNT(*) FROM tasks WHERE tasks.lesson_id = lessons.id);

SELECT 'Seed data inserted successfully!' as message;

