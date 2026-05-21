import type { Metadata } from 'next';
import { Hero } from '@/components/ui/Hero';
import styles from './Legal.module.scss';
import { client } from '@/lib/sanity';
import { legalPageQuery } from '@/lib/queries';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';

export const metadata: Metadata = {
    title: {
        absolute: "Privacy Policy | GrowValley Group"
    },
    description: "GrowValley Group is committed to protecting the privacy and security of your personal data. Read our privacy policy.",
    openGraph: {
        title: "Privacy Policy | GrowValley Group",
        description: "GrowValley Group's commitment to data privacy and security.",
        url: "https://gv.consulting/privacy-policy",
    },
};

export default async function PrivacyPolicyPage() {
    let pageData = null;
    try {
        pageData = await client.fetch(legalPageQuery, { slug: "privacy-policy" });
    } catch (err) {
        console.error("Privacy Policy Fetch Error:", err);
    }

    const defaultContent = (
        <div className={styles.legalContent}>
            <h2>1. Introduction</h2>
            <p>GrowValley Group is committed to protecting the privacy and security of your personal data. This policy outlines how we collect, use, and safeguard information provided by visitors to our website.</p>
            <h2>2. Data Collection</h2>
            <p>We collect information that you provide directly to us through the contact form, including your name and email address. We also collect anonymised usage data via cookies to improve site performance.</p>
            <h2>3. Use of Information</h2>
            <p>Your data is used solely to respond to your enquiries and to provide the services requested. We do not sell or share your personal data with third parties for marketing purposes.</p>
            <h2>4. Compliance</h2>
            <p>We maintain appropriate technical and organisational measures to ensure a level of security appropriate to the risk of data processing.</p>
            <h2>5. Contact</h2>
            <p>For questions regarding our privacy practices, please contact our compliance department at compliance@gv.consulting.</p>
        </div>
    );

    return (
        <main>
            <Hero
                eyebrow="Legal"
                headline={pageData?.title || "Privacy Policy"}
                subheadline={pageData?.lastUpdated ? `Last updated: ${pageData.lastUpdated}` : "Last updated: April 2026"}
                image={pageData?.heroImage ? urlFor(pageData.heroImage).url() : "/images/modern_boardroom.png"}
            />

            <section className="section-padding">
                <div className="container">
                    <div className={styles.legalContent}>
                        {pageData?.content ? (
                            <PortableText value={pageData.content} />
                        ) : (
                            defaultContent
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
