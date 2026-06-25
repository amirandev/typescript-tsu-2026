import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '0.75rem 1rem', borderBottom: '1px solid #ddd', alignItems: 'center' }}>
      <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none' }}>🏠 Home</Link>

      {user ? (
        <>
          <Link to="/posts" style={{ textDecoration: 'none' }}>Posts</Link>
          <Link to="/timeline" style={{ textDecoration: 'none' }}>Timeline</Link>
          <Link to="/profile" style={{ textDecoration: 'none' }}>Profile</Link>
          <Link to="/users" style={{ textDecoration: 'none' }}>Users</Link>
          <Link to="/friends" style={{ textDecoration: 'none' }}>Friends</Link>
          <span style={{ marginLeft: 'auto' }}>{user.name}</span>
          <button onClick={handleLogout} style={{ marginLeft: '0.5rem' }}>Logout</button>
        </>
      ) : (
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </nav>
  )
}
