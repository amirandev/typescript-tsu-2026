# Passing Data to Components

## 1. Props — the basics

Props are **arguments** you pass to a component, like function parameters.

```tsx
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>
}

// Usage
<Greeting name="Alice" />
<Greeting name="Bob" />
```

**Output:**

```
Hello, Alice!
Hello, Bob!
```

---

## 2. Multiple props

```tsx
interface UserCardProps {
  name: string
  email: string
  age?: number        // optional — can omit it
}

function UserCard({ name, email, age }: UserCardProps) {
  return (
    <div>
      <strong>{name}</strong> — {email}
      {age && <span> ({age} years old)</span>}
    </div>
  )
}
```

Usage:

```tsx
<UserCard name="Alice" email="alice@test.com" age={25} />
<UserCard name="Bob" email="bob@test.com" />           {/* no age */}
```

---

## 3. Passing data down (parent → child)

```tsx
function PostList() {
  const posts = [
    { id: 1, title: 'First post' },
    { id: 2, title: 'Second post' },
  ]

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} title={post.title} id={post.id} />
      ))}
    </div>
  )
}

function PostCard({ id, title }: { id: number; title: string }) {
  return <h3><a href={`/posts/${id}`}>{title}</a></h3>
}
```

---

## 4. Passing functions as props (child → parent)

Pass a function so the child can **tell the parent something happened**:

```tsx
function Parent() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <ChildButton onAction={() => setCount(c => c + 1)} />
    </div>
  )
}

function ChildButton({ onAction }: { onAction: () => void }) {
  return <button onClick={onAction}>Increment</button>
}
```

### With a value from the child:

```tsx
function Parent() {
  const [message, setMessage] = useState('')

  return (
    <div>
      <p>Child says: {message}</p>
      <Child onMessage={msg => setMessage(msg)} />
    </div>
  )
}

function Child({ onMessage }: { onMessage: (msg: string) => void }) {
  return (
    <button onClick={() => onMessage('Hello from child!')}>
      Send message
    </button>
  )
}
```

---

## 5. The `children` prop

`children` is a special prop for passing JSX **between** the tags:

```tsx
interface BoxProps {
  title: string
  children: React.ReactNode
}

function Box({ title, children }: BoxProps) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  )
}
```

Usage:

```tsx
<Box title="Important">
  <p>This is inside the box.</p>
  <button>Click me</button>
</Box>
```

**What gets passed:**

```
<Box>                     Box receives:
  <p>...</p>        →     children = <p>...</p>
  <button>...</>           <button>...</>
</Box>
```

Common use: **middleware components** (layout, auth guard):

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('api_token')
  if (!token) return <Navigate to="/login" replace />
  return <>{children}</>
}

// Usage
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

---

## 6. Default props

```tsx
function Button({ label = 'Click me', color = 'blue' }: { label?: string; color?: string }) {
  return <button style={{ background: color }}>{label}</button>
}
```

Usage:

```tsx
<Button />                        {/* label: "Click me",    color: "blue" */}
<Button label="Save" />           {/* label: "Save",        color: "blue" */}
<Button label="Delete" color="red" />  {/* label: "Delete", color: "red" */}
```

---

## 7. Spread props

Pass all properties of an object as individual props:

```tsx
interface Post {
  id: number
  title: string
  body: string
}

function PostCard({ id, title, body }: Post) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  )
}

// Usage
const post: Post = { id: 1, title: 'Hello', body: 'World' }
<PostCard {...post} />
// Same as: <PostCard id={1} title="Hello" body="World" />
```

---

## 8. Prop drilling problem

When you pass props through many layers:

```
App → Layout → Navbar → UserAvatar
```

If `UserAvatar` needs the user, you have to pass it through every intermediate component:

```tsx
function App() {
  const [user, setUser] = useState<User | null>(null)
  return <Layout user={user} setUser={setUser} />
}

function Layout({ user, setUser }: { user: User | null; setUser: (u: User | null) => void }) {
  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Outlet />
    </div>
  )
}

function Navbar({ user, setUser }: { user: User | null; setUser: (u: User | null) => void }) {
  return (
    <nav>
      <UserAvatar user={user} setUser={setUser} />
    </nav>
  )
}
```

This is **prop drilling** — annoying and fragile. Solutions:

### Solution A: Composition (restructure)

Pass the component directly instead of data:

```tsx
function App() {
  const [user, setUser] = useState<User | null>(null)
  return (
    <Layout
      navbar={<Navbar avatar={<UserAvatar user={user} setUser={setUser} />} />}
    />
  )
}
```

### Solution B: Context (for shared global data)

```tsx
const UserContext = createContext<User | null>(null)

function App() {
  const [user, setUser] = useState<User | null>(null)
  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  )
}

// Any component can read user directly:
function UserAvatar() {
  const user = useContext(UserContext)
  return <span>{user?.name}</span>
}
```

---

## 9. Props vs State

| | Props | State |
|---|---|---|
| **Who owns it?** | Parent component | The component itself |
| **Can change?** | No (immutable) | Yes (via `setState`) |
| **Purpose** | Pass data in | Manage internal data |
| **Example** | `<Card title="Hello" />` | `const [count, setCount] = useState(0)` |

**Rule:** Data flows **down** via props. Events flow **up** via callback functions.

---

## 10. Props with fetch — real example

```tsx
// Parent fetches data and passes to child
function PostsPage() {
  const [data, setData] = useState<Post[] | null>(null)

  useEffect(() => {
    fetch('https://courses.xrow.asia/api/posts')
      .then(r => r.json())
      .then(d => setData(d.data))
  }, [])

  if (!data) return <p>Loading...</p>

  return (
    <div>
      {data.map(post => (
        <PostCard key={post.id} post={post} onLike={handleLike} />
      ))}
    </div>
  )
}

// Child receives data and a callback
function PostCard({ post, onLike }: { post: Post; onLike: (id: number) => void }) {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={() => onLike(post.id)}>
        {post.is_liked ? '♥' : '♡'} {post.likes_count}
      </button>
    </div>
  )
}
```

---

## 11. Quick reference

```tsx
// Pass a string
<Card title="Hello" />

// Pass a number
<Counter value={42} />

// Pass a boolean
<Toggle enabled={true} />

// Pass an array
<List items={[1, 2, 3]} />

// Pass an object
<UserCard user={{ name: 'Alice', email: 'a@b.com' }} />

// Pass a function
<Button onClick={() => alert('Hi!')} />

// Pass JSX (children)
<Box><p>Inner content</p></Box>

// Spread props
<PostCard {...post} />

// Optional prop
<Card title="Hi" subtitle?="optional" />
// Component: function Card({ title, subtitle }: { title: string; subtitle?: string })
```

**Summary:** Props = function parameters for components. Data goes down, functions go up.
