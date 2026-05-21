import React from 'react';
import styles from './CapabilitiesLeader.module.scss';

interface CapabilitiesLeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  image: string;
  name: string;
  designation: string;
}

export function CapabilitiesLeader({
  eyebrow = "The Leadership",
  title,
  description,
  image,
  name,
  designation
}: CapabilitiesLeaderProps) {
  return (
    <section className={styles.leaderSection}>
      <div className="container">
        <div className={styles.leaderGrid}>
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <img
                src={image}
                alt={name}
                className={styles.leaderImage}
              />
            </div>
          </div>
          <div className={styles.contentColumn}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>
              {description}
            </p>
            <div className={styles.profileInfo}>
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.designation}>{designation}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
