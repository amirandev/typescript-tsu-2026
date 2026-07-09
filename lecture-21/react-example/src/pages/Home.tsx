import { useEffect, useState } from 'react'
import { JsonPlaceholderApi } from '../api'

const api = JsonPlaceholderApi.getInstance()

export function Home() {
  const [stats, setStats] = useState({ posts: 0, users: 0 })

  useEffect(() => {
    async function load() {
      const [posts, users] = await Promise.all([
        api.posts.getAll(),
        api.users.getAll(),
      ])
      setStats({ posts: posts.length, users: users.length })
    }
    load()
  }, [])

  return (
    <div className="home">
      <h2>OOP Principles with JSONPlaceholder</h2>

      <div className="cards">
        <div className="card">
          <h3>Encapsulation</h3>
          <p>API details hidden inside classes. Call <code>api.posts.getAll()</code> without worrying about fetch, headers, or error handling.</p>
        </div>

        <div className="card">
          <h3>Inheritance</h3>
          <p><code>PostsApi</code>, <code>UsersApi</code>, and <code>CommentsApi</code> all extend <code>BaseApiClient</code>, sharing the <code>request()</code> method.</p>
        </div>

        <div className="card">
          <h3>Polymorphism</h3>
          <p>Each subclass implements <code>getResourceName()</code> differently. The same method call produces different results.</p>
        </div>

        <div className="card">
          <h3>Abstraction</h3>
          <p><code>BaseApiClient</code> hides fetch logic, headers, and error handling. Consumers only see simple methods like <code>getAll()</code>.</p>
        </div>
      </div>

      <div className="stats">
        <span>Posts: <strong>{stats.posts}</strong></span>
        <span>Users: <strong>{stats.users}</strong></span>
      </div>
    </div>
  )
}
