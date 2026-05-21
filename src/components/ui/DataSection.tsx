import styles from "./DataSection.module.scss";
import { CountUp } from "./CountUp";

interface Stat {
  prefix?: string;
  number: number;
  suffix?: string;
  label: string;
}

interface DataSectionProps {
  headline: string;
  description: string;
  stats: Stat[];
}

export const DataSection = ({ headline, description, stats }: DataSectionProps) => {
  return (
    <section className={`${styles.dataSection}`}>
      <div className={styles.dataSectionInner}>
        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <h2 className={styles.headline}>{headline}</h2>
            <p className={styles.description}>{description}</p>
          </div>
          <div className={styles.rightColumn}>
            {stats && stats.map((stat, idx) => (
              <div key={idx} className={styles.statItem}>
                <span className={styles.statValue}>
                  <CountUp 
                    prefix={stat.prefix} 
                    end={stat.number} 
                    suffix={stat.suffix} 
                  />
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
