import { useContext } from 'react';
import { BlogContext, type BlogContextType } from './BlogContext';

export function useBlog(): BlogContextType {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error('useBlog must be used within BlogProvider');
  return ctx;
}
