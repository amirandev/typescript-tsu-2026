export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  is_friend?: boolean;
  friend_request_sent?: boolean;
  friend_request_received?: boolean;
  posts_count?: number;
  friends_count?: number;
}

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  is_liked: boolean;
  user?: Pick<User, 'id' | 'name'>;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  user_id: number;
  post_id: number;
  body: string;
  created_at: string;
  updated_at: string;
  user?: Pick<User, 'id' | 'name'>;
}

export interface Friendship {
  id: number;
  sender_id: number;
  receiver_id: number;
  status: 'pending' | 'accepted' | 'blocked';
  created_at: string;
  updated_at: string;
  sender?: Pick<User, 'id' | 'name' | 'email'>;
  receiver?: Pick<User, 'id' | 'name' | 'email'>;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: { url: string | null; label: string; active: boolean }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface LikeToggleResponse {
  liked: boolean;
  likes_count: number;
}

export interface ShareCountResponse {
  shares_count: number;
}

export interface MessageResponse {
  message: string;
}
