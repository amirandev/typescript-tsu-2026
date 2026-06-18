# React Simple Form — Project Guide

## 1. Project Setup (from scratch)

This project was scaffolded with React Router v8 Framework Mode:

```bash
npm create react-router@latest react-simple-form
# choose: TypeScript + Tailwind CSS
```

**Commands to run:**

| Command | Description |
|---|---|
| `npm install` | Install all dependencies |
| `npm run dev` | Start development server at `localhost:5173` |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Generate route types + TypeScript check |

---

## 2. Project Structure

```
react-simple-form/
├── app/
│   ├── root.tsx            # Root layout — wraps every page, has nav bar
│   ├── routes.ts           # Route config — defines /, /about, /contact
│   ├── routes/
│   │   ├── home.tsx        # Home page (/)
│   │   ├── about.tsx       # About page (/about)
│   │   ├── contact.tsx     # Contact page with form (/contact)
│   │   └── register.tsx    # Registration with live validation (/register)
│   └── app.css             # Global styles (Tailwind)
├── react-router.config.ts  # React Router config (SSR on by default)
├── vite.config.ts          # Vite config
├── package.json
├── tsconfig.json
└── simple-react-form.md    # This guide
```

---

## 3. How Routing Works

Routes are defined in **`app/routes.ts`** — not with JSX `<Routes>`/`<Route>`. This is **file-based route config**.

Current setup (`app/routes.ts`):

```ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),          // /
  route("about", "routes/about.tsx"),    // /about
  route("contact", "routes/contact.tsx"), // /contact
  route("register", "routes/register.tsx"), // /register
] satisfies RouteConfig;
```

**To add more routes, import `route` and add another entry.**

**Root layout** (`app/root.tsx`):
- Renders `<html>`, `<head>`, `<body>` tags
- `<Outlet />` is where the matched route's component renders
- `<Meta />`, `<Links />`, `<Scripts />`, `<ScrollRestoration />` are React Router's built-in helpers

**Page component example** (`app/routes/home.tsx`):

```tsx
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to our site" },
  ];
}

export default function Home() {
  return (
    <main className="pt-16 pb-4">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          A simple 3-page website built with React Router v8, Vite, and
          Tailwind CSS.
        </p>
      </div>
    </main>
  );
}
```

---

## 4. How Forms + Validation Work

React Router framework mode uses a **server-action pattern** — no `useState`/`onSubmit` needed. The form page (`app/routes/contact.tsx`) combines the form, validation, and submission logic in one file:

```tsx
import { Form, useActionData, redirect } from "react-router";
import type { Route } from "./+types/contact";

// Runs on the server when the form is submitted
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const message = formData.get("message")?.toString() || "";

  const errors: Record<string, string> = {};

  if (name.length < 2)
    errors.name = "Name must be at least 2 characters";

  if (!email.includes("@") || !email.includes("."))
    errors.email = "Please enter a valid email address";

  if (message.length < 10)
    errors.message = "Message must be at least 10 characters";

  if (Object.keys(errors).length > 0) {
    return { errors }; // stays on same page, shows errors
  }

  // All good — redirect to another page
  return redirect("/about");
}

export default function Contact() {
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post" className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />
        {actionData?.errors?.name && (
          <p className="text-red-500">{actionData.errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
        {actionData?.errors?.email && (
          <p className="text-red-500">{actionData.errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={4} />
        {actionData?.errors?.message && (
          <p className="text-red-500">{actionData.errors.message}</p>
        )}
      </div>

      <button type="submit">Send</button>
    </Form>
  );
}
```

**How it flows:**

```
1. User fills form → clicks Submit
2. POST request sent to the same route
3. React Router calls your action() function
4. action() validates data
   └─ if errors → return { errors } → useActionData shows them
   └─ if valid  → return redirect(...) → navigate to next page
```

**Key points:**
- `<Form method="post">` sends a POST request to the same route
- `action()` function intercepts the request on the server (SSR)
- `request.formData()` provides form field values
- `useActionData()` returns whatever `action` returned (server → client)
- If `action` returns `{ errors }` → the page stays, errors display
- If `action` returns `redirect(...)` → browser navigates to that URL
- Always validate on the server (in `action`) — client validation is optional UX sugar

---

## 5. Live Validation (like Livewire's `wire:live`)

The **Register** page (`/register`) demonstrates real-time client-side validation. Unlike the contact form (server-only validation on submit), the register form validates **on every keystroke** — similar to Laravel Livewire's `wire:live.live`.

### How it works

```tsx
// Synchronous live validation — fires on every onChange
function handleChange(field: string, value: string | boolean) {
  const next = { ...values, [field]: value };
  setValues(next);

  const err = validate(field, value, next);
  setErrors((prev) => ({ ...prev, [field]: err }));

  // Debounced async validation (username availability)
  if (field === "username" && (value as string).length >= 3) {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const result = await checkUsernameAvailable(value as string);
      setAsyncErrors((prev) => ({ ...prev, username: result }));
    }, 600);
  }
}
```

### Key techniques

| Technique | Implementation |
|---|---|
| **Live sync validation** | `validate()` runs on every `onChange`, error message appears/disappears instantly |
| **Debounced async validation** | Username availability check runs 600ms after user stops typing (simulated server call) |
| **Visual feedback** | Border turns red on error (via dynamic `inputClass()`) |
| **Default values** | A `defaultValues` object initializes `useState`, displayed in a `<pre>` block |

### Default values explained

The form uses a plain object to define initial state:

```ts
const defaultValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",        // pre-selects the "User" <option>
  acceptTerms: false,   // checkbox starts unchecked
};
```

- Each `<input>` has `value={values.field}` so it's a **controlled component**
- The `role` select defaults to `"user"` via the `value` binding
- `acceptTerms` defaults to `false`, keeping the checkbox unchecked
- The raw `defaultValues` object is displayed in a box at the top of the form for clarity

---

## 6. Navigation

Navigation links are in the **root layout** (`app/root.tsx`):

```tsx
export default function App() {
  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/register">Register</a>
      </nav>
      <Outlet />
    </div>
  );
}
```

`<Outlet />` renders the matched route's component. The nav is visible on every page.

---

## 7. Tech Stack

| Technology | Role |
|---|---|
| React 19 | UI library |
| React Router 8 | Full-stack framework (routing + server actions) |
| Vite 8 | Build tool |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |

---

## 8. Summary

| Concept | How it works here |
|---|---|
| **Router** | `app/routes.ts` config — `index()` and `route()` |
| **Pages** | `home.tsx` (/), `about.tsx` (/about), `contact.tsx` (/contact), `register.tsx` (/register) |
| **Forms** | `<Form method="post">` + `action()` function |
| **Validation** | Server-side in `action()` (`/contact`); client-side live + server (`/register`) |
| **Navigation** | Nav bar in `root.tsx` using `<a href>` links |
| **Styling** | Tailwind CSS v4 (`@import "tailwindcss"` in `app.css`) |
| **Build** | Vite + `@react-router/dev` plugin |
| **SSR** | Enabled by default (set `ssr: false` for SPA mode) |
