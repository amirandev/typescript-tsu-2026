import { useEffect, useState } from 'react'
import type { Post } from '../types'

const BASE = 'https://courses.xrow.asia/api'

export default function ProfilePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('api_token')}`,
  }

  useEffect(() => {
    fetch(`${BASE}/me`, { headers })
      .then(r => r.json())
      .then(setUser)
    fetch(`${BASE}/profile`, { headers })
      .then(r => r.json())
      .then(d => setPosts(d.data))
  }, [])

  const handleLike = async (postId: number) => {
    const res = await fetch(`${BASE}/posts/${postId}/toggle-like`, {
      method: 'POST',
      headers,
    })
    const result = await res.json()
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, is_liked: result.liked, likes_count: result.likes_count } : p))
  }

  return (
    <div>
      <h2>My Profile</h2>
      {user && <p><strong>{user.name}</strong> — {user.email}</p>}
      <h3>My Posts ({posts.length})</h3>
      {posts.map(post => (
        <div key={post.id} style={{ border: '1px solid #ddd', margin: '1rem 0', padding: '1rem', borderRadius: '8px' }}>
          <h4 style={{ margin: 0 }}>{post.title}</h4>
          <p style={{ color: '#555' }}>{post.body}</p>
          <button onClick={() => handleLike(post.id)}>{post.is_liked ? '♥' : '♡'} {post.likes_count}</button>
        </div>
      ))}
    </div>
  )
}
