# Pure TypeScript vs React — Form Implementation Comparison

This document compares the two projects side by side: **react-simple-form** (React Router v8) vs **pute-typescript-form** (vanilla TypeScript).

---

## 1. Project Structure

### React (framework)
```
react-simple-form/
├── app/routes/
│   ├── home.tsx          # React component
│   ├── about.tsx
│   ├── contact.tsx       # Form + server action + client live validation
│   └── register.tsx      # Form + live validation + async checks
├── app/root.tsx          # Layout with nav
├── app/routes.ts         # Route config
├── package.json          # React, React Router, Vite, Tailwind, etc.
└── react-router.config.ts
```

### Pure TS (no framework)
```
pute-typescript-form/
├── index.html            # Plain HTML pages
├── about.html
├── contact.html          # Links to dist/contact.js
├── register.html         # Links to dist/register.js
├── style.css
├── src/
│   ├── validation.ts     # Shared validation functions
│   ├── contact.ts        # DOM event handlers + validation
│   └── register.ts       # Live validation + async checks
├── dist/                 # Compiled .js output
├── tsconfig.json
└── package.json          # Only typescript devDep
```

---

## 2. Key Differences

| Aspect | React (react-simple-form) | Pure TypeScript (pute-typescript-form) |
|---|---|---|
| **Setup** | `npm create react-router@latest` — 20+ deps | `npm init` + `typescript` — 1 dev dep |
| **Routing** | Declarative: `route("contact", "routes/contact.tsx")` | Manual: `<a href="contact.html">` in every HTML file |
| **Layout** | `root.tsx` wraps all pages via `<Outlet />` | Nav bar copied into every `.html` file |
| **State** | `useState()`, `useRef()` — React tracks DOM | Manual `document.querySelector()` / `.value` |
| **Events** | `onChange`, `onSubmit` as JSX props | `addEventListener("input", ...)` in JS |
| **Form binding** | Controlled: `value={state.field}` + `onChange` setter | Uncontrolled: read `.value` on demand |
| **Live validation** | React re-renders on state change → DOM updates automatically | Must manually `.textContent = msg` and toggle `.classList` |
| **Server action** | Built-in `action()` function, `useActionData()` | Simulated with `alert()` + `window.location` |
| **Error display** | Conditional JSX: `{error && <p>{error}</p>}` | Always-present `<p data-error>` elements, toggle visibility via content |
| **Async debounce** | `useRef` + `setTimeout` | Raw `setTimeout` (same concept, manual cleanup) |
| **Build** | Vite bundles everything, HMR in dev | `tsc` compiles `.ts` → `.js`, no bundler |
| **Bundle size** | ~185 KB JS + CSS (React + Router runtime) | ~3 KB per page (compiled TS only) |

---

## 3. Same Logic, Different Boilerplate

### Validation function (identical in both)

```ts
function validate(field: string, value: string, allValues?: ...): string {
  if (field === "username" && value.length < 3)
    return "Username must be at least 3 characters";
  // ...
}
```

### Live validation on keystroke

| React | Pure TypeScript |
|---|---|
| `onChange → setState → re-render → error shows` | `addEventListener("input") → querySelector → .textContent = msg` |

**React** — you declare *what* the UI should look like for a given state; React figures out *how* to update the DOM.

**Pure TS** — you must imperatively query the DOM and update it yourself. More code, more control.

---

## 4. When to Use Which

### Use React when:
- You have complex UI with many interactive elements
- You need reusability via components
- Team productivity matters — JSX is faster to write and maintain
- You want built-in routing, SSR, server actions, etc.

### Use pure TypeScript when:
- You want zero dependencies and minimal bundle size
- You're learning how browsers actually work (DOM API, events)
- The page has simple interactions (a form or two)
- You're building a static site that needs a sprinkle of JS

---

## 5. Running Each Project

### React form
```bash
cd react-simple-form
npm install
npm run dev        # localhost:5173
```

### Pure TS form
```bash
cd pute-typescript-form
npm install
npm run build      # compiles src/ → dist/
# Open index.html in browser (no server needed)
```

> The pure TS version needs no server — just open the `.html` files directly. The React version requires a dev server because of Vite bundling and React Router SSR.
