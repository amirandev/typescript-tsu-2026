import { useState } from 'react'

interface RegisterPageProps {
  onNavigate: (page: 'login' | 'register' | 'forgot') => void
  onRegister: (data: { name: string; email: string; password: string }) => void
}

export function RegisterPage({ onNavigate, onRegister }: RegisterPageProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onRegister({ name, email, password })
  }

  return (
    <div data-testid="register-page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} data-testid="register-form">
        <div>
          <label>Name</label>
          <input
            placeholder="Enter name"
            value={name}
            onChange={e => setName(e.target.value)}
            data-testid="name-input"
          />
        </div>
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
        <button type="submit" data-testid="register-btn">Sign Up</button>
      </form>

      <button onClick={() => onNavigate('login')} data-testid="back-to-login">
        Already have an account? Login
      </button>
    </div>
  )
}
