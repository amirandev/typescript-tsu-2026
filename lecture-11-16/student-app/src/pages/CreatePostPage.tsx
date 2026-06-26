import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BASE = 'https://courses.xrow.asia/api'

export default function CreatePostPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${BASE}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('api_token')}`,
        },
        body: JSON.stringify({ title, body }),
      })
      if (!res.ok) throw new Error()
      navigate('/posts')
    } catch {
      setError('Failed to create post')
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Create Post</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required style={{ padding: '0.5rem', fontSize: '1rem' }} />
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Body" required rows={6} style={{ padding: '0.5rem', fontSize: '1rem' }} />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit">Create Post</button>
          <button type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
