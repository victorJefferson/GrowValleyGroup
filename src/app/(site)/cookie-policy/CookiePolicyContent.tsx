"use client";

import React from "react";
import { Hero } from "@/components/ui/Hero";
import { useTrustGuard } from "trust-guard-js";
import styles from "./CookiePolicy.module.scss";

export default function CookiePolicyContent() {
  const { setBannerVisible, config } = useTrustGuard();

  return (
    <main>
      <Hero
        eyebrow="Legal"
        headline="Cookie Policy"
        subheadline="Institutional transparency regarding your digital privacy."
        image="/images/modern_boardroom.png"
      />

      <section className="section-padding">
        <div className="container">
          <div className={styles.legalContent}>
            <div className={styles.cookieToggle}>
              <div className={styles.toggleText}>
                <h4>Control your Privacy</h4>
                <p>
                  You can choose which cookies you allow us to use. Essential
                  cookies are required for the platform to function.
                </p>
              </div>
              <button
                className={styles.manageBtn}
                onClick={() => setBannerVisible(true)}
              >
                Manage Privacy Settings
              </button>
            </div>

            <h2>Overview</h2>
            <p>
              This Cookie Policy explains how GrowValley (&quot;we&quot;,
              &quot;us&quot;, and &quot;our&quot;) uses cookies and similar
              technologies to recognise you when you visit our website. It
              explains what these technologies are and why we use them, as well
              as your rights to control our use of them.
            </p>

            <h2>What are cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or
              mobile device when you visit a website. Cookies are widely used by
              website owners in order to make their websites work, or to work
              more efficiently, as well as to provide reporting information.
            </p>

            <h2>How we use cookies</h2>
            <p>
              We use first-party and third-party cookies for several reasons.
              Some cookies are required for technical reasons in order for our
              website to operate, and we refer to these as &quot;essential&quot;
              or &quot;strictly necessary&quot; cookies. Other cookies also
              enable us to track and target the interests of our users to
              enhance the experience on our online properties.
            </p>

            {Object.entries(config.categories).map(([id, cat]) => (
              <div key={id}>
                <h3>{cat.title} Cookies</h3>
                <p>{cat.description}</p>
                <table className={styles.cookieTable}>
                  <thead>
                    <tr>
                      <th>Cookie</th>
                      <th>Purpose</th>
                      <th>Duration</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>tg_consent</td>
                      <td>
                        Stores your cookie consent preferences for this site.
                      </td>
                      <td>1 Year</td>
                      <td>First Party</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}

            <h2>How can I control cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies.
              You can exercise your cookie rights by setting your preferences in
              the Cookie Consent Manager. The Cookie Consent Manager allows you
              to select which categories of cookies you accept or reject.
              Essential cookies cannot be rejected as they are strictly
              necessary to provide you with services.
            </p>
            <p>
              You can also set or amend your web browser controls to accept or
              refuse cookies. If you choose to reject cookies, you may still use
              our website though your access to some functionality and areas of
              our website may be restricted.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this Cookie Policy from time to time in order to
              reflect, for example, changes to the cookies we use or for other
              operational, legal, or regulatory reasons. Please therefore
              revisit this Cookie Policy regularly to stay informed about our
              use of cookies and related technologies.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
