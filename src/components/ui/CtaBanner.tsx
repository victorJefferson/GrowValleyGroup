import Link from "next/link";
import { Button } from "@/components/ui/Button";
import styles from "./CtaBanner.module.scss";

interface CtaBannerProps {
    headline: string;
    description?: string;
    ctaLabel?: string;
    ctaHref?: string;
    className?: string;
}

export function CtaBanner({
    headline,
    description,
    ctaLabel = "Talk to Our Advisor",
    ctaHref = "/contact",
    className,
}: CtaBannerProps) {
    return (
        <section className={`${styles.ctaBanner} ${className ?? ""}`}>
            <div className={styles.ctaBannerPanel}>
                <h2 className={styles.headline}>{headline}</h2>
                {description && <p className={styles.description}>{description}</p>}
                <Link href={ctaHref}>
                    <Button size="lg" variant="secondary">
                        {ctaLabel}
                    </Button>
                </Link>
            </div>
        </section>
    );
}
