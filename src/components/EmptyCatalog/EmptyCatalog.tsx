import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import styles from "./EmptyCatalog.module.css";

interface EmptyCatalogProps {
    onClear: () => void;
    onViewAll: () => void;
    }

export default function EmptyCatalog({
    onClear,
    onViewAll,
    }: EmptyCatalogProps) {
        return (
            <div className={styles.empty}>
                <div className={styles.imageWrapper}>
                    <Image
                        className={styles.image}
                        src="/images/empty-campers.png"
                        alt=""
                        width={488}
                        height={463}
                        priority
                    />
                    </div>
                <h2 className={styles.title}>No campers found</h2>

                <p className={styles.description}>
                    We couldn&apos;t find any campers that match your filters.
                    <br />
                    Try adjusting your search or clearing some filters.
                </p>

                <div className={styles.actions}>
                    <button
                        className={styles.clearButton}
                        type="button"
                        onClick={onClear}
                    >
                    <FaTimes aria-hidden="true" />
                        Clear filters
                    </button>

                    <button
                        className={styles.viewAllButton}
                        type="button"
                        onClick={onViewAll}
                    >
                        View all campers
                    </button>
                </div>
        </div>
    );
}