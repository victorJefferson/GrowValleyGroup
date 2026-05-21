import React from 'react';
import styles from './MaintenanceMode.module.scss';
import { siteConfig } from '../../config/siteConfig';

export function MaintenanceMode() {
  return (
    <div className={styles.maintenanceContainer}>
      <div className={styles.backgroundGrain} />

      <div className={styles.content}>
        <div className={styles.logo}>
          <img
            src="/gv-logo-white.png"
            alt={siteConfig.name}
          />
        </div>

        <div className={styles.statusIndicator}>
          <span className={styles.pulse} />
          Website Update in Progress
        </div>

        <h1 className={styles.title}>
          Under Maintenance
        </h1>

        <p className={styles.description}>
          We are currently performing scheduled maintenance to improve our website.
          We will be back online shortly. Thank you for your patience.
        </p>

        <div className={styles.footer}>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </div>
  );
}
