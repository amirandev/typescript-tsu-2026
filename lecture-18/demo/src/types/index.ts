export interface User {
  id: number
  name: string
  email: string
}

export interface Post {
  id: number
  user_id: number
  title: string
  body: string
  likes_count: number
  comments_count: number
  shares_count: number
  is_liked: boolean
  user?: Pick<User, 'id' | 'name'>
}

export interface Comment {
  id: number
  user_id: number
  post_id: number
  body: string
  user?: Pick<User, 'id' | 'name'>
}

export interface PaginatedResponse<T> {
  current_page: number
  data: T[]
  last_page: number
  per_page: number
  total: number
}

export interface AuthResponse {
  message: string
  user: User
  token: string
}

export interface LikeToggleResponse {
  liked: boolean
  likes_count: number
}
