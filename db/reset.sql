-- Reset GameCode Lab schema before migrate (handles legacy UUID tables from Neon/Supabase)
DROP TABLE IF EXISTS
  feedback,
  user_achievements,
  user_progress,
  user_projects,
  leaderboard,
  profiles,
  tasks,
  lessons,
  courses,
  achievements,
  users
CASCADE;

DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
