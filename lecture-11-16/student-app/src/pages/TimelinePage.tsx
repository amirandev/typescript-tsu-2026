import { useEffect, useState } from 'react'
import type { Post } from '../types'

const BASE = 'https://courses.xrow.asia/api'

export default function TimelinePage() {
  const [data, setData] = useState<{ data: Post[]; total: number } | null>(null)

  const headers = { Authorization: `Bearer ${localStorage.getItem('api_token')}` }

  useEffect(() => {
    fetch(`${BASE}/timeline`, { headers })
      .then(r => r.json())
      .then(setData)
  }, [])

  const handleLike = async (postId: number) => {
    const res = await fetch(`${BASE}/posts/${postId}/toggle-like`, {
      method: 'POST',
      headers,
    })
    const result = await res.json()
    setData(prev => {
      if (!prev) return prev
      return { ...prev, data: prev.data.map(p => p.id === postId ? { ...p, is_liked: result.liked, likes_count: result.likes_count } : p) }
    })
  }

  if (!data) return <p>Loading timeline...</p>

  return (
    <div>
      <h2>Timeline (Friends' Posts)</h2>
      {data.data.length === 0 && <p>No posts from friends yet. Add some friends first!</p>}
      {data.data.map(post => (
        <div key={post.id} style={{ border: '1px solid #ddd', margin: '1rem 0', padding: '1rem', borderRadius: '8px' }}>
          <h3 style={{ margin: 0 }}>{post.title}</h3>
          <p style={{ color: '#555' }}>{post.body}</p>
          <small>by {post.user?.name}</small>
          <div style={{ marginTop: '0.5rem' }}>
            <button onClick={() => handleLike(post.id)}>{post.is_liked ? '♥' : '♡'} {post.likes_count}</button>
          </div>
        </div>
      ))}
    </div>
  )
}
