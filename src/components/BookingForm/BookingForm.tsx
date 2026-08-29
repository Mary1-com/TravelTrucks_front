"use client";

import { useMutation } from "@tanstack/react-query";
import {
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { createBookingRequest } from "@/lib/api/campers";
import type { BookingRequest } from "@/types/camper";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
    camperId: string;
    camperName: string;
}

interface FormErrors {
    name?: string;
    email?: string;
}

const namePattern =
    /^[\p{L}][\p{L}\s'-]{1,49}$/u;

const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingForm({
    camperId,
    camperName,
}: BookingFormProps) {
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitError, setSubmitError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        mutateAsync: sendBookingRequest,
        isPending,
    } = useMutation({
        mutationFn: (booking: BookingRequest) =>
        createBookingRequest(camperId, booking),
    });

    useEffect(() => {
        if (!successMessage) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setSuccessMessage("");
        }, 5000);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [successMessage]);

    const clearFieldError = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const field = event.target.name as keyof FormErrors;

        setErrors((currentErrors) => ({
            ...currentErrors,
            [field]: undefined,
        }));

        setSubmitError("");
        setSuccessMessage("");
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const name = String(formData.get("name") ?? "").trim();
        const email = String(formData.get("email") ?? "").trim();

        const nextErrors: FormErrors = {};

        if (!namePattern.test(name)) {
            nextErrors.name = "Please enter your name.";
        }

        if (!emailPattern.test(email)) {
            nextErrors.email = "Please enter your email.";
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setSubmitError("");
            setSuccessMessage("");
            return;
        }

        setErrors({});
        setSubmitError("");
        setSuccessMessage("");

        try {
            const response = await sendBookingRequest({
                name,
                email,
            });

            setSuccessMessage(
                response.message ||
                `Your booking request for ${camperName} has been sent.`,
            );

            form.reset();
        } catch (error) {
            setSubmitError(
                error instanceof Error
                ? error.message
                : "Failed to send booking request.",
            );
        }
    };

    return (
        <section
            className={styles.booking}
            aria-labelledby="booking-title"
        >
            <h2 className={styles.title} id="booking-title">
                Book your campervan now
            </h2>

            <p className={styles.description}>
                Stay connected! We are always ready to help you.
            </p>

            <form
                className={styles.form}
                onSubmit={handleSubmit}
                aria-busy={isPending}
                noValidate
            >
                <div className={styles.field}>
                    <label
                        className={styles.visuallyHidden}
                        htmlFor="name"
                    >
                        Name
                    </label>

                    <input
                        className={`${styles.input} ${
                            errors.name ? styles.inputError : ""
                            }`}
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name*"
                        autoComplete="name"
                        disabled={isPending}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                            errors.name ? "name-error" : undefined
                        }
                        onChange={clearFieldError}
                    />

                    {errors.name && (
                        <p
                            className={styles.error}
                            id="name-error"
                            role="alert"
                        >
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className={styles.field}>
                    <label
                        className={styles.visuallyHidden}
                        htmlFor="email"
                    >
                        Email
                    </label>

                    <input
                        className={`${styles.input} ${
                            errors.email ? styles.inputError : ""
                            }`}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email*"
                        autoComplete="email"
                        disabled={isPending}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                            errors.email ? "email-error" : undefined
                        }
                        onChange={clearFieldError}
                    />

                    {errors.email && (
                        <p
                            className={styles.error}
                            id="email-error"
                            role="alert"
                        >
                            {errors.email}
                        </p>
                    )}
                </div>

                <button
                    className={styles.button}
                    type="submit"
                    disabled={isPending}
                >
                    {isPending ? "Sending..." : "Send"}
                </button>

                {submitError && (
                    <p className={styles.submitError} role="alert">
                        {submitError}
                    </p>
                )}
            </form>

            {successMessage && (
                <div
                    className={styles.notification}
                    role="status"
                    aria-live="polite"
                >
                    {successMessage}
                </div>
            )}
        </section>
    );
}