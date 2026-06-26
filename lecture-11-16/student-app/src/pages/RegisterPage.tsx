import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import type { AuthResponse } from '../types'

const BASE = 'https://courses.xrow.asia/api'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, password_confirmation: password }),
      })
      const data: AuthResponse = await res.json()
      if (!res.ok) {
        setError((data as any).message || Object.values(data).flat().join(', ') || 'Registration failed')
        return
      }
      localStorage.setItem('api_token', data.token)
      navigate('/posts')
    } catch {
      setError('Registration failed')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red', background: '#ffe0e0', padding: '0.5rem', borderRadius: '4px' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required style={{ padding: '0.5rem', fontSize: '1rem' }} />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required type="email" style={{ padding: '0.5rem', fontSize: '1rem' }} />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required type="password" style={{ padding: '0.5rem', fontSize: '1rem' }} />
        <button type="submit" style={{ padding: '0.5rem', fontSize: '1rem' }}>Register</button>
      </form>
      <p style={{ marginTop: '1rem' }}>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}
