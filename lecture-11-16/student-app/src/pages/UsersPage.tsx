import { useEffect, useState } from 'react'
import { users, friends } from '../api/client'
import type { User } from '../types'

export default function UsersPage() {
  const [data, setData] = useState<User[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    users.list(search).then(res => setData(res.data))
  }, [search])

  const handleSendRequest = async (userId: number) => {
    try {
      await friends.sendRequest(userId)
      setData(prev => prev.map(u => u.id === userId ? { ...u, friend_request_sent: true } : u))
    } catch { /* ignore */ }
  }

  const handleAccept = async (userId: number) => {
    try {
      await friends.acceptRequest(userId)
      setData(prev => prev.map(u => u.id === userId ? { ...u, is_friend: true, friend_request_received: false } : u))
    } catch { /* ignore */ }
  }

  return (
    <div>
      <h2>Users</h2>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by name or email..."
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem', marginBottom: '1rem' }}
      />
      {data.map(u => (
        <div key={u.id} style={{ border: '1px solid #ddd', padding: '0.75rem', margin: '0.5rem 0', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>{u.name}</strong><br />
            <small>{u.email}</small>
          </div>
          <div>
            {u.is_friend ? (
              <span>✅ Friends</span>
            ) : u.friend_request_sent ? (
              <span>⏳ Request sent</span>
            ) : u.friend_request_received ? (
              <button onClick={() => handleAccept(u.id)}>Accept Request</button>
            ) : (
              <button onClick={() => handleSendRequest(u.id)}>+ Add Friend</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
