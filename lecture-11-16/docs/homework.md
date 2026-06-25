# Homework

## Task 1: Types

Copy all types from `types.md` into a `types.ts` file.

## Task 2: API Client

Create `api.ts` with a class:

```typescript
class StudentApi {
  private token: string | null = null;
  private baseURL = 'https://courses.xrow.asia/api';

  async register(data) { /* POST /register */ }
  async login(data)    { /* POST /login */ }
  async getPosts(page) { /* GET /posts */ }
  async createPost(data) { /* POST /posts */ }
  async toggleLike(id) { /* POST /posts/{id}/toggle-like */ }
  async addComment(id, data) { /* POST /posts/{id}/comments */ }
  async getUsers(search) { /* GET /users */ }
  async sendFriendRequest(id) { /* POST /friend-request/{id} */ }
  async getFriends() { /* GET /friends */ }
  async getTimeline() { /* GET /timeline */ }
  async sharePost(id, platform) { /* POST /posts/{id}/share */ }
  // ... add all other endpoints
}
```

Every method must be typed using the interfaces from Task 1.

## Task 3: CLI App

Build a menu-driven CLI with `readline`:

```
1. Login
2. List posts
3. Create post
4. Like/unlike
5. Comment
6. View friends
7. Send friend request
8. Timeline
9. Exit
```

## Bonus: React App

Build a React app with:
- Login page
- Posts feed
- Create post form
- Like button
- Comments section
- Friends list
