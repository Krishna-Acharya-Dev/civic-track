import styles from "./Stats.module.css";

const STATS = [
  { number: "5,000+", label: "Issues Resolved" },
  { number: "20+",    label: "Active Districts" },
  { number: "12k",    label: "Active Citizens"  },
  { number: "14h",    label: "Avg. Response"    },
];

export default function Stats() {
  return (
    <section className={styles.stats}>
      <div className={styles.inner}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.card}>
            <span className={styles.number}>{stat.number}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}