# ლექცია 21 — OOP პრაქტიკული: JSONPlaceholder API

---

## **სლაიდი 1**
### **OOP პრინციპები JSONPlaceholder API-ს მაგალითზე**

**რას გავაკეთებთ:**
- Class-ებით ავაწყობთ API კლიენტს
- გამოვიყენებთ 4-ვე OOP პრინციპს
- ვიმუშავებთ JSONPlaceholder-ის რეალურ API-სთან

**API:** https://jsonplaceholder.typicode.com

---

## **სლაიდი 2: 4 OOP პრინციპი**

| პრინციპი | მნიშვნელობა | API მაგალითი |
|-----------|-------------|--------------|
| **Encapsulation** | მონაცემების დაცვა, მხოლოდ საჭირო ინტერფეისის გამოტანა | `private` ფილდები, `public` მეთოდები |
| **Inheritance** | ერთი კლასის მეორეზე აგება | `class UsersApi extends BaseApi` |
| **Polymorphism** | ერთი ინტერფეისი, სხვადასხვა ქცევა | `getById(id)` მუშაობს ყველა resource-ზე |
| **Abstraction** | სირთულის დამალვა, მარტივი ინტერფეისის შეთავაზება | `fetch()`-ს ვახვევთ `request()` მეთოდში |

---

## **სლაიდი 3: API Structure**

JSONPlaceholder გვაძლევს 6 resource-ს:

```
GET    /posts        → ყველა პოსტი
GET    /posts/1      → ერთი პოსტი
POST   /posts        → ახალი პოსტის შექმნა
PUT    /posts/1      → პოსტის განახლება
DELETE /posts/1      → პოსტის წაშლა

GET    /users        → ყველა მომხმარებელი
GET    /posts?userId=1 → პოსტები userId-ით
```

---

## **სლაიდი 4: Interfaces — მონაცემების ტიპები**

```typescript
interface Post {
  id: number
  userId: number
  title: string
  body: string
}

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
}

interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

interface Geo {
  lat: string
  lng: string
}
```

---

## **სლაიდი 5: Abstract Base Class — Abstraction**

```typescript
abstract class BaseApiClient {
  protected readonly baseUrl = 'https://jsonplaceholder.typicode.com'

  protected async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })

    if (!response.ok) {
      throw new ApiError(
        `Request failed: ${response.statusText}`,
        response.status
      )
    }

    return response.json()
  }

  // აბსტრაქტული — თითოეულმა კლასმა თავისი resource უნდა მიუთითოს
  abstract getResourceName(): string
}
```

**რატომ abstract?** — `BaseApiClient`-ს თავისით აზრი არ აქვს. მხოლოდ შვილობილი კლასები განსაზღვრავენ API-ს რომელ ნაწილს მიმართავენ.

---

## **სლაიდი 6: Error Class — Encapsulation**

```typescript
class ApiError extends Error {
  public readonly statusCode: number
  public readonly timestamp: Date

  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.timestamp = new Date()
  }

  get isNotFound(): boolean {
    return this.statusCode === 404
  }

  get isServerError(): boolean {
    return this.statusCode >= 500
  }
}
```

**Encapsulation:** `statusCode` და `timestamp` წაკითხვა შეიძლება, მაგრამ `ApiError`-ს შიგნით ვმართავთ. გარედან მხოლოდ `isNotFound` / `isServerError`-ს ვიყენებთ.

---

## **სლაიდი 7: PostsApi — Inheritance**

```typescript
class PostsApi extends BaseApiClient {
  getResourceName(): string {
    return 'posts'
  }

  async getAll(): Promise<Post[]> {
    return this.request<Post[]>('/posts')
  }

  async getById(id: number): Promise<Post> {
    return this.request<Post>(`/posts/${id}`)
  }

  async create(data: Omit<Post, 'id'>): Promise<Post> {
    return this.request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async update(id: number, data: Partial<Post>): Promise<Post> {
    return this.request<Post>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete(id: number): Promise<void> {
    await this.request<{}>(`/posts/${id}`, { method: 'DELETE' })
  }

  async getByUser(userId: number): Promise<Post[]> {
    return this.request<Post[]>(`/posts?userId=${userId}`)
  }
}
```

**Inheritance:** `PostsApi` მემკვიდრეობით იღებს `request`, `baseUrl`-ს. ამატებს მხოლოდ posts-ს სპეციფიკურ მეთოდებს.

---

## **სლაიდი 8: UsersApi — კიდევ ერთი მემკვიდრე**

```typescript
class UsersApi extends BaseApiClient {
  getResourceName(): string {
    return 'users'
  }

  async getAll(): Promise<User[]> {
    return this.request<User[]>('/users')
  }

  async getById(id: number): Promise<User> {
    return this.request<User>(`/users/${id}`)
  }

  async getPosts(id: number): Promise<Post[]> {
    // users/1/posts — JSONPlaceholder ამასაც უჭერს მხარს
    return this.request<Post[]>(`/users/${id}/posts`)
  }
}
```

**Inheritance-ის ძალა:** იგივე `request()` მეთოდი, მაგრამ UsersApi იყენებს `/users` endpoint-ს, PostsApi იყენებს `/posts`-ს. код-ის დუბლირება არ ხდება.

---

## **სლაიდი 9: Polymorphism მაგალითი**

```typescript
// ერთი ინტერფეისი, სხვადასხვა ქცევა
async function printResourceInfo(api: BaseApiClient): Promise<void> {
  console.log(`Fetching from: ${api.getResourceName()}`)
}

const postsApi = new PostsApi()
const usersApi = new UsersApi()

printResourceInfo(postsApi) // "Fetching from: posts"
printResourceInfo(usersApi) // "Fetching from: users"
```

**ან რეალური მაგალითი:**

```typescript
class CommentsApi extends BaseApiClient {
  getResourceName(): string {
    return 'comments'
  }

  async getByPost(postId: number): Promise<Comment[]> {
    return this.request<Comment[]>(`/comments?postId=${postId}`)
  }
}
```

---

## **სლაიდი 10: Facade — ყველაფრის გაერთიანება**

```typescript
class JsonPlaceholderApi {
  public readonly posts: PostsApi
  public readonly users: UsersApi
  public readonly comments: CommentsApi

  constructor() {
    this.posts = new PostsApi()
    this.users = new UsersApi()
    this.comments = new CommentsApi()
  }
}

// გამოყენება:
const api = new JsonPlaceholderApi()

const posts = await api.posts.getAll()
const user = await api.users.getById(1)
const comments = await api.comments.getByPost(1)
```

**Abstraction:** მომხმარებელმა არ იცის, როგორ მუშაობს `request()`, `fetch()`, error handling. უბრალოდ იძახებს `api.posts.getAll()`-ს.

---

## **სლაიდი 11: Full Example — async/await-ით**

```typescript
async function main() {
  const api = new JsonPlaceholderApi()

  try {
    // GET — ყველა პოსტი
    const allPosts = await api.posts.getAll()
    console.log(`სულ ${allPosts.length} პოსტი`)

    // GET — ერთი პოსტი
    const post = await api.posts.getById(1)
    console.log(post.title)

    // POST — ახალი პოსტი
    const newPost = await api.posts.create({
      userId: 1,
      title: 'ჩემი პირველი პოსტი',
      body: 'ეს არის OOP მაგალითი'
    })
    console.log(`შეიქმნა პოსტი ID: ${newPost.id}`)

    // PUT — განახლება
    await api.posts.update(1, { title: 'განახლებული სათაური' })

    // DELETE — წაშლა
    await api.posts.delete(1)

  } catch (error) {
    if (error instanceof ApiError && error.isNotFound) {
      console.log('404 — პოსტი ვერ მოიძებნა')
    }
  }
}

main()
```

---

## **სლაიდი 12: SOLID — Single Responsibility**

თითოეულ კლასს აქვს **ერთი პასუხისმგებლობა**:

| კლასი | პასუხისმგებლობა |
|-------|-----------------|
| `BaseApiClient` | HTTP requests + error handling |
| `PostsApi` | Posts resource-ის მართვა |
| `UsersApi` | Users resource-ის მართვა |
| `CommentsApi` | Comments resource-ის მართვა |
| `ApiError` | Error ინფორმაციის შენახვა |
| `JsonPlaceholderApi` | Facade — ყველაფრის გაერთიანება |

---

## **სლაიდი 13: Static Methods + Singleton**

```typescript
class JsonPlaceholderApi {
  private static instance: JsonPlaceholderApi

  public readonly posts: PostsApi
  public readonly users: UsersApi
  public readonly comments: CommentsApi

  private constructor() {
    this.posts = new PostsApi()
    this.users = new UsersApi()
    this.comments = new CommentsApi()
  }

  static getInstance(): JsonPlaceholderApi {
    if (!JsonPlaceholderApi.instance) {
      JsonPlaceholderApi.instance = new JsonPlaceholderApi()
    }
    return JsonPlaceholderApi.instance
  }
}

// გამოყენება:
const api = JsonPlaceholderApi.getInstance()
```

**Singleton:** გვაძლევს გარანტიას, რომ მთელ აპლიკაციაში API კლიენტის მხოლოდ ერთი ეგზემპლარი არსებობს.

---

## **სლაიდი 14: Generics-ით უფრო მოქნილი**

```typescript
abstract class BaseApiClient<T> {
  protected readonly baseUrl = 'https://jsonplaceholder.typicode.com'

  abstract getResourceName(): string

  async getAll(): Promise<T[]> {
    return this.request<T[]>(`/${this.getResourceName()}`)
  }

  async getById(id: number): Promise<T> {
    return this.request<T>(`/${this.getResourceName()}/${id}`)
  }

  protected async request<U>(endpoint: string, options?: RequestInit): Promise<U> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
    if (!response.ok) throw new ApiError('Failed', response.status)
    return response.json()
  }
}

class PostsApi extends BaseApiClient<Post> {
  getResourceName(): string { return 'posts' }
  // getAll() ავტომატურად აბრუნებს Promise<Post[]>
  // getById() ავტომატურად აბრუნებს Promise<Post>
}
```

**Generics:** `BaseApiClient<T>` — T განსაზღვრავს, რა ტიპის მონაცემს ველით API-დან.

---

## **სლაიდი 15: Summary**

| OOP პრინციპი | როგორ გამოვიყენეთ |
|--------------|-------------------|
| **Encapsulation** | `private` ფილდები, `ApiError` კლასი, `protected baseUrl` |
| **Inheritance** | `PostsApi extends BaseApiClient`, `UsersApi extends BaseApiClient` |
| **Polymorphism** | `getResourceName()` — იგივე მეთოდი, განსხვავებული შედეგი |
| **Abstraction** | `request()` შიგნით იმალება fetch, headers, error handling |

**რესურსები:**
- [JSONPlaceholder](https://jsonplaceholder.typicode.com) — უფასო API ტესტირებისთვის
- [TypeScript Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)

**პრაქტიკული რჩევა:** OOP არ ნიშნავს, რომ ყველგან კლასები უნდა გამოიყენოთ. მაგრამ API კლიენტის აწყობა კლასებით — ბუნებრივი და გავრცელებული pattern-ია.
