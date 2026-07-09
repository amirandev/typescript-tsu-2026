import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { JsonPlaceholderApi, ApiError, type Post, type Comment } from '../api'

const api = JsonPlaceholderApi.getInstance()

export function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    async function load() {
      try {
        const [postData, commentData] = await Promise.all([
          api.posts.getById(Number(id)),
          api.comments.getByPost(Number(id)),
        ])
        setPost(postData)
        setComments(commentData)
      } catch (err) {
        if (err instanceof ApiError && err.isNotFound) {
          setError('Post not found')
        } else {
          setError('Failed to load post')
        }
      }
    }
    load()
  }, [id])

  if (error) {
    return (
      <div className="error-page">
        <h2>{error}</h2>
        <Link to="/posts">Back to posts</Link>
      </div>
    )
  }

  if (!post) return <p>Loading...</p>

  return (
    <div className="detail-page">
      <Link to="/posts">← Back to posts</Link>
      <h2>{post.title}</h2>
      <p className="body">{post.body}</p>

      <h3>Comments ({comments.length})</h3>
      <div className="comments">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <strong>{comment.name}</strong>
            <span className="email">{comment.email}</span>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
