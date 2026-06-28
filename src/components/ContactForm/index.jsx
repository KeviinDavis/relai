"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import styles from "./ContactForm.module.css";

export default function ContactForm({
  heading = "We’d like to talk about partnering with Relai",
  showAltLink = true,
  onSubmitted,
}) {
  const [status, setStatus] = useState("idle"); // idle | success
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const update = (field) => (e) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI-only: no backend wired. Show a local success state.
    setStatus("success");
    onSubmitted?.(values);
  };

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <p className={styles.successTitle}>Thanks — we’ll be in touch.</p>
        <p className={styles.successText}>
          Your message has been received. A member of the Relai team will reach
          out shortly.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {heading && <p className={styles.heading}>{heading}</p>}

      <div className={styles.field}>
        <label htmlFor="cf-name" className={styles.label}>
          Full Name
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          className={styles.input}
          value={values.name}
          onChange={update("name")}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-email" className={styles.label}>
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          className={styles.input}
          value={values.email}
          onChange={update("email")}
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="cf-message" className={styles.label}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          className={styles.textarea}
          value={values.message}
          onChange={update("message")}
          required
        />
      </div>

      <Button type="submit" variant="primary" className={styles.submit}>
        Submit
      </Button>

      {showAltLink && (
        <p className={styles.alt}>
          Looking to get acquainted with Relai? Drop us a{" "}
          <Link href="/book-a-demo" className={styles.altLink}>
            demo request
          </Link>{" "}
          instead.
        </p>
      )}
    </form>
  );
}
