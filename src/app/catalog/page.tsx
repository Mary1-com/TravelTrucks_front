import type { Metadata } from "next";
import CatalogClient from "./CatalogClient";

export const metadata: Metadata = {
    title: "Catalog",
    description:
        "Explore available TravelTrucks campers and find the right vehicle for your journey.",
};

export default function CatalogPage() {
        return <CatalogClient />;
}