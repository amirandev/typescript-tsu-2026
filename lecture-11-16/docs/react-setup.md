# React + React Router — Step by Step

> This guide is for **beginners**. Every file is shown in full.  
> Follow **one step at a time**. Do NOT skip ahead.

---

## ⚡ Bonus: Redirects explained simply

A **redirect** is when you **send someone from one URL to another automatically**.

Real-life examples:
- You go to `/dashboard` but you're not logged in → **redirect** to `/login`
- You just submitted a form → **redirect** to the confirmation page
- You type an old URL that doesn't exist anymore → **redirect** to the new one
- You visit `/admin` but you're not an admin → **redirect** to `/`

React Router has **4 ways** to redirect. Here they are:

---

### Redirect Way #1 — `<Navigate>` (in JSX)

Use this when you want to redirect **inside a component's return**.

```tsx
import { Navigate } from 'react-router-dom'

function OldProfilePage() {
  // This page moved. Send everyone to the new URL.
  return <Navigate to="/profile" replace />
}
```

**What happens:**
1. User goes to `/old-profile`
2. React Router renders `<OldProfilePage />`
3. `<Navigate to="/profile" />` fires
4. User instantly lands on `/profile`

**`replace` means:** the old URL `/old-profile` is **removed from browser history**.  
If the user clicks "Back", they skip `/old-profile` entirely.

---

### Redirect Way #2 — `useNavigate()` (after an action)

Use this when you want to redirect **after something happens** (like a button click).

```tsx
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = async () => {
    await loginUser()          // pretend this logs in
    navigate('/dashboard')     // 👈 redirect to dashboard
  }

  return <button onClick={handleLogin}>Login</button>
}
```

**With `replace` (no back button to login page):**

```tsx
navigate('/dashboard', { replace: true })
```

---

### Redirect Way #3 — `navigate(-1)` (go back)

This is like clicking the browser's **back button**.

```tsx
function CancelButton() {
  const navigate = useNavigate()

  return <button onClick={() => navigate(-1)}>Go Back</button>
}
```

You can go back multiple pages:
```tsx
navigate(-2)   // go back 2 pages
navigate(-3)   // go back 3 pages
```

---

### Redirect Way #4 — Protected Route pattern (conditional)

This is the most common pattern. Check a condition, then redirect.

```tsx
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem('api_token')

  if (!isLoggedIn) {
    // 👇 Redirect to login. Don't let them in.
    return <Navigate to="/login" replace />
  }

  // 👇 They're logged in. Let them through.
  return <>{children}</>
}
```

**Usage:**
```tsx
<Route path="/dashboard" element={
  <ProtectedRoute><DashboardPage /></ProtectedRoute>
} />
```

---

### Redirect cheat sheet

| Situation | Code | What happens |
|-----------|------|-------------|
| Page moved to new URL | `<Navigate to="/new" />` | User lands on `/new` |
| After login success | `navigate('/dashboard')` | User goes to dashboard |
| After form submit | `navigate('/thanks')` | User sees thank-you page |
| User not logged in | `<Navigate to="/login" replace />` | Kicked to login |
| User clicks Cancel | `navigate(-1)` | Goes back one page |
| Don't save old page in history | `navigate('/x', { replace: true })` | Can't "back" to old page |
| Redirect inside useEffect | `navigate('/somewhere')` | Redirect on page load |

---

### Important: Never use `history.push()` or `window.location`

❌ **Wrong (old/broken way):**
```tsx
window.location.href = '/dashboard'    // reloads the whole app
history.push('/dashboard')             // doesn't exist in React Router v6
```

✅ **Right (React Router way):**
```tsx
navigate('/dashboard')                 // fast, no reload
```

**`window.location`** reloads the entire app (slow, loses state).  
**`navigate()`** just swaps the component (fast, keeps state).

---

### Full example: redirects in a real page

```tsx
import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

export default function CreatePostPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // If already submitted, redirect to /posts
  if (submitted) {
    return <Navigate to="/posts" />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('https://courses.xrow.asia/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
                 Authorization: 'Bearer ' + localStorage.getItem('api_token') },
      body: JSON.stringify({ title, body: '...' }),
    })
    navigate('/posts')   // 👈 redirect after creation
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <button type="submit">Create</button>
      <button type="button" onClick={() => navigate(-1)}>Cancel</button>
    </form>
  )
}
```

**Three redirects in one page:**
1. If already submitted → `<Navigate to="/posts" />` (declarative)
2. After form submit → `navigate('/posts')` (programmatic)
3. Cancel button → `navigate(-1)` (go back)

---

## Before we start — What is React Router?

When you type a URL in the browser, React Router checks that URL and shows the **right page**.

```
You type:  http://localhost:5173/login
React Router says:  "Oh! That's /login → show the Login page"
```

Without React Router, your whole app is one big page.  
With React Router, each URL is a **different room** in your app.

---

## Step 1 — Create a new React project

Open your terminal. Type these commands **one at a time**:

```bash
npm create vite@latest student-app -- --template react-ts
```

When it asks "Ok to proceed?", type `y` and press Enter.

```bash
cd student-app
npm install
```

✅ **Done.** You now have a blank React + TypeScript project.

To see if it works:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. You should see a Vite + React page.

---

## Step 2 — Install React Router

Stop the server (press `Ctrl + C` in the terminal). Then:

```bash
npm install react-router-dom
```

✅ **Done.** React Router is now installed.

---

## Step 3 — Look at what we have

Open the project folder in VS Code (or any editor). You'll see:

```
student-app/
 ├── src/
 │    ├── App.tsx          ← the main component
 │    ├── main.tsx         ← the entry point (starts the app)
 │    └── index.css
 ├── index.html
 ├── package.json
 └── tsconfig.json
```

We will edit **only** these files:
- `main.tsx` — wrap the app with Router
- `App.tsx` — put the route signposts here
- Create new files for each page

---

## Step 4 — Understand main.tsx

Open `src/main.tsx`. It looks like this:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**What this does:**
- `createRoot` grabs the `<div id="root">` from `index.html`
- It puts `<App />` inside that div
- `<StrictMode>` is just a helper that checks for mistakes

---

## Step 5 — Add BrowserRouter to main.tsx

`BrowserRouter` is a component that **listens to the URL**.  
Every time the URL changes, it tells React to re-check which page to show.

**Edit `src/main.tsx`** to look like this:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'   // 👈 NEW
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>     {/* 👈 NEW — wraps the whole app */}
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

✅ **Done.** Your app is now "router-aware."

---

## Step 6 — Create your first two pages

We need some pages to navigate between.  
Create a folder called `pages` inside `src`:

```
src/
 └── pages/        ← create this folder
```

Inside `pages`, create two files:

### File: `src/pages/HomePage.tsx`

```tsx
export default function HomePage() {
  return (
    <div>
      <h1>🏠 Home Page</h1>
      <p>Welcome to my app!</p>
    </div>
  )
}
```

### File: `src/pages/AboutPage.tsx`

```tsx
export default function AboutPage() {
  return (
    <div>
      <h1>📖 About Page</h1>
      <p>This app was built with React + React Router.</p>
    </div>
  )
}
```

✅ **Done.** You have two pages. But they don't show yet — we need routes.

---

## Step 7 — Add routes to App.tsx

Open `src/App.tsx`. Replace everything with:

```tsx
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  )
}
```

**Line by line explanation:**

| Line | What it does |
|------|-------------|
| `import { Routes, Route }` | Brings in the signpost pieces from React Router |
| `import HomePage` | Brings in the page component we made |
| `<Routes>` | The signpost — it checks the URL against all routes inside |
| `<Route path="/" element={<HomePage />} />` | If URL is `/`, show HomePage |
| `<Route path="/about" element={<AboutPage />} />` | If URL is `/about`, show AboutPage |

✅ **Done.** Run `npm run dev` again, and test:

- Go to `http://localhost:5173/` → you see **Home Page**
- Go to `http://localhost:5173/about` → you see **About Page**

🎉 You just did routing!

---

## Step 8 — Add navigation with Link

Right now you have to type the URL manually. That's annoying.  
Let's add **clickable links**.

Create a file `src/components/Navbar.tsx`:

```tsx
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  )
}
```

**What is `Link`?**  
It's like `<a href="...">` but **better**.  
- `<a href>` reloads the whole page (slow)  
- `<Link to>` just swaps the component (fast, smooth)

Now update `src/App.tsx` to include the Navbar:

```tsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'       // 👈 NEW
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'

export default function App() {
  return (
    <div>
      <Navbar />          {/* 👈 NEW — shows on every page */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}
```

✅ **Done.** Click "Home" and "About" in the navbar — pages switch instantly.

---

## Step 9 — Route parameters (`:id`)

Sometimes you need a **dynamic** URL.  
Imagine a blog: every post has a different ID.

```
/posts/1   →  show post #1
/posts/2   →  show post #2
/posts/99  →  show post #99
```

You don't write 99 routes. You write **one** route with a **variable**:

```tsx
<Route path="/posts/:id" element={<PostPage />} />
```

The `:id` part is a **wildcard**. It matches **any number**.

Let's try it:

### File: `src/pages/PostPage.tsx`

```tsx
import { useParams } from 'react-router-dom'

export default function PostPage() {
  const { id } = useParams()   // 👈 grabs whatever is in :id

  return (
    <div>
      <h1>📄 Post #{id}</h1>
      <p>You are viewing post number {id}.</p>
    </div>
  )
}
```

**What is `useParams`?**  
It's a React Router tool that **reads the variables from the URL**.

If URL is `/posts/5` → `useParams()` returns `{ id: "5" }`  
If URL is `/posts/99` → `useParams()` returns `{ id: "99" }`

Add the route to `App.tsx`:

```tsx
import PostPage from './pages/PostPage'   // 👈 NEW

// Inside <Routes>:
<Route path="/posts/:id" element={<PostPage />} />
```

✅ **Done.** Test:
- `http://localhost:5173/posts/7` → shows "Post #7"
- `http://localhost:5173/posts/abc` → shows "Post #abc"

---

## Step 10 — Navigate programmatically (useNavigate)

`Link` is for **clickable** navigation.  
Sometimes you want to navigate **automatically** after something happens.

Example: After a user logs in, **teleport** them to the home page.

```tsx
import { useNavigate } from 'react-router-dom'

function LoginButton() {
  const navigate = useNavigate()   // 👈 teleport power

  const handleClick = () => {
    // pretend we logged in...
    navigate('/')   // 👈 ZOOM! go to home page
  }

  return <button onClick={handleClick}>Login</button>
}
```

Other things you can do with `navigate`:

```tsx
navigate('/about')        // go to /about
navigate(-1)              // go back one page (like browser back button)
navigate('/posts', { replace: true })   // go, but don't save current page in history
```

✅ **Done.** You can now move users around after actions.

---

## Step 11 — Protected Routes (the bouncer)

Some pages should only be seen by **logged-in** users.  
You need a **bouncer** component that checks: "Do you have a token?"

Create `src/components/ProtectedRoute.tsx`:

```tsx
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // Check if user is logged in (has a token in localStorage)
  const token = localStorage.getItem('api_token')

  if (!token) {
    // NO token? Kick them to the login page
    return <Navigate to="/login" replace />
  }

  // YES token? Let them in
  return <>{children}</>
}
```

**How to use it — wrap any protected page:**

```tsx
import ProtectedRoute from './components/ProtectedRoute'

<Routes>
  {/* Public — anyone can see */}
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />

  {/* Protected — only logged-in users */}
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  } />
</Routes>
```

**What happens when someone goes to `/dashboard`:**

```
1. User goes to /dashboard
2. React Router sees the route matches
3. It renders <ProtectedRoute>
4. ProtectedRoute checks localStorage
   ├── token found? → renders <DashboardPage />  ✅
   └── no token?    → redirects to /login         🚫
```

✅ **Done.** Your app now has private rooms.

---

## Step 12 — Layout routes (share the navbar)

Putting `<Navbar />` in every page is annoying.  
React Router has a trick: **Layout routes**.

Create `src/components/Layout.tsx`:

```tsx
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <Outlet />      {/* 👈 the current page renders here */}
      </div>
    </div>
  )
}
```

**What is `Outlet`?**  
It's a placeholder. When you use a Layout route, the child page appears **inside** the layout, right where `<Outlet />` sits.

Now update `App.tsx` to use the Layout:

```tsx
import Layout from './components/Layout'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>         {/* 👈 Layout wraps everything inside */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/posts/:id" element={<PostPage />} />
      </Route>
    </Routes>
  )
}
```

**Notice:** The `Route` with `element={<Layout />}` has **no `path`**.  
It always shows. All routes **inside** it will have the Navbar.

✅ **Done.** Navbar appears on every page automatically.

---

## Step 13 — Full working example

Here is the complete `src/App.tsx` with everything we built:

```tsx
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PostPage from './pages/PostPage'
import DashboardPage from './pages/DashboardPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/posts/:id" element={<PostPage />} />

        {/* Protected */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  )
}
```

---

## Step 14 — Cheat sheet

| Goal | Code |
|------|------|
| Show a page at `/login` | `<Route path="/login" element={<LoginPage />} />` |
| Make a clickable link | `<Link to="/login">Login</Link>` |
| Teleport after action | `navigate('/home')` |
| Read `:id` from URL | `useParams().id` |
| Protect a page | Wrap in `<ProtectedRoute>` |
| Share navbar on all pages | Layout route with `<Outlet />` |
| Redirect to login | `<Navigate to="/login" replace />` |
| Go back | `navigate(-1)` |

---

## Step 15 — Common mistakes

| Mistake | Why | Fix |
|---------|-----|-----|
| Using `<a href>` instead of `<Link>` | Page reloads, slow | Use `<Link to="...">` |
| Forgetting `BrowserRouter` in main.tsx | Routes do nothing | Wrap app in `<BrowserRouter>` |
| Writing `path="login"` without `/` | Never matches | Always `path="/login"` |
| Putting `<Route>` outside `<Routes>` | Nothing shows | All `<Route>` inside `<Routes>` |
| Forgetting `export default` on page | Import error | Add `export default` to every page |

---

## Done! 🎉

You now know:

- ✅ What routing is (rooms in a house)
- ✅ How to set up `BrowserRouter` in main.tsx
- ✅ How to write `Routes` + `Route` in App.tsx
- ✅ How to navigate with `Link` and `useNavigate`
- ✅ How to use route parameters (`:id` + `useParams`)
- ✅ How to protect routes (bouncer component)
- ✅ How to use Layout routes (shared navbar)

**Next:** Add more pages. Follow the **exact same pattern**:

```
1. Create the page file in src/pages/
2. Import it in App.tsx
3. Add a <Route> inside <Routes>
4. Link to it from Navbar
```
