import type { Metadata } from 'next';
import CookiePolicyContent from './CookiePolicyContent';
import { siteConfig } from '@/config/siteConfig';

export const metadata: Metadata = {
    title: {
        absolute: "Cookie Policy | GrowValley Group"
    },
    description: "GrowValley Group uses cookies to improve your experience. Read our cookie disclosure.",
    openGraph: {
        title: "Cookie Policy | GrowValley Group",
        description: "GrowValley Group cookie policy.",
        url: `${siteConfig.url}/cookie-policy`,
    },
};

export default function CookiePolicyPage() {
    return <CookiePolicyContent />;
}
