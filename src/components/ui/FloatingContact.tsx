"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import styles from "./FloatingContact.module.scss";

export function FloatingContact() {
  const phoneNumber = "971501696971";
  const message = encodeURIComponent("Hello! I'm interested in GrowValley Group and would like to learn more.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className={styles.floatingAction}>
      <div className={styles.buttonWrapper}>
        <a
          href={whatsappUrl}
          className={styles.button}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.iconWrapper}>
            <MessageCircle size={22} strokeWidth={2} />
          </div>
          <span className={styles.label}>Chat with us</span>
        </a>
      </div>
    </div>
  );
}
