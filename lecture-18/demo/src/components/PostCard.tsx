import { Link } from 'react-router-dom'
import type { Post } from '../types'

interface PostCardProps {
  post: Post
  onLike: (postId: number) => void
}

export default function PostCard({ post, onLike }: PostCardProps) {
  return (
    <div style={{ border: '1px solid #ddd', margin: '1rem 0', padding: '1rem', borderRadius: 8 }}>
      <h3 style={{ margin: '0 0 0.25rem' }}>{post.title}</h3>
      <p style={{ margin: '0 0 0.5rem', color: '#555' }}>{post.body}</p>
      <small>by {post.user?.name}</small>
      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button onClick={() => onLike(post.id)} style={{ cursor: 'pointer', border: 'none', background: 'none', fontSize: '1.1rem' }}>
          {post.is_liked ? '\u2665' : '\u2661'} {post.likes_count}
        </button>
        <Link to={`/posts/${post.id}`}>&#128488; {post.comments_count}</Link>
        <span>&#128279; {post.shares_count}</span>
      </div>
    </div>
  )
}
