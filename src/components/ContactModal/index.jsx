"use client";

import { useEffect } from "react";
import ContactForm from "@/components/ContactForm";
import styles from "./ContactModal.module.css";

export default function ContactModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Contact Korr"
      onClick={onClose}
    >
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
        <ContactForm onSubmitted={() => {}} />
      </div>
    </div>
  );
}
