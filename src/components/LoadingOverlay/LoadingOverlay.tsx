import styles from "./LoadingOverlay.module.css";

export default function LoadingOverlay() {
    return (
        <div
            className={styles.overlay}
            role="status"
            aria-live="polite"
            aria-label="Loading campers"
        >
            <div className={styles.content}>
                <span className={styles.spinner} aria-hidden="true" />

                <h2 className={styles.title}>
                    Loading trucks...
                </h2>

                <p className={styles.description}>
                    Please wait while we fetch the best
                    <br />
                    travel trucks for you
                </p>
            </div>
        </div>
    );
}