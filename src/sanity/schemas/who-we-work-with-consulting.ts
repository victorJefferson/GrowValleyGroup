import { defineField, defineType } from "sanity";
import { iconList } from "../lib/iconList";

export default defineType({
    name: "who-we-work-with-consulting",
    title: "Who We Work With (Consulting)",
    type: "document",
    initialValue: {
        headline: "Who We Work With",
        description:
            "We partner with organisations where complexity, ambition, and capital decisions matter. Our work is board-level, founder-level, and long-term.",
        categories: [
            {
                title: "Established Businesses",
                description:
                    "Operating companies scaling revenue while strengthening governance.",
                iconName: "Briefcase",
            },
            {
                title: "Corporates & Enterprises",
                description:
                    "Portfolio leaders navigating complexity, stakeholder alignment, and disciplined execution.",
                iconName: "Building2",
            },
            {
                title: "Universities & Institutions",
                description:
                    "Academic innovators shaping ecosystems and long-range programmes.",
                iconName: "GraduationCap",
            },
            {
                title: "Family Offices",
                description:
                    "Families balancing wealth stewardship, mandates, and generational succession.",
                iconName: "Users",
            },
            {
                title: "Governments & Authorities",
                description:
                    "Public institutions delivering policy-critical initiatives with credible structure.",
                iconName: "Landmark",
            },
            {
                title: "Scale-Stage Startups",
                description:
                    "Ventures past early traction tightening operating rhythm ahead of institutional capital.",
                iconName: "TrendingUp",
            },
        ],
    },
    fields: [
        defineField({
            name: "headline",
            title: "Headline",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "categories",
            title: "Categories",
            description:
                "Up to six square cards with icon + headline. Supporting copy feeds SEO or screen-readers.",
            type: "array",
            validation: (Rule) => Rule.max(6),
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", title: "Title", type: "string" },
                        { name: "description", title: "Description", type: "text" },
                        {
                            name: "iconName",
                            title: "Icon Name",
                            type: "string",
                            options: { list: iconList },
                        },
                    ],
                },
            ],
        }),
    ],
});
