-- 种子数据 - 课程和成就

-- 插入示例课程
INSERT INTO courses (title, description, difficulty_level, order_index, icon, color, estimated_time_minutes) VALUES
('HTML基础', '学习HTML的基本标签和结构，创建你的第一个网页', 1, 1, '📄', 'blue', 120),
('CSS样式', '掌握CSS样式，让你的网页变得美观', 1, 2, '🎨', 'purple', 180),
('JavaScript入门', '学习编程基础，为网页添加交互功能', 2, 3, '⚡', 'yellow', 240),
('响应式设计', '学习创建适配各种设备的网页', 3, 4, '📱', 'green', 200),
('JavaScript进阶', '深入学习JS高级特性和最佳实践', 4, 5, '🚀', 'red', 300);

-- 插入示例章节
INSERT INTO lessons (course_id, title, description, order_index, lesson_type) VALUES
(1, '认识HTML', '了解HTML的作用和基本结构', 1, 'tutorial'),
(1, '常用HTML标签', '学习段落、标题、链接等常用标签', 2, 'tutorial'),
(1, '列表和表格', '创建有序列表、无序列表和表格', 3, 'tutorial'),
(2, 'CSS选择器', '学习如何选中HTML元素', 1, 'tutorial'),
(2, '颜色和字体', '设置文字和背景的样式', 2, 'tutorial'),
(2, '盒模型', '理解元素的边距、边框和内边距', 3, 'tutorial');

-- 插入示例任务
INSERT INTO tasks (lesson_id, title, description, instructions, starter_code, xp_reward, coin_reward, difficulty, order_index) VALUES
(1, '创建第一个HTML页面', '使用基本标签创建一个简单的HTML页面', 
'创建一个包含标题和段落的HTML页面。\n1. 使用<h1>标签创建标题"欢迎来到GameCode Lab"\n2. 使用<p>标签添加一段介绍文字', 
'<!DOCTYPE html>\n<html>\n<head>\n  <title>我的第一个页面</title>\n</head>\n<body>\n  <!-- 在这里编写代码 -->\n</body>\n</html>',
10, 5, 'easy', 1),

(2, '使用不同的标题标签', '练习使用h1到h6标签', 
'创建一个包含不同级别标题的页面。\n使用h1、h2、h3标签创建标题层级。',
'<!DOCTYPE html>\n<html>\n<body>\n  <!-- 添加不同级别的标题 -->\n</body>\n</html>',
15, 8, 'easy', 1),

(4, '选中元素并改变颜色', '使用CSS选择器改变文字颜色',
'为页面中的标题和段落添加颜色。\n1. 使标题为蓝色\n2. 使段落为灰色',
'<!DOCTYPE html>\n<html>\n<head>\n<style>\n  /* 在这里编写CSS */\n</style>\n</head>\n<body>\n  <h1>这是标题</h1>\n  <p>这是段落</p>\n</body>\n</html>',
20, 10, 'easy', 1);

-- 插入成就定义
INSERT INTO achievements (title, description, icon, category, requirement_type, requirement_value, xp_reward, coin_reward) VALUES
('初学者', '完成第一个任务', '🌱', 'progress', 'tasks_completed', 1, 50, 20),
('代码新手', '完成10个任务', '💻', 'progress', 'tasks_completed', 10, 100, 50),
('编程达人', '完成50个任务', '🚀', 'progress', 'tasks_completed', 50, 500, 200),
('连续学习者', '连续学习7天', '🔥', 'streak', 'streak_days', 7, 200, 100),
('分享者', '分享第一个作品', '🎨', 'social', 'projects_shared', 1, 100, 50),
('人气王', '作品获得100个赞', '⭐', 'social', 'total_likes', 100, 1000, 500),
('速度之星', '在30秒内完成一个任务', '⚡', 'skill', 'fast_completion', 1, 150, 75),
('完美主义者', '连续5个任务满分通过', '💎', 'skill', 'perfect_streak', 5, 300, 150);

-- 插入测试用户
INSERT INTO users (email, username, display_name, role, is_guest) VALUES
('demo@gamecodelab.com', 'demo_user', 'Demo User', 'user', false),
('guest@example.com', 'guest_001', 'Guest User', 'user', true);

-- 为测试用户创建profile
INSERT INTO profiles (user_id, level, xp, coins) VALUES
(1, 1, 0, 0),
(2, 1, 0, 0);

