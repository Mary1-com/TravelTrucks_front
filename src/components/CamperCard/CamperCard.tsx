import Image from "next/image";
import Link from "next/link";
import { BsDiagram3 } from "react-icons/bs";
import { FaGasPump, FaCar, FaStar } from "react-icons/fa";
import { PiMapTrifold } from "react-icons/pi";

import type {
    CamperForm,
    CamperListItem,
} from "@/types/camper";
import styles from "./CamperCard.module.css";

interface CamperCardProps {
    camper: CamperListItem;
    priority?: boolean;
}

const formLabels: Record<CamperForm, string> = {
    alcove: "Alcove",
    panel_van: "Panel Van",
    integrated: "Integrated",
    semi_integrated: "Semi Integrated",
};

function formatLocation(location: string) {
    const parts = location.split(",").map((part) => part.trim());

    if (parts.length !== 2) {
        return location;
    }

    return `${parts[1]}, ${parts[0]}`;
}

export default function CamperCard({
    camper,
    priority = false,
    }: CamperCardProps) {
    return (
        <article className={styles.card}>
            <Image
                className={styles.image}
                src={camper.coverImage}
                alt={`${camper.name} camper`}
                priority={priority}
                width={220}
                height={264}
                sizes="(max-width: 767px) 100vw, 220px"
            />

            <div className={styles.content}>
                <div className={styles.topLine}>
                    <h2 className={styles.name}>{camper.name}</h2>
                    <p className={styles.price}>€{camper.price}</p>
                </div>

                <div className={styles.meta}>
                    <span className={styles.metaItem}>
                        <FaStar
                            className={styles.star}
                            aria-hidden="true"
                        />
                        {camper.rating.toFixed(1)}
                        ({camper.totalReviews} Reviews)
                    </span>

                    <span className={styles.metaItem}>
                        <PiMapTrifold aria-hidden="true" />
                        {formatLocation(camper.location)}
                    </span>
                </div>

                <p className={styles.description}>
                    {camper.description}
                </p>

                <ul
                    className={styles.features}
                    aria-label="Camper features"
                >
                    <li className={styles.feature}>
                        <FaGasPump aria-hidden="true" />
                        <span>{camper.engine}</span>
                    </li>

                    <li className={styles.feature}>
                        <BsDiagram3 aria-hidden="true" />
                        <span>{camper.transmission}</span>
                    </li>

                    <li className={styles.feature}>
                        <FaCar aria-hidden="true" />
                        <span>{formLabels[camper.form]}</span>
                    </li>
                </ul>

                <Link
                    className={styles.showMoreLink}
                    href={`/catalog/${camper.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Show more
                </Link>
            </div>
        </article>
    );
}