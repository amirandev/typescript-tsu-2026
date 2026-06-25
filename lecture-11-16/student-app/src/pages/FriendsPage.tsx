import { useEffect, useState } from 'react'
import { friends } from '../api/client'
import type { User, Friendship } from '../types'

export default function FriendsPage() {
  const [friendList, setFriendList] = useState<User[]>([])
  const [pending, setPending] = useState<Friendship[]>([])
  const [tab, setTab] = useState<'friends' | 'pending'>('friends')

  useEffect(() => {
    friends.list().then(r => setFriendList(r.data))
    friends.pendingRequests().then(r => setPending(r.data))
  }, [])

  const handleAccept = async (userId: number) => {
    await friends.acceptRequest(userId)
    setPending(prev => prev.filter(f => f.sender_id !== userId))
    friends.list().then(r => setFriendList(r.data))
  }

  const handleReject = async (userId: number) => {
    await friends.rejectRequest(userId)
    setPending(prev => prev.filter(f => f.sender_id !== userId))
  }

  const handleRemove = async (userId: number) => {
    await friends.remove(userId)
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
