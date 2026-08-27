"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { CamperGalleryImage } from "@/types/camper";
import styles from "./CamperGallery.module.css";

interface CamperGalleryProps {
    camperName: string;
    images: CamperGalleryImage[];
}

export default function CamperGallery({
    camperName,
    images,
}: CamperGalleryProps) {
    const orderedImages = useMemo(
        () => [...images].sort((a, b) => a.order - b.order),
        [images],
    );

    const [selectedImageId, setSelectedImageId] =
        useState(orderedImages[0]?.id ?? "");

    const selectedImage =
        orderedImages.find(
            (image) => image.id === selectedImageId,
        ) ?? orderedImages[0];

    if (!selectedImage) {
        return (
            <div className={styles.placeholder}>
                No camper images available
            </div>
        );
    }

    return (
        <section
            className={styles.gallery}
            aria-label={`${camperName} image gallery`}
        >
            <div className={styles.mainImage}>
                <Image
                    src={selectedImage.original}
                    alt={`${camperName} exterior`}
                    fill
                    loading="eager"
                    sizes="(max-width: 900px) 100vw, 640px"
                />
            </div>

            <ul className={styles.thumbnails}>
                {orderedImages.map((image, index) => {
                    const isSelected = image.id === selectedImage.id;

                    return (
                        <li key={image.id}>
                            <button
                                className={`${styles.thumbnailButton} ${
                                    isSelected ? styles.selected : ""
                                    }`}
                                type="button"
                                aria-label={`Show ${camperName} image ${index + 1}`}
                                aria-pressed={isSelected}
                                onClick={() => setSelectedImageId(image.id)}
                            >
                                <Image
                                    src={image.thumb}
                                    alt=""
                                    fill
                                    sizes="(max-width: 700px) 22vw, 136px"
                                />
                            </button>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}