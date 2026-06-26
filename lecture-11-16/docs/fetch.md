# Using fetch() with the Student API

No libraries needed — `fetch()` is built into every browser and Node 18+.

---

## Basic example

```typescript
async function checkStatus() {
  try {
    const response = await fetch('https://api.example.com/data');
    
    // Access the numerical status code (e.g., 200, 404, 500)
    console.log(response.status); 
    
    // Optional: Access the status text message (e.g., "OK", "Not Found")
    console.log(response.statusText); 

    if (!response.ok) {
      // response.ok is true if the status is 200-299
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}
```

---

## Setup

```typescript
const BASE = 'https://courses.xrow.asia/api';

function authHeaders(): Record<string, string> {
  return { Authorization: `Bearer ${localStorage.getItem('api_token')}` };
}
```

---

## Types

All response types are defined in `src/types/index.ts`:

```typescript
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

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
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
```

---

## Auth

### Register

```typescript
async function register(name: string, email: string, password: string) {
  const res = await fetch(`${BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, password_confirmation: password }),
  });
  const data = await res.json() as AuthResponse;
  if (!res.ok) throw data;
  localStorage.setItem('api_token', data.token);
  return data;
}
```

### Login

```typescript
async function login(email: string, password: string) {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json() as { message: string; token: string; user: User };
  if (!res.ok) throw data;
  localStorage.setItem('api_token', data.token);
  return data;
}
```

### Get current user

```typescript
async function getMe(): Promise<User> {
  const res = await fetch(`${BASE}/me`, { headers: authHeaders() });
  return res.json();
}
```

### Logout

```typescript
async function logout() {
  const res = await fetch(`${BASE}/logout`, {
    method: 'POST',
    headers: authHeaders(),
  });
  localStorage.removeItem('api_token');
  return res.json() as Promise<MessageResponse>;
}
```

### Change password

```typescript
async function changePassword(current: string, newPass: string) {
  const res = await fetch(`${BASE}/change-password`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      current_password: current,
      new_password: newPass,
      new_password_confirmation: newPass,
    }),
  });
  return res.json() as Promise<MessageResponse>;
}
```

---

## Posts

### List posts (public)

```typescript
async function getPosts(page = 1): Promise<PaginatedResponse<Post>> {
  const res = await fetch(`${BASE}/posts?page=${page}&per_page=15`);
  return res.json();
}
```

### Show post (public)

```typescript
async function getPost(id: number): Promise<Post> {
  const res = await fetch(`${BASE}/posts/${id}`);
  return res.json();
}
```

### Create post

```typescript
async function createPost(title: string, body: string) {
  const res = await fetch(`${BASE}/posts`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body }),
  });
  return res.json() as Promise<{ message: string; post: Post }>;
}
```

### Update post

```typescript
async function updatePost(id: number, data: { title?: string; body?: string }) {
  const res = await fetch(`${BASE}/posts/${id}`, {
    method: 'PUT',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json() as Promise<{ message: string; post: Post }>;
}
```

### Delete post

```typescript
async function deletePost(id: number): Promise<MessageResponse> {
  const res = await fetch(`${BASE}/posts/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.json();
}
```

### Timeline (friends' posts)

```typescript
async function getTimeline(): Promise<PaginatedResponse<Post>> {
  const res = await fetch(`${BASE}/timeline`, { headers: authHeaders() });
  return res.json();
}
```

---

## Likes

### Toggle like

```typescript
async function toggleLike(postId: number): Promise<LikeToggleResponse> {
  const res = await fetch(`${BASE}/posts/${postId}/toggle-like`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return res.json();
}
```

### Like

```typescript
async function likePost(postId: number): Promise<{ message: string; likes_count: number }> {
  const res = await fetch(`${BASE}/posts/${postId}/like`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return res.json();
}
```

### Unlike

```typescript
async function unlikePost(postId: number): Promise<{ message: string; likes_count: number }> {
  const res = await fetch(`${BASE}/posts/${postId}/like`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.json();
}
```

---

## Comments

### List comments

```typescript
async function getComments(postId: number): Promise<PaginatedResponse<Comment>> {
  const res = await fetch(`${BASE}/posts/${postId}/comments`, {
    headers: authHeaders(),
  });
  return res.json();
}
```

### Add comment

```typescript
async function addComment(postId: number, body: string) {
  const res = await fetch(`${BASE}/posts/${postId}/comments`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ body }),
  });
  return res.json() as Promise<{ message: string; comment: Comment }>;
}
```

### Delete comment

```typescript
async function deleteComment(postId: number, commentId: number): Promise<MessageResponse> {
  const res = await fetch(`${BASE}/posts/${postId}/comments/${commentId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.json();
}
```

---

## Shares

### Share post

```typescript
async function sharePost(postId: number, platform?: string) {
  const res = await fetch(`${BASE}/posts/${postId}/share`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ platform }),
  });
  return res.json() as Promise<{ message: string; shares_count: number }>;
}
```

### Share count (public)

```typescript
async function getShareCount(postId: number, platform?: string): Promise<ShareCountResponse> {
  const query = platform ? `?platform=${platform}` : '';
  const res = await fetch(`${BASE}/posts/${postId}/share-count${query}`);
  return res.json();
}
```

---

## Users

### List users with search

```typescript
async function getUsers(search?: string): Promise<PaginatedResponse<User>> {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  const res = await fetch(`${BASE}/users${query}`, { headers: authHeaders() });
  return res.json();
}
```

### Show user

```typescript
async function getUser(id: number): Promise<User> {
  const res = await fetch(`${BASE}/users/${id}`, { headers: authHeaders() });
  return res.json();
}
```

---

## Friends

### Send request

```typescript
async function sendFriendRequest(userId: number): Promise<MessageResponse> {
  const res = await fetch(`${BASE}/friend-request/${userId}`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return res.json();
}
```

### Accept request

```typescript
async function acceptFriendRequest(userId: number): Promise<MessageResponse> {
  const res = await fetch(`${BASE}/friend-request/${userId}/accept`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return res.json();
}
```

### Reject request

```typescript
async function rejectFriendRequest(userId: number): Promise<MessageResponse> {
  const res = await fetch(`${BASE}/friend-request/${userId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.json();
}
```

### Remove friend

```typescript
async function removeFriend(userId: number): Promise<MessageResponse> {
  const res = await fetch(`${BASE}/friends/${userId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return res.json();
}
```

### List friends

```typescript
async function getFriends(): Promise<PaginatedResponse<User>> {
  const res = await fetch(`${BASE}/friends`, { headers: authHeaders() });
  return res.json();
}
```

### Pending requests (received)

```typescript
async function getPendingRequests(): Promise<PaginatedResponse<import('../types').Friendship>> {
  const res = await fetch(`${BASE}/friend-requests/pending`, { headers: authHeaders() });
  return res.json();
}
```

### Sent requests

```typescript
async function getSentRequests(): Promise<PaginatedResponse<import('../types').Friendship>> {
  const res = await fetch(`${BASE}/friend-requests/sent`, { headers: authHeaders() });
  return res.json();
}
```

---

## Usage in a React component

```tsx
import { useEffect, useState } from 'react'
import type { Post, PaginatedResponse } from '../types'

const BASE = 'https://courses.xrow.asia/api'

export default function PostsPage() {
  const [data, setData] = useState<PaginatedResponse<Post> | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(`${BASE}/posts?page=${page}&per_page=15`)
      .then(r => r.json() as Promise<PaginatedResponse<Post>>)
      .then(setData)
  }, [page])

  if (!data) return <p>Loading...</p>

  return (
    <div>
      {data.data.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <span>♥ {post.likes_count} 💬 {post.comments_count}</span>
        </div>
      ))}
    </div>
  )
}
```

### Auth pages (login / register)

```tsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import type { User } from '../types'

const BASE = 'https://courses.xrow.asia/api'

interface LoginResponse {
  message: string
  token: string
  user: User
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json() as LoginResponse | Record<string, any>
      if (!res.ok) {
        setError(data.error || data.message || 'Login failed')
        return
      }
      localStorage.setItem('api_token', data.token)
      navigate('/posts')
    } catch {
      setError('Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  )
}
```

---

## Error handling pattern

```typescript
// Error responses come in different shapes:
//   401: { error: "Invalid credentials" }
//   422: { email: ["The email field is required."] }
//   422: { status: false, message: "The email has already been taken." }

// Extract a user-friendly message from any error shape:
function getError(data: Record<string, any>): string {
  return data.message || data.error || Object.values(data).flat().join(', ') || 'Something went wrong'
}

// Usage:
const res = await fetch(`${BASE}/login`, { ... })
const data = await res.json()
if (!res.ok) {
  setError(getError(data))
  return
}
```

---

## localStorage helpers

```typescript
// Save token (after login/register)
localStorage.setItem('api_token', data.token);

// Read token (for auth headers)
localStorage.getItem('api_token');

// Remove token (on logout)
localStorage.removeItem('api_token');

// Listen for token changes from other tabs
window.addEventListener('storage', (e) => {
  if (e.key === 'api_token') {
    // another tab logged in or out
  }
});
```
