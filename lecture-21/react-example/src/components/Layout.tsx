import { NavLink, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="layout">
      <header>
        <h1>JSONPlaceholder OOP Client</h1>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
