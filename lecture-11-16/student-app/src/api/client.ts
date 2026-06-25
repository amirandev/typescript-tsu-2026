import type {
  AuthResponse,
  Comment,
  Friendship,
  LikeToggleResponse,
  MessageResponse,
  PaginatedResponse,
  Post,
  ShareCountResponse,
  User,
} from '../types'

const BASE = 'https://courses.xrow.asia/api'

export function getToken(): string | null {
  return localStorage.getItem('api_token')
}

export function setToken(t: string) {
  localStorage.setItem('api_token', t)
}

export function clearToken() {
  localStorage.removeItem('api_token')
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { ...options, headers })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw { status: res.status, ...body }
  }

  return res.json()
}

export const auth = {
  login: (email: string, password: string) =>
    request<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    request<AuthResponse>('/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, password_confirmation: password }),
    }),

  me: () => request<User>('/me'),

  logout: () => request<MessageResponse>('/logout', { method: 'POST' }),

  changePassword: (current_password: string, new_password: string) =>
    request<MessageResponse>('/change-password', {
      method: 'POST',
      body: JSON.stringify({ current_password, new_password, new_password_confirmation: new_password }),
    }),
}

export const posts = {
  list: (page = 1) =>
    request<PaginatedResponse<Post>>(`/posts?page=${page}&per_page=15`),

  show: (id: number) => request<Post>(`/posts/${id}`),

  create: (data: { title: string; body: string }) =>
    request<{ message: string; post: Post }>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: { title?: string; body?: string }) =>
    request<{ message: string; post: Post }>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  destroy: (id: number) =>
    request<MessageResponse>(`/posts/${id}`, { method: 'DELETE' }),

  timeline: (page = 1) =>
    request<PaginatedResponse<Post>>(`/timeline?page=${page}`),
}

export const likes = {
  toggle: (postId: number) =>
    request<LikeToggleResponse>(`/posts/${postId}/toggle-like`, { method: 'POST' }),

  like: (postId: number) =>
    request<MessageResponse & { likes_count: number }>(`/posts/${postId}/like`, { method: 'POST' }),

  unlike: (postId: number) =>
    request<MessageResponse & { likes_count: number }>(`/posts/${postId}/like`, { method: 'DELETE' }),
}

export const comments = {
  list: (postId: number) =>
    request<PaginatedResponse<Comment>>(`/posts/${postId}/comments`),

  create: (postId: number, body: string) =>
    request<{ message: string; comment: Comment }>(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ body }),
    }),

  destroy: (postId: number, commentId: number) =>
    request<MessageResponse>(`/posts/${postId}/comments/${commentId}`, { method: 'DELETE' }),
}

export const shares = {
  create: (postId: number, platform?: string) =>
    request<MessageResponse & { shares_count: number }>(`/posts/${postId}/share`, {
      method: 'POST',
      body: JSON.stringify({ platform }),
    }),

  count: (postId: number, platform?: string) => {
    const q = platform ? `?platform=${platform}` : ''
    return request<ShareCountResponse>(`/posts/${postId}/share-count${q}`)
  },
}

export const users = {
  list: (search?: string) => {
    const q = search ? `?search=${encodeURIComponent(search)}` : ''
    return request<PaginatedResponse<User>>(`/users${q}`)
  },

  show: (id: number) => request<User>(`/users/${id}`),
}

export const friends = {
  sendRequest: (userId: number) =>
    request<MessageResponse>(`/friend-request/${userId}`, { method: 'POST' }),

  acceptRequest: (userId: number) =>
    request<MessageResponse>(`/friend-request/${userId}/accept`, { method: 'POST' }),

  rejectRequest: (userId: number) =>
    request<MessageResponse>(`/friend-request/${userId}`, { method: 'DELETE' }),

  remove: (userId: number) =>
    request<MessageResponse>(`/friends/${userId}`, { method: 'DELETE' }),

  list: () => request<PaginatedResponse<User>>('/friends'),

  pendingRequests: () => request<PaginatedResponse<Friendship>>('/friend-requests/pending'),

  sentRequests: () => request<PaginatedResponse<Friendship>>('/friend-requests/sent'),
}
