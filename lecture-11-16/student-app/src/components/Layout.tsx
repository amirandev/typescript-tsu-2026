import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
        <Outlet />
      </div>
    </div>
  )
}
