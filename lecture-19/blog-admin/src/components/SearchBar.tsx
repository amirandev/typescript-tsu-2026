import { useBlog } from '../context/useBlog';

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useBlog();

  return (
    <input
      type="search"
      className="search-bar"
      placeholder="Search posts by title or content..."
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
    />
  );
}
