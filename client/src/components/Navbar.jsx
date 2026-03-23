import { useState } from "react";
import styles from "./Navbar.module.css";

const NAV_LINKS = ["Issues", "Map", "Community", "About"];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Issues");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className={styles["navbar"]}>
        <div className={styles["navbar-inner"]}>
          <a href="#" className={styles["logo"]}>
            <div className={styles["logo-icon"]}>C</div>
            <span className={styles["logo-text"]}>CivicTrack</span>
          </a>

          <ul className={styles["nav-links"]}>
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  className={activeLink === link ? styles["active"] : ""}
                  onClick={() => setActiveLink(link)}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          <div className={styles["spacer"]} />

          <div className={styles["nav-actions"]}>
            <button className={styles["btn-signin"]}>Sign In</button>
            <button className={styles["btn-join"]}>Join CivicTrack</button>
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
              <button
                key={link}
                className={activeLink === link ? styles["active"] : ""}
                onClick={() => {
                  setActiveLink(link);
                  setMenuOpen(false);
                }}
              >
                {link}
              </button>
            ))}
            <div className={styles["mobile-actions"]}>
              <button className={styles["btn-signin"]}>Sign In</button>
              <button className={styles["btn-join"]}>Join CivicTrack</button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
