import styles from "./Footer.module.css";

const PLATFORM_LINKS = ["Issues", "Map", "Community", "About"];
const SUPPORT_LINKS  = ["Help Center", "Contact", "Accessibility"];


const SOCIAL_ICONS = [
  {
    label: "Twitter / X",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L2.25 2.25h6.988l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.104-.253-.447-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.547 1.377.203 2.394.1 2.647.641.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {}
        <div className={styles.brand}>
          <a href="#" className={styles.logo}>
            <div className={styles.logoIcon}>C</div>
            <span className={styles.logoText}>CivicTrack</span>
          </a>
          <p className={styles.tagline}>
            The digital town hall. Empowering citizens through transparency and
            collective action.
          </p>
          {}
          <div className={styles.socials}>
            {SOCIAL_ICONS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className={styles.socialLink}
                aria-label={s.label}
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        {}
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Platform</h4>
            <ul className={styles.linkList}>
              {PLATFORM_LINKS.map((l) => (
                <li key={l}>
                  <a href="#" className={styles.link}>{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h4 className={styles.groupTitle}>Support</h4>
            <ul className={styles.linkList}>
              {SUPPORT_LINKS.map((l) => (
                <li key={l}>
                  <a href="#" className={styles.link}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © 2024 CivicTrack. The Digital Town Hall.
        </p>
        <div className={styles.bottomLinks}>
          <a href="#" className={styles.link}>Privacy Policy</a>
          <a href="#" className={styles.link}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
