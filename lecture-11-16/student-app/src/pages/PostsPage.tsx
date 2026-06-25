import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { posts, likes } from '../api/client'
import type { Post } from '../types'

export default function PostsPage() {
  const [data, setData] = useState<{ data: Post[]; current_page: number; last_page: number; total: number } | null>(null)
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')

  useEffect(() => {
    posts.list(page).then(setData).catch(() => setError('Failed to load posts'))
  }, [page])

  const handleLike = async (postId: number) => {
    try {
      const res = await likes.toggle(postId)
      setData(prev => {
        if (!prev) return prev
        return {
          ...prev,
          data: prev.data.map(p =>
            p.id === postId ? { ...p, is_liked: res.liked, likes_count: res.likes_count } : p
          ),
        }
      })
    } catch { /* ignore */ }
  }

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!data) return <p>Loading posts...</p>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Posts ({data.total})</h2>
        <Link to="/create-post"><button>+ New Post</button></Link>
      </div>

      {data.data.map(post => (
        <div key={post.id} style={{ border: '1px solid #ddd', margin: '1rem 0', padding: '1rem', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 0.25rem' }}>{post.title}</h3>
          <p style={{ margin: '0 0 0.5rem', color: '#555' }}>{post.body}</p>
          <small>by {post.user?.name}</small>
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button onClick={() => handleLike(post.id)} style={{ cursor: 'pointer', border: 'none', background: 'none', fontSize: '1.1rem' }}>
              {post.is_liked ? '♥' : '♡'} {post.likes_count}
            </button>
            <Link to={`/posts/${post.id}`}>💬 {post.comments_count}</Link>
            <span>🔗 {post.shares_count}</span>
          </div>
        </div>
      ))}

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</button>
        <span style={{ padding: '0.25rem 0.5rem' }}>Page {data.current_page} of {data.last_page}</span>
        <button disabled={page >= data.last_page} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  )
}
