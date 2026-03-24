import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Join the Movement</p>

        <h2 className={styles.heading}>
          Ready to make a <br className={styles.br} />
          difference?
        </h2>

        <p className={styles.description}>
          Join over 12,000 citizens who are actively shaping the future of their
          city. Register today to report issues, support neighbors, and track
          progress.
        </p>

        <button className={styles.btn}>Join CivicTrack</button>
      </div>
    </section>
  );
}
