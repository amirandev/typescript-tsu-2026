# Lecture: Consuming REST APIs with TypeScript

## 1. What is an API?

**API** (Application Programming Interface) — a bridge between two applications.

In web development, a **REST API** lets a client (React app, mobile app, CLI) communicate with a server using HTTP requests.

```
Client (your code)  ──HTTP──>  Server (Laravel API)
                    <──JSON──
```

The server stores data in a database and exposes it through **endpoints** (URLs).

---

## 2. HTTP Methods (Verbs)

Every API request has a **method** that describes what you want to do:

| Method | Action | SQL Equivalent |
|--------|--------|---------------|
| GET | Read / fetch data | SELECT |
| POST | Create new data | INSERT |
| PUT / PATCH | Update existing data | UPDATE |
| DELETE | Remove data | DELETE |

**Examples with our API:**

```http
GET  /api/posts        → fetch all posts
POST /api/posts        → create a new post
GET  /api/posts/5      → fetch post with ID 5
PUT  /api/posts/5      → update post with ID 5
DELETE /api/posts/5    → delete post with ID 5
```

---

## 3. HTTP Status Codes

The server replies with a status code that tells you what happened:

| Code | Meaning | When? |
|------|---------|-------|
| 200 | OK | Everything worked |
| 201 | Created | A new resource was created |
| 401 | Unauthorized | You need to log in |
| 403 | Forbidden | Not your resource |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate (e.g. already liked) |
| 422 | Validation Error | Bad input data |
| 500 | Server Error | Something broke on the server |

---

## 4. Request / Response format

Our API uses **JSON** (JavaScript Object Notation) for both requests and responses.

**Request** (what you send):
```http
POST /api/login
Content-Type: application/json

{ "email": "student@test.com", "password": "password" }
```

**Response** (what you get back):
```json
{
  "token": "eyJ0eXAiOiJKV1Qi...",
  "user": { "id": 1, "name": "Test Student", "email": "student@test.com" }
}
```

---

## 5. Authentication with JWT

JWT (JSON Web Token) is a secure way to authenticate users.

### How it works:

```
1. User sends email + password  ──→  POST /api/login
2. Server verifies credentials    ──→  returns a signed JWT token
3. Client stores the token       ──→  (localStorage, memory)
4. Client attaches token to every future request:
   Authorization: Bearer <token>
5. Server verifies the token     ──→  allows or denies the request
```

### Why JWT?

- **Stateless** — the server doesn't need to store session data
- **Self-contained** — the token contains the user ID and expiry
- **Portable** — works across different domains and devices

### Anatomy of a JWT:

```
header.payload.signature
```

Printed on [jwt.io](https://jwt.io) for decoding.

---

## 6. Endpoints: Public vs Protected

Some endpoints are **public** (no token needed), others are **protected** (token required).

| Endpoint | Auth | Why? |
|----------|------|------|
| `POST /api/register` | No | Anyone can sign up |
| `POST /api/login` | No | Anyone can log in |
| `GET /api/posts` | No | Anyone can read posts |
| `POST /api/posts` | Yes | Only logged-in users can create |
| `POST /api/posts/1/like` | Yes | Only logged-in users can like |
| `GET /api/users` | Yes | Need to know who is online |

---

## 7. URL Patterns (Resourceful Routing)

| Pattern | Meaning |
|---------|---------|
| `GET /posts` | List all posts |
| `GET /posts/{id}` | Get a single post |
| `POST /posts` | Create a new post |
| `PUT /posts/{id}` | Update a post |
| `DELETE /posts/{id}` | Delete a post |
| `GET /posts/{id}/comments` | Nested resource: comments of a post |
| `GET /users?search=john` | Query parameter for filtering |

**Key idea:** URLs describe resources, HTTP methods describe actions.

---

## 8. Pagination

When there are many results, the API returns them in **pages**.

**Request:**
```http
GET /api/posts?page=1&per_page=15
```

**Response:**
```json
{
  "current_page": 1,
  "data": [ ... 15 posts ... ],
  "last_page": 24,
  "per_page": 15,
  "total": 360,
  "next_page_url": "https://.../api/posts?page=2",
  "prev_page_url": null
}
```

To get the next page:
```typescript
const res = await fetch(`${BASE}/posts?page=${page + 1}`);
```

---

## 9. CORS (Cross-Origin Resource Sharing)

Browsers block requests from one domain to another unless the server explicitly allows it.

Our server is configured to allow **any origin**:
```
Access-Control-Allow-Origin: *
```

This means you can call the API from:
- `http://localhost:3000` (local React dev server)
- `https://your-app.netlify.app` (deployed app)
- Any other domain

---

## 10. Our API Structure

```
courses.xrow.asia/api
 ├── Auth (register, login, logout, me, refresh, change-password)
 ├── Profile (my posts)
 ├── Posts (CRUD, timeline)
 ├── Likes (like, unlike, toggle)
 ├── Comments (CRUD on posts)
 ├── Shares (share, share-count)
 ├── Users (list, search, show)
 └── Friends (request, accept, reject, list)
```

---

## 11. Database Relationships

```
User  ──hasMany──>  Post
Post  ──hasMany──>  Like
Post  ──hasMany──>  Comment
Post  ──hasMany──>  Share
User  ──hasMany──>  Like
User  ──hasMany──>  Comment
User  ──hasMany──>  Friendship (sent/received)
```

Each post includes counts and a boolean `is_liked` for the current user.

---

## 12. Demo Accounts

| Email | Password |
|-------|----------|
| `student@test.com` | password |
| `alice@test.com` | password |
| `bob@test.com` | password |
| `charlie@test.com` | password |
| `diana@test.com` | password |

All accounts have posts, likes, comments, shares, and friends.

---

## 13. Tools for testing

| Tool | Best for |
|------|----------|
| Swagger UI | Interactive documentation (https://courses.xrow.asia/api/documentation) |
| fetch() in browser console | Quick tests |
| Postman / Insomnia | Building and saving requests |
| Your own React app | Full integration |

---

## 14. Key Takeaways

1. **APIs let frontend and backend communicate** over HTTP with JSON
2. **HTTP methods** describe the action (GET, POST, PUT, DELETE)
3. **Status codes** tell you if it worked (200, 201, 401, 422...)
4. **JWT tokens** authenticate users — store in localStorage, send as `Bearer` header
5. **Pagination** splits large result sets into pages
6. **CORS** must be configured on the server to allow cross-domain requests
7. **fetch()** is built into every browser — no libraries needed

---

## 15. Live Demo

Open Swagger UI and try:

```
1. POST /api/login    →  get a token
2. GET  /api/posts    →  see all posts
3. POST /api/posts/1/toggle-like  →  like a post
4. GET  /api/profile  →  see your posts
5. GET  /api/timeline →  see friends' posts
```
