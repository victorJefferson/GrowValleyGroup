import type { Metadata } from 'next';
import CapabilitiesContent from './CapabilitiesContent';

import { client } from '@/lib/sanity';
import { heroQuery, capabilitiesPageQuery, solutionsQuery, whoWeWorkWithQuery } from '@/lib/queries';

export const metadata: Metadata = {
    title: {
        absolute: "Our Capabilities | GrowValley Group",
    },
    description:
        "Five integrated advisory capabilities — Growth, Capital, Innovation, PMO, and Family Office Setup — delivered as one accountable advisory system.",
    openGraph: {
        title: "Our Capabilities | GrowValley Group",
        description:
            "Explore GrowValley Group's integrated advisory capabilities.",
        url: "https://gv.consulting/our-capabilities",
    },
};

export default async function CapabilitiesPage() {
    let heroData = null;
    let capabilitiesPageSettings = null;
    let solutionsData = null;
    let whoWeWorkWithData = null;

    try {
        [heroData, capabilitiesPageSettings, solutionsData, whoWeWorkWithData] = await Promise.all([
            client.fetch(heroQuery, { pageSlug: "capabilities" }),
            client.fetch(capabilitiesPageQuery),
            client.fetch(solutionsQuery),
            client.fetch(whoWeWorkWithQuery)
        ]);
    } catch (err) {
        console.error("Capabilities Data Fetch Error:", err);
    }

    return (
        <CapabilitiesContent 
            heroData={heroData} 
            capabilitiesPageSettings={capabilitiesPageSettings}
            solutionsData={solutionsData}
            whoWeWorkWithData={whoWeWorkWithData}
        />
    );
}
