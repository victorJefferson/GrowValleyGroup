import type { Metadata } from 'next';
import { Hero } from '@/components/ui/Hero';
import styles from './Legal.module.scss';
import { client } from '@/lib/sanity';
import { legalPageQuery } from '@/lib/queries';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';

export const metadata: Metadata = {
    title: {
        absolute: "Terms of Use | GrowValley Group"
    },
    description: "Read the Terms of Use for GrowValley Group's website and services.",
    openGraph: {
        title: "Terms of Use | GrowValley Group",
        description: "GrowValley Group's website terms and conditions.",
        url: "https://gv.consulting/terms-of-use",
    },
};

export default async function TermsOfUsePage() {
    let pageData = null;
    try {
        pageData = await client.fetch(legalPageQuery, { slug: "terms-of-use" });
    } catch (err) {
        console.error("Terms of Use Fetch Error:", err);
    }

    const defaultContent = (
        <div className={styles.legalContent} style={{ textAlign: 'center' }}>
            <p>These Terms of Use govern your access to and use of the GrowValley Group website, including all tools, content, and interactive features available on it.</p>
            <p>By using this site, you agree to these terms. If you do not agree, please do not use the site.</p>
            <p>This site is operated by GrowValley Group, a subsidiary of the GrowValley Group, registered in the United Arab Emirates.</p>
            <h2>WHAT THIS SITE IS FOR</h2>
            <p><strong>What this website is — and isn&apos;t.</strong></p>
            <p>This website is a general information resource about GrowValley Group, our services, and our capabilities. Nothing on this site constitutes a solicitation, offer, or recommendation to buy or sell any financial product or security.</p>
            <p>The information on this site is provided for informational purposes only. It does not constitute financial advice, investment advice, legal advice, or any other form of professional advice.</p>
            <p>If you are considering engaging GrowValley Group on a mandate, the appropriate step is to contact us directly and speak with our advisory team.</p>
        </div>
    );

    return (
        <main>
            <Hero
                isShort
                eyebrow="Legal"
                headline={pageData?.title || "Using this website means you've read this. Please do."}
                subheadline={pageData?.lastUpdated ? `Last updated: ${pageData.lastUpdated}` : "Last updated: 25 April 2026"}
                image={pageData?.heroImage ? urlFor(pageData.heroImage).url() : "/images/modern_boardroom.png"}
                hasCTA={false}
            />

            <section className="section-padding">
                <div className="container">
                    <div className={styles.legalContent} style={{ textAlign: pageData?.content ? 'left' : 'center' }}>
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
