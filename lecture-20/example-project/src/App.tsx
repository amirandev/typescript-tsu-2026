import { useState } from 'react'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'

type Page = 'login' | 'register' | 'forgot'

export default function App() {
  const [page, setPage] = useState<Page>('login')
  const [message, setMessage] = useState('')

  const handleLogin = (data: { email: string; password: string }) => {
    setMessage(`Logged in as ${data.email}`)
  }

  const handleRegister = (data: { name: string; email: string; password: string }) => {
    setMessage(`Welcome ${data.name}!`)
  }

  const handleReset = (email: string) => {
    setMessage(`Reset link sent to ${email}`)
  }

  return (
    <div>
      {message && <p data-testid="app-message">{message}</p>}

      {page === 'login' && (
        <LoginPage onNavigate={setPage} onLogin={handleLogin} />
      )}
      {page === 'register' && (
        <RegisterPage onNavigate={setPage} onRegister={handleRegister} />
      )}
      {page === 'forgot' && (
        <ForgotPasswordPage onNavigate={setPage} onReset={handleReset} />
      )}
    </div>
  )
}
