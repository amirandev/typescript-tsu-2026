# API Documentation

Base URL: `https://courses.xrow.asia/api`

---

## Auth

### Register
```http
POST /register
{"name":"John","email":"john@test.com","password":"123456","password_confirmation":"123456"}
```
**201** — returns `{ user, token }`

### Login
```http
POST /login
{"email":"student@test.com","password":"password"}
```
**200** — returns `{ user, token }`

### Me
```http
GET /me
Authorization: Bearer <token>
```

### Logout
```http
POST /logout
Authorization: Bearer <token>
```

### Refresh
```http
POST /refresh
Authorization: Bearer <token>
```

### Change Password
```http
POST /change-password
Authorization: Bearer <token>
{"current_password":"...","new_password":"...","new_password_confirmation":"..."}
```

---

## Profile

```http
GET /profile?per_page=15
Authorization: Bearer <token>
```
Returns authenticated user's posts.

---

## Posts

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/posts?page=1&per_page=15` | No | List all posts |
| GET | `/posts/{id}` | No | Show post |
| POST | `/posts` | Yes | Create post |
| PUT | `/posts/{id}` | Yes | Update post |
| DELETE | `/posts/{id}` | Yes | Delete post |
| GET | `/timeline?per_page=15` | Yes | Friends' posts |

### Create Post
```http
POST /posts
Authorization: Bearer <token>
{"title":"Hello","body":"World"}
```

---

## Likes

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/posts/{id}/toggle-like` | Yes | Toggle like |
| POST | `/posts/{id}/like` | Yes | Like |
| DELETE | `/posts/{id}/like` | Yes | Unlike |

Response: `{ "liked": true, "likes_count": 5 }`

---

## Comments

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/posts/{id}/comments` | Yes | List comments |
| POST | `/posts/{id}/comments` | Yes | Add comment |
| DELETE | `/posts/{id}/comments/{cid}` | Yes | Delete comment |

```http
POST /posts/1/comments
Authorization: Bearer <token>
{"body":"Nice post!"}
```

---

## Shares

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/posts/{id}/share` | Yes | Share post |
| GET | `/posts/{id}/share-count?platform=` | No | Share count |

---

## Users

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/users?search=john` | Yes | List users |
| GET | `/users/{id}` | Yes | Show user |

Each user includes: `is_friend`, `friend_request_sent`, `friend_request_received`

---

## Friends

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/friend-request/{user}` | Yes | Send request |
| POST | `/friend-request/{user}/accept` | Yes | Accept request |
| DELETE | `/friend-request/{user}` | Yes | Reject request |
| DELETE | `/friends/{user}` | Yes | Remove friend |
| GET | `/friends` | Yes | List friends |
| GET | `/friend-requests/pending` | Yes | Pending received |
| GET | `/friend-requests/sent` | Yes | Sent requests |

---

## Error Codes

| Code | Meaning |
|------|---------|
| 401 | Missing/invalid token |
| 403 | Forbidden |
| 404 | Not found |
| 409 | Conflict |
| 422 | Validation error |
