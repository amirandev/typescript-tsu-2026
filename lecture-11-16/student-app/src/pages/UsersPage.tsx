import { useEffect, useState } from 'react'
import type { User } from '../types'

const BASE = 'https://courses.xrow.asia/api'

function headers() {
  return { Authorization: `Bearer ${localStorage.getItem('api_token')}` }
}

export default function UsersPage() {
  const [data, setData] = useState<User[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const q = search ? `?search=${encodeURIComponent(search)}` : ''
    fetch(`${BASE}/users${q}`, { headers: headers() })
      .then(r => r.json())
      .then(res => setData(res.data))
  }, [search])

  const handleSendRequest = async (userId: number) => {
    try {
      await fetch(`${BASE}/friend-request/${userId}`, { method: 'POST', headers: headers() })
      setData(prev => prev.map(u => u.id === userId ? { ...u, friend_request_sent: true } : u))
    } catch { /* ignore */ }
  }

  const handleAccept = async (userId: number) => {
    try {
      await fetch(`${BASE}/friend-request/${userId}/accept`, { method: 'POST', headers: headers() })
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
