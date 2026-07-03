import { useBlog } from '../context/useBlog';
import { PostCard } from '../components/PostCard';
import { UserCard } from '../components/UserCard';
import { SearchBar } from '../components/SearchBar';
import { Post } from '../models/Post';

export function HomePage() {
  const { posts, users, loading, error, filteredPosts, selectedUserId, setSelectedUserId } = useBlog();

  if (loading) {
    return <div className="loading">Loading posts & users...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home-layout">
      <main className="content">
        <header className="page-header">
          <h1>Blog Dashboard</h1>
          <p>
            OOP მაგალითი: ApiClient (აბსტრაქტული), PostRepository, UserRepository,
            PostQuery (method chaining), Config (Singleton)
          </p>
          <SearchBar />
        </header>

        <div className="stats-bar">
          <span>Total posts: {posts.length}</span>
          <span>Filtered: {filteredPosts.length}</span>
          <span>Users: {users.length}</span>
          {selectedUserId !== null && (
            <button className="clear-filter" onClick={() => setSelectedUserId(null)}>
              Clear filter
            </button>
          )}
        </div>

        <section className="post-grid">
          {(filteredPosts as Post[]).map(post => (
            <PostCard key={post.id} post={post} />
          ))}
          {filteredPosts.length === 0 && (
            <p className="no-results">No posts match your filters.</p>
          )}
        </section>
      </main>

      <aside className="sidebar">
        <h2>Authors</h2>
        <div className="user-list">
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              selected={selectedUserId === user.id}
              onSelect={setSelectedUserId}
            />
          ))}
        </div>
      </aside>
    </div>
  );
}
