# ლექცია 20 — UI Testing: Auth Pages

---

## **სლაიდი 1**
### **UI Testing: Login, Register, Forgot Password**

---

## **სლაიდი 2: Real Talk**

**ვამოწმებთ მარტივ რაღაცებს:**
- გვერდი იხსნება? → `toBeInTheDocument()`
- ლინკზე დაჭერა მუშაობს? → `userEvent.click()`
- ველში ჩაწერა მუშაობს? → `userEvent.type()`
- ღილაკზე დაჭერა მუშაობს? → `click()`

**3 გვერდი:**
1. Login → email + password + submit + links to register/forgot
2. Register → name + email + password + submit + back to login
3. Forgot Password → email + submit + success message + back to login

**Setup:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

---

## **სლაიდი 3: Login Page — Objects**

```typescript
export function LoginPage({ onNavigate, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin({ email, password })
  }

  return (
    <div data-testid="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} data-testid="login-form">
        <input placeholder="Enter email" data-testid="email-input"
          value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Enter password"
          data-testid="password-input"
          value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" data-testid="login-btn">Sign In</button>
      </form>

      <button onClick={() => onNavigate('register')} data-testid="register-link">
        Create account
      </button>
      <button onClick={() => onNavigate('forgot')} data-testid="forgot-link">
        Forgot password?
      </button>
    </div>
  )
}
```

**Test: page renders**
```typescript
it('shows Login page by default', () => {
  render(<App />)
  expect(screen.getByTestId('login-page')).toBeInTheDocument()
  expect(screen.getByText('Login')).toBeInTheDocument()
})
```

---

## **სლაიდი 4: Login Page — Filling Fields**

```typescript
it('typing in email field works', async () => {
  const user = userEvent.setup()
  render(<App />)

  const input = screen.getByTestId('email-input')
  await user.type(input, 'test@example.com')

  expect(input).toHaveValue('test@example.com')
})

it('typing in password field works', async () => {
  const user = userEvent.setup()
  render(<App />)

  const input = screen.getByTestId('password-input')
  await user.type(input, 'mypassword')

  expect(input).toHaveValue('mypassword')
})

it('filling fields and clicking submit shows message', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.type(screen.getByTestId('email-input'), 'test@example.com')
  await user.type(screen.getByTestId('password-input'), '123456')
  await user.click(screen.getByTestId('login-btn'))

  expect(screen.getByTestId('app-message'))
    .toHaveTextContent('Logged in as test@example.com')
})
```

---

## **სლაიდი 5: Clicking Links — Page Navigation**

```typescript
it('clicking "Create account" navigates to Register', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByTestId('register-link'))

  expect(screen.getByTestId('register-page')).toBeInTheDocument()
  expect(screen.getByText('Register')).toBeInTheDocument()
})

it('clicking "Forgot password?" navigates to Forgot page', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByTestId('forgot-link'))

  expect(screen.getByTestId('forgot-page')).toBeInTheDocument()
  expect(screen.getByText('Forgot Password')).toBeInTheDocument()
})

it('from Register page, click back to Login', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByTestId('register-link'))
  await user.click(screen.getByTestId('back-to-login'))

  expect(screen.getByTestId('login-page')).toBeInTheDocument()
})
```

---

## **სლაიდი 6: Register Page**

```typescript
export function RegisterPage({ onNavigate, onRegister }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div data-testid="register-page">
      <h1>Register</h1>
      <form data-testid="register-form">
        <input placeholder="Enter name" data-testid="name-input" ... />
        <input placeholder="Enter email" data-testid="email-input" ... />
        <input type="password" placeholder="Enter password" data-testid="password-input" ... />
        <button type="submit" data-testid="register-btn">Sign Up</button>
      </form>
      <button onClick={() => onNavigate('login')} data-testid="back-to-login">
        Already have an account? Login
      </button>
    </div>
  )
}
```

**Tests:**
```typescript
it('shows name, email, password fields', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByTestId('register-link'))

  expect(screen.getByTestId('name-input')).toBeInTheDocument()
  expect(screen.getByTestId('email-input')).toBeInTheDocument()
  expect(screen.getByTestId('password-input')).toBeInTheDocument()
})

it('filling all fields and submitting shows welcome message', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByTestId('register-link'))
  await user.type(screen.getByTestId('name-input'), 'John')
  await user.type(screen.getByTestId('email-input'), 'john@test.com')
  await user.type(screen.getByTestId('password-input'), 'pass123')
  await user.click(screen.getByTestId('register-btn'))

  expect(screen.getByTestId('app-message'))
    .toHaveTextContent('Welcome John!')
})
```

---

## **სლაიდი 7: Forgot Password Page**

```typescript
export function ForgotPasswordPage({ onNavigate, onReset }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onReset(email)
    setSent(true)
  }

  return (
    <div data-testid="forgot-page">
      <h1>Forgot Password</h1>

      {sent
        ? <p data-testid="success-msg">Reset link sent to {email}</p>
        : (
          <form data-testid="forgot-form">
            <input placeholder="Enter your email" data-testid="reset-email-input" ... />
            <button type="submit" data-testid="reset-btn">Send Reset Link</button>
          </form>
        )
      }

      <button onClick={() => onNavigate('login')} data-testid="back-to-login">
        Back to Login
      </button>
    </div>
  )
}
```

**Tests:**
```typescript
it('shows email field and submit button', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByTestId('forgot-link'))

  expect(screen.getByTestId('reset-email-input')).toBeInTheDocument()
  expect(screen.getByTestId('reset-btn')).toBeInTheDocument()
})

it('filling email and submitting shows success message', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByTestId('forgot-link'))
  await user.type(screen.getByTestId('reset-email-input'), 'user@test.com')
  await user.click(screen.getByTestId('reset-btn'))

  expect(screen.getByTestId('success-msg'))
    .toHaveTextContent('Reset link sent to user@test.com')
})
```

---

## **სლაიდი 8: Test File Conventions**

### **სად შევინახოთ ტესტ ფაილები?**

**ვარიანტი 1 (რეკომენდებული) — კომპონენტის გვერდით:**
```
src/
├── components/
│   ├── LoginPage.tsx
│   ├── LoginPage.test.tsx      # ← ტესტი იმავე ფოლდერში
│   ├── RegisterPage.tsx
│   ├── RegisterPage.test.tsx
│   ├── ForgotPasswordPage.tsx
│   └── ForgotPasswordPage.test.tsx
```

**ვარიანტი 2 — ცალკე `__tests__` ფოლდერი:**
```
src/
├── components/
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
└── __tests__/
    ├── LoginPage.test.tsx      # ← ტესტები გამოყოფილი
    └── RegisterPage.test.tsx
```

> **რატომ გვერდით?** — import-ის მოკლე path, ხედავ რა აქვს ტესტი, ფოლდერი არ იბნევა.

---

### **რა ექსთენშია (დასახელება)?**

| Pattern | მაგალითი | ახსნა |
|---------|-----------|-------|
| `*.test.tsx` | `LoginPage.test.tsx` | **✅ რეკომენდებული** — Vitest-ი default-ად ეძებს |
| `*.spec.tsx` | `LoginPage.spec.tsx` | ალტერნატივა, тоже მუშაობს |
| `*.test.ts` | `utils.test.ts` | თუ არა React კომპონენტი (pure functions) |

`test.tsx` vs `test.ts`:
- **`.test.tsx`** — როცა ტესტში JSX / React კომპონენტებია (`render(<LoginPage />)`)
- **`.test.ts`** — როცა ტესტავთ ლოგიკას / helper ფუნქციებს JSX-ის გარეშე

---

### **როგორ გავუშვათ?**

```bash
npm test                      # watch mode — auto-rerun on change
npx vitest run                # run once (CI/CD-სთვის)
npx vitest run --coverage     # coverage report (lines/branches/functions)
npx vitest run App            # App.test.tsx — კონკრეტული ფაილი
npx vitest run src/pages/     # pages/ ფოლდერის ყველა ტესტი
npx vitest run -t "Login"     # ტესტები სათაურით "Login"
npx vitest run -t "navigat"   # case-insensitive partial match
```

**Vitest Config** (`vitest.config.ts` ან `vite.config.ts`-ში):
```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,                    // describe, it, expect — გლობალურად
    environment: 'jsdom',             // DOM-ის მოკი (browser-ის სიმულაცია)
    setupFiles: './src/test/setup.ts', // jest-dom matchers-ის ჩატვირთვა
  },
})
```

**setup.ts** (`src/test/setup.ts`):
```typescript
import '@testing-library/jest-dom'
```

---

## **სლაიდი 9: Commands**

```bash
npm test                    # watch mode
npx vitest run              # run once
npx vitest --ui             # browser GUI
npx vitest run App          # specific file
npx vitest run -t "Login"   # specific test name
npx vitest run -t "navigat" # case insensitive
```

---

## **სლაიდი 10: Summary**

**რას ვამოწმებთ:**
| Test | Code |
|------|------|
| Page renders | `getByTestId('login-page').toBeInTheDocument()` |
| Link click | `userEvent.click(getByTestId('register-link'))` |
| Type in field | `userEvent.type(input, 'text')` |
| Check field value | `expect(input).toHaveValue('text')` |
| Button click | `userEvent.click(getByTestId('login-btn'))` |
| Text appears after action | `getByTestId('app-message').toHaveTextContent('...')` |
| Page changed after click | `getByTestId('register-page').toBeInTheDocument()` |

**ფაილების სტრუქტურა:**
```
src/
├── App.tsx                    # მართავს page navigation-ს
├── App.test.tsx               # 16 test
├── pages/
│   ├── LoginPage.tsx          # email + password + submit + links
│   ├── RegisterPage.tsx       # name + email + password + submit
│   └── ForgotPasswordPage.tsx # email + submit + success message
└── test/setup.ts              # jest-dom import
```
