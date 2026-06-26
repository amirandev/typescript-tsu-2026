import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Post } from '../types'

const BASE = 'https://courses.xrow.asia/api'

function token() {
  return localStorage.getItem('api_token')
}

export default function PostDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [commentBody, setCommentBody] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    fetch(`${BASE}/posts/${id}`)
      .then(r => r.json())
      .then(setPost)
      .catch(() => setError('Post not found'))
  }, [id])

  const handleLike = async () => {
    if (!post) return
    const res = await fetch(`${BASE}/posts/${post.id}/toggle-like`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token()}` },
    })
    const result = await res.json()
    setPost(prev => prev ? { ...prev, is_liked: result.liked, likes_count: result.likes_count } : prev)
  }

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!post || !commentBody.trim()) return
    const res = await fetch(`${BASE}/posts/${post.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ body: commentBody }),
    })
    const result = await res.json()
    setPost(prev => prev ? { ...prev, comments: [...(prev.comments || []), result.comment], comments_count: prev.comments_count + 1 } : prev)
    setCommentBody('')
  }

  const handleShare = async () => {
    if (!post) return
    const res = await fetch(`${BASE}/posts/${post.id}/share`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ platform: 'facebook' }),
    })
    const result = await res.json()
    setPost(prev => prev ? { ...prev, shares_count: result.shares_count } : prev)
  }

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!post) return <p>Loading...</p>

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>← Back</button>

      <div style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <small>by {post.user?.name}</small>

        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <button onClick={handleLike}>{post.is_liked ? '♥' : '♡'} {post.likes_count}</button>
          <button onClick={handleShare}>🔗 Share ({post.shares_count})</button>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Comments ({post.comments_count})</h3>

        <form onSubmit={handleComment} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <input value={commentBody} onChange={e => setCommentBody(e.target.value)} placeholder="Write a comment..." required style={{ flex: 1, padding: '0.5rem' }} />
          <button type="submit">Post</button>
        </form>

        {post.comments?.map(c => (
          <div key={c.id} style={{ borderBottom: '1px solid #eee', padding: '0.75rem 0' }}>
            <strong>{c.user?.name}:</strong> {c.body}
          </div>
        ))}
      </div>
    </div>
  )
}
