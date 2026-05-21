import { defineField, defineType } from "sanity";

export default defineType({
    name: "team-consulting",
    title: "Team Members (Consulting)",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "role",
            title: "Role",
            type: "string",
        }),
        defineField({
            name: "image",
            title: "Profile Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Principal", value: "principal" },
                    { title: "Advisory Team (leadership page)", value: "advisory" },
                    { title: "Staff", value: "staff" },
                    {
                        title: "Operations / team page (GrowValley specialists)",
                        value: "operations",
                    },
                ],
            },
            initialValue: "advisory",
        }),
    ],
});
