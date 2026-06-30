import type { AuthResponse, PaginatedResponse, Post, LikeToggleResponse } from '../types'

const BASE = 'https://courses.xrow.asia/api'

function token() {
  return localStorage.getItem('api_token')
}

function authHeaders(): Record<string, string> {
  const t = token()
  return t
    ? { Authorization: `Bearer ${t}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' }
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error((await res.json()).message)
  return res.json()
}

export async function getPosts(page = 1): Promise<PaginatedResponse<Post>> {
  const res = await fetch(`${BASE}/posts?page=${page}&per_page=15`)
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export async function getPost(id: string): Promise<Post> {
  const res = await fetch(`${BASE}/posts/${id}`)
  if (!res.ok) throw new Error('Post not found')
  return res.json()
}

export async function toggleLike(postId: number): Promise<LikeToggleResponse> {
  const res = await fetch(`${BASE}/posts/${postId}/toggle-like`, {
    method: 'POST',
    headers: authHeaders(),
  })
  return res.json()
}
