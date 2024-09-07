import { Link, Outlet } from 'react-router-dom';
import './Layout.css'

const Layout = () => {
  return (
    <>
      <header>
        <nav className="navbar">
        <Link to="/" className="logo-link"> <h1 className="logo">MediaShare</h1>  </Link>
          <div className="nav-links">
            <Link to="/upload" className="nav-button">Upload File</Link>
            <Link to="/view-uploads" className="nav-button">View Uploads</Link>
            <Link to="/manage-downloads" className="nav-button">Manage Downloads</Link>
          </div>
          <div className="auth-buttons">
            <button className="login-button">Login</button>
            <button className="signup-button">Sign Up</button>
          </div>
        </nav>
      </header>

      {/* This is where the page content will be rendered */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
