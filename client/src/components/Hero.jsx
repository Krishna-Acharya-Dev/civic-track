import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className={styles["hero"]}>
      <div className={styles["hero-inner"]}>
        {}
        <div className={styles["hero-content"]}>
          <div className={styles["badge"]}>
            <span className={styles["badge-icon"]}>🏛</span>
            Citizen-Led Governance
          </div>

          <h1 className={styles["hero-title"]}>
            Community
            <br />
            <span className={styles["hero-title-blue"]}>Action Hub</span>
          </h1>

          <p className={styles["hero-subtitle"]}>
            See what's happening in your neighborhood. Real-time insights into
            civic improvements and community initiatives.
          </p>

          <div className={styles["hero-actions"]}>
            <button 
              className={styles["btn-primary"]}
              onClick={() => navigate('/map')}
            >
              View Neighborhood Map →
            </button>
            <button 
              className={styles["btn-secondary"]}
              onClick={() => navigate('/report')}
            >
              Report an Issue
            </button>
          </div>
        </div>

        {}
        <div className={styles["hero-map-card"]}>
          <div className={styles["map-card-header"]}>
            <div className={styles["map-card-title"]}>
              <span className={styles["map-pin-icon"]}>📍</span>
              Live Activity Map
            </div>
            <div className={styles["live-badge"]}>
              <span className={styles["live-dot"]} />
              LIVE UPDATES
            </div>
          </div>

          <div className={styles["map-visual"]}>
            {}
            <svg
              className={styles["map-svg"]}
              viewBox="0 0 320 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              {}
              <rect width="320" height="200" fill="#f0f4ff" rx="8" />

              {}
              <path
                d="M 60 40 Q 160 80 260 60"
                stroke="#c8d8f0"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 40 100 Q 160 120 280 90"
                stroke="#c8d8f0"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 100 160 Q 180 130 260 150"
                stroke="#c8d8f0"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M 150 30 Q 170 100 200 170"
                stroke="#c8d8f0"
                strokeWidth="2"
                fill="none"
              />

              {}
              <circle cx="120" cy="85" r="12" fill="#0040a1" />
              <circle cx="120" cy="85" r="20" fill="#0040a1" fillOpacity="0.15" />

              {}
              <circle cx="195" cy="55" r="6" fill="#4a90d9" />
              <circle cx="230" cy="75" r="6" fill="#4a90d9" />
              <circle cx="175" cy="115" r="6" fill="#4a90d9" />
              <circle cx="250" cy="100" r="6" fill="#4a90d9" />
              <circle cx="90" cy="130" r="6" fill="#4a90d9" />

              {}
              <circle cx="245" cy="155" r="8" fill="#e63946" />
              <circle cx="245" cy="155" r="14" fill="#e63946" fillOpacity="0.2" />
            </svg>

            {}
            <div className={styles["map-bottom-decor"]} />
          </div>
        </div>
      </div>
    </section>
  );
}
