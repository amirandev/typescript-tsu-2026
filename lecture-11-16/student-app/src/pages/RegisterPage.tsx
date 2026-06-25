import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await register(name, email, password)
      navigate('/posts')
    } catch (err: any) {
      const msg = typeof err === 'object' ? Object.values(err).flat().join(', ') : 'Registration failed'
      setError(msg)
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
