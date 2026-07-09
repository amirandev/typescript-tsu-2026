import { useEffect, useState } from 'react'
import { JsonPlaceholderApi, type User } from '../api'

const api = JsonPlaceholderApi.getInstance()

export function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.users.getAll().then(setUsers).finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading users...</p>

  return (
    <div className="list-page">
      <h2>Users ({users.length})</h2>
      <div className="list">
        {users.map(user => (
          <div key={user.id} className="list-item user-card">
            <h3>{user.name}</h3>
            <p>@{user.username}</p>
            <p>{user.email}</p>
            <a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a>
          </div>
        ))}
      </div>
    </div>
  )
}
