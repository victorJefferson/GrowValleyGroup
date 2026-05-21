import { CompanyPageContent } from "./CompanyPageContent";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { client } from "@/lib/sanity";
import {
    pillarQuery,
    heroQuery,
    serviceCategoriesQuery,
    siteSettingsQuery,
    insightsQuery,
} from "@/lib/queries";
import { features } from "@/config/features";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    const pillarData = await client.fetch(pillarQuery, { slug }).catch(() => null);

    if (pillarData) {
        return {
            title: `${pillarData.title} | GrowValley Group`,
            description: pillarData.positioningText || `Learn more about ${pillarData.title}.`,
        };
    }

    return { title: "Page Not Found" };
}

export async function generateStaticParams() {
    const companies = await client.fetch(serviceCategoriesQuery).catch(() => []);
    return (companies || []).map((c: any) => ({ slug: c.slug }));
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let pillarData = null;
    let heroData = null;
    let siteSettings = null;

    try {
        [pillarData, heroData, siteSettings] = await Promise.all([
            client.fetch(pillarQuery, { slug }).catch(() => null),
            client.fetch(heroQuery, { pageSlug: slug }).catch(() => null),
            client.fetch(siteSettingsQuery).catch(() => null),
        ]);
    } catch (error) {
        console.error("Error fetching company data from Sanity:", error);
    }

    let insightsCarousel: unknown[] = [];
    if (pillarData && features.insights) {
        try {
            insightsCarousel = await client.fetch(insightsQuery);
        } catch {
            insightsCarousel = [];
        }
    }

    if (pillarData) {
        return (
            <CompanyPageContent
                pillarData={pillarData}
                heroData={heroData}
                trustedByLine={siteSettings?.trustedByLine}
                insightsCarousel={insightsCarousel}
            />
        );
    }

    notFound();
}
