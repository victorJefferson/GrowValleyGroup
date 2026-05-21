import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { features } from "@/config/features";
import { client, urlFor } from "@/lib/sanity";
import { insightBySlugQuery, insightsQuery } from "@/lib/queries";
import InsightDetailContent from "./InsightDetailContent";
import { InsightItem } from "@/components/ui/InsightsCarousel";

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const insight = await client.fetch(insightBySlugQuery, { slug });

    if (!insight) {
        return {
            title: 'Insight Not Found | GrowValley Group',
        }
    }

    const previousImages = (await parent).openGraph?.images || []

    return {
        title: `${insight.title} | Insights`,
        description: insight.excerpt || "Practitioner-level perspectives on strategy, capital, and execution.",
        openGraph: {
            title: insight.title,
            description: insight.excerpt,
            url: `https://gv.consulting/insights/${slug}`,
            images: [
                insight.mainImage ? urlFor(insight.mainImage).url() : "/images/hero_model_v3.png",
                ...previousImages,
            ],
        },
    }
}

export default async function InsightPage({ params }: Props) {
    if (!features.insights) {
        redirect("/");
    }
    const { slug } = await params;
    
    let insight = null;
    let relatedInsights: InsightItem[] = [];

    try {
        const [data, related] = await Promise.all([
            client.fetch(insightBySlugQuery, { slug }),
            client.fetch(insightsQuery)
        ]);
        insight = data;
        
        relatedInsights = related.map((item: any) => ({
            id: item._id,
            title: item.title,
            date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "",
            tag: item.tag || "Insight",
            image: item.mainImage ? urlFor(item.mainImage).url() : "",
            slug: item.slug
        }));
    } catch (error) {
        console.error("Error fetching insight data on Server:", error);
    }

    if (!insight) return <div className="section-padding container">Insight not found.</div>;

    return (
        <InsightDetailContent 
            insight={insight}
            relatedInsights={relatedInsights}
        />
    );
}
