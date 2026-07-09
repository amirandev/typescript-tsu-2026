import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { JsonPlaceholderApi, type Post } from '../api'

const api = JsonPlaceholderApi.getInstance()

export function Posts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.posts.getAll().then(setPosts).finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading posts...</p>

  return (
    <div className="list-page">
      <h2>Posts ({posts.length})</h2>
      <div className="list">
        {posts.map(post => (
          <Link to={`/posts/${post.id}`} key={post.id} className="list-item">
            <h3>{post.title}</h3>
            <p>{post.body.slice(0, 120)}...</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
