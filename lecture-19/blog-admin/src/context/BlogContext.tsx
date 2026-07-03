import { createContext, useState, useEffect, useRef, type ReactNode } from 'react';
import { Config } from '../services/Config';
import { PostRepository } from '../services/PostRepository';
import { UserRepository } from '../services/UserRepository';
import { Post } from '../models/Post';
import { User } from '../models/User';
import { PostQuery } from '../services/PostQuery';

Config.configure('https://jsonplaceholder.typicode.com');

export interface BlogContextType {
  posts: Post[];
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUserId: number | null;
  setSelectedUserId: (id: number | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredPosts: Post[];
  refreshPosts: () => Promise<void>;
}

export const BlogContext = createContext<BlogContextType | null>(null);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const postRepoRef = useRef(new PostRepository());
  const userRepoRef = useRef(new UserRepository());

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [fetchedPosts, fetchedUsers] = await Promise.all([
          postRepoRef.current.getAll(),
          userRepoRef.current.getAll(),
        ]);
        setPosts(fetchedPosts);
        setUsers(fetchedUsers);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const refreshPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedPosts = await postRepoRef.current.getAll();
      setPosts(fetchedPosts);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to refresh');
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = (() => {
    let query = new PostQuery(posts);

    if (selectedUserId !== null) {
      query = query.whereUserId(selectedUserId);
    }

    if (searchQuery) {
      query = query
        .whereTitleContains(searchQuery)
        .whereBodyContains(searchQuery);
    }

    return query.execute();
  })();

  return (
    <BlogContext.Provider
      value={{
        posts,
        users,
        loading,
        error,
        selectedUserId,
        setSelectedUserId,
        searchQuery,
        setSearchQuery,
        filteredPosts,
        refreshPosts,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}
