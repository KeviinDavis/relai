"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import styles from "./ContactForm.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({
  heading = "We’d like to talk about partnering with Relai",
  showAltLink = true,
  onSubmitted,
}) {
  const [status, setStatus] = useState("idle"); // idle | submitting | error | success
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const timeoutRef = useRef(null);
  const confirmRef = useRef(null);

  // Clear the pending timer if the component unmounts mid-submit.
  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  // Move focus to the confirmation heading once we land on success.
  useEffect(() => {
    if (status === "success") confirmRef.current?.focus();
  }, [status]);

  const update = (field) => (e) => {
    const { value } = e.target;
    setValues((v) => ({ ...v, [field]: value }));
    // Drop this field's error as soon as the user edits it.
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name";
    if (!values.email.trim()) next.email = "Please enter your email";
    else if (!EMAIL_RE.test(values.email.trim()))
      next.email = "Please enter a valid email";
    if (!values.message.trim()) next.message = "Please enter a message";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      // Invalid: surface errors, keep everything typed, stay put.
      setErrors(nextErrors);
      setStatus("error");
      return;
    }
    // Valid: brief pending pace, then land on success. No network.
    setErrors({});
    setStatus("submitting");
    timeoutRef.current = setTimeout(() => {
      setStatus("success");
      onSubmitted?.(values);
    }, 700);
  };

  const reset = () => {
    setValues({ name: "", email: "", message: "" });
    setErrors({});
    setStatus("idle");
  };

  if (status === "success") {
    const name = values.name.trim();
    return (
      <div className={styles.success}>
        <h3 className={styles.successTitle} ref={confirmRef} tabIndex={-1}>
          {name
            ? `Thanks, ${name} — we’ll be in touch.`
            : "Thanks — we’ll be in touch."}
        </h3>
        <p className={styles.successText}>
          A member of the Relai team will reach out to schedule your walkthrough.
        </p>
        <button type="button" className={styles.resetLink} onClick={reset}>
          Send another request
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

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
          aria-invalid={errors.name ? "true" : undefined}
          aria-describedby={errors.name ? "cf-name-error" : undefined}
        />
        {errors.name && (
          <p id="cf-name-error" className={styles.error}>
            {errors.name}
          </p>
        )}
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
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "cf-email-error" : undefined}
        />
        {errors.email && (
          <p id="cf-email-error" className={styles.error}>
            {errors.email}
          </p>
        )}
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
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
        />
        {errors.message && (
          <p id="cf-message-error" className={styles.error}>
            {errors.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        className={styles.submit}
        disabled={submitting}
      >
        {submitting ? "Sending…" : "Submit"}
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
