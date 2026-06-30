import { Outlet, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const { token, logout } = useAuth()

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '1rem' }}>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        {token ? (
          <button onClick={logout} style={{ marginLeft: 'auto', cursor: 'pointer' }}>Logout</button>
        ) : (
          <Link to="/login" style={{ marginLeft: 'auto' }}>Login</Link>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
