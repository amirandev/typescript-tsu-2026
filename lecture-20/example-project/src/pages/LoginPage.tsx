import { useState } from 'react'

interface LoginPageProps {
  onNavigate: (page: 'login' | 'register' | 'forgot') => void
  onLogin: (data: { email: string; password: string }) => void
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin({ email, password })
  }

  return (
    <div data-testid="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} data-testid="login-form">
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            data-testid="email-input"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            data-testid="password-input"
          />
        </div>
        <button type="submit" data-testid="login-btn">Sign In</button>
      </form>

      <div data-testid="auth-links">
        <button onClick={() => onNavigate('register')} data-testid="register-link">
          Create account
        </button>
        <button onClick={() => onNavigate('forgot')} data-testid="forgot-link">
          Forgot password?
        </button>
      </div>
    </div>
  )
}
