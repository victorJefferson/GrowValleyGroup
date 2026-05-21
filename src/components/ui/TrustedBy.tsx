import React from "react";
import styles from "./TrustedBy.module.scss";

interface TrustedByProps {
    line?: string;
    className?: string;
}

/**
 * Single-line "Trusted by …" tagline rendered below page heroes.
 * Sourced from `siteSettings-consulting.trustedByLine`.
 */
export function TrustedBy({ line, className }: TrustedByProps) {
    if (!line) return null;
    return (
        <div className={`${styles.trustedBy} ${className ?? ""}`}>
            <div className="container">
                <p>— {line}</p>
            </div>
        </div>
    );
}
