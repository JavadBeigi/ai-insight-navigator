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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
