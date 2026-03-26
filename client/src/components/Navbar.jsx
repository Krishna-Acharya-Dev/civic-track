import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userString = localStorage.getItem('user');
  const user = userString && userString !== 'undefined' ? JSON.parse(userString) : null;

  const NAV_LINKS = [
    { name: "Home", path: "/" },
    { name: "Map", path: "/map" }
  ];

  if (user) {
    NAV_LINKS.push({ name: "Report Issue", path: "/report" });
    NAV_LINKS.push({ name: "My Issues", path: "/my-issues" });
  }

  if (user && user.isAdmin) {
    NAV_LINKS.push({ name: "Dashboard", path: "/admin" });
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <nav className={styles["navbar"]}>
      <div className={styles["navbar-inner"]}>
        <Link to="/" className={styles["logo"]}>
          <div className={styles["logo-icon"]}>C</div>
          <span className={styles["logo-text"]}>CivicTrack</span>
        </Link>

        <ul className={styles["nav-links"]}>
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? styles["active"] : ""}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles["spacer"]} />

        <div className={styles["nav-actions"]}>
          {user ? (
            <button className={styles["btn-signin"]} onClick={handleLogout}>
              Logout ({user.firstname})
            </button>
          ) : (
            <Link to="/auth" className={styles["btn-signin"]}>Sign In / Join</Link>
          )}
        </div>

        <button
          className={styles["hamburger"]}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen && (
        <div className={styles["mobile-menu"]}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={location.pathname === link.path ? styles["active"] : ""}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className={styles["mobile-actions"]}>
            {user ? (
              <button className={styles["btn-signin"]} onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/auth" className={styles["btn-signin"]} onClick={() => setMenuOpen(false)}>Sign In / Join</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
