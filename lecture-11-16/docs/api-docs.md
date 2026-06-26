# API Documentation

Base URL: `https://courses.xrow.asia/api`

---

## Auth

### Register

```http
POST /register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**201 Created**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "updated_at": "2026-06-26T12:00:00.000000Z",
    "created_at": "2026-06-26T12:00:00.000000Z"
  },
  "token": "eyJ0eXAiOiJKV1Qi..."
}
```

**422 Validation Error**
```json
{
  "status": false,
  "message": "The email has already been taken."
}
```

---

### Login

```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**200 OK**
```json
{
  "message": "Login successful",
  "token": "eyJ0eXAiOiJKV1Qi...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2026-06-26T12:00:00.000000Z",
    "updated_at": "2026-06-26T12:00:00.000000Z"
  }
}
```

**401 Unauthorized**
```json
{
  "error": "Invalid credentials"
}
```

**422 Validation Error**
```json
{
  "email": ["The email field is required."]
}
```

---

### Me

```http
GET /me
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2026-06-26T12:00:00.000000Z",
  "updated_at": "2026-06-26T12:00:00.000000Z",
  "posts_count": 5,
  "friends_count": 12
}
```

---

### Logout

```http
POST /logout
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "message": "Successfully logged out"
}
```

---

### Refresh

```http
POST /refresh
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "token": "eyJ0eXAiOiJKV1Qi..."
}
```

---

### Change Password

```http
POST /change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "current_password": "oldpass123",
  "new_password": "newpass123",
  "new_password_confirmation": "newpass123"
}
```

**200 OK**
```json
{
  "message": "Password changed successfully"
}
```

**400 Bad Request**
```json
{
  "error": "Current password is incorrect"
}
```

**422 Validation Error**
```json
{
  "new_password": ["The new password must be at least 6 characters."]
}
```

---

## Profile

```http
GET /profile?per_page=15
Authorization: Bearer <token>
```

Returns authenticated user's posts (paginated).

**200 OK**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "title": "My Post",
      "body": "Post content",
      "created_at": "2026-06-26T12:00:00.000000Z",
      "updated_at": "2026-06-26T12:00:00.000000Z",
      "likes_count": 3,
      "comments_count": 2,
      "shares_count": 1,
      "is_liked": true
    }
  ],
  "per_page": 15,
  "total": 1,
  "last_page": 1
}
```

---

## Posts

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/posts?page=1&per_page=15` | No | List all posts |
| GET | `/posts/{id}` | No | Show post with comments |
| POST | `/posts` | Yes | Create post |
| PUT | `/posts/{id}` | Yes | Update post |
| PATCH | `/posts/{id}` | Yes | Update post (partial) |
| DELETE | `/posts/{id}` | Yes | Delete post |
| GET | `/timeline?per_page=15` | Yes | Friends' posts |

### List Posts

```http
GET /posts?page=1&per_page=15
```

**200 OK**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "user_id": 1,
      "title": "My Post",
      "body": "Post content here...",
      "created_at": "2026-06-26T12:00:00.000000Z",
      "updated_at": "2026-06-26T12:00:00.000000Z",
      "likes_count": 3,
      "comments_count": 2,
      "shares_count": 1,
      "user": { "id": 1, "name": "John Doe" },
      "is_liked": false
    }
  ],
  "per_page": 15,
  "total": 10,
  "last_page": 1
}
```

### Show Post

```http
GET /posts/1
```

**200 OK**
```json
{
  "id": 1,
  "user_id": 1,
  "title": "My Post",
  "body": "Post content here...",
  "created_at": "2026-06-26T12:00:00.000000Z",
  "updated_at": "2026-06-26T12:00:00.000000Z",
  "likes_count": 3,
  "comments_count": 2,
  "shares_count": 1,
  "user": { "id": 1, "name": "John Doe" },
  "is_liked": false,
  "comments": [
    {
      "id": 1,
      "body": "Nice post!",
      "created_at": "2026-06-26T12:00:00.000000Z",
      "user": { "id": 2, "name": "Jane Doe" }
    }
  ]
}
```

**404 Not Found**
```json
{
  "message": "No query results for model [App\\Models\\Post] 1"
}
```

### Create Post

```http
POST /posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Hello",
  "body": "World"
}
```

**201 Created**
```json
{
  "message": "Post created successfully",
  "post": {
    "id": 2,
    "user_id": 1,
    "title": "Hello",
    "body": "World",
    "created_at": "2026-06-26T12:00:00.000000Z",
    "updated_at": "2026-06-26T12:00:00.000000Z",
    "likes_count": 0,
    "comments_count": 0,
    "shares_count": 0
  }
}
```

**422 Validation Error**
```json
{
  "title": ["The title field is required."]
}
```

### Update Post

```http
PUT /posts/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "body": "Updated body"
}
```

**200 OK**
```json
{
  "message": "Post updated successfully",
  "post": {
    "id": 1,
    "user_id": 1,
    "title": "Updated Title",
    "body": "Updated body",
    "created_at": "2026-06-26T12:00:00.000000Z",
    "updated_at": "2026-06-26T12:00:00.000000Z",
    "likes_count": 3,
    "comments_count": 2,
    "shares_count": 1
  }
}
```

**403 Forbidden**
```json
{
  "error": "Unauthorized"
}
```

### Delete Post

```http
DELETE /posts/1
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "message": "Post deleted successfully"
}
```

**403 Forbidden**
```json
{
  "error": "Unauthorized"
}
```

### Timeline

```http
GET /timeline?per_page=15
Authorization: Bearer <token>
```

Returns friends' posts (same shape as List Posts paginated response).

---

## Likes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/posts/{id}/toggle-like` | Yes | Toggle like |
| POST | `/posts/{id}/like` | Yes | Like |
| DELETE | `/posts/{id}/like` | Yes | Unlike |

### Toggle Like

```http
POST /posts/1/toggle-like
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "liked": true,
  "likes_count": 5
}
```

### Like

```http
POST /posts/1/like
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "message": "Post liked",
  "likes_count": 5
}
```

**409 Conflict**
```json
{
  "message": "Already liked"
}
```

### Unlike

```http
DELETE /posts/1/like
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "message": "Like removed",
  "likes_count": 4
}
```

**404 Not Found**
```json
{
  "message": "Not liked yet"
}
```

---

## Comments

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/posts/{id}/comments` | Yes | List comments |
| POST | `/posts/{id}/comments` | Yes | Add comment |
| DELETE | `/posts/{id}/comments/{cid}` | Yes | Delete comment |

### List Comments

```http
GET /posts/1/comments
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "post_id": 1,
      "user_id": 2,
      "body": "Great post!",
      "created_at": "2026-06-26T12:00:00.000000Z",
      "updated_at": "2026-06-26T12:00:00.000000Z",
      "user": { "id": 2, "name": "Jane Doe" }
    }
  ],
  "per_page": 15,
  "total": 1,
  "last_page": 1
}
```

### Add Comment

```http
POST /posts/1/comments
Authorization: Bearer <token>
Content-Type: application/json

{
  "body": "Nice post!"
}
```

**201 Created**
```json
{
  "message": "Comment added",
  "comment": {
    "id": 2,
    "post_id": 1,
    "user_id": 1,
    "body": "Nice post!",
    "created_at": "2026-06-26T12:00:00.000000Z",
    "updated_at": "2026-06-26T12:00:00.000000Z",
    "user": { "id": 1, "name": "John Doe" }
  }
}
```

**422 Validation Error**
```json
{
  "body": ["The body field is required."]
}
```

### Delete Comment

```http
DELETE /posts/1/comments/1
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "message": "Comment deleted"
}
```

**403 Forbidden**
```json
{
  "error": "Unauthorized"
}
```

---

## Shares

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/posts/{id}/share` | Yes | Share post |
| GET | `/posts/{id}/share-count?platform=` | No | Share count |

### Share Post

```http
POST /posts/1/share
Authorization: Bearer <token>
Content-Type: application/json

{
  "platform": "facebook"
}
```

**201 Created**
```json
{
  "message": "Post shared",
  "shares_count": 3
}
```

**200 OK** (if already shared)
```json
{
  "message": "Already shared",
  "shares_count": 3
}
```

### Share Count

```http
GET /posts/1/share-count?platform=facebook
```

**200 OK**
```json
{
  "shares_count": 2
}
```

---

## Users

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/users?search=john&per_page=15` | Yes | List users |
| GET | `/users/{id}` | Yes | Show user |

### List Users

```http
GET /users?search=john&per_page=15
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2026-06-26T12:00:00.000000Z",
      "updated_at": "2026-06-26T12:00:00.000000Z",
      "is_friend": true,
      "friend_request_sent": false,
      "friend_request_received": false
    }
  ],
  "per_page": 15,
  "total": 1,
  "last_page": 1
}
```

### Show User

```http
GET /users/1
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2026-06-26T12:00:00.000000Z",
  "updated_at": "2026-06-26T12:00:00.000000Z",
  "is_friend": true,
  "friend_request_sent": false,
  "friend_request_received": false,
  "posts_count": 5,
  "friends_count": 12
}
```

---

## Friends

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/friend-request/{user}` | Yes | Send request |
| POST | `/friend-request/{user}/accept` | Yes | Accept request |
| DELETE | `/friend-request/{user}` | Yes | Reject/cancel request |
| DELETE | `/friends/{user}` | Yes | Remove friend |
| GET | `/friends` | Yes | List friends |
| GET | `/friend-requests/pending` | Yes | Pending received requests |
| GET | `/friend-requests/sent` | Yes | Sent requests |

### Send Friend Request

```http
POST /friend-request/2
Authorization: Bearer <token>
```

**201 Created**
```json
{
  "message": "Friend request sent"
}
```

**400 Bad Request**
```json
{
  "error": "Cannot send friend request to yourself"
}
```

**409 Conflict**
```json
{
  "error": "Friend request already sent"
}
```

### Accept Friend Request

```http
POST /friend-request/2/accept
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "message": "Friend request accepted"
}
```

### Reject / Cancel Friend Request

```http
DELETE /friend-request/2
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "message": "Friend request rejected"
}
```

### Remove Friend

```http
DELETE /friends/2
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "message": "Friend removed"
}
```

### List Friends

```http
GET /friends
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 2,
      "name": "Jane Doe",
      "email": "jane@example.com",
      "created_at": "2026-06-25T12:00:00.000000Z",
      "updated_at": "2026-06-25T12:00:00.000000Z"
    }
  ],
  "per_page": 15,
  "total": 1,
  "last_page": 1
}
```

### Pending Received Requests

```http
GET /friend-requests/pending
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "sender_id": 3,
      "receiver_id": 1,
      "status": "pending",
      "created_at": "2026-06-26T12:00:00.000000Z",
      "updated_at": "2026-06-26T12:00:00.000000Z",
      "sender": {
        "id": 3,
        "name": "Bob Smith",
        "email": "bob@example.com"
      }
    }
  ],
  "per_page": 15,
  "total": 1,
  "last_page": 1
}
```

### Sent Requests

```http
GET /friend-requests/sent
Authorization: Bearer <token>
```

**200 OK**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 2,
      "sender_id": 1,
      "receiver_id": 2,
      "status": "pending",
      "created_at": "2026-06-26T12:00:00.000000Z",
      "updated_at": "2026-06-26T12:00:00.000000Z",
      "receiver": {
        "id": 2,
        "name": "Jane Doe",
        "email": "jane@example.com"
      }
    }
  ],
  "per_page": 15,
  "total": 1,
  "last_page": 1
}
```

---

## Error Codes

| Code | Meaning | Response Shape |
|------|---------|----------------|
| 400 | Bad request (e.g. self-friend-request, wrong current password) | `{ "error": "message" }` |
| 401 | Missing or invalid token / invalid credentials | `{ "error": "Invalid credentials" }` |
| 403 | Forbidden (not the owner) | `{ "error": "Unauthorized" }` |
| 404 | Resource not found | `{ "message": "No query results..." }` or `{ "message": "Not liked yet" }` |
| 409 | Conflict (e.g. duplicate like, existing friend request) | `{ "message": "Already liked" }` or `{ "error": "message" }` |
| 422 | Validation error | `{ "field": ["error message"] }` or `{ "status": false, "message": "..." }` |

## Authentication Error

All endpoints that require `Authorization: Bearer <token>` return **401** when the token is missing or expired:

```json
{
  "message": "Unauthenticated."
}
```
