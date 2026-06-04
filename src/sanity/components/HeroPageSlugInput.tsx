"use client";

import { memo, useCallback } from "react";
import { set, unset, type StringInputProps } from "sanity";
import { HERO_PAGE_SLUG_OPTIONS } from "../lib/heroPageSlugs";

/**
 * Dropdown for pageSlug without Sanity's built-in options.list validator
 * (which errors when stored values are not in the schema's allowed set).
 */
export const HeroPageSlugInput = memo(function HeroPageSlugInput(props: StringInputProps) {
    const { value, onChange, readOnly, elementProps } = props;

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLSelectElement>) => {
            const next = event.currentTarget.value;
            onChange(next ? set(next) : unset());
        },
        [onChange],
    );

    const stringValue = typeof value === "string" ? value : "";

    return (
        <select
            {...elementProps}
            value={stringValue}
            onChange={handleChange}
            disabled={readOnly}
        >
            <option value="">Select a page…</option>
            {HERO_PAGE_SLUG_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.title}
                </option>
            ))}
            {stringValue && !HERO_PAGE_SLUG_OPTIONS.some((o) => o.value === stringValue) ? (
                <option value={stringValue}>{`Current: ${stringValue}`}</option>
            ) : null}
        </select>
    );
});
