import { FaStar } from "react-icons/fa";
import { PiMapTrifold } from "react-icons/pi";

import type {
    CamperAmenity,
    CamperDetails,
} from "@/types/camper";
import styles from "./CamperInfoPanel.module.css";

interface CamperInfoPanelProps {
    camper: CamperDetails;
}

const formLabels: Record<CamperDetails["form"], string> = {
    alcove: "Alcove",
    panel_van: "Panel van",
    integrated: "Integrated",
    semi_integrated: "Semi integrated",
};

const amenityLabels: Record<CamperAmenity, string> = {
    ac: "AC",
    bathroom: "Bathroom",
    kitchen: "Kitchen",
    tv: "TV",
    radio: "Radio",
    refrigerator: "Refrigerator",
    microwave: "Microwave",
    gas: "Gas",
    water: "Water",
};

function capitalize(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatLocation(location: string) {
    return location
        .split(",")
        .map((part) => part.trim())
        .reverse()
        .join(", ");
}

function formatMeasurement(value: string) {
    return value
        .replace(/(\d)([a-zA-Z])/g, "$1 $2")
        .replace(/\/(\d)/g, " / $1");
}

export default function CamperInfoPanel({
    camper,
}: CamperInfoPanelProps) {
    const acAmenity = camper.amenities.filter(
        (amenity) => amenity === "ac",
    );

    const otherAmenities = camper.amenities.filter(
        (amenity) => amenity !== "ac",
    );

    const details = [
        ["Form", formLabels[camper.form]],
        ["Length", formatMeasurement(camper.length)],
        ["Width", formatMeasurement(camper.width)],
        ["Height", formatMeasurement(camper.height)],
        ["Tank", formatMeasurement(camper.tank)],
        ["Consumption", formatMeasurement(camper.consumption)],
    ];

    return (
        <div className={styles.panel}>
            <section className={styles.summary}>
                <h1 className={styles.name}>{camper.name}</h1>

                <div className={styles.meta}>
                    <a className={styles.rating} href="#reviews">
                        <FaStar aria-hidden="true" />
                        <span>
                            {camper.rating} ({camper.totalReviews} Reviews)
                        </span>
                    </a>

                    <span className={styles.location}>
                        <PiMapTrifold aria-hidden="true" />
                        {formatLocation(camper.location)}
                    </span>
                </div>

                <p className={styles.price}>€{camper.price}</p>

                <p className={styles.description}>
                    {camper.description}
                </p>
            </section>

            <section className={styles.vehicle}>
                <h2 className={styles.title}>Vehicle details</h2>

                <ul
                    className={styles.features}
                    aria-label="Camper features"
                >
                    <li className={styles.feature}>
                        {capitalize(camper.transmission)}
                    </li>

                    {acAmenity.map((amenity) => (
                        <li className={styles.feature} key={amenity}>
                            {amenityLabels[amenity]}
                        </li>
                    ))}

                    <li className={styles.feature}>
                        {capitalize(camper.engine)}
                    </li>

                    {otherAmenities.map((amenity) => (
                        <li className={styles.feature} key={amenity}>
                            {amenityLabels[amenity]}
                        </li>
                    ))}


                    <li className={styles.feature}>
                        {formLabels[camper.form]}
                    </li>
                </ul>

                <dl className={styles.detailsList}>
                    {details.map(([label, value]) => (
                        <div className={styles.detailRow} key={label}>
                            <dt>{label}</dt>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </dl>
            </section>
        </div>
    );
}