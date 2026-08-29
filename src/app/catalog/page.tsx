import type { Metadata } from "next";
import CatalogClient from "./CatalogClient";

const description =
        "Explore available TravelTrucks campers and find the right vehicle for your journey.";

export const metadata: Metadata = {
        title: "Catalog",
        description,

        alternates: {
                canonical: "/catalog",
        },


        openGraph: {
                type: "website",
                url: "/catalog",
                siteName: "TravelTrucks",
                title: "TravelTrucks Camper Catalog",
                description,
                images: [
                        {
                                url: "/images/hero.webp",
                                alt: "TravelTrucks camper catalog",
                        },
                ],
        },

        twitter: {
                card: "summary_large_image",
                title: "TravelTrucks Camper Catalog",
                description,
                images: ["/images/hero.webp"],
        },
};

export default function CatalogPage() {
        return <CatalogClient />;
}