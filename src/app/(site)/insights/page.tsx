import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { features } from "@/config/features";
import { client } from "@/lib/sanity";
import {
    featuredInsightQuery,
    editorsPickQuery,
    insightsQuery,
    allInsightsQuery,
} from '@/lib/queries';
import InsightsContent from "./InsightsContent";

export const metadata: Metadata = {
    title: {
        absolute: "Insights | GrowValley Group"
    },
    description:
        "Perspectives on strategy, capital, innovation, and execution from the GrowValley Group team.",
    openGraph: {
        title: "Insights | GrowValley Group",
        description:
            "Perspectives on strategy, capital, innovation, and execution.",
        url: "https://gv.consulting/insights",
        images: [
            {
                url: "/images/growvalleyworks.png",
                width: 1200,
                height: 630,
                alt: "GrowValley Group Insights",
            },
        ],
    },
};

export default async function InsightsPage() {
    if (!features.insights) {
        redirect("/");
    }
    let featured = null;
    let editorsPicks = [];
    let latest = [];
    let allInsights = [];

    try {
        [featured, editorsPicks, latest, allInsights] = await Promise.all([
            client.fetch(featuredInsightQuery),
            client.fetch(editorsPickQuery),
            client.fetch(insightsQuery),
            client.fetch(allInsightsQuery),
        ]);
    } catch (error) {
        console.error("Error fetching Insights CMS data on Server:", error);
    }

    return (
        <InsightsContent
            featured={featured}
            editorsPicks={editorsPicks || []}
            latest={latest || []}
            allInsights={allInsights || []}
        />
    );
}
