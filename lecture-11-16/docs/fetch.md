# Using fetch() with the Student API

No libraries needed — `fetch()` is built into every browser and Node 18+.

---

## Setup with localStorage

```typescript
const BASE = 'https://courses.xrow.asia/api';

// Load token from localStorage on page load
function loadToken(): string | null {
  return localStorage.getItem('api_token');
}

// Save token to localStorage (survives page refresh)
function saveToken(t: string) {
  localStorage.setItem('api_token', t);
  token = t;
}

// Clear token on logout
function clearToken() {
  localStorage.removeItem('api_token');
  token = null;
}

// In-memory token (faster than reading localStorage every request)
let token: string | null = loadToken();
```

---

## Helper: auth headers

```typescript
function headers(): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  // Always check localStorage in case another tab updated it
  const t = token ?? loadToken();
  if (t) h['Authorization'] = `Bearer ${t}`;
  return h;
}
```

---

## Helper: handle response

```typescript
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw { status: res.status, ...body };
  }
  return res.json();
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
  const data = await handleResponse<{ user: any; token: string }>(res);
  saveToken(data.token); // persists to localStorage
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
  const data = await handleResponse<{ user: any; token: string }>(res);
  saveToken(data.token); // persists to localStorage
  return data;
}
```

### Get current user

```typescript
async function getMe() {
  const res = await fetch(`${BASE}/me`, { headers: headers() });
  return handleResponse(res);
}
```

### Logout

```typescript
async function logout() {
  const res = await fetch(`${BASE}/logout`, {
    method: 'POST',
    headers: headers(),
  });
  clearToken(); // removes from localStorage
  return handleResponse(res);
}
```

### Change password

```typescript
async function changePassword(current: string, newPass: string) {
  const res = await fetch(`${BASE}/change-password`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      current_password: current,
      new_password: newPass,
      new_password_confirmation: newPass,
    }),
  });
  return handleResponse(res);
}
```

---

## Posts

### List posts (public)

```typescript
async function getPosts(page = 1) {
  const res = await fetch(`${BASE}/posts?page=${page}&per_page=15`);
  return handleResponse<{
    data: any[];
    current_page: number;
    last_page: number;
    total: number;
  }>(res);
}
```

### Show post (public)

```typescript
async function getPost(id: number) {
  const res = await fetch(`${BASE}/posts/${id}`);
  return handleResponse(res);
}
```

### Create post

```typescript
async function createPost(title: string, body: string) {
  const res = await fetch(`${BASE}/posts`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ title, body }),
  });
  return handleResponse(res);
}
```

### Update post

```typescript
async function updatePost(id: number, data: { title?: string; body?: string }) {
  const res = await fetch(`${BASE}/posts/${id}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}
```

### Delete post

```typescript
async function deletePost(id: number) {
  const res = await fetch(`${BASE}/posts/${id}`, {
    method: 'DELETE',
    headers: headers(),
  });
  return handleResponse(res);
}
```

### Timeline (friends' posts)

```typescript
async function getTimeline() {
  const res = await fetch(`${BASE}/timeline`, { headers: headers() });
  return handleResponse(res);
}
```

---

## Likes

### Toggle like

```typescript
async function toggleLike(postId: number) {
  const res = await fetch(`${BASE}/posts/${postId}/toggle-like`, {
    method: 'POST',
    headers: headers(),
  });
  return handleResponse<{ liked: boolean; likes_count: number }>(res);
}
```

### Like

```typescript
async function likePost(postId: number) {
  const res = await fetch(`${BASE}/posts/${postId}/like`, {
    method: 'POST',
    headers: headers(),
  });
  return handleResponse(res);
}
```

### Unlike

```typescript
async function unlikePost(postId: number) {
  const res = await fetch(`${BASE}/posts/${postId}/like`, {
    method: 'DELETE',
    headers: headers(),
  });
  return handleResponse(res);
}
```

---

## Comments

### List comments

```typescript
async function getComments(postId: number) {
  const res = await fetch(`${BASE}/posts/${postId}/comments`, {
    headers: headers(),
  });
  return handleResponse(res);
}
```

### Add comment

```typescript
async function addComment(postId: number, body: string) {
  const res = await fetch(`${BASE}/posts/${postId}/comments`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ body }),
  });
  return handleResponse(res);
}
```

### Delete comment

```typescript
async function deleteComment(postId: number, commentId: number) {
  const res = await fetch(`${BASE}/posts/${postId}/comments/${commentId}`, {
    method: 'DELETE',
    headers: headers(),
  });
  return handleResponse(res);
}
```

---

## Shares

### Share post

```typescript
async function sharePost(postId: number, platform?: string) {
  const res = await fetch(`${BASE}/posts/${postId}/share`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ platform }),
  });
  return handleResponse(res);
}
```

### Share count (public)

```typescript
async function getShareCount(postId: number, platform?: string) {
  const query = platform ? `?platform=${platform}` : '';
  const res = await fetch(`${BASE}/posts/${postId}/share-count${query}`);
  return handleResponse<{ shares_count: number }>(res);
}
```

---

## Users

### List users with search

```typescript
async function getUsers(search?: string) {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  const res = await fetch(`${BASE}/users${query}`, { headers: headers() });
  return handleResponse(res);
}
```

### Show user

```typescript
async function getUser(id: number) {
  const res = await fetch(`${BASE}/users/${id}`, { headers: headers() });
  return handleResponse(res);
}
```

---

## Friends

### Send request

```typescript
async function sendFriendRequest(userId: number) {
  const res = await fetch(`${BASE}/friend-request/${userId}`, {
    method: 'POST',
    headers: headers(),
  });
  return handleResponse(res);
}
```

### Accept request

```typescript
async function acceptFriendRequest(userId: number) {
  const res = await fetch(`${BASE}/friend-request/${userId}/accept`, {
    method: 'POST',
    headers: headers(),
  });
  return handleResponse(res);
}
```

### Reject request

```typescript
async function rejectFriendRequest(userId: number) {
  const res = await fetch(`${BASE}/friend-request/${userId}`, {
    method: 'DELETE',
    headers: headers(),
  });
  return handleResponse(res);
}
```

### Remove friend

```typescript
async function removeFriend(userId: number) {
  const res = await fetch(`${BASE}/friends/${userId}`, {
    method: 'DELETE',
    headers: headers(),
  });
  return handleResponse(res);
}
```

### List friends

```typescript
async function getFriends() {
  const res = await fetch(`${BASE}/friends`, { headers: headers() });
  return handleResponse(res);
}
```

### Pending requests (received)

```typescript
async function getPendingRequests() {
  const res = await fetch(`${BASE}/friend-requests/pending`, { headers: headers() });
  return handleResponse(res);
}
```

### Sent requests

```typescript
async function getSentRequests() {
  const res = await fetch(`${BASE}/friend-requests/sent`, { headers: headers() });
  return handleResponse(res);
}
```

---

## Full example: login then fetch timeline

```typescript
async function main() {
  // 1. Login
  const { token: t } = await login('student@test.com', 'password');
  console.log('Logged in, token:', t);

  // 2. Get timeline
  const timeline = await getTimeline();
  console.log(`Friends posted ${timeline.total} posts`);

  // 3. Like the first post
  if (timeline.data.length > 0) {
    const first = timeline.data[0];
    const result = await toggleLike(first.id);
    console.log(result.liked ? 'Liked!' : 'Unliked!');
  }

  // 4. Logout
  await logout();
  console.log('Logged out');
}

main().catch(err => console.error('Error:', err));
```

---

## Error handling pattern

```typescript
async function safeFetch<T>(fn: () => Promise<T>): Promise<{ ok: true; data: T } | { ok: false; error: any }> {
  try {
    const data = await fn();
    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err };
  }
}

// Usage
const result = await safeFetch(() => login('student@test.com', 'password'));
if (result.ok) {
  console.log('Token:', result.data.token);
} else {
  console.error('Login failed:', result.error);
}
```

---

## localStorage in React

### Auth context with localStorage persistence

```tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('api_token')
  );
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount: if token exists, fetch user profile
  useEffect(() => {
    if (token) {
      fetch('https://courses.xrow.asia/api/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(r => r.json())
        .then(u => setUser(u))
        .catch(() => {
          localStorage.removeItem('api_token');
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await fetch('https://courses.xrow.asia/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    localStorage.setItem('api_token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch('https://courses.xrow.asia/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, password_confirmation: password }),
    });
    const data = await res.json();
    localStorage.setItem('api_token', data.token);
    setToken(data.token);
    setUser(data.user);
  };

  const logout = async () => {
    await fetch('https://courses.xrow.asia/api/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem('api_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

### Usage in components

```tsx
function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Redirect to dashboard — user is now in context
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
```

```tsx
function PostsPage() {
  const { token } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://courses.xrow.asia/api/posts', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(d => setPosts(d.data));
  }, [token]);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <span>♥ {post.likes_count}  💬 {post.comments_count}</span>
        </div>
      ))}
    </div>
  );
}
```

### Sync across browser tabs

```typescript
// Listen for token changes from other tabs
window.addEventListener('storage', (e) => {
  if (e.key === 'api_token') {
    if (e.newValue) {
      token = e.newValue;   // another tab logged in
    } else {
      token = null;          // another tab logged out
    }
  }
});
```
