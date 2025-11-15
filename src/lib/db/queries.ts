import { sql } from '@vercel/postgres';

export async function getDb() {
  return sql;
}

// 用户相关
export async function createUser(email: string, username: string, passwordHash: string) {
  const result = await sql`
    INSERT INTO users (email, username, password_hash)
    VALUES (${email}, ${username}, ${passwordHash})
    RETURNING *
  `;
  return result.rows[0];
}

export async function getUserByEmail(email: string) {
  const result = await sql`
    SELECT * FROM users WHERE email = ${email} LIMIT 1
  `;
  return result.rows[0];
}

export async function getUserById(id: number) {
  const result = await sql`
    SELECT u.*, p.* 
    FROM users u
    LEFT JOIN profiles p ON u.id = p.user_id
    WHERE u.id = ${id}
    LIMIT 1
  `;
  return result.rows[0];
}

// 课程相关
export async function getAllCourses() {
  const result = await sql`
    SELECT * FROM courses 
    WHERE is_published = true
    ORDER BY order_index ASC
  `;
  return result.rows;
}

export async function getCourseById(id: number) {
  const result = await sql`
    SELECT * FROM courses WHERE id = ${id} LIMIT 1
  `;
  return result.rows[0];
}

export async function getLessonsByCourseId(courseId: number) {
  const result = await sql`
    SELECT * FROM lessons 
    WHERE course_id = ${courseId}
    ORDER BY order_index ASC
  `;
  return result.rows;
}

export async function getTasksByLessonId(lessonId: number) {
  const result = await sql`
    SELECT * FROM tasks 
    WHERE lesson_id = ${lessonId}
    ORDER BY order_index ASC
  `;
  return result.rows;
}

// 用户进度相关
export async function getUserProgress(userId: number, taskId: number) {
  const result = await sql`
    SELECT * FROM user_progress 
    WHERE user_id = ${userId} AND task_id = ${taskId}
    LIMIT 1
  `;
  return result.rows[0];
}

export async function updateUserProgress(
  userId: number,
  taskId: number,
  status: string,
  code: string,
  score?: number
) {
  const result = await sql`
    INSERT INTO user_progress (user_id, task_id, status, code, score, attempts)
    VALUES (${userId}, ${taskId}, ${status}, ${code}, ${score || 0}, 1)
    ON CONFLICT (user_id, task_id) 
    DO UPDATE SET 
      status = ${status},
      code = ${code},
      score = ${score || 0},
      attempts = user_progress.attempts + 1,
      completed_at = CASE WHEN ${status} = 'completed' THEN CURRENT_TIMESTAMP ELSE user_progress.completed_at END,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `;
  return result.rows[0];
}

// 成就相关
export async function getAllAchievements() {
  const result = await sql`
    SELECT * FROM achievements 
    ORDER BY requirement_value ASC
  `;
  return result.rows;
}

export async function getUserAchievements(userId: number) {
  const result = await sql`
    SELECT a.*, ua.earned_at
    FROM achievements a
    INNER JOIN user_achievements ua ON a.id = ua.achievement_id
    WHERE ua.user_id = ${userId}
    ORDER BY ua.earned_at DESC
  `;
  return result.rows;
}

export async function grantAchievement(userId: number, achievementId: number) {
  const result = await sql`
    INSERT INTO user_achievements (user_id, achievement_id)
    VALUES (${userId}, ${achievementId})
    ON CONFLICT (user_id, achievement_id) DO NOTHING
    RETURNING *
  `;
  return result.rows[0];
}

// 项目相关
export async function getUserProjects(userId: number) {
  const result = await sql`
    SELECT * FROM user_projects 
    WHERE user_id = ${userId}
    ORDER BY updated_at DESC
  `;
  return result.rows;
}

export async function getPublicProjects(limit: number = 20, offset: number = 0) {
  const result = await sql`
    SELECT up.*, u.username, u.display_name, u.avatar_url
    FROM user_projects up
    INNER JOIN users u ON up.user_id = u.id
    WHERE up.is_public = true
    ORDER BY up.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;
  return result.rows;
}

export async function createProject(
  userId: number,
  title: string,
  description: string,
  htmlCode: string,
  cssCode: string,
  jsCode: string,
  isPublic: boolean = false
) {
  const result = await sql`
    INSERT INTO user_projects (user_id, title, description, html_code, css_code, js_code, is_public)
    VALUES (${userId}, ${title}, ${description}, ${htmlCode}, ${cssCode}, ${jsCode}, ${isPublic})
    RETURNING *
  `;
  return result.rows[0];
}

// 排行榜相关
export async function getLeaderboard(period: string = 'all_time', limit: number = 100) {
  const result = await sql`
    SELECT l.*, u.username, u.display_name, u.avatar_url, p.level
    FROM leaderboard l
    INNER JOIN users u ON l.user_id = u.id
    INNER JOIN profiles p ON l.user_id = p.user_id
    WHERE l.period = ${period}
    ORDER BY l.rank ASC
    LIMIT ${limit}
  `;
  return result.rows;
}

export async function updateLeaderboard(userId: number, totalXp: number, totalTasks: number) {
  const result = await sql`
    INSERT INTO leaderboard (user_id, total_xp, total_tasks, period)
    VALUES (${userId}, ${totalXp}, ${totalTasks}, 'all_time')
    ON CONFLICT (user_id, period)
    DO UPDATE SET
      total_xp = ${totalXp},
      total_tasks = ${totalTasks},
      updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `;
  return result.rows[0];
}

