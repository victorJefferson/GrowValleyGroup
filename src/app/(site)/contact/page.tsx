import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
    title: {
        absolute: "Contact Us | GrowValley Group"
    },
    description:
        "Get in touch with GrowValley Group for strategy, capital advisory, innovation programs, PMO, and family office setup.",
    openGraph: {
        title: "Contact Us | GrowValley Group",
        description: "Connect with the GrowValley Group team.",
        url: "https://gv.consulting/contact",
    },
};

export default function ContactPage() {
    return <ContactContent />;
}
