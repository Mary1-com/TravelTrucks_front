import type { Metadata } from "next";
import CamperDetailsClient from "./CamperDetailsClient";
import { fetchCamperById } from "@/lib/api/campers";

interface CamperDetailsPageProps {
    params: Promise<{
        camperId: string;
    }>;
}

function shortenDescription(description: string) {
    if (description.length <= 155) {
        return description;
    }

    return `${description.slice(0, 152).trimEnd()}...`;
}

export async function generateMetadata({
    params,
}: CamperDetailsPageProps): Promise<Metadata> {
    const { camperId } = await params;
    const canonicalUrl = `/catalog/${camperId}`;

    try {
        const camper = await fetchCamperById(camperId);
        const description = shortenDescription(camper.description);
        const previewImage = camper.gallery[0]?.original;

    return {
        title: camper.name,
        description,

        alternates: {
            canonical: canonicalUrl,
        },

        openGraph: {
            type: "website",
            url: canonicalUrl,
            siteName: "TravelTrucks",
            title: `${camper.name} camper`,
            description,
            images: previewImage
                ? [
                    {
                        url: previewImage,
                        alt: `${camper.name} camper`,
                    },
                ]
                : undefined,
        },

        twitter: {
            card: "summary_large_image",
            title: `${camper.name} | TravelTrucks`,
            description,
            images: previewImage ? [previewImage] : undefined,
        },
    };
    } catch {
        return {
            title: "Camper details",
            description:
                "View camper details, equipment, reviews, and booking information.",

            alternates: {
                canonical: canonicalUrl,
            },
        };
    }
}

export default async function CamperDetailsPage({
    params,
}: CamperDetailsPageProps) {
    const { camperId } = await params;

    return <CamperDetailsClient camperId={camperId} />;
}