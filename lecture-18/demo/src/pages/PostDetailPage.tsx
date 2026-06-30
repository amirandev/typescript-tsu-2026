import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Post } from '../types'
import * as api from '../api/client'

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    api.getPost(id)
      .then(setPost)
      .catch(() => setError('Post not found'))
  }, [id])

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!post) return <p>Loading...</p>

  return (
    <div>
      <button onClick={() => navigate(-1)} style={{ cursor: 'pointer', marginBottom: '1rem' }}>&larr; Back</button>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <small>by {post.user?.name}</small>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <span>{post.is_liked ? '\u2665' : '\u2661'} {post.likes_count}</span>
        <span>&#128488; {post.comments_count}</span>
        <span>&#128279; {post.shares_count}</span>
      </div>
    </div>
  )
}
