import { useEffect, useState } from 'react'
import type { User, Friendship } from '../types'

const BASE = 'https://courses.xrow.asia/api'

function headers() {
  return { Authorization: `Bearer ${localStorage.getItem('api_token')}` }
}

export default function FriendsPage() {
  const [friendList, setFriendList] = useState<User[]>([])
  const [pending, setPending] = useState<Friendship[]>([])
  const [tab, setTab] = useState<'friends' | 'pending'>('friends')

  useEffect(() => {
    fetch(`${BASE}/friends`, { headers: headers() })
      .then(r => r.json())
      .then(r => setFriendList(r.data))
    fetch(`${BASE}/friend-requests/pending`, { headers: headers() })
      .then(r => r.json())
      .then(r => setPending(r.data))
  }, [])

  const handleAccept = async (userId: number) => {
    await fetch(`${BASE}/friend-request/${userId}/accept`, { method: 'POST', headers: headers() })
    setPending(prev => prev.filter(f => f.sender_id !== userId))
    fetch(`${BASE}/friends`, { headers: headers() })
      .then(r => r.json())
      .then(r => setFriendList(r.data))
  }

  const handleReject = async (userId: number) => {
    await fetch(`${BASE}/friend-request/${userId}`, { method: 'DELETE', headers: headers() })
    setPending(prev => prev.filter(f => f.sender_id !== userId))
  }

  const handleRemove = async (userId: number) => {
    await fetch(`${BASE}/friends/${userId}`, { method: 'DELETE', headers: headers() })
    setFriendList(prev => prev.filter(f => f.id !== userId))
  }

  return (
    <div>
      <h2>Friends</h2>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button onClick={() => setTab('friends')} style={{ fontWeight: tab === 'friends' ? 'bold' : 'normal' }}>
          My Friends ({friendList.length})
        </button>
        <button onClick={() => setTab('pending')} style={{ fontWeight: tab === 'pending' ? 'bold' : 'normal' }}>
          Pending ({pending.length})
        </button>
      </div>

      {tab === 'friends' && friendList.map(u => (
        <div key={u.id} style={{ border: '1px solid #ddd', padding: '0.75rem', margin: '0.5rem 0', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong>{u.name}</strong>
          <button onClick={() => handleRemove(u.id)} style={{ color: 'red' }}>Remove</button>
        </div>
      ))}

      {tab === 'pending' && pending.map(f => (
        <div key={f.id} style={{ border: '1px solid #ddd', padding: '0.75rem', margin: '0.5rem 0', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong>{f.sender?.name}</strong>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => handleAccept(f.sender_id)}>Accept</button>
            <button onClick={() => handleReject(f.sender_id)} style={{ color: 'red' }}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  )
}
