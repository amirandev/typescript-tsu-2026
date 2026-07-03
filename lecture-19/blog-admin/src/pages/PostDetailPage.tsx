import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PostRepository } from '../services/PostRepository';
import { Post } from '../models/Post';
import type { Comment } from '../models/Comment';
import { useBlog } from '../context/useBlog';

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { users } = useBlog();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const repo = new PostRepository();
    const postId = Number(id);

    setLoading(true);
    setError(null);

    Promise.all([
      repo.getById(postId),
      repo.getComments(postId),
    ])
      .then(([fetchedPost, fetchedComments]) => {
        setPost(fetchedPost);
        setComments(fetchedComments);
      })
      .catch(e => {
        setError(e instanceof Error ? e.message : 'Failed to load post');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div className="error">Post not found</div>;

  const author = users.find(u => u.id === post.userId);

  return (
    <div className="post-detail">
      <Link to="/" className="back-link">← Back to Posts</Link>

      <article className="post-content">
        <h1>{post.title}</h1>
        {author && (
          <p className="post-author-info">
            By <strong>{author.name}</strong> (@{author.username})
          </p>
        )}
        <div className="post-body">
          {post.body.split('\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="post-stats">
          <span>Word count: {post.wordCount}</span>
        </div>
      </article>

      <section className="comments-section">
        <h2>Comments ({comments.length})</h2>
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <strong>{comment.name}</strong>
              <span className="comment-email">{comment.email}</span>
            </div>
            <p>{comment.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
