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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
