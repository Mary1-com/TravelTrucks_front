import type { Metadata } from "next";
import CamperDetailsClient from "./CamperDetailsClient";

export const metadata: Metadata = {
    title: "Camper details | TravelTrucks",
    description:
        "View camper details, equipment, reviews, and booking information.",
};

interface CamperDetailsPageProps {
    params: Promise<{
        camperId: string;
    }>;
}

export default async function CamperDetailsPage({
    params,
}: CamperDetailsPageProps) {
    const { camperId } = await params;

    return <CamperDetailsClient camperId={camperId} />;
}