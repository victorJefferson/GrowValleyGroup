import type { Metadata } from 'next';
import { Hero } from '@/components/ui/Hero';
import styles from './Legal.module.scss';

export const metadata: Metadata = {
    title: {
        absolute: "Disclaimer | GrowValley Group"
    },
    description: "Important information regarding the informational nature of the GrowValley Group website.",
    openGraph: {
        title: "Disclaimer | GrowValley Group",
        description: "Important notice and informational disclaimer for visitors.",
        url: "https://gv.consulting/disclaimer",
    },
};

export default function DisclaimerPage() {
    return (
        <main>
            <Hero
                eyebrow="Legal"
                headline="Disclaimer"
                subheadline="Last updated: April 2026"
                image="/images/modern_boardroom.png"
            />

            <section className="section-padding">
                <div className="container">
                    <div className={styles.legalContent}>
                        <h2>1. Important Notice</h2>
                        <p>
                            The information on this website is published by GrowValley Group for general informational purposes only. It does not constitute an offer, invitation, or solicitation to buy or sell any investment, security, or financial instrument in any jurisdiction.
                            <br /><br />
                            Nothing on this website constitutes financial, legal, tax, or investment advice of any kind. GrowValley Group provides advisory services only and does not represent that it holds licences or regulatory approvals as a fund manager or investment entity in all jurisdictions in which this website may be accessed.
                            <br /><br />
                            All users are advised to review the relevant local regulations before engaging with the firm.
                            <br /><br />
                            GrowValley Group reserves the right to amend the content of this website at any time without notice.
                        </p>

                        <h2>2. Modification</h2>
                        <p>
                            GrowValley Group reserves the right to amend the content of this website at any time without notice.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
