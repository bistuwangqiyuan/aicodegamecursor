/**
 * Supabase 数据库类型定义
 * 此文件通常由 `supabase gen types typescript` 命令生成
 * 这里提供一个基础版本
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          user_type: 'guest' | 'student' | 'teacher' | 'admin';
          is_guest: boolean;
          guest_expires_at: string | null;
          level: number;
          total_xp: number;
          coins: number;
          current_streak: number;
          longest_streak: number;
          total_learning_time: number;
          courses_completed: number;
          tasks_completed: number;
          projects_count: number;
          followers_count: number;
          following_count: number;
          likes_received: number;
          created_at: string;
          updated_at: string;
          last_login_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      courses: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string | null;
          cover_image: string | null;
          level_number: number;
          difficulty: 'beginner' | 'intermediate' | 'advanced';
          estimated_hours: number | null;
          lessons_count: number;
          tasks_count: number;
          completion_xp: number;
          completion_coins: number;
          display_order: number;
          is_published: boolean;
          is_locked: boolean;
          unlock_level: number;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['courses']['Insert']>;
      };
      lessons: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          slug: string;
          description: string | null;
          content_type: 'text' | 'video' | 'interactive';
          content: Json | null;
          video_url: string | null;
          estimated_minutes: number;
          tasks_count: number;
          completion_xp: number;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['lessons']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['lessons']['Insert']>;
      };
      tasks: {
        Row: {
          id: string;
          lesson_id: string;
          title: string;
          description: string | null;
          task_type: 'choice' | 'fill' | 'practice' | 'challenge' | 'project';
          question: string | null;
          initial_code: Json | null;
          solution_code: Json | null;
          hints: Json | null;
          test_cases: Json | null;
          passing_score: number;
          max_score: number;
          xp_reward: number;
          coin_reward: number;
          difficulty: number;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tasks']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['tasks']['Insert']>;
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          thumbnail_url: string | null;
          html_code: string | null;
          css_code: string | null;
          js_code: string | null;
          tags: string[] | null;
          views_count: number;
          likes_count: number;
          comments_count: number;
          forks_count: number;
          forked_from: string | null;
          is_public: boolean;
          is_featured: boolean;
          ai_rating: number | null;
          ai_review: string | null;
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      // 其他表可以按需添加...
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      check_guest_expiry: {
        Args: Record<string, never>;
        Returns: {
          user_id: string;
          username: string;
          expires_in_days: number;
          is_expired: boolean;
        }[];
      };
      get_user_learning_stats: {
        Args: { p_user_id: string };
        Returns: {
          total_courses: number;
          completed_courses: number;
          total_lessons: number;
          completed_lessons: number;
          total_tasks: number;
          completed_tasks: number;
          total_xp: number;
          current_level: number;
          current_streak: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

