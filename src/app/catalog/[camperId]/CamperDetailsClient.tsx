"use client";

import { useQuery } from "@tanstack/react-query";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import {
    fetchCamperById,
    fetchCamperReviews,
} from "@/lib/api/campers";
import CamperGallery from "@/components/CamperGallery/CamperGallery";
import CamperInfoPanel from "@/components/CamperInfoPanel/CamperInfoPanel";
import BookingForm from "@/components/BookingForm/BookingForm";
import CamperReviews from "@/components/CamperReviews/CamperReviews";
import styles from "./camperDetails.module.css";

interface CamperDetailsClientProps {
    camperId: string;
}

export default function CamperDetailsClient({
    camperId,
}: CamperDetailsClientProps) {
    const {
        data,
        error,
        isError,
        isPending,
    } = useQuery({
            queryKey: ["camper-details", camperId],
        queryFn: async ({ signal }) => {
            const [camper, reviews] = await Promise.all([
                fetchCamperById(camperId, signal),
                fetchCamperReviews(camperId, signal),
            ]);

            return {
                camper,
                reviews,
            };
        },
    });

    if (isPending) {
        return (
            <main className={styles.details}>
                <LoadingOverlay />
            </main>
        );
    }

    if (isError) {
        return (
            <main className={styles.details}>
                <p className={styles.error} role="alert">
                    {error.message}
                </p>
            </main>
        );
    }

    const { camper, reviews } = data;

    return (
        <main className={styles.details}>
            <div className={styles.top}>
                <CamperGallery
                    camperName={camper.name}
                    images={camper.gallery}
                />

                <CamperInfoPanel camper={camper} />
            </div>

            <div className={styles.bottom}>
                <CamperReviews reviews={reviews} />
                {/* <BookingForm camperName={camper.name} /> */}
                <BookingForm
                    camperId={camper.id}
                    camperName={camper.name}
                />
            </div>
        </main>
    );
}