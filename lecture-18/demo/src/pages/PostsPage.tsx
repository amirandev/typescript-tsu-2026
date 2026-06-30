import { useEffect, useState } from 'react'
import type { Post } from '../types'
import * as api from '../api/client'
import PostCard from '../components/PostCard'
import { useAuth } from '../context/AuthContext'

export default function PostsPage() {
  const [data, setData] = useState<{ data: Post[]; current_page: number; last_page: number; total: number } | null>(null)
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')
  const { token } = useAuth()
  const [likedPosts, setLikedPosts] = useState<Record<number, { liked: boolean; count: number }>>({})

  useEffect(() => {
    api.getPosts(page)
      .then(setData)
      .catch(() => setError('Failed to load posts'))
  }, [page])

  const handleLike = async (postId: number) => {
    if (!token) return
    try {
      const result = await api.toggleLike(postId)
      setLikedPosts(prev => ({ ...prev, [postId]: { liked: result.liked, count: result.likes_count } }))
    } catch { /* ignore */ }
  }

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!data) return <p>Loading posts...</p>

  const getPost = (post: Post) => {
    const override = likedPosts[post.id]
    if (override) {
      return { ...post, is_liked: override.liked, likes_count: override.count }
    }
    return post
  }

  return (
    <div>
      <h2>Posts ({data.total})</h2>

      {data.data.map(post => (
        <PostCard key={post.id} post={getPost(post)} onLike={handleLike} />
      ))}

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</button>
        <span>Page {data.current_page} of {data.last_page}</span>
        <button disabled={page >= data.last_page} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  )
}
