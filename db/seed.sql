-- 种子数据 - 北信科 GameCode Lab 演示数据
-- 测试账号统一密码: Bistu@2026 (bcrypt hash)

-- 清空旧数据（开发环境）
TRUNCATE user_achievements, user_progress, user_projects, leaderboard, profiles, users, tasks, lessons, courses, achievements RESTART IDENTITY CASCADE;

-- 插入示例课程（北信科主题）
INSERT INTO courses (title, description, difficulty_level, order_index, icon, color, estimated_time_minutes) VALUES
('HTML基础', '为北信科大学生打造的网页结构入门，创建你的第一个校园介绍页', 1, 1, '📄', 'blue', 120),
('CSS样式', '掌握CSS样式，用信科蓝主题美化你的网页', 1, 2, '🎨', 'purple', 180),
('JavaScript入门', '学习编程基础，为校园应用添加交互功能', 2, 3, '⚡', 'yellow', 240),
('响应式设计', '学习创建适配手机、平板、电脑的响应式校园页面', 3, 4, '📱', 'green', 200),
('JavaScript进阶', '深入学习JS高级特性，完成信科主题综合项目', 4, 5, '🚀', 'red', 300);

-- 插入示例章节
INSERT INTO lessons (course_id, title, description, order_index, lesson_type) VALUES
(1, '认识HTML', '了解HTML在北信科校园网站中的作用', 1, 'tutorial'),
(1, '常用HTML标签', '学习段落、标题、链接等常用标签', 2, 'tutorial'),
(1, '列表和表格', '创建课表、社团列表等结构化内容', 3, 'tutorial'),
(2, 'CSS选择器', '学习如何选中HTML元素', 1, 'tutorial'),
(2, '信科蓝主题色', '使用北信科标准色设置页面样式', 2, 'tutorial'),
(2, '盒模型', '理解元素的边距、边框和内边距', 3, 'tutorial');

-- 插入示例任务
INSERT INTO tasks (lesson_id, title, description, instructions, starter_code, xp_reward, coin_reward, difficulty, order_index) VALUES
(1, '创建北信科校园介绍页', '使用基本标签创建一个简单的HTML页面',
'创建一个包含标题和段落的HTML页面。\n1. 使用<h1>标签创建标题"欢迎来到北京信息科技大学"\n2. 使用<p>标签添加校训"勤以为学，信以立身"',
'<!DOCTYPE html>\n<html>\n<head>\n  <title>北信科校园介绍</title>\n</head>\n<body>\n  <!-- 在这里编写代码 -->\n</body>\n</html>',
10, 5, 'easy', 1),

(2, '使用不同的标题标签', '练习使用h1到h6标签创建页面层级',
'创建一个包含不同级别标题的页面。\n使用h1、h2、h3标签创建"北京信息科技大学"页面标题层级。',
'<!DOCTYPE html>\n<html>\n<body>\n  <!-- 添加不同级别的标题 -->\n</body>\n</html>',
15, 8, 'easy', 1),

(5, '实现信科蓝主题导航栏', '使用CSS选择器改变文字颜色',
'为页面中的标题和段落添加北信科主题色。\n1. 使标题为信科蓝(#0066B3)\n2. 使段落为灰色',
'<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* 在这里编写CSS */\n</style>\n</head>\n<body>\n  <h1>北京信息科技大学</h1>\n  <p>勤以为学，信以立身</p>\n</body>\n</html>',
20, 10, 'easy', 1);

-- 插入成就定义
INSERT INTO achievements (title, description, icon, category, requirement_type, requirement_value, xp_reward, coin_reward) VALUES
('信科新星', '完成第一个编程任务', '🌱', 'progress', 'tasks_completed', 1, 50, 20),
('勤学标兵', '完成10个任务', '💻', 'progress', 'tasks_completed', 10, 100, 50),
('编程达人', '完成50个任务', '🚀', 'progress', 'tasks_completed', 50, 500, 200),
('连续学习者', '连续学习7天', '🔥', 'streak', 'streak_days', 7, 200, 100),
('分享者', '分享第一个作品', '🎨', 'social', 'projects_shared', 1, 100, 50),
('信科之星', '作品获得100个赞', '⭐', 'social', 'total_likes', 100, 1000, 500),
('速度之星', '在30秒内完成一个任务', '⚡', 'skill', 'fast_completion', 1, 150, 75),
('完美主义者', '连续5个任务满分通过', '💎', 'skill', 'perfect_streak', 5, 300, 150);

-- 插入测试用户 (密码: Bistu@2026)
INSERT INTO users (email, username, display_name, password_hash, role, is_guest) VALUES
('student@bistu.edu.cn', 'zhang_xinke', '张信科', '$2b$10$uAnrGLcA8hq9YtXHXGZfzekE8TztBPrPEiMEHldzefrwh9wlI8m4O', 'student', false),
('teacher@bistu.edu.cn', 'li_teacher', '李老师', '$2b$10$uAnrGLcA8hq9YtXHXGZfzekE8TztBPrPEiMEHldzefrwh9wlI8m4O', 'teacher', false),
('admin@bistu.edu.cn', 'admin_bistu', '系统管理员', '$2b$10$uAnrGLcA8hq9YtXHXGZfzekE8TztBPrPEiMEHldzefrwh9wlI8m4O', 'admin', false),
('guest@bistu.edu.cn', 'guest_bistu', '游客体验', '$2b$10$uAnrGLcA8hq9YtXHXGZfzekE8TztBPrPEiMEHldzefrwh9wlI8m4O', 'guest', true);

-- 为测试用户创建 profile
INSERT INTO profiles (user_id, level, xp, coins, total_tasks_completed, streak_days, bio) VALUES
(1, 3, 350, 120, 5, 3, '计算机学院 · 软件工程专业 · 信科编程爱好者'),
(2, 5, 1200, 400, 20, 15, '计算机学院 · 程序设计课程教师'),
(3, 1, 0, 0, 0, 0, 'GameCode Lab 系统管理员'),
(4, 1, 50, 20, 1, 1, '游客试用账号 · 免费体验30天');

-- 学生学习进度
INSERT INTO user_progress (user_id, task_id, status, code, score, completed_at) VALUES
(1, 1, 'completed', '<html>...</html>', 100, CURRENT_TIMESTAMP - INTERVAL '2 days'),
(1, 2, 'completed', '<html>...</html>', 90, CURRENT_TIMESTAMP - INTERVAL '1 day'),
(4, 1, 'completed', '<html>...</html>', 80, CURRENT_TIMESTAMP);

-- 用户成就
INSERT INTO user_achievements (user_id, achievement_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(4, 1);

-- 示例作品
INSERT INTO user_projects (user_id, title, description, html_code, css_code, js_code, is_public, likes_count, views_count) VALUES
(1, '北信科课表查询', '为信科大学生打造的简易课表查询页面', '<div class="schedule">...</div>', '.schedule { color: #0066B3; }', 'console.log("课表加载");', true, 42, 156),
(1, '社团招新海报', '计算机协会招新宣传页', '<div class="poster">...</div>', '.poster { background: #0066B3; }', '', true, 28, 89),
(2, '信科蓝导航组件', '符合北信科VI规范的导航栏组件', '<nav>...</nav>', 'nav { background: #0066B3; }', '', true, 65, 230);

-- 排行榜
INSERT INTO leaderboard (user_id, total_xp, total_tasks, total_projects, rank, period) VALUES
(2, 1200, 20, 1, 1, 'all_time'),
(1, 350, 5, 2, 2, 'all_time'),
(4, 50, 1, 0, 3, 'all_time'),
(3, 0, 0, 0, 4, 'all_time');
