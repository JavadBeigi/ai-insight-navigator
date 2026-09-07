export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: { user_id: string; created_at: string };
        Insert: { user_id: string; created_at?: string };
        Update: { user_id?: string; created_at?: string };
        Relationships: [];
      };
      demo_requests: {
        Row: {
          id: number;
          phone: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: never;
          phone: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: never;
          phone?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      articles: {
        Row: {
          id: number;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          status: string;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: never;
          slug: string;
          title: string;
          excerpt?: string;
          content: string;
          status?: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: never;
          slug?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          status?: string;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      blog_comments: {
        Row: {
          id: number;
          article_id: number;
          author_name: string;
          email: string | null;
          body: string;
          status: string;
          website: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: never;
          article_id: number;
          author_name: string;
          email?: string | null;
          body: string;
          status?: string;
          website?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: never;
          article_id?: number;
          author_name?: string;
          email?: string | null;
          body?: string;
          status?: string;
          website?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blog_comments_article_id_fkey";
            columns: ["article_id"];
            isOneToOne: false;
            referencedRelation: "articles";
            referencedColumns: ["id"];
          },
        ];
      };
      ai_maturity_assessments: {
        Row: {
          id: number; access_token: string; organization: string; industry: string;
          respondent_role: string; phone: string; answers: Record<string, number>;
          dimension_scores: Array<{ id: string; label: string; score: number }>;
          overall_score: number; maturity_level: number; status: string;
          full_report_unlocked: boolean; payment_confirmed_at: string | null;
          created_at: string; updated_at: string;
        };
        Insert: {
          id?: never; access_token: string; organization: string; industry: string;
          respondent_role: string; phone: string; answers: Record<string, number>;
          dimension_scores: Array<{ id: string; label: string; score: number }>;
          overall_score: number; maturity_level: number; status?: string;
          full_report_unlocked?: boolean; payment_confirmed_at?: string | null;
          created_at?: string; updated_at?: string;
        };
        Update: {
          id?: never; status?: string; full_report_unlocked?: boolean;
          payment_confirmed_at?: string | null; updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      request_ai_maturity_report: {
        Args: { p_access_token: string };
        Returns: boolean;
      };
      get_ai_maturity_assessment: {
        Args: { p_access_token: string };
        Returns: {
          organization: string; industry: string; respondent_role: string; phone: string;
          answers: Record<string, number>; status: string; full_report_unlocked: boolean;
        } | null;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
