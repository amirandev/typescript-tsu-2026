import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1>📚 Student App</h1>
      <p>A demo React app that consumes the Student REST API.</p>

      {user ? (
        <div>
          <p>Welcome back, <strong>{user.name}</strong>!</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
            <Link to="/posts"><button>📰 Posts</button></Link>
            <Link to="/timeline"><button>⏱ Timeline</button></Link>
            <Link to="/profile"><button>🙋 Profile</button></Link>
            <Link to="/users"><button>🔍 Users</button></Link>
            <Link to="/friends"><button>👥 Friends</button></Link>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
          <Link to="/login"><button>Login</button></Link>
          <Link to="/register"><button>Register</button></Link>
        </div>
      )}
    </div>
  )
}
