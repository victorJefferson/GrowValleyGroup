"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Contact.module.scss";
import Turnstile from "react-turnstile";

interface FormData {
    fullName: string;
    emailAddress: string;
    phoneNumber: string;
    country: string;
    enquiryType: string;
    message: string;
    marketingConsent: boolean;
    captchaConfirmed: string;
}

const locations = [
    "United Arab Emirates", "Saudi Arabia", "Kuwait", "Bahrain", "Qatar", "Oman",
    "United Kingdom", "United States", "Singapore", "India", "Other"
];

const areasOfInterest = [
    "Establish",
    "Operate",
    "Manage",
    "Expand",
    "General Enquiry"
];

export default function ContactContent() {
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        country: "",
        enquiryType: "",
        message: "",
        marketingConsent: false,
        captchaConfirmed: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? target.checked : value,
        }));
        if (errors[name as keyof FormData]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        if (!formData.fullName) newErrors.fullName = "Full name is required.";
        if (!formData.emailAddress) newErrors.emailAddress = "Email address is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress))
            newErrors.emailAddress = "Please enter a valid email address.";
        if (!formData.country) newErrors.country = "Please select your country.";
        if (!formData.enquiryType) newErrors.enquiryType = "Please select what you are enquiring about.";
        if (!formData.message) newErrors.message = "Please enter a message.";
        if (!formData.captchaConfirmed) newErrors.captchaConfirmed = "Please confirm the CAPTCHA.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        setErrors({});

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setShowSuccess(true);
            } else {
                setErrors((prev) => ({
                    ...prev,
                    message: result.error || "Something went wrong. Please try again or contact support directly.",
                }));
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setErrors((prev) => ({
                ...prev,
                message: "Could not connect to the server. Please check your internet connection.",
            }));
        } finally {
            setSubmitting(false);
        }
    };

    const [isNarrow, setIsNarrow] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsNarrow(window.innerWidth < 380);
        };
        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const closeSuccess = () => {
        setShowSuccess(false);
        setFormData({
            fullName: "", emailAddress: "", phoneNumber: "",
            country: "", enquiryType: "", message: "",
            marketingConsent: false, captchaConfirmed: "",
        });
        setErrors({});
    };

    const offices = [
        {
            name: "Dubai Head Office",
            address: "GrowValley Group Offices\nDubai, United Arab Emirates",
            phone: "+971 50 169 6971",
            email: "reach@growvalley.co"
        }
    ];

    return (
        <>
            <div className={styles.contactPage}>
                <div className="container">
                    {/* Breadcrumb */}
                    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                        <Link href="/">Home</Link>
                        <span>/</span>
                        <span>Contact Us</span>
                    </nav>

                    {/* Two-column layout */}
                    <div className={styles.twoColumnGrid}>

                        {/* ── Left Dark Panel ── */}
                        <aside className={styles.leftPanel}>
                            <h1 className={styles.leftHeadline}>
                                We&apos;re easy to reach.
                            </h1>
                            <p className={styles.leftDescription}>
                                If you have a question, want to talk specifics, or just want to understand what we do, get in touch. You&apos;ll hear directly from one of our advisors.
                            </p>

                            <div className={styles.leftDivider} />

                            <p className={styles.leftContactTitle} style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
                                OUR LOCATIONS
                            </p>

                            {offices.map((office, idx) => (
                                <div key={idx} className={styles.leftContactGroup} style={{ marginBottom: '2rem' }}>
                                    <p className={styles.leftContactTitle}>{office.name}</p>
                                    <div className={styles.leftContactBody}>
                                        <p style={{ whiteSpace: 'pre-line' }}>{office.address}</p>
                                        {office.phone && <p style={{ marginTop: '0.5rem' }}>Phone: <a href={`tel:${office.phone.replace(/\s/g, '')}`}>{office.phone}</a></p>}
                                        {office.email && <p>Email: <a href={`mailto:${office.email}`}>{office.email}</a></p>}
                                    </div>
                                </div>
                            ))}
                        </aside>

                        {/* ── Right Form Panel ── */}
                        <section className={styles.rightPanel}>
                            <h2 className={styles.formEyebrow} style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                Prefer to write?
                            </h2>
                            <p className={styles.formLead}>
                                Use the form below and we&apos;ll come back to you. If it&apos;s urgent, Email us.
                            </p>

                            <form
                                className={styles.form}
                                onSubmit={handleSubmit}
                                noValidate
                                id="contact-form"
                            >
                                {/* Row 1: Full name + Email Address */}
                                <div className={styles.formRow}>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label} htmlFor="fullName">
                                            Full Name<span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            className={styles.input}
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            autoComplete="name"
                                        />
                                        {errors.fullName && (
                                            <span style={{ fontSize: "0.78rem", color: "#c0392b", marginTop: "0.2rem" }}>
                                                {errors.fullName}
                                            </span>
                                        )}
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label} htmlFor="emailAddress">
                                            Email Address<span className={styles.required}>*</span>
                                        </label>
                                        <input
                                            id="emailAddress"
                                            name="emailAddress"
                                            type="email"
                                            className={styles.input}
                                            value={formData.emailAddress}
                                            onChange={handleChange}
                                            autoComplete="email"
                                        />
                                        {errors.emailAddress && (
                                            <span style={{ fontSize: "0.78rem", color: "#c0392b", marginTop: "0.2rem" }}>
                                                {errors.emailAddress}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Row 2: Phone number + Country */}
                                <div className={styles.formRow}>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label} htmlFor="phoneNumber">
                                            Phone Number
                                        </label>
                                        <input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="tel"
                                            className={styles.input}
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            autoComplete="tel"
                                        />
                                    </div>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label} htmlFor="country">
                                            Country<span className={styles.required}>*</span>
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            className={styles.select}
                                            value={formData.country}
                                            onChange={handleChange}
                                        >
                                            <option value="">Please Select</option>
                                            {locations.map((loc) => (
                                                <option key={loc} value={loc}>{loc}</option>
                                            ))}
                                        </select>
                                        {errors.country && (
                                            <span style={{ fontSize: "0.78rem", color: "#c0392b", marginTop: "0.2rem" }}>
                                                {errors.country}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Row 3: Enquiry type (full width) */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="enquiryType">
                                        What are you enquiring about?<span className={styles.required}>*</span>
                                    </label>
                                    <select
                                        id="enquiryType"
                                        name="enquiryType"
                                        className={styles.select}
                                        value={formData.enquiryType}
                                        onChange={handleChange}
                                    >
                                        <option value="">Please Select</option>
                                        {areasOfInterest.map((area) => (
                                            <option key={area} value={area}>{area}</option>
                                        ))}
                                    </select>
                                    {errors.enquiryType && (
                                        <span style={{ fontSize: "0.78rem", color: "#c0392b", marginTop: "0.2rem" }}>
                                            {errors.enquiryType}
                                        </span>
                                    )}
                                </div>

                                {/* Row 4: Message textarea (full width) */}
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="message">
                                        Message<span className={styles.required}>*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className={styles.textarea}
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={5}
                                    />
                                    {errors.message && (
                                        <span style={{ fontSize: "0.78rem", color: "#c0392b", marginTop: "0.2rem" }}>
                                            {errors.message}
                                        </span>
                                    )}
                                </div>

                                {/* Marketing consent checkbox */}
                                <div className={styles.checkboxGroup}>
                                    <input
                                        id="marketingConsent"
                                        name="marketingConsent"
                                        type="checkbox"
                                        className={styles.checkbox}
                                        checked={formData.marketingConsent}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="marketingConsent" className={styles.checkboxLabel}>
                                        Yes, I agree to receive GrowValley communications. I can unsubscribe or update my choices at any time.
                                    </label>
                                </div>

                                {/* Legal text */}
                                <p className={styles.legalText}>
                                    By clicking submit, I agree that GrowValley may contact me regarding my request and related services featured on this page, and that my personal information will be stored and processed in accordance with GrowValley&apos;s{" "}
                                    <Link href="/privacy-policy">Privacy Notice</Link>.
                                </p>

                                {/* real Cloudflare Turnstile */}
                                <div className={styles.captchaWrapper}>
                                    <Turnstile
                                        sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
                                        size={isNarrow ? "compact" : "normal"}
                                        onVerify={(token) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                captchaConfirmed: token,
                                            }));
                                            if (errors.captchaConfirmed) {
                                                setErrors((prev) => ({ ...prev, captchaConfirmed: undefined }));
                                            }
                                        }}
                                    />
                                </div>
                                {errors.captchaConfirmed && (
                                    <span style={{ fontSize: "0.78rem", color: "#c0392b", marginTop: "-0.75rem", display: "block" }}>
                                        {errors.captchaConfirmed}
                                    </span>
                                )}

                                {/* Submit button */}
                                <div>
                                    <button
                                        type="submit"
                                        id="contact-submit"
                                        className={styles.submitBtn}
                                        disabled={submitting}
                                    >
                                        {submitting ? "Submitting…" : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>

            {/* ─── Success Modal ─── */}
            {showSuccess && (
                <div className={styles.successOverlay} role="dialog" aria-modal="true" aria-labelledby="success-title">
                    <div className={styles.successCard}>
                        <div className={styles.successIcon}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h2 className={styles.successTitle} id="success-title">Enquiry Received</h2>
                        <div className={styles.successDetails}>
                            <p><strong>Name:</strong> {formData.fullName}</p>
                            <p><strong>Email:</strong> {formData.emailAddress}</p>
                            {formData.phoneNumber && (
                                <p><strong>Phone:</strong> {formData.phoneNumber}</p>
                            )}
                            <p><strong>Country:</strong> {formData.country}</p>
                            <p><strong>Enquiry Type:</strong> {formData.enquiryType}</p>
                        </div>
                        <p className={styles.successNote}>
                            Thank you for reaching out. A member of the GrowValley team will be in contact within one to two working days.
                        </p>
                        <button id="success-close" className={styles.successClose} onClick={closeSuccess}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
