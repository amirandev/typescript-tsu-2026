# ლექცია 18 — განვლილი თემების გამეორება (Lectures 1–16)

## 1. TypeScript საფუძვლები

### ინტერფეისები (Interfaces)
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  user_id: number;
  user?: User;          // optional (დამოკიდებულება)
  likes_count: number;
  is_liked: boolean;
}
```

### Generic ტიპები
```typescript
interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
}

// გამოყენება:
// PaginatedResponse<Post>
// PaginatedResponse<User>
```

### Union ტიპები
```typescript
type FriendStatus = 'pending' | 'accepted' | 'blocked';
```

---

## 2. REST API საფუძვლები

| HTTP Method | მიზანი | მაგალითი |
|------------|--------|---------|
| GET | წაკითხვა (SELECT) | `GET /posts`, `GET /posts/1` |
| POST | შექმნა (INSERT) | `POST /posts`, `POST /register` |
| PUT/PATCH | განახლება (UPDATE) | `PUT /posts/1` |
| DELETE | წაშლა (DELETE) | `DELETE /posts/1` |

### HTTP სტატუს კოდები
- **200** — OK (წარმატება)
- **201** — Created (შექმნილი)
- **401** — Unauthorized (არაავტორიზებული)
- **403** — Forbidden (აკრძალული)
- **404** — Not Found (არ მოიძებნა)
- **422** — Validation Error (ვალიდაციის შეცდომა)
- **500** — Server Error (სერვერის შეცდომა)

### JWT ავთენტიფიკაცია
```
Authorization: Bearer <token>
```

---

## 3. fetch() API Client

### ბაზური setup
```typescript
const BASE = 'http://localhost:8000/api';

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return token
    ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };
}
```

### მაგალითები
```typescript
async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

async function getPosts(page = 1): Promise<PaginatedResponse<Post>> {
  const res = await fetch(`${BASE}/posts?page=${page}`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

async function toggleLike(postId: number): Promise<LikeToggleResponse> {
  const res = await fetch(`${BASE}/posts/${postId}/toggle-like`, {
    method: 'POST',
    headers: authHeaders(),
  });
  return res.json();
}
```

### localStorage ტოკენისთვის
```typescript
// შენახვა
localStorage.setItem('token', data.token);

// წაკითხვა
const token = localStorage.getItem('token');

// წაშლა (logout)
localStorage.removeItem('token');
```

---

## 4. React + TypeScript კომპონენტები

### Props
```typescript
interface PostCardProps {
  post: Post;
  onLike: (id: number) => void;
}

function PostCard({ post, onLike }: PostCardProps) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={() => onLike(post.id)}>
        {post.is_liked ? 'Unlike' : 'Like'} ({post.likes_count})
      </button>
    </div>
  );
}
```

### State & Effect
```typescript
function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts(page)
      .then(data => setPosts(data.data))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} onLike={handleLike} />
      ))}
    </div>
  );
}
```

### onLike — მონაცემთა მიბმის სრული მაგალითი

**PostsPage.tsx** — parent კომპონენტი (data მოდის API-დან, onLike აახლებს state-ს):
```typescript
const handleLike = async (postId: number) => {
  const res = await fetch(`${BASE}/posts/${postId}/toggle-like`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token()}` },
  })
  const result = await res.json()
  // { liked: true, likes_count: 5 }

  setPosts(prev =>
    prev.map(p =>
      p.id === postId
        ? { ...p, is_liked: result.liked, likes_count: result.likes_count }
        : p
    )
  )
}

// JSX-ში binding:
posts.map(post => (
  <PostCard key={post.id} post={post} onLike={handleLike} />
))
```

**PostCard.tsx** — child კომპონენტი (იღებს props-ს, აწვდის post.id-ს onLike-ში):
```typescript
interface PostCardProps {
  post: Post
  onLike: (postId: number) => void   // ფუნქციის ტიპი
}

export default function PostCard({ post, onLike }: PostCardProps) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <small>by {post.user?.name}</small>
      <button onClick={() => onLike(post.id)}>
        {post.is_liked ? '♥' : '♡'} {post.likes_count}
      </button>
    </div>
  )
}
```

**მონაცემთა ნაკადი (data binding):**
1. API → `PaginatedResponse<Post>` → `data.data` არის `Post[]`
2. `.map()` გადაუვლის თითოეულ post-ს
3. `post={post}` — Post ობიექტი props-ით PostCard-ში
4. `onLike={handleLike}` — ფუნქცია გადაეცემა child-ს
5. PostCard-ში `post.title`, `post.body`, `post.user?.name` — TypeScript ტიპებს ამოწმებს
6. Like-ზე დაჭერისას: `onLike(post.id)` → `handleLike(postId)` → fetch POST → setPosts (state update) → re-render

---

## 5. React Router

### Route definitions
```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/posts" element={<PostsPage />} />
  <Route path="/posts/:id" element={<PostDetailPage />} />
  <Route element={<ProtectedRoute />}>
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/timeline" element={<TimelinePage />} />
    <Route path="/users" element={<UsersPage />} />
    <Route path="/friends" element={<FriendsPage />} />
  </Route>
</Routes>
```

### Layout Route (Outlet)
```typescript
function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />   {/* აქ ჩაისმება შვილი route-ის კომპონენტი */}
      </main>
    </div>
  );
}
```

### Protected Route (Auth Guard)
```typescript
function ProtectedRoute() {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}
```

### Navigate / useNavigate
```typescript
// <Navigate> — დეკლარაციული
if (!user) return <Navigate to="/login" />;

// useNavigate() — იმპერატიული (ღილაკზე დაჭერისას)
const navigate = useNavigate();
<button onClick={() => navigate('/posts')}>Go to Posts</button>
<button onClick={() => navigate(-1)}>Back</button>

// useParams — URL პარამეტრები
const { id } = useParams();
```

---

## 6. Context API (AuthContext)

```typescript
interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getMe()
        .then(res => setUser(res.user))
        .catch(() => { setToken(null); localStorage.removeItem('token'); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await loginApi(email, password);
    localStorage.setItem('token', res.token);
    setToken(res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be within AuthProvider');
  return context;
}
```

---

## 7. CRUD ოპერაციები

### Posts
| მეთოდი | Endpoint | აღწერა |
|--------|----------|--------|
| GET | /posts | ყველა პოსტი (პაგინირებული) |
| GET | /posts/{id | ერთი პოსტი |
| POST | /posts | ახალი პოსტი (auth) |
| PUT | /posts/{id | პოსტის განახლება (auth) |
| DELETE | /posts/{id} | პოსტის წაშლა (auth) |

### Comments (nested resource)
| მეთოდი | Endpoint | აღწერა |
|--------|----------|--------|
| GET | /posts/{id}/comments | კომენტარები |
| POST | /posts/{id}/comments | კომენტარის დამატება (auth) |
| DELETE | /posts/{id}/comments/{cid} | კომენტარის წაშლა (auth) |

### Likes
| მეთოდი | Endpoint | აღწერა |
|--------|----------|--------|
| POST | /posts/{id}/toggle-like | Like/Unlike გადართვა |
| POST | /posts/{id}/like | Like (თუ უკვე არის → 409) |
| DELETE | /posts/{id}/like | Unlike (თუ არ არის → 404) |

### Shares
| მეთოდი | Endpoint | აღწერა |
|--------|----------|--------|
| POST | /posts/{id}/share | გაზიარება |
| GET | /posts/{id}/share-count | გაზიარებების რაოდენობა |

### Friends
| მეთოდი | Endpoint | აღწერა |
|--------|----------|--------|
| POST | /friend-request/{user} | მეგობრობის მოთხოვნა |
| POST | /friend-request/{user}/accept | მოთხოვნის მიღება |
| DELETE | /friend-request/{user} | მოთხოვნის უარყოფა |
| DELETE | /friends/{user} | მეგობრის წაშლა |
| GET | /friends | მეგობრების სია |
| GET | /friend-requests/pending | შემოსული მოთხოვნები |
| GET | /friend-requests/sent | გაგზავნილი მოთხოვნები |

### Users
| მეთოდი | Endpoint | აღწერა |
|--------|----------|--------|
| GET | /users?search= | მომხმარებლების ძებნა |
| GET | /users/{id} | კონკრეტული მომხმარებელი |
| GET | /me | მიმდინარე მომხმარებელი (auth) |
| GET | /profile | საკუთარი პროფილი + პოსტები (auth) |
| GET | /timeline | მეგობრების პოსტები (auth) |



## 9. Optimistic UI (Like-ის მაგალითი)

```typescript
const handleLike = async (postId: number) => {
  // 1. ჯერ UI განახლდება (optimistic)
  setPosts(prev =>
    prev.map(p =>
      p.id === postId
        ? { ...p, is_liked: !p.is_liked, likes_count: p.is_liked ? p.likes_count - 1 : p.likes_count + 1 }
        : p
    )
  );

  // 2. შემდეგ API მოთხოვნა
  try {
    await toggleLike(postId);
  } catch {
    // 3. შეცდომის შემთხვევაში ვაბრუნებთ ძველ მნიშვნელობას
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, is_liked: !p.is_liked, likes_count: p.is_liked ? p.likes_count - 1 : p.likes_count + 1 }
          : p
      )
    );
  }
};
```

---

## 10. Middleware Components

```typescript
// Auth Guard
function ProtectedRoute() {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}

// Permission Guard
function AdminRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  if (user?.role !== 'admin') return <Navigate to="/" replace />;
  return <>{children}</>;
}

// Data Fetching Middleware
function WithUser({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
```

---

## შემაჯამებელი სამუშაო (In-Class Exercise)

ააწყვეთ პატარა React + TypeScript აპლიკაცია, რომელიც:

1. აჩვენებს ყველა პოსტს (`GET /posts`)
2. საშუალებას აძლევს მომხმარებელს დალოგინდეს (`POST /login`)
3. დალოგინების შემდეგ აჩვენებს Like ღილაკს
4. აქვს ძებნის ველი მომხმარებლებისთვის (`GET /users?search=`)
