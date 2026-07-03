import { User } from '../models/User';

interface UserCardProps {
  user: User;
  selected: boolean;
  onSelect: (id: number | null) => void;
}

export function UserCard({ user, selected, onSelect }: UserCardProps) {
  return (
    <button
      className={`user-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(selected ? null : user.id)}
    >
      <span className="user-avatar">{user.initials}</span>
      <div className="user-info">
        <strong>{user.name}</strong>
        <small>@{user.username}</small>
      </div>
    </button>
  );
}
