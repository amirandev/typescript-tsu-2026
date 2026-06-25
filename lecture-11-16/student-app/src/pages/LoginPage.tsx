import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/posts')
    } catch (err: any) {
      setError(err.error || 'Login failed. Check your email and password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Login</h2>
      <p>Use <strong>student@test.com</strong> / <strong>password</strong></p>

      {error && <p style={{ color: 'red', background: '#ffe0e0', padding: '0.5rem', borderRadius: '4px' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '0.5rem', fontSize: '1rem' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        No account? <Link to="/register">Register here</Link>
      </p>
    </div>
  )
}
