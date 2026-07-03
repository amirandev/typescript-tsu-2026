import { Link } from 'react-router-dom';
import { Post } from '../models/Post';
import { useBlog } from '../context/useBlog';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { users } = useBlog();
  const author = users.find(u => u.id === post.userId);

  return (
    <article className="post-card">
      <div className="post-card-header">
        <span className="post-category">Post #{post.id}</span>
        {author && (
          <span className="post-author">{author.name}</span>
        )}
      </div>
      <h3 className="post-title">{post.title}</h3>
      <p className="post-excerpt">{post.excerpt}</p>
      <div className="post-meta">
        <span>{post.wordCount} words</span>
        <Link to={`/post/${post.id}`} className="read-more">
          Read More →
        </Link>
      </div>
    </article>
  );
}
