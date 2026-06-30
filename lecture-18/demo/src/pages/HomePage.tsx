import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function HomePage() {
  const { user } = useAuth()

  return (
    <div>
      <h1>Welcome{user ? `, ${user.name}` : ''}!</h1>
      <p>Demo project for Lecture 18 — TypeScript + React</p>
      <Link to="/posts"><button>View Posts</button></Link>
    </div>
  )
}
