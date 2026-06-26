# Layouts, Outlet, and children in React Router

## The problem

Every page needs a navbar. You *could* put `<Navbar />` inside every single page:

```tsx
function HomePage() {
  return <div><Navbar /><h1>Home</h1></div>
}

function AboutPage() {
  return <div><Navbar /><h1>About</h1></div>
}
```

That's **duplicated code**. If you change the navbar, you have to edit every page.

## The solution: Layout route

A **Layout** is a wrapper component that:
1. Renders things that stay the same (navbar, footer)
2. Uses `<Outlet />` as a **placeholder** for the current page

```tsx
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />  {/* ← the matched child page renders HERE */}
      </main>
    </div>
  )
}
```

### How Outlet works

```
You visit:  /posts

Layout renders:         The current page renders inside Outlet:
┌──────────────────┐    ┌──────────────────┐
│  <Navbar />      │    │  <Navbar />      │
│  <Outlet /> ─────│──▶ │  ┌──────────────┐│
└──────────────────┘    │  │ PostsPage    ││
                        │  │ (list of     ││
                        │  │  posts)      ││
                        │  └──────────────┘│
                        └──────────────────┘
```

### Wiring it in App.tsx

```tsx
import Layout from './components/Layout'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>        {/* ← no path = always matches */}
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}
```

**Key detail:** The outer `<Route>` has NO `path` prop. It always renders. The inner routes are **children** — they render inside `<Outlet />`.

---

## The `children` prop in React

`children` is a **special prop** React gives every component. Whatever you put **between** opening and closing tags becomes `children`.

```tsx
<Box>Hello</Box>
// Box receives: children = "Hello"

<Box><span>Hi</span></Box>
// Box receives: children = <span>Hi</span>
```

### How ProtectedRoute uses children

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('api_token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>   // ← render the protected page
}
```

Used like this:

```tsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <DashboardPage />
  </ProtectedRoute>
} />
```

What happens:
1. React Router matches `/dashboard`
2. It renders `<ProtectedRoute>`
3. `children` = `<DashboardPage />`
4. If logged in → renders `{children}` → shows the dashboard
5. If not logged in → redirects to `/login`

### children vs Outlet — what's the difference?

| | `children` | `<Outlet />` |
|---|---|---|
| **Who provides it** | You manually pass it between tags | React Router injects it automatically |
| **Used with** | Any React component | Layout routes in React Router |
| **Example** | `<Box><p>Hi</p></Box>` | `<Route element={<Layout />}>` with child routes |

**Rule of thumb:**
- Use **`children`** when a component wraps something you explicitly pass
- Use **`<Outlet />`** when React Router should decide what goes there based on the URL

---

## Multiple layouts

You can have **different layouts for different sections**:

```tsx
<Routes>
  {/* Public layout — navbar + footer */}
  <Route element={<PublicLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
  </Route>

  {/* Dashboard layout — sidebar + top bar */}
  <Route element={<DashboardLayout />}>
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/settings" element={<SettingsPage />} />
  </Route>

  {/* Auth pages — minimal (no navbar) */}
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
</Routes>
```

Each layout gets its own `<Outlet />`.

---

## Nested routes with params

You can nest a route with `:id` inside a layout:

```tsx
<Route element={<Layout />}>
  <Route path="/posts" element={<PostsPage />} />
  <Route path="/posts/:id" element={<PostDetailPage />} />
</Route>
```

Both `/posts` and `/posts/5` share the same navbar from Layout.

---

## Visual summary

```
App.tsx                     Layout.tsx
┌─────────────────┐        ┌─────────────────┐
│ <Routes>        │        │ <div>           │
│   <Route        │        │   <Navbar />    │
│     element={   │        │   <Outlet /> ───│──▶ PostsPage
│     <Layout />} │        │ </div>          │
│   >             │        └─────────────────┘
│     <Route      │
│       path="/   │
│       posts"    │
│       element=  │
│     {PostsPage} │
│     />          │
│   </Route>      │
│ </Routes>       │
└─────────────────┘
```

- `<Routes>` picks the right route from the URL
- The outer `<Route>` renders `<Layout />`
- `<Layout />` renders navbar + `<Outlet />`
- `<Outlet />` is replaced by the matched child page

---

## Quick reference

```tsx
<Outlet />             // Placeholder for child routes in a layout
children               // Prop: content between component tags
<Route element={X}>    // Route that renders X (for layouts)
<Route path="..." />   // Route that matches a URL
```

```tsx
// Layout pattern
<Route element={<Layout />}>
  <Route path="/x" element={<PageX />} />
</Route>

// children (bouncer) pattern
<Route path="/secret" element={
  <ProtectedRoute><SecretPage /></ProtectedRoute>
} />
```
