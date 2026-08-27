"use client";

import {
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
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
    camperName,
}: BookingFormProps) {
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSuccess, setIsSuccess] = useState(false);

    const clearFieldError = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        const field = event.target.name as keyof FormErrors;

        setErrors((currentErrors) => ({
            ...currentErrors,
            [field]: undefined,
        }));

        setIsSuccess(false);
    };

    const handleSubmit = (
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
            setIsSuccess(false);
            return;
        }

        setErrors({});
        setIsSuccess(true);
        form.reset();
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
                noValidate
            >
            <div className={styles.field}>
                <label className={styles.visuallyHidden} htmlFor="name">
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

                <button className={styles.button} type="submit">
                    Send
                </button>

                {isSuccess && (
                    <p className={styles.success} role="status">
                        Your booking request for {camperName} has been sent.
                    </p>
                )}
            </form>
        </section>
    );
}
