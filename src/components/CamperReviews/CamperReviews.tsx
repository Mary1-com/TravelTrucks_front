import { FaStar } from "react-icons/fa";
import type { CamperReview } from "@/types/camper";
import styles from "./CamperReviews.module.css";

interface CamperReviewsProps {
    reviews: CamperReview[];
}

export default function CamperReviews({
    reviews,
}: CamperReviewsProps) {
    return (
        <section
            className={styles.reviews}
            id="reviews"
            aria-labelledby="reviews-title"
        >
            <h2 className={styles.title} id="reviews-title">
                Reviews
            </h2>

            {reviews.length === 0 ? (
                <p className={styles.empty}>
                    This camper has no reviews yet.
                </p>
            ) : (
                <ul className={styles.list}>
                    {reviews.map((review) => (
                        <li className={styles.card} key={review.id}>
                            <div className={styles.header}>
                                <span
                                    className={styles.avatar}
                                    aria-hidden="true"
                                >
                                    {review.reviewer_name
                                        .trim()
                                        .charAt(0)
                                        .toUpperCase()}
                                </span>

                                <div>
                                    <h3 className={styles.name}>
                                        {review.reviewer_name}
                                    </h3>

                                    <div
                                        className={styles.rating}
                                        aria-label={`${review.reviewer_rating} out of 5 stars`}
                                    >
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <FaStar
                                                className={
                                                    index < review.reviewer_rating
                                                        ? styles.starActive
                                                        : styles.starInactive
                                                }
                                                aria-hidden="true"
                                                key={index}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className={styles.comment}>
                                {review.comment}
                            </p>
                        </li>
                    ))}
                    </ul>
            )}
        </section>
    );
}