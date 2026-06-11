import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h2>Multilingual App</h2>
        </Link>
        <nav>
          <Link to="/en">EN</Link> | <Link to="/ge">GE</Link>
        </nav>
      </header>
      <hr />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
