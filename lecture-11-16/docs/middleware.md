# Middleware Components in React

A **middleware component** wraps another component to add logic before rendering — like a bouncer, a decorator, or a pipeline stage.

```
Route → Middleware → Page
```

---

## 1. The basic pattern: wrapper component with `children`

A middleware component receives `children` (the page) and decides what to do:

```tsx
import type { ReactNode } from 'react'

function MyMiddleware({ children }: { children: ReactNode }) {
  // ... check conditions, fetch data, transform props
  return <>{children}</>
}
```

---

## 2. Auth guard (`ProtectedRoute`)

Checks if the user is logged in. If not, redirects to login.

```tsx
import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem('api_token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
```

Used in `App.tsx`:

```tsx
<Route path="/profile" element={
  <ProtectedRoute>
    <ProfilePage />
  </ProtectedRoute>
} />
```

**What happens:**

```
User visits /profile
  → React Router matches the route
  → Renders <ProtectedRoute>
    → Checks localStorage for token
      ├── has token? → renders <ProfilePage />  ✅
      └── no token?  → redirects to /login      🚫
```

### With loading state

If you fetch the user asynchronously, add a loading state:

```tsx
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setToken(localStorage.getItem('api_token'))
    setLoading(false)
  }, [])

  if (loading) return <div>Loading...</div>
  if (!token) return <Navigate to="/login" replace />
  return <>{children}</>
}
```

---

## 3. Layout wrapper (shared UI)

A layout is a middleware that adds persistent UI around every page:

```tsx
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Outlet />   {/* ← the matched page renders here */}
      </main>
    </div>
  )
}
```

Wired in `App.tsx` with a **parent route** (no `path`):

```tsx
<Routes>
  <Route element={<Layout />}>       {/* ← always matches */}
    <Route path="/" element={<HomePage />} />
    <Route path="/posts" element={<PostsPage />} />
    <Route path="/profile" element={
      <ProtectedRoute><ProfilePage /></ProtectedRoute>
    } />
  </Route>
</Routes>
```

You can nest middleware — the page passes through both:

```
Route → Layout (navbar) → ProtectedRoute (auth check) → ProfilePage
```

---

## 4. Data-fetching middleware

Fetch data before rendering the page. Useful for shared data like "current user":

```tsx
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '../types'

const BASE = 'https://courses.xrow.asia/api'

export default function WithUser({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('api_token')
    if (!token) {
      setLoading(false)
      return
    }
    fetch(`${BASE}/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading user...</div>
  return (
    <div>
      {user && <p>Logged in as {user.name}</p>}
      {children}
    </div>
  )
}
```

---

## 5. Permission guard

Check a specific permission or role before showing content:

```tsx
interface PermissionGuardProps {
  children: ReactNode
  requiredRole: 'admin' | 'moderator' | 'user'
}

export default function PermissionGuard({ children, requiredRole }: PermissionGuardProps) {
  const userRole = getUserRole()  // from context, localStorage, or API

  const roles = { admin: 3, moderator: 2, user: 1 }

  if (roles[userRole] < roles[requiredRole]) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
```

Usage:

```tsx
<Route path="/admin" element={
  <ProtectedRoute>
    <PermissionGuard requiredRole="admin">
      <AdminPage />
    </PermissionGuard>
  </ProtectedRoute>
} />
```

---

## 6. Error boundary middleware

Catch errors in child components and show a fallback:

```tsx
import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Middleware caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Try refreshing.</h2>
    }
    return this.props.children
  }
}
```

---

## 7. Middleware pipeline

Middleware components compose. A route with multiple middleware:

```tsx
<Route path="/dashboard" element={
  <ErrorBoundary>
    <ProtectedRoute>
      <WithUser>
        <DashboardPage />
      </WithUser>
    </ProtectedRoute>
  </ErrorBoundary>
} />
```

Execution order (like Express/Koa middleware):

```
Request comes in
  → ErrorBoundary (catches errors from below)
    → ProtectedRoute (check auth)
      → WithUser (fetch user data)
        → DashboardPage (actual page)
```

---

## 8. Visual summary

```
                    ┌─────────────┐
                    │  App.tsx    │
                    │  <Routes>   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  Layout     │  ← middleware: adds navbar
                    │  <Outlet /> │
                    └──────┬──────┘
                           │
                    ┌──────▼────────┐
                    │  ProtectedRoute │  ← middleware: checks auth
                    │  {children}   │
                    └──────┬────────┘
                           │
                    ┌──────▼──────┐
                    │  WithUser   │  ← middleware: fetches user
                    │  {children} │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  ProfilePage│  ← the actual page
                    └─────────────┘
```

Each middleware can:
- ✅ Let the request through (render `{children}`)
- 🚫 Block and redirect (`<Navigate>`)
- ⏳ Show a loading state
- 🔄 Transform or add data

---

## 9. Comparison with other patterns

| Pattern | What it does | Example |
|---------|-------------|---------|
| **Middleware (wrapper)** | Wraps children, adds logic | `<ProtectedRoute><Page /></ProtectedRoute>` |
| **Layout** | Shared UI via `<Outlet />` | `<Route element={<Layout />}>` |
| **HOC** | Function that returns a new component | `withAuth(Page)` |
| **Render prop** | Passes data via a function prop | `<DataProvider>{data => <Page data={data} />}</DataProvider>` |

React Router uses **middleware components** natively — the `<Route element={...}>` and `<Route>` parent/child pattern is middleware by design.

---

## 10. Quick reference

```tsx
// Auth guard
<ProtectedRoute><Page /></ProtectedRoute>

// Layout
<Route element={<Layout />}>
  <Route path="/x" element={<PageX />} />
</Route>

// Data fetcher
<WithUser><Page /></WithUser>

// Permission check
<PermissionGuard requiredRole="admin"><Page /></PermissionGuard>

// Error boundary
<ErrorBoundary><Page /></ErrorBoundary>

// Composed pipeline
<ErrorBoundary>
  <ProtectedRoute>
    <WithUser>
      <Page />
    </WithUser>
  </ProtectedRoute>
</ErrorBoundary>
```
