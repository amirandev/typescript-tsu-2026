import { useEffect, useState } from 'react'
import { posts, likes } from '../api/client'
import type { Post } from '../types'

export default function TimelinePage() {
  const [data, setData] = useState<{ data: Post[]; total: number } | null>(null)

  useEffect(() => {
    posts.timeline().then(setData)
  }, [])

  const handleLike = async (postId: number) => {
    const res = await likes.toggle(postId)
    setData(prev => {
      if (!prev) return prev
      return { ...prev, data: prev.data.map(p => p.id === postId ? { ...p, is_liked: res.liked, likes_count: res.likes_count } : p) }
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
