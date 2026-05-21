import type { Metadata } from 'next';
import CompaniesContent from './CompaniesContent';

import { client } from '@/lib/sanity';
import { heroQuery, capabilitiesPageQuery, solutionsQuery, whoWeWorkWithQuery } from '@/lib/queries';

export const revalidate = 3600;

export const metadata: Metadata = {
    title: {
        absolute: "Companies | GrowValley Group",
    },
    description:
        "Strategy, capital, venture building, operations, and innovation infrastructure structured through specialized companies designed to work together.",
    openGraph: {
        title: "Companies | GrowValley Group",
        description:
            "The companies behind the GrowValley Group ecosystem.",
        url: "https://growvalley.com/companies",
    },
};

export default async function CompaniesPage() {
    let heroData = null;
    let companiesPageSettings = null;
    let solutionsData = null;
    let whoWeWorkWithData = null;

    try {
        [heroData, companiesPageSettings, solutionsData, whoWeWorkWithData] = await Promise.all([
            client.fetch(heroQuery, { pageSlug: "companies" }),
            client.fetch(capabilitiesPageQuery),
            client.fetch(solutionsQuery),
            client.fetch(whoWeWorkWithQuery)
        ]);
    } catch (err) {
        console.error("Companies Data Fetch Error:", err);
    }

    return (
        <CompaniesContent
            heroData={heroData}
            companiesPageSettings={companiesPageSettings}
            solutionsData={solutionsData}
            whoWeWorkWithData={whoWeWorkWithData}
        />
    );
}
