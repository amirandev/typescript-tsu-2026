import { useState } from 'react'

interface ForgotPasswordPageProps {
  onNavigate: (page: 'login' | 'register' | 'forgot') => void
  onReset: (email: string) => void
}

export function ForgotPasswordPage({ onNavigate, onReset }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
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
          <form onSubmit={handleSubmit} data-testid="forgot-form">
            <div>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                data-testid="reset-email-input"
              />
            </div>
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
