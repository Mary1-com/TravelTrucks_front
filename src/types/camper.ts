export interface BookingRequest {
    name: string;
    email: string;
}

export interface BookingResponse {
    message: string;
}

export type CamperForm =
    | "alcove"
    | "panel_van"
    | "integrated"
    | "semi_integrated";

export type CamperEngine =
    | "diesel"
    | "petrol"
    | "hybrid"
    | "electric";

export type CamperTransmission = "automatic" | "manual";

export type CamperAmenity =
    | "ac"
    | "bathroom"
    | "kitchen"
    | "tv"
    | "radio"
    | "refrigerator"
    | "microwave"
    | "gas"
    | "water";

export interface CamperListItem {
    id: string;
    name: string;
    price: number;
    rating: number;
    location: string;
    description: string;
    form: CamperForm;
    length: string;
    width: string;
    height: string;
    tank: string;
    consumption: string;
    transmission: CamperTransmission;
    engine: CamperEngine;
    amenities: CamperAmenity[];
    coverImage: string;
    totalReviews: number;
}

export interface CamperListResponse {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    campers: CamperListItem[];
}

export interface CamperFilters {
    location: string;
    form: CamperForm | "";
    engine: CamperEngine | "";
    transmission: CamperTransmission | "";
}

export interface CamperGalleryImage {
    id: string;
    camperId: string;
    thumb: string;
    original: string;
    order: number;
}

export interface CamperReview {
    id: string;
    camperId: string;
    reviewer_name: string;
    reviewer_rating: number;
    comment: string;
    createdAt: string;
}

export interface CamperDetails
    extends Omit<CamperListItem, "coverImage"> {
    createdAt: string;
    updatedAt: string;
    gallery: CamperGalleryImage[];
}